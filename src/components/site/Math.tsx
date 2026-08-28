import { InlineMath, BlockMath } from "react-katex";

export function M({ children }: { children: string }) {
  return (
    <span className="inline-flex items-baseline px-1.5 py-0.5 rounded font-mono text-[0.92em] text-foreground bg-surface border border-border/80 shadow-2xs">
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
      className={`blueprint-card my-6 max-w-full overflow-hidden rounded-xl p-5 md:p-6 shadow-xs backdrop-blur-md transition-all hover:border-signal-blue/50 ${className}`}
    >
      {title ? (
        <div className="mb-3 border-b border-border/60 pb-2 text-center font-mono text-[0.65rem] font-bold uppercase tracking-widest text-signal-blue">
          {title}
        </div>
      ) : null}
      <div className="my-3 flex justify-center overflow-x-auto py-2 text-foreground text-lg sm:text-xl font-extrabold tracking-tight">
        <BlockMath math={children} />
      </div>
      {note ? (
        <figcaption className="mt-3 border-t border-border/50 pt-2.5 text-center font-mono text-[0.72rem] text-muted-foreground leading-relaxed">
          {note}
        </figcaption>
      ) : null}
    </figure>
  );
}
