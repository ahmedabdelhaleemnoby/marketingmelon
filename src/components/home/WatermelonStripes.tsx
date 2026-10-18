// Stacked watermelon-slice bars: the Melon take on a bold 3D stripe hero visual.
const bars = [
  { x: 40, y: 260, h: 520 }, { x: 108, y: 180, h: 600 }, { x: 176, y: 120, h: 660 }, { x: 244, y: 70, h: 720 },
  { x: 312, y: 40, h: 760 }, { x: 380, y: 30, h: 780 }, { x: 448, y: 40, h: 770 }, { x: 516, y: 70, h: 740 },
];
const W = 50;

export function WatermelonStripes() {
  return (
    <svg className="melon-stripes" viewBox="0 0 620 860" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="mm-slice" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#0d4430" />
          <stop offset=".13" stopColor="#1f7a3a" />
          <stop offset=".2" stopColor="#8fcf5a" />
          <stop offset=".27" stopColor="#f6f8e4" />
          <stop offset=".34" stopColor="#ff6d7e" />
          <stop offset=".62" stopColor="#ff3b53" />
          <stop offset="1" stopColor="#c81f3a" />
        </linearGradient>
        <linearGradient id="mm-shine" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".45" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g transform="rotate(-28 310 430)">
        {bars.map((b, i) => (
          <g key={i} className="melon-bar" style={{ animationDelay: `${i * 0.18}s` }}>
            <rect x={b.x + 12} y={b.y + 14} width={W} height={b.h} rx="12" fill="#0a3122" opacity=".9" />
            <rect x={b.x} y={b.y} width={W} height={b.h} rx="12" fill="url(#mm-slice)" />
            <rect x={b.x + 19} y={b.y + 8} width="7" height={b.h - 16} rx="3.5" fill="url(#mm-shine)" />
            {Array.from({ length: Math.floor(b.h / 92) }, (_, s) => (
              <ellipse key={s} cx={b.x + 36 + (s % 2) * 4} cy={b.y + 50 + s * 92} rx="3.2" ry="5.5" fill="#1b1414" opacity=".85" />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}
