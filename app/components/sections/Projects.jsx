import Image from "next/image";
import SectionHeading from "../SectionHeading";
import { projects } from "../../data/portfolio";

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow="Selected work"
          title="Projects, made real."
          description="A selection of work across product interfaces, full-stack applications, and exploratory ideas. Each project links to its code and live version where available."
        />
        <div className="project-list">
          {projects.map((project, index) => (
            <article className={`project-card reveal${index % 2 ? " delay-1" : ""}`} key={project.name}>
              <div className="project-visual">
                <Image
                  className="project-image"
                  src={project.image}
                  alt={`${project.name} interface preview`}
                  fill
                  sizes="(max-width: 800px) 100vw, 45vw"
                />
              </div>
              <div className="project-detail">
                <span className="project-index">PROJECT 0{index + 1}</span>
                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags" aria-label={`${project.name} technologies`}>
                  {project.tags.map((tag) => <span className="project-tag" key={tag}>{tag}</span>)}
                </div>
                <div className="project-links">
                  {project.demo ? (
                    <a className="text-link" href={project.demo} target="_blank" rel="noreferrer">
                      Live project <span className="arrow" aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                  <a className="text-link" href={project.source} target="_blank" rel="noreferrer">
                    Source code <span className="arrow" aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
