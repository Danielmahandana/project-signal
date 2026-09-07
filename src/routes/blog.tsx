import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LAB_NOTES, LabNote } from "@/lib/researchData";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Dispatches — Capability Compass Lab" },
      {
        name: "description",
        content:
          "Dispatches, essays, and engineering notes on probabilistic inference, skills taxonomies, and human capability measurement.",
      },
      { property: "og:title", content: "Blog & Dispatches — Capability Compass Lab" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [selectedTag, setSelectedTag] = useState<string>("ALL");
  const [readingNote, setReadingNote] = useState<LabNote | null>(null);

  const filteredNotes =
    selectedTag === "ALL"
      ? LAB_NOTES
      : LAB_NOTES.filter((n) =>
          n.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase()))
        );

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Editorial Header */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-16 sm:pt-24 pb-10 border-b border-border/40">
        <div className="space-y-4">
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Dispatches &amp; Essays
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl font-normal leading-relaxed">
            Ongoing thoughts, theoretical inquiries, and engineering notes from our researchers and engineers.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mt-10 flex flex-wrap items-center gap-4 font-mono text-xs pt-4 border-t border-border/40">
          {["ALL", "Ontologies", "CV Parsing", "Representations", "Psychometrics"].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSelectedTag(tag);
                setReadingNote(null);
              }}
              className={`transition-colors cursor-pointer py-1 ${
                selectedTag === tag
                  ? "text-foreground font-semibold border-b border-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Main Blog Surface */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        {readingNote ? (
          /* Reader View */
          <article className="max-w-3xl space-y-8 animate-in fade-in duration-150">
            <button
              type="button"
              onClick={() => setReadingNote(null)}
              className="font-mono text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            >
              &larr; Back to all dispatches
            </button>

            <div className="space-y-3">
              <div className="font-mono text-xs text-muted-foreground flex items-center gap-3">
                <span>{readingNote.formattedDate}</span>
                <span>&middot;</span>
                <span>{readingNote.readTime}</span>
                <span>&middot;</span>
                <span>By {readingNote.author}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground font-sans">
                {readingNote.title}
              </h2>
            </div>

            <p className="text-lg sm:text-xl font-sans text-foreground/80 leading-relaxed italic border-l-2 border-[#10A37F] pl-5 py-1">
              {readingNote.excerpt}
            </p>

            <div className="space-y-6 font-sans text-base sm:text-lg leading-relaxed text-foreground/90 pt-6 border-t border-border/40">
              {readingNote.contentParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="pt-10 border-t border-border/40">
              <button
                type="button"
                onClick={() => setReadingNote(null)}
                className="font-mono text-xs text-foreground hover:text-[#10A37F] cursor-pointer"
              >
                &larr; Back to all articles
              </button>
            </div>
          </article>
        ) : (
          /* Article List (OpenAI Style Vertical Editorial Rhythm) */
          <div className="divide-y divide-border/40">
            {filteredNotes.map((note) => (
              <article
                key={note.id}
                onClick={() => setReadingNote(note)}
                className="py-10 group cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                  <span>{note.formattedDate} &middot; {note.readTime}</span>
                  <div className="flex items-center gap-2">
                    {note.tags.map((t, idx) => (
                      <span key={idx} className="text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-sans text-foreground group-hover:text-[#10A37F] transition-colors tracking-tight">
                  {note.title}
                </h2>

                <p className="text-muted-foreground font-sans text-base leading-relaxed max-w-3xl">
                  {note.excerpt}
                </p>

                <div className="pt-2">
                  <span className="openai-link font-mono text-xs">
                    Read article &rarr;
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
