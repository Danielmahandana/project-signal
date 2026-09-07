import { useEffect, useRef, useState, useId } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

export interface GooeyNavItem {
  label: string;
  href: string;
}

interface GooeyNavProps {
  items: GooeyNavItem[];
  className?: string;
}

export function GooeyNav({ items, className = "" }: GooeyNavProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const navRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  const filterId = useId().replace(/:/g, "_");

  // Update indicator position whenever path changes or resize occurs
  useEffect(() => {
    const updatePosition = () => {
      if (!navRef.current) return;
      const activeElement = navRef.current.querySelector(
        '[data-active="true"]'
      ) as HTMLElement | null;

      if (activeElement) {
        const navRect = navRef.current.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();
        setIndicatorStyle({
          left: activeRect.left - navRect.left,
          width: activeRect.width,
          opacity: 1,
        });
      } else {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [currentPath]);

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* SVG Gooey Filter definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id={`gooey-${filterId}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <nav
        ref={navRef}
        aria-label="Primary"
        className="relative flex items-center p-1 rounded-full bg-surface/80 dark:bg-surface/50 border border-border/50 backdrop-blur-md transition-all duration-300"
      >
        {/* Gooey Liquid Pill Indicator */}
        <div
          className="absolute inset-y-1 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
            opacity: indicatorStyle.opacity,
          }}
        >
          <div
            className="w-full h-full rounded-full bg-foreground/10 dark:bg-foreground/15 transition-transform duration-300"
            style={{ filter: `url(#gooey-${filterId})` }}
          />
        </div>

        {/* Navigation Items */}
        {items.map((item) => {
          const isActive =
            item.href === "/"
              ? currentPath === "/"
              : currentPath.startsWith(item.href);

          return (
            <Link
              key={item.href}
              to={item.href}
              data-active={isActive}
              className={`relative z-10 px-3.5 py-1.5 font-mono text-[0.72rem] tracking-wider uppercase transition-colors duration-200 rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground ${
                isActive
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
