"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Puff de humo: posición x, delay, duración, tamaño
const PUFFS = [
  { x: 10, delay: 0,    dur: 9,  size: 480 },
  { x: 30, delay: 1.5,  dur: 11, size: 440 },
  { x: 50, delay: 0.4,  dur: 8,  size: 360 },
  { x: 55, delay: 0.8,  dur: 10, size: 560 },
  { x: 72, delay: 2.2,  dur: 8,  size: 420 },
  { x: 88, delay: 0.3,  dur: 12, size: 500 },
  { x: 20, delay: 3.0,  dur: 10, size: 380 },
  { x: 65, delay: 1.0,  dur: 9,  size: 460 },
  { x: 40, delay: 2.5,  dur: 11, size: 400 },
];

export default function OpeningFlashSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`
        relative w-full h-[70vh] md:h-[90vh] overflow-hidden bg-black
        transition-opacity duration-1000
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* Imagen de fondo */}
      <Image
        src="/openingwebflash.png"
        alt="Flash Opening"
        fill
        className={`
          object-cover
          transition-transform duration-[2500ms] ease-out
          ${visible ? "scale-100" : "scale-115"}
        `}
        priority
      />

      {/* Overlay oscuro base */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

      {/* ===== HUMO ANIMADO ===== */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        {PUFFS.map((p, i) => {
          const mobileSize = Math.round(p.size * 0.55);
          return (
          <div
            key={i}
            className={`absolute bottom-0 rounded-full opacity-0 ${visible ? "smoke-puff" : ""}`}
            style={{
              left: `${p.x}%`,
              width: `clamp(${mobileSize}px, ${(p.size / 1440) * 100}vw, ${p.size}px)`,
              height: `clamp(${mobileSize}px, ${(p.size / 1440) * 100}vw, ${p.size}px)`,
              marginLeft: `-clamp(${mobileSize/2}px, ${(p.size / 1440) * 50}vw, ${p.size/2}px)`,
              background: `radial-gradient(ellipse at center,
                rgba(190,190,210,0.28) 0%,
                rgba(130,130,150,0.14) 40%,
                rgba(0,0,0,0) 70%)`,
              filter: "blur(26px)",
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        )})}

        {/* humo azul-ish sutil para teñirlo con la marca */}
        {[15, 50, 82].map((x, i) => (
          <div
            key={`blue-${i}`}
            className={`absolute bottom-0 rounded-full opacity-0 ${visible ? "smoke-puff" : ""}`}
            style={{
              left: `${x}%`,
              width: 300,
              height: 300,
              marginLeft: -150,
              background: `radial-gradient(ellipse at center,
                rgba(37,99,235,0.12) 0%,
                rgba(37,99,235,0.05) 50%,
                rgba(0,0,0,0) 70%)`,
              filter: "blur(40px)",
              animationDelay: `${i * 2}s`,
              animationDuration: `${11 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Degradado de entrada desde abajo */}
      <div
        className={`
          absolute inset-0 z-30 pointer-events-none
          transition-opacity duration-[2000ms] delay-300
          ${visible ? "opacity-100" : "opacity-0"}
        `}
        style={{
          background: `linear-gradient(to top,
            rgba(0,0,0,0.95) 0%,
            rgba(0,0,0,0.4) 25%,
            rgba(0,0,0,0) 55%)`,
        }}
      />

      <style jsx>{`
        @keyframes smokeRise {
          0%   { opacity: 0;    transform: translateY(0)    scale(0.6); }
          15%  { opacity: 1; }
          70%  { opacity: 0.85; }
          100% { opacity: 0;    transform: translateY(-80%) scale(1.6); }
        }
        .smoke-puff {
          animation: smokeRise infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
