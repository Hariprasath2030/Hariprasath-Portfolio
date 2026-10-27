/* eslint-disable @next/next/no-img-element */
import SectionHeading from "../SectionHeading";

export default function About({ content, settings }) {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeading
          index={content.index}
          eyebrow={content.eyebrow}
          title={content.title}
        />
        <div className="about-grid">
          <div className="portrait-frame reveal delay-1">
            {settings.portraitUrl ? (
              <img className="portrait-image" src={settings.portraitUrl} alt={settings.portraitAlt} loading="lazy" decoding="async" />
            ) : <span className="portrait-placeholder">{settings.logoMark}</span>}
            <div className="portrait-caption">
              <span>{settings.name}</span>
              <span>{settings.location}</span>
            </div>
          </div>
          <div className="about-copy reveal delay-2">
            {content.paragraphs.map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)}
            <div className="about-links">
              {content.links.map((link) => (
                <a className="text-link" href={link.href} key={link.label} target="_blank" rel="noreferrer">
                  {link.label} <span className="arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div
          className="stat-strip reveal delay-3"
          aria-label="Experience at a glance"
        >
          {content.stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
