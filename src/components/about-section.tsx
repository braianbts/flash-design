"use client";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="relative w-full  py-14 md:py-20">
      <div className="mx-auto max-w-[1180px] px-6 md:px-8">
        {/* === HEADER (como la referencia) === */}
        <div className="relative mb-10">
         

          {/* Título grande desplazado a la izquierda dejando “hueco” para el logo */}
          <div className="md:pl-[210px]">
            <div className="relative w-[420px] h-[95px] md:w-[650px] md:h-[180px]  -left-65 top-12">
              <Image
                src="/aboutme.png"
                alt="About me"
                fill
                className="object-contain"
                priority
              />
            </div>

          </div>
        </div>

         {/* LOGO superpuesto por arriba del texto, alineado a la izquierda */}
          <div className="absolute hidden md:block left-30 top-35 w-[190px] h-[230px] z-10">
            <Image
              src="/flashlogo.png"
              alt="Flash logo"
              fill
              className="object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.75)]"
              priority
            />
          </div>

        {/* === BLOQUE PRINCIPAL === */}
        <div className="border-[2px] border-black bg-[#EFEFEF] shadow-[0_8px_25px_rgba(0,0,0,0.2)] p-3 md:p-4 rounded-sm">
          {/* GRILLA */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* A1 */}
            <article className="md:col-span-5 border border-black bg-white shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
              <div className="relative h-[205px] md:h-[230px] bg-[#D9D9D9]" />
              <div className="flex items-center gap-3 border-t border-black/10 bg-[#ECECEC] px-3 py-2">
                <span className="mt-4 flex items-center justify-center gap-2 w-full md:w-[100%] bg-[#2563EB] text-white font-extrabold text-base py-1 shadow-[6px_6px_0_#000] transition-transform">
                  Creaciones que cuentan una historia.
                </span>
              </div>
              <p className="px-3 pb-3 pt-2 text-[13.5px] leading-relaxed text-neutral-800">
                Cada custom nace de una idea, un detalle o una vivencia. No son
                simples zapatillas: son piezas únicas pensadas para transmitir
                personalidad, estilo y momentos que marcan.
              </p>
            </article>

            {/* B1 */}
            <article className="md:col-span-4 border border-black bg-white shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
              <div className="relative h-[115px] md:h-[135px] bg-[#D9D9D9]" />
              <div className="px-3 pb-3 pt-3">
                <div className="w-full text-center">
              <span  className="mt-4 flex items-center justify-center gap-2 w-full md:w-[100%] bg-[#2563EB] text-white font-extrabold text-base py-1 shadow-[6px_6px_0_#000] transition-transform">
                  
                   Best Sellers de la casa.
                  </span>
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-neutral-800">
                  Estos diseños se convirtieron en los más pedidos por nuestra
                  comunidad. Custom exclusivos que ya son parte del día a día de
                  artistas y referentes de la cultura urbana.
                </p>
              </div>
            </article>

            {/* C1 */}
            <article className="md:col-span-3 border border-black bg-white shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
              <div className="relative h-[365px] md:h-[390px] bg-[#D9D9D9]" />
            </article>

            {/* A2 */}
            <article className="md:col-span-5 border border-black bg-white shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-[200px] md:h-[230px] bg-[#D9D9D9] border-b md:border-b-0 md:border-r border-black/15" />
                <div className="p-3">
                  <span className="mt-4 flex items-center justify-center gap-2 w-full md:w-[100%] bg-[#2563EB] text-white font-extrabold text-base py-1 shadow-[6px_6px_0_#000] transition-transform">
                    Detalles que importan.
                  </span>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-neutral-800">
                    Cada trazo, color y cada textura están pensados para que la
                    zapatilla no sea un accesorio más, sino una pieza de diseño
                    irrepetible. Diseños exclusivos que no se repiten. Una vez
                    que salen, se convierten en piezas de colección que resaltan
                    en cualquier outfit.
                  </p>
                </div>
              </div>
            </article>

            {/* B2 */}
            <article className="md:col-span-4 border border-black bg-white shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
              <div className="relative h-[205px] md:h-[230px] bg-[#D9D9D9]" />
              <div className="px-3 pb-3 pt-2">
                              <span  className="mt-4 flex items-center justify-center gap-2 w-full md:w-[100%] bg-[#2563EB] text-white font-extrabold text-base py-1 shadow-[6px_6px_0_#000] transition-transform">

  De la calle para la calle.
                </span>
                <p className="mt-2 text-[13.5px] leading-relaxed text-neutral-800">
                  Creamos para quienes buscan diferenciarse. Zapatillas hechas a
                  mano, con dedicación y estilo propio.
                </p>
              </div>
            </article>

            {/* C2 */}
            <article className="md:col-span-3 border border-black bg-white shadow-[0_4px_8px_rgba(0,0,0,0.1)] p-3">
              <span  className="mt-4 flex items-center justify-center gap-2 w-full md:w-[100%] bg-[#2563EB] text-white font-extrabold text-base py-1 shadow-[6px_6px_0_#000] transition-transform">
                Ediciones limitadas.
              </span>
              <p className="mt-2 text-[13.5px] leading-relaxed text-neutral-800">
                Cada par custom no es solo calzado, es una obra lista para
                acompañarte en tu día a día.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
