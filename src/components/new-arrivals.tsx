"use client";
import Image from "next/image";
import ProductCarousel from "@/components/product-carousel";

export default function NewArrivalsSection() {
  return (
    <section id="new-arrivals" className="relative mx-auto py-0">
      <div className="relative bg-[#111] border-y border-white/8 overflow-hidden min-h-[600px] py-16">

        {/* ghost logo fondo */}
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
          <img
            src="/small-logo.png"
            alt=""
            style={{ width: "38vw", maxWidth: 460, opacity: 0.07, filter: "brightness(0) invert(1)" }}
          />
        </div>

        <div className="relative flex items-end justify-between gap-4 px-10 pt-8 md:px-20 md:pt-10">
          <div>
            <div className="relative h-[64px] w-[320px] md:h-[88px] md:w-[440px]">
              <Image
                src="/newarrivals.png"
                alt="New Arrivals"
                fill
                className="object-contain brightness-0 invert"
                priority
              />
            </div>
            <p className="mt-1 text-sm md:text-base text-white/50">
              Nuevos lanzamientos, ediciones limitadas.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              aria-label="Anterior"
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white hover:bg-white/10 transition"
            >
              ←
            </button>
            <button
              aria-label="Siguiente"
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white hover:bg-white/10 transition"
            >
              →
            </button>
          </div>
        </div>

        <div className="pb-10 pt-4">
          <ProductCarousel />
        </div>
      </div>
    </section>
  );
}
