"use client";
import Image from "next/image";
import { useState } from "react";

const CATEGORIES = ["Lifestyle", "Running", "Basketball", "Etc", "Etc"];

export default function CategoriesSection() {
  const [active, setActive] = useState<string | null>("Running");

  const CATEGORIES = [
  { id: "lifestyle", label: "Lifestyle" },
  { id: "running",   label: "Running" },
  { id: "basketball",label: "Basketball" },
  { id: "etc-1",     label: "Etc" },
  { id: "etc-2",     label: "Etc" },
];

  return (
    <section id="categories" className="relative w-full overflow-hidden py-16">

      <div className="relative mx-auto max-w-[1300px] px-6 md:px-10 grid gap-10 md:gap-12 md:grid-cols-[1fr_1.1fr_1fr] items-start">
        {/* Columna izquierda: imagen 1 */}
        <figure className="relative w-full rounded-lg overflow-hidden">
          <Image
            src="/zapa1.jpeg"
            alt="Zapatilla custom"
            width={900}
            height={1200}
            className="h-auto w-full object-cover rounded-lg"
            priority
          />
        </figure>

        {/* Columna centro: título + subtítulo + categorías */}
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Título como imagen */}
          <div className="relative h-[72px] w-[320px] md:h-[100px] md:w-[380px]">
            <Image
              src="/categorias.png"
              alt="Categorías"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Lista de categorías (más grande) */}
          <ul className="mt-2 space-y-4">
                {CATEGORIES.map(({ id, label }) => {
                    const isActive = active === id;
                    return (
                    <li key={id}>
                        <button
                        onClick={() => setActive(id)}
                        className={[
                            "w-full text-left uppercase tracking-wide font-extrabold",
                            "text-2xl md:text-[28px] leading-none",
                            "px-6 py-4 rounded-md transition-all duration-200",
                            isActive ? "bg-black text-white" : "text-neutral-500 hover:bg-black hover:text-white",
                        ].join(" ")}
                        >
                        {label}
                        </button>
                    </li>
                    );
                })}
                </ul>
        </div>

        {/* Columna derecha: párrafo arriba + imagen 2 + botón debajo */}
<div className="flex flex-col gap-6 md:gap-8">
  {/* Párrafo arriba de la imagen */}
  <p className="text-neutral-900 text-[15px] md:text-base leading-relaxed font-semibold">
    Cada par de zapatillas custom es una pieza única, diseñada a mano
    con atención al detalle y pensada para expresar la identidad de
    quien la usa.
  </p>

  {/* Imagen derecha */}
  <div className="relative w-full rounded-lg overflow-hidden">
    <Image
      src="/zapa2.jpg"
      alt="Zapatilla custom 2"
      width={1000}
      height={700}
      className="h-auto w-full object-cover rounded-lg"
    />
  </div>

  {/* Botón mismo ancho que la imagen */}
  <div className="w-full">
    <button className="w-full bg-[#2563EB] text-white font-extrabold text-lg md:text-xl py-3 shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0_#000] transition-transform rounded-[2px]">
      VER MÁS
    </button>
  </div>
</div>

      </div>
    </section>
  );
}
