import { useState } from "react";

interface SamplePreset {
  id: string;
  name: string;
  rawText: string;
  extractedEntities: { text: string; tag: string }[];
  escoCompetencies: { code: string; label: string; match: number }[];
  occupations: { title: string; matchPct: number; matchReason: string }[];
}

const PRESETS: SamplePreset[] = [
  {
    id: "supervisor",
    name: "Production Supervisor",
    rawText:
      "I worked as a production supervisor for three years coordinating factory shifts, scheduling preventative machinery maintenance, enforcing ISO-9001 compliance, and training junior operators on PLC safety protocols.",
    extractedEntities: [
      { text: "production supervisor", tag: "OCCUPATION" },
      { text: "factory shifts", tag: "ORGANIZATION" },
      { text: "machinery maintenance", tag: "TECHNICAL_TASK" },
      { text: "ISO-9001 compliance", tag: "STANDARD" },
      { text: "PLC safety protocols", tag: "HARD_SKILL" },
      { text: "training junior operators", tag: "LEADERSHIP" },
    ],
    escoCompetencies: [
      { code: "ESCO-3122.1", label: "Supervise manufacturing production", match: 94 },
      { code: "ESCO-3115.4", label: "Industrial maintenance scheduling", match: 88 },
      { code: "ESCO-2422.3", label: "Quality management systems (ISO)", match: 82 },
      { code: "OFO-312201", label: "Manufacturing operations management", match: 91 },
    ],
    occupations: [
      { title: "Manufacturing Production Supervisor (OFO 312201)", matchPct: 92, matchReason: "High correlation on shift management & safety compliance" },
      { title: "Industrial Operations Coordinator", matchPct: 84, matchReason: "Substantial overlap in maintenance scheduling" },
      { title: "Quality Assurance Specialist", matchPct: 76, matchReason: "Partial qualification via ISO-9001 standards" },
    ],
  },
  {
    id: "data-eng",
    name: "Data & Systems Engineer",
    rawText:
      "Designed and deployed streaming ETL pipelines using Apache Kafka and PySpark. Implemented automated data quality validation with dbt, managed PostgreSQL cluster partitioning, and configured Prometheus alerting.",
    extractedEntities: [
      { text: "Apache Kafka", tag: "TOOL" },
      { text: "PySpark", tag: "FRAMEWORK" },
      { text: "streaming ETL pipelines", tag: "CORE_SKILL" },
      { text: "data quality validation", tag: "PROCESS" },
      { text: "PostgreSQL cluster partitioning", tag: "DATABASE" },
      { text: "Prometheus alerting", tag: "OBSERVABILITY" },
    ],
    escoCompetencies: [
      { code: "ESCO-2511.2", label: "Develop big data data pipelines", match: 96 },
      { code: "ESCO-2521.1", label: "Database clustering & optimization", match: 89 },
      { code: "ESCO-2512.4", label: "Automated telemetry and monitoring", match: 85 },
      { code: "OFO-251203", label: "Data Engineering Architecture", match: 94 },
    ],
    occupations: [
      { title: "Data Systems Engineer (OFO 251203)", matchPct: 95, matchReason: "Direct match on streaming data architecture" },
      { title: "Backend Systems Architect", matchPct: 83, matchReason: "High overlap in database performance & observability" },
      { title: "Site Reliability Engineer", matchPct: 74, matchReason: "Infrastructure & Prometheus monitoring match" },
    ],
  },
  {
    id: "tvet-electrician",
    name: "TVET Electrical Technician",
    rawText:
      "Completed National Certificate (Vocational) Level 4 in Electrical Infrastructure Construction. Diagnosed single-phase and three-phase motor faults, wired industrial distribution boards according to SANS 10142, and conducted Earth leakage tests.",
    extractedEntities: [
      { text: "NC(V) Level 4", tag: "QUALIFICATION" },
      { text: "Electrical Infrastructure", tag: "DOMAIN" },
      { text: "three-phase motor faults", tag: "DIAGNOSTICS" },
      { text: "industrial distribution boards", tag: "INSTALLATION" },
      { text: "SANS 10142", tag: "REGULATORY_CODE" },
      { text: "Earth leakage tests", tag: "VERIFICATION" },
    ],
    escoCompetencies: [
      { code: "ESCO-7412.1", label: "Electrical motor fault diagnosis", match: 95 },
      { code: "ESCO-7411.2", label: "Install industrial switchboards", match: 91 },
      { code: "OFO-671101", label: "Electrician (General)", match: 96 },
      { code: "OFO-671201", label: "Industrial Electrical Technician", match: 93 },
    ],
    occupations: [
      { title: "Industrial Electrician (OFO 671101)", matchPct: 96, matchReason: "Direct alignment with SANS 10142 wireman's license syllabus" },
      { title: "Motor Control Technician", matchPct: 89, matchReason: "Motor diagnostic tests and wiring competencies" },
      { title: "Maintenance Electrician", matchPct: 82, matchReason: "Three-phase fault isolation capability" },
    ],
  },
];

