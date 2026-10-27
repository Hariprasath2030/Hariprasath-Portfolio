"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Check, CircleAlert, ImagePlus, LogOut, Plus, Save, Trash2 } from "lucide-react";
import Link from "next/link";

const sectionOrder = [
  "settings",
  "navigation",
  "ui",
  "hero",
  "about",
  "experience",
  "certifications",
  "skills",
  "projects",
  "contact",
  "socialLinks",
  "footer",
];

function humanize(value) {
  return String(value)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function setValueAtPath(source, path, value) {
  const next = cloneValue(source);
  let current = next;
  path.slice(0, -1).forEach((part) => {
    current = Array.isArray(current) ? current[Number(part)] : current[part];
  });
  const last = path.at(-1);
  if (Array.isArray(current)) current[Number(last)] = value;
  else current[last] = value;
  return next;
}

function removeAtPath(source, path) {
  const next = cloneValue(source);
  let current = next;
  path.slice(0, -1).forEach((part) => {
    current = Array.isArray(current) ? current[Number(part)] : current[part];
  });
  const last = path.at(-1);
  if (Array.isArray(current)) current.splice(Number(last), 1);
  else delete current[last];
  return next;
}

function blankLike(value) {
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, blankLike(item)]));
  }
  if (typeof value === "boolean") return false;
  if (typeof value === "number") return 0;
  return "";
}

function isImageField(name) {
  return /(?:image|portrait|avatar|cover|photo)url/i.test(name);
}

