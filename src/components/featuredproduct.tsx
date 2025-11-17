"use client";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useRef, useState, useEffect, useMemo } from "react";
import useSWR from "swr";

// ---------- fetcher ----------
const fetcher = (url: string) =>
  fetch(url).then(async (r) => {
    const json = await r.json().catch(() => ({}));
    if (!r.ok) {
      const msg = json?.error || json?.message || `Network error (${r.status})`;
      throw new Error(msg);
    }
    return json;
  });

// ---------- Tipos Tiendanube ----------
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

type ApiResponse = { items: TnProduct[] };

// ---------- helper multilanguage ----------
function getLang(field: TnLangField | undefined, fallback: string = ""): string {
  if (!field) return fallback;
  if (typeof field === "string") return field;
  return field.es || field.en || field.pt || fallback;
}

// ---------- LIMPIAR DESCRIPCIÓN ----------
function cleanDescription(html: string): string {
  if (!html) return "";

  // 1) Decodificar entidades (&nbsp; etc.)
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  let decoded = textarea.value;

  // 2) Quitar CARACTERISTICAS del inicio (con variantes)
  decoded = decoded.replace(/caracteristicas[\s:]*?/i, "");

  // 3) Remover etiquetas HTML
  decoded = decoded.replace(/<[^>]+>/g, " ");

  // 4) Colapsar espacios múltiples
  decoded = decoded.replace(/\s+/g, " ").trim();

  return decoded;
}

export default function FeaturedProduct() {
  // -------------------------------
  // Fetch producto random
  // -------------------------------
  const { data, error } = useSWR<ApiResponse>("/api/tn/products?limit=50", fetcher);

  const product = useMemo(() => {
    if (!data?.items?.length) return null;
    const withImage = data.items.filter(
      (p: any) => p.images?.[0]?.src && p.variants?.[0]?.price
    );
    const pool = withImage.length ? withImage : data.items;
    return pool[Math.floor(Math.random() * pool.length)];
  }, [data]);

  // -------------------------------
  // Tilt 3D
  // -------------------------------
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState(
    "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)"
  );
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [enableTilt, setEnableTilt] = useState(false);
  const maxTilt = 8;

  useEffect(() => {
    const okPointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnableTilt(okPointer && !reduce);
  }, []);

  let raf = 0;
  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!enableTilt || !cardRef.current) return;
    cancelAnimationFrame(raf);

    const rect = cardRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const nx = px / rect.width - 0.5;
    const ny = py / rect.height - 0.5;

    const rotY = -(nx * maxTilt);
    const rotX = ny * maxTilt;

    raf = requestAnimationFrame(() => {
      setTransform(
        `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`
      );
      setGlarePos({ x: (px / rect.width) * 100, y: (py / rect.height) * 100 });
    });
  };

  const onLeave = () => {
    if (!enableTilt) return;
    cancelAnimationFrame(raf);
    setTransform(
      "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)"
    );
  };

  // -------------------------------
  // Datos normalizados
  // -------------------------------
  const name = product ? getLang(product.name) : "Producto destacado";
  const price = product ? Number(product.variants?.[0]?.price ?? 0) : 0;
  const image = product?.images?.[0]?.src || "/product.png";
  const canonicalUrl = product?.canonical_url;

  const rawDesc = product ? getLang(product.description) : "";
  const description = rawDesc ? cleanDescription(rawDesc) : "—";

  const formattedPrice =
    price > 0
      ? price.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
          maximumFractionDigits: 0,
        })
      : "";

  return (
    <section className="relative mx-auto py-20 overflow-hidden bg-white">
      {/* Fondo animado */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="gradient-bubble bubble-1" />
        <div className="gradient-bubble bubble-2" />
        <div className="gradient-bubble bubble-3" />
        <div className="edge-glow pointer-events-none absolute inset-0 z-0" />
      </div>

      {/* Card */}
      <div
        className="group relative z-10 mx-auto max-w-5xl [perspective:1200px]"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div
          ref={cardRef}
          style={{ transform }}
          className="
            relative rounded-2xl border border-black/10
            bg-white/80 backdrop-blur-sm
            shadow-[0_10px_30px_rgba(0,0,0,0.15)]
            p-8 md:p-10 flex flex-col md:flex-row items-center gap-8
            transform-gpu transition-transform ease-out
          "
        >
          {/* Glare */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              background: `radial-gradient(400px 240px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%)`,
            }}
          />

          {/* Imagen */}
          <div className="flex-1 flex justify-center">
            <div className="rounded-2xl p-4 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
              <Image
                src={image}
                alt={name}
                width={400}
                height={400}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Contenido */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase leading-snug">
              {name}
            </h2>

            {formattedPrice && (
              <p className="text-[#2563EB] text-2xl font-bold tracking-tight">
                {formattedPrice}
              </p>
            )}

            <p className="text-neutral-800 text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0">
              {description}
            </p>

            {canonicalUrl ? (
              <a
                href={canonicalUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex items-center justify-center gap-2 w-full md:w-[75%] bg-[#2563EB] text-white font-extrabold text-sm md:text-base py-3 shadow-[6px_6px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_#000] transition-transform"
              >
                <ShoppingCart size={18} />
                VER EN LA TIENDA
              </a>
            ) : (
              <button className="mt-4 flex items-center justify-center gap-2 w-full md:w-[75%] bg-[#2563EB] text-white font-extrabold text-sm md:text-base py-3 shadow-[6px_6px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_#000] transition-transform">
                <ShoppingCart size={18} />
                AGREGAR AL CARRITO
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
