import { Link } from "@tanstack/react-router";

export function LabFooter() {
  return (
    <footer className="border-t border-border/40 bg-background text-foreground mt-32 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider font-semibold text-foreground">
              Capability Compass
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm font-sans">
              We build systems to understand how people learn, work, and adapt. Researching probabilistic capability inference, competency topologies, and adaptive cognitive instruments.
            </p>
            <div className="text-xs font-mono text-muted-foreground pt-2">
              Johannesburg &middot; Open Research &middot; 2026
            </div>
          </div>

          {/* Research Column */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <div className="text-foreground uppercase tracking-wider font-medium">Research</div>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/research" className="hover:text-foreground transition-colors">
                  Research Index
                </Link>
              </li>
              <li>
                <Link to="/research/capability-inference" className="hover:text-foreground transition-colors">
                  Capability Inference
                </Link>
              </li>
              <li>
                <Link to="/research/skills-intelligence" className="hover:text-foreground transition-colors">
                  Skills Intelligence
                </Link>
              </li>
              <li>
                <Link to="/research/cognitive-assessment" className="hover:text-foreground transition-colors">
                  Cognitive Assessment
                </Link>
              </li>
            </ul>
          </div>

          {/* Work Column */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <div className="text-foreground uppercase tracking-wider font-medium">Output</div>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/systems" className="hover:text-foreground transition-colors">
                  Systems &amp; Models
                </Link>
              </li>
              <li>
                <Link to="/publications" className="hover:text-foreground transition-colors">
                  Publications
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-foreground transition-colors">
                  Blog &amp; Dispatches
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Danielmahandana/capability-compass"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub &rarr;
                </a>
              </li>
            </ul>
          </div>

          {/* Lab Column */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <div className="text-foreground uppercase tracking-wider font-medium">Lab Philosophy</div>
            <p className="font-sans text-xs text-muted-foreground leading-relaxed">
              "The goal is not to predict with certainty. It is to become more informed with each observation."
            </p>
            <div className="pt-2">
              <Link to="/about" className="text-foreground hover:text-[#10A37F] transition-colors">
                About the team and principles &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Hairline Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <div>
            <span>&copy; 2026 Capability Compass &middot; Released under Open Research terms</span>
          </div>
          <div>
            <span>Question &rarr; Hypothesis &rarr; System &rarr; Evidence &rarr; Result</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
