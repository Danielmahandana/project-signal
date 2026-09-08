import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function LabMissionSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Editorial Copy */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>About the Lab // Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-medium tracking-[-0.04em] text-foreground leading-[1.08]">
              We build to understand.
            </h2>
          </div>

          <div className="space-y-4 max-w-2xl">
            <p className="text-lg sm:text-xl text-foreground/90 font-sans font-normal leading-relaxed">
              We are a research-driven team exploring how technology, data, and intelligent systems
              can solve meaningful problems under real-world uncertainty.
            </p>

            <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
              Rather than testing hypotheses in synthetic vacuum scenarios, we validate our models
              against the noisy, non-stationary friction of real-world vocational education,
              technical trade cohorts, and emerging workforce signals across South Africa and the
              Global South.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-foreground text-background hover:bg-foreground/90 font-mono text-xs tracking-wider uppercase font-semibold transition-transform duration-200 hover:scale-[1.02] active:scale-95 shadow-md"
            >
              <span>Our Principles &amp; Methodology</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/people"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-border/70 hover:border-foreground/30 bg-surface/50 text-foreground font-mono text-xs tracking-wider uppercase transition-colors"
            >
              <span>Research Group</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Right Artfully Framed Human Workspace Image */}
        <div className="lg:col-span-5">
          <div className="relative rounded-[24px] overflow-hidden bg-surface border border-border/60 shadow-2xl aspect-[4/5] sm:aspect-[3/4]">
            <img
              src="/home.jpeg"
              alt="Contemplative human workspace with natural tree shadow projection"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 text-white font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-300">
                <span>HUMAN CAPABILITY RESEARCH</span>
                <span>JHB // 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
