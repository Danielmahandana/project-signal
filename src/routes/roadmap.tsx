import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, Ascii, StatusTag } from "@/components/site/Section";
import { NextPage } from "@/components/site/SiteChrome";
import { AdaptiveSelector } from "@/components/site/AdaptiveSelector";
import { ResearchLoop } from "@/components/site/ResearchLoop";

export const Route = createFileRoute("/roadmap")({
  head: () => ({ meta: [{ title: "Roadmap — Project Signal" }] }),
  component: RoadmapPage,
});

function RoadmapPage() {
  return (
    <>
      <PageHeader
        eyebrow="15–16 / 23–25 — Roadmap"
        title="Ask the next most informative question."
        lede="The roadmap moves from a fixed sequence of tasks toward an engine that knows what it knows, sees what remains uncertain, and chooses the next useful observation."
      />
      <Section number="15" title="From fixed tests to adaptive assessment">
        <Ascii>{`Current evidence
       │
       ▼
What do we know?
       │
       ▼
What remains uncertain?
       │
       ▼
Which task is most informative?
       │
       ▼
Next observation`}</Ascii>
        <AdaptiveSelector />
        <p>
          The objective is not simply to administer more questions. It is to select the observation
          expected to reduce uncertainty most. <StatusTag kind="hypothesised" />
        </p>
      </Section>
      <Section number="16" title="The long-term engine">
        <div className="grid gap-2 text-sm sm:grid-cols-2">
          {[
            "Baseline",
            "Bayesian model",
            "Uncertainty",
            "Evidence weighting",
            "Difficulty modelling",
            "Adaptive selection",
            "Information gain",
            "Cognitive engine",
          ].map((stage, i) => (
            <div key={stage} className="flex items-center gap-3 border-b border-border py-3">
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              <span>{stage}</span>
            </div>
          ))}
        </div>
        <p className="mt-6">
          Each stage should be validated before the next is introduced. The smallest useful
          experiment is more valuable than the biggest untested model.
        </p>
      </Section>
      <Section
        number="23"
        title="The research loop"
        lede="A continuously running practice of hypothesis, prototype, test, observation, evaluation and refinement."
      >
        <ResearchLoop />
        <p>
          The lab operates as an iterative system. We are building the smallest system that teaches
          us something, then letting what we learn choose the next experiment.
        </p>
      </Section>
      <Section number="24–25" title="Validation">
        <p>The central comparison is:</p>
        <Ascii>{`CV-only profile
       vs
CV + cognitive evidence`}</Ascii>
        <p>
          We need to investigate whether additional evidence produces a more useful profile, whether
          adaptive testing reduces assessment length without reducing information, and whether
          capabilities predict meaningful outcomes. <StatusTag kind="unknown" />
        </p>
      </Section>
      <NextPage to="/status" label="20 — Status & Unknowns" />
    </>
  );
}
