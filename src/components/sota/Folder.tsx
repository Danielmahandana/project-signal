import { useState, type ReactNode } from "react";

export interface FolderProps {
  size?: number;
  color?: string;
  label: string;
  category?: string;
  count?: number | string;
  items?: ReactNode[];
  onClick?: () => void;
  className?: string;
}

export function Folder({
  size = 1.1,
  color = "#181a1f",
  label,
  category,
  count,
  items = [],
  onClick,
  className = "",
}: FolderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col items-center cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-2 transition-transform duration-300 ${className}`}
      style={{
        transform: `scale(${size})`,
        transformOrigin: "center top",
      }}
    >
      {/* 3D Folder Container with Perspective */}
      <div
        className="relative w-44 h-32"
        style={{ perspective: "700px" }}
      >
        {/* Back Folder Tab */}
        <div
          className="absolute -top-3 left-2 w-16 h-4 rounded-t-md transition-colors duration-300 shadow-sm"
          style={{ backgroundColor: color }}
        />

        {/* Back Folder Body */}
        <div
          className="absolute inset-0 rounded-lg shadow-sm transition-colors duration-300 border border-black/10 dark:border-white/10"
          style={{ backgroundColor: color }}
        />

        {/* Folder Internal Stacked Papers / Items */}
        <div className="absolute inset-x-2 bottom-2 h-24 flex items-end justify-center pointer-events-none">
          {items.map((item, idx) => {
            // Stagger position and rotation for stacked papers effect
            const offset = (idx - (items.length - 1) / 2) * 12;
            const rotation = (idx - (items.length - 1) / 2) * 4;
            const liftY = isHovered ? -24 - idx * 6 : 0;

            return (
              <div
                key={idx}
                className="absolute w-36 h-22 rounded bg-white dark:bg-zinc-800 border border-border/70 shadow-md overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: `translateX(${offset}px) translateY(${liftY}px) rotate(${rotation}deg)`,
                  zIndex: idx + 2,
                  boxShadow: isHovered
                    ? "0 10px 25px -5px rgba(0, 0, 0, 0.25)"
                    : "0 2px 6px -1px rgba(0, 0, 0, 0.15)",
                }}
              >
                {item}
              </div>
            );
          })}
        </div>

        {/* Front Folder Flap (Tilts open on hover) */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 rounded-b-lg border-t border-white/20 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom shadow-lg"
          style={{
            backgroundColor: color,
            transform: isHovered ? "rotateX(-34deg)" : "rotateX(0deg)",
            zIndex: 10,
          }}
        >
          {/* Subtle flap highlight gradient */}
          <div className="absolute inset-0 rounded-b-lg bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

          {/* Folder Front Branding / Label Marker */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90 font-mono text-[0.68rem]">
            <span className="truncate uppercase tracking-wider font-medium">
              {label}
            </span>
            {count !== undefined && (
              <span className="opacity-70 px-1.5 py-0.5 rounded-full bg-white/10 text-[0.6rem]">
                {count}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Caption / Metadata under Folder */}
      <div className="mt-3 text-center space-y-0.5 max-w-[12rem]">
        <h4 className="font-sans text-xs font-semibold text-foreground group-hover:text-accent transition-colors truncate">
          {label}
        </h4>
        {category && (
          <p className="font-mono text-[0.65rem] text-muted-foreground uppercase tracking-wider">
            {category}
          </p>
        )}
      </div>
    </div>
  );
}
