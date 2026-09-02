import { useMemo } from "react";
import katex from "katex";

export function M({ children }: { children: string }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(children, {
        throwOnError: false,
        displayMode: false,
      });
    } catch {
      return children;
    }
  }, [children]);

  return (
    <span
      className="inline-math px-1.5 py-0.5 rounded font-mono text-[0.92em] text-foreground bg-surface/80 border border-border/80 shadow-2xs mx-0.5 align-middle"
      dangerouslySetInnerHTML={{ __html: html }}
    />
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
  const html = useMemo(() => {
    try {
      return katex.renderToString(children, {
        throwOnError: false,
        displayMode: true,
      });
    } catch {
      return children;
    }
  }, [children]);

  return (
    <figure
      className={`my-6 max-w-full overflow-hidden rounded-xl border border-border bg-card/80 p-4 sm:p-5 md:p-6 shadow-2xs backdrop-blur-xs transition-all ${className}`}
    >
      {title ? (
        <div className="mb-2.5 border-b border-border/60 pb-2 text-center font-mono text-[0.68rem] font-bold uppercase tracking-widest text-signal-blue">
          {title}
        </div>
      ) : null}
      <div className="my-2 w-full overflow-x-auto overflow-y-hidden text-center py-1.5 text-foreground text-base sm:text-lg md:text-xl font-medium tracking-tight scrollbar-thin">
        <div
          className="inline-block text-left sm:text-center max-w-full px-1"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      {note ? (
        <figcaption className="mt-3 border-t border-border/50 pt-2.5 text-center font-mono text-[0.72rem] text-muted-foreground leading-relaxed">
          {note}
        </figcaption>
      ) : null}
    </figure>
  );
}
