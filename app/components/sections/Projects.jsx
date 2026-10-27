/* eslint-disable @next/next/no-img-element */
import SectionHeading from "../SectionHeading";
import BrandIcon from "../BrandIcon";

export default function Projects({ content, ui }) {
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeading
          index={content.index}
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        <div className="project-list">
          {content.items.map((project, index) => (
            <article className={`project-card reveal${index % 2 ? " delay-1" : ""}`} key={project.name}>
              <div className="project-visual">
                {project.imageUrl ? (
                  <img className="project-image" src={project.imageUrl} alt={`${project.name} interface preview`} loading="lazy" decoding="async" />
                ) : <span className="project-image-placeholder">{project.name}</span>}
              </div>
              <div className="project-detail">
                <span className="project-index">{ui.projectIndexLabel} 0{index + 1}</span>
                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags" aria-label={`${project.name} technologies`}>
                  {project.tags.map((tag) => (
                    <span className="project-tag" key={tag}>
                      <BrandIcon name={tag} className="project-tag-icon" />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  {project.demo ? (
                    <a className="text-link" href={project.demo} target="_blank" rel="noreferrer">
                      {ui.liveProjectLabel} <span className="arrow" aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                  {project.source ? (
                    <a className="text-link" href={project.source} target="_blank" rel="noreferrer">
                      {ui.sourceCodeLabel} <span className="arrow" aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
