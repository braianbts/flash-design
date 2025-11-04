"use client";
import Image from "next/image";
import ProductCarousel from "@/components/product-carousel";

export default function NewArrivalsSection() {
  return (
    <section
      id="new-arrivals"
      className="relative mx-auto py-20 md:py-14"
    >
      {/* marco / banda de fondo (gris claro con bordes azules como en el diseño) */}
      <div className="relative bg-neutral-100 shadow-[0_20px_60px_rgba(0,0,0,0.25)]  overflow-hidden min-h-[600px] py-16">


        {/* cabecera con imagen “New Arrivals” y bajada */}
        <div className="relative flex items-end justify-between gap-4 px-6 pt-6 md:px-8 md:pt-8">
          <div>
            {/* Título desde imagen */}
            <div className="relative h-[64px] w-[320px] md:h-[88px] md:w-[440px]">
              <Image
                src="/newarrivals.png"
                alt="New Arrivals"
                fill
                className="object-contain"
                priority
              />
            </div>
            <p className="mt-1 text-sm md:text-base text-neutral-600">
              Nuevos lanzamientos, ediciones limitadas.
            </p>
          </div>

          {/* flechas (decorativas por ahora) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              aria-label="Anterior"
              className="rounded-lg border border-black/20 bg-white px-3 py-2 shadow-sm hover:bg-neutral-50"
            >
              ←
            </button>
            <button
              aria-label="Siguiente"
              className="rounded-lg border border-black/20 bg-white px-3 py-2 shadow-sm hover:bg-neutral-50"
            >
              →
            </button>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="px-4 pb-4 pt-2 md:px-8">
          <ProductCarousel tag="landing-featured" limit={8} />
        </div>
      </div>
    </section>
  );
}
