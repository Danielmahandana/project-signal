export function HiddenStateDiagram({
  currentTheta = 0.5,
  latestObservation = null,
}: {
  currentTheta?: number;
  latestObservation?: 1 | 0 | null;
}) {
  return (
    <div className="my-6 rounded-xl border border-border bg-surface/50 p-4 sm:p-6 md:p-7 shadow-2xs transition-colors">
      <div className="mx-auto max-w-lg overflow-hidden">
        <svg viewBox="0 0 520 300" className="w-full h-auto max-w-full select-none">
          {/* Node 1: Hidden State θ (Top) */}
          <g transform="translate(260, 42)">
            <rect
              x="-105"
              y="-26"
              width="210"
              height="52"
              rx="8"
              fill="var(--svg-bg)"
              stroke="var(--svg-stroke)"
              strokeWidth="1.5"
            />
            <text
              y="-5"
              textAnchor="middle"
              className="fill-muted-foreground font-mono text-[9px] font-semibold tracking-wider uppercase"
            >
              LATENT PARAMETER
            </text>
            <text
              y="16"
              textAnchor="middle"
              className="fill-foreground font-mono text-sm font-semibold tracking-wide"
            >
              Hidden State θ
            </text>
          </g>

          {/* Forking Lines */}
          <line
            x1="260"
            y1="68"
            x2="260"
            y2="98"
            stroke="var(--svg-stroke-muted)"
            strokeWidth="1.2"
          />
          <line
            x1="130"
            y1="98"
            x2="390"
            y2="98"
            stroke="var(--svg-stroke-muted)"
            strokeWidth="1.2"
          />
          <line
            x1="130"
            y1="98"
            x2="130"
            y2="128"
            stroke="var(--svg-stroke-muted)"
            strokeWidth="1.2"
          />
          <line
            x1="390"
            y1="98"
            x2="390"
            y2="128"
            stroke="var(--svg-stroke-muted)"
            strokeWidth="1.2"
          />

          {/* Observe Label */}
          <rect
            x="225"
            y="88"
            width="70"
            height="20"
            rx="4"
            fill="var(--svg-bg)"
            stroke="var(--color-border)"
            strokeWidth="1"
          />
          <text
            x="260"
            y="102"
            textAnchor="middle"
            className="fill-muted-foreground font-mono text-[9px] font-medium uppercase tracking-wider"
          >
            OBSERVE
          </text>

          {/* Left Node: Observation Success */}
          <g transform="translate(130, 155)">
            <rect
              x="-85"
              y="-22"
              width="170"
              height="44"
              rx="6"
              fill="var(--svg-bg)"
              stroke={latestObservation === 1 ? "var(--svg-stroke)" : "var(--color-border)"}
              strokeWidth={latestObservation === 1 ? "1.8" : "1"}
              className="transition-colors duration-200"
            />
            <text
              y="-3"
              textAnchor="middle"
              className="fill-muted-foreground font-mono text-[9px] font-semibold uppercase tracking-wider"
            >
              Observation (y = 1)
            </text>
            <text
              y="13"
              textAnchor="middle"
              className="fill-foreground font-mono text-xs font-medium"
            >
              Task Success (✓)
            </text>
          </g>

          {/* Right Node: Observation Failure */}
          <g transform="translate(390, 155)">
            <rect
              x="-85"
              y="-22"
              width="170"
              height="44"
              rx="6"
              fill="var(--svg-bg)"
              stroke={latestObservation === 0 ? "var(--svg-stroke)" : "var(--color-border)"}
              strokeWidth={latestObservation === 0 ? "1.8" : "1"}
              className="transition-colors duration-200"
            />
            <text
              y="-3"
              textAnchor="middle"
              className="fill-muted-foreground font-mono text-[9px] font-semibold uppercase tracking-wider"
            >
              Observation (y = 0)
            </text>
            <text
              y="13"
              textAnchor="middle"
              className="fill-foreground font-mono text-xs font-medium"
            >
              Task Failure (✕)
            </text>
          </g>

          {/* Merging Lines */}
          <line
            x1="130"
            y1="177"
            x2="130"
            y2="202"
            stroke="var(--svg-stroke-muted)"
            strokeWidth="1.2"
          />
          <line
            x1="390"
            y1="177"
            x2="390"
            y2="202"
            stroke="var(--svg-stroke-muted)"
            strokeWidth="1.2"
          />
          <line
            x1="130"
            y1="202"
            x2="390"
            y2="202"
            stroke="var(--svg-stroke-muted)"
            strokeWidth="1.2"
          />
          <line x1="260" y1="202" x2="260" y2="230" stroke="var(--svg-stroke)" strokeWidth="1.5" />

          {/* INFER Central Tag */}
          <rect x="230" y="192" width="60" height="20" rx="4" fill="var(--svg-stroke)" />
          <text
            x="260"
            y="206"
            textAnchor="middle"
            className="fill-background font-mono text-[9px] font-semibold uppercase tracking-wider"
          >
            INFER
          </text>

          {/* Node 4: Current Belief (Bottom) */}
          <g transform="translate(260, 258)">
            <rect
              x="-115"
              y="-24"
              width="230"
              height="48"
              rx="8"
              fill="var(--svg-bg)"
              stroke="var(--svg-stroke)"
              strokeWidth="1.5"
            />
            <text
              y="-4"
              textAnchor="middle"
              className="fill-muted-foreground font-mono text-[9px] font-semibold uppercase tracking-wider"
            >
              POSTERIOR BELIEF
            </text>
            <text
              y="14"
              textAnchor="middle"
              className="fill-foreground font-mono text-xs font-bold tracking-wide"
            >
              Current Belief &middot; θ ≈ {currentTheta.toFixed(3)}
            </text>
          </g>
        </svg>
      </div>

      <p className="mt-3 text-center font-mono text-[0.68rem] text-muted-foreground">
        Figure 00.1 &middot; Discrete evidence flows into continuous posterior belief state.
      </p>
    </div>
  );
}
