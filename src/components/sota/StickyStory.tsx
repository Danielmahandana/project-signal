import { type ReactNode } from "react";
import { ParallaxImage } from "./ParallaxImage";

export interface StoryStep {
  tag: string;
  title: string;
  body: string;
  extra?: ReactNode;
}

interface StickyStoryProps {
  stickyImage: string;
  stickyAlt: string;
  badge?: string;
  headline: string;
  steps: StoryStep[];
  className?: string;
}

export function StickyStory({
  stickyImage,
  stickyAlt,
  badge = "METHODOLOGY & HYPOTHESIS",
  headline,
  steps,
  className = "",
}: StickyStoryProps) {
  return (
    <section className={`py-16 sm:py-24 border-t border-border/40 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Sticky Scientific Visual */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>{badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif leading-tight text-foreground tracking-tight">
            {headline}
          </h2>

          <div className="relative w-full h-80 sm:h-96 md:h-[440px] rounded-md overflow-hidden border border-border/60 bg-surface shadow-lg mt-6">
            <ParallaxImage
              src={stickyImage}
              alt={stickyAlt}
              containerClassName="w-full h-full"
              speed={0.04}
              enableTilt
              cursorText="INVESTIGATE"
            />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded bg-black/60 backdrop-blur-md font-mono text-[0.68rem] text-white/90 flex justify-between">
              <span>LATENT MANIFOLD</span>
              <span>26.2041° S &middot; OPEN LAB</span>
            </div>
          </div>
        </div>

        {/* Right Column: Progressive Scrolling Research Narrative */}
        <div className="lg:col-span-6 space-y-16 sm:space-y-24 pt-4 lg:pt-12">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="space-y-4 border-l-2 border-border/60 pl-6 sm:pl-8 transition-colors duration-300 hover:border-accent"
            >
              <div className="font-mono text-xs uppercase tracking-wider text-accent font-medium">
                {step.tag}
              </div>

              <h3 className="text-2xl sm:text-3xl font-editorial-serif text-foreground leading-snug">
                {step.title}
              </h3>

              <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed">
                {step.body}
              </p>

              {step.extra && <div className="pt-2">{step.extra}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
