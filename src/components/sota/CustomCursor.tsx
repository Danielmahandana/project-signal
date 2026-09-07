import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Only enable on precise pointer devices (desktops)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mediaQuery.matches);

    const checkPointer = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mediaQuery.addEventListener("change", checkPointer);

    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering an element with custom cursor attribute
      const target = (e.target as HTMLElement)?.closest("[data-cursor]");
      if (target) {
        setCursorText(target.getAttribute("data-cursor") || "VIEW");
      } else {
        setCursorText(null);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setCursorText(null);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      mediaQuery.removeEventListener("change", checkPointer);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isFinePointer || !isVisible || !cursorText) return null;

  return (
    <div
      className="pointer-events-none fixed z-[999] -translate-x-1/2 -translate-y-1/2 select-none transition-transform duration-75 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="flex items-center justify-center rounded-full bg-foreground px-3 py-1 font-mono text-[0.65rem] font-semibold tracking-wider text-background shadow-2xl backdrop-blur-md animate-in zoom-in-75 duration-200">
        {cursorText}
      </div>
    </div>
  );
}
