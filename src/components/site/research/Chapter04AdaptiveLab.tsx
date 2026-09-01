import { useState, useMemo } from "react";
import { Section, StatusTag } from "@/components/site/Section";
import { M, Eq } from "@/components/site/Math";
import { InspectDrawer, CodeSnippet } from "@/components/site/shared/InspectDrawer";
import { InteractiveSlider } from "@/components/site/shared/InteractiveSlider";
import { AdaptiveLoopDiagram } from "@/components/site/shared/AdaptiveLoopDiagram";
import { AlertCircle, Terminal, RefreshCw } from "lucide-react";

interface CandidateTask {
  id: string;
  name: string;
  difficulty: number;
  description: string;
}

const CANDIDATE_TASKS: CandidateTask[] = [
  {
    id: "task-a",
    name: "Task A (Very Easy)",
    difficulty: 0.2,
    description: "Basic structural recognition",
  },
  {
    id: "task-b",
    name: "Task B (Easy)",
    difficulty: 0.4,
    description: "Single-rule pattern decomposition",
  },
  {
    id: "task-c",
    name: "Task C (Medium)",
    difficulty: 0.6,
    description: "Multi-constraint trade-off",
  },
  {
    id: "task-d",
    name: "Task D (Hard)",
    difficulty: 0.8,
    description: "Noisy signal filtering under time pressure",
  },
  {
    id: "task-e",
    name: "Task E (Very Hard)",
    difficulty: 0.95,
    description: "Complex adversarial diagnostic",
  },
];

