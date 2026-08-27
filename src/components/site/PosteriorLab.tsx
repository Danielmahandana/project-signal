import { useMemo, useState } from "react";

type Obs = 1 | 0;

function betaPdf(x: number, a: number, b: number) {
  // unnormalised is fine, we scale to max
  return Math.pow(x, a - 1) * Math.pow(1 - x, b - 1);
}

export function PosteriorLab() {
  const [obs, setObs] = useState<Obs[]>([]);
  const eta = 0.1;

  const { emaPath, ema, alpha, beta, mean, sd, curve } = useMemo(() => {
    let theta = 0.5;
    const emaSeries = [0.5];
    let a = 1;
    let b = 1;
    for (const y of obs) {
      theta = theta + eta * (y - theta);
      emaSeries.push(theta);
      if (y === 1) a += 1;
      else b += 1;
    }
    const w = 420;
    const h = 120;
    const stepX = emaSeries.length > 1 ? w / (emaSeries.length - 1) : w;
    const path = emaSeries
      .map((v, i) => `${i === 0 ? "M" : "L"}${(i * stepX).toFixed(1)},${(h - v * h).toFixed(1)}`)
      .join(" ");

    const m = a / (a + b);
    const variance = (a * b) / ((a + b) * (a + b) * (a + b + 1));
    const pts: { x: number; y: number }[] = [];
    let max = 0;
    for (let i = 0; i <= 120; i++) {
      const x = i / 120;
      const y = betaPdf(Math.min(Math.max(x, 1e-6), 1 - 1e-6), a, b);
      max = Math.max(max, y);
      pts.push({ x, y });
    }
    const curvePath =
      pts
        .map(
          (p, i) =>
            `${i === 0 ? "M" : "L"}${(p.x * 420).toFixed(1)},${(120 - (p.y / max) * 110).toFixed(1)}`,
        )
        .join(" ") + " L420,120 L0,120 Z";

    return {
      emaPath: path,
      ema: theta,
      alpha: a,
      beta: b,
      mean: m,
      sd: Math.sqrt(variance),
      curve: curvePath,
    };
  }, [obs]);

  const successes = obs.filter((o) => o === 1).length;

  return (
    <div className="not-prose rounded-xl border border-border bg-card p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow">Illustration 02 — observation → inference</p>
        <div className="flex gap-2">
          <button
            onClick={() => setObs((o) => [...o, 1])}
            className="rounded-md border border-signal-green/40 px-3 py-1.5 text-xs font-semibold text-signal-green transition-colors hover:bg-signal-green/10"
          >
            + correct
          </button>
          <button
            onClick={() => setObs((o) => [...o, 0])}
            className="rounded-md border border-signal-red/40 px-3 py-1.5 text-xs font-semibold text-signal-red transition-colors hover:bg-signal-red/10"
          >
            + incorrect
          </button>
          <button
            onClick={() => setObs([])}
            className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent"
          >
            reset
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {obs.length === 0 ? (
          <span className="text-xs text-muted-foreground">No observations yet — prior only.</span>
        ) : (
          obs.map((o, i) => (
            <span
              key={i}
              className={`flex h-6 w-6 items-center justify-center rounded border font-mono text-xs ${
                o === 1
                  ? "border-signal-green/40 text-signal-green"
                  : "border-signal-red/40 text-signal-red"
              }`}
            >
              {o === 1 ? "✓" : "✕"}
            </span>
          ))
        )}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold">EMA — estimate only</p>
          <svg viewBox="0 0 420 120" className="w-full">
            <line x1="0" y1="60" x2="420" y2="60" className="stroke-border" strokeDasharray="3 4" />
            <path d={emaPath} fill="none" className="stroke-foreground" strokeWidth="2" />
          </svg>
          <p className="mt-2 font-mono text-xs text-muted-foreground">θ = {ema.toFixed(3)}</p>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold">Beta posterior — estimate + uncertainty</p>
          <svg viewBox="0 0 420 120" className="w-full">
            <path d={curve} className="fill-signal-blue/15 stroke-signal-blue" strokeWidth="2" />
            <line
              x1={mean * 420}
              y1="0"
              x2={mean * 420}
              y2="120"
              className="stroke-signal-blue"
              strokeDasharray="4 4"
            />
          </svg>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            α={alpha} β={beta} · E[θ]={mean.toFixed(3)} · sd={sd.toFixed(3)}
          </p>
        </div>
      </div>

      <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
        {obs.length} observation{obs.length === 1 ? "" : "s"} · {successes} correct. As evidence
        accumulates, the posterior narrows — the EMA line does not tell you how much evidence stands
        behind it.
      </p>
    </div>
  );
}
