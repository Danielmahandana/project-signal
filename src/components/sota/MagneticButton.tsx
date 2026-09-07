import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";

interface MagneticButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "link";
  showArrow?: boolean;
  arrowDirection?: "right" | "up-right";
}

export function MagneticButton({
  children,
  to,
  href,
  onClick,
  className = "",
  variant = "primary",
  showArrow = true,
  arrowDirection = "right",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Calculate distance and bound movement to max 6px
    const distanceX = (e.clientX - centerX) * 0.18;
    const distanceY = (e.clientY - centerY) * 0.18;
    const maxDist = 6;
    const clampedX = Math.max(-maxDist, Math.min(maxDist, distanceX));
    const clampedY = Math.max(-maxDist, Math.min(maxDist, distanceY));
    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "group inline-flex items-center gap-2.5 font-mono text-xs tracking-wide transition-all duration-300 select-none cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent";

  const variantStyles = {
    primary:
      "px-5 py-2.5 rounded bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
    secondary:
      "px-4 py-2 rounded bg-surface border border-border text-foreground hover:border-foreground/40",
    ghost:
      "px-3 py-1.5 rounded text-foreground hover:text-accent hover:bg-surface/50",
    link: "py-1 text-foreground border-b border-border/80 hover:border-accent hover:text-accent",
  }[variant];

  const content = (
    <span className="inline-flex items-center gap-2">
      <span>{children}</span>
      {showArrow && (
        <span
          className={`inline-block transition-transform duration-300 ${
            arrowDirection === "up-right"
              ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              : "group-hover:translate-x-1"
          }`}
          aria-hidden="true"
        >
          {arrowDirection === "up-right" ? "↗" : "→"}
        </span>
      )}
    </span>
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="inline-block"
    >
      {to ? (
        <Link to={to} className={`${baseStyles} ${variantStyles} ${className}`}>
          {content}
        </Link>
      ) : href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={`${baseStyles} ${variantStyles} ${className}`}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={`${baseStyles} ${variantStyles} ${className}`}
        >
          {content}
        </button>
      )}
    </div>
  );
}
