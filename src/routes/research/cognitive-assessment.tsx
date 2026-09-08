import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AdaptiveLoopDiagram } from "@/components/site/shared/AdaptiveLoopDiagram";
import { Chapter04AdaptiveLab } from "@/components/site/research/Chapter04AdaptiveLab";
import { ParallaxImage } from "@/components/sota/ParallaxImage";

export const Route = createFileRoute("/research/cognitive-assessment")({
  head: () => ({
    meta: [
      { title: "Cognitive Assessment Engine — THE SOTA LAB" },
      {
        name: "description",
        content:
          "Designing computational systems that interact with human reasoning. Computerized Adaptive Testing (CAT) via maximum Fisher information gain by The Sota Lab.",
      },
      { property: "og:title", content: "Cognitive Assessment Engine — THE SOTA LAB" },
    ],
  }),
  component: CognitiveAssessmentPage,
});

function CognitiveAssessmentPage() {
  const [copiedBibtex, setCopiedBibtex] = useState<boolean>(false);

  const bibtex = `@techreport{systems2026adaptive,
  author    = {Systems Engineering Team and Mahandana, Daniel},
  title     = {Adaptive Measurement via Maximum Information-Gain Item Routing},
  institution = {The Sota Lab},
  year      = {2026},
  url       = {https://sota-lab.lovable.app/research/cognitive-assessment}
}`;

  const copy = () => {
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* =========================================================================
          TOP HERO IMAGE (Cinematic Project Banner)
          ========================================================================= */}
      <div className="relative w-full h-64 sm:h-96 md:h-[480px] overflow-hidden select-none bg-surface">
        <ParallaxImage
          src="/cognitive-lens.jpg"
          alt="Cognitive architecture and adaptive item routing"
          containerClassName="w-full h-full"
          speed={0.05}
          zoomOnHover={false}
          enableTilt
          cursorText="STUDY"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent pointer-events-none" />
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
            <span className="text-foreground">Cognitive Assessment</span>
          </div>

          <div className="font-mono text-xs text-muted-foreground flex items-center space-x-2">
            <span className="text-accent uppercase tracking-widest font-semibold">SOTA-TN-2026-03</span>
            <span>&middot;</span>
            <span>Human Capability &middot; 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-editorial-serif tracking-tight text-foreground leading-[1.06]">
            Cognitive Assessment Engine
          </h1>

          <p className="text-lg sm:text-2xl text-muted-foreground font-normal leading-relaxed max-w-3xl font-sans">
            Designing computational systems that interact with human reasoning.
          </p>

          <div className="pt-2 font-mono text-xs text-muted-foreground">
            Systems Engineering Team &middot; Daniel Mahandana &middot; The Sota Lab
          </div>
        </div>
      </div>

      {/* =========================================================================
          RESEARCH WORK SECTION (Clean, Unboxed)
          ========================================================================= */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12 space-y-20">
        {/* Abstract */}
        <div className="space-y-3 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
            Abstract
          </span>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-foreground/90">
            Fixed-length examinations force candidates through dozens of uninformative questions. Our adaptive engine dynamically routes evaluation items based on current posterior variance and Fisher information, converging to stable capability bounds in 42% fewer observations.
          </p>
        </div>

        {/* 01 System Dynamics */}
        <section className="space-y-6 pt-10 border-t border-border/40">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
              01 / Information Gain Dynamics
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-sans tracking-tight text-foreground">
              Active Bayesian Item Routing
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-3xl font-sans">
              Each interaction evaluates the candidate's current belief state P(θ | E) against the item characteristic curve. The item yielding the highest expected variance reduction is selected.
            </p>
          </div>

          <AdaptiveLoopDiagram />
        </section>

        {/* 02 Interactive Simulator */}
        <section className="space-y-6 pt-10 border-t border-border/40">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
              02 / Live Simulation Harness
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-foreground">
              Interactive Adaptive Loop
            </h2>
          </div>

          <Chapter04AdaptiveLab />
        </section>

        {/* 03 Citation */}
        <section className="space-y-3 pt-10 border-t border-border/40 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="uppercase tracking-wider text-muted-foreground">Citation (BibTeX)</span>
            <button
              type="button"
              onClick={copy}
              className="text-foreground hover:text-[#10A37F] cursor-pointer"
            >
              {copiedBibtex ? "Copied to clipboard" : "Copy BibTeX &rarr;"}
            </button>
          </div>
          <pre className="p-4 bg-surface/50 border border-border/40 overflow-x-auto text-xs text-muted-foreground rounded-sm">
            {bibtex}
          </pre>
        </section>
      </main>
    </div>
  );
}
