"use client";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useRef, useState, useEffect, useMemo } from "react";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then(async (r) => {
    const json = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(json?.error || json?.message || `Error ${r.status}`);
    return json;
  });

type TnLangField = string | { es?: string; en?: string; pt?: string };
type TnImage = { src: string };
type TnVariant = { price: string; compare_at_price?: string | null };
type TnProduct = {
  id: number;
  name: TnLangField;
  description?: TnLangField;
  handle?: TnLangField;
  canonical_url?: string;
  images?: TnImage[];
  variants?: TnVariant[];
};

function getLang(field: TnLangField | undefined, fallback = ""): string {
  if (!field) return fallback;
  if (typeof field === "string") return field;
  return field.es || field.en || field.pt || fallback;
}

function cleanDescription(html: string): string {
  if (!html) return "";
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  let decoded = textarea.value;
  decoded = decoded.replace(/caracteristicas[\s:]*?/i, "");
  decoded = decoded.replace(/<[^>]+>/g, " ");
  decoded = decoded.replace(/\s+/g, " ").trim();
  return decoded;
}

export default function FeaturedProduct() {
  const { data } = useSWR<{ items: TnProduct[] }>("/api/tn/products?limit=50", fetcher);

  const product = useMemo(() => {
    if (!data?.items?.length) return null;
    const withImage = data.items.filter((p) => p.images?.[0]?.src && p.variants?.[0]?.price);
    const pool = withImage.length ? withImage : data.items;
    return pool[Math.floor(Math.random() * pool.length)];
  }, [data]);

  const name = product ? getLang(product.name) : "Producto destacado";
  const nameParts = name.toUpperCase().split(" ");
  const price = product ? Number(product.variants?.[0]?.price ?? 0) : 0;
  const image = product?.images?.[0]?.src || "/product.png";
  const canonicalUrl = product?.canonical_url;
  const rawDesc = product ? getLang(product.description) : "";
  const description = rawDesc ? cleanDescription(rawDesc) : "";

  const formattedPrice = price > 0
    ? price.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })
    : "";

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  // tilt
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tiltStyle, setTiltStyle] = useState("perspective(1400px) rotateX(0deg) rotateY(0deg)");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isFine, setIsFine] = useState(false);
  useEffect(() => { setIsFine(window.matchMedia("(pointer: fine)").matches); }, []);

  let raf = 0;
  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isFine || !cardRef.current) return;
    cancelAnimationFrame(raf);
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    raf = requestAnimationFrame(() => {
      setTiltStyle(`perspective(1400px) rotateX(${ny * -6}deg) rotateY(${nx * 6}deg)`);
      setGlare({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100, opacity: 0.12 });
    });
  };
  const onLeave = () => {
    cancelAnimationFrame(raf);
    setTiltStyle("perspective(1400px) rotateX(0deg) rotateY(0deg)");
    setGlare((g) => ({ ...g, opacity: 0 }));
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#080808]">

      {/* ── glow atmosférico ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-12"
          style={{ background: "#1d4ed8" }} />
      </div>

      {/* ── NOMBRE FANTASMA ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center overflow-hidden select-none">
        <span className="text-[clamp(6rem,18vw,16rem)] font-extrabold uppercase leading-none text-white/[0.025] whitespace-nowrap pl-8">
          {name}
        </span>
      </div>

      <div className={`relative z-10 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

        {/* ── DESKTOP ── */}
        <div className="hidden md:flex items-stretch mx-8 xl:mx-14 my-8 xl:my-10 rounded-2xl overflow-hidden" style={{ height: "calc(100vh - 5rem)" }}>

          {/* col izquierda — texto */}
          <div className="flex flex-col justify-center px-16 xl:px-24 py-20 w-[48%] shrink-0">
            <p className="text-[#2563EB] text-[10px] font-bold uppercase tracking-[0.35em] mb-10">
              — Producto destacado
            </p>

            {/* nombre tipografía grande */}
            <h2 className="font-extrabold uppercase leading-[0.85] tracking-tight text-white mb-8"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}>
              {nameParts.map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h2>

            {/* línea separadora */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-[#2563EB]" />
              <span className="text-white/20 text-xs uppercase tracking-widest">Flash Design</span>
            </div>

            {formattedPrice && (
              <p className="text-[#2563EB] font-extrabold tracking-tight mb-6"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                {formattedPrice}
              </p>
            )}

            {description && (
              <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-10">
                {description.length > 180 ? description.slice(0, 180) + "…" : description}
              </p>
            )}

            <div className="flex items-center gap-4">
              {canonicalUrl ? (
                <a href={canonicalUrl} target="_blank" rel="noreferrer"
                  className="group inline-flex items-center gap-3 bg-[#2563EB] text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 transition-all hover:bg-white hover:text-[#2563EB]">
                  <ShoppingCart size={16} />
                  Ver en la tienda
                </a>
              ) : (
                <button className="inline-flex items-center gap-3 bg-[#2563EB] text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 transition-all hover:bg-white hover:text-[#2563EB]">
                  <ShoppingCart size={16} />
                  Ver producto
                </button>
              )}
              <span className="text-white/15 text-xs uppercase tracking-widest">TiendaNube →</span>
            </div>
          </div>

          {/* col derecha — imagen sangra al borde */}
          <div className="flex-1 relative">
            {/* gradiente fusión izquierda */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
              style={{ background: "linear-gradient(90deg, #080808 0%, transparent 100%)" }} />
            {/* gradiente top/bottom */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 z-10"
              style={{ background: "linear-gradient(180deg, #080808 0%, transparent 100%)" }} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 z-10"
              style={{ background: "linear-gradient(0deg, #080808 0%, transparent 100%)" }} />

            {/* card con tilt */}
            <div
              ref={cardRef}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              className="absolute inset-8 xl:inset-12 rounded-2xl overflow-hidden cursor-none"
              style={{ transform: tiltStyle, transition: "transform 0.15s ease-out", willChange: "transform" }}
            >
              <Image src={image} alt={name} fill className="object-cover" priority sizes="55vw" />

              {/* glare */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
                }} />

              {/* overlay sutil */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, transparent 50%)" }} />

              {/* badge precio mobile-inside */}
              {formattedPrice && (
                <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                  <span className="text-white font-extrabold text-sm">{formattedPrice}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="block md:hidden">
          {/* imagen full width */}
          <div className="relative w-full aspect-[4/5] overflow-hidden">
            <Image src={image} alt={name} fill className="object-cover" priority sizes="100vw" />
            <div className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(to top, #080808 0%, rgba(8,8,8,0.4) 50%, transparent 100%)" }} />

            {/* badge precio */}
            {formattedPrice && (
              <div className="absolute top-5 right-5 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                <span className="text-white font-extrabold text-sm">{formattedPrice}</span>
              </div>
            )}

            {/* nombre sobre imagen */}
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[#2563EB] text-[9px] font-bold uppercase tracking-[0.3em] mb-2">— Producto destacado</p>
              <h2 className="text-3xl font-extrabold uppercase leading-[0.88] tracking-tight text-white">
                {name}
              </h2>
            </div>
          </div>

          {/* info mobile */}
          <div className="px-6 py-8 space-y-5">
            {description && (
              <p className="text-white/40 text-sm leading-relaxed">
                {description.length > 160 ? description.slice(0, 160) + "…" : description}
              </p>
            )}
            {canonicalUrl ? (
              <a href={canonicalUrl} target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#2563EB] text-white font-extrabold text-xs uppercase tracking-widest py-4 transition-all active:opacity-80">
                <ShoppingCart size={16} />
                Ver en la tienda
              </a>
            ) : (
              <button className="flex items-center justify-center gap-3 w-full bg-[#2563EB] text-white font-extrabold text-xs uppercase tracking-widest py-4">
                <ShoppingCart size={16} />
                Ver producto
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
