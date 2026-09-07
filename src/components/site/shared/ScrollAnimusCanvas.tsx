import { useEffect, useRef } from "react";

interface ScrollAnimusCanvasProps {
  className?: string;
  intensity?: number;
}

export function ScrollAnimusCanvas({ className = "", intensity = 1 }: ScrollAnimusCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 400);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio || window.innerWidth;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio || 400;
    };

    window.addEventListener("resize", handleResize);

    // Scroll reactivity state
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let scrollProgress = 0;
    let smoothedVelocity = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      scrollVelocity = Math.min(delta * 0.15, 8); // clamp velocity boost
      lastScrollY = currentScrollY;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? currentScrollY / maxScroll : 0;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    let time = 0;

    // Generative wave parameters
    const waves = [
      { frequency: 0.0018, speed: 0.015, amplitude: 38, phase: 0, color: "rgba(16, 163, 127, 0.45)", strokeWidth: 1.5 },
      { frequency: 0.0028, speed: 0.022, amplitude: 26, phase: 2.2, color: "rgba(16, 163, 127, 0.25)", strokeWidth: 1.2 },
      { frequency: 0.0012, speed: 0.01, amplitude: 48, phase: 4.1, color: "rgba(120, 120, 120, 0.2)", strokeWidth: 1.0 },
      { frequency: 0.0035, speed: 0.028, amplitude: 18, phase: 1.1, color: "rgba(16, 163, 127, 0.18)", strokeWidth: 0.8 },
    ];

    // Particle nodes floating along manifold
    const particles = Array.from({ length: 28 }, (_, i) => ({
      x: Math.random() * width,
      offsetY: (Math.random() - 0.5) * 80,
      radius: Math.random() * 2 + 1,
      speed: (Math.random() * 0.4 + 0.2) * (i % 2 === 0 ? 1 : -1),
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const render = () => {
      time += 0.016;

      // Smooth dampening of velocity
      smoothedVelocity += (scrollVelocity - smoothedVelocity) * 0.08;
      scrollVelocity *= 0.94; // friction

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const baseMidY = height * 0.5 + Math.sin(time * 0.4) * 15;

      // Render flowing probability manifold lines
      waves.forEach((w, waveIdx) => {
        ctx.beginPath();
        ctx.lineWidth = w.strokeWidth * (window.devicePixelRatio || 1);

        // Color adjustment based on dark/light
        if (w.color.includes("120, 120, 120")) {
          ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(30, 30, 30, 0.08)";
        } else {
          ctx.strokeStyle = w.color;
        }

        const effectiveSpeed = w.speed + smoothedVelocity * 0.008 * intensity;
        const currentPhase = w.phase + time * effectiveSpeed + scrollProgress * Math.PI;
        const currentAmp = (w.amplitude + smoothedVelocity * 4) * intensity;

        for (let x = 0; x <= width; x += 12) {
          const y =
            baseMidY +
            Math.sin(x * w.frequency + currentPhase) * currentAmp +
            Math.cos(x * w.frequency * 0.5 + time * 0.02) * (currentAmp * 0.4);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      });

      // Render floating particle vectors
      particles.forEach((p) => {
        p.x += p.speed + smoothedVelocity * 0.8;
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;

        const primaryWave = waves[0];
        const waveY =
          baseMidY +
          Math.sin(p.x * primaryWave.frequency + primaryWave.phase + time * primaryWave.speed) *
            primaryWave.amplitude;

        const py = waveY + p.offsetY;

        ctx.beginPath();
        ctx.arc(p.x, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(16, 163, 127, ${p.alpha * 0.8})`
          : `rgba(16, 163, 127, ${p.alpha * 0.6})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [intensity]);

  return (
    <div className={`relative w-full overflow-hidden pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
