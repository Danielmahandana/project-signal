import { useState } from "react";

interface EvidenceItem {
  id: string;
  label: string;
  category: string;
  deltaA: number;
  deltaB: number;
  description: string;
}

const EVIDENCE_OPTIONS: EvidenceItem[] = [
  {
    id: "proj",
    label: "+ Completed Project",
    category: "Artefact",
    deltaA: 3.2,
    deltaB: 0.8,
    description: "Production microservice merged with passing tests and peer review.",
  },
  {
    id: "test",
    label: "+ Assessment Result",
    category: "Formal Evaluation",
    deltaA: 2.1,
    deltaB: 0.6,
    description: "Proctored algorithmic challenge solved in 88th percentile latency.",
  },
  {
    id: "work",
    label: "+ Work Experience",
    category: "Historical Signal",
    deltaA: 1.8,
    deltaB: 1.2,
    description: "6 months tenure maintaining distributed data processing jobs.",
  },
  {
    id: "peer",
    label: "+ Peer Evaluation",
    category: "Qualitative",
    deltaA: 2.5,
    deltaB: 0.5,
    description: "Senior team lead endorsement verifying code craftsmanship.",
  },
];

export function BeliefUpdateWidget() {
  const [alpha, setAlpha] = useState<number>(6.8);
  const [beta, setBeta] = useState<number>(3.2);
  const [history, setHistory] = useState<string[]>([]);

  const totalObservations = alpha + beta;
  const mean = alpha / totalObservations;
  const meanPct = Math.round(mean * 100);

  // Approximate 90% credible bounds
  const variance = (alpha * beta) / (Math.pow(totalObservations, 2) * (totalObservations + 1));
  const stdDev = Math.sqrt(variance);
  const lowerBound = Math.max(0, Math.round((mean - 1.645 * stdDev) * 100));
  const upperBound = Math.min(100, Math.round((mean + 1.645 * stdDev) * 100));

  const addEvidence = (item: EvidenceItem) => {
    setAlpha((prev) => parseFloat((prev + item.deltaA).toFixed(1)));
    setBeta((prev) => parseFloat((prev + item.deltaB).toFixed(1)));
    setHistory((prev) => [...prev, item.label.replace("+ ", "")]);
  };

  const resetBelief = () => {
    setAlpha(6.8);
    setBeta(3.2);
    setHistory([]);
  };

  return (
    <div className="border-t border-b border-border/40 py-8 font-mono text-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-3">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
            Bayesian Belief State P(&theta; | E)
          </span>
          <span className="text-foreground font-sans font-semibold text-sm">
            Target Competency: Python / Data Engineering
          </span>
        </div>
        <div>
          {history.length > 0 && (
            <button
              type="button"
              onClick={resetBelief}
              className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
              Reset prior &rarr;
            </button>
          )}
        </div>
      </div>

      {/* Latent Expectation Display */}
      <div className="space-y-4">
        <div className="flex items-baseline justify-between">
          <div className="space-y-1">
            <span className="text-muted-foreground text-[0.65rem] uppercase tracking-wider block">
              Latent Expectation E[&theta;]
            </span>
            <div className="flex items-baseline space-x-3">
              <span className="text-4xl sm:text-5xl font-bold font-sans text-foreground">
                {meanPct}%
              </span>
              <span className="text-muted-foreground text-xs">
                90% Credible Interval: [{lowerBound}%, {upperBound}%]
              </span>
            </div>
          </div>

          <div className="text-right text-[0.7rem] text-muted-foreground">
            <div>&alpha; = {alpha.toFixed(1)} (positive evidence)</div>
            <div>&beta; = {beta.toFixed(1)} (counter evidence)</div>
          </div>
        </div>

        {/* Minimal Bar Representation */}
        <div className="space-y-1">
          <div className="h-1.5 w-full bg-border/40 relative">
            <div
              className="absolute top-0 bottom-0 bg-[#10A37F]/30 transition-all duration-300"
              style={{
                left: `${lowerBound}%`,
                width: `${Math.max(4, upperBound - lowerBound)}%`,
              }}
            />
            <div
              className="h-full bg-[#10A37F] transition-all duration-300"
              style={{ width: `${meanPct}%` }}
            />
          </div>
          <div className="flex justify-between text-[0.65rem] text-muted-foreground pt-1">
            <span>0.0 (Uncertain)</span>
            <span>0.5 (Prior)</span>
            <span>1.0 (Mastery)</span>
          </div>
        </div>
      </div>

      {/* Evidence Buttons (Clean Minimal Row, No Heavy Boxes) */}
      <div className="space-y-2 pt-2">
        <span className="text-xs uppercase tracking-wider text-muted-foreground block">
          Inject Observable Evidence:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EVIDENCE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => addEvidence(opt)}
              className="p-3 border-b border-border/60 hover:border-[#10A37F] transition-colors text-left cursor-pointer group"
            >
              <div className="font-semibold text-foreground text-xs group-hover:text-[#10A37F] transition-colors">
                {opt.label}
              </div>
              <div className="text-[0.65rem] text-muted-foreground mt-1">
                +{opt.deltaA} &alpha; &middot; {opt.category}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Research Insight */}
      <p className="font-sans text-xs text-muted-foreground leading-relaxed pt-2 max-w-3xl">
        <strong className="text-foreground font-medium">Research insight:</strong> Every additional observation updates the posterior belief without asserting unjustified certainty. As &alpha; and &beta; grow, the variance shrinks, narrowing the [{lowerBound}%, {upperBound}%] interval.
      </p>

      {/* History Trail */}
      {history.length > 0 && (
        <div className="pt-2 text-[0.68rem] text-muted-foreground flex items-center space-x-2 flex-wrap">
          <span>Observation stream:</span>
          {history.map((h, i) => (
            <span key={i} className="text-foreground">
              {i + 1}. {h} {i < history.length - 1 && "·"}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
