import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

export interface ModelCardItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  primaryLink: string;
  primaryLabel?: string;
  secondaryLink?: string;
  secondaryLabel?: string;
  isExternal?: boolean;
}

const FEATURED_CAROUSEL_PROJECTS: ModelCardItem[] = [
  {
    id: "capability-inference",
    number: "01",
    category: "AI Systems · Probabilistic Kernels",
    title: "Capability Inference",
    description:
      "Continuous Bayesian belief states that track epistemic uncertainty under sparse evidence, regularizing non-stationary skill decay.",
    imageSrc: "/manifold.jpg",
    imageAlt: "Bayesian probability density manifold on obsidian plinth",
    primaryLink: "/research/capability-inference",
    primaryLabel: "Explore",
    secondaryLink: "/systems",
    secondaryLabel: "Interactive Model",
  },
  {
    id: "skills-intelligence",
    number: "02",
    category: "Data Topologies · Ontologies",
    title: "Skills Intelligence",
    description:
      "Extracting latent vocational competencies from unstructured experience and mapping tokens onto international ESCO and OFO hierarchical manifolds.",
    imageSrc: "/topological-graph.jpg",
    imageAlt: "High-dimensional topological skill graph network in deep space",
    primaryLink: "/research/skills-intelligence",
    primaryLabel: "Explore",
    secondaryLink: "/systems",
    secondaryLabel: "Graph Explorer",
  },
  {
    id: "cognitive-assessment",
    number: "03",
    category: "Human Capability · Psychometrics",
    title: "Cognitive Assessment Engine",
    description:
      "Computerized adaptive item routing via maximum Fisher information gain, converging to narrow capability bounds in 42% fewer observations.",
    imageSrc: "/cognitive-lens.jpg",
    imageAlt: "Precision adaptive lens with coherent light interference telemetry",
    primaryLink: "/research/cognitive-assessment",
    primaryLabel: "Explore",
    secondaryLink: "/systems",
    secondaryLabel: "Live Simulator",
  },
  {
    id: "tvet-labour-radar",
    number: "04",
    category: "Labour Signals · Field Studies",
    title: "TVET Labour Market Radar",
    description:
      "Empirical quantification of curriculum obsolescence and industrial demand friction across South African vocational trade cohorts.",
    imageSrc: "/HH5V_XhXEAA3JfB.jpeg",
    imageAlt: "Nocturnal aerospace transporter moving along coastal highway",
    primaryLink: "/research",
    primaryLabel: "Explore",
    secondaryLink: "/publications",
    secondaryLabel: "Read Monograph",
  },
  {
    id: "synthetic-drift-benchmark",
    number: "05",
    category: "Benchmarks · Monte Carlo",
    title: "Synthetic Drift Benchmark",
    description:
      "A reproducible simulation harness evaluating Bayesian belief resilience under sudden career transitions versus heuristic moving averages.",
    imageSrc: "/new.jpeg",
    imageAlt: "Misty mountain bridge with red-robed figure and ancient pine",
    primaryLink: "/publications",
    primaryLabel: "Explore",
    secondaryLink: "https://github.com/Danielmahandana/capability-compass",
    secondaryLabel: "GitHub Repo",
    isExternal: true,
  },
];

interface ModelCardCarouselProps {
  items?: ModelCardItem[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export function ModelCardCarousel({
  items = FEATURED_CAROUSEL_PROJECTS,
  eyebrow = "FEATURED WORK // PROJECTS",
  title = "Selected Systems & Research",
  subtitle = "Interactive instruments and computational models pushing the boundary of capability inference.",
}: ModelCardCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    containScroll: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((idx: number) => emblaApi && emblaApi.scrollTo(idx), [emblaApi]);

  // Keyboard navigation when carousel is in view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!carouselContainerRef.current) return;
      const rect = carouselContainerRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollPrev, scrollNext]);

