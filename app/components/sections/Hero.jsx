import HexagonField from "./HexagonField";

export default function Hero({ content, ui }) {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <HexagonField />
      <div className="hero-content">
        <p className="hero-overline">
          <span className="availability-mark" /> {content.overline}
        </p>
        <h1 className="hero-title" id="hero-title">
          {content.title}
          <span>{content.accentTitle}</span>
        </h1>
        <p className="hero-description">{content.description}</p>
        <div className="hero-chips" aria-label="Core technologies">
          {content.chips.map((item) => <span className="chip" key={item}>{item}</span>)}
        </div>
        <div className="hero-actions">
          <a className="button button-primary" href={content.primaryHref}>
            {content.primaryLabel}{" "}
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </a>
          <a className="button button-secondary" href={content.secondaryHref}>{content.secondaryLabel}</a>
        </div>
      </div>
      <div className="hero-foot">
        <span className="scroll-cue">{content.scrollLabel}</span>
        <span>{ui.portfolioYearLabel} · {new Date().getFullYear()}</span>
      </div>
    </section>
  );
}
