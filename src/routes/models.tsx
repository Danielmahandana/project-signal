import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, Ascii, StatusTag } from "@/components/site/Section";
import { NextPage } from "@/components/site/SiteChrome";
import { M, Eq } from "@/components/site/Math";
import { PosteriorLab } from "@/components/site/PosteriorLab";

export const Route = createFileRoute("/models")({
  head: () => ({ meta: [{ title: "Models & Mathematics — Project Signal" }] }),
  component: ModelsPage,
});

function ModelsPage() {
  return (
    <>
      <PageHeader
        eyebrow="04 — Models & Mathematics"
        title="A score is only the beginning."
        lede="The first model is deliberately simple. It gives us a transparent baseline before we ask richer questions about evidence, uncertainty, difficulty and information gain."
      />
      <Section
        number="04"
        title="The first baseline"
        lede="A neutral starting point, updated by binary observations."
      >
        <p>
          We begin with <M>{"\\theta_0 = 0.5"}</M>. Each observation is either correct or incorrect:
        </p>
        <Eq note="The estimate moves a small step toward what was observed.">
          {"\\theta_{t+1}=\\theta_t+\\eta(y_t-\\theta_t)"}
        </Eq>
        <p>
          <M>{"\\eta = 0.1"}</M> is the current learning rate. A correct response moves{" "}
          <M>{"0.5 \\to 0.55"}</M>; an incorrect response moves <M>{"0.5 \\to 0.45"}</M>.
        </p>
        <StatusTag kind="built" />
      </Section>
      <Section
        number="05–06"
        title="What the EMA gets right"
        lede="A small model whose behaviour we can inspect completely."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Success", "0.50 → 0.55"],
            ["Failure", "0.50 → 0.45"],
            ["Mixed evidence", "0.55 → 0.495"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-border bg-card p-4">
              <p className="eyebrow">{label}</p>
              <p className="mt-3 font-mono text-sm">{value}</p>
            </div>
          ))}
        </div>
        <p>
          The baseline passes four checks: prior state, success, failure and mixed observations. Its
          limitation is equally clear: it stores an estimate, but not how much evidence supports it.
        </p>
      </Section>
      <Section
        number="07–10"
        title="Bayesian inference"
        lede="Experiment PS-002: represent capability and uncertainty together."
      >
        <p>
          For binary evidence, we use a Beta-Binomial model with success evidence <M>{"\\alpha"}</M>{" "}
          and failure evidence <M>{"\\beta"}</M>. The neutral prior is <M>{"\\alpha=1,\\beta=1"}</M>
          .
        </p>
        <Eq note="Expected capability under the posterior.">
          {"E[\\theta]=\\frac{\\alpha}{\\alpha+\\beta}"}
        </Eq>
        <p>
          A success increments <M>{"\\alpha"}</M>; a failure increments <M>{"\\beta"}</M>. From{" "}
          <M>{"(1,1)"}</M>, one success gives <M>{"(2,1)"}</M> and <M>{"E[\\theta]=2/3"}</M>. A
          following failure gives <M>{"(2,2)"}</M> and returns the mean to <M>{"0.5"}</M>.
        </p>
        <PosteriorLab />
        <p>
          Try the same observations in both models. The EMA produces a moving estimate. The
          posterior carries the estimate, the evidence count and a visible uncertainty signal.
        </p>
      </Section>
      <Section number="11" title="Why this matters">
        <Ascii>{`83% from 3 observations

is not the same measurement as

83% from 80 observations`}</Ascii>
        <p>
          A score without uncertainty can create false precision. The research question has moved
          from “can the system update a score?” to “can it represent the evidence behind the score?”
        </p>
        <StatusTag kind="hypothesised" />
      </Section>
      <NextPage to="/roadmap" label="15 — Adaptive Selection & Roadmap" />
    </>
  );
}
