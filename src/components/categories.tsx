"use client";
import Image from "next/image";
import { useState } from "react";

type Service = {
  id: string;
  label: string;
  description: string;
  images: string[];
  href?: string;
};

const SERVICES: Service[] = [
  {
    id: "s1",
    label: "Cambio de materiales",
    description: "Intercambiamos los materiales de la capellada por otros con distinta textura, color o diseño. El par mantiene sus parámetros originales sumando un estilo único. Cambiamos partes como el Swoosh, el Toe box y más — incluyendo custom canvas LV.",
    images: ["/srv-1.jpg", "/srv-1a.jpg", "/srv-4.jpg"],
  },
  {
    id: "s2",
    label: "Custom Just Married",
    description: "Una noche especial necesita un par único y diseñado para ese evento mágico. Creamos un custom exclusivo para el día más importante, pensado para que el par sea parte del recuerdo para siempre.",
    images: ["/srv-2.jpg", "/srv-2a.jpg", "/srv-2b.jpg"],
  },
  {
    id: "s3",
    label: "Re-work",
    description: "Transformamos un calzado urbano en un diseño más formal manteniendo la estética original. Reemplazamos suelas, agregamos material de cuero y creamos una customización única que eleva el par a otro nivel.",
    images: ["/srv-3.jpg", "/srv-3a.jpg", "/srv-3b.jpg"],
  },
  {
    id: "s4",
    label: "Blackout",
    description: "Dicen que los magos en el fútbol usan botines full negros — y nosotros podemos lograrlo. Customización íntegramente negra con pintura permanente y resistente al uso en cancha.",
    images: ["/srv-5.jpg"],
  },
  {
    id: "s5",
    label: "Custom Paint",
    description: "La customización más conocida y sin duda la que sabemos hacer a la perfección. Agregamos cualquier diseño en pintura sobre la capellada y en algunos casos sobre la suela. Arte directo sobre tu par.",
    images: [],
  },
  {
    id: "s6",
    label: "Sole Swap",
    description: "Muy conocido en el mundo coleccionista. Algunos pares exclusivos cumplen su ciclo de vida y necesitan suelas nuevas — ahí entramos nosotros para que esa pieza única vuelva a la vida. También creamos híbridos entre distintos modelos.",
    images: [],
  },
];

