# Capability Compass

i want you to design me a research site where we will be talking and showing our research work for this Absolutely. I’d structure this as a research lab website, not as product documentation.

The content should tell a story:

We started with a simple question: can a person's capabilities be inferred more accurately by combining what they say they can do with what they demonstrate?

From there, the site can document the progression from the first baseline model → uncertainty → richer evidence → adaptive assessment → eventual cognitive engine.

Below is the content I would use as the foundation of the site.

COGNITIVE ENGINE RESEARCH

01 — The Research

Can we build a better representation of what a person can do?

A CV tells us what someone has done.

It does not necessarily tell us what they can do.

Job titles are inconsistent. Skills are described differently across industries. Experience can be difficult to compare. And a written history rarely captures how someone actually approaches a problem.

We are exploring whether a more useful representation can be built by combining reported experience with observed behaviour.

The goal is not to create a test that declares what someone is capable of.

The goal is to build a system that continuously asks:

What evidence do we have about this person's capabilities?

and:

What evidence are we still missing?

02 — The Hypothesis

A profile should be built from evidence, not declarations.

The current platform begins with a user's existing information:

CV
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
 Capability Profile

This provides an initial representation.

But it has a fundamental limitation.

The system is largely dependent on what the individual has reported.

We therefore introduce another source of evidence:

                    PERSON
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
        REPORTED             OBSERVED
         EVIDENCE             EVIDENCE
             │                   │
             └─────────┬─────────┘
                       ▼
                CAPABILITY MODEL

The research question becomes:

Can observed behaviour improve the calibration of a skills profile?

03 — The Cognitive Engine

From skills to capabilities.

A skill is not necessarily the same thing as a capability.

For example:

Python

is a skill.

But the ability to:

reason about a problem

decompose a system

identify patterns

make decisions

debug unfamiliar situations

represents broader capabilities.

The Cognitive Engine explores whether these capabilities can be inferred through structured behavioural observations.

We currently investigate three broad signal families:

Pattern

How does someone identify structure?

Signal

How does someone distinguish important information from noise?

Scenario

How does someone make decisions under constraints?

These are deliberately occupation-independent.

The intention is not to build a separate game for every occupation.

Instead, we are investigating whether a small number of general-purpose instruments can produce useful evidence across many fields.

04 — The First Baseline

Our first model is intentionally simple.

This is important.

Before introducing complex machine learning or adaptive testing, we need a model whose behaviour we can understand completely.

The baseline begins with an estimate:

θ0=0.5\theta_0 = 0.5

This represents a neutral starting point.

Each observation is binary:

yt∈{0,1}y_t \in \{0,1\}

where:

