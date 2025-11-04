"use client";
import Image from "next/image";
import Link from "next/link";

export default function HeroFlash() {
  return (
    // Definimos altura del nav como variable para reusar
    <section
      className="relative w-full overflow-hidden text-white"
      style={{ ["--nav-h" as any]: "64px" }} // ajustá 56/64/72px si cambiás el nav
    >
      {/* Skip link para accesibilidad */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:left-4 focus:top-4
                   focus:bg-black focus:text-white focus:px-3 focus:py-2 focus:rounded"
      >
        Saltar al contenido
      </a>

      {/* NAVBAR (fijo + vidrio) */}
      <nav
        role="navigation"
        aria-label="Principal"
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 md:px-10"
        style={{ height: "var(--nav-h)" }}
      >
        {/* Fondo vidrio con fallback y sombra sutil */}
        <div
          className="absolute inset-0 -z-10 border-b border-white/10
                     bg-black/40 md:bg-black/25
                     supports-[backdrop-filter]:bg-black/30
                     supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150
                     shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
        />
        {/* Izquierda */}
        <div className="flex items-center gap-6 md:gap-8 text-[13px] md:text-sm tracking-widest uppercase">
          <Link href="#productos" className="text-neutral-300 hover:text-white transition-colors">Productos</Link>
          <Link href="#servicios" className="text-neutral-300 hover:text-white transition-colors">Servicios</Link>
        </div>

        {/* Logo centrado */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/small-logo.png"
            alt="Flash Design"
            width={42}
            height={42}
            className="object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.25)]"
            priority
          />
        </div>

        {/* Derecha */}
        <div className="flex items-center gap-6 md:gap-8 text-[13px] md:text-sm tracking-widest uppercase">
          <Link href="#sobre-mi" className="text-neutral-300 hover:text-white transition-colors">Sobre mí</Link>
          <Link href="#contacto" className="text-neutral-300 hover:text-white transition-colors">Contacto</Link>
        </div>
      </nav>

      {/* HERO */}
      <div
        className="relative w-full min-h-[70svh] md:min-h-[100svh] pt-[calc(var(--nav-h)+env(safe-area-inset-top,0px))]"
      >
        {/* Imagen de fondo */}
        <Image
          src="/IMG1.jpg"
          alt="Flash Design Hero"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover object-[50%_20%]"
        />

        {/* ========= BLOQUE DE TITULAR + SUBT + CTAs (tipo Manychat) ========= */}
        <div className="absolute inset-0 z-20">
          <div className="mx-auto max-w-7xl h-full px-6 md:px-10 flex items-center">
            <div className="max-w-[22ch]">
              <h1
              className="
                font-extrabold
                tracking-[-0.02em] md:tracking-[-0.028em]
                leading-[0.9] md:leading-[0.86]
                text-[clamp(2.6rem,6.5vw,3.7rem)]
              "
            >
              Redefinimos
              <br /> el arte del
              <br /> calzado custom.
            </h1>

              <p className="mt-6 max-w-[60ch] text-neutral-200 text-base md:text-lg leading-relaxed">
                Diseño, materiales y procesos premium.
Zapatillas personalizadas para quienes buscan destacar en cada paso.
              </p>

            </div>
          </div>
        </div>
        {/* ========= /BLOQUE ========= */}

        {/* Fades (dejarlos por debajo del texto) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>

      {/* Contenido ancla para skip link */}
      <div id="main" className="sr-only" />
    </section>
  );
}