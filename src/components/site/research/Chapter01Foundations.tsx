import { useState } from "react";
import { Section, StatusTag } from "@/components/site/Section";
import { M, Eq } from "@/components/site/Math";
import { InspectDrawer, CodeSnippet } from "@/components/site/shared/InspectDrawer";
import { EvidenceStream, type ObservationOutcome } from "@/components/site/shared/EvidenceStream";
import { HiddenStateDiagram } from "@/components/site/shared/HiddenStateDiagram";
export function Chapter01Foundations() {
  const [openingObs, setOpeningObs] = useState<ObservationOutcome[]>([]);
  const [openingTheta, setOpeningTheta] = useState<number>(0.5);

  const handleAddObservation = (outcome: ObservationOutcome) => {
    setOpeningObs((prev) => [...prev, outcome]);
    setOpeningTheta((prev) => {
      const eta = 0.1;
      return Number((prev + eta * (outcome - prev)).toFixed(3));
    });
  };

  const handleObserveNext = () => {
    const sampleSequence: ObservationOutcome[] = [1, 1, 0, 1, 0, 1, 1, 0, 1];
    const nextOutcome = sampleSequence[openingObs.length % sampleSequence.length] ?? 1;
    handleAddObservation(nextOutcome);
  };

  const handleReset = () => {
    setOpeningObs([]);
    setOpeningTheta(0.5);
  };

  const latestOutcome = openingObs.length > 0 ? (openingObs[openingObs.length - 1] ?? null) : null;

  return (
    <section id="chapter-01" className="scroll-mt-16">
      {/* Chapter Indicator */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 pb-2">
        <div className="flex items-center gap-2">
          <span className="eyebrow">01 &middot; THE RESEARCH QUESTION &amp; FOUNDATIONS</span>
          <StatusTag kind="built" />
        </div>
      </div>

      {/* =========================================================================
          SECTION 00 — THE OPENING
          ========================================================================= */}
      <Section
        id="section-00"
        number="00"
        title="How do we know what we know?"
        lede="A capability cannot always be observed directly. We see evidence of it through actions, decisions, responses and performance."
      >
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-foreground/90">
          <p>
            When an engineer diagnoses a complex system failure, or when a strategist navigates
            conflicting priorities, their intrinsic cognitive capability is not directly readable by
            an external sensor.
          </p>

          <p>
            Instead, the external world receives <strong>discrete empirical evidence</strong>: a
            successful decision, an error under time pressure, a sequence of trade-offs. From these
            observable signals, an inference system must construct and maintain a formal belief
            about what remains hidden.
          </p>
        </div>

        {/* Dynamic Visual Diagram */}
        <HiddenStateDiagram currentTheta={openingTheta} latestObservation={latestOutcome} />

        <div className="my-6 border-l-2 border-foreground pl-4 sm:pl-5 py-1">
          <p className="text-base sm:text-lg font-semibold text-foreground">
            What should the system believe?
          </p>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            This establishes the core research problem before introducing mathematical formalisms:
            how should discrete evidence transform into continuous belief?
          </p>
        </div>

        {/* Focused Interactive Observation Experience */}
        <div className="my-6 sm:my-8 rounded-xl border border-border bg-card p-4 sm:p-6 md:p-8 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <p className="eyebrow">INTERACTIVE DEMONSTRATION</p>
              <h3 className="mt-1 text-base sm:text-lg font-semibold text-foreground">
                Interactive Inference: Sequential Updating in Real Time
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={handleObserveNext}
                className="btn-text bg-surface font-semibold"
              >
                OBSERVE →
              </button>
              <button type="button" onClick={() => handleAddObservation(1)} className="btn-text">
                + SUCCESS (✓)
              </button>
              <button
                type="button"
                onClick={() => handleAddObservation(0)}
                className="btn-text text-muted-foreground"
              >
                + FAILURE (✕)
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="btn-text text-muted-foreground"
                title="Reset sequence"
              >
                RESET ↺
              </button>
            </div>
          </div>

          {/* Evidence Stream Display */}
          <div className="mt-5 space-y-2">
            <div className="flex flex-wrap justify-between text-xs font-mono text-muted-foreground gap-1">
              <span>Evidence Stream ({openingObs.length} observations):</span>
              <span>Prior State: θ₀ = 0.500</span>
            </div>
            <EvidenceStream
              sequence={openingObs}
              emptyLabel="Click [ OBSERVE → ] to generate the first evidence impulse."
            />
          </div>

          {/* Current Inferred State */}
          <div className="mt-5 rounded-lg border border-border bg-surface/50 p-4 sm:p-5 text-center">
            <p className="eyebrow">INFERRED ESTIMATE</p>
            <div className="mt-1 font-mono text-3xl sm:text-4xl font-bold text-foreground">
              θ = {openingTheta.toFixed(3)}
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {openingObs.length === 0
                ? "Starting at neutral uninformative midpoint (0.500)."
                : `Sequentially updated from ${openingObs.length} empirical observation${openingObs.length === 1 ? "" : "s"}.`}
            </p>
          </div>

          {/* Central Thesis Transition */}
          <div className="mt-5 rounded-lg border border-border bg-surface p-3.5 sm:p-4 text-center">
            <p className="text-xs sm:text-sm font-medium text-foreground">
              "The problem is not simply estimating a capability. The problem is knowing how much
              evidence supports that estimate."
            </p>
          </div>
        </div>

        {/* Technical Derivation Drawer */}
        <InspectDrawer
          title="Inspect Mathematical Formulation: Latent Capability & Bernoulli Likelihood"
          badge="Layer 3: Math Formulation"
        >
          <p>
            Let <M>{"\\theta \\in [0, 1]"}</M> represent the participant's latent capability
            parameter. For each discrete task attempt <M>{"t"}</M>, the observed response{" "}
            <M>{"y_t \\in \\{0, 1\\}"}</M> is drawn conditionally from a Bernoulli likelihood:
          </p>
          <Eq
            title="Likelihood Model"
            note="Probability of success conditioned on latent capability θ."
          >
            {"P(y_t = 1 \\mid \\theta) = \\theta, \\quad P(y_t = 0 \\mid \\theta) = 1 - \\theta"}
          </Eq>
          <p>
            For an independent sequence of observations <M>{"Y = \\{y_1, y_2, \\dots, y_n\\}"}</M>{" "}
            with <M>{"k"}</M> successes:
          </p>
          <Eq note="Joint likelihood of n independent binary observations.">
            {
              "L(\\theta \\mid Y) = \\prod_{t=1}^{n} \\theta^{y_t} (1 - \\theta)^{1 - y_t} = \\theta^{k} (1 - \\theta)^{n - k}"
            }
          </Eq>
          <CodeSnippet
            title="engine/inference/observation.py"
            code={`@dataclass(frozen=True)
class Observation:
    participant_id: str
    task_id: str
    outcome: int  # 1 for success, 0 for failure
    timestamp: float`}
          />
        </InspectDrawer>
      </Section>

      {/* =========================================================================
          SECTION 01 — THE RESEARCH QUESTION
          ========================================================================= */}
      <Section
        id="section-01"
        number="01"
        title="Can a system learn a hidden capability from evidence?"
        lede="How our research developed through three deliberate stages — each motivated by the limitations discovered in the previous one."
      >
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-foreground/90">
          <p>We initiated this inquiry with a straightforward empirical question:</p>

          <blockquote className="border-l-2 border-foreground pl-4 sm:pl-5 text-base sm:text-lg italic text-foreground my-4 font-serif">
            "If we observe whether a participant succeeds or fails at a task, how should a system
            update its estimate of their underlying capability?"
          </blockquote>

          <p>
            Rather than jumping to an overly complex model, the research progressed through three
            distinct phases. Crucially,{" "}
            <strong>
              each phase was motivated by an empirical limitation discovered in the previous one
            </strong>
            :
          </p>
        </div>

        {/* 3 Stages Flow Card Grid */}
        <div className="my-6 not-prose grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <span className="eyebrow">STAGE 01 &middot; BASELINE</span>
              <h4 className="mt-1.5 text-base font-semibold text-foreground">
                Exponential Moving Average
              </h4>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                A sequential scalar estimator that adjusts a single point estimate with each new
                observation.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border">
              <span className="text-[0.68rem] font-mono text-muted-foreground font-semibold">
                Limitation: Discards observation volume &amp; uncertainty.
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-foreground/30 bg-surface p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <span className="eyebrow text-foreground">STAGE 02 &middot; PROBABILISTIC</span>
              <h4 className="mt-1.5 text-base font-semibold text-foreground">
                Bayesian Capability Inference
              </h4>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Represents capability as an explicit probability distribution carrying both estimate
                and variance.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border">
              <span className="text-[0.68rem] font-mono text-foreground/80 font-semibold">
                Limitation: Passive observation of static task sequences.
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <span className="eyebrow">STAGE 03 &middot; ADAPTIVE</span>
              <h4 className="mt-1.5 text-base font-semibold text-foreground">
                Adaptive Task Selection
              </h4>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Leverages the current belief state to actively choose the next observation that
                maximizes information gain.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border">
              <span className="text-[0.68rem] font-mono text-muted-foreground font-semibold">
                Frontier: Active learning information loop.
              </span>
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}
