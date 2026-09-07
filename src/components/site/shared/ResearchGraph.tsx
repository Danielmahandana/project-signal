import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface GraphNode {
  id: string;
  label: string;
  category: string;
  x: number;
  y: number;
  link: string;
  summary: string;
  status: string;
}

const NODES: GraphNode[] = [
  {
    id: "capability",
    label: "Capability Inference",
    category: "AI Systems",
    x: 50,
    y: 18,
    link: "/research/capability-inference",
    summary: "Probabilistic modelling of latent competency states under continuous drift.",
    status: "ACTIVE EXPERIMENT",
  },
  {
    id: "assessment",
    label: "Adaptive Assessment",
    category: "Cognitive Engines",
    x: 22,
    y: 52,
    link: "/research/cognitive-assessment",
    summary: "Dynamic item routing via Fisher information to maximize testing efficiency.",
    status: "ACTIVE PILOT",
  },
  {
    id: "skills",
    label: "Skills Intelligence",
    category: "Data & Topologies",
    x: 50,
    y: 52,
    link: "/research/skills-intelligence",
    summary: "Unstructured resume token extraction projected onto ESCO & OFO ontologies.",
    status: "ACTIVE SYSTEM",
  },
  {
    id: "models",
    label: "Inference Kernel",
    category: "Infrastructure",
    x: 78,
    y: 52,
    link: "/systems",
    summary: "Conjugate Beta-Binomial online update kernel with non-stationary discount.",
    status: "PRODUCTION ENGINE",
  },
  {
    id: "labour",
    label: "Labour Market Topology",
    category: "Macro Analytics",
    x: 50,
    y: 84,
    link: "/research",
    summary: "TVET qualification mismatch tracking across national employment gazettes.",
    status: "FIELD RESEARCH",
  },
];

const EDGES = [
  { from: "capability", to: "assessment", label: "Priors & Uncertainty" },
  { from: "capability", to: "skills", label: "Latent Parameters" },
  { from: "capability", to: "models", label: "Online Bayes Filter" },
  { from: "skills", to: "labour", label: "OFO Competencies" },
  { from: "assessment", to: "labour", label: "Accreditation Signals" },
  { from: "models", to: "labour", label: "Drift Calibration" },
];

export function ResearchGraph() {
  const [activeNode, setActiveNode] = useState<GraphNode>(NODES[0]);

  return (
    <div className="rounded-lg border border-border bg-card p-5 sm:p-7 shadow-xs font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4 mb-5">
        <div>
          <span className="eyebrow text-[0.65rem] text-muted-foreground flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-[#10A37F]" />
            <span>INTERACTIVE RESEARCH ECOSYSTEM</span>
          </span>
          <h3 className="text-base sm:text-lg font-semibold text-foreground font-sans mt-0.5">
            Navigable Research Topology
          </h3>
        </div>
        <div className="text-xs text-muted-foreground">
          Click any node to explore the research stream
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Interactive SVG Canvas */}
        <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] w-full bg-surface/60 rounded-md border border-border overflow-hidden select-none p-4">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Edges */}
            {EDGES.map((edge, idx) => {
              const source = NODES.find((n) => n.id === edge.from)!;
              const target = NODES.find((n) => n.id === edge.to)!;
              const isHighlighted =
                activeNode.id === edge.from || activeNode.id === edge.to;

              return (
                <g key={idx}>
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={isHighlighted ? "#10A37F" : "var(--color-border)"}
                    strokeWidth={isHighlighted ? "1" : "0.5"}
                    strokeDasharray={isHighlighted ? "none" : "1,1"}
                    className="transition-colors duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* HTML Nodes positioned over the SVG */}
          {NODES.map((node) => {
            const isSelected = activeNode.id === node.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNode(node)}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className={`absolute px-2.5 sm:px-3 py-1.5 rounded text-[0.65rem] sm:text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer text-center whitespace-nowrap shadow-xs ${
                  isSelected
                    ? "bg-[#10A37F] text-white scale-105 ring-4 ring-[#10A37F]/20 font-bold z-20"
                    : "bg-card text-foreground hover:bg-surface border border-border z-10 hover:border-muted-foreground"
                }`}
              >
                <div>{node.label}</div>
                <div className="text-[0.55rem] opacity-80 font-normal hidden sm:block">
                  {node.category}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Node Inspector Drawer */}
        <div className="lg:col-span-4 p-4 sm:p-5 rounded-md border border-border bg-surface/70 space-y-3.5">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <span className="eyebrow text-[0.62rem] text-[#10A37F] font-bold">
              {activeNode.status}
            </span>
            <span className="text-[0.62rem] text-muted-foreground">{activeNode.category}</span>
          </div>

          <div className="space-y-1">
            <h4 className="font-sans font-bold text-base text-foreground">
              {activeNode.label}
            </h4>
            <p className="font-sans text-xs text-muted-foreground leading-relaxed">
              {activeNode.summary}
            </p>
          </div>

          <div className="pt-2 border-t border-border">
            <Link
              to={activeNode.link}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-foreground text-background text-xs font-medium hover:opacity-90 transition-opacity"
            >
              <span>Explore Research Stream</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
