import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, SubSection, Ascii, StatusTag } from "@/components/site/Section";
import { NextPage } from "@/components/site/SiteChrome";
import { M, Eq } from "@/components/site/Math";
import { EvidenceFlow } from "@/components/site/EvidenceFlow";
import { InteractiveBetaLab } from "@/components/site/InteractiveBetaLab";
import { ObservationTimeline } from "@/components/site/ObservationTimeline";
import { TrajectoryTable } from "@/components/site/TrajectoryTable";
import { BeliefStateVisual } from "@/components/site/BeliefStateVisual";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research Evolution Journal — Project Signal" },
      {
        name: "description",
        content:
          "The evolutionary history of Project Signal research: from reported vs observed evidence, through EMA baselines, to Bayesian capability inference (PS-002B).",
      },
      { property: "og:title", content: "Research Journal & Evolution — Project Signal" },
      {
        property: "og:description",
        content: "Chronological research evolution from static scores to dynamic Bayesian belief states.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research Evolution Journal & Lab Notebook"
        title="From Static Scores to Bayesian Capability Inference"
        lede="A chronological record of our research progression: how we moved from written experience to dynamic probabilistic belief states."
      />

      {/* ==========================================
          STAGE 01: FOUNDATIONS & EVIDENCE
         ========================================== */}
      <div id="stage-01" className="scroll-mt-24">
        <Section
          number="01"
          stageTag="Stage 01: Foundations"
          title="Foundations: Reported vs Observed Evidence"
          lede="Why written history is not enough, and why capability requires observation."
        >
          <SubSection subNumber="01.1" title="The Problem with Written History">
            <p>
              A CV tells us what someone has done. It does not necessarily tell us what they can do.
              Job titles are inconsistent across companies. Skills are described differently across
              industries. Written experience is difficult to compare objectively across contexts.
            </p>
            <p>
              We are exploring whether a more truthful representation of human capability can be built
              by combining reported experience with observed behavior in structured tasks.
            </p>
            <blockquote className="border-l-2 border-signal-red pl-5 text-lg italic text-foreground my-4">
              "What evidence do we have about this person's capabilities — and what evidence are we still missing?"
            </blockquote>
          </SubSection>

          <SubSection subNumber="01.2" title="The Core Hypothesis">
            <p>
              A capability profile should be constructed from empirical evidence, not uncalibrated declarations.
              We establish two distinct channels of evidence:
            </p>
            <Ascii>{`                    PERSON
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
        REPORTED             OBSERVED
        EVIDENCE             EVIDENCE
        (CV, Work)          (Behavior)
             │                   │
             └─────────┬─────────┘
                       ▼
                CAPABILITY MODEL`}</Ascii>

            <p className="mt-4 font-semibold text-foreground">
              Interactive Demonstration: Extracting capabilities from reported fragments.
            </p>
            <EvidenceFlow />
          </SubSection>
        </Section>
      </div>

      {/* ==========================================
          STAGE 02: BASELINE 01 — EMA SCALAR MODEL
         ========================================== */}
      <div id="stage-02" className="scroll-mt-24">
        <Section
          number="02"
          stageTag="Stage 02: EMA Baseline"
          title="Baseline 01: Exponential Moving Average"
          lede="The initial baseline update model and its fundamental limitations."
        >
          <SubSection subNumber="02.1" title="The First Baseline Update Rule">
            <p>
              We initialized capability at a neutral mid-point <M>{"\\theta_0 = 0.5"}</M>. For every
              binary response <M>{"y_t \\in \\{0, 1\\}"}</M>, the estimate updated via exponential smoothing:
            </p>
            <Eq
              title="02.1 — Baseline EMA Update Rule"
              note="where η = 0.10 is the constant learning rate and (y_t - θ_t) is instantaneous residual error."
            >
              {"\\theta_{t+1} = \\theta_t + \\eta \\cdot (y_t - \\theta_t)"}
            </Eq>
            <p>
              A success moved the estimate from <M>{"0.50 \\to 0.55"}</M>; a failure moved it from{" "}
              <M>{"0.50 \\to 0.45"}</M>.
            </p>
            <StatusTag kind="built" />
          </SubSection>

          <SubSection subNumber="02.2" title="Why Scalar EMA is Insufficient">
            <p>
              While EMA provides a simple moving estimate, it suffers from a critical flaw:{" "}
              <strong className="text-foreground">it discards the volume of evidence</strong>.
            </p>
            <Ascii>{`EMA Estimate = 0.75  (from 3 observations)
EMA Estimate = 0.75  (from 80 observations)

Both produce the exact same scalar θ = 0.75.`}</Ascii>
            <p>
              Without tracking uncertainty or sample size, a score creates false precision. This led to
              Experiment PS-002: representing belief and uncertainty together.
            </p>
          </SubSection>
        </Section>
      </div>

      {/* ==========================================
          STAGE 03: BASELINE 02 — BAYESIAN PS-002B
         ========================================== */}
      <div id="stage-03" className="scroll-mt-24">
        <Section
          number="03"
          stageTag="Stage 03: Bayesian PS-002B"
          title="Baseline 02: Bayesian Capability Inference"
          lede="Experiment PS-002B: Beta-Binomial inference under mixed evidence."
        >
          <SubSection subNumber="03.1" title="The Beta-Binomial Formulation">
            <p>
              Instead of treating capability as a fixed score, we model it as a{" "}
              <strong className="text-foreground">belief distribution that updates with evidence</strong>.
              We model latent capability <M>{"\\theta"}</M> using a Beta distribution prior:
            </p>
            <Eq title="Prior Distribution" note="where α represents positive evidence, β negative evidence.">
              {"\\theta \\sim Beta(\\alpha, \\beta)"}
            </Eq>
            <p>Starting from the neutral prior <M>{"Beta(1,1)"}</M>, initial expectation is:</p>
            <Eq note="Neutral starting point assuming no prior bias.">
              {"E[\\theta] = \\frac{\\alpha}{\\alpha+\\beta} = \\frac{1}{2} = 0.5"}
            </Eq>
          </SubSection>

          <SubSection subNumber="03.2" title="Updating Posterior Belief">
            <p>
              Each success increments <M>{"\\alpha' = \\alpha + 1"}</M>; each failure increments{" "}
              <M>{"\\beta' = \\beta + 1"}</M>. The posterior becomes <M>{"Beta(\\alpha+s, \\beta+f)"}</M>.
            </p>
            <Eq title="Belief State Triple" note="The complete three-part representation of capability.">
              {"\\boxed{Belief\\ State = \\{ Estimate (\\hat{\\theta}),\\ Uncertainty (\\sigma),\\ Evidence (n) \\}}"}
            </Eq>
            <p>Where uncertainty is defined as posterior standard deviation:</p>
            <Eq note="Uncertainty decreases as sample evidence n = α + β accumulates.">
              {"\\sigma = \\sqrt{\\frac{\\alpha\\beta}{(\\alpha+\\beta)^2(\\alpha+\\beta+1)}}"}
            </Eq>
          </SubSection>

          <SubSection subNumber="03.3" title="Experiment PS-002B: Mixed Evidence Execution">
            <p>
              We tested the model under contradictory, mixed evidence with 9 observations:
            </p>
            <div className="not-prose my-3 flex items-center justify-center gap-2 rounded-xl border border-border bg-card p-3 font-mono text-base">
              <span className="text-signal-green">✓</span>
              <span className="text-signal-green">✓</span>
              <span className="text-signal-red">✕</span>
              <span className="text-signal-green">✓</span>
              <span className="text-signal-red">✕</span>
              <span className="text-signal-green">✓</span>
              <span className="text-signal-green">✓</span>
              <span className="text-signal-red">✕</span>
              <span className="text-signal-green">✓</span>
            </div>
            
            {/* Interactive Beta Simulator */}
            <InteractiveBetaLab />

            {/* Step-by-Step Timeline */}
            <ObservationTimeline />

            {/* Trajectory Table */}
            <TrajectoryTable />

            {/* Key Belief Visual */}
            <BeliefStateVisual
              estimate={0.6364}
              uncertainty={0.1389}
              evidence={9}
              subtext="The estimate changed. The uncertainty remained visible."
            />
          </SubSection>

          <SubSection subNumber="03.4" title="Core Research Findings">
            <div className="not-prose grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="eyebrow text-signal-blue">Finding 01</p>
                <h4 className="mt-1 font-semibold text-foreground">Evidence changes belief</h4>
                <p className="mt-1 text-xs text-muted-foreground">Positive observations increase posterior estimate; failures pull it back.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="eyebrow text-signal-blue">Finding 02</p>
                <h4 className="mt-1 font-semibold text-foreground">Contradictions matter</h4>
                <p className="mt-1 text-xs text-muted-foreground">The model does not ignore failures. Every observation updates belief state.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="eyebrow text-signal-blue">Finding 03</p>
                <h4 className="mt-1 font-semibold text-foreground">Uncertainty is observable</h4>
                <p className="mt-1 text-xs text-muted-foreground">Distinguishes low-sample estimates from highly constrained posteriors.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="eyebrow text-signal-blue">Finding 04</p>
                <h4 className="mt-1 font-semibold text-foreground">Belief state triple</h4>
                <p className="mt-1 text-xs text-muted-foreground">Capability is represented as {"{ Estimate, Uncertainty, Evidence }"}.</p>
              </div>
            </div>
          </SubSection>
        </Section>
      </div>

      {/* ==========================================
          STAGE 04: PHASE 03 — ADAPTIVE SELECTION
         ========================================== */}
      <div id="stage-04" className="scroll-mt-24">
        <Section
          number="04"
          stageTag="Stage 04: Adaptive Selection"
          title="Phase 03: Adaptive Task Selection & Future Work"
          lede="Using belief state to select the next optimal observation."
        >
          <SubSection subNumber="04.1" title="The Next Research Question">
            <p>
              Now that we have a Bayesian belief state, the next question is:{" "}
              <strong className="text-foreground">What should we measure next?</strong>
            </p>
            <Ascii>{`BELIEF  ──►  TASK SELECTION  ──►  OBSERVATION  ──►  BAYESIAN UPDATE
  ▲                                                      │
  └──────────────────────────────────────────────────────┘`}</Ascii>
            <p>
              An adaptive assessment uses maximum information gain to pick tasks that shrink uncertainty
              fastest.
            </p>
          </SubSection>

          <SubSection subNumber="04.2" title="Limitations & Open Questions">
            <div className="not-prose grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card/60 p-4">
                <StatusTag kind="unknown" />
                <h5 className="mt-2 text-sm font-semibold text-foreground">Binary Evidence</h5>
                <p className="mt-1 text-xs text-muted-foreground">Treats responses as 0 or 1, ignoring partial credit.</p>
              </div>
              <div className="rounded-lg border border-border bg-card/60 p-4">
                <StatusTag kind="unknown" />
                <h5 className="mt-2 text-sm font-semibold text-foreground">Equal Evidence Weight</h5>
                <p className="mt-1 text-xs text-muted-foreground">Easy and hard tasks currently update with equal weight.</p>
              </div>
            </div>
          </SubSection>
        </Section>
      </div>

      {/* Manifesto Footer Principle */}
      <div className="mx-auto max-w-5xl px-6 py-12 text-center border-t border-border">
        <blockquote className="text-2xl font-semibold text-foreground italic">
          "Don't give people a score. Give them a belief."
        </blockquote>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          Project Signal Research Principle &middot; Darkroom Systems Engineering
        </p>
      </div>

      <NextPage to="/engine" label="03 — The Cognitive Engine" />
    </>
  );
}
