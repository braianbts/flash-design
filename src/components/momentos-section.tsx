"use client";
import { useEffect, useRef, useState } from "react";
import { X, ZoomIn } from "lucide-react";

const PHOTOS = [
  "/mom-1.jpg", "/mom-2.jpg", "/mom-3.jpg", "/mom-4.jpg", "/mom-5.jpg",
  "/mom-6.jpg", "/mom-7.jpg", "/mom-8.jpg", "/mom-9.jpg", "/mom-10.jpg",
  "/mom-11.jpg", "/mom-12.jpg", "/mom-13.jpg",
];

// duplicamos para loop infinito
const ROW1 = [...PHOTOS.slice(0, 7), ...PHOTOS.slice(0, 7)];
const ROW2 = [...PHOTOS.slice(6), ...PHOTOS.slice(6)];

export default function MomentosSection() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{ background: "#080808" }}
      >
        {/* ── FIRE TOP BORDER ── */}
        <div className="absolute top-0 inset-x-0 h-[3px] z-20"
          style={{ background: "linear-gradient(90deg, transparent 0%, #EA580C 20%, #F97316 40%, #FBBF24 50%, #F97316 60%, #EA580C 80%, transparent 100%)" }} />

        {/* ── AMBIENT GLOW ORANGE ── */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-[120px] opacity-15"
            style={{ background: "radial-gradient(ellipse, #EA580C 0%, #F97316 40%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-[80px] opacity-8"
            style={{ background: "#EA580C" }} />
        </div>

        {/* ── HEADER ── */}
        <div className={`relative z-10 mx-auto max-w-[1250px] px-6 md:px-12 pt-20 pb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] mb-4"
                style={{ color: "#F97316" }}>
                — Colaboraciones · Momentos
              </p>
              <h2 className="font-extrabold uppercase leading-[0.82] tracking-tight"
                style={{
                  fontSize: "clamp(3.5rem, 9vw, 8rem)",
                  background: "linear-gradient(135deg, #ffffff 0%, #F97316 50%, #EA580C 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                COLABO<br />
                <span style={{
                  background: "linear-gradient(135deg, #F97316 0%, #ffffff 60%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>RACIONES.</span>
              </h2>
            </div>
            <div className="max-w-xs">
              <p className="text-white/40 text-sm leading-relaxed">
                Colaboraciones reales con artistas, marcas y momentos que definen a Flash Design como marca.
              </p>
              <div className="mt-4 inline-flex items-center gap-3 border px-3 py-1.5 rounded-sm" style={{ borderColor: "rgba(249,115,22,0.3)" }}>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">13 fotos</span>
                <span className="w-[1px] h-3 bg-white/15" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: "#F97316" }}>2025 — 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── MARQUEE ROW 1 → ── */}
        <div
          className="relative z-10 mb-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex gap-3"
            style={{
              animation: `marqueeLeft 40s linear infinite`,
              animationPlayState: paused ? "paused" : "running",
              width: "max-content",
            }}
          >
            {ROW1.map((src, i) => (
              <PhotoCard key={i} src={src} onClick={() => setLightbox(src)} />
            ))}
          </div>
        </div>

        {/* ── MARQUEE ROW 2 ← ── */}
        <div
          className="relative z-10 mb-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex gap-3"
            style={{
              animation: `marqueeRight 48s linear infinite`,
              animationPlayState: paused ? "paused" : "running",
              width: "max-content",
            }}
          >
            {ROW2.map((src, i) => (
              <PhotoCard key={i} src={src} onClick={() => setLightbox(src)} />
            ))}
          </div>
        </div>

        {/* ── BOTTOM LABEL ── */}
        <div className="relative z-10 mx-auto max-w-[1250px] px-6 md:px-12 py-10 flex items-center justify-between">
          <p className="text-white/15 text-[10px] uppercase tracking-[0.3em]">
            Flash Design · Buenos Aires · 2025–2026
          </p>
          <p className="text-white/15 text-[10px] uppercase tracking-[0.3em]">
            Click para ampliar
          </p>
        </div>

        {/* ── FIRE BOTTOM BORDER ── */}
        <div className="absolute bottom-0 inset-x-0 h-[3px] z-20"
          style={{ background: "linear-gradient(90deg, transparent 0%, #EA580C 20%, #F97316 40%, #FBBF24 50%, #F97316 60%, #EA580C 80%, transparent 100%)" }} />

        <style jsx global>{`
          @keyframes marqueeLeft {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @keyframes marqueeRight {
            from { transform: translateX(-50%); }
            to   { transform: translateX(0); }
          }
          @keyframes lightboxIn {
            from { opacity: 0; transform: scale(0.88); }
            to   { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-12"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)" }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh]"
            style={{ animation: "lightboxIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* fire border lightbox */}
            <div className="absolute -inset-[2px] rounded-2xl z-0"
              style={{ background: "linear-gradient(135deg, #EA580C, #F97316, #FBBF24, #2563EB, #EA580C)", padding: "2px" }}>
              <div className="absolute inset-0 rounded-2xl" style={{ background: "#0a0a0a" }} />
            </div>

            <div className="relative z-10 rounded-2xl overflow-hidden" style={{ maxHeight: "88vh" }}>
              <img
                src={lightbox}
                alt="Flash Design momento"
                className="w-full h-full object-cover"
                style={{ maxHeight: "88vh", minHeight: 400 }}
              />
            </div>

            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition hover:scale-110"
              style={{ background: "#EA580C", border: "2px solid #F97316" }}
            >
              <X size={16} color="#fff" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function PhotoCard({ src, onClick }: { src: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative shrink-0 rounded-xl overflow-hidden cursor-pointer"
      style={{
        position: "relative",
        width: 280,
        height: 200,
        transform: hovered ? "scale(1.04) translateY(-4px)" : "scale(1) translateY(0)",
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: hovered
          ? "0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba(249,115,22,0.3)"
          : "0 4px 16px rgba(0,0,0,0.4)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="Flash Design" className="absolute inset-0 w-full h-full object-cover" />

      {/* overlay hover */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-300"
        style={{
          background: hovered ? "rgba(234,88,12,0.25)" : "rgba(0,0,0,0)",
        }}
      >
        {hovered && (
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(234,88,12,0.9)", border: "1px solid #F97316" }}>
            <ZoomIn size={18} color="#fff" />
          </div>
        )}
      </div>

      {/* borde orange hover */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300"
        style={{ boxShadow: hovered ? "inset 0 0 0 2px #F97316" : "inset 0 0 0 0px transparent" }}
      />
    </div>
  );
}
