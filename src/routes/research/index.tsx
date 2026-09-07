import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RESEARCH_PROJECTS, ProjectStatus } from "@/lib/researchData";

export const Route = createFileRoute("/research/")({
  head: () => ({
    meta: [
      { title: "Research Directory — Capability Compass Lab" },
      {
        name: "description",
        content:
          "Index of research investigations and technical reports across AI systems, data topologies, and human capability.",
      },
      { property: "og:title", content: "Research Directory — Capability Compass Lab" },
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
      {/* Page Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-10 border-b border-border/40">
        <div className="max-w-3xl space-y-4">
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Research Directory &middot; {RESEARCH_PROJECTS.length} Investigations
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground font-sans">
            Research
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-sans">
            We investigate problems at the intersection of online Bayesian inference, data topologies, and human capability.
          </p>
        </div>

        {/* Minimalist Filter Bar */}
        <div className="mt-10 flex flex-wrap items-center space-x-6 font-mono text-xs pt-4 border-t border-border/40">
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
                  ? "text-foreground font-semibold border-b border-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Directory List (OpenAI Style: Clean Vertical Dividers, No Boxes) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="divide-y divide-border/40">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="py-10 group space-y-3"
            >
              <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <span className="text-foreground font-semibold">{project.year}</span>
                  <span>&middot;</span>
                  <span>{project.areaName}</span>
                </div>
                <span className="uppercase text-[0.68rem] tracking-wider">
                  {project.status === "active" ? "Active" : project.status}
                </span>
              </div>

              <div className="space-y-1 max-w-4xl">
                <h3 className="text-2xl sm:text-3xl font-bold font-sans text-foreground group-hover:text-[#10A37F] transition-colors tracking-tight">
                  {project.slug === "capability-inference" ||
                  project.slug === "skills-intelligence" ||
                  project.slug === "cognitive-assessment" ? (
                    <Link to={`/research/${project.slug}`}>
                      {project.title}
                    </Link>
                  ) : (
                    <span>{project.title}</span>
                  )}
                </h3>

                <p className="font-sans text-base text-muted-foreground leading-relaxed">
                  {project.thesis}
                </p>

                <div className="font-mono text-xs text-muted-foreground pt-1">
                  Lead: {project.leadAuthor}
                </div>
              </div>

              <div className="pt-2">
                {project.slug === "capability-inference" ||
                project.slug === "skills-intelligence" ||
                project.slug === "cognitive-assessment" ? (
                  <Link
                    to={`/research/${project.slug}`}
                    className="openai-link font-mono text-xs group-hover:text-[#10A37F]"
                  >
                    Read research &rarr;
                  </Link>
                ) : (
                  <Link
                    to="/publications"
                    className="openai-link font-mono text-xs text-muted-foreground hover:text-foreground"
                  >
                    Read technical report &rarr;
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
