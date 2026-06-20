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
    description: "Transformamos cualquier sneaker en una pieza única intervenida a mano, completamente personalizada según tu estilo.",
    image: "/zapa1.jpg",       // TODO: reemplazar con foto de custom sneaker
  },
  {
    id: "blackout-botines",
    label: "Blackout botines",
    description: "Botines totalmente blackeados con pinturas profesionales para alta resistencia. Perfectos para cancha y street.",
    image: "/IMG1.jpg",        // TODO: reemplazar con foto blackout
  },
  {
    id: "custom-canvas-lujo",
    label: "Custom canvas de lujo",
    description: "Intervenimos piezas con canvas premium de lujo manteniendo calidad, detalle y durabilidad en cada accesorio.",
    image: "/canvas.jpg",      // TODO: reemplazar con foto canvas lujo
  },
  {
    id: "custom-just-married",
    label: "Custom Just Married",
    description: "Zapatillas personalizadas para novios. Un recuerdo único de un día inolvidable.",
    image: "/fileteado.jpg",   // TODO: reemplazar con foto just married
  },
  {
    id: "custom-cambio-materiales",
    label: "Custom cambio de materiales",
    description: "Restauración o reemplazo de materiales premium en sneakers: cuero, gamuza, canvas y más.",
    image: "/duki.jpeg",       // TODO: reemplazar con foto cambio materiales
  },
  {
    id: "curso-sneaker-custom",
    label: "Curso sneaker custom",
    description: "Aprendé desde cero a customizar zapatillas con nuestra metodología profesional.",
    image: "/openingwebflash.jpg", // TODO: reemplazar con foto del curso
    href: "https://cursosneakers.academikast.com?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnsoEfUmEUoloQF8aD5NIKHaU3VPFrnLQeLfgtL3MWdGQeXtrNMbLCBaXcUYw_aem_g2XSD7SNr-sWlW6fhdgPXg",
  },
];

export default function CategoriesSection() {
  const [active, setActive] = useState<Service>(SERVICES[0]);
  const activeIndex = SERVICES.findIndex((s) => s.id === active.id);

  return (
    <section id="categories" className="relative w-full overflow-hidden bg-[#0a0a0a] py-24 md:py-32">

      {/* destellos de fondo */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-15 transition-all duration-700"
          style={{ background: "#2563EB", transform: `translateX(calc(-50% + ${(activeIndex - 2) * 60}px))` }}
        />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-8"
          style={{ background: "#4d87f5" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-8 md:px-16">

        {/* header */}
        <div className="mb-14 md:mb-18">
          <p className="text-[#2563EB] text-xs font-bold uppercase tracking-[0.3em] mb-4">— Servicios</p>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase leading-[0.9] tracking-tight text-white">
            Lo que<br />
            <span className="text-white/25">hago.</span>
          </h2>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* lista de servicios */}
          <ul className="space-y-1">
            {SERVICES.map((s, i) => {
              const isActive = active.id === s.id;
              const Tag = s.href ? "a" : "button";
              const extraProps = s.href ? { href: s.href, target: "_blank", rel: "noreferrer" } : {};

              return (
                <li key={s.id}>
                  <Tag
                    {...(extraProps as any)}
                    onClick={() => setActive(s)}
                    className={`group flex items-center gap-4 w-full text-left py-4 border-b transition-all duration-300 ${
                      isActive
                        ? "border-[#2563EB]/40"
                        : "border-white/8 hover:border-white/20"
                    }`}
                  >
                    {/* número */}
                    <span className={`text-xs font-bold tabular-nums transition-colors duration-300 w-6 shrink-0 ${
                      isActive ? "text-[#2563EB]" : "text-white/20 group-hover:text-white/40"
                    }`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* label */}
                    <span className={`font-extrabold uppercase tracking-wide text-base md:text-lg transition-colors duration-300 flex-1 ${
                      isActive ? "text-white" : "text-white/35 group-hover:text-white/70"
                    }`}>
                      {s.label}
                    </span>

                    {/* flecha activa */}
                    <span className={`text-[#2563EB] transition-all duration-300 ${
                      isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                    }`}>
                      →
                    </span>
                  </Tag>
                </li>
              );
            })}
          </ul>

          {/* imagen + descripción */}
          <div className="space-y-6 md:sticky md:top-24">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#111]">
              <Image
                key={active.id}
                src={active.image}
                alt={active.label}
                fill
                className="object-cover transition-opacity duration-500"
                priority
              />
              {/* overlay sutil con nombre */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="text-white/50 text-xs uppercase tracking-widest">
                  {active.label}
                </span>
              </div>
            </div>

            <p className="text-white/50 text-sm leading-relaxed">
              {active.description}
            </p>

            {active.href && (
              <a
                href={active.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[#2563EB] text-sm font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                Ver curso →
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