export function SkillsPipelineWidget() {
  const [selectedPreset, setSelectedPreset] = useState<SamplePreset>(PRESETS[0]);
  const [activeStep, setActiveStep] = useState<number>(3);

  return (
    <div className="border-t border-b border-border/40 py-8 font-mono text-xs space-y-8">
      {/* Header & Sample Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-border/40 pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">
            Transformation Pipeline
          </span>
          <span className="text-foreground font-sans font-semibold text-sm">
            Unstructured Experience &rarr; Competency Projection
          </span>
        </div>
        <div className="flex items-center space-x-3 text-xs">
          <span className="text-muted-foreground">Sample:</span>
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedPreset(p)}
              className={`transition-colors cursor-pointer py-0.5 ${
                selectedPreset.id === p.id
                  ? "text-foreground font-semibold border-b border-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline Stages (OpenAI Clean Text Tabs) */}
      <div className="flex items-center space-x-6 text-xs border-b border-border/40 pb-3 overflow-x-auto">
        {[
          { step: 0, label: "01 Input Text" },
          { step: 1, label: "02 Entity Extraction" },
          { step: 2, label: "03 Taxonomy Alignment" },
          { step: 3, label: "04 Latent Occupations" },
        ].map((s) => (
          <button
            key={s.step}
            type="button"
            onClick={() => setActiveStep(s.step)}
            className={`transition-colors cursor-pointer whitespace-nowrap py-0.5 ${
              activeStep === s.step
                ? "text-foreground font-semibold border-b border-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Pipeline Content Area */}
      <div className="space-y-6">
        {/* Step 01: Raw Text */}
        <div className="space-y-2">
          <span className="text-muted-foreground uppercase text-[0.65rem] tracking-wider block">
            01 / Raw Unstructured Text Input
          </span>
          <p className="font-sans text-sm text-foreground/90 leading-relaxed italic max-w-3xl">
            "{selectedPreset.rawText}"
          </p>
        </div>

        {/* Step 02: Entity Extraction */}
        {activeStep >= 1 && (
          <div className="space-y-3 pt-6 border-t border-border/40 animate-in fade-in duration-150">
            <span className="text-muted-foreground uppercase text-[0.65rem] tracking-wider block">
              02 / Contextual Entity Extraction
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedPreset.extractedEntities.map((ent, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs text-foreground border-b border-border/60 pb-0.5"
                >
                  {ent.text} <span className="text-muted-foreground text-[0.65rem]">({ent.tag})</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Step 03: Competency Alignment */}
        {activeStep >= 2 && (
          <div className="space-y-3 pt-6 border-t border-border/40 animate-in fade-in duration-150">
            <span className="text-muted-foreground uppercase text-[0.65rem] tracking-wider block">
              03 / Alignment with Standardized Competencies (ESCO &middot; OFO)
            </span>
            <div className="divide-y divide-border/40 max-w-3xl">
              {selectedPreset.escoCompetencies.map((comp, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[0.65rem] text-[#10A37F] block">{comp.code}</span>
                    <span className="text-sm font-sans font-medium text-foreground">{comp.label}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-foreground pl-4">
                    {comp.match}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 04: Occupational Probability */}
        {activeStep >= 3 && (
          <div className="space-y-4 pt-6 border-t border-border/40 animate-in fade-in duration-150">
            <span className="text-muted-foreground uppercase text-[0.65rem] tracking-wider block">
              04 / Latent Occupational Inference
            </span>
            <div className="space-y-4 max-w-3xl">
              {selectedPreset.occupations.map((occ, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-semibold text-sm text-foreground">{occ.title}</span>
                    <span className="font-mono text-xs text-[#10A37F] font-bold">{occ.matchPct}%</span>
                  </div>
                  <div className="h-1 w-full bg-border/40">
                    <div
                      className="h-full bg-[#10A37F]"
                      style={{ width: `${occ.matchPct}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground font-sans">{occ.matchReason}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
