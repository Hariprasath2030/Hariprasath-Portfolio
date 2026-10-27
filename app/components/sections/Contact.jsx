import ContactForm from "../ContactForm";
import SectionHeading from "../SectionHeading";

export default function Contact({ content, settings, ui }) {
  return (
    <section className="section" id="contact">
      <div className="container">
        <SectionHeading
          index={content.index}
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        <div className="contact-layout">
          <aside className="contact-aside reveal">
            <p>{content.asideText}</p>
            <div className="contact-detail">
              <span className="contact-detail-label">{ui.emailLabel}</span>
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-label">{ui.phoneLabel}</span>
              <a href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}>{settings.phone}</a>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-label">{ui.locationLabel}</span>
              <span>{settings.location}</span>
            </div>
          </aside>
          <ContactForm content={content} email={settings.email} />
        </div>
      </div>
    </section>
  );
}
