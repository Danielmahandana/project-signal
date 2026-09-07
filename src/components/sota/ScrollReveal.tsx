import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: "fade-up" | "mask-reveal" | "clip-slide" | "fade" | "blur-in";
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 750,
  className = "",
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect user accessibility preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const getVariantStyles = () => {
    switch (variant) {
      case "fade-up":
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "translate3d(0, 0, 0)"
            : "translate3d(0, 32px, 0)",
          transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        };
      case "mask-reveal":
        return {
          opacity: isVisible ? 1 : 0,
          clipPath: isVisible
            ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
            : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          transform: isVisible ? "scale(1)" : "scale(1.04)",
          transition: `clip-path ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration + 200}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${duration / 2}ms ease-out`,
        };
      case "clip-slide":
        return {
          opacity: isVisible ? 1 : 0,
          clipPath: isVisible
            ? "inset(0 0 0 0)"
            : "inset(0 100% 0 0)",
          transition: `clip-path ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${duration / 2}ms ease-out`,
        };
      case "blur-in":
        return {
          opacity: isVisible ? 1 : 0,
          filter: isVisible ? "blur(0px)" : "blur(12px)",
          transform: isVisible ? "scale(1)" : "scale(0.98)",
          transition: `opacity ${duration}ms ease-out, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        };
      case "fade":
      default:
        return {
          opacity: isVisible ? 1 : 0,
          transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        };
    }
  };

  return (
    <div
      ref={ref}
      style={getVariantStyles()}
      className={`will-change-[opacity,transform] ${className}`}
    >
      {children}
    </div>
  );
}
