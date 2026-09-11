interface Props {
  score: number;
}

export default function UselessnessMeter({ score }: Props) {
  const safeScore = Number.isFinite(score) ? score : 0;
  const pct = Math.min(100, Math.max(0, safeScore));
  const segments = 40;
  const filled = Math.round((pct / 100) * segments);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] tracking-widest text-parchment-500">
          USELESSNESS INDEX
        </span>
        <span className="font-mono text-sm text-bronze-400">{pct.toFixed(1)}%</span>
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 transition-colors duration-500 ${
              i < filled
                ? i < segments * 0.3
                  ? "bg-bronze-600"
                  : i < segments * 0.6
                    ? "bg-bronze-500"
                    : i < segments * 0.85
                      ? "bg-bronze-400"
                      : "bg-parchment-200"
                : "bg-ink-700"
            }`}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[9px] tracking-widest text-parchment-600">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
