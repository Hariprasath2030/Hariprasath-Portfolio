import SectionHeading from "../SectionHeading";

export default function Certifications({ content, ui }) {
  return (
    <section className="section" id="certifications">
      <div className="container">
        <SectionHeading
          index={content.index}
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        <div className="cert-grid">
          {content.items.map((cert, index) => (
            <article className={`cert-card reveal${index % 2 ? " delay-1" : ""}`} key={`${cert.title}-${index}`}>
              <div className="card-topline">
                <span>{ui.certificateLabel}</span>
                <span className="cert-number">0{index + 1} / {String(content.items.length).padStart(2, "0")}</span>
              </div>
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <p className="cert-description">{cert.description}</p>
              <div className="cert-footer">
                <span className="cert-date">{cert.date}</span>
                <a className="cert-link" href={cert.fileUrl} target="_blank" rel="noreferrer">
                  {ui.viewCertificateLabel} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
