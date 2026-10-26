import { socialLinks } from "../../data/portfolio";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-row">
          <div>
            <a className="footer-brand" href="#home">
              Hariprasath V
            </a>
            <p className="footer-note">
              Full-stack developer · Tirupattur, India
            </p>
          </div>
          <nav className="social-links" aria-label="Social profiles">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} Hariprasath V. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
