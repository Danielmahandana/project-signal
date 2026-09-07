import { Link } from "@tanstack/react-router";
import { ParallaxImage } from "./ParallaxImage";
import { MagneticButton } from "./MagneticButton";
import { ScrollReveal } from "./ScrollReveal";

export interface ResearchStoryProps {
  number?: string;
  category: string;
  date?: string;
  title: string;
  description: string;
  author?: string;
  imageSrc: string;
  imageAlt: string;
  secondaryImageSrc?: string;
  linkTo: string;
  ctaText?: string;
  composition?: "image-left" | "image-right" | "full-width" | "overlay" | "split";
  className?: string;
}

export function ResearchStory({
  number,
  category,
  date = "2026",
  title,
  description,
  author,
  imageSrc,
  imageAlt,
  secondaryImageSrc,
  linkTo,
  ctaText = "Read research monograph",
  composition = "image-right",
  className = "",
}: ResearchStoryProps) {
  // 1. FULL-WIDTH COMPOSITION
  if (composition === "full-width") {
    return (
      <ScrollReveal variant="fade-up" className={`w-full ${className}`}>
        <article className="group relative block overflow-hidden rounded-md border border-border/50 bg-surface">
          <Link to={linkTo} className="block relative w-full h-80 sm:h-[480px] lg:h-[580px]">
            <ParallaxImage
              src={imageSrc}
              alt={imageAlt}
              containerClassName="w-full h-full"
              speed={0.06}
              zoomOnHover
              cursorText="READ"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

            <div className="absolute bottom-8 left-6 sm:left-12 right-6 sm:right-12 max-w-3xl space-y-3 text-white">
              <div className="flex items-center space-x-3 font-mono text-xs text-white/70">
                {number && <span className="font-semibold text-accent">{number}</span>}
                <span>&middot;</span>
                <span className="uppercase tracking-wider">{category}</span>
                <span>&middot;</span>
                <span>{date}</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-editorial-serif leading-[1.04] tracking-tight group-hover:text-accent transition-colors">
                {title}
              </h3>

              <p className="font-sans text-sm sm:text-base text-white/80 line-clamp-2 max-w-2xl leading-relaxed">
                {description}
              </p>

              <div className="pt-2">
                <span className="inline-flex items-center gap-2 font-mono text-xs text-white group-hover:text-accent transition-colors">
                  <span>{ctaText}</span>
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </span>
              </div>
            </div>
          </Link>
        </article>
      </ScrollReveal>
    );
  }

  // 2. OVERLAY COMPOSITION
  if (composition === "overlay") {
    return (
      <ScrollReveal variant="fade-up" className={`w-full ${className}`}>
        <article className="group relative rounded-md overflow-hidden border border-border/60 bg-surface">
          <div className="relative w-full h-[460px] sm:h-[520px]">
            <ParallaxImage
              src={imageSrc}
              alt={imageAlt}
              containerClassName="w-full h-full"
              speed={0.05}
              enableTilt
              cursorText="EXPLORE"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/40 to-transparent" />

            <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between text-white pointer-events-none">
              <div className="flex justify-between items-start font-mono text-xs text-white/70">
                <div className="flex items-center space-x-2">
                  {number && <span className="text-accent font-semibold">{number}</span>}
                  <span>/</span>
                  <span className="uppercase tracking-wider">{category}</span>
                </div>
                <span>{date}</span>
              </div>

              <div className="max-w-xl space-y-3 pointer-events-auto">
                <Link to={linkTo}>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif leading-tight group-hover:text-accent transition-colors">
                    {title}
                  </h3>
                </Link>
                <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed line-clamp-3">
                  {description}
                </p>
                {author && (
                  <div className="font-mono text-xs text-white/60 pt-1">
                    Lead: {author}
                  </div>
                )}
                <div className="pt-3">
                  <MagneticButton to={linkTo} variant="primary" showArrow>
                    {ctaText}
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </article>
      </ScrollReveal>
    );
  }

  // 3. SPLIT COMPOSITION
  if (composition === "split") {
    return (
      <ScrollReveal variant="fade-up" className={`w-full ${className}`}>
        <article className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-border/50 pt-12 pb-16">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-3 font-mono text-xs text-muted-foreground">
              {number && <span className="font-semibold text-foreground">{number}</span>}
              <span>&middot;</span>
              <span className="uppercase tracking-wider">{category}</span>
              <span>&middot;</span>
              <span>{date}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif tracking-tight text-foreground group-hover:text-accent transition-colors leading-[1.08]">
              <Link to={linkTo}>{title}</Link>
            </h3>

            <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>

            {author && (
              <div className="font-mono text-xs text-muted-foreground">
                Principal Investigator: {author}
              </div>
            )}

            <div className="pt-2">
              <MagneticButton to={linkTo} variant="secondary" showArrow>
                {ctaText}
              </MagneticButton>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="h-64 sm:h-80 rounded-md overflow-hidden bg-surface">
              <ParallaxImage
                src={imageSrc}
                alt={imageAlt}
                containerClassName="w-full h-full"
                speed={0.04}
                cursorText="VIEW"
              />
            </div>
            {secondaryImageSrc ? (
              <div className="h-64 sm:h-80 rounded-md overflow-hidden bg-surface mt-8">
                <ParallaxImage
                  src={secondaryImageSrc}
                  alt={`${imageAlt} secondary detail`}
                  containerClassName="w-full h-full"
                  speed={0.07}
                  cursorText="VIEW"
                />
              </div>
            ) : (
              <div className="h-64 sm:h-80 rounded-md bg-surface/60 border border-border/50 p-6 flex flex-col justify-between mt-8">
                <div className="font-mono text-[0.68rem] text-muted-foreground uppercase tracking-wider">
                  Mathematical Formalism
                </div>
                <div className="font-mono text-xs text-foreground/80 space-y-2">
                  <div>&theta; ~ Beta(&alpha;, &beta;)</div>
                  <div>P(&theta; | E) &prop; L(E | &theta;) &middot; P(&theta;)</div>
                  <div className="text-accent">&Delta;Fisher &ge; 42%</div>
                </div>
                <div className="font-mono text-[0.65rem] text-muted-foreground">
                  Empirical convergence &middot; 2026
                </div>
              </div>
            )}
          </div>
        </article>
      </ScrollReveal>
    );
  }

  // 4. ASYMMETRIC GRID: IMAGE-LEFT OR IMAGE-RIGHT
  const isImageLeft = composition === "image-left";

  return (
    <ScrollReveal variant="fade-up" className={`w-full ${className}`}>
      <article className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border-t border-border/40 py-12 sm:py-16">
        {/* Visual Column (Spans 7 columns for dominant imagery) */}
        <div
          className={`lg:col-span-7 ${
            isImageLeft ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <Link to={linkTo} className="block rounded-md overflow-hidden">
            <div className="relative w-full h-72 sm:h-96 md:h-[440px] bg-surface rounded-md overflow-hidden">
              <ParallaxImage
                src={imageSrc}
                alt={imageAlt}
                containerClassName="w-full h-full"
                speed={0.06}
                zoomOnHover
                cursorText="EXPLORE"
              />
            </div>
          </Link>
        </div>

        {/* Typographic Column (Spans 5 columns) */}
        <div
          className={`lg:col-span-5 space-y-4 ${
            isImageLeft ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="flex items-center space-x-3 font-mono text-xs text-muted-foreground">
            {number && <span className="font-semibold text-foreground">{number}</span>}
            <span>&middot;</span>
            <span className="uppercase tracking-wider">{category}</span>
            <span>&middot;</span>
            <span>{date}</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-editorial-serif leading-[1.08] tracking-tight text-foreground group-hover:text-accent transition-colors">
            <Link to={linkTo}>{title}</Link>
          </h3>

          <p className="font-sans text-base text-muted-foreground leading-relaxed">
            {description}
          </p>

          {author && (
            <div className="font-mono text-xs text-muted-foreground pt-1">
              Lead Author: {author}
            </div>
          )}

          <div className="pt-3">
            <MagneticButton to={linkTo} variant="link" showArrow>
              {ctaText}
            </MagneticButton>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}
