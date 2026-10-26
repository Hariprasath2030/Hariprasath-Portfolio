import SectionHeading from "../SectionHeading";
import { experience } from "../../data/portfolio";

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHeading index="02" eyebrow="Where I’ve worked" title="Experience" description="A couple of roles where I’ve built, learned, and contributed alongside teams." />
        <div className="timeline">
          {experience.map((item, index) => (
            <article className={`experience-item reveal${index ? " delay-1" : ""}`} key={`${item.company}-${item.role}`}>
              <p className="experience-date">{item.date}</p>
              <div>
                <div className="experience-title-row">
                  <h3 className="experience-title">{item.role}</h3>
                  <span className="experience-company">{item.company}</span>
                </div>
                <ul className="experience-points">
                  {item.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
