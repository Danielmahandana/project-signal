interface InteractiveSliderProps {
  label: string;
  symbol?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  description?: string;
  className?: string;
}

export function InteractiveSlider({
  label,
  symbol,
  value,
  min,
  max,
  step = 0.01,
  onChange,
  formatValue = (v) => v.toFixed(2),
  description,
  className = "",
}: InteractiveSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {symbol && (
            <span className="font-mono text-xs font-bold text-signal-blue px-1.5 py-0.5 rounded bg-signal-blue/10 border border-signal-blue/20">
              {symbol}
            </span>
          )}
          <span className="font-mono text-xs font-semibold text-foreground tracking-tight">
            {label}
          </span>
        </div>
        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded border border-border bg-card text-foreground">
          {formatValue(value)}
        </span>
      </div>

      <div className="relative flex items-center h-6">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-signal-blue focus:outline-none"
        />
      </div>

      <div className="flex justify-between font-mono text-[0.65rem] text-muted-foreground">
        <span>{formatValue(min)}</span>
        {description ? <span className="italic text-[0.62rem]">{description}</span> : null}
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}
