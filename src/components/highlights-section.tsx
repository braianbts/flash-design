"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const ITEMS = [
  { num: "01", cat: "Custom", title: "Proyecto 1", desc: "Descripción próximamente.", src: "/dest-1.jpg", style: "white" },
  { num: "02", cat: "Custom", title: "Proyecto 2", desc: "Descripción próximamente.", src: "/dest-2.jpg", style: "gradient" },
  { num: "03", cat: "Custom", title: "Proyecto 3", desc: "Descripción próximamente.", src: "/dest-3.jpg", style: "gradient" },
  { num: "04", cat: "Custom", title: "Proyecto 4", desc: "Descripción próximamente.", src: "/dest-4.jpg", style: "dark" },
  { num: "05", cat: "Custom", title: "Proyecto 5", desc: "Descripción próximamente.", src: "/dest-5.jpg", style: "gradient" },
  { num: "06", cat: "Custom", title: "Proyecto 6", desc: "Descripción próximamente.", src: "/dest-6.jpg", style: "dark" },
];

type Item = typeof ITEMS[0];

function Card({ item, className = "", numClass = "", onOpen }: { item: Item; className?: string; numClass?: string; onOpen: (i: Item) => void }) {
  const isWhite = item.style === "white";
  const isGradient = item.style === "gradient";
  const isDark = item.style === "dark";

  const bg = isGradient
    ? "linear-gradient(135deg, #0d2260 0%, #1a3fa8 40%, #2563EB 70%, #1e50c8 100%)"
    : isWhite
    ? "#ffffff"
    : "#111111";

  return (
    <article
      onClick={() => onOpen(item)}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${className}`}
      style={{ background: bg, minHeight: 220 }}
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

      {/* foto como textura */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        isWhite ? "opacity-20 group-hover:opacity-30 mix-blend-multiply" :
        isGradient ? "opacity-20 group-hover:opacity-30 mix-blend-luminosity" :
        "opacity-15 group-hover:opacity-25"
      }`}>
        <Image src={item.src} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="600px" />
      </div>

      {/* overlay dark card */}
      {isDark && <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/80 to-transparent pointer-events-none" />}

      {/* borde glow hover */}
      <div className="absolute inset-0 rounded-3xl ring-0 group-hover:ring-1 ring-white/20 transition-all duration-300 pointer-events-none" />

      {/* contenido */}
      <div className={`relative z-10 p-7 md:p-8 h-full flex flex-col justify-between min-h-[220px] md:min-h-[260px]`}>
        <span className={`font-extrabold leading-none ${numClass || "text-5xl md:text-6xl"} ${
          isWhite ? "text-[#2563EB]" :
          isGradient ? "text-white/40" :
          "text-[#2563EB]/50"
        }`}>
          {item.num}
        </span>
        <div className="translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          <p className={`text-xs uppercase tracking-widest mb-2 ${
            isWhite ? "text-black/30" : isGradient ? "text-white/50" : "text-white/30"
          }`}>{item.cat}</p>
          <h3 className={`font-extrabold text-xl md:text-2xl uppercase leading-tight ${
            isWhite ? "text-black" : "text-white"
          }`}>{item.title}</h3>
          <p className={`text-[10px] uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
            isWhite ? "text-black/40" : "text-white/40"
          }`}>Ver detalle →</p>
        </div>
      </div>
    </article>
  );
}

export default function HighlightsRow() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState<Item | null>(null);

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

          {/* BENTO */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
          >
            <Card item={ITEMS[0]} onOpen={setModal} />
            <Card item={ITEMS[1]} className="md:col-span-2" numClass="text-5xl md:text-7xl" onOpen={setModal} />
            <Card item={ITEMS[2]} className="md:col-span-2" onOpen={setModal} />
            <Card item={ITEMS[3]} onOpen={setModal} />
            <Card item={ITEMS[4]} onOpen={setModal} />
            <Card item={ITEMS[5]} className="md:col-span-2" onOpen={setModal} />
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
            className="modal-panel relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] flex flex-col md:flex-row"
            style={{
              maxHeight: "90vh",
              background: modal.style === "gradient"
                ? "linear-gradient(135deg, #0d2260 0%, #1a3fa8 40%, #2563EB 70%, #1e50c8 100%)"
                : modal.style === "white"
                ? "#f5f5f5"
                : "#0e0e0e",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* imagen */}
            <div className="modal-img relative w-full md:w-[55%] aspect-square md:aspect-auto md:min-h-[400px] shrink-0">
              <Image src={modal.src} alt={modal.title} fill className="object-cover" sizes="600px" priority />
              {modal.style === "gradient" && (
                <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40"
                  style={{ background: "linear-gradient(135deg, #2563EB 0%, transparent 70%)" }} />
              )}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to right, transparent 60%, " + (modal.style === "white" ? "#f5f5f5" : modal.style === "gradient" ? "#1a3fa8" : "#0e0e0e") + " 100%)" }} />
            </div>

            {/* info */}
            <div className="flex flex-col justify-between p-8 md:p-10 flex-1">
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
