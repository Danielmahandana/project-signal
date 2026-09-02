import { useState, useMemo, useEffect, useRef } from "react";
import { Section, StatusTag } from "@/components/site/Section";
import { M } from "@/components/site/Math";
import { EvidenceStream, type ObservationOutcome } from "@/components/site/shared/EvidenceStream";
import { BetaDistributionCanvas } from "@/components/site/shared/BetaDistributionCanvas";

const EXP01_SEQUENCE: ObservationOutcome[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // 11 successes
const EXP02_SEQUENCE: ObservationOutcome[] = [1, 1, 0, 1, 0, 1, 1, 0, 1]; // 9 mixed

export function Chapter03Experiments() {
  // Experiment 01 (Consistent Evidence)
  const [exp01Obs, setExp01Obs] = useState<ObservationOutcome[]>([]);
  const [isExp01Playing, setIsExp01Playing] = useState<boolean>(false);
  const exp01TimerRef = useRef<NodeJS.Timeout | null>(null);

  const exp01Stats = useMemo(() => {
    let a = 1;
    let b = 1;
    for (const y of exp01Obs) {
      if (y === 1) a += 1;
      else b += 1;
    }
    const mean = a / (a + b);
    const variance = (a * b) / (Math.pow(a + b, 2) * (a + b + 1));
    return { alpha: a, beta: b, mean, sd: Math.sqrt(variance), n: exp01Obs.length };
  }, [exp01Obs]);

  useEffect(() => {
    if (isExp01Playing) {
      if (exp01Obs.length < EXP01_SEQUENCE.length) {
        exp01TimerRef.current = setTimeout(() => {
          setExp01Obs((prev) => {
            const nextItem = EXP01_SEQUENCE[prev.length];
            return nextItem !== undefined ? [...prev, nextItem] : prev;
          });
        }, 450);
      } else {
        setIsExp01Playing(false);
      }
    }
    return () => {
      if (exp01TimerRef.current) clearTimeout(exp01TimerRef.current);
    };
  }, [isExp01Playing, exp01Obs]);

  // Experiment 02 (Mixed Evidence)
  const [exp02Obs, setExp02Obs] = useState<ObservationOutcome[]>([]);
  const [isExp02Playing, setIsExp02Playing] = useState<boolean>(false);
  const exp02TimerRef = useRef<NodeJS.Timeout | null>(null);

  const exp02Stats = useMemo(() => {
    let a = 1;
    let b = 1;
    for (const y of exp02Obs) {
      if (y === 1) a += 1;
      else b += 1;
    }
    const mean = a / (a + b);
    const variance = (a * b) / (Math.pow(a + b, 2) * (a + b + 1));
    return { alpha: a, beta: b, mean, sd: Math.sqrt(variance), n: exp02Obs.length };
  }, [exp02Obs]);

  useEffect(() => {
    if (isExp02Playing) {
      if (exp02Obs.length < EXP02_SEQUENCE.length) {
        exp02TimerRef.current = setTimeout(() => {
          setExp02Obs((prev) => {
            const nextItem = EXP02_SEQUENCE[prev.length];
            return nextItem !== undefined ? [...prev, nextItem] : prev;
          });
        }, 500);
      } else {
        setIsExp02Playing(false);
      }
    }
    return () => {
      if (exp02TimerRef.current) clearTimeout(exp02TimerRef.current);
    };
  }, [isExp02Playing, exp02Obs]);

  // Centerpiece EMA vs Bayesian Synchronized Stream
  const [centerpieceObs, setCenterpieceObs] = useState<ObservationOutcome[]>([]);
  const [isCenterpiecePlaying, setIsCenterpiecePlaying] = useState<boolean>(false);
  const centerpieceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const centerpieceStats = useMemo(() => {
    let theta = 0.5;
    let a = 1;
    let b = 1;
    const eta = 0.1;
    for (const y of centerpieceObs) {
      theta = theta + eta * (y - theta);
      if (y === 1) a += 1;
      else b += 1;
    }
    const mean = a / (a + b);
    const variance = (a * b) / (Math.pow(a + b, 2) * (a + b + 1));
    return {
      emaTheta: theta,
      alpha: a,
      beta: b,
      mean,
      sd: Math.sqrt(variance),
      n: centerpieceObs.length,
    };
  }, [centerpieceObs]);

  useEffect(() => {
    if (isCenterpiecePlaying) {
      if (centerpieceObs.length < EXP02_SEQUENCE.length) {
        centerpieceTimerRef.current = setTimeout(() => {
          setCenterpieceObs((prev) => {
            const nextItem = EXP02_SEQUENCE[prev.length];
            return nextItem !== undefined ? [...prev, nextItem] : prev;
          });
        }, 500);
      } else {
        setIsCenterpiecePlaying(false);
      }
    }
    return () => {
      if (centerpieceTimerRef.current) clearTimeout(centerpieceTimerRef.current);
    };
  }, [isCenterpiecePlaying, centerpieceObs]);

  return (
    <section id="chapter-03" className="scroll-mt-16">
      {/* Chapter Indicator */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 pb-2">
        <div className="flex items-center gap-2">
          <span className="eyebrow">03 &middot; THE EXPERIMENTS &amp; COMPARISON</span>
          <StatusTag kind="observed" />
        </div>
      </div>

      {/* =========================================================================
          SECTION 06 — EXPERIMENT 01: CONSISTENT EVIDENCE
          ========================================================================= */}
      <Section
        id="section-06"
        number="06"
        title="Experiment 01: Consistent Positive Evidence"
        lede="Replaying our initial benchmark experiment with 11 consecutive successes."
      >
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-foreground/90">
          <p>
            In our first empirical trial, we subjected the inference engine to uninterrupted
            positive evidence:
            <M>{"11"}</M> consecutive task successes.
          </p>

          <p className="text-muted-foreground">
            Starting from uninformative prior <M>{"\\text{Beta}(1, 1)"}</M>, every success
            increments parameter <M>{"\\alpha"}</M>, shifting the posterior distribution steadily
            rightward while concentrating density:
          </p>
        </div>

        <div className="my-6 sm:my-8 rounded-xl border border-border bg-card p-4 sm:p-6 md:p-8 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <p className="eyebrow">EXPERIMENT 01 &middot; CONSISTENT EVIDENCE</p>
              <h3 className="mt-1 text-base sm:text-lg font-semibold text-foreground">
                Beta(1, 1) &rarr;{" "}
                <span className="font-mono">
                  Beta({exp01Stats.alpha}, {exp01Stats.beta})
                </span>
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => {
                  setExp01Obs([]);
                  setIsExp01Playing(true);
                }}
                disabled={isExp01Playing}
                className="btn-text bg-surface font-semibold"
              >
                {isExp01Playing ? "REPLAYING..." : "REPLAY EXP 01 →"}
              </button>
              <button
                type="button"
                onClick={() => setExp01Obs([])}
                className="btn-text text-muted-foreground"
              >
                RESET ↺
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex flex-wrap justify-between text-xs font-mono text-muted-foreground gap-1">
              <span>Execution ({exp01Stats.n} / 11 items):</span>
              <span>11 &times; SUCCESS (✓)</span>
            </div>
            <EvidenceStream
              sequence={exp01Obs}
              emptyLabel="Click [ REPLAY EXP 01 ] to watch the posterior curve tighten."
            />
          </div>

          <div className="mt-5 rounded-lg border border-border bg-surface/50 p-4 sm:p-5">
            <BetaDistributionCanvas
              primary={{
                alpha: exp01Stats.alpha,
                beta: exp01Stats.beta,
                label: `Beta(${exp01Stats.alpha}, ${exp01Stats.beta})`,
              }}
              height={160}
              idPrefix="exp01-canvas"
            />
          </div>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <div className="rounded-lg border border-border bg-surface p-3 text-center">
              <p className="eyebrow">Observations (n)</p>
              <p className="mt-1 font-mono text-lg sm:text-xl font-bold text-foreground">
                {exp01Stats.n}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3 text-center">
              <p className="eyebrow">Posterior State</p>
              <p className="mt-1 font-mono text-base sm:text-lg font-bold text-foreground">
                Beta({exp01Stats.alpha}, {exp01Stats.beta})
              </p>
            </div>
            <div className="rounded-lg border border-foreground/30 bg-surface p-3 text-center">
              <p className="eyebrow text-foreground">Estimate E[θ]</p>
              <p className="mt-1 font-mono text-lg sm:text-xl font-bold text-foreground">
                {exp01Stats.mean.toFixed(4)}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3 text-center">
              <p className="eyebrow">Uncertainty (σ)</p>
              <p className="mt-1 font-mono text-lg sm:text-xl font-bold text-foreground">
                ± {exp01Stats.sd.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* =========================================================================
          SECTION 07 — EXPERIMENT 02: MIXED EVIDENCE
          ========================================================================= */}
      <Section
        id="section-07"
        number="07"
        title="Experiment 02: Mixed & Contradictory Evidence"
        lede="What happens when the evidence disagrees? Testing the model against real-world contradictory signals."
      >
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-foreground/90">
          <p>
            Real human performance is rarely flawless. We presented the model with a contradictory
            9-observation sequence (6 successes, 3 failures):
          </p>

          <div className="my-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 rounded-lg border border-border bg-surface p-2.5 sm:p-3 font-mono text-xs sm:text-sm">
            <span>✓</span>
            <span>✓</span>
            <span className="text-muted-foreground">✕</span>
            <span>✓</span>
            <span className="text-muted-foreground">✕</span>
            <span>✓</span>
            <span>✓</span>
            <span className="text-muted-foreground">✕</span>
            <span>✓</span>
          </div>
        </div>

        <div className="my-6 sm:my-8 rounded-xl border border-border bg-card p-4 sm:p-6 md:p-8 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <p className="eyebrow">EXPERIMENT 02 &middot; MIXED (PS-002B)</p>
              <h3 className="mt-1 text-base sm:text-lg font-semibold text-foreground">
                Beta(1, 1) &rarr;{" "}
                <span className="font-mono">
                  Beta({exp02Stats.alpha}, {exp02Stats.beta})
                </span>
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => {
                  setExp02Obs([]);
                  setIsExp02Playing(true);
                }}
                disabled={isExp02Playing}
                className="btn-text bg-surface font-semibold"
              >
                {isExp02Playing ? "REPLAYING..." : "REPLAY EXP 02 →"}
              </button>
              <button
                type="button"
                onClick={() => setExp02Obs([])}
                className="btn-text text-muted-foreground"
              >
                RESET ↺
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex flex-wrap justify-between text-xs font-mono text-muted-foreground gap-1">
              <span>Execution ({exp02Stats.n} / 9 items):</span>
              <span>6 Successes &middot; 3 Failures</span>
            </div>
            <EvidenceStream
              sequence={exp02Obs}
              emptyLabel="Click [ REPLAY EXP 02 ] to feel the instability of mixed evidence."
            />
          </div>

          <div className="mt-5 rounded-lg border border-border bg-surface/50 p-4 sm:p-5">
            <BetaDistributionCanvas
              primary={{
                alpha: exp02Stats.alpha,
                beta: exp02Stats.beta,
                label: `Beta(${exp02Stats.alpha}, ${exp02Stats.beta})`,
              }}
              height={160}
              idPrefix="exp02-canvas"
            />
          </div>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <div className="rounded-lg border border-border bg-surface p-3 text-center">
              <p className="eyebrow">Observations (n)</p>
              <p className="mt-1 font-mono text-lg sm:text-xl font-bold text-foreground">
                {exp02Stats.n}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3 text-center">
              <p className="eyebrow">Posterior State</p>
              <p className="mt-1 font-mono text-base sm:text-lg font-bold text-foreground">
                Beta({exp02Stats.alpha}, {exp02Stats.beta})
              </p>
            </div>
            <div className="rounded-lg border border-foreground/30 bg-surface p-3 text-center">
              <p className="eyebrow text-foreground">Estimate E[θ]</p>
              <p className="mt-1 font-mono text-lg sm:text-xl font-bold text-foreground">
                {exp02Stats.mean.toFixed(4)}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3 text-center">
              <p className="eyebrow">Uncertainty (σ)</p>
              <p className="mt-1 font-mono text-lg sm:text-xl font-bold text-foreground">
                ± {exp02Stats.sd.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* =========================================================================
          SECTION 08 & 09 — COMPARE EXPERIMENTS & WHAT WE LEARNED
          ========================================================================= */}
      <Section
        id="section-08"
        number="08"
        title="Compare the Experiments: What Changed?"
        lede="Overlaying Consistent vs Mixed posterior distributions on a shared coordinate canvas."
      >
        <div className="my-6 sm:my-8 rounded-xl border border-border bg-card p-4 sm:p-6 md:p-8 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <p className="eyebrow">SHARED COORDINATE SYSTEM</p>
              <h3 className="mt-1 text-base sm:text-lg font-semibold text-foreground">
                Posterior Comparison Overlay
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-foreground" />
                <span className="text-foreground">Consistent: Beta(12, 1)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                <span className="text-muted-foreground">Mixed: Beta(7, 4)</span>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-border bg-surface/50 p-4 sm:p-5">
            <BetaDistributionCanvas
              primary={{
                alpha: 12,
                beta: 1,
                label: "Experiment 01: Beta(12, 1)",
              }}
              secondary={{
                alpha: 7,
                beta: 4,
                label: "Experiment 02: Beta(7, 4)",
              }}
              height={170}
              idPrefix="comparison-overlay"
            />
          </div>

          <div className="mt-5 w-full max-w-full overflow-x-auto scrollbar-thin">
            <table className="w-full text-left font-mono text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="pb-2 font-semibold">Experiment</th>
                  <th className="pb-2 font-semibold">Observations</th>
                  <th className="pb-2 font-semibold">Posterior</th>
                  <th className="pb-2 font-semibold">Estimate E[θ]</th>
                  <th className="pb-2 font-semibold">Uncertainty σ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr>
                  <td className="py-2.5 font-semibold text-foreground">01 &middot; Consistent</td>
                  <td className="py-2.5 text-muted-foreground">11 (11✓, 0✕)</td>
                  <td className="py-2.5 font-semibold text-foreground">Beta(12, 1)</td>
                  <td className="py-2.5 font-bold text-foreground">0.9231</td>
                  <td className="py-2.5 font-bold text-foreground">± 0.0712</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-muted-foreground">02 &middot; Mixed</td>
                  <td className="py-2.5 text-muted-foreground">9 (6✓, 3✕)</td>
                  <td className="py-2.5 text-foreground">Beta(7, 4)</td>
                  <td className="py-2.5 text-foreground">0.6364</td>
                  <td className="py-2.5 text-muted-foreground">± 0.1389</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Four Core Findings Grid */}
        <div className="my-6 not-prose grid gap-3 grid-cols-1 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-3.5 sm:p-4">
            <span className="eyebrow">FINDING 01</span>
            <h4 className="mt-1 text-sm font-semibold text-foreground">Evidence changes belief</h4>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Posterior estimates respond directly to accumulated observations.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-3.5 sm:p-4">
            <span className="eyebrow">FINDING 02</span>
            <h4 className="mt-1 text-sm font-semibold text-foreground">
              Direction of evidence matters
            </h4>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Consistent observations produce substantially tighter estimates than contradictory
              observations.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-3.5 sm:p-4">
            <span className="eyebrow">FINDING 03</span>
            <h4 className="mt-1 text-sm font-semibold text-foreground">
              Uncertainty is observable
            </h4>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Bayesian inference yields an explicit variance metric (σ) that is absent in scalar
              baselines.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-3.5 sm:p-4">
            <span className="eyebrow">FINDING 04</span>
            <h4 className="mt-1 text-sm font-semibold text-foreground">
              More evidence increases certainty
            </h4>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Variance shrinks as total sample volume accumulates.
            </p>
          </div>
        </div>
      </Section>

      {/* =========================================================================
          SECTION 10 — EMA VS BAYESIAN: THE CENTERPIECE
          ========================================================================= */}
      <Section
        id="section-10"
        number="10"
        title="Same evidence. Different representations."
        lede="The centerpiece comparison: What does the Bayesian model tell us that the EMA doesn't?"
      >
        <div className="my-6 sm:my-8 rounded-xl border border-border bg-card p-4 sm:p-6 md:p-8 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <p className="eyebrow">EXPERIMENTAL CENTERPIECE</p>
              <h3 className="mt-1 text-base sm:text-lg font-semibold text-foreground">
                Synchronized Dual-Model Runner
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => {
                  setCenterpieceObs([]);
                  setIsCenterpiecePlaying(true);
                }}
                disabled={isCenterpiecePlaying}
                className="btn-text bg-surface font-semibold"
              >
                {isCenterpiecePlaying ? "STREAMING..." : "STREAM 9 OBS →"}
              </button>
              <button
                type="button"
                onClick={() => setCenterpieceObs([])}
                className="btn-text text-muted-foreground"
              >
                RESET ↺
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex flex-wrap justify-between text-xs font-mono text-muted-foreground gap-1">
              <span>Shared Evidence Stream ({centerpieceStats.n} observations):</span>
              <span>Fed simultaneously to both models</span>
            </div>
            <EvidenceStream
              sequence={centerpieceObs}
              emptyLabel="Click [ STREAM 9 OBS ] to run synchronized comparison."
            />
          </div>

          {/* Side by Side Models */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-lg border border-border bg-surface/50 p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-border pb-2.5">
                  <span className="eyebrow">MODEL A &middot; EMA BASELINE</span>
                  <span className="font-mono text-xs text-muted-foreground">η = 0.10</span>
                </div>
                <div className="my-5 text-center">
                  <p className="eyebrow">Point Estimate</p>
                  <p className="mt-1 font-mono text-3xl sm:text-4xl font-bold text-foreground">
                    {centerpieceStats.emaTheta.toFixed(3)}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    No uncertainty metric
                  </p>
                </div>
              </div>
              <div className="rounded bg-surface p-2.5 font-mono text-[0.7rem] text-muted-foreground">
                θ(t+1) = θ(t) + η(y - θ) &middot; Discards sample volume
              </div>
            </div>

            <div className="rounded-lg border border-foreground/30 bg-surface p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-border pb-2.5">
                  <span className="eyebrow text-foreground">
                    MODEL B &middot; BAYESIAN POSTERIOR
                  </span>
                  <span className="font-mono text-xs text-foreground font-semibold">
                    Beta({centerpieceStats.alpha}, {centerpieceStats.beta})
                  </span>
                </div>
                <div className="my-4 text-center">
                  <p className="eyebrow text-foreground">Estimate &plusmn; Uncertainty</p>
                  <p className="mt-1 font-mono text-2xl sm:text-3xl font-bold text-foreground">
                    {centerpieceStats.mean.toFixed(3)}
                    <span className="text-base sm:text-lg font-normal text-muted-foreground ml-2">
                      &plusmn; {centerpieceStats.sd.toFixed(3)}
                    </span>
                  </p>
                </div>
                <BetaDistributionCanvas
                  primary={{
                    alpha: centerpieceStats.alpha,
                    beta: centerpieceStats.beta,
                    label: "Beta Posterior",
                  }}
                  height={110}
                  showGrid={false}
                  idPrefix="centerpiece-canvas"
                />
              </div>
              <div className="mt-3 rounded bg-card p-2.5 font-mono text-[0.7rem] text-foreground">
                Carries explicit variance &amp; continuous belief distribution
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-border bg-surface p-4 sm:p-5 text-center">
            <p className="eyebrow mb-1">THE RESEARCH INSIGHT</p>
            <p className="text-sm sm:text-base font-semibold text-foreground">
              What does the Bayesian model tell us that the EMA doesn't?
            </p>
            <p className="mt-1 text-base sm:text-lg font-bold text-foreground">Uncertainty.</p>
            <p className="mt-1 text-xs text-muted-foreground max-w-lg mx-auto leading-relaxed">
              We do not claim that Bayesian inference is universally superior. Rather, Bayesian
              inference provides an explicit representation of uncertainty that the scalar EMA
              baseline fundamentally cannot provide.
            </p>
          </div>
        </div>
      </Section>
    </section>
  );
}