yt={1correct0incorrecty_t = \begin{cases} 1 & \text{correct}\\ 0 & \text{incorrect} \end{cases}

The model then updates its estimate after each observation.

05 — Exponential Moving Average

The first implementation uses an Exponential Moving Average.

The update equation is:

θt+1=θt+η(yt−θt)\theta_{t+1} = \theta_t+\eta(y_t-\theta_t)

where:

θt\theta_t = current estimate

yty_t = observed outcome

η\eta = learning rate

Our current baseline uses:

η=0.1\eta = 0.1

What does this mean?

If the current estimate is:

θt=0.5\theta_t = 0.5

and the participant succeeds:

yt=1y_t=1

then:

θt+1=0.5+0.1(1−0.5)\theta_{t+1} = 0.5+0.1(1-0.5)=0.55=0.55

The estimate moves toward the observation.

06 — What the Baseline Gets Right

The baseline successfully demonstrates three fundamental behaviours.

Success moves the estimate upward.

0.50 → 0.55

Failure moves the estimate downward.

0.50 → 0.45

Mixed evidence moves the estimate toward the centre.

For example:

SUCCESS
   ↓
0.50 → 0.55

FAILURE
   ↓
0.55 → 0.495

This gives us a functioning evidence-update mechanism.

The implementation has been tested with four baseline tests:

No observations
Success
Failure
Mixed observations

All four currently pass.

07 — The Problem With the Baseline

The simplicity that makes the EMA useful as a baseline also creates its main limitation.

The model does not explicitly represent uncertainty.

Consider two participants:

Participant A

1 observation
✓

and:

Participant B

100 observations
✓ ✓ ✓ ✓ ✓ ✓ ✓ ...

A simple estimate alone does not communicate how much evidence supports each estimate.

We therefore want the engine to represent two different things:

                 CAPABILITY
                     │
            ┌────────┴────────┐
            ▼                 ▼
         Estimate          Uncertainty

This leads to the next experiment.

08 — Bayesian Inference

Experiment PS-002

We are investigating whether a Beta-Binomial Bayesian model provides a more useful representation of binary evidence.

For binary observations, we introduce two parameters:

α\alpha

and

β\beta

where:

α\alpha represents accumulated success evidence

β\beta represents accumulated failure evidence

We begin with a neutral prior:

α=1,β=1\alpha=1,\qquad\beta=1

The expected capability is:

E[θ]=αα+βE[\theta] = \frac{\alpha}{\alpha+\beta}

Therefore:

E[θ]=11+1=0.5E[\theta] = \frac{1}{1+1} = 0.5

Again, we begin at the same neutral point.

09 — Updating Evidence

A successful observation produces:

α′=α+1\alpha'=\alpha+1

while a failure produces:

β′=β+1\beta'=\beta+1

Starting from:

α=1,β=1\alpha=1,\quad\beta=1

a success produces:

α=2,β=1\alpha=2,\quad\beta=1

and therefore:

E[θ]=23≈0.667E[\theta] = \frac{2}{3} \approx0.667

A subsequent failure produces:

α=2,β=2\alpha=2,\quad\beta=2

and:

E[θ]=24=0.5E[\theta] = \frac{2}{4} = 0.5

10 — Why This Matters

The Bayesian model gives the engine something the EMA does not naturally provide:

Evidence accumulation.

Instead of remembering only an estimate, the system maintains a representation of the evidence supporting that estimate.

Conceptually:

OBSERVATION
     │
     ▼
 ┌─────────┐
 │ Success │
 └────┬────┘
      │
      ▼
   α + 1

or:

OBSERVATION
     │
     ▼
 ┌─────────┐
 │ Failure │
 └────┬────┘
      │
      ▼
   β + 1

As evidence accumulates:

α+β↑\alpha+\beta \uparrow

the posterior becomes increasingly concentrated.

This gives us a route toward representing confidence in the estimate.

11 — The Research Question

We are now moving from:

Can the system update a score?

to:

Can the system represent evidence and uncertainty?

That distinction is fundamental.

A score without uncertainty can create false precision.

For example:

Analytical Reasoning — 83%

looks authoritative.

But the system should ideally be able to distinguish:

83%
based on 3 observations

from:

83%
based on 80 observations

Those are not equivalent measurements.

12 — The Evidence Model

The longer-term model we're exploring looks like this:

                 EXPERIENCE
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
             CAPABILITY PROFILE

This is the conceptual architecture of the research.

13 — What We Observe

The current observation structure includes:

Participant
Task
Correctness
Response Time
Instrument

Conceptually:

Observation
────────────

participant_id
task_id
correct
response_time_ms
instrument_id

This is deliberately richer than simply recording a score.

The system records behavioural evidence.

14 — Response Time

One of the most interesting signals already available in the observation model is:

response_timeresponse\_time

Currently, the baseline does not use it in its inference.

That is intentional.

We want to establish the simplest valid baseline before asking whether additional signals improve inference.

Future experiments can investigate whether:

Accuracy+ResponseTimeAccuracy + ResponseTime

provides more information than:

AccuracyAccuracy

alone.

But response time should not automatically be interpreted as ability.

A fast incorrect answer and a slow correct answer may represent very different behaviours.

The research question is therefore empirical:

Does response time provide additional predictive or diagnostic information once accuracy and task difficulty are controlled for?

15 — From Fixed Tests to Adaptive Assessment

The current assessment is sequential.

Eventually, we want to investigate a different architecture.

Instead of:

Task 1
 ↓
Task 2
 ↓
Task 3
 ↓
Task 4

the engine could determine:

Current evidence
       │
       ▼
What do we know?
       │
       ▼
What remains uncertain?
       │
       ▼
Which task would be most informative?
       │
       ▼
Next task

This becomes the Adaptive Selector.

The objective is no longer simply to administer more questions.

It is to select the most informative next observation.

16 — The Long-Term Engine

The research roadmap therefore becomes:

                    BASELINE
                       │
                       ▼
                       │
                 Bayesian Model
                       │
                       ▼
                Uncertainty
                       │
                       ▼
                Evidence Weighting
                       │
                       ▼
                Difficulty Modelling
                       │
                       ▼
                Adaptive Selection
                       │
                       ▼
                Information Gain
                       │
                       ▼
               COGNITIVE ENGINE

Each stage should be validated before the next is introduced.

17 — Three Instruments

We are currently exploring a compact assessment system rather than occupation-specific games.

01 — Pattern

Measures signals associated with:

pattern recognition

analytical reasoning

structural thinking

Core question:

Can the participant identify relationships and structure?

02 — Signal

Measures signals associated with:

information filtering

attention

prioritisation

detecting relevant information

Core question:

Can the participant separate signal from noise?

03 — Scenario

Measures signals associated with:

decision-making

prioritisation

reasoning under constraints

trade-offs

Core question:

How does the participant make decisions when there is no perfect answer?

18 — Why Three Instruments?

We don't want to create:

One game for engineers.

One game for accountants.

One game for researchers.

One game for designers.

That approach does not scale.

Instead, we're investigating whether general cognitive and behavioural dimensions can provide useful signals across occupations.

The occupation becomes a separate mapping problem:

                  OBSERVED CAPABILITIES
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
                 OCCUPATION MAPPING

This separates measurement from career interpretation.

That is a critical architectural principle.

19 — Measurement vs Interpretation

The Cognitive Engine should answer:

What evidence do we have about this person?

The Skills Mapping Platform should answer:

What does that evidence mean in the context of skills and occupations?

The recommendation system should answer:

Where might this profile be relevant?

These should not be collapsed into one model.

COGNITIVE ENGINE
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
PATHWAY RECOMMENDATION

20 — The Core Research Principle

The system should never confuse:

measurement

with

truth.

A cognitive assessment produces observations.

Observations inform estimates.

Estimates have uncertainty.

Uncertainty should remain visible.

Therefore:

Evidence≠TruthEvidence \neq Truth

Instead:

Evidence→Inference→UncertaintyEvidence \rightarrow Inference \rightarrow Uncertainty

This is one of the foundational principles of the project.

21 — Current State

What exists

The current research implementation has demonstrated:

CV ingestion

skill extraction

capability assessment

behavioural observations

baseline inference

profile generation

occupation recommendations

API integration

end-to-end system execution

The baseline inference implementation has also been tested with four tests covering:

Prior state
Success
Failure
Mixed evidence

All four tests currently pass.

22 — What We Don't Know Yet

This is arguably the most important section of the research site.

We do not yet know:

Whether three instruments are sufficient.

We need empirical evidence.

Whether behavioural signals generalise across occupations.

A pattern task may behave differently across populations.

Whether response time improves inference.

It may add useful information—or noise.

Whether Bayesian inference outperforms the EMA.

That needs experimental comparison.

Whether adaptive testing reduces assessment length without reducing information.

This must be measured.

Whether the resulting capabilities predict meaningful outcomes.

Ultimately, this is the hardest question.

23 — The Research Loop

The lab operates as an iterative system.

             ┌──────────────────┐
             │      HYPOTHESIS  │
             └────────┬─────────┘
                      ↓
             ┌──────────────────┐
             │      PROTOTYPE   │
             └────────┬─────────┘
                      ↓
             ┌──────────────────┐
             │       TEST       │
             └────────┬─────────┘
                      ↓
             ┌──────────────────┐
             │      OBSERVE     │
             └────────┬─────────┘
                      ↓
             ┌──────────────────┐
             │     EVALUATE     │
             └────────┬─────────┘
                      ↓
             ┌──────────────────┐
             │       REFINE     │
             └────────┬─────────┘
                      │
                      └──────────→ HYPOTHESIS

The objective is not to build the biggest model.

It is to build the smallest system that teaches us something.

24 — Research Roadmap

Phase 01 — Baseline

Status: Complete

EMA inference.

Binary observations.

Basic test suite.

Phase 02 — Uncertainty

Status: Next

Beta-Binomial inference.

Posterior distributions.

Evidence counts.

Uncertainty representation.

Phase 03 — Evidence

Investigate:

response time

task difficulty

repeated observations

task-specific reliability

Phase 04 — Adaptive Selection

Investigate:

information gain

uncertainty reduction

task selection

assessment length

Phase 05 — Validation

Compare:

CV-only profile
       vs
CV + Cognitive Evidence

and investigate whether the additional evidence produces a more useful profile.

25 — The Larger Vision

The eventual platform is not simply a CV parser.

It is a system for constructing a living representation of capability.

                WHAT YOU'VE DONE
                       │
                       ▼
                  EXPERIENCE
                       │
                       ▼
                   SKILLS
                       │
                       ▼
                 CAPABILITIES
                       ▲
                       │
                 OBSERVATIONS
                       ▲
                       │
                 HOW YOU THINK

Over time, the system could incorporate new evidence.

A project.

A course.

An assessment.

A work sample.

A demonstrated behaviour.

Each becomes another observation.

The profile therefore becomes less like a static CV and more like a model that evolves with evidence.

26 — The One-Line Thesis

I'd put this prominently on the research site's landing page:

We're exploring whether a person's capabilities can be understood more accurately by combining what they've done with what they demonstrate.

And underneath:

A research programme into evidence, inference and human capability.

Suggested interactive illustrations for the site

Rather than conventional stock imagery, I'd build the site around research diagrams that animate as the user scrolls.

Illustration 01 — "From CV to capability"

CV
 ↓
Experience
 ↓
Skills
 ↓
Capabilities

The CV fragments should visually separate into evidence units and recombine into a capability map.

Illustration 02 — "Observation → inference"

✓
✓
✕
✓
     ↓
  MODEL
     ↓
  0.67
     +
UNCERTAINTY

Allow the user to add observations interactively and watch the posterior change.

Illustration 03 — "EMA vs Bayesian"

Show two models receiving exactly the same observations.

The EMA produces a single moving line.

The Bayesian model produces:

        ┌─────────────┐
        │   estimate  │
        │      +      │
        │ uncertainty │
        └─────────────┘

As observations accumulate, the uncertainty band narrows.

Illustration 04 — "What should we ask next?"

Show a capability map with some areas highly certain and others uncertain.

Then:

              CURRENT MODEL

       Reasoning ━━━━━━━━━━ ●
       Decision  ━━━━━ ●
       Pattern   ━━━━━━━━━━━●
       Signal    ━━ ●
       Systems   ━━━━ ●


                   ↓

             NEXT BEST TASK

                   ↓

             uncertainty ↓

This visually introduces the future Adaptive Selector.

Illustration 05 — "The research loop"

A continuously moving:

Hypothesis → Prototype → Test → Observe → Evaluate → Refine

This should become the visual identity of the lab itself.

The important distinction for the site

I would not present the Bayesian model, three games, adaptive selector, or future response-time modelling as finished science.

The research site should deliberately distinguish:

Built

what we have implemented.

Observed

what the experiments have shown.

Hypothesised

what we think might work.

Unknown

what still needs validation.

That makes the site considerably more credible—and it fits the research-lab philosophy you're aiming for.

The strongest narrative is therefore not "we built an AI that understands people."

It is:

We are building instruments for measuring capability, and testing how much we can responsibly infer from the evidence they produce.  use the design ideas from the attached images ensure that the math is well formatted come up with great illustrations the site should be immersive and interactive and minimal design and also break it down to sections for ease of navigations and use opensans font accross and also on the header use the name of the team systems engineering team at darkroom

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ce431bb9-7b83-4d2c-b723-26965ed7ac71).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
