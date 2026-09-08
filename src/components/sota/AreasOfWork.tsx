import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

interface AreaItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  disciplines: string[];
  imageSrc: string;
  linkTo: string;
}

const AREAS: AreaItem[] = [
  {
    id: "ai-systems",
    number: "01",
    title: "Artificial Intelligence & Probabilistic Kernels",
    subtitle:
      "Online Bayesian filtering, conjugate Beta-Binomial state estimation, and entropy-regularized drift compensation under sparse observations.",
    disciplines: ["Bayesian Estimation", "Conjugate Priors", "Regime Shift Detection"],
    imageSrc: "/manifold.jpg",
    linkTo: "/research",
  },
  {
    id: "data-topologies",
    number: "02",
    title: "Data Topologies & Occupational Graphs",
    subtitle:
      "Bridging unstructured experience records and international competency frameworks (ESCO/OFO) through semantic token extraction and hierarchical projections.",
    disciplines: ["Competency Ontologies", "NLP Entity Classifiers", "Graph Manifolds"],
    imageSrc: "/topological-graph.jpg",
    linkTo: "/research",
  },
  {
    id: "human-capability",
    number: "03",
    title: "Cognitive Assessment & Adaptive Instruments",
    subtitle:
      "Computerized adaptive testing via maximum Fisher information gain, dynamically self-optimizing evaluation items to tighten capability bounds.",
    disciplines: ["Adaptive CAT", "Fisher Information Routing", "Latent Psychometrics"],
    imageSrc: "/cognitive-lens.jpg",
    linkTo: "/research",
  },
  {
    id: "labour-markets",
    number: "04",
    title: "Empirical Labour Market Signals",
    subtitle:
      "Validating computational hypotheses against the non-stationary friction of real-world technical colleges (TVETs) and industrial trades in South Africa.",
    disciplines: ["TVET Apprentice Cohorts", "Skill Gap Dynamics", "Credential Verification"],
    imageSrc: "/HH5V_XhXEAA3JfB.jpeg",
    linkTo: "/about",
  },
];

export function AreasOfWork() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-b border-border/40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading & Sticky Preview Window */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>What We Explore</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium tracking-[-0.035em] text-foreground leading-tight">
              Areas of Inquiry
            </h2>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
            Our research unites probabilistic machine learning, psychometric measurement, and
            empirical labor-market telemetry. Hover each discipline to inspect active directions.
          </p>

          {/* Dynamic Image Preview Container (Desktop) */}
          <div className="hidden lg:block relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface border border-border/60 shadow-lg mt-6">
            {AREAS.map((area, idx) => {
              const isVisible = hoveredIndex === idx || (hoveredIndex === null && idx === 0);
              return (
                <div
                  key={area.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                  }`}
                >
                  <img
                    src={area.imageSrc}
                    alt={area.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="font-mono text-[0.68rem] tracking-wider uppercase text-zinc-300 block mb-1">
                      Preview // {area.number}
                    </span>
                    <span className="font-sans text-xs font-medium text-white line-clamp-1">
                      {area.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Typographic Interactive List */}
        <div
          className="lg:col-span-8 divide-y divide-border/40 border-t border-b border-border/40"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {AREAS.map((area, idx) => {
            const isHovered = hoveredIndex === idx;
            const isAnyHovered = hoveredIndex !== null;
            const isDimmed = isAnyHovered && !isHovered;

            return (
              <Link
                key={area.id}
                to={area.linkTo}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`group block py-8 sm:py-10 transition-all duration-300 ${
                  isDimmed ? "opacity-35" : "opacity-100"
                }`}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs text-muted-foreground group-hover:text-accent transition-colors">
                        {area.number}
                      </span>
                      <span className="h-px w-6 bg-border/80 group-hover:w-10 group-hover:bg-accent transition-all duration-300" />
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-medium tracking-tight text-foreground group-hover:text-accent transition-colors leading-snug">
                      {area.title}
                    </h3>

                    <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
                      {area.subtitle}
                    </p>

                    {/* Disciplines Chips */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      {area.disciplines.map((disc) => (
                        <span
                          key={disc}
                          className="font-mono text-[0.68rem] tracking-wider uppercase px-2.5 py-1 rounded-full bg-surface border border-border/60 text-muted-foreground group-hover:text-foreground group-hover:border-foreground/20 transition-colors"
                        >
                          {disc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="w-10 h-10 rounded-full border border-border/60 group-hover:border-foreground/30 group-hover:bg-surface flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-all duration-200 shrink-0 mt-1">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
