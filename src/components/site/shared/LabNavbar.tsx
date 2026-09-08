import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Projects", href: "/systems" },
  { label: "Research", href: "/research" },
  { label: "Insights", href: "/blog" },
  { label: "About", href: "/about" },
];

export function LabNavbar() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
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

  // Listen to scroll for backdrop blur elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b border-border/40 shadow-xs"
            : "bg-background/60 backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 sm:h-18 items-center justify-between">
            {/* Left: Brand / Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="group flex items-center space-x-2.5 outline-none focus-visible:ring-1 focus-visible:ring-accent rounded p-1"
              >
                <span className="w-2 h-2 rounded-full bg-accent group-hover:scale-125 transition-transform duration-300" />
                <div className="flex flex-col">
                  <span className="font-mono text-xs tracking-[0.18em] uppercase font-bold text-foreground">
                    THE SOTA LAB
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav
              aria-label="Primary Navigation"
              className="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2"
            >
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/" ? currentPath === "/" : currentPath.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`font-sans text-xs tracking-wide uppercase transition-colors duration-200 ${
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

            {/* Right: Actions (CTA, Theme Toggle, Mobile Trigger) */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link
                to="/systems"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-foreground text-background hover:bg-foreground/90 font-mono text-[0.7rem] uppercase tracking-wider font-semibold transition-transform duration-200 hover:scale-[1.02] active:scale-95"
              >
                <span>Interactive Lab</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="px-2.5 py-1 rounded-full border border-border/60 text-[0.68rem] font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground hover:border-foreground/30 cursor-pointer transition-colors"
              >
                {isDark ? "Light" : "Dark"}
              </button>

              {/* Mobile hamburger trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-full border border-border/60 text-foreground cursor-pointer"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Clean Full-Screen Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-border/40 pb-5">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2.5"
            >
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-mono text-xs tracking-widest uppercase font-bold text-foreground">
                THE SOTA LAB
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation"
              className="p-2 rounded-full border border-border/60 text-foreground cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 my-auto py-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-foreground hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/systems"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 text-xl font-mono uppercase tracking-wider text-accent pt-4"
            >
              <span>Explore Interactive Lab</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </nav>

          <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
            <div>
              <span>LAT: 26.2041° S &middot; LON: 28.0473° E</span>
            </div>
            <a
              href="https://github.com/Danielmahandana/capability-compass"
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:text-accent transition-colors"
            >
              GitHub Repository &rarr;
            </a>
          </div>
        </div>
      )}
    </>
  );
}
