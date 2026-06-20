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
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] py-24 md:py-32">

      {/* blobs atmosféricos */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{ background: "#2563EB" }} />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10"
          style={{ background: "#4d87f5" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-8 md:px-16">

        {/* label */}
        <p className="text-[#2563EB] text-xs font-bold uppercase tracking-[0.3em] mb-6">
          — Producto destacado
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* imagen */}
          <div className="relative">
            <div className="relative aspect-square max-w-[420px] mx-auto md:mx-0 rounded-2xl overflow-hidden bg-[#111]">
              <Image src={image} alt={name} fill className="object-cover" priority />
              {/* glow detrás */}
              <div className="absolute inset-0 rounded-2xl"
                style={{ boxShadow: "inset 0 0 60px rgba(37,99,235,0.15)" }} />
            </div>
          </div>

          {/* contenido */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase leading-[0.9] tracking-tight text-white">
              {name}
            </h2>

            {formattedPrice && (
              <p className="text-[#2563EB] text-3xl md:text-4xl font-extrabold tracking-tight">
                {formattedPrice}
              </p>
            )}

            {description && (
              <p className="text-white/45 text-sm md:text-base leading-relaxed max-w-md">
                {description}
              </p>
            )}

            <div className="pt-2">
              {canonicalUrl ? (
                <a
                  href={canonicalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-[#2563EB] text-white font-extrabold text-sm uppercase tracking-widest px-8 py-4 shadow-[6px_6px_0_rgba(0,0,0,0.5)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,0.5)] transition-transform"
                >
                  <ShoppingCart size={18} />
                  Ver en la tienda
                </a>
              ) : (
                <button className="inline-flex items-center gap-3 bg-[#2563EB] text-white font-extrabold text-sm uppercase tracking-widest px-8 py-4 shadow-[6px_6px_0_rgba(0,0,0,0.5)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,0.5)] transition-transform">
                  <ShoppingCart size={18} />
                  Ver producto
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
