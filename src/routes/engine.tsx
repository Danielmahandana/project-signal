import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, Ascii, StatusTag } from "@/components/site/Section";
import { NextPage } from "@/components/site/SiteChrome";
import { M } from "@/components/site/Math";

export const Route = createFileRoute("/engine")({
  head: () => ({
    meta: [
      { title: "The Cognitive Engine — Cognitive Engine Research" },
      {
        name: "description",
        content:
          "From skills to capabilities: three occupation-independent instruments — Pattern, Signal and Scenario — and the observations they produce.",
      },
      { property: "og:title", content: "The Cognitive Engine — Cognitive Engine Research" },
      {
        property: "og:description",
        content: "Pattern, Signal and Scenario: three instruments for observing capability.",
      },
    ],
  }),
  component: EnginePage,
});

const instruments = [
  {
    n: "01",
    name: "Pattern",
    signals: ["pattern recognition", "analytical reasoning", "structural thinking"],
    q: "Can the participant identify relationships and structure?",
    color: "text-signal-blue",
  },
  {
    n: "02",
    name: "Signal",
    signals: ["information filtering", "attention", "prioritisation", "detecting relevance"],
    q: "Can the participant separate signal from noise?",
    color: "text-signal-red",
  },
  {
    n: "03",
    name: "Scenario",
    signals: ["decision-making", "prioritisation", "reasoning under constraints", "trade-offs"],
    q: "How does the participant make decisions when there is no perfect answer?",
    color: "text-signal-green",
  },
];

function EnginePage() {
  return (
    <>
      <PageHeader
        eyebrow="03 — The Cognitive Engine"
        title="From skills to capabilities."
        lede="A skill is not necessarily the same thing as a capability. Python is a skill. Reasoning about a problem, decomposing a system, identifying patterns, deciding, and debugging unfamiliar situations are capabilities."
      />

      <Section number="17" title="Three instruments" lede="Deliberately occupation-independent.">
        <div className="not-prose grid gap-4 md:grid-cols-3">
          {instruments.map((i) => (
            <div key={i.name} className="rounded-xl border border-border bg-card p-5">
              <p className="eyebrow">{i.n}</p>
              <h3 className={`mt-2 text-xl font-semibold ${i.color}`}>{i.name}</h3>
              <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                {i.signals.map((s) => (
                  <li key={s}>— {s}</li>
                ))}
              </ul>
              <p className="mt-4 border-t border-border pt-4 text-sm">{i.q}</p>
            </div>
          ))}
        </div>
        <p>
          The intention is not to build a separate game for every occupation. We are investigating
          whether a small number of general-purpose instruments can produce useful evidence across
          many fields. <StatusTag kind="hypothesised" />
        </p>
      </Section>

      <Section number="18" title="Why only three?">
        <p>
          One game for engineers, one for accountants, one for researchers, one for designers — that
          approach does not scale. The occupation becomes a separate mapping problem.
        </p>
        <Ascii>{`                  OBSERVED CAPABILITIES
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
       Reasoning       Decisions        Problem
                                        Solving
          │               │               │
          └───────────────┼───────────────┘
                          ▼
                   CAPABILITY MAP
                          │
                          ▼
                 OCCUPATION MAPPING`}</Ascii>
        <p>This separates measurement from career interpretation — a critical principle.</p>
      </Section>

      <Section number="19" title="Measurement vs interpretation">
        <div className="not-prose grid gap-3">
          {[
            ["Cognitive Engine", "What evidence do we have about this person?"],
            ["Skills Mapping Platform", "What does that evidence mean for skills and occupations?"],
            ["Recommendation system", "Where might this profile be relevant?"],
          ].map(([a, b]) => (
            <div
              key={a}
              className="grid gap-1 rounded-lg border border-border bg-card p-4 md:grid-cols-[14rem_1fr]"
            >
              <span className="text-sm font-semibold">{a}</span>
              <span className="text-sm text-muted-foreground">{b}</span>
            </div>
          ))}
        </div>
        <p>These should not be collapsed into one model.</p>
        <Ascii>{`COGNITIVE ENGINE
        │
        ▼
Evidence
        │
        ▼
CAPABILITY MODEL
        │
        ▼
SKILLS MAPPING
        │
        ▼
OCCUPATION MODEL
        │
        ▼
PATHWAY RECOMMENDATION`}</Ascii>
      </Section>

      <Section number="12" title="The evidence model" lede="The conceptual architecture.">
        <Ascii>{`                 EXPERIENCE
                     │
                     ▼
                CV / INPUT
                     │
                     ▼
              SKILL EXTRACTION
                     │
                     ▼
                INITIAL MAP
                     │
                     ▼
              COGNITIVE TESTS
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       Pattern     Signal    Scenario
          │          │          │
          └──────────┼──────────┘
                     ▼
                 OBSERVATIONS
                     │
                     ▼
              INFERENCE MODEL
                     │
             ┌───────┴────────┐
             ▼                ▼
          Estimate        Uncertainty
             │                │
             └───────┬────────┘
                     ▼
             CAPABILITY PROFILE`}</Ascii>
      </Section>

      <Section number="13" title="What we observe" lede="Richer than simply recording a score.">
        <Ascii>{`Observation
────────────

participant_id
task_id
correct
response_time_ms
instrument_id`}</Ascii>
        <p>
          The system records behavioural evidence: participant, task, correctness, response time and
          instrument. <StatusTag kind="built" />
        </p>
      </Section>

      <Section number="14" title="Response time">
        <p>
          The baseline does not currently use <M>{`response\\_time`}</M> in its inference. That is
          intentional — we want the simplest valid baseline before asking whether additional signals
          improve inference.
        </p>
        <div className="not-prose grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-4 text-center">
            <M>{`Accuracy`}</M>
            <p className="mt-2 text-xs text-muted-foreground">current baseline</p>
          </div>
          <div className="rounded-lg border border-dashed border-signal-amber/60 bg-card p-4 text-center">
            <M>{`Accuracy + ResponseTime`}</M>
            <p className="mt-2 text-xs text-muted-foreground">future experiment</p>
          </div>
        </div>
        <p>
          A fast incorrect answer and a slow correct answer may represent very different behaviours.
          The question is empirical: does response time provide additional predictive or diagnostic
          information once accuracy and task difficulty are controlled for? <StatusTag kind="unknown" />
        </p>
      </Section>

      <NextPage to="/models" label="04 — Models & Mathematics" />
    </>
  );
}
