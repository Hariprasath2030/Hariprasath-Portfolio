import SectionHeading from "../SectionHeading";
import { technologies } from "../../data/portfolio";

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Tools of the trade"
          title="Skills & technologies"
          description="A growing toolkit across frontend, backend, and interactive web development."
        />
        <div className="skills-board reveal delay-1">
          <p className="skills-label">Technologies</p>
          <div className="skills-content">
            {technologies.map((technology) => <span className="skill-item" key={technology}>{technology}</span>)}
          </div>
        </div>
        <p className="skills-note reveal delay-2">
          Constantly learning and adapting to new technologies to build useful solutions. Each skill represents time spent learning, building, and refining.
        </p>
      </div>
    </section>
  );
}
