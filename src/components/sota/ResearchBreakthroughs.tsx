import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function ResearchBreakthroughs() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-b border-border/40">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center space-x-2 font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Research &amp; Breakthroughs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium tracking-[-0.035em] text-foreground leading-tight">
            Research that moves the frontier.
          </h2>
        </div>

        <Link
          to="/research"
          className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 pb-1"
        >
          <span>All investigations</span>
          <span>&rarr;</span>
        </Link>
      </div>

      {/* Editorial Hierarchy: 1 Big Dominant Feature + 2 Secondary Stories */}
      <div className="space-y-12 sm:space-y-16">
        {/* Dominant Featured Story */}
        <Link
          to="/research/capability-inference"
          className="group block rounded-[24px] bg-surface/50 border border-border/50 hover:border-foreground/30 overflow-hidden transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Big Cinematic Image */}
            <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[440px] overflow-hidden bg-zinc-950">
              <img
                src="/new.jpeg"
                alt="Atmospheric mountain pass with red robed figure and ancient pine"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-surface/50" />
            </div>

            {/* Editorial Content */}
            <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 font-mono text-[0.72rem] tracking-wider uppercase text-accent font-semibold">
                  <span>Flagship Investigation // 01</span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-medium tracking-[-0.03em] text-foreground leading-[1.15] group-hover:text-accent transition-colors">
                  Probabilistic Capability Inference from Sparse Observation Streams
                </h3>

                <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
                  Moving from static score reductionism to continuous Bayesian belief states that
                  track epistemic uncertainty under sparse evidence. Our filter regularizes
                  non-stationary performance degradation across technical domains.
                </p>

                <div className="pt-2 font-mono text-xs text-muted-foreground/80 space-x-3">
                  <span>Daniel Mahandana &amp; Narvin M.</span>
                  <span>&middot;</span>
                  <span>2026</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-2 font-mono text-xs text-foreground font-semibold group-hover:text-accent transition-colors">
                <span>Read investigation</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </Link>

        {/* 2 Secondary Stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {/* Secondary Story 1 */}
          <Link
            to="/research/skills-intelligence"
            className="group block rounded-[24px] bg-surface/50 border border-border/50 hover:border-foreground/30 overflow-hidden transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
              <img
                src="/topological-graph.jpg"
                alt="High-dimensional topological skill graph"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground block font-medium">
                  Data Topologies · NLP &amp; Ontologies
                </span>
                <h4 className="text-xl sm:text-2xl font-sans font-medium tracking-tight text-foreground group-hover:text-accent transition-colors leading-snug">
                  Skills Intelligence in TVET Ecosystems
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed line-clamp-3">
                  Extracting authenticated vocational competencies from unstructured resumes,
                  institutional curricula, and industrial certifications projected onto ESCO and OFO
                  manifolds.
                </p>
              </div>

              <div className="pt-3 font-mono text-xs text-foreground font-semibold inline-flex items-center gap-1 group-hover:text-accent transition-colors">
                <span>Explore research</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Link>

          {/* Secondary Story 2 */}
          <Link
            to="/research/cognitive-assessment"
            className="group block rounded-[24px] bg-surface/50 border border-border/50 hover:border-foreground/30 overflow-hidden transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
              <img
                src="/cognitive-lens.jpg"
                alt="Adaptive lens and coherent optical telemetry"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground block font-medium">
                  Human Capability · Adaptive Instruments
                </span>
                <h4 className="text-xl sm:text-2xl font-sans font-medium tracking-tight text-foreground group-hover:text-accent transition-colors leading-snug">
                  Adaptive Computerized Cognitive Engine
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed line-clamp-3">
                  Dynamic next-item routing via maximum Fisher information gain. Tighter capability
                  confidence intervals achieved in 42% fewer observations than static linear
                  batteries.
                </p>
              </div>

              <div className="pt-3 font-mono text-xs text-foreground font-semibold inline-flex items-center gap-1 group-hover:text-accent transition-colors">
                <span>Explore research</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
