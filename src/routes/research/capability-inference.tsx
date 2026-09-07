import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BeliefUpdateWidget } from "@/components/site/shared/BeliefUpdateWidget";
import { FailureCaseCard } from "@/components/site/shared/FailureCaseCard";
import { Chapter01Foundations } from "@/components/site/research/Chapter01Foundations";
import { Chapter02Estimators } from "@/components/site/research/Chapter02Estimators";
import { Chapter03Experiments } from "@/components/site/research/Chapter03Experiments";
import { Chapter04AdaptiveLab } from "@/components/site/research/Chapter04AdaptiveLab";

export const Route = createFileRoute("/research/capability-inference")({
  head: () => ({
    meta: [
      { title: "Capability Inference — Research Laboratory" },
      {
        name: "description",
        content:
          "Probabilistic modelling of latent human capability from sparse observation streams. An interactive research monograph.",
      },
      { property: "og:title", content: "Capability Inference — Research Laboratory" },
    ],
  }),
  component: CapabilityInferencePage,
});

type ProjectView = "overview" | "system" | "experiments" | "monograph";

export function CapabilityInferencePage() {
  const [activeTab, setActiveTab] = useState<ProjectView>("overview");
  const [copiedBibtex, setCopiedBibtex] = useState<boolean>(false);
  const [selectedSubsystem, setSelectedSubsystem] = useState<number>(0);

  const bibtexCode = `@techreport{mahandana2026probabilistic,
  author    = {Mahandana, Daniel and M., Narvin and K., Thabang},
  title     = {Probabilistic Modelling of Latent Human Capability from Sparse Observation Streams},
  institution = {Capability Compass Research Lab},
  year      = {2026},
  number    = {PS-TR-2026-01},
  url       = {https://capability-compass.lovable.app/research/capability-inference}
}`;

  const copyBibtex = () => {
    navigator.clipboard.writeText(bibtexCode);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  const SUBSYSTEMS = [
    {
      name: "01 Evidence Ingestion",
      model: "Event stream parser & regularizer",
      latency: "12ms",
      details: "Normalizes multi-channel inputs (CV text, test responses, code commits, peer evaluations) into structured observation tuples.",
    },
    {
      name: "02 Token Extraction",
      model: "Fine-tuned Transformer Token Classifier",
      latency: "45ms",
      details: "Isolates vocational domain-specific entities (e.g. SANS 10142, Python, PLC maintenance) without relying on job titles.",
    },
    {
      name: "03 Ontological Manifold",
      model: "Hierarchical Graph Projection (ESCO / OFO)",
      latency: "18ms",
      details: "Maps extracted entities into dense multi-dimensional capability coordinates aligned with standardized frameworks.",
    },
    {
      name: "04 Bayesian Inference Kernel",
      model: "Beta Conjugate Filter with Drift Discount",
      latency: "1.2ms",
      details: "Updates posterior parameters P(θ | E) ~ Beta(α, β) in O(1) time and bounds epistemic uncertainty under sparse evidence.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* =========================================================================
          TOP HERO IMAGE (Cinematic Project Banner as requested)
          ========================================================================= */}
      <div className="relative w-full h-64 sm:h-96 md:h-[460px] overflow-hidden select-none bg-surface">
        <img
          src="/header-brain.jpeg"
          alt="Neural topology and cognitive inference visualization"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
      </div>

      {/* =========================================================================
          PROJECT TITLE & METADATA
          ========================================================================= */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-6 sm:pt-10 pb-10 border-b border-border/40">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 font-mono text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/research" className="hover:text-foreground">Research</Link>
            <span>/</span>
            <span className="text-foreground">Capability Inference</span>
          </div>

          <div className="font-mono text-xs text-muted-foreground">
            <span className="text-foreground uppercase tracking-widest font-semibold">PS-TR-2026-01</span>
            <span> &middot; </span>
            <span>AI Systems &middot; September 2026</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-bold tracking-tight text-foreground font-sans">
            Capability Inference
          </h1>

          <p className="text-lg sm:text-2xl text-muted-foreground font-normal leading-relaxed max-w-3xl font-sans">
            From static scores to probabilistic beliefs about human capability.
          </p>

          <div className="pt-2 font-mono text-xs text-muted-foreground">
            Daniel Mahandana, Narvin M., Thabang K.
          </div>
        </div>

        {/* Minimalist Tab Navigation (No boxy buttons) */}
        <div className="mt-10 flex flex-wrap items-center space-x-6 font-mono text-xs pt-4 border-t border-border/40">
          {[
            { id: "overview", label: "01 Overview" },
            { id: "system", label: "02 System Architecture" },
            { id: "experiments", label: "03 Empirical Experiments" },
            { id: "monograph", label: "04 Full Monograph & Math" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as ProjectView)}
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
      </div>

      {/* =========================================================================
          MAIN RESEARCH WORK SECTION
          ========================================================================= */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        {activeTab === "overview" && (
          <div className="space-y-20 animate-in fade-in duration-150">
            {/* Abstract */}
            <div className="space-y-3 max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
                Abstract
              </span>
              <p className="font-sans text-base sm:text-lg leading-relaxed text-foreground/90">
                Traditional assessment instruments collapse multi-dimensional human competence into a single static score. We formalize capability estimation as an online Bayesian filtering problem over non-stationary evidence streams. By representing capability belief states as Beta distributions B(α, β) coupled with an entropy-regularized pseudo-count discount factor, we avoid the catastrophic score lock-in observed in conventional moving averages while retaining bounded variance under small sample regimes.
              </p>
            </div>

            {/* The Question */}
            <section className="space-y-6 pt-10 border-t border-border/40">
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
                  01 / The Core Question
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold font-sans tracking-tight text-foreground">
                  How should we represent capability when our evidence is incomplete?
                </h2>
              </div>

              <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-3xl">
                When assessing a human practitioner, evidence arrives as a non-stationary sequence: resume records, project deliverables, proctored code evaluations, peer feedback, and long idle intervals. Single scores discard epistemic uncertainty. Instead, our belief state maintains a continuous probability density over latent mastery.
              </p>

              {/* Minimalist Flow Diagram (No boxes) */}
              <div className="py-6 font-mono text-xs text-muted-foreground">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="text-foreground font-semibold">Evidence Streams</span>
                  <span>&rarr;</span>
                  <span>Likelihood Modeling</span>
                  <span>&rarr;</span>
                  <span>Conjugate Filter</span>
                  <span>&rarr;</span>
                  <span className="text-[#10A37F] font-semibold">Posterior Credible Bounds</span>
                </div>
              </div>
            </section>

            {/* Interactive Methodology Section */}
            <section className="space-y-6 pt-10 border-t border-border/40">
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
                  02 / Interactive Methodology
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-foreground">
                  Updating the Belief
                </h2>
                <p className="font-sans text-sm text-muted-foreground max-w-2xl">
                  Test how incoming observable evidence alters the latent capability parameter and narrows the credible interval in real time.
                </p>
              </div>

              <BeliefUpdateWidget />
            </section>

            {/* Failure Cases Section */}
            <section className="space-y-6 pt-10 border-t border-border/40">
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
                  03 / Diagnostic Scrutiny
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-foreground">
                  Where the system fails
                </h2>
              </div>

              <FailureCaseCard />
            </section>

            {/* Citation */}
            <section className="space-y-3 pt-10 border-t border-border/40 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="uppercase tracking-wider text-muted-foreground">Citation (BibTeX)</span>
                <button
                  type="button"
                  onClick={copyBibtex}
                  className="text-foreground hover:text-[#10A37F] cursor-pointer"
                >
                  {copiedBibtex ? "Copied to clipboard" : "Copy BibTeX &rarr;"}
                </button>
              </div>
              <pre className="p-4 bg-surface/50 border border-border/40 overflow-x-auto text-xs text-muted-foreground rounded-sm">
                {bibtexCode}
              </pre>
            </section>
          </div>
        )}

        {activeTab === "system" && (
          <div className="space-y-12 animate-in fade-in duration-150 font-mono text-xs">
            <div className="space-y-2 font-sans">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Inference Engine Subsystems
              </h2>
              <p className="text-muted-foreground text-sm">
                The inference architecture operates as a low-latency pipeline with formal latency contracts:
              </p>
            </div>

            <div className="divide-y divide-border/40 border-t border-b border-border/40">
              {SUBSYSTEMS.map((sub, idx) => (
                <div key={idx} className="py-6 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground font-sans text-base">{sub.name}</span>
                    <span className="text-[#10A37F] font-mono">p99: {sub.latency}</span>
                  </div>
                  <div className="text-muted-foreground font-mono text-xs">
                    Model: {sub.model}
                  </div>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                    {sub.details}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="https://github.com/Danielmahandana/capability-compass"
                target="_blank"
                rel="noreferrer"
                className="openai-link font-mono text-xs"
              >
                Inspect open-source code repository &rarr;
              </a>
            </div>
          </div>
        )}

        {activeTab === "experiments" && (
          <div className="space-y-12 animate-in fade-in duration-150">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold font-sans text-foreground">
                Empirical Benchmark Matrix
              </h2>
              <p className="text-muted-foreground text-sm font-sans">
                Evaluation across 4,821 practitioner CVs and 10,000 synthetic non-stationary trajectories.
              </p>
            </div>

            <div className="divide-y divide-border/40 border-t border-b border-border/40 font-mono text-xs">
              {[
                { metric: "Skill Extraction (F1)", baseline: "0.71", model: "0.83", delta: "+16.9%" },
                { metric: "Occupation Match (OFO)", baseline: "0.64", model: "0.79", delta: "+23.4%" },
                { metric: "Rare Technical Trades", baseline: "0.42", model: "0.68", delta: "+61.9%" },
                { metric: "Expected Calibration Error", baseline: "0.19", model: "0.04", delta: "-78.9%" },
              ].map((row, i) => (
                <div key={i} className="py-4 flex items-center justify-between">
                  <span className="text-foreground font-sans font-medium text-sm">{row.metric}</span>
                  <div className="flex items-center space-x-6 text-xs">
                    <span className="text-muted-foreground">Baseline: {row.baseline}</span>
                    <span className="text-foreground font-bold">Ours: {row.model}</span>
                    <span className="text-[#10A37F] font-semibold">{row.delta}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Chapter03Experiments />
            </div>
          </div>
        )}

        {activeTab === "monograph" && (
          <div className="space-y-12 animate-in fade-in duration-150">
            <Chapter01Foundations />
            <Chapter02Estimators />
            <Chapter04AdaptiveLab />
          </div>
        )}
      </main>
    </div>
  );
}
