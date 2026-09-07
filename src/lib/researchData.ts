export interface ResearchArea {
  id: string;
  name: string;
  shortDescription: string;
  disciplines: string[];
}

export type ProjectStatus = "active" | "exploratory" | "published" | "archived";

export interface ResearchProject {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  thesis: string;
  type: "Research System" | "Research Paper" | "Technical Report" | "Benchmark";
  areaId: string;
  areaName: string;
  year: number;
  status: ProjectStatus;
  leadAuthor: string;
  coAuthors: string[];
  abstract: string;
  keyQuestion: string;
  evidenceType: string[];
  systemLink?: string;
  paperLink?: string;
  codeLink?: string;
  datasetLink?: string;
  featuredOrder?: number;
}

export interface Publication {
  id: string;
  slug: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: "Technical Report" | "Working Paper" | "Conference Paper" | "Preprint";
  abstract: string;
  pdfUrl?: string;
  codeUrl?: string;
  datasetUrl?: string;
  bibtex: string;
  topics: string[];
}

export interface LabNote {
  id: string;
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  readTime: string;
  excerpt: string;
  author: string;
  tags: string[];
  contentParagraphs: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  discipline: "RESEARCH" | "ENGINEERING" | "DATA" | "ADVISORY";
  bio: string;
  researchInterests: string[];
  website?: string;
  github?: string;
  linkedin?: string;
  avatarInitials: string;
}

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: "ai-systems",
    name: "AI Systems",
    shortDescription: "Probabilistic modelling, reasoning architectures, and online inference systems under incomplete information.",
    disciplines: ["Probabilistic Models", "Bayesian Updating", "Reasoning Engines", "Active Inference"],
  },
  {
    id: "data-intelligence",
    name: "Data & Intelligence",
    shortDescription: "Translating unstructured labour records, occupational frameworks, and qualification standards into computable topologies.",
    disciplines: ["Competency Taxonomies", "NLP & Extraction", "Occupational Graphs", "ESCO / OFO Alignment"],
  },
  {
    id: "human-capability",
    name: "Human Capability",
    shortDescription: "Quantifying latent human capability, adaptive learning trajectories, and psychometric measurement integrity.",
    disciplines: ["Latent Capability", "Cognitive Assessment", "Computerized Adaptive Testing", "Workforce Synthesis"],
  },
  {
    id: "labour-markets",
    name: "Labour Markets",
    shortDescription: "Empirical study of TVET education ecosystems, structural skill mismatches, and emerging economic capability.",
    disciplines: ["TVET Systems", "South African Labour Signals", "Skill Gap Drift", "Credential Transparency"],
  },
];

