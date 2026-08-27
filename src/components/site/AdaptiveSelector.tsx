import { useState } from "react";

const initial = [
  { name: "Reasoning", estimate: 0.78, n: 22 },
  { name: "Decisions", estimate: 0.54, n: 5 },
  { name: "Pattern", estimate: 0.83, n: 31 },
  { name: "Signal", estimate: 0.61, n: 2 },
  { name: "Systems", estimate: 0.49, n: 7 },
];

function sd(estimate: number, n: number) {
  const a = 1 + estimate * n;
  const b = 1 + (1 - estimate) * n;
  return Math.sqrt((a * b) / ((a + b) * (a + b) * (a + b + 1)));
}

export function AdaptiveSelector() {
  const [dims, setDims] = useState(initial);
  const target = dims.reduce((best, d) =>
    sd(d.estimate, d.n) > sd(best.estimate, best.n) ? d : best,
  );

  return (
    <div className="not-prose rounded-xl border border-border bg-card p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow">Illustration 04 — what should we ask next?</p>
        <div className="flex gap-2">
          <button
            onClick={() =>
              setDims((ds) => ds.map((d) => (d.name === target.name ? { ...d, n: d.n + 6 } : d)))
            }
            className="rounded-md border border-foreground/20 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-accent"
          >
            run next best task
          </button>
          <button
            onClick={() => setDims(initial)}
            className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent"
          >
            reset
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {dims.map((d) => {
          const s = sd(d.estimate, d.n);
          const isTarget = d.name === target.name;
          return (
            <div
              key={d.name}
              className="grid min-w-0 grid-cols-[4.5rem_minmax(0,1fr)_4.3rem] items-center gap-2 sm:grid-cols-[6rem_minmax(0,1fr)_5.5rem] sm:gap-3"
            >
              <span
                className={`text-xs font-semibold ${isTarget ? "text-signal-red" : "text-muted-foreground"}`}
              >
                {d.name}
              </span>
              <div className="relative h-6">
                <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
                <div
                  className="absolute top-1/2 h-3 -translate-y-1/2 rounded-full bg-signal-blue/20 transition-all duration-700"
                  style={{
                    left: `${Math.max(0, d.estimate - s * 2) * 100}%`,
                    width: `${Math.min(1, s * 4) * 100}%`,
                  }}
                />
                <div
                  className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ${
                    isTarget ? "bg-signal-red" : "bg-foreground"
                  }`}
                  style={{ left: `${d.estimate * 100}%` }}
                />
              </div>
              <span className="text-right font-mono text-[0.7rem] text-muted-foreground">
                n={d.n} ±{s.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
        Highest remaining uncertainty: <span className="text-signal-red">{target.name}</span>. The
        adaptive selector would choose the observation expected to reduce it most — not simply the
        next task in the sequence.
      </p>
    </div>
  );
}
