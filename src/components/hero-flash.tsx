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
        const tx = currentRef.current.x * 12;
        const ty = currentRef.current.y * 7;
        const rx = -currentRef.current.y * 2.5;
        const ry = currentRef.current.x * 3;
        sneakerRef.current.style.transform =
          `translate(${tx}px, ${ty}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
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

  const show = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(18px)",
    transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <section className="relative w-full overflow-hidden text-white bg-[#060606]">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:left-4 focus:top-4 focus:bg-black focus:text-white focus:px-3 focus:py-2 focus:rounded">
        Saltar al contenido
      </a>

      <div
        className="relative w-full min-h-[100svh] flex flex-col"
        style={{ perspective: "1200px" }}
      >
        {/* FONDO */}
        <Image
          src="/IMG1.JPG"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_20%]"
          style={{ willChange: "transform" }}
        />

        {/* ZAPATILLA parallax */}
        <div
          ref={sneakerRef}
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ willChange: "transform", transformStyle: "preserve-3d", transition: "none" }}
        >
          <Image
            src="/IMG1-FONDO.png"
            alt="Flash Design sneaker"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_20%]"
            style={{ filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.7))" }}
          />
        </div>

        {/* Overlay oscuro izquierdo */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: "linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.12) 70%, transparent 100%)" }}
        />
        {/* Overlay top */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-black/70 to-transparent" />
        {/* Overlay bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 bg-gradient-to-t from-black/80 to-transparent" />

        {/* CONTENIDO */}
        <div className="relative z-20 flex flex-col justify-between flex-1 px-6 md:px-14 xl:px-20 pt-[calc(72px+env(safe-area-inset-top,0px))] pb-10 md:pb-14">

          {/* TOP ROW */}
          <div className="flex items-center justify-between" style={show(0.05)}>
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">
              Flash Design — Buenos Aires
            </span>
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-white/25">
              Est. 2020
            </span>
          </div>

          {/* CENTRO — tipografía monumental */}
          <div className="flex-1 flex flex-col justify-center mt-8 md:mt-0">

            {/* Palabra dispersa — solo desktop */}
            <div
              className="hidden md:flex items-center gap-10 mb-4 ml-1"
              style={show(0.15)}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/18">Diseño</span>
              <span className="w-8 h-px bg-white/10" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/18">Único</span>
              <span className="w-8 h-px bg-white/10" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/18">Premium</span>
            </div>

            {/* Headline monumental */}
            <div className="overflow-hidden" style={show(0.2)}>
              <h1
                className="font-black uppercase leading-[0.82] tracking-[-0.02em] text-white"
                style={{ fontSize: "clamp(3.2rem, 10.5vw, 10.5rem)" }}
              >
                <span className="block">Personalización</span>
                <span
                  className="block"
                  style={{
                    background: "linear-gradient(90deg, #60a5fa 0%, #2563EB 60%, #1d4ed8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  & Custom
                </span>
                <span
                  className="block text-white"
                  style={{ fontSize: "clamp(4rem, 14vw, 14rem)", letterSpacing: "-0.04em", lineHeight: 0.8 }}
                >
                  Sneakers.
                </span>
              </h1>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="flex items-end justify-between gap-6 mt-10 md:mt-8">

            {/* Descripción */}
            <p
              className="text-white/35 text-[11px] md:text-xs leading-relaxed max-w-[22ch] font-medium uppercase tracking-wide"
              style={show(0.5)}
            >
              Cada par,<br />una pieza única.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-5 md:gap-8" style={show(0.6)}>
              <a
                href="#destacados"
                className="group flex items-center gap-3 text-white text-[11px] md:text-xs font-black uppercase tracking-[0.25em] transition-all duration-300 hover:text-[#60a5fa]"
              >
                <span
                  className="w-8 h-px transition-all duration-300 group-hover:w-12"
                  style={{ background: "linear-gradient(90deg, #2563EB, #60a5fa)" }}
                />
                Ver trabajos
              </a>
              <a
                href="#categories"
                className="text-white/25 text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] hover:text-white/60 transition-colors duration-300"
              >
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
