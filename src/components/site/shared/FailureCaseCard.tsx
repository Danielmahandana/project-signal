interface FailureCase {
  id: string;
  title: string;
  input: string;
  modelPrediction: string[];
  groundTruth: string;
  failureReason: string;
  researchDiagnosis: string;
  currentMitigation: string;
}

const FAILURE_CASES: FailureCase[] = [
  {
    id: "fc-01",
    title: "Ambiguity in Managerial Scope",
    input: "I managed several teams across production cycles ensuring daily targets were hit.",
    modelPrediction: ["General Leadership", "Project Management", "Corporate Oversight"],
    groundTruth: "Manufacturing Shift Operations Management (OFO 312201)",
    failureReason: "Semantic dilution of the verb 'managed' in conversational English.",
    researchDiagnosis:
      "The token classifier interprets 'managed' as executive administrative leadership rather than grounding the verb in factory shift operational constraints.",
    currentMitigation:
      "Conditioning entity weights on domain co-occurrence embeddings (e.g. 'production cycles' attenuates corporate leadership classification).",
  },
  {
    id: "fc-02",
    title: "TVET Dual-Trade Qualification Conflation",
    input: "NC(V) in Electrical Infrastructure Construction with mechanical fitting apprentice modules.",
    modelPrediction: ["Mechanical Fitter (OFO 653306)", "Construction Foreman"],
    groundTruth: "Industrial Electrician (OFO 671101)",
    failureReason: "Multilabel interference in hybrid vocational syllabi.",
    researchDiagnosis:
      "Vocational programs integrate cross-disciplinary foundational modules. The classifier over-indexed on secondary mechanical tokens, downgrading the primary trade accreditation.",
    currentMitigation:
      "Enforcing strict National Qualification Framework (NQF) regulatory gazette hierarchies during graph projection.",
  },
  {
    id: "fc-03",
    title: "Sample Starvation in Bayesian Prior",
    input: "Candidate with 1 single observation: Score = 100% (1/1 items correct).",
    modelPrediction: ["Mastery Estimate = 88% (Heuristic / Max Likelihood)"],
    groundTruth: "True Capability = High Epistemic Uncertainty (Credible Interval: [22%, 94%])",
    failureReason: "Premature convergence under single-sample burst.",
    researchDiagnosis:
      "Arithmetic averages or maximum likelihood estimators report absolute certainty on a single correct response. Our Bayesian formulation maintains broad credible intervals rather than premature confidence.",
    currentMitigation:
      "Informative prior initialization with Minimum Information-Gain regularization.",
  },
];

export function FailureCaseCard() {
  return (
    <div className="border-t border-b border-border/40 py-8 font-mono text-xs space-y-8">
      <div className="space-y-1">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
          Empirical Boundary Analysis
        </span>
        <h3 className="text-xl sm:text-2xl font-bold font-sans text-foreground">
          Documented Failure Modes
        </h3>
        <p className="font-sans text-sm text-muted-foreground max-w-2xl">
          Genuine research maturity requires documenting failure modes with the same empirical scrutiny as benchmark successes:
        </p>
      </div>

      <div className="divide-y divide-border/40 border-t border-b border-border/40">
        {FAILURE_CASES.map((fc) => (
          <div key={fc.id} className="py-8 space-y-4 max-w-3xl">
            <div className="flex items-baseline justify-between font-mono text-xs">
              <span className="font-bold text-foreground font-sans text-base">{fc.title}</span>
              <span className="text-muted-foreground uppercase text-[0.68rem] tracking-wider">
                Failure Mode
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-muted-foreground uppercase text-[0.65rem] tracking-wider block">
                Observed Input
              </span>
              <p className="font-sans text-sm text-foreground/90 italic">
                "{fc.input}"
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 font-mono text-xs">
              <div>
                <span className="text-muted-foreground uppercase text-[0.65rem] tracking-wider block mb-1">
                  Model Prediction
                </span>
                <div className="text-muted-foreground">
                  {fc.modelPrediction.join(", ")}
                </div>
              </div>

              <div>
                <span className="text-[#10A37F] uppercase text-[0.65rem] tracking-wider block mb-1">
                  Ground Truth
                </span>
                <div className="text-foreground font-semibold">
                  {fc.groundTruth}
                </div>
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-border/30 font-sans text-xs text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground font-medium font-mono">Diagnosis: </strong>
                {fc.researchDiagnosis}
              </p>
              <p>
                <strong className="text-[#10A37F] font-medium font-mono">Mitigation: </strong>
                {fc.currentMitigation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
