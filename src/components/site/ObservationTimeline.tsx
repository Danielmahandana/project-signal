import { useState } from "react";

export interface StreamStep {
  obsNum: number;
  result: "SUCCESS" | "FAILURE";
  alpha: number;
  beta: number;
  estimate: number;
  uncertainty: number;
  delta: number;
}

export const PS002B_STREAM_DATA: StreamStep[] = [
  {
    obsNum: 1,
    result: "SUCCESS",
    alpha: 2.0,
    beta: 1.0,
    estimate: 0.6667,
    uncertainty: 0.2357,
    delta: 0.1667,
  },
  {
    obsNum: 2,
    result: "SUCCESS",
    alpha: 3.0,
    beta: 1.0,
    estimate: 0.75,
    uncertainty: 0.1936,
    delta: 0.0833,
  },
  {
    obsNum: 3,
    result: "FAILURE",
    alpha: 3.0,
    beta: 2.0,
    estimate: 0.6,
    uncertainty: 0.2,
    delta: -0.15,
  },
  {
    obsNum: 4,
    result: "SUCCESS",
    alpha: 4.0,
    beta: 2.0,
    estimate: 0.6667,
    uncertainty: 0.1782,
    delta: 0.0667,
  },
  {
    obsNum: 5,
    result: "FAILURE",
    alpha: 4.0,
    beta: 3.0,
    estimate: 0.5714,
    uncertainty: 0.175,
    delta: -0.0953,
  },
  {
    obsNum: 6,
    result: "SUCCESS",
    alpha: 5.0,
    beta: 3.0,
    estimate: 0.625,
    uncertainty: 0.1614,
    delta: 0.0536,
  },
  {
    obsNum: 7,
    result: "SUCCESS",
    alpha: 6.0,
    beta: 3.0,
    estimate: 0.6667,
    uncertainty: 0.1491,
    delta: 0.0417,
  },
  {
    obsNum: 8,
    result: "FAILURE",
    alpha: 6.0,
    beta: 4.0,
    estimate: 0.6,
    uncertainty: 0.1477,
    delta: -0.0667,
  },
  {
    obsNum: 9,
    result: "SUCCESS",
    alpha: 7.0,
    beta: 4.0,
    estimate: 0.6364,
    uncertainty: 0.1389,
    delta: 0.0364,
  },
];

export function ObservationTimeline() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="my-8 rounded-2xl border border-border bg-card p-6 md:p-8 backdrop-blur-xs">
      <div className="flex items-baseline justify-between border-b border-border/60 pb-4">
        <div>
          <p className="eyebrow">OBSERVATION STREAM</p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            Step-by-Step Bayesian Updates (PS-002B)
          </h3>
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          9 Observations · 6 Successes / 3 Failures
        </span>
      </div>

      <div className="relative mt-8 space-y-4 before:absolute before:bottom-3 before:left-[1.35rem] before:top-3 before:w-[2px] before:bg-border md:before:left-[1.6rem]">
        {PS002B_STREAM_DATA.map((step) => {
          const isSuccess = step.result === "SUCCESS";
          const isSelected = activeStep === step.obsNum;

          return (
            <div
              key={step.obsNum}
              onMouseEnter={() => setActiveStep(step.obsNum)}
              onMouseLeave={() => setActiveStep(null)}
              className={`relative flex items-start gap-4 rounded-xl border p-4 transition-all duration-200 ${
                isSelected
                  ? "border-signal-blue bg-accent/60 shadow-xs"
                  : "border-border/60 bg-background/50 hover:border-border hover:bg-background/80"
              }`}
            >
              {/* Timeline dot badge */}
              <div
                className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold transition-transform ${
                  isSuccess
                    ? "bg-signal-green text-background shadow-xs"
                    : "bg-signal-red text-background shadow-xs"
                } ${isSelected ? "scale-110" : ""}`}
              >
                {isSuccess ? "✓" : "✕"}
              </div>

              {/* Step info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Obs 0{step.obsNum} &middot;{" "}
                    <span className={isSuccess ? "text-signal-green" : "text-signal-red"}>
                      [{step.result}]
                    </span>
                  </span>
                  <span
                    className={`font-mono text-xs font-semibold ${
                      step.delta > 0
                        ? "text-signal-green"
                        : step.delta < 0
                          ? "text-signal-red"
                          : "text-muted-foreground"
                    }`}
                  >
                    {step.delta > 0 ? `+${step.delta.toFixed(4)}` : step.delta.toFixed(4)}
                  </span>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2 font-mono text-xs sm:grid-cols-4">
                  <div>
                    <span className="text-muted-foreground">α:</span>{" "}
                    <span className="font-medium text-foreground">{step.alpha.toFixed(1)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">β:</span>{" "}
                    <span className="font-medium text-foreground">{step.beta.toFixed(1)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Estimate:</span>{" "}
                    <span className="font-semibold text-foreground">
                      {step.estimate.toFixed(4)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Uncertainty:</span>{" "}
                    <span className="font-medium text-foreground">
                      {step.uncertainty.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
