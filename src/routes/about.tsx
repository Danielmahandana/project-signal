import { createFileRoute, Link } from "@tanstack/react-router";
import { NOW_ENTRIES } from "@/lib/researchData";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Methodology — THE SOTA LAB" },
      {
        name: "description",
        content:
          "We build to understand. The research philosophy, principles, and ongoing roadmap of The Sota Lab.",
      },
      { property: "og:title", content: "About & Methodology — THE SOTA LAB" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const PRINCIPLES = [
    {
      number: "01",
      title: "Research first",
      statement: "What does this team investigate?",
      description:
        "We reject corporate agency jargon and 'welcome to our company' platitudes. We build systems to understand how people learn, work, and adapt — and we put the computational hypothesis upfront.",
    },
    {
      number: "02",
      title: "Projects are experiments, not portfolio cards",
      statement: "Question → Hypothesis → Investigation → System → Evidence → Result.",
      description:
        "Conventional portfolios reduce engineering to static screenshot cards with vague promotional bullet points. We treat every project as an empirical inquiry with explicit failure modes and reproducible evidence.",
    },
    {
      number: "03",
      title: "Make the work explorable",
      statement: "The website becomes an interface to the research itself.",
      description:
        "Visitors shouldn't just read about algorithms; they should experience the math. Our research pages embed active Bayesian updaters, interactive NLP parsers, and live simulator harnesses.",
    },
    {
      number: "04",
      title: "Extremely restrained visual language",
      statement: "The research itself becomes the visual material.",
      description:
        "No generic giant purple AI glows, dashboard clutter, or stock photography. We rely on strict typography, monospace data streams, and disciplined monochrome with a single intentional accent.",
    },
    {
      number: "05",
      title: "The Research → System → Impact loop",
      statement: "Closing the loop from theoretical formalisms to production realities.",
      description:
        "We test our models against the real-world friction of vocational accreditation, TVET curricula, and African labour-market signals where documentation is incomplete and noisy.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Header */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-16 sm:pt-24 pb-12 border-b border-border/40">
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center space-x-2 font-mono text-xs text-muted-foreground uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>THE SOTA LAB &middot; MISSION &amp; METHODOLOGY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial-serif tracking-tight text-foreground leading-[1.05]">
            We build to understand.
          </h1>

          <p className="text-lg sm:text-2xl text-muted-foreground leading-relaxed font-sans font-normal">
            We are a research and engineering laboratory investigating how computational systems can help us understand people, skills, and intelligent behavior under uncertainty.
          </p>

          <div className="flex items-center space-x-3 font-mono text-xs text-muted-foreground pt-2">
            <span>Research</span>
            <span>&middot;</span>
            <span>Engineering</span>
            <span>&middot;</span>
            <span>Experimentation</span>
            <span>&middot;</span>
            <span>Open Science</span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-16 space-y-24">
        {/* 01 Philosophy & Loop (Unboxed) */}
        <section className="space-y-6">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
            01 / Lab Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif tracking-tight text-foreground">
            The Continuous Inquiry Loop
          </h2>

          <div className="py-6 font-mono text-xs text-muted-foreground">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <span className="text-foreground font-semibold">Question</span>
              <span>&rarr;</span>
              <span>Hypothesis</span>
              <span>&rarr;</span>
              <span>System</span>
              <span>&rarr;</span>
              <span className="text-accent font-semibold">Evidence</span>
              <span>&rarr;</span>
              <span>Result</span>
              <span>&rarr;</span>
              <span className="text-foreground font-semibold">Next Question</span>
            </div>
          </div>

          <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Every system we engineer originates with an epistemological inquiry: Can we represent latent competence under uncertainty? Can NLP capture trade expertise without relying on corporate job titles? We build software as an experimental instrument to gather evidence and reveal the next question.
          </p>
        </section>

        {/* 02 Five Principles (Unboxed with hairline dividers) */}
        <section id="principles" className="space-y-8 pt-10 border-t border-border/40">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
            02 / Core Discipline
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif tracking-tight text-foreground">
            Five Research Principles
          </h2>

          <div className="divide-y divide-border/40 border-t border-b border-border/40">
            {PRINCIPLES.map((p) => (
              <div key={p.number} className="py-8 space-y-2 max-w-3xl">
                <div className="flex items-center space-x-2 font-mono text-xs">
                  <span className="font-bold text-accent">{p.number}</span>
                  <span className="text-muted-foreground">&middot;</span>
                  <span className="font-editorial-serif font-bold text-xl text-foreground">{p.title}</span>
                </div>

                <div className="font-sans text-sm text-foreground font-medium">
                  {p.statement}
                </div>

                <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 03 Real-world Context */}
        <section className="space-y-4 pt-10 border-t border-border/40 font-sans max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
            03 / Domain Context
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif text-foreground tracking-tight">
            Grounded in TVET and Developing Labour Markets
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Much of contemporary AI research in human capability is tuned exclusively for Silicon Valley software engineering roles. We deliberately ground our work in Technical and Vocational Education and Training (TVET) ecosystems and developing economies.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            In these environments, credentials are heterogeneous, occupational frameworks like the South African Organising Framework for Occupations (OFO) are constantly evolving, and informal experience must be translated into verifiable, standardized competencies.
          </p>
        </section>

        {/* 04 Now Section (Unboxed) */}
        <section id="now" className="space-y-6 pt-10 border-t border-border/40">
          <div className="flex items-baseline justify-between">
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                Active Exploration
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif tracking-tight text-foreground">
                Now &middot; September 2026
              </h2>
            </div>
            <span className="font-mono text-xs text-muted-foreground hidden sm:block">
              Updated weekly
            </span>
          </div>

          <div className="divide-y divide-border/40 border-t border-b border-border/40 font-mono text-xs">
            {NOW_ENTRIES.map((entry) => (
              <div key={entry.id} className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="font-bold text-foreground font-sans text-base">
                  {entry.number} &middot; {entry.title}
                </div>
                <div className="text-muted-foreground sm:text-right">
                  &rarr; {entry.status}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
