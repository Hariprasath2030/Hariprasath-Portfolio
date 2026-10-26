import Image from "next/image";
import SectionHeading from "../SectionHeading";
import { profile } from "../../data/portfolio";

export default function About() {
  const stats = [
    { value: "10+", label: "Projects completed" },
    { value: "1", label: "Year of experience" },
    { value: "10+", label: "Technologies" },
  ];

  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow="A little about me"
          title="I like making complex things feel clear."
        />
        <div className="about-grid">
          <div className="portrait-frame reveal delay-1">
            <Image
              className="portrait-image"
              src={profile.portrait}
              alt="Hariprasath V"
              fill
              sizes="(max-width: 800px) 100vw, 42vw"
            />
            <div className="portrait-caption">
              <span>Hariprasath V</span>
              <span>Tamil Nadu, India</span>
            </div>
          </div>
          <div className="about-copy reveal delay-2">
            <p>
              I’m a passionate <strong>Full Stack Developer</strong>, currently
              working as an intern at <strong>Sekel Tech in Pune</strong>. I
              build responsive web experiences with React.js, Next.js, Three.js,
              and Framer Motion.
            </p>
            <p>
              My work spans the <strong>MERN stack and Spring Boot</strong>,
              with a focus on scalable applications that feel considered and
              work well across devices.
            </p>
            <p>
              From interactive interfaces to backend services, I enjoy turning
              ideas into digital products that are both visually precise and
              useful.
            </p>
            <div className="about-links">
              <a
                className="text-link"
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
              >
                View resume{" "}
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
              <a
                className="text-link"
                href="https://github.com/Hariprasath2030"
                target="_blank"
                rel="noreferrer"
              >
                GitHub profile{" "}
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="stat-strip reveal delay-3"
          aria-label="Experience at a glance"
        >
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
