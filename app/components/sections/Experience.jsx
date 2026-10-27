import SectionHeading from "../SectionHeading";

export default function Experience({ content }) {
  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHeading index={content.index} eyebrow={content.eyebrow} title={content.title} description={content.description} />
        <div className="timeline">
          {content.items.map((item, index) => (
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
