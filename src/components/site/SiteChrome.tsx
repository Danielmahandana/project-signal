import { Link } from "@tanstack/react-router";

const nav = [
  { to: "/", label: "Overview" },
  { to: "/research", label: "Research" },
  { to: "/engine", label: "Engine" },
  { to: "/models", label: "Models" },
  { to: "/roadmap", label: "Roadmap" },
  { to: "/status", label: "Status" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link to="/" className="text-[0.8rem] font-semibold uppercase tracking-[0.22em]">
          Systems Engineering Team at Darkroom
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-foreground font-semibold" }}
              className="transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p className="uppercase tracking-[0.18em]">Cognitive Engine Research</p>
        <p>Systems Engineering Team at Darkroom — a research programme, not a product claim.</p>
      </div>
    </footer>
  );
}

export function NextPage({ to, label }: { to: string; label: string }) {
  return (
    <div className="mx-auto max-w-5xl border-t border-border px-6 py-12">
      <Link
        to={to}
        className="group inline-flex items-baseline gap-3 text-lg font-semibold transition-colors hover:text-signal-blue"
      >
        <span className="eyebrow">Next</span>
        {label}
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}
