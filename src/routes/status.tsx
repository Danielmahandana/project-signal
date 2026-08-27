import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, StatusTag, Ascii } from "@/components/site/Section";
import { NextPage } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/status")({
  head: () => ({ meta: [{ title: "Status & Unknowns — Project Signal" }] }),
  component: StatusPage,
});

const unknowns = [
  "Whether three instruments are sufficient.",
  "Whether behavioural signals generalise across occupations.",
  "Whether response time improves inference or adds noise.",
  "Whether Bayesian inference outperforms the EMA.",
  "Whether adaptive testing reduces length without reducing information.",
  "Whether inferred capabilities predict meaningful outcomes.",
];

function StatusPage() {
  return (
    <>
      <PageHeader
        eyebrow="20–22 / 26 — Status & Unknowns"
        title="Evidence is not truth."
        lede="A credible research programme makes its uncertainty visible. This is the boundary between what exists, what has been observed, what is hypothesised and what still needs validation."
      />
      <Section number="20" title="The core research principle">
        <Ascii>{`Evidence → Inference → Uncertainty

Evidence ≠ Truth`}</Ascii>
        <p>
          A cognitive assessment produces observations. Observations inform estimates. Estimates
          have uncertainty. The system should never confuse measurement with truth.
        </p>
      </Section>
      <Section
        number="21"
        title="What exists today"
        lede="Built and observable across the current system."
      >
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            "CV ingestion",
            "Skill extraction",
            "Capability assessment",
            "Behavioural observations",
            "Baseline inference",
            "Profile generation",
            "Occupation recommendations",
            "API integration",
            "End-to-end execution",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between border-b border-border py-3 text-sm"
            >
              <span>{item}</span>
              <StatusTag kind="built" />
            </div>
          ))}
        </div>
      </Section>
      <Section
        number="22"
        title="What we do not know yet"
        lede="These are open research questions, not product claims."
      >
        <div className="space-y-3">
          {unknowns.map((item) => (
            <div key={item} className="flex gap-3 border-b border-border pb-3 text-sm">
              <StatusTag kind="unknown" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section
        number="26"
        title="The larger vision"
        lede="A living representation of capability, updated as new evidence arrives."
      >
        <Ascii>{`WHAT YOU'VE DONE       HOW YOU THINK
        │                       │
        ▼                       ▼
    EXPERIENCE              OBSERVATIONS
        │                       │
        ▼                       ▲
      SKILLS ───────► CAPABILITIES`}</Ascii>
        <p>
          A project, course, assessment, work sample or demonstrated behaviour can become another
          observation. The profile evolves with evidence and remains honest about what it cannot yet
          say.
        </p>
        <p className="text-lg font-semibold text-foreground">
          We're building instruments for measuring capability, and testing how much we can
          responsibly infer from the evidence they produce.
        </p>
        <StatusTag kind="hypothesised" />
      </Section>
      <NextPage to="/" label="Return to the overview" />
    </>
  );
}
