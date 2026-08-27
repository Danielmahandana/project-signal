const stages = ["Hypothesis", "Prototype", "Test", "Observe", "Evaluate", "Refine"];

export function ResearchLoop() {
  const r = 108;
  const cx = 150;
  const cy = 150;
  return (
    <div className="not-prose rounded-xl border border-border bg-card p-6">
      <p className="eyebrow">Illustration 05 — the research loop</p>
      <svg viewBox="0 0 300 300" className="mx-auto mt-2 w-full max-w-sm">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          className="stroke-border"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          className="stroke-signal-blue"
          strokeWidth="2"
          strokeDasharray="40 640"
          strokeLinecap="round"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-680" dur="8s" repeatCount="indefinite" />
        </circle>
        {stages.map((s, i) => {
          const angle = (i / stages.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          return (
            <g key={s}>
              <circle cx={x} cy={y} r="5" className="fill-background stroke-foreground" strokeWidth="1.5" />
              <text
                x={cx + Math.cos(angle) * (r + 26)}
                y={cy + Math.sin(angle) * (r + 26) + 4}
                textAnchor="middle"
                className="fill-foreground text-[10px] font-semibold"
              >
                {s}
              </text>
            </g>
          );
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          smallest system
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          that teaches us something
        </text>
      </svg>
    </div>
  );
}
