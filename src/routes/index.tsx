import { createFileRoute, Link } from "@tanstack/react-router";
import { ScrollAnimusCanvas } from "@/components/site/shared/ScrollAnimusCanvas";
import { LAB_NOTES } from "@/lib/researchData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Capability Compass — Research Laboratory" },
      {
        name: "description",
        content:
          "We build systems to understand how people learn, work, and adapt. Research in probabilistic capability inference, skills intelligence, and human capability.",
      },
      { property: "og:title", content: "Capability Compass — Research Laboratory" },
    ],
  }),
  component: HomePage,
});

interface FeaturedProjectCard {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  hook: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
}

const FEATURED_PROJECTS: FeaturedProjectCard[] = [
  {
    id: "proj-1",
    slug: "capability-inference",
    number: "01",
    title: "Capability Inference",
    category: "AI Systems &middot; Probabilistic Modelling",
    hook: "Moving from static score reductionism to continuous Bayesian belief states that track epistemic uncertainty under sparse evidence.",
    imageSrc: "/header-brain.jpeg",
    imageAlt: "Neural topology and latent manifold inference visualization",
    link: "/research/capability-inference",
  },
  {
    id: "proj-2",
    slug: "skills-intelligence",
    number: "02",
    title: "Skills Intelligence",
    category: "Data Topologies &middot; NLP",
    hook: "Extracting authenticated vocational competencies from unstructured resumes and projecting them onto ESCO and OFO occupational graphs.",
    imageSrc: "/footer-butterfly.jpeg",
    imageAlt: "Topological emergence of skills and competency graphs",
    link: "/research/skills-intelligence",
  },
  {
    id: "proj-3",
    slug: "cognitive-assessment",
    number: "03",
    title: "Cognitive Assessment Engine",
    category: "Human Capability &middot; Psychometrics",
    hook: "Adaptive computerized testing via maximum Fisher information gain, converging to narrow capability bounds in 42% fewer observations.",
    imageSrc: "/header-brain.jpeg",
    imageAlt: "Cognitive architecture and adaptive item routing",
    link: "/research/cognitive-assessment",
  },
];

function HomePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* =========================================================================
          HERO SECTION (OpenAI Style: Pure Typography + Scroll-Reactive Animus)
          ========================================================================= */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 pb-24 sm:pb-36 border-b border-border/40 overflow-hidden">
        {/* Scroll-Reactive Animus Generative Wave Canvas */}
        <div className="absolute inset-0 z-0 opacity-45 dark:opacity-35 pointer-events-none">
          <ScrollAnimusCanvas className="w-full h-full" intensity={1.2} />
        </div>

        <div className="relative z-10 max-w-4xl space-y-8">
          {/* Subtle Live Research Status */}
          <div className="font-mono text-xs text-muted-foreground flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10A37F]" />
            <span className="uppercase tracking-widest text-foreground">Open Research Lab</span>
            <span>&middot;</span>
            <span>September 2026</span>
          </div>

          {/* Primary Statement */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08] font-sans">
            We build systems to understand how people learn, work, and adapt.
          </h1>

          <p className="text-lg sm:text-2xl text-muted-foreground font-normal leading-relaxed max-w-2xl font-sans">
            A research and engineering team exploring online Bayesian inference, structured competency topologies, and adaptive cognitive instruments.
          </p>

          <div className="pt-4 flex items-center space-x-6 font-mono text-xs">
            <Link
              to="/research"
              className="text-foreground hover:text-[#10A37F] transition-colors"
            >
              Explore research &rarr;
            </Link>
            <Link
              to="/blog"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Read our dispatches &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PROJECTS SECTION (Vertically Scrollable Editorial Cards)
          ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 border-b border-border/40">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-16 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block mb-2">
              Featured Research
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
              Selected Investigations
            </h2>
          </div>
          <Link
            to="/research"
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            All research &rarr;
          </Link>
        </div>

        {/* Vertically Stacked Editorial Cards */}
        <div className="space-y-24 sm:space-y-32">
          {FEATURED_PROJECTS.map((project) => (
            <Link
              key={project.id}
              to={project.link}
              className="group block space-y-6 cursor-pointer"
            >
              {/* Card Image Cover with subtle zoom on hover */}
              <div className="relative w-full h-72 sm:h-96 md:h-[480px] overflow-hidden rounded-sm bg-surface">
                <img
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-500" />
              </div>

              {/* Card Typographic Details (Clean, no boxes) */}
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center space-x-3 font-mono text-xs text-muted-foreground">
                  <span className="text-foreground font-semibold">{project.number}</span>
                  <span>&middot;</span>
                  <span dangerouslySetInnerHTML={{ __html: project.category }} />
                </div>

                <h3 className="text-2xl sm:text-4xl font-bold font-sans tracking-tight text-foreground group-hover:text-[#10A37F] transition-colors">
                  {project.title}
                </h3>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-sans">
                  {project.hook}
                </p>

                <div className="pt-2">
                  <span className="openai-link font-mono text-xs group-hover:text-[#10A37F]">
                    Read research &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          LATEST BLOG & DISPATCHES SECTION (OpenAI Style Minimal List)
          ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 border-b border-border/40">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-16 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block mb-2">
              Writing &amp; Thinking
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
              Latest Dispatches
            </h2>
          </div>
          <Link
            to="/blog"
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View all dispatches &rarr;
          </Link>
        </div>

        <div className="divide-y divide-border/40 border-t border-b border-border/40">
          {LAB_NOTES.slice(0, 3).map((note) => (
            <Link
              key={note.id}
              to="/blog"
              className="py-8 group block space-y-2 hover:opacity-85 transition-opacity"
            >
              <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span>{note.formattedDate}</span>
                <span className="text-[0.68rem] uppercase tracking-wider">{note.tags[0]}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-sans text-foreground group-hover:text-[#10A37F] transition-colors tracking-tight">
                {note.title}
              </h3>

              <p className="text-sm sm:text-base text-muted-foreground font-sans line-clamp-2 max-w-2xl">
                {note.excerpt}
              </p>

              <div className="pt-1">
                <span className="openai-link font-mono text-xs group-hover:text-[#10A37F]">
                  Read article &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          MISSION STATEMENT (OpenAI Pure Editorial Rhythm)
          ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-3xl space-y-6">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            About the lab
          </span>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground font-sans">
            We build to understand.
          </h2>

          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed font-sans">
            We test our mathematical hypotheses not on synthetic vacuum scenarios, but against the noisy, non-stationary friction of real-world vocational education, technical trades, and emerging workforce dynamics.
          </p>

          <div className="pt-2 font-mono text-xs">
            <Link
              to="/about"
              className="text-foreground hover:text-[#10A37F] transition-colors"
            >
              Learn about our methodology and principles &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
