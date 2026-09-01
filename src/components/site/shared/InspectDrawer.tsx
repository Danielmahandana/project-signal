import { useState, type ReactNode } from "react";
import { ChevronDown, Code2, Sparkles } from "lucide-react";

interface InspectDrawerProps {
  title?: string;
  badge?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function InspectDrawer({
  title = "Inspect Technical Derivation & Code",
  badge = "Layer 3: Technical",
  children,
  defaultOpen = false,
  className = "",
}: InspectDrawerProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`my-6 rounded-xl border border-border/80 bg-surface/60 transition-all ${
        isOpen ? "border-signal-blue/40 shadow-xs bg-surface/90" : "hover:border-border"
      } ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Code2 className="h-4 w-4 text-signal-blue shrink-0" />
          <span className="font-mono text-xs font-semibold text-foreground tracking-tight truncate">
            {title}
          </span>
          <span className="hidden sm:inline-block rounded border border-signal-blue/30 bg-signal-blue/10 px-1.5 py-0.5 font-mono text-[0.6rem] font-semibold text-signal-blue uppercase">
            {badge}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-[0.68rem] text-muted-foreground">
            {isOpen ? "Collapse" : "Inspect"}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
              isOpen ? "rotate-180 text-signal-blue" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-border/70 px-4 pt-4 pb-5 sm:px-6 sm:pb-6 text-sm text-foreground/90 space-y-4 animate-in fade-in-50 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

export function CodeSnippet({
  code,
  language = "python",
  title,
}: {
  code: string;
  language?: string;
  title?: string;
}) {
  return (
    <div className="rounded-lg border border-border/80 bg-background/80 overflow-hidden font-mono text-xs shadow-2xs">
      {title && (
        <div className="flex items-center justify-between border-b border-border/60 bg-surface/80 px-3.5 py-1.5 text-[0.68rem] text-muted-foreground">
          <span className="font-semibold text-foreground/80">{title}</span>
          <span className="uppercase text-[0.6rem]">{language}</span>
        </div>
      )}
      <pre className="p-3.5 overflow-x-auto text-[0.78rem] leading-relaxed text-foreground/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}
