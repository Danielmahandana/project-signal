import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

const nav = [
  { to: "/", number: "00", label: "Overview" },
  { to: "/research", number: "01", label: "Research Journal" },
  { to: "/models", number: "02", label: "Models & Inference" },
  { to: "/engine", number: "03", label: "Cognitive Engine" },
  { to: "/roadmap", number: "04", label: "Roadmap" },
  { to: "/status", number: "05", label: "Status & Unknowns" },
] as const;

export function SiteHeader() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setIsScrolled(currentY > 20);

          // Require significant scroll delta (> 40px) to collapse/expand to prevent flickering loop
          if (currentY > 180) {
            const delta = currentY - lastY;
            if (delta > 40) {
              setIsExpanded(false);
            } else if (delta < -40) {
              setIsExpanded(true);
            }
          } else {
            setIsExpanded(true);
          }
          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/60 transition-shadow duration-300 ${
        isScrolled ? "shadow-xs" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 py-2 sm:px-5 md:px-8">
        {/* Header Control & Compact Indicator Bar */}
        <div className="flex items-center justify-between gap-4 py-1">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="h-2 w-2 rounded-full bg-signal-blue animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider text-foreground group-hover:text-signal-blue transition-colors">
              /project-signal
            </span>
            <span className="hidden sm:inline-block rounded-md border border-border px-2 py-0.5 font-mono text-[0.58rem] text-muted-foreground">
              v0.2.0-beta
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 text-[0.6rem] font-mono text-muted-foreground">
              <span>Darkroom Systems Engineering</span>
              <span className="text-foreground/30">&middot;</span>
              <span>Daniel &middot; Narvin &middot; Thabang</span>
            </div>

            {/* Collapse / Expand Focus Button */}
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-label={isExpanded ? "Collapse navigation bar" : "Expand navigation bar"}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 font-mono text-[0.6rem] font-semibold text-muted-foreground hover:border-signal-blue hover:text-foreground transition-all cursor-pointer"
            >
              {isExpanded ? (
                <>
                  <span>COLLAPSE NAV</span>
                  <span className="text-signal-blue">▲</span>
                </>
              ) : (
                <>
                  <span>EXPAND NAV</span>
                  <span className="text-signal-blue">▼</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Navigation Body with Smooth CSS Height Transition */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded
              ? "max-h-48 opacity-100 mt-2 border-t border-border/40 pt-2.5 pb-2"
              : "max-h-0 opacity-0 mt-0 pt-0 pb-0 border-transparent"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <nav className="relative flex min-w-0 gap-3 overflow-x-auto text-[0.68rem] text-muted-foreground sm:gap-5">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  activeOptions={{ exact: n.to === "/" }}
                  activeProps={{
                    className: "text-foreground font-semibold border-b-2 border-signal-blue pb-1",
                  }}
                  className="group relative z-10 flex shrink-0 items-center gap-1.5 py-0.5 transition-colors hover:text-foreground"
                >
                  <span className="font-mono text-[0.58rem] text-muted-foreground/70">
                    {n.number}
                  </span>
                  <span>{n.label}</span>
                </Link>
              ))}
            </nav>

            {/* Quick Jump Stage Pills */}
            <div className="hidden lg:flex items-center gap-1.5 font-mono text-[0.6rem]">
              <span className="text-muted-foreground/60 mr-1 uppercase tracking-widest text-[0.55rem]">
                Stage Jump:
              </span>
              <a
                href="/research#stage-01"
                className="rounded-full border border-border/80 px-2.5 py-0.5 text-muted-foreground hover:border-signal-blue hover:text-foreground transition-all"
              >
                01: Foundations
              </a>
              <a
                href="/research#stage-02"
                className="rounded-full border border-border/80 px-2.5 py-0.5 text-muted-foreground hover:border-signal-amber hover:text-foreground transition-all"
              >
                02: EMA
              </a>
              <a
                href="/research#stage-03"
                className="rounded-full border border-signal-blue/40 bg-signal-blue/5 px-2.5 py-0.5 text-signal-blue font-semibold hover:bg-signal-blue/10 transition-all"
              >
                03: PS-002B Bayesian
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12 bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono uppercase tracking-[0.18em] font-semibold text-foreground">
            Project Signal
          </p>
          <p className="mt-1 text-[0.7rem]">
            A research programme into evidence, inference and human capability.
          </p>
        </div>
        <p className="font-mono text-[0.65rem]">
          Systems Engineering Team at Darkroom &middot; Daniel &middot; Narvin &middot; Thabang
        </p>
      </div>
    </footer>
  );
}

export function NextPage({ to, label }: { to: string; label: string }) {
  return (
    <div className="mx-auto max-w-5xl border-t border-border px-6 py-12">
      <Link
        to={to as never}
        className="group inline-flex items-baseline gap-3 text-lg font-semibold transition-colors hover:text-signal-blue"
      >
        <span className="eyebrow">Next Chapter</span>
        {label}
        <span className="transition-transform group-hover:translate-x-1.5">→</span>
      </Link>
    </div>
  );
}
