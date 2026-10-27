"use client";

import { useEffect, useState } from "react";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function SiteHeader({ navLinks, settings, ui }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const targets = navLinks
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-22% 0px -62% 0px", threshold: [0, 0.15, 0.35] },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [navLinks]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          className="wordmark"
          href="#home"
          onClick={closeMenu}
          aria-label={`${settings.name}, home`}
        >
          <span className="wordmark-mark">{settings.logoMark}</span>
          <span className="wordmark-name">{settings.name}</span>
        </a>

        <nav
          className={`desktop-nav${menuOpen ? " nav-open" : ""}`}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={activeSection === link.id ? "active" : ""}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <a
            className="nav-mobile-resume"
            href={settings.resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            {ui.resumeLabel} <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <Link className="header-admin" href="/admin" aria-label="Admin dashboard">
          <LockKeyhole size={14} aria-hidden="true" />
          <span>{ui.adminLabel}</span>
        </Link>
        <a
          className="header-resume"
          href={settings.resumeUrl}
          target="_blank"
          rel="noreferrer"
        >
          {ui.resumeLabel} <span aria-hidden="true">↗</span>
        </a>
        <button
          className={`menu-toggle${menuOpen ? " menu-toggle-open" : ""}`}
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-nav${menuOpen ? " mobile-nav-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {navLinks.map((link, index) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            tabIndex={menuOpen ? 0 : -1}
            className={activeSection === link.id ? "active" : ""}
            onClick={closeMenu}
          >
            <span className="mobile-nav-index">0{index + 1}</span>
            {link.label}
            <span className="mobile-nav-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
        <a
          className="mobile-resume-link mobile-admin-link"
          href="/admin"
          tabIndex={menuOpen ? 0 : -1}
        >
          <LockKeyhole size={15} aria-hidden="true" />
          {ui.adminLabel}
        </a>
        <a
          className="mobile-resume-link"
          href={settings.resumeUrl}
          target="_blank"
          rel="noreferrer"
          tabIndex={menuOpen ? 0 : -1}
        >
          {ui.viewResumeLabel} <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
