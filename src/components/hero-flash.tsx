"use client";
import Image from "next/image";

export default function HeroFlash() {
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

      {/* HERO */}
      <div className="relative w-full min-h-[70svh] md:min-h-[100svh] pt-[calc(var(--nav-h)+env(safe-area-inset-top,0px))]">
        <Image
          src="/IMG1.JPG"
          alt="Flash Design Hero"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover object-[50%_20%]"
        />

        <div className="absolute inset-0 z-20">
          <div className="mx-auto max-w-7xl h-full px-6 md:px-10 flex items-center">
            <div className="max-w-[22ch]">
              <h1
                className="
                  font-extrabold
                  tracking-[-0.02em] md:tracking-[-0.030em]
                  leading-[0.9] md:leading-[0.86]
                  text-[clamp(2.6rem,6.5vw,3.7rem)]
                "
              >
                Personalizacion,
                <br /> upcycling,
                <br /> trabajos hechos a medida.
              </h1>

              <p className="mt-6 max-w-[60ch] text-neutral-200 text-base md:text-lg leading-relaxed">
                Diseño, materiales y procesos premium.
                <br />
                Calzado personalizado para quienes buscan destacar en cada paso.
              </p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>

      <div id="main" className="sr-only" />
    </section>
  );
}
