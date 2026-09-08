import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ModelCardCarousel } from "@/components/sota/ModelCardCarousel";
import { ResearchBreakthroughs } from "@/components/sota/ResearchBreakthroughs";
import { AreasOfWork } from "@/components/sota/AreasOfWork";
import { LatestDispatches } from "@/components/sota/LatestDispatches";
import { LabMissionSection } from "@/components/sota/LabMissionSection";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "THE SOTA LAB — State of the Art Research Laboratory" },
      {
        name: "description",
        content:
          "The Sota Lab investigates online Bayesian capability inference, structured competency topologies, and adaptive cognitive instruments.",
      },
      { property: "og:title", content: "THE SOTA LAB — State of the Art Research Laboratory" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-200 selection:bg-accent selection:text-black">
      {/* =========================================================================
          HERO SECTION (Editorial Typography + Cinematic Architectural Visual)
          ========================================================================= */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 lg:pt-24 pb-16 sm:pb-24 border-b border-border/40 overflow-hidden">
        <div className="space-y-10 sm:space-y-12">
          {/* Eyebrow / Lab Live Status */}
          {/* Bold Primary Statement (1-2 lines, clamp(3.5rem, 7vw, 7rem), -0.04em tracking) */}
          <div className="max-w-5xl space-y-6">
            <h1 className="text-[clamp(2.75rem,6.5vw,6.5rem)] font-sans font-medium tracking-[-0.04em] text-foreground leading-[1.02] text-balance">
              Understanding how people learn, work, and adapt under uncertainty.
            </h1>

            <p className="text-base sm:text-xl lg:text-2xl text-muted-foreground font-sans font-normal leading-relaxed max-w-3xl">
              A research and engineering laboratory investigating online Bayesian capability
              inference, structured competency topologies, and adaptive cognitive instruments.
            </p>
          </div>

          {/* Hero Actions (Pill Buttons) */}
          <div className="pt-1 flex flex-wrap items-center gap-3.5 sm:gap-4 font-mono text-xs">
            <Link
              to="/research"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium tracking-wide transition-transform duration-200 hover:scale-[1.02] active:scale-95 shadow-md"
            >
              <span>Explore Research</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/systems"
              className="inline-flex items-center px-5 py-3 rounded-full bg-surface hover:bg-surface/80 text-foreground border border-border/80 font-medium tracking-wide transition-all duration-200 hover:border-foreground/30 active:scale-95"
            >
              <span>Interactive Models</span>
            </Link>

            <Link
              to="/about"
              className="text-muted-foreground hover:text-foreground transition-colors py-2 px-2 text-xs"
            >
              Lab Methodology &rarr;
            </Link>
          </div>

          {/* Hero Cinematic Visual Experience (Oversized Architectural Visual) */}
          <div className="pt-6 sm:pt-8">
            <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden bg-zinc-950 border border-border/50 shadow-2xl aspect-[16/9] sm:aspect-[21/9]">
              <img
                src="/HH5V_XhXEAA3JfB.jpeg"
                alt="Nocturnal aerospace transporter moving along coastal highway under atmospheric lighting"
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out hover:scale-102"
              />
              {/* Subtle gradient vignette for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Architectural telemetry badge overlay */}
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center space-x-2 font-mono text-[0.68rem] tracking-[0.16em] uppercase text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>Continuous Bayesian Updating</span>
                  </div>
                  <p className="font-sans text-sm sm:text-base font-normal text-zinc-200/90 leading-snug">
                    Tracking latent practitioner capability across sparse, non-stationary evidence
                    streams without arbitrary certainty.
                  </p>
                </div>

                <div className="hidden md:flex flex-col items-end font-mono text-xs text-zinc-400">
                  <span>P(θ | E) ∝ L(E | θ) · P(θ)</span>
                  <span className="text-[0.68rem] text-zinc-500 mt-0.5">
                    BETA-BINOMIAL CONJUGATE DYNAMICS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED WORK / PROJECTS: CINEMATIC MODEL CARD CAROUSEL
          ========================================================================= */}
      <section id="projects" className="border-b border-border/40">
        <ModelCardCarousel />
      </section>

      {/* =========================================================================
          RESEARCH / BREAKTHROUGHS (Editorial Storytelling Hierarchy)
          ========================================================================= */}
      <ResearchBreakthroughs />

      {/* =========================================================================
          AREAS OF WORK: "WHAT WE EXPLORE" (Typographic Focus List)
          ========================================================================= */}
      <AreasOfWork />

      {/* =========================================================================
          LATEST INSIGHTS / PUBLICATIONS (Minimal Dispatches List)
          ========================================================================= */}
      <LatestDispatches />

      {/* =========================================================================
          ABOUT / MISSION: "WE BUILD TO UNDERSTAND"
          ========================================================================= */}
      <LabMissionSection />
    </div>
  );
}
