export default function HexagonField() {
  return (
    <svg className="hero-geometry" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="hexagons" width="104" height="90" patternUnits="userSpaceOnUse">
          <path d="M26 1 L51 15.5 L51 44.5 L26 59 L1 44.5 L1 15.5 Z M78 46 L103 60.5 L103 89.5 L78 104 L53 89.5 L53 60.5 Z" fill="none" stroke="#bdbdb8" strokeWidth="0.6" />
        </pattern>
        <mask id="hex-mask">
          <rect width="100%" height="100%" fill="url(#hexagons)" />
          <ellipse cx="720" cy="420" rx="660" ry="375" fill="black" />
          <ellipse cx="720" cy="420" rx="570" ry="300" fill="white" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons)" mask="url(#hex-mask)" opacity="0.22" />
      <path d="M0 735 H1440" stroke="#f4f4f1" strokeOpacity="0.08" strokeWidth="1" />
    </svg>
  );
}
