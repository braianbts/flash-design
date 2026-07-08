"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const ITEMS = [
  {
    num: "01",
    cat: "Fileteado Porteño × Nike",
    title: "Alfredo Genovese",
    desc: "En 2024 me junté junto al maestro del fileteado, Alfredo Genovese, y creamos un diseño inspirado en su participación con Nike en 2006 sobre unas Dunk Low. Una de las experiencias más gratificantes de mi carrera ya que junta mi pasión por el calzado y mis raíces argentinas.",
    src: "/p1-1.jpg",
    images: ["/p1-1.jpg", "/p1-2.jpg", "/p1-3.jpg", "/p1-4.jpg"],
    style: "white",
  },
  {
    num: "02",
    cat: "Nike × Air Max Day 2026",
    title: "Total 90 Air Max 95",
    desc: "En 2026 colaboré con Nike a nivel local en el contexto del Air Max Day 2026. Una celebración mítica de la marca originaria de Oregón. Fusionamos los míticos botines Total 90 con la suela de las legendarias Air Max 95. Este par fue presentado en el Nike de Alto.",
    src: "/dest-2.jpg",
    images: ["/dest-2.jpg", "/dest-6.jpg"],
    style: "gradient",
  },
  {
    num: "03",
    cat: "Adidas × Home of Classic",
    title: "Duki · Emilia · Bizarrap · Paulo Londra",
    desc: 'En 2023 me contactó Adidas para realizar 4 customizaciones para sus artistas principales: Duki, Emilia, Bizarrap y Paulo Londra. Los 4 diseños fueron pensados y ejecutados por mí en el marco de la campaña “Home of Classic”.',
    src: "/adidas-1.jpg",
    images: ["/adidas-1.jpg", "/adidas-2.jpg", "/adidas-3.jpg", "/adidas-4.jpg", "/adidas-5.jpg", "/adidas-6.jpg", "/adidas-7.jpg"],
    style: "dark",
  },
];

type Item = typeof ITEMS[0];

