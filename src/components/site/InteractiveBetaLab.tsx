import { useState, useMemo, useEffect, useRef } from "react";

type Observation = 1 | 0;

// Log Gamma function for exact Beta PDF calculation
function logGamma(z: number): number {
  if (z < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * z)) - logGamma(1 - z);
  }
  z -= 1;
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  let sum = c[0] ?? 1.0;
  for (let i = 1; i < c.length; i++) {
    const coeff = c[i] ?? 0;
    sum += coeff / (z + i);
  }
  const t = z + c.length - 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(sum);
}

function betaPdf(x: number, a: number, b: number): number {
  if (x <= 0 || x >= 1) return 0;
  const logB = logGamma(a) + logGamma(b) - logGamma(a + b);
  const logPdf = (a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) - logB;
  return Math.exp(logPdf);
}

const PS002B_SEQUENCE: Observation[] = [1, 1, 0, 1, 0, 1, 1, 0, 1];

export function InteractiveBetaLab() {
  const [obs, setObs] = useState<Observation[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Compute Bayesian state
  const { alpha, beta, mean, variance, sd, n, curvePath, areaPath } = useMemo(() => {
    let a = 1;
    let b = 1;
    for (const o of obs) {
      if (o === 1) a += 1;
      else b += 1;
    }

    const totalObs = obs.length;
    const m = a / (a + b);
    const v = (a * b) / (Math.pow(a + b, 2) * (a + b + 1));
    const s = Math.sqrt(v);

    // Compute curve points
    const samples = 100;
    const pts: { x: number; y: number }[] = [];
    let maxY = 0;

    for (let i = 0; i <= samples; i++) {
      const x = i / samples;
      // Clamp for numerical safety
      const clampedX = Math.min(Math.max(x, 0.001), 0.999);
      const y = betaPdf(clampedX, a, b);
      if (y > maxY) maxY = y;
      pts.push({ x, y });
    }

    const svgWidth = 500;
    const svgHeight = 160;
    const padding = 20;
    const graphW = svgWidth - padding * 2;
    const graphH = svgHeight - padding * 2;

    const scaleY = maxY > 0 ? graphH / (maxY * 1.1) : 1;

    const linePoints = pts.map((p) => {
      const px = padding + p.x * graphW;
      const py = svgHeight - padding - p.y * scaleY;
      return `${px.toFixed(1)},${py.toFixed(1)}`;
    });

    const cPath = `M ${linePoints.join(" L ")}`;
    const aPath = `${cPath} L ${svgWidth - padding},${svgHeight - padding} L ${padding},${svgHeight - padding} Z`;

    return {
      alpha: a,
      beta: b,
      mean: m,
      variance: v,
      sd: s,
      n: totalObs,
      curvePath: cPath,
      areaPath: aPath,
    };
  }, [obs]);

  // Handle playing the preset PS-002B sequence
  useEffect(() => {
    if (isPlaying) {
      if (obs.length < PS002B_SEQUENCE.length) {
        playTimerRef.current = setTimeout(() => {
          setObs((prev) => {
            const nextItem = PS002B_SEQUENCE[prev.length];
            return nextItem !== undefined ? [...prev, nextItem] : prev;
          });
        }, 600);
      } else {
        setIsPlaying(false);
      }
    }
    return () => {
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
    };
  }, [isPlaying, obs]);

  const handlePlaySequence = () => {
    setObs([]);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setObs([]);
  };

  const successes = obs.filter((o) => o === 1).length;
  const failures = obs.filter((o) => o === 0).length;

  return (
    <div className="my-8 rounded-2xl border border-border bg-card p-6 md:p-8 backdrop-blur-xs transition-all">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <p className="eyebrow">INTERACTIVE MODEL</p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            Beta Distribution Posterior State:{" "}
            <span className="font-mono text-signal-blue">
              Beta({alpha}, {beta})
            </span>
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setObs((prev) => [...prev, 1])}
            className="btn-text hover:border-signal-green/60 hover:text-signal-green"
          >
            SUCCESS +
          </button>
          <button
            type="button"
            onClick={() => setObs((prev) => [...prev, 0])}
            className="btn-text hover:border-signal-red/60 hover:text-signal-red"
          >
            FAILURE +
          </button>
          <button
            type="button"
            onClick={handlePlaySequence}
            disabled={isPlaying}
            className="btn-text border-signal-blue/40 text-signal-blue hover:bg-signal-blue/10"
          >
            {isPlaying ? "REPLAYING..." : "REPLAY PS-002B →"}
          </button>
          <button type="button" onClick={handleReset} className="btn-text text-muted-foreground">
            RESET
          </button>
        </div>
      </div>

      {/* Observation Pill Stream */}
      <div className="mt-5 flex min-h-[32px] flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-muted-foreground">Sequence ({obs.length}):</span>
        {obs.length === 0 ? (
          <span className="font-mono text-xs italic text-muted-foreground/60">
            No observations yet — starting from Prior Beta(1,1)
          </span>
        ) : (
          obs.map((o, idx) => (
            <span
              key={idx}
              className={`inline-flex h-7 w-7 items-center justify-center rounded-md border font-mono text-xs font-semibold transition-all ${
                o === 1
                  ? "border-signal-green/40 bg-signal-green/10 text-signal-green"
                  : "border-signal-red/40 bg-signal-red/10 text-signal-red"
              }`}
            >
              {o === 1 ? "✓" : "✕"}
            </span>
          ))
        )}
      </div>

      {/* Beta Curve Visualisation */}
      <div className="relative mt-6 rounded-xl border border-border/80 bg-background/50 p-4">
        <svg viewBox="0 0 500 160" className="w-full overflow-visible">
          <defs>
            <linearGradient id="betaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.52 0.19 262)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="oklch(0.52 0.19 262)" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="20" y1="140" x2="480" y2="140" className="stroke-border" strokeWidth="1" />
          <line
            x1="250"
            y1="20"
            x2="250"
            y2="140"
            className="stroke-border/40"
            strokeDasharray="3 3"
          />

          {/* Beta Fill Area */}
          <path
            d={areaPath}
            fill="url(#betaGradient)"
            className="transition-all duration-300 ease-out"
          />

          {/* Beta Curve Stroke */}
          <path
            d={curvePath}
            fill="none"
            className="stroke-signal-blue transition-all duration-300 ease-out"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Mean Vertical Line indicator */}
          <line
            x1={20 + mean * 460}
            y1="20"
            x2={20 + mean * 460}
            y2="140"
            className="stroke-signal-blue transition-all duration-300"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Mean marker dot */}
          <circle
            cx={20 + mean * 460}
            cy="140"
            r="4"
            className="fill-signal-blue transition-all duration-300"
          />
        </svg>

        {/* Labels under graph */}
        <div className="mt-2 flex justify-between font-mono text-[0.68rem] text-muted-foreground">
          <span>0.00</span>
          <span>0.25</span>
          <span className="font-semibold text-foreground">0.50 (Prior)</span>
          <span>0.75</span>
          <span>1.00</span>
        </div>
      </div>

      {/* Synchronized Metrics grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-lg border border-border/70 bg-card p-3 text-center">
          <p className="eyebrow">Positive (α)</p>
          <p className="mt-1 font-mono text-xl font-semibold text-foreground">{alpha}</p>
        </div>
        <div className="rounded-lg border border-border/70 bg-card p-3 text-center">
          <p className="eyebrow">Negative (β)</p>
          <p className="mt-1 font-mono text-xl font-semibold text-foreground">{beta}</p>
        </div>
        <div className="rounded-lg border border-border/70 bg-card p-3 text-center">
          <p className="eyebrow">Estimate (E[θ])</p>
          <p className="mt-1 font-mono text-xl font-semibold text-signal-blue">{mean.toFixed(4)}</p>
        </div>
        <div className="rounded-lg border border-border/70 bg-card p-3 text-center">
          <p className="eyebrow">Uncertainty (σ)</p>
          <p className="mt-1 font-mono text-xl font-semibold text-foreground">{sd.toFixed(4)}</p>
        </div>
        <div className="col-span-2 rounded-lg border border-border/70 bg-card p-3 text-center sm:col-span-1">
          <p className="eyebrow">Evidence (n)</p>
          <p className="mt-1 font-mono text-xl font-semibold text-foreground">{n}</p>
        </div>
      </div>
    </div>
  );
}
