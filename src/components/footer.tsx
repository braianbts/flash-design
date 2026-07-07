"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-white/8">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* logo + descripción */}
          <div className="flex flex-col gap-4">
            <div className="relative w-10 h-10">
              <Image
                src="/small-logo.png"
                alt="Flash Design"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-[220px]">
              Personalización, upcycling y trabajos hechos a medida.
            </p>
          </div>

          {/* navegación */}
          <div className="flex flex-col gap-3">
            <p className="text-white/25 text-xs uppercase tracking-widest mb-1">Navegación</p>
            {[
              { href: "/", label: "Inicio" },
              { href: "/#new-arrivals", label: "Productos" },
              { href: "/#destacados", label: "Destacados" },
              { href: "/#nosotros", label: "Nosotros" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-white/50 text-sm hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* contacto + redes */}
          <div className="flex flex-col gap-3">
            <p className="text-white/25 text-xs uppercase tracking-widest mb-1">Contacto</p>
            <a
              href="https://kick.com/flashxdesign"
              target="_blank"
              rel="noreferrer"
              className="text-white/50 text-sm hover:text-[#53FC18] transition-colors"
            >
              Kick — flashxdesign
            </a>
            <a
              href="https://www.instagram.com/flashxdesign"
              target="_blank"
              rel="noreferrer"
              className="text-white/50 text-sm hover:text-white transition-colors"
            >
              Instagram — @flashxdesign
            </a>
            <a
              href="https://wa.me/5491151370031"
              target="_blank"
              rel="noreferrer"
              className="text-white/50 text-sm hover:text-[#2563EB] transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* bottom */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} Flash Design. Todos los derechos reservados.</p>
          <p className="text-white/20 text-xs">
            Desarrollado por{" "}
            <span className="text-white/40 font-semibold">Braian Yamil Barrientos</span>
            {" "}— Buenos Aires, Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}
