"use client";

import { useEffect, useState } from "react";
import { navLinks } from "../data/portfolio";

export default function SiteHeader() {
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
  }, []);

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
          aria-label="Hariprasath V, home"
        >
          <span className="wordmark-mark">H V</span>
          <span className="wordmark-name">Hariprasath V</span>
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
            href="/HARIPRASATH_R.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Resume <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <a
          className="header-resume"
          href="/HARIPRASATH_R.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Resume <span aria-hidden="true">↗</span>
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
          className="mobile-resume-link"
          href="/HARIPRASATH_R.pdf"
          target="_blank"
          rel="noreferrer"
          tabIndex={menuOpen ? 0 : -1}
        >
          View resume <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
