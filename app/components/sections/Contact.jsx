import ContactForm from "../ContactForm";
import SectionHeading from "../SectionHeading";
import { profile } from "../../data/portfolio";

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <SectionHeading
          index="06"
          eyebrow="Start a conversation"
          title="Have a good problem to solve?"
          description="For a project, collaboration, or just to say hello, I’d be glad to hear from you."
        />
        <div className="contact-layout">
          <aside className="contact-aside reveal">
            <p>Reach out directly or leave a note. I’m always interested in thoughtful work and good conversations.</p>
            <div className="contact-detail">
              <span className="contact-detail-label">Email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-label">Phone</span>
              <a href="tel:+918925425514">{profile.phone}</a>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-label">Based in</span>
              <span>{profile.location}</span>
            </div>
          </aside>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
