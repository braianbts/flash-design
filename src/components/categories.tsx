"use client";
import Image from "next/image";
import { useState } from "react";

type Service = {
  id: string;
  label: string;
  description: string;
  image: string;
  href?: string;
};

const SERVICES: Service[] = [
  {
    id: "custom-sneaker",
    label: "Custom sneaker",
    description:
      "Transformamos cualquier sneaker en una pieza única intervenida a mano, completamente personalizada según tu estilo.",
    image: "/services/custom-sneaker.jpg",
  },
  {
    id: "blackout-botines",
    label: "Blackout botines",
    description:
      "Botines totalmente blackeados con pinturas profesionales para alta resistencia. Perfectos para cancha y street.",
    image: "/services/blackout.jpg",
  },
  {
    id: "custom-canvas-lujo",
    label: "Custom canvas de lujo (accesorios / sneaker)",
    description:
      "Intervenimos piezas con canvas premium de lujo manteniendo calidad, detalle y durabilidad en cada accesorio.",
    image: "/services/luxury-canvas.jpg",
  },
  {
    id: "custom-just-married",
    label: "Custom Just Married",
    description:
      "Zapatillas personalizadas para novios. Un recuerdo único de un día inolvidable.",
    image: "/services/just-married.jpg",
  },
  {
    id: "custom-cambio-materiales",
    label: "Custom cambio de materiales",
    description:
      "Restauración o reemplazo de materiales premium en sneakers: cuero, gamuza, canvas y más.",
    image: "/services/material-swap.jpg",
  },
  {
    id: "curso-sneaker-custom",
    label: "Curso sneaker custom",
    description:
      "Aprendé desde cero a customizar zapatillas con nuestra metodología profesional.",
    image: "/services/curso.jpg",
    href: "https://cursosneakers.academikast.com?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnsoEfUmEUoloQF8aD5NIKHaU3VPFrnLQeLfgtL3MWdGQeXtrNMbLCBaXcUYw_aem_g2XSD7SNr-sWlW6fhdgPXg",
  },
];

export default function CategoriesSection() {
  const [active, setActive] = useState<Service>(SERVICES[0]);

  return (
    <section
      id="categories"
      className="relative w-full overflow-hidden py-14 md:py-16"
    >
      <div
        className="
          relative mx-auto max-w-6xl 
          px-4 sm:px-6 md:px-8 
          grid gap-8 md:gap-10 lg:gap-12
          md:grid-cols-[1.1fr_1.3fr]
          lg:grid-cols-[1.1fr_1.1fr_1.1fr]
          items-start
        "
      >
        {/* Columna izquierda: imagen grande */}
        <figure className="relative w-full rounded-xl overflow-hidden shadow-sm">
          <div className="aspect-[3/4] w-full">
            <Image
              src="/zapa1.jpg"
              alt="Zapatilla custom"
              fill
              className="object-cover"
              priority
            />
          </div>
        </figure>

        {/* Columna centro: título + lista de servicios */}
        <div className="flex flex-col gap-5 md:gap-6">


          {/* Lista de servicios */}
          <ul className="mt-1 space-y-3 md:space-y-4">
            {SERVICES.map((s) => {
              const isActive = active.id === s.id;
              const baseClasses =
                "block w-full text-left uppercase tracking-wide font-extrabold text-lg md:text-xl leading-snug px-5 py-3 rounded-md transition-all duration-200";

              return (
                <li key={s.id}>
                  {s.href ? (
                    <a
                      href={s.href}
                      onClick={() => setActive(s)}
                      className={
                        isActive
                          ? `${baseClasses} bg-black text-white`
                          : `${baseClasses} text-neutral-500 hover:bg-black hover:text-white`
                      }
                    >
                      {s.label}
                    </a>
                  ) : (
                    <button
                      onClick={() => setActive(s)}
                      className={
                        isActive
                          ? `${baseClasses} bg-black text-white`
                          : `${baseClasses} text-neutral-500 hover:bg-black hover:text-white`
                      }
                    >
                      {s.label}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Columna derecha: contenido dinámico */}
        <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
          {/* Texto dinámico */}
          <p className="text-neutral-900 text-sm md:text-[15px] leading-relaxed font-semibold transition-opacity duration-300">
            {active.description}
          </p>

          {/* Imagen dinámica, con aspect ratio fijo */}
          <div className="relative w-full rounded-xl overflow-hidden shadow-sm">
            <div className="aspect-[4/3] w-full">
              <Image
                key={active.id}
                src={active.image}
                alt={active.label}
                fill
                className="object-cover transition-all duration-500"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
