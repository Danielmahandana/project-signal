import { useRef } from "react";
import { Link } from "@tanstack/react-router";

export interface TrackItem {
  number: string;
  tag: string;
  title: string;
  description: string;
  linkTo?: string;
  formulaOrCode?: string;
}

interface HorizontalTrackProps {
  items: TrackItem[];
  title?: string;
  eyebrow?: string;
  className?: string;
}

export function HorizontalTrack({
  items,
  title = "Research Continuum",
  eyebrow = "THE LAB // FIVE-PILLAR SYSTEM",
  className = "",
}: HorizontalTrackProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 380;
    scrollContainerRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className={`py-16 sm:py-24 border-t border-border/40 overflow-hidden ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div className="space-y-2 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif tracking-tight text-foreground">
            {title}
          </h2>
        </div>

        {/* Scroll Controls */}
        <div className="flex items-center space-x-2 font-mono text-xs">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-9 h-9 rounded-full border border-border/70 flex items-center justify-center text-foreground hover:bg-surface hover:border-foreground/40 transition-colors cursor-pointer"
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-9 h-9 rounded-full border border-border/70 flex items-center justify-center text-foreground hover:bg-surface hover:border-foreground/40 transition-colors cursor-pointer"
          >
            &rarr;
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-auto pb-6 pt-2 scrollbar-none no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-80 sm:w-96 snap-start rounded-md border border-border/60 bg-surface/60 hover:bg-surface p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-accent/50 hover:shadow-lg group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span className="text-foreground font-semibold group-hover:text-accent transition-colors">
                  {item.number}
                </span>
                <span className="text-[0.68rem] uppercase tracking-wider">
                  {item.tag}
                </span>
              </div>

              <h3 className="text-2xl font-editorial-serif tracking-tight text-foreground group-hover:text-accent transition-colors leading-snug">
                {item.title}
              </h3>

              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              {item.formulaOrCode && (
                <div className="p-3 rounded bg-background/80 border border-border/40 font-mono text-[0.7rem] text-foreground/80">
                  {item.formulaOrCode}
                </div>
              )}
            </div>

            {item.linkTo && (
              <div className="pt-6 mt-6 border-t border-border/40">
                <Link
                  to={item.linkTo}
                  className="font-mono text-xs text-foreground group-hover:text-accent inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore pillar</span>
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
