import SectionHeading from "../SectionHeading";
import { certifications } from "../../data/portfolio";

export default function Certifications() {
  return (
    <section className="section" id="certifications">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Learning, in practice"
          title="Certifications & training"
          description="Professional development through industry-recognized certifications and focused training."
        />
        <div className="cert-grid">
          {certifications.map((cert, index) => (
            <article className={`cert-card reveal${index % 2 ? " delay-1" : ""}`} key={cert.file}>
              <div className="card-topline">
                <span>Certificate</span>
                <span className="cert-number">0{index + 1} / 04</span>
              </div>
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <p className="cert-description">{cert.description}</p>
              <div className="cert-footer">
                <span className="cert-date">{cert.date}</span>
                <a className="cert-link" href={`/certificates/${cert.file}`} target="_blank" rel="noreferrer">
                  View certificate <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
