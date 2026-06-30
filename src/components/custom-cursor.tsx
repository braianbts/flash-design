"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.documentElement.style.cursor = "none";

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    let angle = 0;
    const animate = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      angle += 1.5;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) rotate(${angle}deg)`;
      raf = requestAnimationFrame(animate);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onEnter = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-magnetic]")) setHovering(true);
    };
    const onLeave = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-magnetic]")) setHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* anillo giratorio */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99997] rounded-full"
        style={{
          width: hovering ? 52 : clicking ? 22 : 36,
          height: hovering ? 52 : clicking ? 22 : 36,
          border: `1.5px dashed ${hovering ? "rgba(83,252,24,0.8)" : "rgba(37,99,235,0.7)"}`,
          boxShadow: hovering
            ? "0 0 8px rgba(83,252,24,0.5)"
            : "0 0 6px rgba(37,99,235,0.4)",
          transition: "width 0.35s ease, height 0.35s ease, border 0.3s ease, box-shadow 0.3s ease",
          willChange: "transform",
        }}
      />

      {/* punto central */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{
          width: clicking ? 5 : 7,
          height: clicking ? 5 : 7,
          background: hovering ? "#53FC18" : "#fff",
          boxShadow: hovering
            ? "0 0 6px #53FC18, 0 0 12px rgba(83,252,24,0.6)"
            : "0 0 4px rgba(37,99,235,0.8)",
          transition: "width 0.15s, height 0.15s, background 0.2s, box-shadow 0.2s",
          willChange: "transform",
        }}
      />

    </>
  );
}
