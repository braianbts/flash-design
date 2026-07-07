"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/#new-arrivals", label: "Productos" },
  { href: "/#destacados", label: "Destacados" },
  { href: "/#nosotros", label: "Nosotros" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);

  // dark = sobre hero imagen, light = páginas internas
  const dark = true; // siempre dark — sitio es oscuro

  return (
    <>
      <nav
        aria-label="Principal"
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 ${
          dark ? "text-white" : "text-black"
        }`}
      >
        {/* fondo */}
        <div
          className={`absolute inset-0 -z-10 border-b transition-colors ${
            dark
              ? "border-white/10 bg-black/30 supports-[backdrop-filter]:bg-black/20 supports-[backdrop-filter]:backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
              : "border-black/10 bg-white/90 supports-[backdrop-filter]:backdrop-blur-md shadow-sm"
          }`}
        />

        {/* links izquierda — desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.slice(0, 2).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-semibold uppercase tracking-wide transition-colors hover:text-[#2563EB] ${
                dark ? "text-white/80" : "text-black/70"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* logo centrado */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2"
          aria-label="Flash Design — inicio"
        >
          <Image
            src="/small-logo.png"
            alt="Flash Design"
            width={40}
            height={40}
            className={`object-contain drop-shadow-sm ${dark ? "brightness-100" : "brightness-0"}`}
            priority
          />
        </Link>

        {/* links derecha — desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.slice(2).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-semibold uppercase tracking-wide transition-colors hover:text-[#2563EB] ${
                dark ? "text-white/80" : "text-black/70"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://wa.me/5491151370031"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-extrabold uppercase tracking-wide px-4 py-1.5 bg-[#2563EB] text-white hover:bg-blue-700 transition-colors"
          >
            Contacto
          </a>
        </div>

        {/* hamburger — mobile */}
        <button
          className="md:hidden ml-auto"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* menú mobile */}
      {open && (
        <div
          className={`fixed inset-x-0 top-16 z-40 flex flex-col gap-1 px-6 py-6 border-b shadow-lg md:hidden ${
            dark ? "bg-black/90 text-white border-white/10" : "bg-white text-black border-black/10"
          }`}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-semibold uppercase tracking-wide py-2 border-b border-current/10 hover:text-[#2563EB] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://wa.me/5491151370031"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 text-center font-extrabold uppercase tracking-wide px-4 py-3 bg-[#2563EB] text-white"
          >
            Contacto
          </a>
        </div>
      )}
    </>
  );
}
