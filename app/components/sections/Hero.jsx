import HexagonField from "./HexagonField";

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <HexagonField />
      <div className="hero-content">
        <p className="hero-overline"><span className="availability-mark" /> Full-stack developer · India</p>
        <h1 className="hero-title" id="hero-title">
          Building the web,
          <span>with purpose.</span>
        </h1>
        <p className="hero-description">
          I’m Hariprasath R, a full-stack developer shaping thoughtful digital products with considered interfaces and dependable engineering.
        </p>
        <div className="hero-chips" aria-label="Core technologies">
          {["React", "Next.js", "Node.js", "Spring Boot", "Three.js"].map((item) => (
            <span className="chip" key={item}>{item}</span>
          ))}
        </div>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            Explore selected work <span className="arrow" aria-hidden="true">↗</span>
          </a>
          <a className="button button-secondary" href="#contact">Get in touch</a>
        </div>
      </div>
      <div className="hero-foot" aria-hidden="true">
        <span className="scroll-cue">Scroll to explore</span>
        <span>Portfolio · {new Date().getFullYear()}</span>
      </div>
    </section>
  );
}
