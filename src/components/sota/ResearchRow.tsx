import { useState } from "react";
import { Link } from "@tanstack/react-router";

export interface ResearchRowProps {
  number: string;
  title: string;
  category: string;
  year: string | number;
  status?: string;
  imageSrc?: string;
  linkTo: string;
  leadAuthor?: string;
}

export function ResearchRow({
  number,
  title,
  category,
  year,
  status = "Active",
  imageSrc,
  linkTo,
  leadAuthor,
}: ResearchRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={linkTo}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="OPEN"
      className="group relative block border-b border-border/40 py-6 sm:py-8 transition-colors duration-300 hover:bg-surface/40 px-2 sm:px-4 rounded-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
        {/* Left: Number and Title */}
        <div className="flex items-baseline space-x-6 sm:space-x-10 max-w-3xl">
          <span className="font-mono text-xs font-semibold text-muted-foreground group-hover:text-accent transition-colors">
            {number}
          </span>
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-editorial-serif tracking-tight text-foreground group-hover:text-accent transition-colors">
              {title}
            </h3>
            <div className="flex items-center space-x-3 font-mono text-[0.7rem] text-muted-foreground">
              <span className="uppercase">{category}</span>
              <span>&middot;</span>
              <span>{year}</span>
              {leadAuthor && (
                <>
                  <span>&middot;</span>
                  <span className="hidden md:inline">Lead: {leadAuthor}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Status badge & Arrow */}
        <div className="flex items-center space-x-4 self-end sm:self-center font-mono text-xs text-muted-foreground">
          <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full border border-border/60 bg-surface/50 group-hover:border-accent/40 group-hover:text-foreground transition-colors">
            {status}
          </span>
          <span className="text-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:text-accent">
            &rarr;
          </span>
        </div>
      </div>

      {/* Floating preview image revealed on hover on desktop */}
      {imageSrc && isHovered && (
        <div className="hidden lg:block absolute right-32 top-1/2 -translate-y-1/2 w-48 h-28 rounded-md overflow-hidden shadow-2xl border border-white/20 pointer-events-none z-30 animate-in fade-in zoom-in-95 duration-200">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      )}
    </Link>
  );
}
