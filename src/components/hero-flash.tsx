"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "@/components/magnetic-button";

export default function HeroFlash() {
  const sneakerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      // normalize -1 to 1
      targetRef.current = {
        x: (clientX - cx) / cx,
        y: (clientY - cy) / cy,
      };
    };

    const onLeave = () => {
      targetRef.current = { x: 0, y: 0 };
    };

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

  return (
    <section
      className="relative w-full overflow-hidden text-white"
      style={{ ["--nav-h" as any]: "64px" }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:left-4 focus:top-4
                   focus:bg-black focus:text-white focus:px-3 focus:py-2 focus:rounded"
      >
        Saltar al contenido
      </a>

      <div
        className="relative w-full min-h-[70svh] md:min-h-[100svh] pt-[calc(var(--nav-h)+env(safe-area-inset-top,0px))]"
        style={{ perspective: "1200px" }}
      >
        {/* FONDO — estático */}
        <Image
          src="/IMG1.JPG"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_20%]"
          style={{ willChange: "transform" }}
        />

        {/* ZAPATILLA — se mueve con el mouse */}
        <div
          ref={sneakerRef}
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            willChange: "transform",
            transformStyle: "preserve-3d",
            transition: "none",
          }}
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

        {/* TEXTO */}
        <div className="absolute inset-0 z-20">
          <div className="mx-auto max-w-7xl h-full px-8 md:px-16 flex items-center">
            <div>
              <div>
                {/* badge */}
                <div
                  className="inline-flex items-center gap-2 mb-5"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(12px)",
                    transition: "all 0.6s ease 0.1s",
                  }}
                >
                  <span
                    className="text-[10px] font-black uppercase tracking-[0.3em]"
                    style={{
                      background: "linear-gradient(90deg, #60a5fa, #2563EB)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Flash Design — Buenos Aires
                  </span>
                </div>

                {/* título */}
                <h1
                  className="font-extrabold uppercase leading-[0.88] tracking-tight"
                  style={{
                    fontSize: "clamp(2rem, 4.2vw, 3.4rem)",
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.7s ease 0.2s",
                  }}
                >
                  <span className="block text-white">Personalización</span>
                  <span className="block text-white">& Custom</span>
                  <span
                    className="block"
                    style={{
                      background: "linear-gradient(90deg, #60a5fa 0%, #2563EB 50%, #1d4ed8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Sneakers.
                  </span>
                </h1>

                {/* divider */}
                <div
                  className="my-5 h-px w-16"
                  style={{
                    background: "linear-gradient(90deg, #2563EB, transparent)",
                    opacity: mounted ? 1 : 0,
                    transition: "opacity 0.6s ease 0.5s",
                  }}
                />

                {/* descripción */}
                <p
                  className="text-white/50 text-sm md:text-base leading-relaxed max-w-[34ch]"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(12px)",
                    transition: "all 0.6s ease 0.55s",
                  }}
                >
                  Diseño, materiales y procesos premium.<br />
                  Cada par, único.
                </p>

                {/* CTAs */}
                <div
                  className="mt-8 flex items-center gap-4 flex-wrap"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(12px)",
                    transition: "all 0.6s ease 0.7s",
                  }}
                >
                  <MagneticButton
                    href="#destacados"
                    className="inline-flex items-center gap-2 bg-[#2563EB] text-white text-xs font-black uppercase tracking-widest px-6 py-3.5"
                    style={{ boxShadow: "4px 4px 0 rgba(0,0,0,0.4)" }}
                  >
                    Ver trabajos →
                  </MagneticButton>
                  <MagneticButton
                    href="#categories"
                    className="text-white/40 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Servicios ↓
                  </MagneticButton>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* overlay top */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
        {/* overlay bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* overlay izquierdo — legibilidad del texto */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[65%] md:w-[55%]"
          style={{
            background: "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 50%, transparent 100%)",
          }}
        />
      </div>

      <div id="main" className="sr-only" />
    </section>
  );
}
