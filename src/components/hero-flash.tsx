"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HeroFlash() {
  const sneakerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetRef.current = { x: (clientX - cx) / cx, y: (clientY - cy) / cy };
    };
    const onLeave = () => { targetRef.current = { x: 0, y: 0 }; };
    const animate = () => {
      const lerp = 0.06;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp;
      if (sneakerRef.current) {
        sneakerRef.current.style.transform =
          `translate(${currentRef.current.x * 14}px, ${currentRef.current.y * 8}px) rotateX(${-currentRef.current.y * 2.5}deg) rotateY(${currentRef.current.x * 3}deg)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const fade = (delay: number, y = 20) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : `translateY(${y}px)`,
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <section className="relative w-full overflow-hidden text-white bg-[#060606]">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:left-4 focus:top-4 focus:bg-black focus:text-white focus:px-3 focus:py-2 focus:rounded">
        Saltar al contenido
      </a>

      <div className="relative w-full h-[100svh] md:min-h-[100svh] md:h-auto flex flex-col" style={{ perspective: "1200px" }}>

        {/* FONDO */}
        <Image src="/IMG1.JPG" alt="" fill priority sizes="100vw"
          className="object-cover object-[60%_20%]"
          style={{ willChange: "transform" }}
        />

        {/* ZAPATILLA parallax */}
        <div ref={sneakerRef} className="absolute inset-0 z-10 pointer-events-none"
          style={{ willChange: "transform", transformStyle: "preserve-3d" }}>
          <Image src="/IMG1-FONDO.png" alt="Flash Design sneaker" fill priority sizes="100vw"
            className="object-cover object-[60%_20%]"
            style={{ filter: "drop-shadow(0 40px 100px rgba(0,0,0,0.8))" }}
          />
        </div>

        {/* Gradientes de composición */}
        {/* izquierdo fuerte */}
        <div className="pointer-events-none absolute inset-0 z-10"
          style={{ background: "linear-gradient(100deg, rgba(4,4,4,0.96) 0%, rgba(4,4,4,0.75) 38%, rgba(4,4,4,0.25) 62%, transparent 80%)" }}
        />
        {/* top */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-black/80 to-transparent" />
        {/* bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-52 bg-gradient-to-t from-black/90 to-transparent" />

        {/* Línea vertical decorativa — solo desktop */}
        <div className="hidden md:block pointer-events-none absolute left-[58%] top-0 bottom-0 z-10 w-px"
          style={{ background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent 100%)" }}
        />

        {/* LAYOUT */}
        <div className="relative z-20 flex flex-col flex-1 px-7 md:px-14 xl:px-20
          pt-[calc(68px+env(safe-area-inset-top,0px))] pb-10 md:pb-12">

          {/* TOP BAR */}
          <div className="flex items-center justify-between" style={fade(0.05, 10)}>
            <span className="text-[9px] font-bold uppercase tracking-[0.38em] text-white/30">
              Flash Design — Buenos Aires
            </span>
            <div className="hidden md:flex items-center gap-6">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/15">Sneaker Customization</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/15">Est. 2020</span>
            </div>
          </div>

          {/* MOBILE: imagen centrada en espacio restante */}
          <div className="md:hidden flex-1 flex items-center justify-center" style={fade(0.2, 24)}>
            <Image
              src="/custom-opening-phone.png"
              alt="Personalización & Custom Sneakers."
              width={800}
              height={800}
              priority
              className="w-[86vw] h-auto object-contain"
              style={{ filter: "drop-shadow(0 8px 40px rgba(0,0,0,0.6))" }}
            />
          </div>

          {/* DESKTOP: headline + etiqueta */}
          <div className="hidden md:flex flex-1 flex-col justify-center">
            <div className="flex items-center gap-3 mb-5" style={fade(0.12, 14)}>
              <span className="w-6 h-px bg-[#2563EB]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2563EB]">
                Diseño · Materiales · Arte
              </span>
            </div>
            <div style={fade(0.2, 24)}>
              <Image
                src="/custom-opening.png"
                alt="Personalización & Custom Sneakers."
                width={1200}
                height={420}
                priority
                className="w-full max-w-[clamp(320px,72vw,900px)] h-auto"
                style={{ filter: "drop-shadow(0 8px 40px rgba(0,0,0,0.5))" }}
              />
            </div>
            <div className="flex items-center gap-10 mt-8" style={fade(0.45, 14)}>
              <div className="h-px flex-1 max-w-[60px]" style={{ background: "rgba(255,255,255,0.1)" }} />
              <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.35em]">Buenos Aires</span>
              <span className="text-white/10 text-[10px]">·</span>
              <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.35em]">Argentina</span>
              <span className="text-white/10 text-[10px]">·</span>
              <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.35em]">100% Handmade</span>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="flex items-end justify-between gap-4 mt-8 md:mt-10">
            <p className="text-white/25 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.25em] leading-relaxed" style={fade(0.55, 10)}>
              Cada par,<br className="hidden md:block" /> una pieza única.
            </p>

            <div className="flex items-center gap-6 md:gap-10" style={fade(0.65, 10)}>
              <a href="#destacados"
                className="group flex items-center gap-3 text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] hover:text-[#60a5fa] transition-colors duration-300">
                <span className="w-6 md:w-8 h-px bg-[#2563EB] transition-all duration-300 group-hover:w-12" />
                Ver trabajos
              </a>
              <a href="#categories"
                className="text-white/20 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] hover:text-white/50 transition-colors duration-300">
                Servicios ↓
              </a>
            </div>
          </div>

        </div>
      </div>

      <div id="main" className="sr-only" />
    </section>
  );
}
