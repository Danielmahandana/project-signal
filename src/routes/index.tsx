import { createFileRoute } from "@tanstack/react-router";
import { Chapter01Foundations } from "@/components/site/research/Chapter01Foundations";
import { Chapter02Estimators } from "@/components/site/research/Chapter02Estimators";
import { Chapter03Experiments } from "@/components/site/research/Chapter03Experiments";
import { Chapter04AdaptiveLab } from "@/components/site/research/Chapter04AdaptiveLab";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Project Signal — Interactive Research Experience" },
      {
        name: "description",
        content:
          "Learning from evidence: A system for reasoning about latent capabilities from observable evidence via online Bayesian inference.",
      },
      { property: "og:title", content: "Project Signal — Interactive Research Experience" },
      {
        property: "og:description",
        content:
          "Don't build a website that explains the research. Build an interface that lets someone experience the research.",
      },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* =========================================================================
          NOTION-STYLE FULL HORIZONTAL COVER BANNER (Header Image)
          ========================================================================= */}
      <div className="relative w-full h-44 sm:h-64 md:h-80 lg:h-96 overflow-hidden select-none bg-surface">
        <img
          src="/header-brain.jpeg"
          alt="Cognitive Architecture and Neural Inference Visualization"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle Notion Gradient Overlay Fading into Page */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-background" />
      </div>

      {/* =========================================================================
          HERO HEADER / PROLOGUE
          ========================================================================= */}
      <header className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-3 sm:pt-4 pb-8 sm:pb-10">
        {/* Notion Icon Badge */}
        <div className="flex items-center gap-2">
          <div className="flex h-6 sm:h-7 w-6 sm:w-7 items-center justify-center rounded border border-border bg-surface shadow-2xs">
            <Sparkles className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-foreground/80" />
          </div>
          <span className="eyebrow text-muted-foreground text-[0.62rem] sm:text-xs">
            PROJECT SIGNAL &middot; RESEARCH PAPER
          </span>
        </div>

        {/* Primary Page Title */}
        <h1 className="mt-2.5 sm:mt-3 max-w-3xl text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          Learning from evidence.
        </h1>

        <p className="mt-2 max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground font-normal leading-relaxed">
          A system for reasoning about latent capabilities from observable evidence.
        </p>

        {/* Minimalist Chapter Navigation Pills */}
        <div className="mt-5 flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2 border-t border-border">
          {[
            { id: "chapter-01", n: "01", title: "Foundations" },
            { id: "chapter-02", n: "02", title: "EMA vs Bayesian" },
            { id: "chapter-03", n: "03", title: "Experiments" },
            { id: "chapter-04", n: "04", title: "Adaptive Loop" },
          ].map((ch) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => scrollToChapter(ch.id)}
              className="btn-text hover:bg-surface text-xs"
            >
              <span className="text-muted-foreground">{ch.n}</span>
              <span>{ch.title}</span>
            </button>
          ))}
        </div>
      </header>

      {/* =========================================================================
          CHAPTER 01: RESEARCH & FOUNDATIONS (Sections 00 - 01)
          ========================================================================= */}
      <Chapter01Foundations />

      {/* =========================================================================
          CHAPTER 02: THE TWO ESTIMATORS & THE SHIFT (Sections 02 - 05)
          ========================================================================= */}
      <Chapter02Estimators />

      {/* =========================================================================
          CHAPTER 03: THE EXPERIMENTS & COMPARISON (Sections 06 - 12)
          ========================================================================= */}
      <Chapter03Experiments />

      {/* =========================================================================
          CHAPTER 04: ADAPTIVE ENGINE & NOTEBOOK (Sections 13 - 19)
          ========================================================================= */}
      <Chapter04AdaptiveLab />

      {/* =========================================================================
          NOTION-STYLE FULL HORIZONTAL FOOTER BANNER (Footer Image)
          ========================================================================= */}
      <footer className="relative mt-12 sm:mt-16 w-full border-t border-border bg-surface overflow-hidden">
        {/* Full-width Panoramic Footer Cover Image with Fade */}
        <div className="relative w-full h-56 sm:h-72 md:h-80 overflow-hidden select-none">
          <img
            src="/footer-butterfly.jpeg"
            alt="Emergence from Evidence and Continuous Belief Synthesis"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle Gradient Blend */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/25" />

          {/* Footer Foreground Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <p className="eyebrow tracking-widest text-muted-foreground mb-2 text-[0.62rem] sm:text-xs">
              PROJECT SIGNAL &middot; CENTRAL RESEARCH THESIS
            </p>
            <blockquote className="max-w-xl text-base sm:text-lg md:text-xl font-medium text-foreground tracking-tight">
              "The goal is not to predict with certainty.
              <br />
              It is to become more informed with each observation."
            </blockquote>
          </div>
        </div>

        {/* Minimal Copyright & Team Metadata Bar */}
        <div className="border-t border-border bg-background py-5 sm:py-6 px-4 sm:px-6">
          <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-muted-foreground font-mono">
            <div>
              <span className="font-semibold text-foreground">PROJECT SIGNAL</span>
              <span className="mx-2">&middot;</span>
              <span>Darkroom Systems Engineering</span>
            </div>
            <div>
              <span>Daniel &middot; Narvin &middot; Thabang</span>
              <span className="mx-2">&middot;</span>
              <span className="text-foreground">PS-002B Bayesian Engine</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
