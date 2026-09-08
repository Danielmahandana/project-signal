import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RESEARCH_PROJECTS } from "@/lib/researchData";
import { ResearchRow } from "@/components/sota/ResearchRow";
import { Folder } from "@/components/sota/Folder";
import { ScrollReveal } from "@/components/sota/ScrollReveal";

export const Route = createFileRoute("/research/")({
  head: () => ({
    meta: [
      { title: "Research Directory — THE SOTA LAB" },
      {
        name: "description",
        content:
          "Index of state of the art research investigations, probabilistic models, and technical reports developed by The Sota Lab.",
      },
      { property: "og:title", content: "Research Directory — THE SOTA LAB" },
    ],
  }),
  component: ResearchIndexPage,
});

function ResearchIndexPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");

  const filteredProjects =
    selectedFilter === "ALL"
      ? RESEARCH_PROJECTS
      : RESEARCH_PROJECTS.filter((p) => {
          if (selectedFilter === "AI_SYSTEMS") return p.areaId === "ai-systems";
          if (selectedFilter === "DATA") return p.areaId === "data-intelligence";
          if (selectedFilter === "HUMAN") return p.areaId === "human-capability";
          if (selectedFilter === "LABOUR") return p.areaId === "labour-markets";
          return true;
        });

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Editorial Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 border-b border-border/40">
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center space-x-2 font-mono text-xs text-muted-foreground uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>THE SOTA LAB &middot; RESEARCH ARCHIVE &middot; {RESEARCH_PROJECTS.length} INVESTIGATIONS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial-serif tracking-tight text-foreground leading-[1.05]">
            Research Directory
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed font-sans font-normal max-w-3xl">
            We investigate problems at the intersection of online Bayesian capability inference, structured competency topologies, and adaptive cognitive instruments.
          </p>
        </div>

        {/* Discipline Folders Showcase */}
        <div className="mt-14 pt-8 border-t border-border/40">
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-6">
            Disciplines &amp; Collections
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
            <div onClick={() => setSelectedFilter("AI_SYSTEMS")} className="cursor-pointer">
              <Folder
                size={0.95}
                color="#171920"
                label="AI Systems"
                category="Inference Kernels"
                count={3}
              />
            </div>
            <div onClick={() => setSelectedFilter("DATA")} className="cursor-pointer">
              <Folder
                size={0.95}
                color="#1b1e26"
                label="Data Topologies"
                category="Ontologies & NLP"
                count={4}
              />
            </div>
            <div onClick={() => setSelectedFilter("HUMAN")} className="cursor-pointer">
              <Folder
                size={0.95}
                color="#1e222d"
                label="Human Capability"
                category="Adaptive CAT"
                count={3}
              />
            </div>
            <div onClick={() => setSelectedFilter("LABOUR")} className="cursor-pointer">
              <Folder
                size={0.95}
                color="#151a22"
                label="Labour Markets"
                category="TVET Cohorts"
                count={2}
              />
            </div>
          </div>
        </div>

        {/* Minimalist Filter Bar */}
        <div className="mt-12 flex flex-wrap items-center gap-6 font-mono text-xs pt-6 border-t border-border/40">
          {[
            { id: "ALL", label: "All Areas" },
            { id: "AI_SYSTEMS", label: "AI Systems" },
            { id: "DATA", label: "Data Topologies" },
            { id: "HUMAN", label: "Human Capability" },
            { id: "LABOUR", label: "Labour Markets" },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedFilter(f.id)}
              className={`transition-colors cursor-pointer py-1 ${
                selectedFilter === f.id
                  ? "text-foreground font-semibold border-b-2 border-accent text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Directory List using SOTA ResearchRow */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <ScrollReveal variant="fade-up">
          <div className="divide-y divide-border/40 border-t border-border/40">
            {filteredProjects.map((project, idx) => {
              const numStr = String(idx + 1).padStart(2, "0");
              const link =
                project.slug === "capability-inference" ||
                project.slug === "skills-intelligence" ||
                project.slug === "cognitive-assessment"
                  ? `/research/${project.slug}`
                  : "/publications";

              // Pick associated imagery
              const imageSrc =
                project.slug === "capability-inference"
                  ? "/manifold.jpg"
                  : project.slug === "skills-intelligence"
                  ? "/topological-graph.jpg"
                  : project.slug === "cognitive-assessment"
                  ? "/cognitive-lens.jpg"
                  : project.slug === "tvet-labour-radar"
                  ? "/HH5V_XhXEAA3JfB.jpeg"
                  : "/new.jpeg";

              return (
                <ResearchRow
                  key={project.id}
                  number={numStr}
                  title={project.title}
                  category={project.areaName}
                  year={project.year}
                  status={project.status === "active" ? "Active" : project.status}
                  imageSrc={imageSrc}
                  linkTo={link}
                  leadAuthor={project.leadAuthor}
                />
              );
            })}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
