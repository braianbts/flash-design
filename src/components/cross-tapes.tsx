"use client";

type Props = {
  text?: string;
  color?: string;
  angle?: number;   // inclinación en grados
  height?: number;  // alto de cada cinta (px)
  offset?: number;  // distancia desde el borde inferior del HERO (px)
  gap?: number;     // separación vertical entre cintas (px)
};

export default function CrossTapes({
  text = "FLASH DESIGN",
  color = "#2563EB",
  angle = 13,
  height = 92,
  offset = 32,
  gap = 56,
}: Props) {
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

        {/* Logo entre cada texto */}
        <img
          src="/small-logo.png"   // asegúrate que esté en /public/small-logo.png
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
    // Overlay ABSOLUTO pegado al HERO (padre relativo)
    <div
      className="absolute inset-x-0 pointer-events-none select-none z-40"
      style={{ bottom: 0, height: offset + gap + height + 20 }}
    >
      {/* Cinta inferior (↘) */}
      <div
        className={base}
        style={{
          width: "150vw",
          height,
          bottom: offset,
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

      {/* Cinta superior (↗) — con sombra más fuerte que “pega” sobre la inferior */}
      <div
        className={base}
        style={{
          width: "150vw",
          height,
          bottom: offset + gap,
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