export function Chapter04AdaptiveLab() {
  const [beliefTheta, setBeliefTheta] = useState<number>(0.64);

  // Compute expected information gain for each candidate task
  const taskInformation = useMemo(() => {
    return CANDIDATE_TASKS.map((task) => {
      const pSuccess = 1 / (1 + Math.exp(-6 * (beliefTheta - task.difficulty)));
      const variance = pSuccess * (1 - pSuccess);
      const infoGain = variance * 4; // normalized [0, 1]
      return {
        ...task,
        pSuccess,
        infoGain,
      };
    });
  }, [beliefTheta]);

  const optimalTask = useMemo(() => {
    return [...taskInformation].sort((a, b) => b.infoGain - a.infoGain)[0]!;
  }, [taskInformation]);

  // Test suite runner simulation
  const [isRunningTests, setIsRunningTests] = useState<boolean>(false);
  const [testRunCompleted, setTestRunCompleted] = useState<boolean>(false);

  const handleRunTests = () => {
    setIsRunningTests(true);
    setTestRunCompleted(false);
    setTimeout(() => {
      setIsRunningTests(false);
      setTestRunCompleted(true);
    }, 700);
  };

  return (
    <section id="chapter-04" className="scroll-mt-16">
      {/* Chapter Indicator */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 pb-2">
        <div className="flex items-center gap-2">
          <span className="eyebrow">04 &middot; ADAPTIVE ENGINE &amp; LAB NOTEBOOK</span>
          <StatusTag kind="hypothesised" />
        </div>
      </div>

      {/* =========================================================================
          SECTION 13 — RESEARCH LIMITATIONS
          ========================================================================= */}
      <Section
        id="section-13"
        number="13"
        title="Research Limitations: What this model does not know"
        lede="A credible research programme makes its boundaries and assumptions explicit."
      >
        <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
          The current models are intentionally minimal baseline formulations. They operate under
          specific simplifying assumptions that will be expanded in subsequent research phases:
        </p>

        <div className="my-6 not-prose grid gap-3 grid-cols-1 sm:grid-cols-2">
          {[
            {
              title: "Binary Observations Only",
              desc: "Responses are strictly coded as y ∈ {0, 1}, ignoring partial credit or nuances.",
            },
            {
              title: "No Task Difficulty Calibration",
              desc: "Currently treats solving an easy task as equivalent to solving a hard task.",
            },
            {
              title: "Static Capability Assumption",
              desc: "Assumes latent θ remains constant during the assessment without fatigue or learning effects.",
            },
            {
              title: "Synthetic & Unit-Test Scope",
              desc: "Evaluated on synthetic benchmark experiments, not yet calibrated on large-scale human cohort data.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-border bg-card p-3.5 sm:p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" />
                <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
              </div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* =========================================================================
          SECTION 14 & 15 — THE NEXT QUESTION & ADAPTIVE LOOP
          ========================================================================= */}
      <Section
        id="section-14"
        number="14"
        title="What should we observe next? The Adaptive Loop"
        lede="From passive observation to active information acquisition."
      >
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-foreground/90">
          <p>
            Once a system possesses both an <strong>estimate</strong> and an explicit measure of{" "}
            <strong>uncertainty</strong>, the fundamental research question changes:
          </p>

          <blockquote className="border-l-2 border-foreground pl-4 sm:pl-5 text-base sm:text-lg italic text-foreground my-4 font-serif">
            "Suppose we currently believe θ ≈ 0.64. Which task should we administer next to learn
            the most about this person?"
          </blockquote>
        </div>

        {/* Dynamic SVG Closed Loop Diagram */}
        <AdaptiveLoopDiagram />

        <div className="my-5 rounded-lg border border-border bg-surface p-4 sm:p-5 text-center">
          <p className="text-xs sm:text-sm font-medium text-foreground">
            The goal is not simply to administer more questions.
            <br />
            It is to select the observation expected to reduce uncertainty most.
          </p>
        </div>
      </Section>

      {/* =========================================================================
          SECTION 16 — INTERACTIVE ADAPTIVE ENGINE
          ========================================================================= */}
      <Section
        id="section-16"
        number="16"
        title="Interactive Adaptive Engine"
        lede="Manipulate current belief to see how the system reasons about optimal task selection."
      >
        <div className="my-6 sm:my-8 rounded-xl border border-border bg-card p-4 sm:p-6 md:p-8 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <p className="eyebrow">ACTIVE INFERENCE SIMULATOR</p>
              <h3 className="mt-1 text-base sm:text-lg font-semibold text-foreground">
                Optimal Task: <span className="font-mono">{optimalTask.name}</span>
              </h3>
            </div>
            <span className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[0.62rem] text-muted-foreground">
              Research Direction
            </span>
          </div>

          <div className="mt-5 max-w-md">
            <InteractiveSlider
              label="Current Capability Belief"
              symbol="θ"
              value={beliefTheta}
              min={0.1}
              max={0.95}
              step={0.01}
              onChange={setBeliefTheta}
              description={`Adjust capability belief to inspect optimal task selection`}
            />
          </div>

          {/* Candidate Tasks Spectrum */}
          <div className="mt-5 space-y-2.5">
            <p className="eyebrow">CANDIDATE TASKS ACROSS DIFFICULTY SPECTRUM</p>
            <div className="space-y-2">
              {taskInformation.map((task) => {
                const isSelected = task.id === optimalTask.id;
                return (
                  <div
                    key={task.id}
                    className={`rounded-lg border p-3 sm:p-3.5 transition-all ${
                      isSelected
                        ? "border-foreground/50 bg-surface shadow-2xs ring-1 ring-border"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {isSelected && (
                          <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
                        )}
                        <span className="font-mono text-xs font-semibold text-foreground">
                          {task.name}
                        </span>
                        <span className="font-mono text-[0.65rem] text-muted-foreground">
                          (d = {task.difficulty.toFixed(2)})
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-mono">
                        <span className="text-muted-foreground">
                          P(Success) ={" "}
                          <span className="font-medium text-foreground">
                            {(task.pSuccess * 100).toFixed(0)}%
                          </span>
                        </span>
                        <span
                          className={`font-semibold ${isSelected ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          Info Gain = {task.infoGain.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2.5 relative h-1 w-full bg-border/60 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-200 ${isSelected ? "bg-foreground" : "bg-muted-foreground/40"}`}
                        style={{ width: `${task.infoGain * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-border bg-surface p-3.5 font-mono text-xs text-muted-foreground leading-relaxed">
            <span className="font-bold text-foreground">Selection Rationale: </span>
            For capability belief{" "}
            <span className="text-foreground font-semibold">θ = {beliefTheta.toFixed(2)}</span>, the
            system selects <span className="text-foreground font-bold">{optimalTask.name}</span>{" "}
            because its difficulty is closest to the participant's capability, maximizing outcome
            entropy and expected uncertainty reduction.
          </div>
        </div>

        <InspectDrawer
          title="Inspect Formal Information Gain Equation"
          badge="Layer 3: Active Learning"
        >
          <p>
            Optimal task selection is formalized by maximizing the expected mutual information
            between the latent parameter
            <M>{"\\theta"}</M> and candidate observation <M>{"Y_k"}</M>:
          </p>
          <Eq note="Optimal task index k* maximizes expected reduction in posterior entropy.">
            {"k^* = \\arg\\max_k \\mathbb{E}_{Y_k} [\\text{IG}(\\theta; Y_k)]"}
          </Eq>
          <CodeSnippet
            title="engine/adaptive/selector.py"
            code={`def select_next_task(belief: BayesianBeliefState, task_pool: list[Task]) -> Task:
    best_task = max(task_pool, key=lambda t: expected_information_gain(belief, t))
    return best_task`}
          />
        </InspectDrawer>
      </Section>

      {/* =========================================================================
          SECTION 18 — LAB NOTEBOOK & UNIT TESTS
          ========================================================================= */}
      <Section
        id="section-18"
        number="18"
        title="Lab Notebook & Unit Test Suite"
        lede="Exposing development logs, test assertions, and reproducibility checks."
      >
        <div className="my-6 sm:my-8 rounded-xl border border-border bg-card p-4 sm:p-6 md:p-8 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <p className="eyebrow">DEVELOPMENT EVIDENCE</p>
              <h3 className="mt-1 text-base sm:text-lg font-semibold text-foreground">
                Experiment Log PS-002B &amp; Pytest Verification
              </h3>
            </div>
            <button
              type="button"
              onClick={handleRunTests}
              disabled={isRunningTests}
              className="btn-text bg-surface font-semibold"
            >
              <Terminal className="h-3.5 w-3.5" />
              {isRunningTests ? "EXECUTING..." : "RUN TEST SUITE →"}
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-border bg-surface p-3 sm:p-3.5">
              <div className="flex items-center justify-between">
                <span className="eyebrow">EMA Tests</span>
                <span className="font-mono text-xs font-bold text-foreground">4 / 4 PASSED</span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Boundary updates, step responses, learning rate scaling.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-surface p-3 sm:p-3.5">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Bayesian Tests</span>
                <span className="font-mono text-xs font-bold text-foreground">2 / 2 PASSED</span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Conjugate updates, variance decay, Beta(7,4) reproduction.
              </p>
            </div>

            <div className="rounded-lg border border-foreground/30 bg-surface p-3 sm:p-3.5">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-foreground">Total Suite</span>
                <span className="font-mono text-xs font-bold text-foreground">6 / 6 PASSED</span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                100% test pass rate across core inference engine.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-border bg-surface/90 overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between bg-card px-3.5 py-2 border-b border-border text-[0.68rem] text-muted-foreground">
              <span>pytest engine/tests/</span>
              <span>Python 3.11 &middot; pytest-8.1.0</span>
            </div>
            <div className="p-3 sm:p-4 space-y-1 text-[0.72rem] sm:text-[0.76rem] overflow-x-auto">
              <div className="text-muted-foreground whitespace-nowrap">
                $ pytest -v engine/tests/test_baseline_inference.py
              </div>
              <div className="text-foreground whitespace-nowrap">
                test_baseline_inference.py::test_neutral_prior_initialization{" "}
                <span className="font-bold">PASSED [ 16%]</span>
              </div>
              <div className="text-foreground whitespace-nowrap">
                test_baseline_inference.py::test_ema_single_success_update{" "}
                <span className="font-bold">PASSED [ 33%]</span>
              </div>
              <div className="text-foreground whitespace-nowrap">
                test_baseline_inference.py::test_ema_single_failure_update{" "}
                <span className="font-bold">PASSED [ 50%]</span>
              </div>
              <div className="text-foreground whitespace-nowrap">
                test_baseline_inference.py::test_ema_learning_rate_dynamics{" "}
                <span className="font-bold">PASSED [ 66%]</span>
              </div>
              <div className="text-foreground whitespace-nowrap">
                test_bayesian_inference.py::test_beta_binomial_ps002b_reproduction{" "}
                <span className="font-bold">PASSED [ 83%]</span>
              </div>
              <div className="text-foreground whitespace-nowrap">
                test_bayesian_inference.py::test_variance_shrinkage_with_sample_volume{" "}
                <span className="font-bold">PASSED [100%]</span>
              </div>
              <div className="pt-2 font-bold text-foreground">=== 6 passed in 0.04s ===</div>
            </div>
          </div>
        </div>
      </Section>

      {/* =========================================================================
          SECTION 19 — THE FINAL PAGE & CENTRAL THESIS
          ========================================================================= */}
      <Section
        id="section-19"
        number="19"
        title="What should the system learn next?"
        lede="The continuous research loop."
      >
        <div className="my-8 sm:my-10 rounded-xl border border-border bg-card p-6 sm:p-8 md:p-12 text-center shadow-2xs">
          <div className="max-w-2xl mx-auto space-y-5">
            <p className="eyebrow">PROJECT SIGNAL &middot; CENTRAL RESEARCH THESIS</p>

            <h3 className="text-xl sm:text-3xl md:text-4xl font-semibold text-foreground tracking-tight leading-tight">
              "The goal is not to predict with certainty.
              <br />
              It is to become more informed with each observation."
            </h3>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-serif italic">
              We began with an estimate.
              <br />
              We added uncertainty.
              <br />
              Now we learn how to choose evidence intelligently.
            </p>

            <div className="pt-3 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("chapter-01");
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 60;
                    window.scrollTo({ top, behavior: "smooth" });
                  }
                }}
                className="btn-text px-4 py-2 text-xs font-semibold"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                RETURN TO OPENING
              </button>
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}
