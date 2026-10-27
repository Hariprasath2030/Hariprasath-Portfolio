"use client";

import { useState } from "react";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminAuthForm({ configured }) {
  const [mode, setMode] = useState("login");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setBusy(true);
    setStatus("");
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      action: mode === "signup" ? "signup" : "login",
      email: form.get("email"),
      password: form.get("password"),
      setupToken: form.get("setupToken"),
    };

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Could not complete the request.");
      }

      if (mode === "signup") {
        setStatus(result.message);
        setMode("login");
        formElement.reset();
      } else {
        window.location.assign("/admin");
      }
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="admin-auth-page">
      <Link className="admin-back-link" href="/">
        <ArrowRight size={15} aria-hidden="true" /> Back to portfolio
      </Link>
      <section className="admin-auth-card">
        <div className="admin-auth-icon"><LockKeyhole size={21} aria-hidden="true" /></div>
        <p className="admin-eyebrow">OWNER ACCESS</p>
        <h1>{mode === "signup" ? "Create your admin account" : "Welcome back"}</h1>
        <p className="admin-auth-description">
          The dashboard is restricted to the owner email configured for this portfolio.
        </p>

        {!configured ? (
          <div className="admin-setup-message" role="status">
            Admin access is not configured yet. Add the Supabase project URL, anon key,
            service-role key, owner email, and one-time setup token to the project
            environment before signing in.
          </div>
        ) : (
          <>
            <form className="admin-auth-form" onSubmit={handleSubmit}>
              <label htmlFor="admin-email">Owner email</label>
              <input id="admin-email" name="email" type="email" autoComplete="email" required />
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                minLength={12}
                required
              />
              {mode === "signup" ? (
                <>
                  <label htmlFor="admin-setup-token">One-time setup token</label>
                  <input
                    id="admin-setup-token"
                    name="setupToken"
                    type="password"
                    autoComplete="off"
                    minLength={32}
                    required
                  />
                  <p className="admin-input-hint">
                    Set a private 32-character token in the project Secrets before creating the owner account.
                  </p>
                </>
              ) : null}
              {error ? <p className="admin-error" role="alert">{error}</p> : null}
              {status ? <p className="admin-success" role="status">{status}</p> : null}
              <button className="button button-primary admin-submit" type="submit" disabled={busy}>
                {busy ? "Please wait…" : mode === "signup" ? "Create owner account" : "Sign in"}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </form>
            <button
              className="admin-mode-switch"
              type="button"
              onClick={() => {
                setMode((current) => current === "login" ? "signup" : "login");
                setError("");
                setStatus("");
              }}
            >
              {mode === "signup" ? "Already set up? Sign in" : "First time? Set up the owner account"}
            </button>
          </>
        )}
        <p className="admin-auth-footnote">
          <ShieldCheck size={14} aria-hidden="true" />
          New account creation is limited to one configured owner email.
        </p>
      </section>
    </main>
  );
}