function Card({ item, className = "", numClass = "", onOpen }: { item: Item; className?: string; numClass?: string; onOpen: (i: Item) => void }) {
  const isWhite = item.style === "white";
  const isGradient = item.style === "gradient";
  const isDark = item.style === "dark";
  const [imgIdx, setImgIdx] = useState(0);

  const bg = isGradient
    ? "linear-gradient(135deg, #0d2260 0%, #1a3fa8 40%, #2563EB 70%, #1e50c8 100%)"
    : isWhite
    ? "#ffffff"
    : "#111111";

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((i) => (i - 1 + item.images.length) % item.images.length);
  };
  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((i) => (i + 1) % item.images.length);
  };

  return (
    <article
      onClick={() => onOpen(item)}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${className}`}
      style={{ background: bg }}
    >
      {/* bokeh blobs — solo gradient */}
      {isGradient && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-30%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[60px] opacity-60"
            style={{ background: "radial-gradient(circle, #4d87f5 0%, #1a3fa8 60%, transparent 100%)" }} />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[50px] opacity-50"
            style={{ background: "radial-gradient(circle, #0a1f6b 0%, #2563EB 50%, transparent 100%)" }} />
          <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full blur-[40px] opacity-40"
            style={{ background: "radial-gradient(circle, #6fa3ff 0%, transparent 70%)" }} />
        </div>
      )}

      {/* foto como textura — cambia con imgIdx */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        isWhite ? "opacity-35 group-hover:opacity-50 mix-blend-multiply" :
        isGradient ? "opacity-30 group-hover:opacity-45 mix-blend-luminosity" :
        "opacity-40 group-hover:opacity-55"
      }`}>
        <Image key={imgIdx} src={item.images[imgIdx]} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="800px" />
      </div>

      {/* overlay dark card */}
      {isDark && <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/80 to-transparent pointer-events-none" />}

      {/* borde glow hover */}
      <div className="absolute inset-0 rounded-3xl ring-0 group-hover:ring-1 ring-white/20 transition-all duration-300 pointer-events-none" />

      {/* contenido — sin min-height fija para que crezca en mobile */}
      <div className="relative z-10 p-7 md:p-8 flex flex-col gap-4 min-h-[220px] md:min-h-[260px]">
        <span className={`font-extrabold leading-none ${numClass || "text-5xl md:text-6xl"} ${
          isWhite ? "text-[#2563EB]" :
          isGradient ? "text-white/40" :
          "text-[#2563EB]/50"
        }`}>
          {item.num}
        </span>

        <div className="flex-1" />

        <div>
          <p className={`text-xs uppercase tracking-widest mb-2 ${
            isWhite ? "text-black/30" : isGradient ? "text-white/50" : "text-white/30"
          }`}>{item.cat}</p>
          <h3 className={`font-extrabold text-xl md:text-2xl uppercase leading-tight mb-3 ${
            isWhite ? "text-black" : "text-white"
          }`}>{item.title}</h3>
          {/* descripción visible en mobile, oculta en desktop (solo en modal) */}
          <p className={`text-xs leading-relaxed md:hidden ${
            isWhite ? "text-black/50" : isGradient ? "text-white/60" : "text-white/50"
          }`}>{item.desc}</p>
          <p className={`hidden md:block text-[10px] uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
            isWhite ? "text-black/40" : "text-white/40"
          }`}>Ver detalle →</p>
        </div>

        {/* slider dots + flechas — solo si hay varias imágenes */}
        {item.images.length > 1 && (
          <div className="flex items-center gap-2 mt-1" onClick={(e) => e.stopPropagation()}>
            <button onClick={prevImg}
              className="w-7 h-7 rounded-full flex items-center justify-center text-sm transition hover:scale-110"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.2)" }}>
              ‹
            </button>
            <div className="flex gap-1.5">
              {item.images.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                  className={`rounded-full transition-all ${i === imgIdx ? "w-4 h-1.5 bg-[#2563EB]" : "w-1.5 h-1.5 bg-white/30"}`} />
              ))}
            </div>
            <button onClick={nextImg}
              className="w-7 h-7 rounded-full flex items-center justify-center text-sm transition hover:scale-110"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.2)" }}>
              ›
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default function HighlightsRow() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState<Item | null>(null);
  const [modalImg, setModalImg] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) gridRef.current?.classList.add("hl-visible"); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModal(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  return (
    <>
      <section ref={sectionRef} className="relative w-full bg-[#0a0a0a] py-24 md:py-36 overflow-hidden">

        {/* ghost logo */}
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden">
          <img src="/small-logo.png" alt=""
            style={{ width: "50vw", maxWidth: 500, opacity: 0.03, filter: "brightness(0) invert(1)" }} />
        </div>

        {/* blob azul derecha */}
        <div aria-hidden className="pointer-events-none absolute top-1/2 right-0 w-[400px] h-[400px] -translate-y-1/2 translate-x-1/2 rounded-full blur-[100px] opacity-12"
          style={{ background: "#2563EB" }} />

        <div className="relative z-10 mx-auto max-w-[1250px] px-5 md:px-8">

          {/* título */}
          <div className="mb-16 md:mb-20 flex flex-col items-center text-center">
            <div className="relative h-[90px] w-[340px] md:h-[150px] md:w-[560px]">
              <Image src="/destacados.png" alt="Destacados" fill className="object-contain brightness-0 invert" priority />
            </div>
            <p className="mt-3 text-white/35 text-sm md:text-base font-medium">
              Los trabajos más icónicos de Flash Design
            </p>
          </div>

          {/* BENTO — 3 proyectos */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
          >
            {/* 01 — 1 col */}
            <Card item={ITEMS[0]} onOpen={(i) => { setModalImg(0); setModal(i); }} />
            {/* 02 — 2 cols, más ancho */}
            <Card item={ITEMS[1]} className="md:col-span-2" numClass="text-5xl md:text-7xl" onOpen={(i) => { setModalImg(0); setModal(i); }} />
            {/* 03 — full width */}
            <Card item={ITEMS[2]} className="md:col-span-3" numClass="text-5xl md:text-8xl" onOpen={(i) => { setModalImg(0); setModal(i); }} />
          </div>
        </div>

        <style jsx global>{`
          .hl-visible { opacity: 1 !important; transform: translateY(0) !important; }
          @keyframes modalSlideUp {
            0%   { opacity: 0; transform: translateY(60px) scale(0.92); }
            60%  { opacity: 1; transform: translateY(-8px) scale(1.01); }
            80%  { transform: translateY(4px) scale(0.995); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes backdropIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes fadeSlideLeft {
            from { opacity: 0; transform: translateX(24px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes lineGrow {
            from { width: 0; opacity: 0; }
            to   { width: 2rem; opacity: 1; }
          }
          @keyframes imgReveal {
            from { opacity: 0; transform: scale(1.06); }
            to   { opacity: 1; transform: scale(1); }
          }
          .modal-backdrop { animation: backdropIn 0.25s ease forwards; }
          .modal-panel { animation: modalSlideUp 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards; }
          .modal-img { animation: imgReveal 0.5s 0.15s cubic-bezier(0.22,1,0.36,1) both; }
          .modal-cat { animation: fadeSlideLeft 0.4s 0.25s cubic-bezier(0.22,1,0.36,1) both; }
          .modal-title { animation: fadeSlideLeft 0.45s 0.32s cubic-bezier(0.22,1,0.36,1) both; }
          .modal-line { animation: lineGrow 0.4s 0.42s ease both; }
          .modal-desc { animation: fadeUp 0.4s 0.48s ease both; }
          .modal-footer { animation: fadeUp 0.4s 0.56s ease both; }
        `}</style>
      </section>

      {/* ── MODAL ── */}
      {modal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          onClick={() => setModal(null)}
        >
          <div className="modal-backdrop absolute inset-0 bg-black/80 backdrop-blur-md" />

          <div
            className="modal-panel relative z-10 w-full max-w-3xl rounded-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden"
            style={{
              maxHeight: "92vh",
              background: modal.style === "gradient"
                ? "linear-gradient(135deg, #0d2260 0%, #1a3fa8 40%, #2563EB 70%, #1e50c8 100%)"
                : modal.style === "white"
                ? "#f5f5f5"
                : "#0e0e0e",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* imagen slider */}
            <div className="modal-img w-full shrink-0 md:w-[55%] md:shrink-0 flex flex-col"
              style={{ background: "#000" }}>
              {/* imagen — sin degradé, ocupa todo el alto disponible */}
              <div className="relative flex-1" style={{ minHeight: "clamp(200px, 46vw, 400px)" }}>
                <Image
                  key={modalImg}
                  src={modal.images[modalImg]}
                  alt={modal.title}
                  fill
                  className="object-contain transition-opacity duration-300"
                  sizes="600px"
                  priority
                />
                {modal.style === "gradient" && (
                  <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20"
                    style={{ background: "linear-gradient(135deg, #2563EB 0%, transparent 70%)" }} />
                )}
                {/* flechas laterales */}
                {modal.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setModalImg((i) => (i - 1 + modal.images.length) % modal.images.length); }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition hover:scale-110"
                      style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.2)" }}>
                      <span className="text-white text-lg leading-none">‹</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setModalImg((i) => (i + 1) % modal.images.length); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition hover:scale-110"
                      style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.2)" }}>
                      <span className="text-white text-lg leading-none">›</span>
                    </button>
                  </>
                )}
              </div>
              {/* dots fuera de la imagen — fila propia */}
              {modal.images.length > 1 && (
                <div className="flex justify-center items-center gap-1.5 py-2.5 shrink-0"
                  style={{ background: "rgba(0,0,0,0.7)" }}
                  onClick={(e) => e.stopPropagation()}>
                  {modal.images.map((_, i) => (
                    <button key={i} onClick={() => setModalImg(i)}
                      className={`rounded-full transition-all ${i === modalImg ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30"}`} />
                  ))}
                </div>
              )}
            </div>

            {/* info — sin altura límite, crece con el contenido */}
            <div className="flex flex-col justify-between p-7 md:p-10 flex-1 overflow-y-auto md:overflow-visible">
              {/* bokeh en modal gradient */}
              {modal.style === "gradient" && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                  <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[60px] opacity-40"
                    style={{ background: "radial-gradient(circle, #4d87f5 0%, transparent 70%)" }} />
                </div>
              )}
              <div className="relative z-10">
                <p className={`modal-cat text-[10px] font-bold uppercase tracking-[0.3em] mb-3 ${modal.style === "white" ? "text-[#2563EB]" : "text-white/50"}`}>
                  {modal.cat}
                </p>
                <h2 className={`modal-title font-extrabold text-2xl md:text-3xl uppercase leading-tight tracking-tight mb-6 ${modal.style === "white" ? "text-black" : "text-white"}`}>
                  {modal.title}
                </h2>
                <div className="modal-line h-[1px] bg-[#2563EB] mb-6" />
                <p className={`modal-desc text-sm leading-relaxed ${modal.style === "white" ? "text-black/50" : "text-white/50"}`}>
                  {modal.desc}
                </p>
              </div>
              <div className="modal-footer relative z-10 mt-8 flex items-center justify-between">
                <span className={`text-[10px] uppercase tracking-widest ${modal.style === "white" ? "text-black/20" : "text-white/15"}`}>
                  Flash Design · Buenos Aires
                </span>
                <span className={`font-extrabold text-4xl ${modal.style === "white" ? "text-black/10" : "text-white/10"}`}>
                  {modal.num}
                </span>
              </div>
            </div>

            {/* cerrar */}
            <button
              onClick={() => setModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition hover:bg-white/10"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)" }}
              aria-label="Cerrar"
            >
              <X size={15} color="#fff" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
