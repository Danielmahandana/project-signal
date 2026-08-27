import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  id,
  number,
  title,
  lede,
  children,
}: {
  id?: string;
  number?: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-16 md:py-24">
      <Reveal>
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-[10rem_1fr]">
          <div className="eyebrow pt-2">{number}</div>
          <div>
            <h2 className="text-2xl font-semibold md:text-[2rem]">{title}</h2>
            {lede ? <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{lede}</p> : null}
            <div className="mt-8 max-w-2xl space-y-5 text-[0.975rem] leading-7 text-foreground/85">
              {children}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Ascii({ children }: { children: string }) {
  return (
    <pre className="ascii rounded-lg border border-border bg-surface p-5 text-muted-foreground">
      {children}
    </pre>
  );
}

export function StatusTag({ kind }: { kind: "built" | "observed" | "hypothesised" | "unknown" }) {
  const map = {
    built: "border-signal-green/40 text-signal-green",
    observed: "border-signal-blue/40 text-signal-blue",
    hypothesised: "border-signal-amber/60 text-signal-amber",
    unknown: "border-signal-red/40 text-signal-red",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] ${map[kind]}`}
    >
      {kind}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="mx-auto max-w-5xl px-6 pb-4 pt-20 md:pt-28">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] md:text-6xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{lede}</p>
    </header>
  );
}
