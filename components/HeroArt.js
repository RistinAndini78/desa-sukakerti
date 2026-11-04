export default function HeroArt() {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Ilustrasi rumah panggung beratap ijuk di perbukitan" className="heroart">
      <circle cx="372" cy="78" r="34" fill="#D8C58C" />
      <path d="M0 230 Q90 150 190 205 T380 190 T480 215 V360 H0Z" fill="#2F5A3F" />
      <path d="M0 270 Q110 205 230 255 T480 250 V360 H0Z" fill="#244A33" />
      <path d="M0 310 Q140 270 260 300 T480 295 V360 H0Z" fill="#1A3A28" />
      {/* rumah panggung */}
      <g transform="translate(150 118)">
        <path d="M0 78 L90 0 L180 78 Z" fill="#2B2219" />
        <path d="M14 78 L90 12 L166 78" fill="none" stroke="#4A3B2C" strokeWidth="3" />
        <rect x="22" y="78" width="136" height="62" fill="#D8C58C" />
        {[34, 46, 58, 70, 82, 94, 106, 118, 130, 142].map((x) => (
          <line key={x} x1={x} y1="78" x2={x} y2="140" stroke="#B9A56B" strokeWidth="2" />
        ))}
        <rect x="76" y="96" width="28" height="44" fill="#2B2219" />
        <rect x="14" y="140" width="152" height="8" fill="#6B4E2E" />
        {[28, 70, 110, 150].map((x) => (
          <rect key={x} x={x} y="148" width="6" height="52" fill="#6B4E2E" />
        ))}
        <path d="M80 148 L72 200 M100 148 L108 200" stroke="#6B4E2E" strokeWidth="3" />
      </g>
      <g fill="#1A3A28">
        <path d="M60 300 l12 -50 l12 50z" />
        <path d="M92 305 l10 -42 l10 42z" />
        <path d="M410 296 l12 -50 l12 50z" />
      </g>
    </svg>
  );
}
