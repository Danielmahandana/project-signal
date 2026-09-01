export type ObservationOutcome = 1 | 0;

interface EvidenceStreamProps {
  sequence: ObservationOutcome[];
  activeIndex?: number;
  onRemove?: (index: number) => void;
  maxDisplay?: number;
  className?: string;
  emptyLabel?: string;
  size?: "sm" | "md" | "lg";
}

export function EvidenceStream({
  sequence,
  activeIndex,
  onRemove,
  maxDisplay = 40,
  className = "",
  emptyLabel = "No observations recorded yet — system remains at prior state.",
  size = "md",
}: EvidenceStreamProps) {
  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-7 w-7 text-xs",
    lg: "h-8 w-8 text-sm",
  };

  if (sequence.length === 0) {
    return (
      <div
        className={`flex min-h-[36px] items-center rounded border border-dashed border-border px-3 py-1.5 ${className}`}
      >
        <span className="font-mono text-xs text-muted-foreground">{emptyLabel}</span>
      </div>
    );
  }

  const displayed = sequence.slice(0, maxDisplay);
  const remaining = sequence.length - maxDisplay;

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {displayed.map((outcome, idx) => {
        const isSuccess = outcome === 1;
        const isCurrent = activeIndex === idx;

        return (
          <div
            key={idx}
            onClick={() => onRemove && onRemove(idx)}
            title={`Observation ${idx + 1}: ${isSuccess ? "SUCCESS (1)" : "FAILURE (0)"}${onRemove ? " — click to remove" : ""}`}
            className={`group relative inline-flex items-center justify-center rounded border font-mono font-medium transition-all ${
              sizeClasses[size]
            } ${
              isSuccess
                ? "border-border bg-surface text-foreground hover:bg-neutral-200"
                : "border-border bg-surface/60 text-muted-foreground hover:bg-neutral-200"
            } ${isCurrent ? "ring-1 ring-foreground scale-105" : ""} ${
              onRemove ? "cursor-pointer" : ""
            }`}
          >
            <span>{isSuccess ? "✓" : "✕"}</span>
            <span className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 rounded bg-card px-1 font-mono text-[0.55rem] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity border border-border z-10 shadow-2xs">
              {idx + 1}
            </span>
          </div>
        );
      })}

      {remaining > 0 && (
        <span className="font-mono text-xs text-muted-foreground ml-1">+{remaining} more</span>
      )}
    </div>
  );
}
