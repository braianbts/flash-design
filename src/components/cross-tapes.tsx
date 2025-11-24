"use client";

import { useEffect, useState } from "react";

type Props = {
  text?: string;
  color?: string;
  angle?: number;
  height?: number;
  offset?: number;
  gap?: number;
};

export default function CrossTapes({
  text = "FLASH DESIGN",
  color = "#2563EB",
  angle = 13,
  height = 92,
  offset = 32,
  gap = 56,
}: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Ajustes responsive
  const tapeWidth = isMobile ? "120vw" : "150vw";
  const tapeOffset = isMobile ? offset + 40 : offset;
  const tapeGap = isMobile ? gap + 20 : gap;

  const Row = () => (
    <div className="flex items-center gap-10 px-10">
      {Array.from({ length: 16 }).map((_, i) => (
        <span key={i} className="flex items-center gap-6">
          <span
            className="whitespace-nowrap font-semibold tracking-wider uppercase text-white text-[1.06rem]"
            style={{ textShadow: "0 1px 0 rgba(0,0,0,.08)" }}
          >
            {text}
          </span>

          <img
            src="/small-logo.png"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="h-7 w-auto opacity-95 select-none"
          />
        </span>
      ))}
    </div>
  );

  const base =
    "absolute left-1/2 -translate-x-1/2 pointer-events-none overflow-hidden " +
    "before:content-[''] before:absolute before:inset-0 " +
    "before:bg-gradient-to-b before:from-white/15 before:via-transparent before:to-black/10 before:mix-blend-overlay";

  return (
    <div
      className="absolute inset-x-0 pointer-events-none select-none z-40"
      style={{ bottom: 0, height: tapeOffset + tapeGap + height + 40 }}
    >
      {/* Cinta inferior */}
      <div
        className={base}
        style={{
          width: tapeWidth,
          height,
          bottom: tapeOffset,
          background: color,
          transform: `translateX(-10%) rotate(${angle}deg)`,
          filter: "drop-shadow(0 22px 40px rgba(0,0,0,.45))",
          zIndex: 10,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Row />
        </div>
      </div>

      {/* Cinta superior */}
      <div
        className={base}
        style={{
          width: tapeWidth,
          height,
          bottom: tapeOffset + tapeGap,
          background: color,
          transform: `translateX(-10%) rotate(${-angle}deg)`,
          filter:
            "drop-shadow(0 28px 46px rgba(0,0,0,.55)) drop-shadow(0 6px 16px rgba(0,0,0,.35))",
          zIndex: 30,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Row />
        </div>
      </div>
    </div>
  );
}
