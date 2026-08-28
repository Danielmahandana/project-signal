import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, SubSection, Ascii, StatusTag } from "@/components/site/Section";
import { NextPage } from "@/components/site/SiteChrome";
import { M, Eq } from "@/components/site/Math";
import { InteractiveBetaLab } from "@/components/site/InteractiveBetaLab";
import { PosteriorLab } from "@/components/site/PosteriorLab";

export const Route = createFileRoute("/models")({
  head: () => ({ meta: [{ title: "Models & Mathematics Evolution — Project Signal" }] }),
  component: ModelsPage,
});

function ModelsPage() {
  return (
    <>
      <PageHeader
        eyebrow="04 — Models & Mathematics"
        title="Mathematical Evolution of Capability Models"
        lede="From scalar exponential moving averages to Beta-Binomial Bayesian posterior belief states."
      />

      {/* Stage 01: Scalar EMA Model */}
      <Section
        number="04"
        stageTag="Model 01: EMA"
        title="Model 01: Scalar Exponential Moving Average"
        lede="A simple, transparent baseline update model."
      >
        <SubSection subNumber="04.1" title="The EMA Update Rule">
          <p>
            We begin with <M>{"\\theta_0 = 0.5"}</M>. Each binary observation <M>{"y_t \\in \\{0, 1\\}"}</M> updates the score:
          </p>
          <Eq note="The estimate moves a step toward what was observed.">
            {"\\theta_{t+1}=\\theta_t+\\eta(y_t-\\theta_t)"}
          </Eq>
          <p>
            <M>{"\\eta = 0.1"}</M> is the learning rate. A correct response moves{" "}
            <M>{"0.5 \\to 0.55"}</M>; an incorrect response moves <M>{"0.5 \\to 0.45"}</M>.
          </p>
          <StatusTag kind="built" />
        </SubSection>

        <SubSection subNumber="04.2" title="EMA Trajectory Table">
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
        </SubSection>
      </Section>

      {/* Stage 02: Beta-Binomial Bayesian Model */}
      <Section
        number="05–06"
        stageTag="Model 02: Beta-Binomial"
        title="Model 02: Beta-Binomial Bayesian Inference"
        lede="Experiment PS-002B: Representing capability and uncertainty together."
      >
        <SubSection subNumber="05.1" title="Posterior Distribution Parameters">
          <p>
            For binary evidence, we use a Beta-Binomial model with success evidence <M>{"\\alpha"}</M>{" "}
            and failure evidence <M>{"\\beta"}</M>. The neutral prior is <M>{"\\alpha=1,\\beta=1"}</M>.
          </p>
          <Eq note="Expected capability under posterior parameters.">
            {"E[\\theta]=\\frac{\\alpha}{\\alpha+\\beta}"}
          </Eq>
          <Eq note="Posterior standard deviation representing uncertainty.">
            {"\\sigma = \\sqrt{\\frac{\\alpha\\beta}{(\\alpha+\\beta)^2(\\alpha+\\beta+1)}}"}
          </Eq>
        </SubSection>

        <SubSection subNumber="05.2" title="Interactive Model Simulator">
          <p>
            Test observations in real-time. Notice how the shape of the Beta distribution morphs as evidence accumulates:
          </p>
          <InteractiveBetaLab />
        </SubSection>
      </Section>

      {/* Comparative Laboratory */}
      <Section
        number="07"
        stageTag="Comparative Lab"
        title="Comparing EMA vs Bayesian Inference"
        lede="Why sample volume and uncertainty change the measurement."
      >
        <SubSection subNumber="07.1" title="Sample Volume Sensitivity">
          <Ascii>{`83% from 3 observations
is NOT the same measurement as
83% from 80 observations.`}</Ascii>
          <p>
            A scalar score without uncertainty creates false precision. The Bayesian model carries the estimate, the evidence count, and an explicit uncertainty metric.
          </p>
          <PosteriorLab />
        </SubSection>
      </Section>

      <NextPage to="/roadmap" label="15 — Adaptive Selection & Roadmap" />
    </>
  );
}
