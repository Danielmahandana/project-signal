import { InlineMath, BlockMath } from "react-katex";

export function M({ children }: { children: string }) {
  return <InlineMath math={children} />;
}

export function Eq({ children, note }: { children: string; note?: string }) {
  return (
    <figure className="my-6 rounded-lg border border-border bg-card px-5 py-4">
      <BlockMath math={children} />
      {note ? (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">{note}</figcaption>
      ) : null}
    </figure>
  );
}
