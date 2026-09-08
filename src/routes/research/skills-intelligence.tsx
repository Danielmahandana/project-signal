import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SkillsPipelineWidget } from "@/components/site/shared/SkillsPipelineWidget";
import { FailureCaseCard } from "@/components/site/shared/FailureCaseCard";
import { ParallaxImage } from "@/components/sota/ParallaxImage";

export const Route = createFileRoute("/research/skills-intelligence")({
  head: () => ({
    meta: [
      { title: "Skills Intelligence — THE SOTA LAB" },
      {
        name: "description",
        content:
          "Understanding what people can do from unstructured evidence. Contextual token extraction and ontology projection across ESCO and OFO frameworks by The Sota Lab.",
      },
      { property: "og:title", content: "Skills Intelligence — THE SOTA LAB" },
    ],
  }),
  component: SkillsIntelligencePage,
});

function SkillsIntelligencePage() {
  const [copiedBibtex, setCopiedBibtex] = useState<boolean>(false);

  const bibtex = `@article{mahandana2026skillsintelligence,
  author  = {Mahandana, Daniel and Systems Lab Group},
  title   = {Skills Intelligence in TVET Ecosystems: Contextual Extraction and Standardized Ontologies},
  journal = {The Sota Lab Working Papers},
  year    = {2026},
  volume  = {2},
  number  = {1},
  url     = {https://sota-lab.lovable.app/research/skills-intelligence}
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
          src="/topological-graph.jpg"
          alt="Topological emergence of skills and competency graphs"
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
            <span className="text-foreground">Skills Intelligence</span>
          </div>

          <div className="font-mono text-xs text-muted-foreground flex items-center space-x-2">
            <span className="text-accent uppercase tracking-widest font-semibold">SOTA-WP-2026-02</span>
            <span>&middot;</span>
            <span>Data Topologies &middot; 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-editorial-serif tracking-tight text-foreground leading-[1.06]">
            Skills Intelligence
          </h1>

          <p className="text-lg sm:text-2xl text-muted-foreground font-normal leading-relaxed max-w-3xl font-sans">
            Understanding what people can do from unstructured evidence.
          </p>

          <div className="pt-2 font-mono text-xs text-muted-foreground">
            Daniel Mahandana &middot; Systems Lab Group &middot; The Sota Lab
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
            Free-form CVs and vocational certificates contain rich latent signals that conventional keyword matching routinely fails to capture. We develop an entity-extraction and graph-alignment architecture that maps natural language experience to standardized international taxonomies (ESCO/OFO) with calibrated confidence, separating job-title marketing from genuine operational mastery.
          </p>
        </div>

        {/* 01 The Question */}
        <section className="space-y-4 pt-10 border-t border-border/40">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
            01 / The Core Question
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-sans tracking-tight text-foreground">
            Can structural competency graphs recover genuine practitioner capabilities without succumbing to job-title ambiguity?
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-3xl font-sans">
            In our parsing experiments over 4,800 vocational CVs, words like "managed" or "engineered" appeared in over 60% of entries with near-zero correlation to domain competency. By anchoring textual tokens to formal ontology graphs (ESCO and South African OFO codes), our pipeline recovers true operational capacity.
          </p>
        </section>

        {/* 02 Interactive Pipeline */}
        <section className="space-y-6 pt-10 border-t border-border/40">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
              02 / Live Transformation Pipeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-foreground">
              Unstructured Text &rarr; Competency Projection
            </h2>
          </div>

          <SkillsPipelineWidget />
        </section>

        {/* 03 Failure Modes */}
        <section className="space-y-6 pt-10 border-t border-border/40">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
              03 / Empirical Failure Analysis
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-foreground">
              Where Lexical Ambiguity Challenges the Model
            </h2>
          </div>

          <FailureCaseCard />
        </section>

        {/* 04 Citation */}
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
