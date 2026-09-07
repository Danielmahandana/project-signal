import { useRef, useState, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";

interface CutoutCompositionProps {
  backgroundImage: string;
  foregroundImage: string;
  badge?: string;
  title: string;
  subtitle: string;
  linkTo?: string;
  className?: string;
}

export function CutoutComposition({
  backgroundImage,
  foregroundImage,
  badge = "INVESTIGATION · 01",
  title,
  subtitle,
  linkTo,
  className = "",
}: CutoutCompositionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layers, setLayers] = useState({
    bgX: 0,
    bgY: 0,
    fgX: 0,
    fgY: 0,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const relX = (e.clientX - left) / width - 0.5;
    const relY = (e.clientY - top) / height - 0.5;

    // Background moves slower (0.85x), foreground moves faster (1.15x) for 3D depth
    setLayers({
      bgX: relX * -12,
      bgY: relY * -12,
      fgX: relX * 18,
      fgY: relY * 18,
    });
  };

  const handleMouseLeave = () => {
    setLayers({ bgX: 0, bgY: 0, fgX: 0, fgY: 0 });
  };

  const ContentWrapper = linkTo ? Link : "div";

  return (
    <ContentWrapper
      to={linkTo}
      ref={containerRef as any}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="EXPLORE"
      className={`group relative block w-full overflow-hidden rounded-md border border-border/60 bg-surface/80 select-none transition-shadow duration-500 hover:shadow-2xl ${className}`}
    >
      {/* Aspect ratio frame */}
      <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[560px] overflow-hidden">
        {/* Layer 1: Atmospheric Background Texture & Radial Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#111317] via-[#1a1d24] to-[#0d0f12] opacity-90" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1cd396_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Layer 2: Midground Environmental Photography (Parallax) */}
        <div
          className="absolute inset-[-5%] transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `translate3d(${layers.bgX}px, ${layers.bgY}px, 0) scale(1.05)`,
          }}
        >
          <img
            src={backgroundImage}
            alt="Environmental research setting"
            className="w-full h-full object-cover opacity-65 mix-blend-luminosity filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        {/* Layer 3: Foreground Editorial Subject (Cut-out depth) */}
        <div
          className="absolute right-4 sm:right-12 bottom-6 sm:bottom-12 w-56 sm:w-72 md:w-88 h-64 sm:h-80 md:h-96 pointer-events-none transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `translate3d(${layers.fgX}px, ${layers.fgY}px, 0)`,
          }}
        >
          <div className="relative w-full h-full">
            <img
              src={foregroundImage}
              alt="Subject cut-out visualization"
              className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
          </div>
        </div>

        {/* Layer 4: Scientific Metadata Framing */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white/70 font-mono text-[0.68rem] tracking-wider uppercase z-20 pointer-events-none">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>{badge}</span>
          </div>
          <div className="hidden sm:block opacity-60">
            LOC // 26.2041° S, 28.0473° E
          </div>
        </div>

        {/* Layer 5: Editorial Typography crossing visual boundaries */}
        <div className="absolute bottom-8 left-6 sm:left-10 max-w-xl z-20 space-y-3">
          <h3 className="text-white text-3xl sm:text-4xl lg:text-5xl font-editorial-serif leading-[1.05] tracking-tight group-hover:text-accent transition-colors duration-300 drop-shadow-md">
            {title}
          </h3>
          <p className="text-white/80 font-sans text-sm sm:text-base leading-relaxed line-clamp-2 max-w-md drop-shadow">
            {subtitle}
          </p>

          <div className="pt-2">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-white/90 group-hover:text-accent transition-colors">
              <span>Inspect investigation</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </span>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