export const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: "capability-inference",
    slug: "capability-inference",
    title: "Capability Inference",
    subtitle: "Measuring capability under uncertainty.",
    thesis: "From static point scores to probabilistic belief states that update as non-stationary evidence arrives.",
    type: "Research System",
    areaId: "ai-systems",
    areaName: "AI Systems & Human Capability",
    year: 2026,
    status: "active",
    leadAuthor: "Daniel Mahandana",
    coAuthors: ["Narvin M.", "Thabang K."],
    abstract:
      "Traditional assessment systems collapse multi-dimensional human competence into a single static score. We show that capability is fundamentally latent and non-stationary, best represented as an online Bayesian belief distribution P(θ | E) parameterized by Beta-Binomial conjugate dynamics with temporal drift compensation.",
    keyQuestion: "How should we represent what we know about someone's capability when our evidence is sparse, noisy, and incomplete?",
    evidenceType: ["Assessments", "Work History", "Project Artefacts", "Peer Evaluations"],
    systemLink: "/systems#bayesian-kernel",
    paperLink: "/publications#capability-inference-2026",
    codeLink: "https://github.com/Danielmahandana/capability-compass",
    featuredOrder: 1,
  },
  {
    id: "skills-intelligence",
    slug: "skills-intelligence",
    title: "Skills Intelligence",
    subtitle: "Understanding what people can do from unstructured evidence.",
    thesis: "Bridging free-form resumes and occupational ontologies through contextual token extraction and hierarchical graph projections.",
    type: "Research System",
    areaId: "data-intelligence",
    areaName: "Data & Intelligence",
    year: 2026,
    status: "active",
    leadAuthor: "Daniel Mahandana",
    coAuthors: ["Systems Lab Group"],
    abstract:
      "Free-form CVs and vocational certificates contain rich latent signals that conventional keyword matching fails to capture. We develop an entity-extraction and graph-alignment architecture that maps natural language experience to standardized international taxonomies (ESCO/OFO) with calibrated confidence.",
    keyQuestion: "Can structural competency graphs recover genuine practitioner capabilities without succumbing to job-title ambiguity?",
    evidenceType: ["Unstructured CVs", "Course Syllabi", "National Qualification Frameworks"],
    systemLink: "/systems#skills-parser",
    paperLink: "/publications#skills-intelligence-tvet-2026",
    codeLink: "https://github.com/Danielmahandana/capability-compass",
    featuredOrder: 2,
  },
  {
    id: "cognitive-assessment",
    slug: "cognitive-assessment",
    title: "Cognitive Assessment Engine",
    subtitle: "Designing computational systems that interact with human reasoning.",
    thesis: "Adaptive item-response selection via maximum Fisher information gain to minimize assessment burden while maximizing precision.",
    type: "Research System",
    areaId: "human-capability",
    areaName: "Human Capability",
    year: 2026,
    status: "active",
    leadAuthor: "Systems Engineering Team",
    coAuthors: ["Daniel Mahandana"],
    abstract:
      "Fixed-length examinations subject candidates to uninformative questions. Our adaptive engine dynamically selects evaluation challenges based on current posterior variance, converging to stable capability bounds in 42% fewer observations.",
    keyQuestion: "How can test instruments dynamically self-optimize to extract the highest information gain per interaction?",
    evidenceType: ["Item Response Logs", "Interactive Problem Solving", "Time-to-Resolve Latencies"],
    systemLink: "/systems#adaptive-cat",
    paperLink: "/publications#adaptive-measurement-2026",
    featuredOrder: 3,
  },
  {
    id: "synthetic-drift-benchmark",
    slug: "synthetic-drift-benchmark",
    title: "Synthetic Drift Benchmark",
    subtitle: "Evaluating tracking performance under non-stationary skill decay.",
    thesis: "A reproducible simulation harness comparing Exponential Moving Averages against Bayesian belief decay under shock transitions.",
    type: "Benchmark",
    areaId: "ai-systems",
    areaName: "AI Systems",
    year: 2025,
    status: "published",
    leadAuthor: "Daniel Mahandana",
    coAuthors: ["Narvin M."],
    abstract:
      "Skills decay, evolve, and undergo sudden step-changes. We construct an open synthetic benchmark replicating career transitions and measure recovery latency between heuristic smoothing and conjugate Bayesian estimation.",
    keyQuestion: "When evidence contradicts a strong historical prior, how fast does an estimator detect genuine regime shift versus temporary noise?",
    evidenceType: ["Synthetic Traces (N=10,000)", "Monte Carlo Drift Scenarios"],
    paperLink: "/publications#drift-benchmark-2025",
  },
  {
    id: "tvet-labour-radar",
    slug: "tvet-labour-radar",
    title: "TVET Labour Market Radar",
    subtitle: "Mapping vocational curriculum outputs against industrial vacancy signals.",
    thesis: "Empirical quantification of misalignment between South African TVET college curricula and real-time employer demand.",
    type: "Technical Report",
    areaId: "labour-markets",
    areaName: "Labour Markets",
    year: 2026,
    status: "exploratory",
    leadAuthor: "Research Group",
    coAuthors: ["Daniel Mahandana"],
    abstract:
      "Combining public sector vocational enrolment records with scraped national hiring postings, we compute topological distance metrics showing a 3.4-year lag between emerging technical skills and institutional accredited syllabus updates.",
    keyQuestion: "Where do traditional accreditation pipelines break down in fast-evolving technical trades?",
    evidenceType: ["Curriculum Frameworks", "Online Job Postings", "OFO Gazette Revisions"],
    paperLink: "/publications#tvet-gap-2026",
  },
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "pub-01",
    slug: "capability-inference-2026",
    title: "Probabilistic Modelling of Latent Human Capability from Sparse Observation Streams",
    authors: ["Daniel Mahandana", "Narvin M.", "Thabang K."],
    venue: "Darkroom Systems Engineering Technical Reports (PS-TR-2026-01)",
    year: 2026,
    type: "Technical Report",
    abstract:
      "We formalize capability estimation as an online Bayesian filtering problem over non-stationary evidence streams. By representing capability belief states as Beta distributions B(α, β) coupled with an entropy-regularized pseudo-count discount factor, we avoid the catastrophic score lock-in observed in conventional moving averages while retaining bounded variance under small sample regimes.",
    pdfUrl: "#",
    codeUrl: "https://github.com/Danielmahandana/capability-compass",
    datasetUrl: "#",
    topics: ["Probabilistic Modelling", "Bayesian Inference", "Capability Measurement"],
    bibtex: `@techreport{mahandana2026probabilistic,
  author    = {Mahandana, Daniel and M., Narvin and K., Thabang},
  title     = {Probabilistic Modelling of Latent Human Capability from Sparse Observation Streams},
  institution = {Capability Compass Research Lab},
  year      = {2026},
  number    = {PS-TR-2026-01},
  url       = {https://capability-compass.lovable.app/research/capability-inference}
}`,
  },
  {
    id: "pub-02",
    slug: "skills-intelligence-tvet-2026",
    title: "Skills Intelligence in TVET Ecosystems: Contextual Extraction and Standardized Ontologies",
    authors: ["Daniel Mahandana", "Systems Lab Group"],
    venue: "Working Paper in Computational Labour Economics",
    year: 2026,
    type: "Working Paper",
    abstract:
      "Bridging unstructured vocational qualifications and occupational classifications (ESCO, OFO) in developing labour markets. We introduce a fine-tuned token classifier combined with hierarchical semantic graph projection that resolves ambiguity in occupational designations across technical trades.",
    pdfUrl: "#",
    codeUrl: "https://github.com/Danielmahandana/capability-compass",
    topics: ["Skills Taxonomies", "NLP", "TVET", "OFO/ESCO"],
    bibtex: `@article{mahandana2026skillsintelligence,
  author  = {Mahandana, Daniel and Systems Lab Group},
  title   = {Skills Intelligence in TVET Ecosystems: Contextual Extraction and Standardized Ontologies},
  journal = {Capability Compass Working Papers},
  year    = {2026},
  volume  = {2},
  number  = {1}
}`,
  },
  {
    id: "pub-03",
    slug: "adaptive-measurement-2026",
    title: "Adaptive Measurement via Maximum Information-Gain Item Routing",
    authors: ["Systems Engineering Team", "Daniel Mahandana"],
    venue: "Technical Note on Measurement Engines",
    year: 2026,
    type: "Technical Report",
    abstract:
      "A pragmatic framework for computerized adaptive testing that combines Item Response Theory parameterization with real-time Bayesian posterior confidence bounds, achieving a 42% reduction in candidate testing time without loss of classification accuracy.",
    pdfUrl: "#",
    topics: ["Computerized Adaptive Testing", "Information Gain", "Item Response Theory"],
    bibtex: `@techreport{systems2026adaptive,
  author    = {Systems Engineering Team and Mahandana, Daniel},
  title     = {Adaptive Measurement via Maximum Information-Gain Item Routing},
  institution = {Capability Compass Research Lab},
  year      = {2026}
}`,
  },
  {
    id: "pub-04",
    slug: "drift-benchmark-2025",
    title: "Tracking Skill Obsolescence: A Comparative Study of Moving Average and Bayesian Estimators",
    authors: ["Daniel Mahandana", "Narvin M."],
    venue: "Computational Systems & Learning Analytics Research Archive",
    year: 2025,
    type: "Preprint",
    abstract:
      "Empirical evaluation of 10,000 synthetic practitioner trajectories subject to skill decay, domain transition, and burst evidence. We delineate the mathematical conditions under which Exponential Moving Averages systematically under-represent uncertainty.",
    pdfUrl: "#",
    codeUrl: "https://github.com/Danielmahandana/capability-compass",
    topics: ["Skill Decay", "Benchmarks", "Monte Carlo"],
    bibtex: `@article{mahandana2025drift,
  author  = {Mahandana, Daniel and M., Narvin},
  title   = {Tracking Skill Obsolescence: A Comparative Study of Moving Average and Bayesian Estimators},
  journal = {arXiv preprint arXiv:2511.08912},
  year    = {2025}
}`,
  },
];

