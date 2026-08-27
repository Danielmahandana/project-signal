import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, Ascii } from "@/components/site/Section";
import { NextPage } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "The Research — Cognitive Engine Research" },
      {
        name: "description",
        content:
          "Can we build a better representation of what a person can do? The research question and the hypothesis behind combining reported and observed evidence.",
      },
      { property: "og:title", content: "The Research — Cognitive Engine Research" },
      {
        property: "og:description",
        content: "The question and hypothesis behind reported versus observed evidence.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="01 — The Research"
        title="Can we build a better representation of what a person can do?"
        lede="The goal is not a test that declares what someone is capable of. The goal is a system that keeps asking what evidence we have — and what evidence we are still missing."
      />

      <Section number="01" title="Why a written history is not enough">
        <p>
          A CV tells us what someone has done. It does not necessarily tell us what they can do. Job
          titles are inconsistent. Skills are described differently across industries. Experience is
          difficult to compare across contexts.
        </p>
        <p>
          We are exploring whether a more useful representation can be built by combining reported
          experience with observed behaviour.
        </p>
        <blockquote className="border-l-2 border-signal-red pl-5 text-lg">
          What evidence do we have about this person's capabilities — and what evidence are we still
          missing?
        </blockquote>
      </Section>

      <Section
        number="02"
        title="The hypothesis"
        lede="A profile should be built from evidence, not declarations."
      >
        <p>The current platform begins with a user's existing information.</p>
        <Ascii>{`CV
Experience
Projects
Education
Skills
        │
        ▼
   Skill Extraction
        │
        ▼
   Skill Mapping
        │
        ▼
 Capability Profile`}</Ascii>
        <p>
          This provides an initial representation, but it has a fundamental limitation: the system
          is largely dependent on what the individual has reported. We therefore introduce another
          source of evidence.
        </p>
        <Ascii>{`                    PERSON
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
        REPORTED             OBSERVED
         EVIDENCE             EVIDENCE
             │                   │
             └─────────┬─────────┘
                       ▼
                CAPABILITY MODEL`}</Ascii>
        <p className="text-lg font-semibold text-foreground">
          Can observed behaviour improve the calibration of a skills profile?
        </p>
      </Section>

      <NextPage to="/engine" label="03 — The Cognitive Engine" />
    </>
  );
}
