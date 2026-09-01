import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  id,
  number,
  title,
  lede,
  stageTag,
  children,
}: {
  id?: string;
  number?: string;
  title: string;
  lede?: string;
  stageTag?: string;
  children?: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border py-10 sm:py-14 md:py-18">
      <Reveal>
        <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:px-6 md:grid-cols-[8rem_1fr] md:gap-8">
          <div className="eyebrow pt-1.5 flex flex-col gap-2">
            <span>{number}</span>
            {stageTag ? (
              <span className="inline-block rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.6rem] font-medium text-muted-foreground">
                {stageTag}
              </span>
            ) : null}
          </div>
          <div>
            <h2 className="text-xl font-semibold leading-snug sm:text-2xl md:text-[1.85rem] text-foreground tracking-tight">
              {title}
            </h2>
            {lede ? (
              <p className="mt-2.5 max-w-2xl text-base text-muted-foreground leading-relaxed">
                {lede}
              </p>
            ) : null}
            <div className="mt-5 max-w-2xl space-y-4 text-[0.94rem] leading-relaxed text-foreground/90 sm:mt-6">
              {children}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function SubSection({
  id,
  subNumber,
  title,
  children,
}: {
  id?: string;
  subNumber: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div
      id={id}
      className="scroll-mt-20 my-6 border-l-2 border-border pl-4 sm:pl-5 transition-all hover:border-foreground/40"
    >
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs font-semibold text-foreground/70">{subNumber}</span>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
      </div>
      <div className="mt-2.5 space-y-3 text-sm text-foreground/85 leading-relaxed">{children}</div>
    </div>
  );
}

export function StatusTag({ kind }: { kind: "built" | "observed" | "hypothesised" | "unknown" }) {
  return (
    <span className="inline-flex items-center rounded border border-border bg-surface px-2 py-0.5 font-mono text-[0.62rem] font-medium text-foreground/80 uppercase tracking-wider">
      {kind}
    </span>
  );
}
