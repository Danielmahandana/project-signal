export function AdaptiveLoopDiagram() {
  return (
    <div className="my-6 rounded-xl border border-border bg-surface/50 p-4 sm:p-6 md:p-7 shadow-2xs transition-colors">
      <div className="mx-auto max-w-md">
        <svg viewBox="0 0 460 260" className="w-full overflow-visible select-none">
          <defs>
            <marker
              id="notionArrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--svg-stroke)" />
            </marker>
          </defs>

          {/* Node 1: Observe (Top Left) */}
          <g transform="translate(115, 55)">
            <rect
              x="-85"
              y="-22"
              width="170"
              height="44"
              rx="6"
              fill="var(--svg-bg)"
              stroke="var(--svg-stroke)"
              strokeWidth="1.2"
            />
            <text
              y="-2"
              textAnchor="middle"
              className="fill-muted-foreground font-mono text-[9px] font-semibold uppercase tracking-wider"
            >
              01 &middot; DATA
            </text>
            <text
              y="13"
              textAnchor="middle"
              className="fill-foreground font-mono text-xs font-medium"
            >
              Observe Outcome
            </text>
          </g>

          {/* Line 1 to 2 */}
          <path
            d="M 200 55 L 255 55"
            stroke="var(--svg-stroke)"
            strokeWidth="1.2"
            markerEnd="url(#notionArrow)"
          />

          {/* Node 2: Infer (Top Right) */}
          <g transform="translate(345, 55)">
            <rect
              x="-85"
              y="-22"
              width="170"
              height="44"
              rx="6"
              fill="var(--svg-bg)"
              stroke="var(--svg-stroke)"
              strokeWidth="1.2"
            />
            <text
              y="-2"
              textAnchor="middle"
              className="fill-muted-foreground font-mono text-[9px] font-semibold uppercase tracking-wider"
            >
              02 &middot; INFERENCE
            </text>
            <text
              y="13"
              textAnchor="middle"
              className="fill-foreground font-mono text-xs font-medium"
            >
              Bayesian Update
            </text>
          </g>

          {/* Line 2 to 3 (Right drop down) */}
          <path
            d="M 345 77 L 345 163"
            stroke="var(--svg-stroke)"
            strokeWidth="1.2"
            markerEnd="url(#notionArrow)"
          />

          {/* Node 3: Quantify Uncertainty (Bottom Right) */}
          <g transform="translate(345, 185)">
            <rect
              x="-85"
              y="-22"
              width="170"
              height="44"
              rx="6"
              fill="var(--svg-bg)"
              stroke="var(--svg-stroke)"
              strokeWidth="1.2"
            />
            <text
              y="-2"
              textAnchor="middle"
              className="fill-muted-foreground font-mono text-[9px] font-semibold uppercase tracking-wider"
            >
              03 &middot; UNCERTAINTY
            </text>
            <text
              y="13"
              textAnchor="middle"
              className="fill-foreground font-mono text-xs font-medium"
            >
              Quantify Variance (σ)
            </text>
          </g>

          {/* Line 3 to 4 */}
          <path
            d="M 260 185 L 205 185"
            stroke="var(--svg-stroke)"
            strokeWidth="1.2"
            markerEnd="url(#notionArrow)"
          />

          {/* Node 4: Choose Next Evidence (Bottom Left) */}
          <g transform="translate(115, 185)">
            <rect
              x="-85"
              y="-22"
              width="170"
              height="44"
              rx="6"
              fill="var(--svg-stroke)"
              stroke="var(--svg-stroke)"
              strokeWidth="1.2"
            />
            <text
              y="-2"
              textAnchor="middle"
              className="fill-background font-mono text-[9px] font-semibold uppercase tracking-wider"
            >
              04 &middot; SELECTION
            </text>
            <text
              y="13"
              textAnchor="middle"
              className="fill-background font-mono text-xs font-medium"
            >
              Max Info Gain (k*)
            </text>
          </g>

          {/* Loop Line 4 to 1 (Left drop up) */}
          <path
            d="M 115 163 L 115 77"
            stroke="var(--svg-stroke)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            markerEnd="url(#notionArrow)"
          />

          {/* Center Loop Icon */}
          <g transform="translate(230, 120)">
            <circle
              cx="0"
              cy="0"
              r="20"
              fill="var(--svg-bg)"
              stroke="var(--color-border)"
              strokeWidth="1"
            />
            <text y="4" textAnchor="middle" className="fill-foreground font-mono text-xs">
              ↺
            </text>
          </g>
        </svg>
      </div>

      <p className="mt-3 text-center font-mono text-[0.68rem] text-muted-foreground">
        Figure 15.1 &middot; Active inference loop: Belief informs next measurement &middot;
        Measurement informs belief.
      </p>
    </div>
  );
}
