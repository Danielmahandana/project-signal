import { Link } from "@tanstack/react-router";

export function LabFooter() {
  return (
    <footer className="border-t border-border/40 bg-background text-foreground transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
          {/* Brand & Mission Statement */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-mono text-xs uppercase tracking-[0.16em] font-bold text-foreground">
                THE SOTA LAB
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm font-sans">
              Investigating online Bayesian capability inference, structured competency topologies,
              and adaptive cognitive instruments under real-world uncertainty.
            </p>
            <div className="text-xs font-mono text-muted-foreground/80 pt-2">
              Johannesburg &middot; Open Research &middot; 2026
            </div>
          </div>

          {/* Research & Systems Links */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-foreground uppercase tracking-wider font-semibold">
              Research &amp; Systems
            </div>
            <ul className="space-y-2.5 text-muted-foreground">
              <li>
                <Link to="/research" className="hover:text-foreground transition-colors">
                  Research Directory
                </Link>
              </li>
              <li>
                <Link
                  to="/research/capability-inference"
                  className="hover:text-foreground transition-colors"
                >
                  Capability Inference
                </Link>
              </li>
              <li>
                <Link
                  to="/research/skills-intelligence"
                  className="hover:text-foreground transition-colors"
                >
                  Skills Intelligence
                </Link>
              </li>
              <li>
                <Link to="/systems" className="hover:text-foreground transition-colors">
                  Interactive Models
                </Link>
              </li>
            </ul>
          </div>

          {/* Publications & Lab Links */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <div className="text-foreground uppercase tracking-wider font-semibold">
              Lab &amp; Dispatches
            </div>
            <ul className="space-y-2.5 text-muted-foreground">
              <li>
                <Link to="/publications" className="hover:text-foreground transition-colors">
                  Publications &amp; Citations
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-foreground transition-colors">
                  Technical Dispatches
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">
                  Principles &amp; Methodology
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Danielmahandana/capability-compass"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub Repository &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <div>
            <span>&copy; 2026 THE SOTA LAB &middot; Released under Open Research terms</span>
          </div>
          <div>
            <span>Question &rarr; Hypothesis &rarr; System &rarr; Evidence &rarr; Result</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
