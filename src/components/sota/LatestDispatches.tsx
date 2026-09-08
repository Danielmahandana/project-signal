import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

interface DispatchItem {
  id: string;
  category: string;
  date: string;
  title: string;
  description: string;
  linkTo: string;
}

const LATEST_ITEMS: DispatchItem[] = [
  {
    id: "dispatch-01",
    category: "Technical Dispatch",
    date: "Sep 2026",
    title: "Why conventional skill taxonomies break under sparse evidence",
    description:
      "When competency systems rely on keyword extraction without posterior uncertainty bounds, false certainty propagates across hiring manifolds.",
    linkTo: "/blog",
  },
  {
    id: "pub-01",
    category: "Working Paper · PS-TR-01",
    date: "Aug 2026",
    title: "Probabilistic Modelling of Latent Human Capability from Sparse Observation Streams",
    description:
      "Beta-Binomial conjugate dynamics with temporal drift compensation for tracking practitioner competence in high-friction labor markets.",
    linkTo: "/research/capability-inference",
  },
  {
    id: "pub-02",
    category: "Technical Report · PS-CAT-01",
    date: "Jul 2026",
    title: "Adaptive Measurement via Maximum Information-Gain Item Routing",
    description:
      "Computerized adaptive testing engine that minimizes assessment burden by 42% while tightening posterior variance.",
    linkTo: "/research/cognitive-assessment",
  },
];

export function LatestDispatches() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-b border-border/40">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center space-x-2 font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Publications &amp; Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium tracking-[-0.035em] text-foreground leading-tight">
            Latest Dispatches
          </h2>
        </div>

        <Link
          to="/blog"
          className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 pb-1"
        >
          <span>All publications &amp; notes</span>
          <span>&rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {LATEST_ITEMS.map((item) => (
          <Link
            key={item.id}
            to={item.linkTo}
            className="group block p-7 sm:p-8 rounded-[20px] bg-surface/40 border border-border/50 hover:border-foreground/30 hover:bg-surface/70 transition-all duration-300 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between font-mono text-[0.7rem] text-muted-foreground">
                <span className="text-accent font-semibold uppercase tracking-wider">
                  {item.category}
                </span>
                <span>{item.date}</span>
              </div>

              <h3 className="text-xl font-sans font-medium tracking-tight text-foreground group-hover:text-accent transition-colors leading-snug">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed line-clamp-3">
                {item.description}
              </p>
            </div>

            <div className="pt-2 font-mono text-xs text-foreground font-semibold inline-flex items-center gap-1.5 group-hover:text-accent transition-colors">
              <span>Read entry</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
