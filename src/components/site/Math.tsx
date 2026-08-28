import { InlineMath, BlockMath } from "react-katex";

export function M({ children }: { children: string }) {
  return (
    <span className="inline-flex items-baseline px-1 py-0.5 rounded font-mono text-[0.95em] text-foreground bg-accent/30 border border-border/40">
      <InlineMath math={children} />
    </span>
  );
}

export function Eq({
  children,
  note,
  title,
  className = "",
}: {
  children: string;
  note?: string;
  title?: string;
  className?: string;
}) {
  return (
    <figure
      className={`my-6 max-w-full overflow-hidden rounded-xl border border-border/80 bg-card p-4 sm:p-6 shadow-xs backdrop-blur-xs transition-all hover:border-signal-blue/50 ${className}`}
    >
      {title ? (
        <div className="mb-3 border-b border-border/60 pb-2 text-center font-mono text-[0.65rem] font-semibold uppercase tracking-widest text-signal-blue">
          {title}
        </div>
      ) : null}
      <div className="my-3 flex justify-center overflow-x-auto py-1 text-foreground">
        <BlockMath math={children} />
      </div>
      {note ? (
        <figcaption className="mt-3 border-t border-border/40 pt-2.5 text-center font-mono text-[0.72rem] text-muted-foreground">
          {note}
        </figcaption>
      ) : null}
    </figure>
  );
}