  return (
    <div
      ref={carouselContainerRef}
      className="relative w-full py-16 sm:py-24 overflow-hidden"
      aria-label="Featured Projects Carousel"
    >
      {/* Editorial Header with Navigation Controls */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-2 font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>{eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium tracking-[-0.035em] text-foreground leading-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Desktop Arrow & Step Indicators */}
          <div className="flex items-center space-x-4">
            <div className="font-mono text-xs text-muted-foreground tracking-wider">
              <span className="text-foreground font-semibold">
                {String(selectedIndex + 1).padStart(2, "0")}
              </span>
              <span className="mx-1.5 opacity-40">/</span>
              <span>{String(items.length).padStart(2, "0")}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Previous Project"
                className="w-10 h-10 rounded-full border border-border/70 hover:border-foreground/40 bg-surface/60 hover:bg-surface flex items-center justify-center text-foreground transition-all duration-200 cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Next Project"
                className="w-10 h-10 rounded-full border border-border/70 hover:border-foreground/40 bg-surface/60 hover:bg-surface flex items-center justify-center text-foreground transition-all duration-200 cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Embla Track Viewport */}
      <div className="embla overflow-visible cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="embla__container flex touch-pan-y">
          {items.map((item, idx) => {
            const count = items.length;
            // Shortest distance in loop
            let diff = (idx - selectedIndex + count) % count;
            if (diff > count / 2) diff -= count;

            const isActive = diff === 0;
            const isAdjacent = Math.abs(diff) === 1;

            // Physical scale & opacity interpolation according to specification
            const scaleClass = isActive
              ? "scale-100 opacity-100 z-30"
              : isAdjacent
                ? "scale-[0.96] opacity-85 z-20"
                : "scale-[0.91] opacity-60 z-10";

            return (
              <div
                key={item.id}
                className="embla__slide flex-none pl-4 sm:pl-6 first:pl-4"
                style={{ flex: "0 0 auto" }}
              >
                <div
                  onClick={() => !isActive && scrollTo(idx)}
                  className={`group relative w-[320px] sm:w-[355px] md:w-[375px] h-[510px] sm:h-[535px] md:h-[550px] rounded-[24px] overflow-hidden shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${scaleClass} ${
                    !isActive ? "cursor-pointer hover:opacity-95" : ""
                  }`}
                >
                  {/* Full-bleed background image with subtle zoom when active */}
                  <div className="absolute inset-0 overflow-hidden bg-zinc-950">
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      loading="lazy"
                      className={`w-full h-full object-cover transition-transform duration-[3000ms] ease-out will-change-transform ${
                        isActive ? "scale-105" : "scale-100 group-hover:scale-102"
                      }`}
                    />
                  </div>

                  {/* Readability Gradient: deep black at bottom, subtle veil at top */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10 pointer-events-none" />

                  {/* Fine edge highlight border */}
                  <div className="absolute inset-0 rounded-[24px] border border-white/10 pointer-events-none" />

                  {/* Content Container (Top category + Bottom title/desc/actions) */}
                  <div className="relative z-10 h-full p-6 sm:p-7 flex flex-col justify-between text-white">
                    {/* Top Eyebrow & Number */}
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-[0.68rem] tracking-[0.16em] uppercase text-zinc-300 font-semibold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                        {item.category}
                      </div>
                      <span className="font-mono text-xs text-zinc-400">{item.number}</span>
                    </div>

                    {/* Bottom Content Hierarchy */}
                    <div className="space-y-3.5 pt-12">
                      <h3 className="text-[21px] sm:text-[22px] font-sans font-medium tracking-tight text-white leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-[14px] sm:text-[15px] text-zinc-300/90 font-sans leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      {/* Pill Buttons */}
                      <div className="pt-2 flex items-center gap-3">
                        {item.isExternal ? (
                          <a
                            href={item.primaryLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-medium tracking-tight transition-transform duration-200 hover:scale-[1.03] active:scale-95 shadow-md"
                          >
                            <span>{item.primaryLabel || "Explore"}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <Link
                            to={item.primaryLink}
                            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-medium tracking-tight transition-transform duration-200 hover:scale-[1.03] active:scale-95 shadow-md"
                          >
                            <span>{item.primaryLabel || "Explore"}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        )}

                        {item.secondaryLink && (
                          <Link
                            to={item.secondaryLink}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white text-xs font-medium tracking-tight transition-all duration-200 hover:scale-[1.03] active:scale-95"
                          >
                            <span>{item.secondaryLabel || "Learn more"}</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Dot Navigation */}
      <div className="flex sm:hidden items-center justify-center space-x-2 pt-8">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              selectedIndex === i ? "w-6 bg-foreground" : "w-1.5 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
