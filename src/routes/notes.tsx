import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { LAB_NOTES, LabNote } from "@/lib/researchData";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Lab Notebook & Notes — Capability Compass Lab" },
      {
        name: "description",
        content:
          "Short pieces of ongoing thinking, field notes, and exploratory reflections from the Capability Compass research lab.",
      },
      { property: "og:title", content: "Lab Notebook & Notes — Capability Compass Lab" },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const [selectedNote, setSelectedNote] = useState<LabNote | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Header */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-12 sm:pt-16 pb-8 border-b border-border">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">LAB NOTEBOOK</span>
            <span>&middot;</span>
            <span>THINKING IN PROGRESS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Notes &amp; Dispatches
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            Short, informal essays documenting theoretical dead-ends, empirical surprises, and evolving perspectives on skills intelligence and capability measurement.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
        {selectedNote ? (
          /* Single Note Reader View */
          <div className="space-y-8 animate-in fade-in duration-150">
            <button
              type="button"
              onClick={() => setSelectedNote(null)}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to all notes</span>
            </button>

            <article className="space-y-6 max-w-2xl">
              <div className="space-y-2 font-mono text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span>{selectedNote.formattedDate}</span>
                  <span>&middot;</span>
                  <span>{selectedNote.readTime}</span>
                  <span>&middot;</span>
                  <span>By {selectedNote.author}</span>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  {selectedNote.tags.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-surface border border-border text-[0.65rem]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold font-sans tracking-tight text-foreground">
                {selectedNote.title}
              </h2>

              <p className="text-base sm:text-lg font-sans text-foreground/80 italic border-l-2 border-[#10A37F] pl-4 py-1">
                "{selectedNote.excerpt}"
              </p>

              <div className="space-y-4 font-sans text-sm sm:text-base leading-relaxed text-foreground/90 pt-4 border-t border-border">
                {selectedNote.contentParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </article>

            <div className="pt-8 border-t border-border">
              <button
                type="button"
                onClick={() => setSelectedNote(null)}
                className="btn-text"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Return to Notebook Index</span>
              </button>
            </div>
          </div>
        ) : (
          /* Notes Index List */
          <div className="divide-y divide-border border-y border-border">
            {LAB_NOTES.map((note) => (
              <div
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className="py-8 group cursor-pointer hover:bg-surface/30 transition-colors px-3 rounded-sm space-y-3"
              >
                <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-[#10A37F]" />
                    <span>{note.formattedDate}</span>
                    <span>&middot;</span>
                    <span>{note.readTime}</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5">
                    {note.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-surface border border-border text-[0.62rem]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-sans text-foreground group-hover:text-[#10A37F] transition-colors">
                    {note.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {note.excerpt}
                  </p>
                </div>

                <div className="pt-1 flex items-center gap-1 font-mono text-xs text-foreground group-hover:text-[#10A37F] transition-colors">
                  <span>Read full note</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
