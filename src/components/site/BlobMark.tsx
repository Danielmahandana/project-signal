export function BlobMark({ className = "" }: { className?: string }) {
  // 4 distinct clean shapes with matching 8-point cubic bezier topology for seamless SVG morphing:
  // Shape 1: Rounded Squircle / Soft Rectangle
  // Shape 2: Organic Curved Pebble
  // Shape 3: Geometric Shield / Teardrop
  // Shape 4: Smooth Horizontal Lozenge Capsule
  const shape1 =
    "M 170,42 C 225,42 268,70 272,115 C 276,160 228,188 170,188 C 112,188 64,160 68,115 C 72,70 115,42 170,42 Z";
  const shape2 =
    "M 170,36 C 240,48 285,82 260,135 C 235,188 195,194 140,184 C 85,174 60,138 75,90 C 90,42 100,24 170,36 Z";
  const shape3 =
    "M 170,38 C 215,38 275,65 265,120 C 255,175 195,192 170,192 C 145,192 85,175 75,120 C 65,65 125,38 170,38 Z";
  const shape4 =
    "M 170,52 C 238,52 284,80 284,115 C 284,150 238,178 170,178 C 102,178 56,150 56,115 C 56,80 102,52 170,52 Z";

  const morphValues = `${shape1}; ${shape2}; ${shape3}; ${shape4}; ${shape1}`;

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="45 25 250 180"
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label="Project Signal Mark"
      >
        <defs>
          <linearGradient id="cleanFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-foreground)" stopOpacity="0.96" />
            <stop offset="100%" stopColor="var(--color-foreground)" stopOpacity="0.88" />
          </linearGradient>
        </defs>

        {/* Morphing Clean Shape */}
        <path
          d={shape1}
          fill="url(#cleanFill)"
          className="transition-transform duration-500 hover:scale-[1.02]"
        >
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values={morphValues}
            keyTimes="0; 0.25; 0.5; 0.75; 1"
            calcMode="spline"
            keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
          />
        </path>

        {/* Clean Center Wordmark */}
        <text
          x="170"
          y="118"
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-background font-mono text-[13px] font-medium tracking-[0.24em] uppercase pointer-events-none"
        >
          project signal
        </text>
      </svg>
    </div>
  );
}
