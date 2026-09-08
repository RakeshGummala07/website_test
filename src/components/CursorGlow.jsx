import { useEffect, useRef, useState } from "react";

/**
 * A very subtle radial glow that trails the cursor. Desktop (fine pointer)
 * only — it never mounts its listeners on touch devices, and respects
 * prefers-reduced-motion by skipping the smoothing animation entirely.
 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const handleMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMove);

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x - 220}px, ${pos.current.y - 220}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-0 h-[440px] w-[440px] rounded-full opacity-[0.10] mix-blend-screen"
      style={{
        background: "radial-gradient(circle, rgba(139,92,246,0.9) 0%, rgba(214,63,196,0.5) 45%, transparent 72%)",
        willChange: "transform",
      }}
    />
  );
}
