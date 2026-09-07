import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  speed?: number;
  enableTilt?: boolean;
  zoomOnHover?: boolean;
  cursorText?: string;
  children?: ReactNode;
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  speed = 0.08,
  enableTilt = false,
  zoomOnHover = true,
  cursorText = "VIEW",
  children,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          // Calculate how far the image is from the viewport center
          const distanceFromCenter = rect.top + rect.height / 2 - windowHeight / 2;
          setOffsetY(distanceFromCenter * speed);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({
      rotateX: -y * 8, // Max 4 deg tilt
      rotateY: x * 8,
    });
  };

  const handleMouseLeave = () => {
    if (enableTilt) {
      setTilt({ rotateX: 0, rotateY: 0 });
    }
  };

  return (
    <div
      ref={containerRef}
      data-cursor={cursorText}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden bg-surface select-none ${containerClassName}`}
      style={{
        perspective: enableTilt ? "1000px" : undefined,
      }}
    >
      <div
        className="w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: enableTilt
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
            : undefined,
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`w-full h-full object-cover object-center ${
            zoomOnHover
              ? "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              : ""
          } ${className}`}
          style={{
            transform: `translate3d(0, ${offsetY}px, 0) scale(${zoomOnHover ? 1.06 : 1.04})`,
            willChange: "transform",
          }}
        />

        {/* Subtle photographic vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

        {/* Optional overlay content / metadata */}
        {children && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
