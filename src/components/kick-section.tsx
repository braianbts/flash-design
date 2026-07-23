"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function KickSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-black" style={{ minHeight: "320px" }}>

      {/* ── FONDO: negro sólido ── */}
      <div className="absolute inset-0 z-0 bg-black" />

      {/* ── IMAGEN desktop: ocupa 68% derecho ── */}
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[68%] z-[1]">
        <Image
          src="/kick1.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="55vw"
          priority
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, black 0%, rgba(0,0,0,0.5) 30%, transparent 65%)" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 35%)" }} />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 70% 40%, rgba(83,252,24,0.10) 0%, transparent 55%)" }} />
      </div>

      {/* ── IMAGEN mobile: mitad inferior ── */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 h-[52%] z-[1]">
        <Image
          src="/kick1.jpg"
          alt=""
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />
        {/* fade top para que se integre con el texto */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.4) 30%, transparent 70%)" }} />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(83,252,24,0.08) 0%, transparent 55%)" }} />
      </div>

      {/* borde top */}
      <div className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: "linear-gradient(90deg, transparent, #53FC18 40%, #2563EB 60%, transparent)" }} />

      {/* ── CONTENIDO ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-8 md:px-16 py-14 md:py-20">
        <div className="max-w-xl">

          {/* badge */}
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-[#53FC18]/30 bg-[#53FC18]/10 px-4 py-1.5 mb-8 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#53FC18] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#53FC18]" />
            </span>
            <span className="text-[#53FC18] text-xs font-bold uppercase tracking-widest">En vivo en Kick</span>
          </div>

          {/* título */}
          <h2
            className={`text-5xl md:text-7xl font-extrabold uppercase leading-[0.9] tracking-tight text-white mb-6 transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Mirá cómo
            <br />
            <span style={{
              background: "linear-gradient(90deg, #53FC18 0%, #2563EB 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              lo hago.
            </span>
          </h2>

          <p
            className={`text-white/50 text-sm md:text-base leading-relaxed mb-10 max-w-sm transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Customs en vivo, proceso completo, detrás del taller. Cada sesión es una obra en tiempo real.
          </p>

          {/* CTA */}
          <div
            className={`transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="https://kick.com/flashxdesign"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 font-extrabold uppercase tracking-wide text-black text-sm px-8 py-4"
              style={{
                background: "linear-gradient(90deg, #53FC18, #39d412)",
                boxShadow: "6px 6px 0 #2563EB",
                transition: "box-shadow 0.15s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 #2563EB";
                (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0 #2563EB";
                (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 2h4v6l4-6h5l-5 7 5 7h-5l-4-6v6H2V2z"/>
              </svg>
              Entrar al canal
            </a>

            <p className="mt-4 text-white/20 text-xs uppercase tracking-widest">
              kick.com/flashxdesign
            </p>
          </div>
        </div>
      </div>

      {/* borde bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{ background: "linear-gradient(90deg, transparent, #2563EB 40%, #53FC18 60%, transparent)" }} />

      <style jsx>{`
        @keyframes blobFloat {
          0%, 100% { transform: translate(0,0) scale(1); }
          33%       { transform: translate(30px,-20px) scale(1.05); }
          66%       { transform: translate(-20px,15px) scale(0.95); }
        }
      `}</style>
    </section>
  );
}
