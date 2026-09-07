import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { GooeyNav, GooeyNavItem } from "@/components/sota/GooeyNav";

const NAV_ITEMS: GooeyNavItem[] = [
  { label: "Research", href: "/research" },
  { label: "Systems", href: "/systems" },
  { label: "Dispatches", href: "/blog" },
  { label: "Publications", href: "/publications" },
  { label: "People", href: "/people" },
  { label: "About", href: "/about" },
];

export function LabNavbar() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("sota-theme");
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
      localStorage.setItem("sota-theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("sota-theme", "dark");
      setIsDark(true);
    }
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/40 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Wordmark: THE SOTA LAB */}
          <Link
            to="/"
            className="group flex items-center space-x-2.5 outline-none focus-visible:ring-1 focus-visible:ring-accent rounded p-1"
          >
            <span className="w-2 h-2 rounded-full bg-accent group-hover:scale-125 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="font-mono text-xs tracking-[0.18em] uppercase font-bold text-foreground">
                THE SOTA LAB
              </span>
              <span className="font-mono text-[0.58rem] tracking-widest uppercase text-muted-foreground -mt-0.5">
                State of the Art
              </span>
            </div>
          </Link>

          {/* Desktop Gooey Navigation */}
          <div className="hidden md:block">
            <GooeyNav items={NAV_ITEMS} />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 font-mono text-xs">
            <a
              href="https://github.com/Danielmahandana/capability-compass"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Code</span>
              <span className="text-[0.65rem]">&rarr;</span>
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="px-2.5 py-1 rounded-full border border-border/60 text-[0.68rem] tracking-wider uppercase text-muted-foreground hover:text-foreground hover:border-foreground/30 cursor-pointer transition-colors"
            >
              {isDark ? "Light" : "Dark"}
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-xs font-mono uppercase tracking-wider text-foreground cursor-pointer px-2 py-1 rounded border border-border/60"
              aria-label="Menu"
            >
              {mobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border/60 bg-background/95 backdrop-blur-lg px-6 py-6 space-y-4 font-mono text-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-foreground hover:text-accent transition-colors py-1.5 border-b border-border/20 uppercase tracking-wider text-xs"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://github.com/Danielmahandana/capability-compass"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground pt-3 text-xs uppercase tracking-wider"
            >
              GitHub Repository &rarr;
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
