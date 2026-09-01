import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const chapters = [
  { id: "chapter-01", number: "01", label: "Foundations" },
  { id: "chapter-02", number: "02", label: "EMA vs Bayesian" },
  { id: "chapter-03", number: "03", label: "Experiments" },
  { id: "chapter-04", number: "04", label: "Adaptive Loop" },
] as const;

export function ResearchChrome() {
  const [activeChapter, setActiveChapter] = useState<string>("chapter-01");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isDark, setIsDark] = useState<boolean>(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("signal-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("signal-theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("signal-theme", "dark");
      setIsDark(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);

      for (const chapter of [...chapters].reverse()) {
        const el = document.getElementById(chapter.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveChapter(chapter.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border transition-colors duration-200">
      <div className="mx-auto max-w-5xl px-3 sm:px-6">
        <div className="flex h-12 items-center justify-between gap-2 sm:gap-4">
          {/* Brand Mark */}
          <a
            href="#chapter-01"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("chapter-01");
            }}
            className="flex items-center gap-1.5 group cursor-pointer shrink-0"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
            <span className="font-mono text-[0.7rem] sm:text-[0.72rem] font-semibold tracking-wider text-foreground">
              PROJECT SIGNAL
            </span>
          </a>

          {/* Chapter Navigation (Mobile optimized with overflow scroll or compact pills) */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-1">
            <nav className="flex items-center gap-1 font-mono text-[0.65rem] sm:text-[0.68rem]">
              {chapters.map((ch) => {
                const isActive = activeChapter === ch.id;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => scrollToSection(ch.id)}
                    className={`px-2 sm:px-2.5 py-1 rounded transition-all cursor-pointer whitespace-nowrap touch-manipulation ${
                      isActive
                        ? "bg-foreground text-background font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-surface"
                    }`}
                  >
                    <span>{ch.number}</span>
                    <span className="hidden md:inline ml-1 font-normal opacity-90">{ch.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Dark Mode Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle dark mode"
              className="ml-1 p-1.5 rounded border border-border text-muted-foreground hover:text-foreground hover:bg-surface transition-colors cursor-pointer touch-manipulation"
            >
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 1px Reading Progress Bar */}
      <div className="h-[1px] w-full bg-border/40">
        <div
          className="h-full bg-foreground transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