export default function CategoriesSection() {
  const [active, setActive] = useState<Service>(SERVICES[0]);
  const [imgIndex, setImgIndex] = useState(0);
  const activeIndex = SERVICES.findIndex((s) => s.id === active.id);

  const selectService = (s: Service) => {
    setActive(s);
    setImgIndex(0);
  };

  const prevImg = () => setImgIndex((i) => (i - 1 + active.images.length) % active.images.length);
  const nextImg = () => setImgIndex((i) => (i + 1) % active.images.length);

  const num = String(activeIndex + 1).padStart(2, "0");

  return (
    <section id="categories" className="relative w-full bg-[#080808] overflow-hidden">

      {/* ─── MOBILE ─── stack: header / image / service tabs */}
      <div className="block md:hidden">
        {/* header mobile */}
        <div className="px-6 pt-16 pb-8">
          <p className="text-[#2563EB] text-[10px] font-bold uppercase tracking-[0.3em] mb-3">— Servicios</p>
          <h2 className="text-5xl font-extrabold uppercase leading-[0.88] tracking-tight text-white">
            Lo que<br />
            <span className="text-white/20">hago.</span>
          </h2>
        </div>

        {/* imagen mobile — full width, tall */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#111]">
          {active.images.length > 0 ? (
            <Image
              key={`m-${active.id}-${imgIndex}`}
              src={active.images[imgIndex]}
              alt={active.label}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/15 text-xs uppercase tracking-widest">Fotos próximamente</span>
            </div>
          )}
          {/* overlay gradient bottom */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#080808] via-transparent to-transparent" />

          {/* número fantasma */}
          <div className="absolute top-4 right-5 text-[90px] font-extrabold leading-none text-white/5 select-none pointer-events-none">
            {num}
          </div>

          {/* flechas */}
          {active.images.length > 1 && (
            <>
              <button onClick={prevImg}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(8px)" }}>
                <span className="text-white text-base">‹</span>
              </button>
              <button onClick={nextImg}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(8px)" }}>
                <span className="text-white text-base">›</span>
              </button>
            </>
          )}

          {/* dots + counter */}
          <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-2">
            {active.images.length > 1 && (
              <div className="flex gap-1.5">
                {active.images.map((_, idx) => (
                  <button key={idx} onClick={() => setImgIndex(idx)}
                    className={`rounded-full transition-all ${idx === imgIndex ? "w-4 h-1.5 bg-[#2563EB]" : "w-1.5 h-1.5 bg-white/30"}`} />
                ))}
              </div>
            )}
          </div>

          {/* label activo */}
          <div className="absolute bottom-6 left-5">
            <span className="text-white text-sm font-bold uppercase tracking-widest">{active.label}</span>
            {active.description && (
              <p className="text-white/40 text-xs mt-0.5 max-w-[200px]">{active.description}</p>
            )}
          </div>
        </div>

        {/* service tabs mobile */}
        <div className="px-4 pt-6 pb-16 space-y-1">
          {SERVICES.map((s, i) => {
            const isActive = active.id === s.id;
            return (
              <button key={s.id} onClick={() => selectService(s)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl border transition-all duration-300 text-left ${
                  isActive
                    ? "bg-[#2563EB]/10 border-[#2563EB]/40"
                    : "border-white/6 hover:border-white/15 bg-transparent"
                }`}>
                <span className={`text-xs font-bold tabular-nums w-6 shrink-0 ${isActive ? "text-[#2563EB]" : "text-white/25"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`font-extrabold uppercase tracking-wide text-sm flex-1 ${isActive ? "text-white" : "text-white/35"}`}>
                  {s.label}
                </span>
                {isActive && <span className="text-[#2563EB] text-sm">→</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── DESKTOP ─── full viewport height split layout */}
      <div className="hidden md:grid md:grid-cols-[1fr_1fr] h-screen max-h-screen">

        {/* col izquierda — navegación */}
        <div className="relative flex flex-col justify-between px-16 xl:px-20 py-10 h-full overflow-hidden z-10">

          {/* header */}
          <div>
            <p className="text-[#2563EB] text-[10px] font-bold uppercase tracking-[0.35em] mb-6">— Servicios</p>
            <h2 className="text-[clamp(2.5rem,4.5vw,4rem)] font-extrabold uppercase leading-[0.85] tracking-tight text-white mb-8">
              Lo que<br />
              <span className="text-white/18">hago.</span>
            </h2>
          </div>

          {/* lista servicios */}
          <div className="flex-1 flex flex-col justify-center space-y-0">
            {SERVICES.map((s, i) => {
              const isActive = active.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => selectService(s)}
                  className={`group relative flex items-center gap-6 py-3 xl:py-4 border-b text-left transition-all duration-300 ${
                    isActive ? "border-[#2563EB]/30" : "border-white/6 hover:border-white/15"
                  }`}
                >
                  {/* barra lateral activo */}
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#2563EB] rounded-full" />
                  )}

                  <span className={`text-xs font-bold tabular-nums w-7 shrink-0 pl-4 transition-colors duration-300 ${
                    isActive ? "text-[#2563EB]" : "text-white/20 group-hover:text-white/40"
                  }`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1 min-w-0">
                    <span className={`block font-extrabold uppercase tracking-wide text-lg xl:text-xl transition-all duration-300 ${
                      isActive ? "text-white" : "text-white/30 group-hover:text-white/60"
                    }`}>
                      {s.label}
                    </span>
                    {isActive && s.description && (
                      <span className="block text-white/40 text-xs mt-1 font-normal normal-case tracking-normal">
                        {s.description}
                      </span>
                    )}
                  </div>

                  {/* dots fotos */}
                  {s.images.length > 1 && (
                    <span className="flex gap-1 shrink-0">
                      {s.images.map((_, idx) => (
                        <span key={idx} className={`rounded-full transition-all ${
                          isActive && imgIndex === idx
                            ? "w-3 h-1.5 bg-[#2563EB]"
                            : "w-1.5 h-1.5 bg-white/15"
                        }`} />
                      ))}
                    </span>
                  )}

                  <span className={`text-[#2563EB] text-lg shrink-0 transition-all duration-300 ${
                    isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                  }`}>→</span>
                </button>
              );
            })}
          </div>

          {/* footer info */}
          <div className="mt-12">
            <p className="text-white/15 text-xs uppercase tracking-widest">Flash Design · Buenos Aires</p>
          </div>
        </div>

        {/* col derecha — imagen full height */}
        <div className="relative overflow-hidden bg-[#111]">
          {/* imagen */}
          {active.images.length > 0 ? (
            <Image
              key={`d-${active.id}-${imgIndex}`}
              src={active.images[imgIndex]}
              alt={active.label}
              fill
              className="object-cover transition-opacity duration-500"
              priority
              sizes="50vw"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="text-white/10 text-6xl font-extrabold uppercase">{num}</span>
              <span className="text-white/20 text-xs uppercase tracking-widest">Fotos próximamente</span>
            </div>
          )}

          {/* overlay gradientes */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#080808] via-transparent to-transparent" style={{ width: "30%" }} />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-transparent to-transparent" />

          {/* número fantasma */}
          <div className="absolute top-12 right-10 text-[160px] xl:text-[200px] font-extrabold leading-none text-white/4 select-none pointer-events-none">
            {num}
          </div>

          {/* label activo — esquina inferior izquierda */}
          <div className="absolute bottom-10 left-10 right-10">
            <span className="block text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-1">
              {active.label}
            </span>
            <span className="block text-white text-2xl xl:text-3xl font-extrabold uppercase tracking-tight leading-tight">
              {active.description}
            </span>
          </div>

          {/* flechas navegación fotos */}
          {active.images.length > 1 && (
            <div className="absolute bottom-10 right-10 flex gap-2">
              <button onClick={prevImg}
                className="w-11 h-11 rounded-full flex items-center justify-center transition hover:scale-110"
                style={{ background: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                <span className="text-white">‹</span>
              </button>
              <button onClick={nextImg}
                className="w-11 h-11 rounded-full flex items-center justify-center transition hover:scale-110"
                style={{ background: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                <span className="text-white">›</span>
              </button>
              <span className="self-center text-white/30 text-xs ml-1 tabular-nums">
                {imgIndex + 1}/{active.images.length}
              </span>
            </div>
          )}

          {/* dots imagen */}
          {active.images.length > 1 && (
            <div className="absolute top-10 right-10 flex flex-col gap-1.5">
              {active.images.map((_, idx) => (
                <button key={idx} onClick={() => setImgIndex(idx)}
                  className={`rounded-full transition-all ${idx === imgIndex ? "h-4 w-1.5 bg-white" : "h-1.5 w-1.5 bg-white/30"}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
