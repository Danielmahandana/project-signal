import { Link } from "@tanstack/react-router";

const nav = [
  { to: "/", number: "00", label: "Overview" },
  { to: "/research", number: "01", label: "The research" },
  { to: "/engine", number: "02", label: "Cognitive engine" },
  { to: "/models", number: "03", label: "Models & mathematics" },
  { to: "/roadmap", number: "04", label: "Roadmap" },
  { to: "/status", number: "05", label: "Status & unknowns" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-5 md:px-8 md:py-4">
        <div className="flex items-baseline justify-between gap-4">
          <Link to="/" className="font-mono text-[0.68rem] font-medium text-foreground">
            /project-signal
          </Link>
          <p className="max-w-[48%] truncate text-[0.58rem] text-muted-foreground sm:max-w-none sm:text-[0.6rem]">
            Daniel · Narvin · Thabang
          </p>
        </div>
        <nav className="relative mt-3 flex min-w-0 gap-3 overflow-x-auto pb-1 text-[0.64rem] text-muted-foreground before:absolute before:left-1 before:right-1 before:top-[0.34rem] before:h-px before:bg-border sm:gap-5 sm:text-[0.68rem]">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{
                className: "text-foreground font-semibold before:scale-100 before:bg-signal-red",
              }}
              className="group relative z-10 flex shrink-0 flex-col gap-1 bg-background/90 pr-1 transition-colors before:h-2 before:w-2 before:scale-75 before:rounded-full before:bg-border before:transition-transform before:content-[''] hover:text-foreground hover:before:scale-100"
            >
              <span className="font-mono text-[0.58rem] text-muted-foreground/70">{n.number}</span>
              <span>{n.label}</span>
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
        <p className="uppercase tracking-[0.18em]">Project Signal</p>
        <p>Systems Engineering Team at Darkroom · Daniel · Narvin · Thabang</p>
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
        <span className="eyebrow">Next</span>
        {label}
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}