export const LAB_NOTES: LabNote[] = [
  {
    id: "note-01",
    slug: "why-skill-taxonomies-break",
    title: "Why skill taxonomies break",
    date: "2026-09-04",
    formattedDate: "Sep 04, 2026",
    readTime: "5 min read",
    author: "Daniel Mahandana",
    tags: ["Ontologies", "ESCO", "Failure Modes"],
    excerpt: "Standardized taxonomies assume skills are discrete, orthogonal bricks. In actual production environments, skills are context-dependent assemblages.",
    contentParagraphs: [
      "Every major institutional effort to standardize competencies — from ESCO in Europe to the Organising Framework for Occupations (OFO) in South Africa — begins with a seductive promise: that human work can be mapped as a taxonomy of distinct, hierarchical capabilities.",
      "In practice, this abstraction shatters the moment it encounters modern interdisciplinary work. A title like 'Data Analyst' in 2026 requires anything from SQL script writing to causal econometric modeling to distributed queue monitoring. Treating 'Python' as a uniform skill brick ignores whether the practitioner writes one-off Jupyter notebooks or architected real-time asynchronous streaming pipelines.",
      "Our research suggests that instead of static leaf nodes, capability should be represented as a probabilistic manifold — where evidence from projects, tool usage, and peer assessments continuously positions an individual in a dense capability space.",
    ],
  },
  {
    id: "note-02",
    slug: "what-a-cv-actually-tells-us",
    title: "What a CV actually tells us",
    date: "2026-08-28",
    formattedDate: "Aug 28, 2026",
    readTime: "4 min read",
    author: "Daniel Mahandana",
    tags: ["CV Parsing", "Signal vs Noise", "NLP"],
    excerpt: "A CV is not an objective log of capability; it is an aspirational marketing document filtered through occupational vocabulary norms.",
    contentParagraphs: [
      "When engineers build 'AI resume parsers', they routinely make an elementary category error: they treat resume text as ground-truth observations of skill rather than as self-reported signals with high variance and deliberate inflation.",
      "In our parsing experiments over 4,800 vocational CVs, phrases like 'managed cross-functional delivery' frequently correlated with administrative coordination rather than operational execution. Without grounding resume tokens in verifiable artefact evidence (code repositories, technical certifications, work outputs), text matching alone produces misleading confidence.",
      "The goal of our skills intelligence engine is not to believe the CV, but to construct a calibrated prior that explicitly tracks its own epistemic uncertainty.",
    ],
  },
  {
    id: "note-03",
    slug: "from-embeddings-to-capability",
    title: "From embeddings to capability",
    date: "2026-08-19",
    formattedDate: "Aug 19, 2026",
    readTime: "6 min read",
    author: "Systems Lab",
    tags: ["Representations", "Latent Space", "Bayesian"],
    excerpt: "Cosine similarity between skill vectors tells you whether two phrases sound alike, not whether a human can perform the underlying task.",
    contentParagraphs: [
      "Vector embeddings from large transformer models have revolutionized semantic search, but they make poor capability models when left unmodified. Two descriptions can be semantically adjacent (e.g. 'Kubernetes cluster operator' and 'Kubernetes architecture design') while requiring fundamentally different depths of cognitive mastery.",
      "We separate linguistic similarity from proficiency belief. Semantic embeddings are used solely for lexical canonicalization; capability is then modeled separately through a Bayesian belief state over operational mastery.",
    ],
  },
  {
    id: "note-04",
    slug: "designing-better-cognitive-assessments",
    title: "Designing better cognitive assessments",
    date: "2026-08-11",
    formattedDate: "Aug 11, 2026",
    readTime: "5 min read",
    author: "Systems Lab",
    tags: ["Psychometrics", "CAT", "Adaptive"],
    excerpt: "Why fixed 50-question tests waste human time and generate noisy bounds around candidate proficiency.",
    contentParagraphs: [
      "Standard tests present identical question sequences to candidates whose true abilities lie at opposite extremes of the distribution. A senior engineer spends 20 minutes answering introductory syntax questions that provide essentially zero information gain.",
      "By computing the Fisher information of each remaining item in real time relative to the candidate's current posterior mean and variance, our adaptive engine converges to narrow capability confidence intervals in less than half the time of standard exams.",
    ],
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Daniel Mahandana",
    role: "Lead Researcher · AI Systems & Probabilistic Modelling",
    discipline: "RESEARCH",
    bio: "Focuses on probabilistic representations of human capability, online Bayesian inference, and NLP systems bridging African TVET qualifications with global labour-market signals.",
    researchInterests: [
      "Probabilistic Modelling",
      "Skills Intelligence",
      "Bayesian Inference",
      "TVET Systems",
    ],
    github: "https://github.com/Danielmahandana",
    linkedin: "https://linkedin.com/in/danielmahandana",
    avatarInitials: "DM",
  },
  {
    name: "Narvin M.",
    role: "Systems & Platform Engineer",
    discipline: "ENGINEERING",
    bio: "Architects high-performance inference pipelines, data infrastructure, and real-time visualization engines for exploratory research instruments.",
    researchInterests: [
      "Distributed Data Systems",
      "Real-time Inference",
      "Interactive Visualization",
    ],
    github: "https://github.com",
    avatarInitials: "NM",
  },
  {
    name: "Thabang K.",
    role: "Data Scientist · Labour Market Analytics",
    discipline: "DATA",
    bio: "Researches occupational taxonomies, natural language extraction pipelines, and structural skill gap trajectories across Southern African employment markets.",
    researchInterests: [
      "Labour Economics",
      "Entity Extraction",
      "Taxonomy Alignment",
    ],
    linkedin: "https://linkedin.com",
    avatarInitials: "TK",
  },
];

export const NOW_ENTRIES = [
  {
    id: "now-01",
    number: "01",
    title: "Probabilistic capability inference under non-stationary drift",
    status: "Active experimentation on Beta prior decay rates",
  },
  {
    id: "now-02",
    number: "02",
    title: "Skill representations beyond conventional job titles",
    status: "Evaluating graph embeddings on ESCO and South African OFO codes",
  },
  {
    id: "now-03",
    number: "03",
    title: "Small reasoning models for structured vocational extraction",
    status: "Benchmarking 7B parameter models for zero-shot qualification parsing",
  },
  {
    id: "now-04",
    number: "04",
    title: "Interactive computerized adaptive capability assessment",
    status: "Piloting real-time Fisher information item selection with 42% fewer queries",
  },
];
