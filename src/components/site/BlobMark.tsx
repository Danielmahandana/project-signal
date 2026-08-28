import { useEffect, useState } from "react";

export function BlobMark({ className = "" }: { className?: string }) {
  const [signal, setSignal] = useState(false);

  useEffect(() => {
    const onScroll = () => setSignal(window.scrollY < 160);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Ambient background glow filter */}
      <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-signal-blue/15 via-signal-green/15 to-signal-red/15 blur-2xl animate-pulse-glow" />

      <svg
        viewBox="0 0 340 240"
        className="liquid-mark relative z-10 w-full overflow-visible"
        role="img"
        aria-label="Project Signal Liquid Hero Engine"
      >
        <defs>
          <radialGradient id="blobGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.24 0.005 60)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="oklch(0.15 0.005 60)" stopOpacity="0.9" />
          </radialGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Signal Wave Rings */}
        <circle cx="170" cy="120" r="95" className="stroke-signal-blue/20" fill="none" strokeWidth="1" strokeDasharray="4 6">
          <animate attributeName="r" dur="8s" repeatCount="indefinite" values="85;105;85" />
          <animate attributeName="stroke-opacity" dur="8s" repeatCount="indefinite" values="0.3;0.1;0.3" />
        </circle>
        <circle cx="170" cy="120" r="115" className="stroke-signal-green/20" fill="none" strokeWidth="1" strokeDasharray="3 7">
          <animate attributeName="r" dur="12s" repeatCount="indefinite" values="105;125;105" />
        </circle>

        {/* Main Fluid Blob Path */}
        <path
          d="M102 76c16-32 56-44 88-32 28 11 32 32 56 40 26 10 46 24 46 50 0 36-32 60-70 64-32 3-46-13-74-9-30 4-56-7-66-32-12-28 4-54 20-81z"
          fill="url(#blobGrad)"
          className="transition-all duration-700 hover:scale-105"
        >
          <animate
            attributeName="d"
            dur="14s"
            repeatCount="indefinite"
            values="
              M102 76c16-32 56-44 88-32 28 11 32 32 56 40 26 10 46 24 46 50 0 36-32 60-70 64-32 3-46-13-74-9-30 4-56-7-66-32-12-28 4-54 20-81z;
              M94 84c22-36 60-48 96-32 26 12 24 36 48 46 28 12 44 28 40 54-6 34-38 54-76 54-32 0-44-18-72-16-30 2-50-14-56-38-8-28 7-48 20-70z;
              M102 76c16-32 56-44 88-32 28 11 32 32 56 40 26 10 46 24 46 50 0 36-32 60-70 64-32 3-46-13-74-9-30 4-56-7-66-32-12-28 4-54 20-81z"
          />
        </path>

        {/* Orbiting Signal Floating Nodes */}
        <g filter="url(#glow)">
          <circle cx="238" cy="80" r="18" className="fill-signal-blue shadow-lg">
            <animate attributeName="cy" dur="7s" repeatCount="indefinite" values="80;68;80" />
            <animate attributeName="r" dur="5s" repeatCount="indefinite" values="18;21;18" />
          </circle>
          <circle cx="250" cy="154" r="15" className="fill-signal-green">
            <animate attributeName="cx" dur="9s" repeatCount="indefinite" values="250;264;250" />
            <animate attributeName="cy" dur="11s" repeatCount="indefinite" values="154;162;154" />
          </circle>
          <ellipse cx="80" cy="140" rx="28" ry="25" className="fill-signal-red">
            <animate attributeName="rx" dur="8s" repeatCount="indefinite" values="28;33;28" />
            <animate attributeName="ry" dur="10s" repeatCount="indefinite" values="25;29;25" />
          </ellipse>
        </g>

        {/* Signal Connecting Hairlines */}
        <line x1="170" y1="120" x2="238" y2="80" className="stroke-signal-blue/40" strokeWidth="1" strokeDasharray="2 3" />
        <line x1="170" y1="120" x2="250" y2="154" className="stroke-signal-green/40" strokeWidth="1" strokeDasharray="2 3" />
        <line x1="170" y1="120" x2="80" y2="140" className="stroke-signal-red/40" strokeWidth="1" strokeDasharray="2 3" />

        {/* Center Title Word Mark */}
        <text
          x="170"
          y="126"
          textAnchor="middle"
          className={`liquid-word fill-background font-mono text-sm tracking-widest uppercase font-bold transition-all duration-700 ${
            signal ? "liquid-word-visible opacity-100 scale-100" : "opacity-90"
          }`}
        >
          project signal
        </text>
      </svg>
    </div>
  );
}
