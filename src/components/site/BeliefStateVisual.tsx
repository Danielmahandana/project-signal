import { useId } from "react";

interface BeliefStateProps {
  estimate?: number;
  uncertainty?: number;
  evidence?: number;
  label?: string;
  subtext?: string;
  showCaption?: boolean;
}

export function BeliefStateVisual({
  estimate = 0.6364,
  uncertainty = 0.1389,
  evidence = 9,
  label = "BELIEF STATE",
  subtext,
  showCaption = true,
}: BeliefStateProps) {
  const gradientId = useId();
  // Map estimate (0 to 1) to percentage across the line (e.g. 10% to 90%)
  const minPct = 10;
  const maxPct = 90;
  const posPct = minPct + estimate * (maxPct - minPct);
  
  // Uncertainty width percentage
  const uncWidthPct = uncertainty * (maxPct - minPct);
  const uncLeftPct = Math.max(minPct, posPct - uncWidthPct);
  const uncRightPct = Math.min(maxPct, posPct + uncWidthPct);

  return (
    <div className="my-8 rounded-2xl border border-border bg-card/80 p-6 md:p-8 text-center backdrop-blur-sm shadow-xs transition-all">
      <p className="eyebrow tracking-[0.2em]">{label}</p>
      
      {/* Primary Estimate Number */}
      <div className="mt-4 flex items-baseline justify-center gap-1">
        <span className="font-mono text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
          {estimate.toFixed(4)}
        </span>
      </div>

      {/* Belief Slider / Distribution Bar Visual */}
      <div className="relative mx-auto my-8 max-w-md px-4">
        {/* Baseline hairline */}
        <div className="relative h-[2px] w-full bg-border">
          {/* Uncertainty Band */}
          <div
            className="absolute top-1/2 h-3 -translate-y-1/2 rounded-full bg-signal-blue/20 transition-all duration-500 ease-out"
            style={{
              left: `${uncLeftPct}%`,
              width: `${uncRightPct - uncLeftPct}%`,
            }}
          />
          {/* Uncertainty boundary markers */}
          <div
            className="absolute top-1/2 h-4 w-[1px] -translate-y-1/2 bg-signal-blue/50 transition-all duration-500"
            style={{ left: `${uncLeftPct}%` }}
          />
          <div
            className="absolute top-1/2 h-4 w-[1px] -translate-y-1/2 bg-signal-blue/50 transition-all duration-500"
            style={{ left: `${uncRightPct}%` }}
          />

          {/* Estimate Dot & Drop Line */}
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
            style={{ left: `${posPct}%` }}
          >
            <div className="h-4 w-4 rounded-full border-2 border-background bg-foreground shadow-sm transition-transform hover:scale-125" />
            <div className="mx-auto h-6 w-[1px] bg-foreground/40" />
          </div>
        </div>

        {/* Labels underneath visual */}
        <div className="mt-8 flex justify-between text-[0.68rem] font-mono text-muted-foreground">
          <span>0.00 (Failure)</span>
          <span className="font-semibold text-foreground">θ = {estimate.toFixed(4)}</span>
          <span>1.00 (Success)</span>
        </div>
      </div>

      {/* Metric Breakdown */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-6 border-t border-border/50 pt-5 font-mono text-xs text-muted-foreground">
        <div>
          <span className="text-foreground/60">Uncertainty (σ):</span>{" "}
          <span className="font-semibold text-foreground">± {uncertainty.toFixed(4)}</span>
        </div>
        <div className="h-3 w-[1px] bg-border" />
        <div>
          <span className="text-foreground/60">Evidence:</span>{" "}
          <span className="font-semibold text-foreground">{evidence} observations</span>
        </div>
      </div>

      {showCaption ? (
        <p className="mt-6 text-sm font-medium text-foreground/90 italic">
          {subtext || "The estimate changed. The uncertainty remained visible."}
        </p>
      ) : null}
    </div>
  );
}
