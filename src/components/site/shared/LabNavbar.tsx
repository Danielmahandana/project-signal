import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Research", href: "/research" },
  { label: "Systems", href: "/systems" },
  { label: "Blog", href: "/blog" },
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
    setMobileMenuOpen(false);
  }, [currentPath]);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            to="/"
            className="font-mono text-xs tracking-wider uppercase font-semibold text-foreground hover:opacity-75 transition-opacity"
          >
            Capability Compass
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 font-mono text-xs">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`transition-colors py-1 ${
                    isActive
                      ? "text-foreground font-semibold border-b border-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4 font-mono text-xs">
            <a
              href="https://github.com/Danielmahandana/capability-compass"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-block text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub &rarr;
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            >
              {isDark ? "Light" : "Dark"}
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-xs text-foreground cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border/60 bg-background px-6 py-6 space-y-4 font-mono text-sm">
          <div className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-foreground hover:text-[#10A37F] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://github.com/Danielmahandana/capability-compass"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground pt-2 border-t border-border/40"
            >
              GitHub Repository &rarr;
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
