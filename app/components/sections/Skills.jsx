import SectionHeading from "../SectionHeading";
import BrandIcon from "../BrandIcon";

export default function Skills({ content }) {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading
          index={content.index}
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        <div className="skills-board reveal delay-1">
          <p className="skills-label">{content.label}</p>
          <div className="skills-content">
            {content.items.map((technology) => (
              <span className="skill-item" key={technology.name}>
                <BrandIcon name={technology.name} className="skill-icon" />
                {technology.name}
              </span>
            ))}
          </div>
        </div>
        <p className="skills-note reveal delay-2">{content.note}</p>
      </div>
    </section>
  );
}