function FieldEditor({ name, value, path, onChange, onDelete, onUpload, uploadPath }) {
  const label = humanize(name);
  const currentUploadPath = JSON.stringify(path);

  if (Array.isArray(value)) {
    return (
      <div className="editor-array">
        <div className="editor-array-heading">
          <span>{label}<small>{value.length} item{value.length === 1 ? "" : "s"}</small></span>
          <button className="admin-small-button" type="button" onClick={() => onChange(path, [...value, value.length ? blankLike(value[0]) : ""])}>
            <Plus size={14} aria-hidden="true" /> Add item
          </button>
        </div>
        <div className="editor-array-list">
          {value.map((item, index) => (
            <div className="editor-array-item" key={`${currentUploadPath}-${index}`}>
              <div className="editor-item-heading">
                <span>Entry {String(index + 1).padStart(2, "0")}</span>
                <button className="admin-icon-button danger" type="button" aria-label={`Remove ${label} entry ${index + 1}`} onClick={() => onDelete([...path, String(index)])}>
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              </div>
              <FieldEditor
                name={String(index)}
                value={item}
                path={[...path, String(index)]}
                onChange={onChange}
                onDelete={onDelete}
                onUpload={onUpload}
                uploadPath={uploadPath}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (value && typeof value === "object") {
    return (
      <div className={`editor-object${path.length > 1 ? " nested" : ""}`}>
        {Object.entries(value).map(([childName, childValue]) => (
          <FieldEditor
            key={`${currentUploadPath}-${childName}`}
            name={childName}
            value={childValue}
            path={[...path, childName]}
            onChange={onChange}
            onDelete={onDelete}
            onUpload={onUpload}
            uploadPath={uploadPath}
          />
        ))}
      </div>
    );
  }

  const controlId = `field-${path.join("-").replace(/[^a-zA-Z0-9-]/g, "-")}`;
  const fieldIsLong = typeof value === "string" && (value.length > 95 || /description|paragraph|note|text/i.test(name));

  return (
    <div className="editor-field">
      <label htmlFor={controlId}>{label}</label>
      {typeof value === "boolean" ? (
        <input
          id={controlId}
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(path, event.target.checked)}
        />
      ) : fieldIsLong ? (
        <textarea
          id={controlId}
          rows={Math.min(7, Math.max(3, Math.ceil(String(value).length / 75)))}
          value={value ?? ""}
          onChange={(event) => onChange(path, event.target.value)}
        />
      ) : (
        <input
          id={controlId}
          type={typeof value === "number" ? "number" : "text"}
          value={value ?? ""}
          onChange={(event) => onChange(path, typeof value === "number" ? Number(event.target.value) : event.target.value)}
        />
      )}
      {isImageField(name) ? (
        <label className={`image-upload-button${uploadPath === currentUploadPath ? " uploading" : ""}`}>
          <ImagePlus size={15} aria-hidden="true" />
          {uploadPath === currentUploadPath ? "Uploading…" : "Upload image to S3"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            disabled={Boolean(uploadPath)}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onUpload(file, path);
              event.target.value = "";
            }}
          />
        </label>
      ) : null}
    </div>
  );
}

export default function PortfolioEditor({ email }) {
  const [content, setContent] = useState(null);
  const [activeSection, setActiveSection] = useState("settings");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [uploadPath, setUploadPath] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const sections = useMemo(
    () => content ? sectionOrder.filter((section) => Object.hasOwn(content, section)) : [],
    [content],
  );

  useEffect(() => {
    let active = true;
    fetch("/api/admin/content", { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error ?? "Could not load portfolio content.");
        return result.content;
      })
      .then((value) => {
        if (active) setContent(value);
      })
      .catch((loadError) => {
        if (active) setError(loadError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  function update(path, value) {
    setContent((current) => setValueAtPath(current, path, value));
    setDirty(true);
    setNotice("");
  }

  function remove(path) {
    setContent((current) => removeAtPath(current, path));
    setDirty(true);
    setNotice("");
  }

  async function upload(file, path) {
    if (file.size > 4 * 1024 * 1024) {
      setError("Images must be 4 MB or smaller.");
      return;
    }
    setUploadPath(JSON.stringify(path));
    setError("");
    setNotice("");

    try {
      const form = new FormData();
      form.append("file", file);
      const response = await fetch("/api/admin/uploads", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Image upload failed.");
      update(path, result.url);
      setNotice("Image uploaded to S3. Save changes to publish the URL.");
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setUploadPath("");
    }
  }

  async function save() {
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Could not save changes.");
      setDirty(false);
      setNotice(`Saved at ${new Date(result.savedAt).toLocaleTimeString()}.`);
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  }

  async function signOut() {
    await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    window.location.assign("/admin/login");
  }

  return (
    <main className="admin-dashboard">
      <header className="admin-topbar">
        <Link className="admin-wordmark" href="/admin">
          <span className="admin-wordmark-mark">HV</span>
          <span>Portfolio CMS<small>OWNER DASHBOARD</small></span>
        </Link>
        <div className="admin-topbar-actions">
          <span className="admin-owner-email">{email}</span>
          <Link className="admin-preview-link" href="/" target="_blank" rel="noreferrer">
            View site <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <button className="admin-icon-button" type="button" onClick={signOut} aria-label="Sign out">
            <LogOut size={16} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="admin-workspace">
        <aside className="admin-sidebar">
          <p className="admin-sidebar-title">PORTFOLIO CONTENT</p>
          <nav aria-label="Content sections">
            {sections.map((section) => (
              <button
                type="button"
                key={section}
                className={activeSection === section ? "active" : ""}
                onClick={() => setActiveSection(section)}
              >
                {humanize(section)}
              </button>
            ))}
          </nav>
          <div className="admin-sidebar-note">
            <span className="admin-status-dot" />
            Changes are private until saved
          </div>
        </aside>

        <section className="admin-editor">
          <div className="admin-editor-heading">
            <div>
              <p className="admin-eyebrow">EDIT LIVE CONTENT</p>
              <h1>{humanize(activeSection)}</h1>
              <p>Every field here updates the portfolio content stored in Supabase.</p>
            </div>
            <button className="button button-primary admin-save-button" type="button" onClick={save} disabled={!dirty || saving || loading || !content}>
              {saving ? "Saving…" : dirty ? "Save changes" : "Saved"}
              {dirty ? <Save size={16} aria-hidden="true" /> : <Check size={16} aria-hidden="true" />}
            </button>
          </div>

          {error ? (
            <div className="admin-alert error" role="alert">
              <CircleAlert size={18} aria-hidden="true" />
              <span>{error}</span>
            </div>
          ) : null}
          {notice ? <div className="admin-alert success" role="status"><Check size={18} aria-hidden="true" />{notice}</div> : null}

          {loading ? <p className="admin-loading">Loading portfolio content…</p> : null}
          {!loading && error && !content ? (
            <div className="admin-empty-state">
              <h2>Content database is not ready</h2>
              <p>Apply <code>supabase/schema.sql</code>, add the Supabase and S3 environment settings, and run <code>npm run seed:portfolio</code>.</p>
            </div>
          ) : null}
          {!loading && content ? (
            <div className="admin-content-card">
              <FieldEditor
                name={activeSection}
                value={content[activeSection]}
                path={[activeSection]}
                onChange={update}
                onDelete={remove}
                onUpload={upload}
                uploadPath={uploadPath}
              />
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
