interface Props {
  score: number;
}

export default function UselessnessMeter({ score }: Props) {
  const safeScore = Number.isFinite(score) ? score : 0;
  const pct = Math.min(100, Math.max(0, safeScore));

  // Map 0–100 to -90deg … +90deg arc (180 total sweep)
  const angleDeg = -90 + (pct / 100) * 180;
  const angleRad = (angleDeg * Math.PI) / 180;

  // Needle end point on arc of radius 60 centered at (80, 80)
  const cx = 80;
  const cy = 80;
  const r = 54;
  const needleX = cx + r * Math.cos(angleRad);
  const needleY = cy + r * Math.sin(angleRad);

  // Color zones
  const dialColor =
    pct < 35 ? "#836533" :
    pct < 65 ? "#b8945a" :
    pct < 85 ? "#c9a96a" :
    "#e8c060";

  const label =
    pct < 20 ? "Negligible" :
    pct < 40 ? "Minor" :
    pct < 60 ? "Moderate" :
    pct < 80 ? "Severe" :
    "Catastrophic";

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[9px] tracking-[0.3em] text-bronze-600 font-mono uppercase">
          Uselessness Index
        </span>
        <span className="font-mono text-xs text-bronze-400">{pct.toFixed(1)}%</span>
      </div>

      {/* Semicircular gauge */}
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-[160px]">
          <svg viewBox="0 0 160 90" className="w-full overflow-visible">
            {/* Gauge arc background track */}
            <path
              d="M 14 80 A 66 66 0 0 1 146 80"
              stroke="rgba(37,32,25,1)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />

            {/* Zone arcs */}
            {/* Green zone: -90 → -18deg */}
            <path
              d="M 14 80 A 66 66 0 0 1 51.7 27.5"
              stroke="#4a3a1a"
              strokeWidth="8"
              fill="none"
              strokeLinecap="butt"
            />
            {/* Amber zone: -18 → +54deg */}
            <path
              d="M 51.7 27.5 A 66 66 0 0 1 119.1 47.5"
              stroke="#7a5a20"
              strokeWidth="8"
              fill="none"
              strokeLinecap="butt"
            />
            {/* Red zone: +54 → +90deg */}
            <path
              d="M 119.1 47.5 A 66 66 0 0 1 146 80"
              stroke="#5a1a1a"
              strokeWidth="8"
              fill="none"
              strokeLinecap="butt"
            />

            {/* Active fill arc */}
            {pct > 0 && (
              <path
                d="M 14 80 A 66 66 0 0 1 146 80"
                stroke={dialColor}
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(pct / 100) * 207} 207`}
                style={{ transition: "stroke-dasharray 1s ease-out, stroke 0.5s" }}
              />
            )}

            {/* Tick marks */}
            {[0, 25, 50, 75, 100].map((tick) => {
              const a = -90 + (tick / 100) * 180;
              const ar = (a * Math.PI) / 180;
              const x1 = cx + 62 * Math.cos(ar);
              const y1 = cy + 62 * Math.sin(ar);
              const x2 = cx + 70 * Math.cos(ar);
              const y2 = cy + 70 * Math.sin(ar);
              return (
                <line
                  key={tick}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="rgba(201,169,106,0.3)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Needle */}
            <line
              x1={cx}
              y1={cy}
              x2={needleX}
              y2={needleY}
              stroke={dialColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ transition: "all 1s ease-out" }}
            />
            {/* Needle pivot */}
            <circle cx={cx} cy={cy} r="4" fill="#1a1614" stroke={dialColor} strokeWidth="1.2" />
            <circle cx={cx} cy={cy} r="1.5" fill={dialColor} />

            {/* Score readout */}
            <text
              x={cx}
              y="70"
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
              fill="rgba(201,169,106,0.9)"
            >
              {pct.toFixed(0)}%
            </text>
          </svg>
        </div>

        {/* Label */}
        <div className="mt-1 flex flex-col items-center gap-0.5">
          <span
            className="font-serif text-sm italic"
            style={{ color: dialColor, transition: "color 0.5s" }}
          >
            {label}
          </span>
          <div className="flex items-center gap-3 mt-1">
            <span className="font-mono text-[8px] text-parchment-700">0%</span>
            <div className="h-px w-16 bg-gradient-to-r from-bronze-900 via-bronze-600 to-red-900/60" />
            <span className="font-mono text-[8px] text-parchment-700">100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
