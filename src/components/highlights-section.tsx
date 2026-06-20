"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

const ITEMS = [
  { num: "01", cat: "Colaboración", title: "Adidas × Bizarrap", src: "/biza.png" },
  { num: "02", cat: "Edición limitada", title: "Aire Porteño — Fileteado", src: "/fileteado.JPG" },
  { num: "03", cat: "Colaboración", title: "Adidas × Duki", src: "/duki.jpeg" },
  { num: "04", cat: "Upcycling", title: "Luxury Canvas", src: "/canvas.jpg" },
];

// Card con bokeh swirl — igual al Octo gradient card
function GradientCard({
  item,
  className = "",
  numClass = "",
}: {
  item: (typeof ITEMS)[0];
  className?: string;
  numClass?: string;
}) {
  return (
    <article className={`relative rounded-3xl overflow-hidden ${className}`}
      style={{ background: "linear-gradient(135deg, #0d2260 0%, #1a3fa8 40%, #2563EB 70%, #1e50c8 100%)" }}>

      {/* bokeh blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-30%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[60px] opacity-60"
          style={{ background: "radial-gradient(circle, #4d87f5 0%, #1a3fa8 60%, transparent 100%)" }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[50px] opacity-50"
          style={{ background: "radial-gradient(circle, #0a1f6b 0%, #2563EB 50%, transparent 100%)" }} />
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full blur-[40px] opacity-40"
          style={{ background: "radial-gradient(circle, #6fa3ff 0%, transparent 70%)" }} />
      </div>

      {/* imagen como textura sutil */}
      <div className="absolute inset-0 opacity-15 mix-blend-luminosity">
        <Image src={item.src} alt={item.title} fill className="object-cover" />
      </div>

      {/* contenido */}
      <div className="relative z-10 p-7 md:p-8 h-full flex flex-col justify-between min-h-[220px] md:min-h-[260px]">
        <span className={`font-extrabold leading-none text-white/40 ${numClass || "text-5xl md:text-6xl"}`}>
          {item.num}
        </span>
        <div>
          <p className="text-white/50 text-xs uppercase tracking-widest mb-2">{item.cat}</p>
          <h3 className="text-white font-extrabold text-xl md:text-2xl uppercase leading-tight">{item.title}</h3>
        </div>
      </div>
    </article>
  );
}

function DarkCard({ item, className = "" }: { item: (typeof ITEMS)[0]; className?: string }) {
  return (
    <article className={`relative rounded-3xl overflow-hidden bg-[#111] border border-white/8 group ${className}`}>
      {/* imagen sutil */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity">
        <Image src={item.src} alt={item.title} fill className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/80 to-transparent" />

      <div className="relative z-10 p-7 md:p-8 h-full flex flex-col justify-between min-h-[220px] md:min-h-[260px]">
        <span className="text-5xl md:text-6xl font-extrabold leading-none text-[#2563EB]/50">
          {item.num}
        </span>
        <div>
          <p className="text-white/30 text-xs uppercase tracking-widest mb-2">{item.cat}</p>
          <h3 className="text-white font-extrabold text-xl md:text-2xl uppercase leading-tight">{item.title}</h3>
        </div>
      </div>
    </article>
  );
}

function WhiteCard({ item, className = "" }: { item: (typeof ITEMS)[0]; className?: string }) {
  return (
    <article className={`relative rounded-3xl overflow-hidden bg-white group ${className}`}>
      <div className="relative z-10 p-7 md:p-8 h-full flex flex-col justify-between min-h-[220px] md:min-h-[260px]">
        <span className="text-5xl md:text-6xl font-extrabold leading-none text-[#2563EB]">
          {item.num}
        </span>
        <div>
          <p className="text-black/30 text-xs uppercase tracking-widest mb-2">{item.cat}</p>
          <h3 className="text-black font-extrabold text-xl md:text-2xl uppercase leading-tight">{item.title}</h3>
        </div>
      </div>
    </article>
  );
}

export default function HighlightsRow() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) gridRef.current?.classList.add("hl-visible"); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
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
            Los pares más icónicos de nuestra colección
          </p>
        </div>

        {/* BENTO — 3 cols desktop, 1 col mobile */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
        >
          {/* 01 — blanca, 1 col */}
          <WhiteCard item={ITEMS[0]} />

          {/* 02 — gradient, 2 cols */}
          <GradientCard item={ITEMS[1]} className="md:col-span-2" numClass="text-5xl md:text-7xl" />

          {/* 03 — gradient, 2 cols */}
          <GradientCard item={ITEMS[2]} className="md:col-span-2" />

          {/* 04 — dark, 1 col */}
          <DarkCard item={ITEMS[3]} />
        </div>
      </div>

      <style jsx>{`
        .hl-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}
