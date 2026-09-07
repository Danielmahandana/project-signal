import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PUBLICATIONS, Publication } from "@/lib/researchData";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications & Reports — Capability Compass Lab" },
      {
        name: "description",
        content:
          "Preprints, technical reports, and working papers on Bayesian capability inference, competency ontologies, and adaptive testing.",
      },
      { property: "og:title", content: "Publications & Reports — Capability Compass Lab" },
    ],
  }),
  component: PublicationsPage,
});

function PublicationsPage() {
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});
  const [copiedBibtexId, setCopiedBibtexId] = useState<string | null>(null);

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyBibtex = (pub: Publication) => {
    navigator.clipboard.writeText(pub.bibtex);
    setCopiedBibtexId(pub.id);
    setTimeout(() => setCopiedBibtexId(null), 2000);
  };

  const publicationsByYear = PUBLICATIONS.reduce<Record<number, Publication[]>>((acc, pub) => {
    if (!acc[pub.year]) acc[pub.year] = [];
    acc[pub.year].push(pub);
    return acc;
  }, {});

  const sortedYears = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-10 border-b border-border/40">
        <div className="max-w-3xl space-y-4">
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Scholarly Output &middot; Technical Reports &amp; Papers
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground font-sans">
            Publications
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-sans">
            Methodology notes, preprints, and open technical reports released by the Capability Compass research lab.
          </p>
        </div>
      </section>

      {/* Publications by Year (Unboxed, Pure Hairline Dividers) */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {sortedYears.map((year) => (
          <section key={year} className="space-y-6">
            <div className="flex items-baseline space-x-4 border-b border-border/40 pb-2 font-mono">
              <span className="text-3xl font-bold text-foreground">{year}</span>
              <span className="text-xs text-muted-foreground">
                ({publicationsByYear[year].length} publications)
              </span>
            </div>

            <div className="divide-y divide-border/40">
              {publicationsByYear[year].map((pub) => {
                const isExpanded = !!expandedAbstracts[pub.id];
                const isCopied = copiedBibtexId === pub.id;

                return (
                  <article key={pub.id} className="py-10 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted-foreground">
                      <div>
                        <span className="text-foreground uppercase tracking-wider font-semibold">
                          {pub.type}
                        </span>
                        <span> &middot; </span>
                        <span>{pub.venue}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[0.68rem] text-muted-foreground">
                        {pub.topics.join(" · ")}
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold font-sans text-foreground tracking-tight">
                      {pub.title}
                    </h2>

                    <p className="font-mono text-xs text-muted-foreground">
                      {pub.authors.join(", ")}
                    </p>

                    {/* Expandable Abstract */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => toggleAbstract(pub.id)}
                        className="font-mono text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        {isExpanded ? "Hide abstract ↑" : "Read abstract ↓"}
                      </button>

                      {isExpanded && (
                        <div className="mt-3 p-4 bg-surface/50 border-l-2 border-[#10A37F] text-sm font-sans text-foreground/90 leading-relaxed animate-in fade-in duration-150 max-w-3xl">
                          {pub.abstract}
                        </div>
                      )}
                    </div>

                    {/* Action Links: BibTeX, PDF, Code */}
                    <div className="flex flex-wrap items-center space-x-6 pt-3 font-mono text-xs text-muted-foreground">
                      <button
                        type="button"
                        onClick={() => copyBibtex(pub)}
                        className="text-foreground hover:text-[#10A37F] cursor-pointer"
                      >
                        {isCopied ? "BibTeX copied" : "Copy BibTeX &rarr;"}
                      </button>

                      {pub.codeUrl && (
                        <a
                          href={pub.codeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-foreground"
                        >
                          Code repository &rarr;
                        </a>
                      )}

                      {pub.datasetUrl && (
                        <a
                          href={pub.datasetUrl}
                          className="hover:text-foreground"
                        >
                          Dataset &rarr;
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
