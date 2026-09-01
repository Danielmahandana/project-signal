import { useState, useMemo, useEffect, useRef } from "react";
import { Section, StatusTag } from "@/components/site/Section";
import { M, Eq } from "@/components/site/Math";
import { InspectDrawer, CodeSnippet } from "@/components/site/shared/InspectDrawer";
import { InteractiveSlider } from "@/components/site/shared/InteractiveSlider";
import { EvidenceStream, type ObservationOutcome } from "@/components/site/shared/EvidenceStream";
import { BetaDistributionCanvas } from "@/components/site/shared/BetaDistributionCanvas";
import { Play, RotateCcw, Plus } from "lucide-react";

const STANDARD_SEQUENCE: ObservationOutcome[] = [1, 1, 0, 1, 0, 1, 1, 0, 1];

export function Chapter02Estimators() {
  // Section 02: EMA State
  const [eta, setEta] = useState<number>(0.1);
  const [emaObs, setEmaObs] = useState<ObservationOutcome[]>([]);
  const [isEmaRunning, setIsEmaRunning] = useState<boolean>(false);
  const emaTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Compute EMA Trajectory
  const emaTrajectory = useMemo(() => {
    let current = 0.5;
    const history: number[] = [0.5];
    for (const y of emaObs) {
      current = current + eta * (y - current);
      history.push(current);
    }
    return { current, history };
  }, [emaObs, eta]);

  // Automated playback for EMA
  useEffect(() => {
    if (isEmaRunning) {
      if (emaObs.length < STANDARD_SEQUENCE.length) {
        emaTimerRef.current = setTimeout(() => {
          setEmaObs((prev) => {
            const nextItem = STANDARD_SEQUENCE[prev.length];
            return nextItem !== undefined ? [...prev, nextItem] : prev;
          });
        }, 500);
      } else {
        setIsEmaRunning(false);
      }
    }
    return () => {
      if (emaTimerRef.current) clearTimeout(emaTimerRef.current);
    };
  }, [isEmaRunning, emaObs]);

  const handleRunEmaStream = () => {
    setEmaObs([]);
    setIsEmaRunning(true);
  };

  // Section 03: The Shift Morph State
  const [shiftStage, setShiftStage] = useState<"point" | "interval" | "distribution">("point");

  // Section 04/05: Bayesian Beta State
  const [bayesianObs, setBayesianObs] = useState<ObservationOutcome[]>([]);
  const bayesianStats = useMemo(() => {
    let a = 1;
    let b = 1;
    for (const y of bayesianObs) {
      if (y === 1) a += 1;
      else b += 1;
    }
    const mean = a / (a + b);
    const variance = (a * b) / (Math.pow(a + b, 2) * (a + b + 1));
    const sd = Math.sqrt(variance);
    return { alpha: a, beta: b, mean, sd, n: bayesianObs.length };
  }, [bayesianObs]);

  return (
    <section id="chapter-02" className="scroll-mt-16">
      {/* Chapter Indicator */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 pb-2">
        <div className="flex items-center gap-2">
          <span className="eyebrow">02 &middot; THE TWO ESTIMATORS &amp; THE SHIFT</span>
          <StatusTag kind="built" />
        </div>
      </div>

      {/* =========================================================================
          SECTION 02 — EXPERIMENT ONE: EMA
          ========================================================================= */}
      <Section
        id="section-02"
        number="02"
        title="Start simple: The Exponential Moving Average"
        lede="Our initial exploration began with an online scalar moving average estimator."
      >
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-foreground/90">
          <p>
            Before exploring probabilistic architectures, we evaluated the simplest online tracker:
            an <strong>Exponential Moving Average (EMA)</strong>.
          </p>

          <p>
            The update rule is lightweight and computationally trivial: starting from neutral
            expectation <M>{"\\theta_0 = 0.500"}</M>, each observed binary task outcome{" "}
            <M>{"y_t \\in \\{0, 1\\}"}</M> produces an instantaneous error residual{" "}
            <M>{"(y_t - \\theta_t)"}</M>, nudging the estimate by learning rate <M>{"\\eta"}</M>:
          </p>
        </div>

        <Eq
          title="02.1 — Exponential Moving Average Update Rule"
          note="where θ_t is the current estimate, y_t is the binary outcome (1 or 0), and η is the learning rate parameter."
        >
          {"\\theta_{t+1} = \\theta_t + \\eta(y_t - \\theta_t)"}
        </Eq>

        {/* Focused EMA Trajectory Interactive */}
        <div className="my-6 sm:my-8 rounded-xl border border-border bg-card p-4 sm:p-6 md:p-8 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <p className="eyebrow">INTERACTIVE EQUATION</p>
              <h3 className="mt-1 text-base sm:text-lg font-semibold text-foreground">
                Testing the Learning Rate Parameter (η)
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={handleRunEmaStream}
                disabled={isEmaRunning}
                className="btn-text bg-surface font-semibold"
              >
                <Play className="h-3.5 w-3.5" />
                {isEmaRunning ? "RUNNING..." : "RUN STREAM →"}
              </button>
              <button
                type="button"
                onClick={() => setEmaObs((prev) => [...prev, 1])}
                className="btn-text"
              >
                +✓
              </button>
              <button
                type="button"
                onClick={() => setEmaObs((prev) => [...prev, 0])}
                className="btn-text text-muted-foreground"
              >
                +✕
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmaObs([]);
                  setIsEmaRunning(false);
                }}
                className="btn-text text-muted-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                RESET
              </button>
            </div>
          </div>

          {/* Learning Rate Slider */}
          <div className="mt-5 max-w-md">
            <InteractiveSlider
              label="Learning Rate"
              symbol="η"
              value={eta}
              min={0.01}
              max={0.5}
              step={0.01}
              onChange={setEta}
              description={
                eta > 0.25
                  ? "Large η: Fast reaction to new evidence, volatile"
                  : eta < 0.05
                    ? "Small η: Highly gradual adaptation, slow response"
                    : "Balanced smoothing parameter"
              }
            />
          </div>

          {/* Stream Display */}
          <div className="mt-5 space-y-2">
            <div className="flex flex-wrap justify-between text-xs font-mono text-muted-foreground gap-1">
              <span>Evidence Stream ({emaObs.length} observations):</span>
              <span>Learning Rate η = {eta.toFixed(2)}</span>
            </div>
            <EvidenceStream sequence={emaObs} />
          </div>

          {/* Trajectory Polyline */}
          <div className="mt-5 rounded-lg border border-border bg-surface/50 p-4 sm:p-5">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-3">
              <span>EMA ESTIMATE TRAJECTORY</span>
              <span className="font-bold text-foreground">
                Current θ = {emaTrajectory.current.toFixed(3)}
              </span>
            </div>

            <div className="relative h-24 sm:h-28 w-full">
              <svg viewBox="0 0 500 100" className="h-full w-full overflow-visible">
                <line
                  x1="0"
                  y1="50"
                  x2="500"
                  y2="50"
                  stroke="var(--color-border)"
                  strokeDasharray="3 3"
                />
                <line
                  x1="0"
                  y1="95"
                  x2="500"
                  y2="95"
                  stroke="var(--color-border)"
                  strokeWidth="0.8"
                />
                <line
                  x1="0"
                  y1="5"
                  x2="500"
                  y2="5"
                  stroke="var(--color-border)"
                  strokeWidth="0.8"
                />

                {emaTrajectory.history.length > 1 && (
                  <polyline
                    fill="none"
                    stroke="var(--color-foreground)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={emaTrajectory.history
                      .map((val, idx) => {
                        const stepX = 500 / Math.max(1, emaTrajectory.history.length - 1);
                        const px = idx * stepX;
                        const py = 100 - val * 100;
                        return `${px.toFixed(1)},${py.toFixed(1)}`;
                      })
                      .join(" ")}
                  />
                )}

                <circle
                  cx={500}
                  cy={100 - emaTrajectory.current * 100}
                  r="4"
                  fill="var(--color-foreground)"
                  stroke="var(--color-card)"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="flex justify-between font-mono text-[0.62rem] text-muted-foreground mt-2">
              <span>0.00 (Failure)</span>
              <span>0.50 (Neutral)</span>
              <span>1.00 (Success)</span>
            </div>
          </div>
        </div>

        {/* The Fundamental Limitation Box */}
        <div className="my-6 rounded-xl border border-border bg-surface p-4 sm:p-5">
          <span className="eyebrow text-foreground">CRITICAL RESEARCH LIMITATION</span>
          <h4 className="mt-1 text-base font-semibold text-foreground">
            EMA gives us an estimate. It does not give us uncertainty.
          </h4>
          <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Consider two participants who both register an estimate of <M>{"\\theta = 0.750"}</M>.
            Participant A achieved this after <strong>3 observations</strong>. Participant B
            achieved this after <strong>80 observations</strong>. The scalar EMA represents both as
            identical, discarding sample size and concealing how little we know about Participant A.
          </p>
        </div>

        {/* Technical Derivation Drawer */}
        <InspectDrawer
          title="Inspect EMA Expansion & Sample Horizon Proof"
          badge="Layer 3: Analysis"
        >
          <p>
            Expanding the recurrence relation{" "}
            <M>{"\\theta_{t+1} = (1 - \\eta)\\theta_t + \\eta y_t"}</M> demonstrates that the
            effective memory horizon is strictly determined by <M>{"\\eta"}</M>:
          </p>
          <Eq note="Expansion showing exponential memory weighting.">
            {"\\theta_t = (1 - \\eta)^t \\theta_0 + \\sum_{i=1}^{t} \\eta(1 - \\eta)^{t-i} y_i"}
          </Eq>
          <Eq note="Effective number of observations retained by the filter.">
            {"N_{\\text{eff}} = \\frac{2 - \\eta}{\\eta}"}
          </Eq>
          <CodeSnippet
            title="engine/inference/ema.py"
            code={`class ExponentialMovingAverage:
    def __init__(self, initial_estimate: float = 0.5, eta: float = 0.10):
        self.theta = initial_estimate
        self.eta = eta

    def update(self, outcome: int) -> float:
        self.theta = self.theta + self.eta * (outcome - self.theta)
        return self.theta`}
          />
        </InspectDrawer>
      </Section>

      {/* =========================================================================
          SECTION 03 — THE SHIFT
          ========================================================================= */}
      <Section
        id="section-03"
        number="03"
        title="The Shift: What if capability wasn't a point?"
        lede="From a fragile scalar point estimate to an explicit probability density curve."
      >
        <p className="text-sm sm:text-base font-medium text-foreground">
          To address this limitation, we changed the fundamental representation of human capability:
        </p>

        {/* Morphing Visualization */}
        <div className="my-6 sm:my-8 rounded-xl border border-border bg-card p-4 sm:p-6 md:p-8 text-center shadow-2xs">
          <p className="eyebrow mb-3">THE CONCEPTUAL MORPH</p>

          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-5">
            <button
              type="button"
              onClick={() => setShiftStage("point")}
              className={`btn-text ${shiftStage === "point" ? "bg-foreground text-background font-semibold" : ""}`}
            >
              1. Scalar Point
            </button>
            <button
              type="button"
              onClick={() => setShiftStage("interval")}
              className={`btn-text ${shiftStage === "interval" ? "bg-foreground text-background font-semibold" : ""}`}
            >
              2. Point + Uncertainty
            </button>
            <button
              type="button"
              onClick={() => setShiftStage("distribution")}
              className={`btn-text ${shiftStage === "distribution" ? "bg-foreground text-background font-semibold" : ""}`}
            >
              3. Belief Distribution
            </button>
          </div>

          <div className="mx-auto max-w-lg min-h-[160px] sm:min-h-[180px] flex flex-col items-center justify-center border border-border rounded-lg bg-surface/50 p-4 sm:p-6">
            {shiftStage === "point" && (
              <div className="space-y-3 w-full">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-foreground">
                  0.636
                </div>
                <div className="relative h-2 w-full bg-border rounded-full mx-auto">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-foreground"
                    style={{ left: "63.6%" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  Scalar point estimate &middot; Zero variance representation
                </p>
              </div>
            )}

            {shiftStage === "interval" && (
              <div className="space-y-3 w-full">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-foreground">
                  0.636 <span className="text-sm sm:text-base text-muted-foreground">± 0.139</span>
                </div>
                <div className="relative h-2 w-full bg-border rounded-full mx-auto">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-2.5 rounded-full bg-foreground/15"
                    style={{ left: "49.7%", width: "27.8%" }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-foreground shadow-2xs"
                    style={{ left: "63.6%" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  Estimate with explicit 1-sigma uncertainty bounds
                </p>
              </div>
            )}

            {shiftStage === "distribution" && (
              <div className="w-full">
                <BetaDistributionCanvas
                  primary={{ alpha: 7, beta: 4, label: "Beta(7,4)" }}
                  height={140}
                  showMeanLine={true}
                  showUncertaintyBand={true}
                />
                <p className="mt-2 text-xs text-muted-foreground font-mono">
                  Full Beta(7, 4) Posterior Probability Density
                </p>
              </div>
            )}
          </div>

          <div className="mt-5 space-y-1">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
              What if capability was a belief?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              A distribution preserves all plausible capability values, weighting them by empirical
              support.
            </p>
          </div>
        </div>
      </Section>

      {/* =========================================================================
          SECTION 04 & 05 — BAYESIAN INFERENCE
          ========================================================================= */}
      <Section
        id="section-04"
        number="04"
        title="Bayesian Capability Inference & Belief State"
        lede="Modeling continuous belief through conjugate Beta distributions."
      >
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-foreground/90">
          <p>
            In the Beta-Binomial framework, latent capability <M>{"\\theta"}</M> is governed by a
            Beta distribution:
          </p>
        </div>

        <Eq
          title="04.1 — Prior Distribution"
          note="where α represents positive evidence, β negative evidence."
        >
          {"\\theta \\sim Beta(\\alpha, \\beta)"}
        </Eq>

        <div className="my-5 grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose">
          <div className="rounded-lg border border-border bg-surface p-3.5 sm:p-4">
            <span className="eyebrow">PARAMETER α</span>
            <p className="mt-1 text-sm font-semibold text-foreground">
              Evidence supporting success
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Increments by +1 for each successful task performance.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-3.5 sm:p-4">
            <span className="eyebrow">PARAMETER β</span>
            <p className="mt-1 text-sm font-semibold text-foreground">
              Evidence supporting failure
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Increments by +1 for each failed task attempt.
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground">
          We begin with the neutral prior <M>{"Beta(1, 1)"}</M>, which represents total uniform
          uncertainty:
        </p>

        <Eq
          title="04.2 — Neutral Uninformative Prior"
          note="Equal probability across all possible values of θ."
        >
          {
            "Beta(1, 1) \\implies E[\\theta] = \\frac{1}{1 + 1} = 0.500, \\quad \\sigma = \\sqrt{\\frac{1}{12}} \\approx 0.2887"
          }
        </Eq>

        {/* Evidence Console */}
        <div className="my-6 sm:my-8 rounded-xl border border-border bg-card p-4 sm:p-6 md:p-8 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <p className="eyebrow">EVIDENCE CONSOLE</p>
              <h3 className="mt-1 text-base sm:text-lg font-semibold text-foreground">
                Posterior State:{" "}
                <span className="font-mono">
                  Beta({bayesianStats.alpha}, {bayesianStats.beta})
                </span>
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setBayesianObs((prev) => [...prev, 1])}
                className="btn-text"
              >
                + SUCCESS (✓)
              </button>
              <button
                type="button"
                onClick={() => setBayesianObs((prev) => [...prev, 0])}
                className="btn-text text-muted-foreground"
              >
                + FAILURE (✕)
              </button>
              <button
                type="button"
                onClick={() => setBayesianObs([])}
                className="btn-text text-muted-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                RESET
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex flex-wrap justify-between text-xs font-mono text-muted-foreground gap-1">
              <span>Recorded Observations ({bayesianStats.n}):</span>
              <span>Prior: Beta(1, 1)</span>
            </div>
            <EvidenceStream
              sequence={bayesianObs}
              emptyLabel="Click +SUCCESS or +FAILURE to inject evidence into the posterior."
            />
          </div>

          <div className="mt-5 rounded-lg border border-border bg-surface/50 p-4 sm:p-5">
            <BetaDistributionCanvas
              primary={{
                alpha: bayesianStats.alpha,
                beta: bayesianStats.beta,
                label: `Beta(${bayesianStats.alpha}, ${bayesianStats.beta})`,
              }}
              height={160}
              idPrefix="bayesian-console-beta"
            />
          </div>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <div className="rounded-lg border border-border bg-surface p-3 text-center">
              <p className="eyebrow">Positive (α)</p>
              <p className="mt-1 font-mono text-lg sm:text-xl font-bold text-foreground">
                {bayesianStats.alpha}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3 text-center">
              <p className="eyebrow">Negative (β)</p>
              <p className="mt-1 font-mono text-lg sm:text-xl font-bold text-foreground">
                {bayesianStats.beta}
              </p>
            </div>
            <div className="rounded-lg border border-foreground/30 bg-surface p-3 text-center">
              <p className="eyebrow text-foreground">Estimate E[θ]</p>
              <p className="mt-1 font-mono text-lg sm:text-xl font-bold text-foreground">
                {bayesianStats.mean.toFixed(4)}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3 text-center">
              <p className="eyebrow">Uncertainty (σ)</p>
              <p className="mt-1 font-mono text-lg sm:text-xl font-bold text-foreground">
                ± {bayesianStats.sd.toFixed(4)}
              </p>
            </div>
          </div>
        </div>

        {/* Technical Derivations Drawer */}
        <InspectDrawer
          title="Inspect Exact Closed-Form Moments: Mean & Variance"
          badge="Layer 3: Mathematical Proof"
        >
          <p>The expectation and variance of the Beta posterior have closed-form expressions:</p>
          <Eq note="Mean expected capability under posterior belief.">
            {"E[\\theta] = \\frac{\\alpha}{\\alpha + \\beta}"}
          </Eq>
          <Eq note="Posterior standard deviation representing uncertainty.">
            {"\\sigma = \\sqrt{\\frac{\\alpha\\beta}{(\\alpha+\\beta)^2(\\alpha+\\beta+1)}}"}
          </Eq>
        </InspectDrawer>
      </Section>
    </section>
  );
}
