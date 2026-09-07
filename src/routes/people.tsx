import { createFileRoute } from "@tanstack/react-router";
import { TEAM_MEMBERS, TeamMember } from "@/lib/researchData";

export const Route = createFileRoute("/people")({
  head: () => ({
    meta: [
      { title: "People & Contributors — Capability Compass Lab" },
      {
        name: "description",
        content:
          "Researchers, engineers, and practitioners working across data systems, probabilistic AI, and human capability measurement.",
      },
      { property: "og:title", content: "People & Contributors — Capability Compass Lab" },
    ],
  }),
  component: PeoplePage,
});

function PeoplePage() {
  const disciplines: Array<TeamMember["discipline"]> = ["RESEARCH", "ENGINEERING", "DATA"];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Header */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-16 sm:pt-24 pb-10 border-b border-border/40">
        <div className="max-w-3xl space-y-4">
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Researchers &amp; Practitioners
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground font-sans">
            People
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-sans">
            Researchers, engineers, and practitioners working across probabilistic AI, data topologies, and human capability.
          </p>
        </div>
      </section>

      {/* Roster grouped by discipline (Unboxed, Pure Hairline Dividers) */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-16 space-y-20">
        {disciplines.map((discipline) => {
          const members = TEAM_MEMBERS.filter((m) => m.discipline === discipline);
          if (members.length === 0) return null;

          return (
            <section key={discipline} className="space-y-6">
              <div className="border-b border-border/40 pb-2 font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {discipline}
              </div>

              <div className="divide-y divide-border/40">
                {members.map((member, idx) => (
                  <div key={idx} className="py-8 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h2 className="text-2xl sm:text-3xl font-bold font-sans text-foreground">
                        {member.name}
                      </h2>
                      <span className="font-mono text-xs text-[#10A37F]">
                        {member.role}
                      </span>
                    </div>

                    <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-3xl">
                      {member.bio}
                    </p>

                    <div className="pt-2 font-mono text-xs text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="uppercase tracking-wider">Focus:</span>
                      <span>{member.researchInterests.join(" · ")}</span>
                    </div>

                    {/* Links */}
                    <div className="flex items-center space-x-4 pt-2 font-mono text-xs text-muted-foreground">
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-foreground"
                        >
                          GitHub &rarr;
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-foreground"
                        >
                          LinkedIn &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Collaboration Statement */}
        <section className="pt-10 border-t border-border/40 font-sans text-sm text-muted-foreground space-y-2 max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-wider text-foreground font-semibold">
            Inquiries &amp; Collaboration
          </div>
          <p leading-relaxed>
            We collaborate with academic research groups, technical colleges, national qualifications authorities, and engineers working on Bayesian filtering and workforce analytics.
          </p>
        </section>
      </main>
    </div>
  );
}
