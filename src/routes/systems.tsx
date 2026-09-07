import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BeliefUpdateWidget } from "@/components/site/shared/BeliefUpdateWidget";
import { SkillsPipelineWidget } from "@/components/site/shared/SkillsPipelineWidget";
import { Chapter02Estimators } from "@/components/site/research/Chapter02Estimators";

export const Route = createFileRoute("/systems")({
  head: () => ({
    meta: [
      { title: "Systems & Models — Capability Compass Lab" },
      {
        name: "description",
        content:
          "Explorable research systems, interactive probabilistic kernels, NLP pipelines, and open benchmarks developed by the lab.",
      },
      { property: "og:title", content: "Systems & Models — Capability Compass Lab" },
    ],
  }),
  component: SystemsPage,
});

function SystemsPage() {
  const [activeTab, setActiveTab] = useState<"kernel" | "parser" | "drift">("kernel");

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-10 border-b border-border/40">
        <div className="max-w-3xl space-y-4">
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Systems &amp; Instruments
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground font-sans">
            Interactive Systems
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-sans">
            We build to understand. Our research systems are explorable instruments that expose transformations from input to representation to inference.
          </p>
        </div>

        {/* Minimalist Tabs */}
        <div className="mt-10 flex flex-wrap items-center space-x-6 font-mono text-xs pt-4 border-t border-border/40">
          {[
            { id: "kernel", label: "01 Bayesian Inference Kernel" },
            { id: "parser", label: "02 Skills & Ontology Parser" },
            { id: "drift", label: "03 Estimator Comparison (EMA vs Bayes)" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`transition-colors cursor-pointer py-1 ${
                activeTab === tab.id
                  ? "text-foreground font-semibold border-b border-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Interactive Tool Surface */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {activeTab === "kernel" && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div className="max-w-3xl space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
                Instrument 01
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-sans">
                Bayesian Capability Inference Kernel
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base font-sans leading-relaxed">
                Conjugate Beta-Binomial online state filter with non-stationary evidence decay. Observe how the posterior density sharpens its bounds as observations accumulate.
              </p>
            </div>

            <BeliefUpdateWidget />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-xs pt-8 border-t border-border/40">
              <div className="space-y-1">
                <span className="text-muted-foreground text-[0.65rem] uppercase">Complexity</span>
                <div className="text-sm font-bold text-foreground">O(1) Online Update</div>
                <p className="text-xs text-muted-foreground font-sans">
                  Constant-time algebraic conjugate parameter updates with zero iterative sampling overhead.
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-[0.65rem] uppercase">Drift Attenuation</span>
                <div className="text-sm font-bold text-foreground">&gamma; &isin; [0.92, 0.99]</div>
                <p className="text-xs text-muted-foreground font-sans">
                  Mitigates score lock-in by decaying historical pseudo-counts over idle intervals.
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-[0.65rem] uppercase">Interface</span>
                <div className="text-sm font-bold text-foreground">JSON-RPC / REST</div>
                <p className="text-xs text-muted-foreground font-sans">
                  Standardized schema returning mean &theta;, variance &sigma;&sup2;, and 90% credible bounds.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "parser" && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div className="max-w-3xl space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
                Instrument 02
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-sans">
                Contextual Skills &amp; Ontology Parser
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base font-sans leading-relaxed">
                Transforms unstructured work histories and TVET qualification summaries into standardized European (ESCO) and South African (OFO) competency graphs.
              </p>
            </div>

            <SkillsPipelineWidget />
          </div>
        )}

        {activeTab === "drift" && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div className="max-w-3xl space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
                Instrument 03
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-sans">
                Estimator Comparison: EMA vs. Bayesian Belief
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base font-sans leading-relaxed">
                Direct empirical tracking: compare how Exponential Moving Averages suffer from sample starvation and false precision, while Bayesian estimation maintains calibrated credible intervals.
              </p>
            </div>

            <Chapter02Estimators />
          </div>
        )}

        {/* Open Source Datasets */}
        <section className="pt-16 border-t border-border/40 space-y-8">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
              Open Science
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground font-sans">
              Reproducible Datasets &amp; Benchmarks
            </h3>
          </div>

          <div className="divide-y divide-border/40 border-t border-b border-border/40">
            <div className="py-8 space-y-2">
              <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span className="font-bold text-foreground font-sans text-lg">
                  Synthetic Drift Benchmark (N=10,000)
                </span>
                <span>CC-BY-4.0</span>
              </div>
              <p className="font-sans text-sm text-muted-foreground max-w-3xl">
                Synthetic practitioner trajectories featuring career transitions, domain shocks, and burst observation periods.
              </p>
              <div className="pt-1">
                <a
                  href="https://github.com/Danielmahandana/capability-compass"
                  target="_blank"
                  rel="noreferrer"
                  className="openai-link font-mono text-xs"
                >
                  Download dataset &amp; scripts &rarr;
                </a>
              </div>
            </div>

            <div className="py-8 space-y-2">
              <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span className="font-bold text-foreground font-sans text-lg">
                  OFO &amp; ESCO Alignment Graph
                </span>
                <span>Open Data</span>
              </div>
              <p className="font-sans text-sm text-muted-foreground max-w-3xl">
                Cross-mapped competency vectors aligning the South African Department of Higher Education OFO gazette with European ESCO occupational frameworks.
              </p>
              <div className="pt-1">
                <a
                  href="https://github.com/Danielmahandana/capability-compass"
                  target="_blank"
                  rel="noreferrer"
                  className="openai-link font-mono text-xs"
                >
                  View ontology graph &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
