import { useState } from "react";

const fragments = [
  "Senior Analyst, 2019–2023",
  "Python, SQL",
  "Led migration project",
  "BSc Statistics",
  "Built reporting pipeline",
  "Stakeholder workshops",
];

const capabilities = ["Reasoning", "Decomposition", "Pattern recognition", "Decisions"];

export function EvidenceFlow() {
  const [split, setSplit] = useState(false);
  return (
    <div className="not-prose rounded-xl border border-border bg-card p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow">Illustration 01 — from CV to capability</p>
        <button
          onClick={() => setSplit((s) => !s)}
          className="rounded-md border border-foreground/20 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-accent"
        >
          {split ? "recombine" : "fragment into evidence"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="space-y-2">
          {fragments.map((f, i) => (
            <div
              key={f}
              className="rounded-md border border-border bg-background px-3 py-2 font-mono text-[0.7rem] text-muted-foreground transition-all duration-700"
              style={{
                transform: split ? `translateX(${(i % 2 ? -1 : 1) * 10}px)` : "none",
                opacity: split ? 0.45 : 1,
              }}
            >
              {f}
            </div>
          ))}
        </div>
        <div className="hidden text-center text-muted-foreground md:block">
          <div className="ascii">{"──▶\n\nextract\n\n──▶"}</div>
        </div>
        <div className="space-y-2">
          {capabilities.map((c, i) => (
            <div
              key={c}
              className="rounded-md border px-3 py-2 text-[0.75rem] font-semibold transition-all duration-700"
              style={{
                borderColor: split ? "var(--signal-blue)" : "var(--border)",
                color: split ? "var(--signal-blue)" : "var(--muted-foreground)",
                transform: split ? "translateY(0)" : `translateY(${i * 2}px)`,
                opacity: split ? 1 : 0.6,
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
        Reported evidence gives an initial map. It does not yet tell us how someone thinks.
      </p>
    </div>
  );
}
