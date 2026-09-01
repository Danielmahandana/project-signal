export function TrajectoryTable() {
  const rows = [
    { obs: "Prior", res: "—", a: 1, b: 1, est: "0.5000", unc: "0.2887" },
    { obs: "1", res: "✓", a: 2, b: 1, est: "0.6667", unc: "0.2357" },
    { obs: "2", res: "✓", a: 3, b: 1, est: "0.7500", unc: "0.1936" },
    { obs: "3", res: "✕", a: 3, b: 2, est: "0.6000", unc: "0.2000" },
    { obs: "4", res: "✓", a: 4, b: 2, est: "0.6667", unc: "0.1782" },
    { obs: "5", res: "✕", a: 4, b: 3, est: "0.5714", unc: "0.1750" },
    { obs: "6", res: "✓", a: 5, b: 3, est: "0.6250", unc: "0.1614" },
    { obs: "7", res: "✓", a: 6, b: 3, est: "0.6667", unc: "0.1491" },
    { obs: "8", res: "✕", a: 6, b: 4, est: "0.6000", unc: "0.1477" },
    { obs: "9", res: "✓", a: 7, b: 4, est: "0.6364", unc: "0.1389", isFinal: true },
  ];

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="border-b border-border/60 p-4 sm:px-6">
        <p className="eyebrow">THE TRAJECTORY</p>
        <h4 className="mt-1 text-base font-semibold text-foreground">
          Observation Updates Summary Table
        </h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30 uppercase tracking-wider text-muted-foreground">
              <th className="py-3 pl-6 pr-3 text-right">Observation</th>
              <th className="px-3 py-3 text-center">Result</th>
              <th className="px-3 py-3 text-right">α</th>
              <th className="px-3 py-3 text-right">β</th>
              <th className="px-3 py-3 text-right">Estimate (E[θ])</th>
              <th className="py-3 pl-3 pr-6 text-right">Uncertainty (σ)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {rows.map((r, i) => (
              <tr
                key={i}
                className={`transition-colors hover:bg-accent/40 ${
                  r.isFinal ? "bg-signal-blue/10 font-bold" : ""
                }`}
              >
                <td className="py-3 pl-6 pr-3 text-right text-muted-foreground">{r.obs}</td>
                <td
                  className={`px-3 py-3 text-center font-bold ${
                    r.res === "✓"
                      ? "text-signal-green"
                      : r.res === "✕"
                        ? "text-signal-red"
                        : "text-muted-foreground"
                  }`}
                >
                  {r.res}
                </td>
                <td className="px-3 py-3 text-right text-foreground">{r.a}</td>
                <td className="px-3 py-3 text-right text-foreground">{r.b}</td>
                <td
                  className={`px-3 py-3 text-right ${r.isFinal ? "text-signal-blue text-sm" : "text-foreground"}`}
                >
                  {r.est}
                </td>
                <td
                  className={`py-3 pl-3 pr-6 text-right ${r.isFinal ? "text-signal-blue text-sm" : "text-muted-foreground"}`}
                >
                  {r.unc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
