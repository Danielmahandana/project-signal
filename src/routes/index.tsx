import { createFileRoute, Link } from "@tanstack/react-router";
import { BlobMark } from "@/components/site/BlobMark";
import { Reveal } from "@/components/site/Reveal";
import { Section, Ascii, StatusTag } from "@/components/site/Section";
import { EvidenceFlow } from "@/components/site/EvidenceFlow";
import { NextPage } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Project Signal — Systems Engineering Team at Darkroom" },
      {
        name: "description",
        content:
          "A research programme into evidence, inference and human capability: combining what people have done with what they demonstrate.",
      },
      { property: "og:title", content: "Project Signal — Darkroom" },
      {
        property: "og:description",
        content: "A research programme into evidence, inference and human capability.",
      },
    ],
  }),
  component: Index,
});

const chapters = [
  {
    to: "/research",
    n: "01–02",
    title: "The Research",
    body: "The question, the hypothesis, and why reported evidence alone is not enough.",
  },
  {
    to: "/engine",
    n: "03 / 12–19",
    title: "The Cognitive Engine",
    body: "Skills versus capabilities, the three instruments, and what we actually observe.",
  },
  {
    to: "/models",
    n: "04–11",
    title: "Models & Mathematics",
    body: "The EMA baseline, its limits, and the Beta-Binomial route to uncertainty.",
  },
  {
    to: "/roadmap",
    n: "15–16 / 23–25",
    title: "Roadmap",
    body: "From fixed tests to adaptive selection, and the loop the lab runs on.",
  },
  {
    to: "/status",
    n: "20–22 / 26",
    title: "Status & Unknowns",
    body: "What is built, what is observed, what is hypothesised, what is unknown.",
  },
];

function Index() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-8 pt-16 text-center md:pt-24">
        <BlobMark className="mx-auto w-64 md:w-80" />
        <p className="eyebrow mt-8">Project Signal</p>
        <h1 className="mx-auto mt-5 max-w-4xl text-3xl font-semibold leading-[1.15] md:text-5xl">
          We're exploring whether a person's capabilities can be understood more accurately by
          combining what they've done with what they demonstrate.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          A research programme into evidence, inference and human capability.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/research"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-85"
          >
            Start with the question
          </Link>
          <Link
            to="/models"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
          >
            See the mathematics →
          </Link>
        </div>
      </section>

      <Section number="Premise" title="A CV tells us what someone has done.">
        <p>It does not necessarily tell us what they can do.</p>
        <p>
          Job titles are inconsistent. Skills are described differently across industries.
          Experience can be difficult to compare. And a written history rarely captures how someone
          actually approaches a problem.
        </p>
        <EvidenceFlow />
      </Section>

      <Section number="Reading" title="How to read this site" lede="Every claim carries a label.">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["built", "What we have implemented."],
            ["observed", "What experiments have shown."],
            ["hypothesised", "What we think might work."],
            ["unknown", "What still needs validation."],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-border bg-card p-4">
              <StatusTag kind={k as "built"} />
              <p className="mt-2 text-sm text-muted-foreground">{v}</p>
            </div>
          ))}
        </div>
        <p>
          We are not presenting a finished science. We are building instruments for measuring
          capability, and testing how much we can responsibly infer from the evidence they produce.
        </p>
      </Section>

      <Section number="Contents" title="The programme, in five chapters">
        <div className="not-prose divide-y divide-border border-y border-border">
          {chapters.map((c) => (
            <Reveal key={c.to}>
              <Link
                to={c.to as never}
                className="group grid gap-1 py-5 transition-colors hover:bg-accent/40 md:grid-cols-[7rem_1fr]"
              >
                <span className="eyebrow pt-1">{c.n}</span>
                <span>
                  <span className="text-lg font-semibold group-hover:text-signal-blue">
                    {c.title} →
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">{c.body}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section number="Principle" title="Measurement is not truth.">
        <Ascii>{`Evidence  ≠  Truth

Evidence → Inference → Uncertainty`}</Ascii>
        <p>
          A cognitive assessment produces observations. Observations inform estimates. Estimates
          have uncertainty. Uncertainty should remain visible.
        </p>
      </Section>

      <NextPage to="/research" label="01 — The Research" />
    </>
  );
}
