import { useState, useMemo } from "react";

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
  if (Math.abs(a - 1) < 1e-6 && Math.abs(b - 1) < 1e-6) return 1.0;

  const logB = logGamma(a) + logGamma(b) - logGamma(a + b);
  const logPdf = (a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) - logB;
  return Math.exp(logPdf);
}

export interface BetaDistParams {
  alpha: number;
  beta: number;
  label?: string;
  color?: string;
  strokeDash?: string;
  fillOpacity?: number;
}

interface BetaDistributionCanvasProps {
  primary: BetaDistParams;
  secondary?: BetaDistParams;
  height?: number;
  showMeanLine?: boolean;
  showUncertaintyBand?: boolean;
  showHoverInspector?: boolean;
  showGrid?: boolean;
  className?: string;
  idPrefix?: string;
}

export function BetaDistributionCanvas({
  primary,
  secondary,
  height = 160,
  showMeanLine = true,
  showUncertaintyBand = true,
  showHoverInspector = true,
  showGrid = true,
  className = "",
  idPrefix = "beta",
}: BetaDistributionCanvasProps) {
  const [hoverX, setHoverX] = useState<number | null>(null);

  const svgWidth = 600;
  const paddingX = 30;
  const paddingY = 20;
  const graphW = svgWidth - paddingX * 2;
  const graphH = height - paddingY * 2;

  const primaryData = useMemo(() => {
    const { alpha, beta } = primary;
    const mean = alpha / (alpha + beta);
    const variance = (alpha * beta) / (Math.pow(alpha + beta, 2) * (alpha + beta + 1));
    const sd = Math.sqrt(variance);

    const samples = 140;
    const pts: { x: number; y: number }[] = [];
    let maxY = 1.0;

    for (let i = 0; i <= samples; i++) {
      const x = i / samples;
      const clampedX = Math.min(Math.max(x, 0.002), 0.998);
      const y = betaPdf(clampedX, alpha, beta);
      if (y > maxY && Number.isFinite(y)) maxY = y;
      pts.push({ x, y: Number.isFinite(y) ? y : 0 });
    }

    return { mean, variance, sd, pts, maxY };
  }, [primary]);

  const secondaryData = useMemo(() => {
    if (!secondary) return null;
    const { alpha, beta } = secondary;
    const mean = alpha / (alpha + beta);
    const variance = (alpha * beta) / (Math.pow(alpha + beta, 2) * (alpha + beta + 1));
    const sd = Math.sqrt(variance);

    const samples = 140;
    const pts: { x: number; y: number }[] = [];
    let maxY = 1.0;

    for (let i = 0; i <= samples; i++) {
      const x = i / samples;
      const clampedX = Math.min(Math.max(x, 0.002), 0.998);
      const y = betaPdf(clampedX, alpha, beta);
      if (y > maxY && Number.isFinite(y)) maxY = y;
      pts.push({ x, y: Number.isFinite(y) ? y : 0 });
    }

    return { mean, variance, sd, pts, maxY };
  }, [secondary]);

  const globalMaxY = useMemo(() => {
    const pMax = primaryData.maxY;
    const sMax = secondaryData ? secondaryData.maxY : 0;
    return Math.max(pMax, sMax, 1.2);
  }, [primaryData, secondaryData]);

  const primaryPaths = useMemo(() => {
    const scaleY = graphH / (globalMaxY * 1.12);
    const linePoints = primaryData.pts.map((p) => {
      const px = paddingX + p.x * graphW;
      const py = height - paddingY - Math.min(p.y * scaleY, graphH);
      return `${px.toFixed(1)},${py.toFixed(1)}`;
    });

    const cPath = `M ${linePoints.join(" L ")}`;
    const aPath = `${cPath} L ${svgWidth - paddingX},${height - paddingY} L ${paddingX},${height - paddingY} Z`;
    return { cPath, aPath };
  }, [primaryData, globalMaxY, graphH, height, paddingX, paddingY, svgWidth, graphW]);

  const secondaryPaths = useMemo(() => {
    if (!secondaryData) return null;
    const scaleY = graphH / (globalMaxY * 1.12);
    const linePoints = secondaryData.pts.map((p) => {
      const px = paddingX + p.x * graphW;
      const py = height - paddingY - Math.min(p.y * scaleY, graphH);
      return `${px.toFixed(1)},${py.toFixed(1)}`;
    });

    const cPath = `M ${linePoints.join(" L ")}`;
    const aPath = `${cPath} L ${svgWidth - paddingX},${height - paddingY} L ${paddingX},${height - paddingY} Z`;
    return { cPath, aPath };
  }, [secondaryData, globalMaxY, graphH, height, paddingX, paddingY, svgWidth, graphW]);

  const primaryColor = primary.color || "var(--color-foreground)";
  const secondaryColor = secondary?.color || "var(--color-muted-foreground)";

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!showHoverInspector) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const xPct =
      (clientX - (paddingX / svgWidth) * rect.width) / ((graphW / svgWidth) * rect.width);
    const clampedX = Math.max(0, Math.min(1, xPct));
    setHoverX(clampedX);
  };

  const hoverPrimaryDensity =
    hoverX !== null
      ? betaPdf(Math.max(0.001, Math.min(0.999, hoverX)), primary.alpha, primary.beta)
      : null;

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (!showHoverInspector) return;
    const touch = e.touches[0];
    if (!touch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = touch.clientX - rect.left;
    const xPct =
      (clientX - (paddingX / svgWidth) * rect.width) / ((graphW / svgWidth) * rect.width);
    const clampedX = Math.max(0, Math.min(1, xPct));
    setHoverX(clampedX);
  };

  return (
    <div className={`relative w-full max-w-full overflow-hidden select-none ${className}`}>
      <svg
        viewBox={`0 0 ${svgWidth} ${height}`}
        className="w-full h-auto max-w-full transition-all duration-300 touch-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverX(null)}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setHoverX(null)}
      >
        <defs>
          <linearGradient id={`${idPrefix}-grad-primary`} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-foreground)"
              stopOpacity={primary.fillOpacity ?? 0.15}
            />
            <stop offset="100%" stopColor="var(--color-foreground)" stopOpacity={0.01} />
          </linearGradient>
          {secondary ? (
            <linearGradient id={`${idPrefix}-grad-secondary`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-muted-foreground)"
                stopOpacity={secondary.fillOpacity ?? 0.1}
              />
              <stop offset="100%" stopColor="var(--color-muted-foreground)" stopOpacity={0.01} />
            </linearGradient>
          ) : null}
        </defs>

        {showGrid ? (
          <>
            <line
              x1={paddingX}
              y1={height - paddingY}
              x2={svgWidth - paddingX}
              y2={height - paddingY}
              stroke="var(--color-border)"
              strokeWidth="1.2"
            />
            {[0.25, 0.5, 0.75].map((val) => {
              const xPos = paddingX + val * graphW;
              return (
                <line
                  key={val}
                  x1={xPos}
                  y1={paddingY}
                  x2={xPos}
                  y2={height - paddingY}
                  stroke="var(--color-border)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              );
            })}
          </>
        ) : null}

        {secondary && secondaryPaths ? (
          <>
            <path
              d={secondaryPaths.aPath}
              fill={`url(#${idPrefix}-grad-secondary)`}
              className="transition-all duration-300"
            />
            <path
              d={secondaryPaths.cPath}
              fill="none"
              stroke={secondaryColor}
              strokeWidth="1.8"
              strokeDasharray={secondary.strokeDash || "4 3"}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
            {showMeanLine && secondaryData ? (
              <line
                x1={paddingX + secondaryData.mean * graphW}
                y1={paddingY}
                x2={paddingX + secondaryData.mean * graphW}
                y2={height - paddingY}
                stroke={secondaryColor}
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
            ) : null}
          </>
        ) : null}

        {showUncertaintyBand ? (
          <rect
            x={paddingX + Math.max(0, primaryData.mean - primaryData.sd) * graphW}
            y={paddingY}
            width={Math.min(1, primaryData.sd * 2) * graphW}
            height={graphH}
            fill="var(--color-foreground)"
            fillOpacity="0.06"
            className="transition-all duration-300"
          />
        ) : null}

        <path
          d={primaryPaths.aPath}
          fill={`url(#${idPrefix}-grad-primary)`}
          className="transition-all duration-300"
        />

        <path
          d={primaryPaths.cPath}
          fill="none"
          stroke={primaryColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          className="transition-all duration-300"
        />

        {showMeanLine ? (
          <>
            <line
              x1={paddingX + primaryData.mean * graphW}
              y1={paddingY}
              x2={paddingX + primaryData.mean * graphW}
              y2={height - paddingY}
              stroke={primaryColor}
              strokeWidth="1.5"
              strokeDasharray="3 3"
              className="transition-all duration-300"
            />
            <circle
              cx={paddingX + primaryData.mean * graphW}
              cy={height - paddingY}
              r="4"
              fill={primaryColor}
              className="transition-all duration-300"
            />
          </>
        ) : null}

        {hoverX !== null ? (
          <>
            <line
              x1={paddingX + hoverX * graphW}
              y1={paddingY}
              x2={paddingX + hoverX * graphW}
              y2={height - paddingY}
              stroke="var(--color-muted-foreground)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <circle
              cx={paddingX + hoverX * graphW}
              cy={
                height -
                paddingY -
                Math.min(((hoverPrimaryDensity ?? 0) * graphH) / (globalMaxY * 1.12), graphH)
              }
              r="3.5"
              fill="var(--color-card)"
              stroke={primaryColor}
              strokeWidth="1.8"
            />
          </>
        ) : null}
      </svg>

      {hoverX !== null && hoverPrimaryDensity !== null ? (
        <div
          className="pointer-events-none absolute -top-7 -translate-x-1/2 rounded border border-border bg-card px-2 py-0.5 font-mono text-[0.62rem] text-foreground shadow-2xs"
          style={{
            left: `${((paddingX + hoverX * graphW) / svgWidth) * 100}%`,
          }}
        >
          <span>θ: {hoverX.toFixed(3)}</span> &middot;{" "}
          <span className="font-semibold">p(θ): {hoverPrimaryDensity.toFixed(2)}</span>
        </div>
      ) : null}

      <div className="mt-1.5 flex justify-between font-mono text-[0.65rem] text-muted-foreground">
        <span>0.00</span>
        <span>0.25</span>
        <span>0.50</span>
        <span>0.75</span>
        <span>1.00</span>
      </div>
    </div>
  );
}
