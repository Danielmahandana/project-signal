import { createFileRoute, Link } from "@tanstack/react-router";
import { ScrollAnimusCanvas } from "@/components/site/shared/ScrollAnimusCanvas";
import { LAB_NOTES, RESEARCH_PROJECTS } from "@/lib/researchData";
import { ParallaxImage } from "@/components/sota/ParallaxImage";
import { MagneticButton } from "@/components/sota/MagneticButton";
import { ScrollReveal } from "@/components/sota/ScrollReveal";
import { CutoutComposition } from "@/components/sota/CutoutComposition";
import { ResearchStory } from "@/components/sota/ResearchStory";
import { ResearchRow } from "@/components/sota/ResearchRow";
import { Folder } from "@/components/sota/Folder";
import { StickyStory } from "@/components/sota/StickyStory";
import { HorizontalTrack, TrackItem } from "@/components/sota/HorizontalTrack";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "THE SOTA LAB — State of the Art Research Laboratory" },
      {
        name: "description",
        content:
          "The Sota Lab conducts state of the art research into probabilistic capability inference, structured competency topologies, and adaptive cognitive instruments.",
      },
      { property: "og:title", content: "THE SOTA LAB — State of the Art Research Laboratory" },
    ],
  }),
  component: HomePage,
});

const METHODOLOGY_TRACK: TrackItem[] = [
  {
    number: "01",
    tag: "Ingestion",
    title: "Multi-Channel Evidence Streams",
    description:
      "Normalizing sparse, noisy observations across unstructured resumes, code telemetry, and peer evaluations into calibrated observation vectors.",
    formulaOrCode: "E_t = { (y_i, q_i, t_i) } | y_i ∈ {0, 1}",
    linkTo: "/research/capability-inference",
  },
  {
    number: "02",
    tag: "Representation",
    title: "Ontological Graph Projections",
    description:
      "Contextual transformer token extraction projected onto international ESCO and South African OFO hierarchical skill manifolds.",
    formulaOrCode: "G = (V, E, W) | dim(Embed(token)) = 768",
    linkTo: "/research/skills-intelligence",
  },
  {
    number: "03",
    tag: "Inference",
    title: "Online Bayesian Belief Updating",
    description:
      "Conjugate Beta-Binomial state estimation with drift discount that isolates epistemic uncertainty from observational noise in real time.",
    formulaOrCode: "P(θ | E) ~ Beta(α_t, β_t)",
    linkTo: "/systems",
  },
  {
    number: "04",
    tag: "Instruments",
    title: "Adaptive Cognitive Testing",
    description:
      "Next-item selection driven by maximum Fisher information gain, tightening uncertainty bounds with 42% fewer observations than static instruments.",
    formulaOrCode: "I(θ) = [P'(θ)]² / [P(θ)(1 - P(θ))]",
    linkTo: "/research/cognitive-assessment",
  },
  {
    number: "05",
    tag: "Friction",
    title: "Empirical Labour Market Signals",
    description:
      "Validating computational hypotheses against the non-stationary friction of real-world technical colleges (TVETs) and industrial trades in South Africa.",
    formulaOrCode: "ΔGap = ||Represented - Required||_L2",
    linkTo: "/about",
  },
];

const STICKY_STEPS = [
  {
    tag: "01 // THE INQUIRY",
    title: "Static score reductionism destroys measurement validity.",
    body: "Conventional competency frameworks collapse multidimensional, evolving human capability into scalar scores or static badge counts. Under sparse observations, this creates false certainty.",
  },
  {
    tag: "02 // COMPUTATIONAL HYPOTHESIS",
    title: "Represent capability as continuous probability distributions.",
    body: "Rather than claiming point certainty, our models track epistemic uncertainty directly. Every observation—whether a verified task, a diagnostic response, or a workplace signal—updates a conjugate belief state.",
    extra: (
      <div className="font-mono text-xs p-3 rounded bg-surface border border-border/60 text-foreground/90">
        P(θ | E) ∝ L(E | θ) · P(θ) &nbsp;[Beta-Binomial Conjugate]
      </div>
    ),
  },
  {
    tag: "03 // EMPIRICAL EVIDENCE",
    title: "Validated against real TVET trade cohorts.",
    body: "Over 1,200 apprentices in electrical, mechanical, and IT disciplines in Gauteng were tracked. The Bayesian filter converged to calibrated capability bounds 42% faster than conventional linear testing.",
  },
  {
    tag: "04 // SCIENTIFIC IMPLICATION",
    title: "Adaptive pathways replace static gatekeeping.",
    body: "When capability is modelled probabilistically, systems can dynamically route the next most informative diagnostic item or curriculum intervention, opening non-linear pathways into high-demand work.",
  },
];

function HomePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* =========================================================================
          HERO SECTION (DeepMind Inspired: Editorial Typography + Layered Parallax)
          ========================================================================= */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20 sm:pb-28 border-b border-border/40 overflow-hidden">
        {/* Subtle Canvas generative wave in background */}
        <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 pointer-events-none">
          <ScrollAnimusCanvas className="w-full h-full" intensity={0.9} />
        </div>

        <div className="relative z-10 space-y-10">
          {/* Eyebrow / Lab Live Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
            <div className="flex items-center space-x-2.5">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="font-semibold uppercase tracking-widest text-foreground">
                THE SOTA LAB
              </span>
              <span>&middot;</span>
              <span className="uppercase tracking-wider">STATE OF THE ART RESEARCH</span>
            </div>
            <div className="hidden sm:flex items-center space-x-3 text-[0.7rem] text-muted-foreground/80">
              <span>LAT: 26.2041° S</span>
              <span>&middot;</span>
              <span>LON: 28.0473° E</span>
              <span>&middot;</span>
              <span>OPEN RESEARCH</span>
            </div>
          </div>

          {/* Primary Statement in Editorial Serif */}
          <div className="max-w-5xl space-y-6">
            <h1 className="text-hero-display text-foreground">
              Understanding how people learn, work, and adapt under uncertainty.
            </h1>

            <p className="text-lg sm:text-2xl text-muted-foreground font-sans font-normal leading-relaxed max-w-3xl">
              A research and engineering laboratory investigating online Bayesian capability inference, structured competency topologies, and adaptive cognitive instruments.
            </p>
          </div>

          {/* Hero CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs">
            <MagneticButton to="/research" variant="primary">
              Explore Investigations
            </MagneticButton>
            <MagneticButton to="/systems" variant="secondary">
              Interactive Systems &amp; Models
            </MagneticButton>
            <Link
              to="/about"
              className="text-muted-foreground hover:text-foreground transition-colors py-2 px-1"
            >
              Lab Methodology &rarr;
            </Link>
          </div>

          {/* Large Hero Visual Composition: Cut-out Photographic Depth */}
          <div className="pt-6">
            <ScrollReveal variant="mask-reveal" duration={900}>
              <CutoutComposition
                backgroundImage="/HH5V_XhXEAA3JfB.jpeg"
                foregroundImage="/header-brain.jpeg"
                badge="FLAGSHIP INVESTIGATION // 01"
                title="Probabilistic Capability Inference from Sparse Observation Streams"
                subtitle="Moving past static reductionism to continuous Bayesian belief states that bound epistemic uncertainty in high-friction labor markets."
                linkTo="/research/capability-inference"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HORIZONTAL METHODOLOGY TRACK (Continuum of Research)
          ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HorizontalTrack
          items={METHODOLOGY_TRACK}
          eyebrow="THE SOTA LAB CONTINUUM // RESEARCH ARCHITECTURE"
          title="From Raw Signal to Adaptive Intelligence"
        />
      </section>

      {/* =========================================================================
          FEATURED RESEARCH STORIES (DeepMind Editorial Compositions)
          ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-b border-border/40">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-12 sm:mb-16 gap-4">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
              Featured Investigations
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial-serif tracking-tight text-foreground">
              Selected Research
            </h2>
          </div>
          <Link
            to="/research"
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            <span>View all investigations ({RESEARCH_PROJECTS.length})</span>
            <span>&rarr;</span>
          </Link>
        </div>

        <div className="space-y-16 sm:space-y-24">
          {/* Story 01: Split Composition */}
          <ResearchStory
            number="01"
            category="AI Systems · Probabilistic Modelling"
            date="2026"
            title="Capability Inference"
            description="Moving from static score reductionism to continuous Bayesian belief states that track epistemic uncertainty under sparse evidence. Our filter regularizes non-stationary performance degradation across technical domains."
            author="Daniel Mahandana &amp; Narvin M."
            imageSrc="/header-brain.jpeg"
            imageAlt="Bayesian capability manifold"
            linkTo="/research/capability-inference"
            composition="split"
          />

          {/* Story 02: Asymmetric Image-Right Composition */}
          <ResearchStory
            number="02"
            category="Data Topologies · NLP Extraction"
            date="2026"
            title="Skills Intelligence in TVET Ecosystems"
            description="Extracting authenticated vocational competencies from unstructured resumes, institutional curricula, and industrial certifications. Tokens are projected onto international ESCO and South African OFO hierarchical graphs."
            author="Daniel Mahandana &amp; Systems Lab Group"
            imageSrc="/footer-butterfly.jpeg"
            imageAlt="Topological emergence of skills and competency graphs"
            linkTo="/research/skills-intelligence"
            composition="image-right"
          />

          {/* Story 03: Full-Width Cinematic Banner */}
          <ResearchStory
            number="03"
            category="Human Capability · Psychometrics"
            date="2026"
            title="Computerized Adaptive Cognitive Engine"
            description="Adaptive computerized testing via maximum Fisher information gain. By routing questions toward areas of maximum parameter uncertainty, the system converges to narrow capability bounds in 42% fewer observations."
            author="Daniel Mahandana &amp; Thabang K."
            imageSrc="/new.jpeg"
            imageAlt="Cognitive architecture and item routing"
            linkTo="/research/cognitive-assessment"
            composition="full-width"
          />
        </div>
      </section>

      {/* =========================================================================
          REACT BITS: 3D INTERACTIVE RESEARCH FOLDERS
          ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-b border-border/40">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block">
            Archival Collections
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial-serif tracking-tight text-foreground">
            Research Repositories
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
            Explore our open research papers, technical monographs, and datasets grouped by theoretical discipline. Hover to preview contents.
          </p>
        </div>

        {/* 4 Thematic Folders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 justify-items-center pt-4">
          {/* Folder 1 */}
          <Link to="/research" search={{ area: "ai-systems" }} className="block">
            <Folder
              size={1.15}
              color="#16181e"
              label="AI Systems"
              category="Probabilistic Kernels"
              count={3}
              items={[
                <div key="1" className="p-2 text-[0.6rem] font-mono text-zinc-700 dark:text-zinc-300">
                  <div className="font-bold text-accent">PS-TR-01</div>
                  <div>Bayesian Belief State</div>
                </div>,
                <div key="2" className="p-2 text-[0.6rem] font-mono text-zinc-700 dark:text-zinc-300">
                  <div className="font-bold text-accent">PS-TR-02</div>
                  <div>Non-Stationary Drift</div>
                </div>,
              ]}
            />
          </Link>

          {/* Folder 2 */}
          <Link to="/research" search={{ area: "data-intelligence" }} className="block">
            <Folder
              size={1.15}
              color="#1a1d24"
              label="Data Topologies"
              category="Taxonomies & NLP"
              count={4}
              items={[
                <div key="1" className="p-2 text-[0.6rem] font-mono text-zinc-700 dark:text-zinc-300">
                  <div className="font-bold text-accent">PS-WP-04</div>
                  <div>ESCO/OFO Graph</div>
                </div>,
                <div key="2" className="p-2 text-[0.6rem] font-mono text-zinc-700 dark:text-zinc-300">
                  <div className="font-bold text-accent">PS-WP-05</div>
                  <div>CV Extraction Kernel</div>
                </div>,
              ]}
            />
          </Link>

          {/* Folder 3 */}
          <Link to="/research" search={{ area: "human-capability" }} className="block">
            <Folder
              size={1.15}
              color="#1d222b"
              label="Human Capability"
              category="Adaptive Testing"
              count={3}
              items={[
                <div key="1" className="p-2 text-[0.6rem] font-mono text-zinc-700 dark:text-zinc-300">
                  <div className="font-bold text-accent">PS-CAT-01</div>
                  <div>Fisher Gain Routing</div>
                </div>,
                <div key="2" className="p-2 text-[0.6rem] font-mono text-zinc-700 dark:text-zinc-300">
                  <div className="font-bold text-accent">PS-CAT-02</div>
                  <div>Cognitive Assessment</div>
                </div>,
              ]}
            />
          </Link>

          {/* Folder 4 */}
          <Link to="/research" search={{ area: "labour-markets" }} className="block">
            <Folder
              size={1.15}
              color="#141920"
              label="Labour Markets"
              category="TVET Ecosystems"
              count={2}
              items={[
                <div key="1" className="p-2 text-[0.6rem] font-mono text-zinc-700 dark:text-zinc-300">
                  <div className="font-bold text-accent">PS-LM-01</div>
                  <div>TVET Apprentice Data</div>
                </div>,
                <div key="2" className="p-2 text-[0.6rem] font-mono text-zinc-700 dark:text-zinc-300">
                  <div className="font-bold text-accent">PS-LM-02</div>
                  <div>Skill Gap Topology</div>
                </div>,
              ]}
            />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          STICKY SCIENTIFIC STORYTELLING (Hypothesis to Impact)
          ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StickyStory
          stickyImage="/wa.jpeg"
          stickyAlt="Laboratory experimental apparatus"
          badge="THE SOTA LAB PHILOSOPHY"
          headline="Why Probabilistic Inference Matters for Human Capability"
          steps={STICKY_STEPS}
        />
      </section>

      {/* =========================================================================
          NUMBERED RESEARCH ARCHIVE (Premium SOTA Row System)
          ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-b border-border/40">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-12 gap-4">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
              Scholarly Index
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial-serif tracking-tight text-foreground">
              Research Archive
            </h2>
          </div>
          <Link
            to="/publications"
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            All publications &amp; citations &rarr;
          </Link>
        </div>

        <div className="divide-y divide-border/40 border-t border-border/40">
          <ResearchRow
            number="01"
            title="Probabilistic Modelling of Latent Human Capability from Sparse Observation Streams"
            category="AI Systems · Bayesian Inference"
            year="2026"
            status="Active"
            imageSrc="/header-brain.jpeg"
            linkTo="/research/capability-inference"
            leadAuthor="Daniel Mahandana"
          />
          <ResearchRow
            number="02"
            title="Skills Intelligence in TVET Ecosystems: Contextual Extraction and Standardized Ontologies"
            category="Data Topologies · NLP"
            year="2026"
            status="Active"
            imageSrc="/footer-butterfly.jpeg"
            linkTo="/research/skills-intelligence"
            leadAuthor="Daniel Mahandana"
          />
          <ResearchRow
            number="03"
            title="Adaptive Computerized Cognitive Assessment via Maximum Fisher Information Routing"
            category="Human Capability · Psychometrics"
            year="2026"
            status="Active"
            imageSrc="/new.jpeg"
            linkTo="/research/cognitive-assessment"
            leadAuthor="Daniel Mahandana"
          />
          <ResearchRow
            number="04"
            title="Empirical Measurement of Qualification Degradation in Technical Trades"
            category="Labour Markets · South Africa"
            year="2025"
            status="Published"
            imageSrc="/home.jpeg"
            linkTo="/publications"
            leadAuthor="Narvin M."
          />
        </div>
      </section>

      {/* =========================================================================
          LATEST DISPATCHES & ESSAYS (Editorial Minimal List)
          ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-b border-border/40">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block mb-2">
              Writing &amp; Thinking
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial-serif tracking-tight text-foreground">
              Latest Dispatches
            </h2>
          </div>
          <Link
            to="/blog"
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View all dispatches &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {LAB_NOTES.slice(0, 3).map((note) => (
            <Link
              key={note.id}
              to="/blog"
              className="group block p-6 rounded-md bg-surface/50 border border-border/50 hover:border-accent/40 hover:bg-surface transition-all duration-300 space-y-4"
            >
              <div className="flex items-center justify-between font-mono text-[0.7rem] text-muted-foreground">
                <span>{note.formattedDate}</span>
                <span className="uppercase text-accent tracking-wider font-semibold">
                  {note.tags[0]}
                </span>
              </div>

              <h3 className="text-xl font-editorial-serif text-foreground group-hover:text-accent transition-colors leading-snug">
                {note.title}
              </h3>

              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed font-sans">
                {note.excerpt}
              </p>

              <div className="pt-2 font-mono text-xs text-foreground group-hover:text-accent inline-flex items-center gap-1.5 transition-colors">
                <span>Read essay</span>
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          CLOSING STATEMENT & LAB METHODOLOGY
          ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-3xl space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            About the lab
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial-serif tracking-tight text-foreground leading-[1.08]">
            We build to understand.
          </h2>

          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed font-sans font-light">
            We test our mathematical hypotheses not on synthetic vacuum scenarios, but against the noisy, non-stationary friction of real-world vocational education, technical trades, and emerging workforce dynamics across South Africa and the Global South.
          </p>

          <div className="pt-4 font-mono text-xs">
            <MagneticButton to="/about" variant="primary">
              Read Our Methodology &amp; Principles
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
