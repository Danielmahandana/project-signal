export type AudienceView = "overview" | "system" | "experiments" | "paper";

interface AudienceViewSelectorProps {
  currentView: AudienceView;
  onViewChange: (view: AudienceView) => void;
}

const VIEWS: { id: AudienceView; label: string; audience: string; icon: string }[] = [
  { id: "overview", label: "01 OVERVIEW", audience: "General & Concept", icon: "●" },
  { id: "system", label: "02 SYSTEM", audience: "Architecture & Engineering", icon: "⎔" },
  { id: "experiments", label: "03 EXPERIMENTS", audience: "Empirical Notebook", icon: "▲" },
  { id: "paper", label: "04 PAPER", audience: "Formal Theory & Math", icon: "§" },
];

export function AudienceViewSelector({ currentView, onViewChange }: AudienceViewSelectorProps) {
  return (
    <div className="w-full bg-surface border-y border-border py-2.5 px-4 sticky top-14 z-40 backdrop-blur-md bg-surface/90">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="eyebrow text-[0.65rem] text-muted-foreground">RESEARCH DEPTH:</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {VIEWS.map((v) => {
            const isActive = currentView === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => onViewChange(v.id)}
                className={`px-3 py-1 rounded transition-all cursor-pointer whitespace-nowrap text-left ${
                  isActive
                    ? "bg-foreground text-background font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-card border border-transparent hover:border-border"
                }`}
              >
                <span>{v.label}</span>
                <span className="hidden md:inline text-[0.62rem] opacity-75 ml-1.5 font-normal font-sans">
                  ({v.audience})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
