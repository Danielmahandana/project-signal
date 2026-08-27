export function BlobMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" className={className} role="img" aria-label="Cognitive engine mark">
      <path
        d="M92 66c14-30 52-42 84-30 26 10 30 30 52 38 24 9 44 22 44 48 0 34-30 58-66 62-30 3-44-12-70-8-28 4-52-6-62-30-11-27 4-52 18-80z"
        fill="currentColor"
        className="text-foreground"
      >
        <animate
          attributeName="d"
          dur="14s"
          repeatCount="indefinite"
          values="
            M92 66c14-30 52-42 84-30 26 10 30 30 52 38 24 9 44 22 44 48 0 34-30 58-66 62-30 3-44-12-70-8-28 4-52-6-62-30-11-27 4-52 18-80z;
            M84 74c20-34 56-46 92-30 24 11 22 34 46 44 26 11 42 26 38 52-5 32-36 52-72 52-30 0-42-16-68-14-28 2-48-12-54-36-7-26 6-46 18-68z;
            M92 66c14-30 52-42 84-30 26 10 30 30 52 38 24 9 44 22 44 48 0 34-30 58-66 62-30 3-44-12-70-8-28 4-52-6-62-30-11-27 4-52 18-80z"
        />
      </path>
      <circle cx="228" cy="72" r="18" className="fill-signal-blue">
        <animate attributeName="cy" dur="9s" repeatCount="indefinite" values="72;62;72" />
      </circle>
      <circle cx="238" cy="146" r="16" className="fill-signal-green">
        <animate attributeName="cx" dur="11s" repeatCount="indefinite" values="238;250;238" />
      </circle>
      <ellipse cx="72" cy="132" rx="30" ry="27" className="fill-signal-red">
        <animate attributeName="rx" dur="10s" repeatCount="indefinite" values="30;34;30" />
      </ellipse>
    </svg>
  );
}
