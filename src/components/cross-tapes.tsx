"use client";

import { useEffect, useState } from "react";

type Props = {
  text?: string;
  color?: string;
  angle?: number;
  height?: number;
  offset?: number;
  mobileOffset?: number; // 👈 nuevo
  gap?: number;
};

export default function CrossTapes({
  text = "FLASH DESIGN",
  color = "#2563EB",
  angle = 13,
  height = 92,
  offset = 32,
  mobileOffset,
  gap = 56,
}: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // ⭐ offsets responsivos
  const realOffset = isMobile ? (mobileOffset ?? offset) : offset;
  const realGap = isMobile ? gap + 20 : gap;
  const realWidth = isMobile ? "120vw" : "150vw";

  // fila de textos + logos
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

  // si offset es negativo las cintas quedarían fuera del contenedor
  // compensamos desplazando todo hacia arriba
  const shift = Math.min(realOffset, 0); // negativo o 0
  const adjOffset = realOffset - shift;  // siempre >= 0
  const totalHeight = adjOffset + realGap + height + 40;

  return (
    <div
      className="relative w-full pointer-events-none select-none z-40"
      style={{ height: totalHeight }}
    >
      {/* CINTA INFERIOR */}
      <div
        className={base}
        style={{
          width: realWidth,
          height,
          bottom: adjOffset,
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

      {/* CINTA SUPERIOR */}
      <div
        className={base}
        style={{
          width: realWidth,
          height,
          bottom: adjOffset + realGap,
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
