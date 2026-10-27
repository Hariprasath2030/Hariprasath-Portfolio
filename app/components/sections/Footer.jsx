import BrandIcon from "../BrandIcon";

export default function Footer({ content, settings, links }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-row">
          <div>
            <a className="footer-brand" href="#home">
              {settings.name}
            </a>
            <p className="footer-note">{content.note}</p>
          </div>
          <nav className="social-links" aria-label="Social profiles">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                title={link.label}
              >
                <BrandIcon name={link.label} className="social-icon" />
                <span className="social-label">{link.label}</span>
              </a>
            ))}
          </nav>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} {settings.name}. {content.copyrightSuffix}
        </p>
      </div>
    </footer>
  );
}
