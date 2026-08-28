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
          "A research programme into evidence, inference and human capability: combining reported experience with observed capability.",
      },
      { property: "og:title", content: "Project Signal — Darkroom Systems Engineering" },
      {
        property: "og:description",
        content: "A research programme into evidence, inference and human capability.",
      },
    ],
  }),
  component: Index,
});

const researchEvolutionStages = [
  {
    to: "/research#stage-01",
    n: "Stage 01",
    title: "Foundations: Reported vs Observed",
    body: "Why CVs are not enough, reported evidence vs observed capability, and evidence flow extraction.",
    badge: "Foundations",
  },
  {
    to: "/research#stage-02",
    n: "Stage 02",
    title: "Baseline 01: Exponential Moving Average",
    body: "The initial scalar update model θ(t+1) = θ(t) + η(y - θ) and why single scores create false precision.",
    badge: "Baseline EMA",
  },
  {
    to: "/research#stage-03",
    n: "Stage 03",
    title: "Baseline 02: Bayesian Capability Inference",
    body: "Experiment PS-002B: Beta-Binomial conjugate update, neutral prior Beta(1,1), interactive density curve & mixed evidence.",
    badge: "PS-002B Bayesian",
  },
  {
    to: "/research#stage-04",
    n: "Stage 04",
    title: "Phase 03: Adaptive Task Selection",
    body: "Using belief state to select next optimal tasks via maximum information gain.",
    badge: "Phase 03 Adaptive",
  },
];

function Index() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative mx-auto max-w-5xl px-6 pb-12 pt-16 text-center md:pt-24">
        <BlobMark className="mx-auto w-72 md:w-96" />

        <p className="eyebrow mt-8 tracking-[0.22em] text-signal-blue">Project Signal &middot; Research Evolution</p>
        <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-semibold leading-[1.12] md:text-5xl">
          Understanding human capabilities by combining reported history with empirical inference.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
          From static CV scores to dynamic Bayesian belief states: an open research programme into evidence, inference, and uncertainty.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/research"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 shadow-sm"
          >
            Explore Research Evolution →
          </Link>
          <Link
            to="/models"
            className="rounded-full border border-border bg-surface/50 px-6 py-3 text-sm font-semibold transition-all hover:bg-accent hover:border-signal-blue"
          >
            Mathematical Models →
          </Link>
        </div>
      </section>

      {/* Premise Section */}
      <Section number="Premise" title="A CV tells us what someone has done.">
        <p>It does not necessarily tell us what they can do.</p>
        <p>
          Job titles are inconsistent. Skills are described differently across industries.
          Experience can be difficult to compare. And a written history rarely captures how someone
          actually approaches a problem.
        </p>
        <EvidenceFlow />
      </Section>

      {/* Evolution Journal Chapters */}
      <Section number="Evolution" title="The Research Journey Across 4 Stages">
        <p className="text-muted-foreground mb-6">
          Explore how our capability inference models evolved over time:
        </p>
        <div className="not-prose space-y-4">
          {researchEvolutionStages.map((s) => (
            <Reveal key={s.to}>
              <Link
                to={s.to as never}
                className="group grid gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-signal-blue hover:bg-accent/30 sm:grid-cols-[8rem_1fr]"
              >
                <div className="flex flex-col gap-1">
                  <span className="eyebrow">{s.n}</span>
                  <span className="inline-block font-mono text-[0.6rem] font-semibold text-signal-blue">
                    {s.badge}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-signal-blue transition-colors">
                    {s.title} →
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Core Principle */}
      <Section number="Principle" title="Measurement is not truth.">
        <Ascii>{`Evidence  ≠  Truth

Evidence ──► Inference ──► Uncertainty (σ)`}</Ascii>
        <p>
          A cognitive assessment produces observations. Observations inform estimates. Estimates
          have uncertainty. Uncertainty should remain visible.
        </p>
      </Section>

      <NextPage to="/research" label="01 — Research Journal Evolution" />
    </>
  );
}
