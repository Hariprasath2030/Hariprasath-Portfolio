export default function SectionHeading({ index, eyebrow, title, description }) {
  return (
    <div className="reveal">
      <p className="section-kicker">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </p>
      <h2 className="section-heading">{title}</h2>
      {description ? <p className="section-intro">{description}</p> : null}
    </div>
  );
}
