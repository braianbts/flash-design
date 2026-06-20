"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { use } from "react";

// ---------- tipos TN ----------
type TnLangField = string | { es?: string; en?: string; pt?: string };
type TnImage = { src: string };
type TnVariant = {
  id: number;
  price: string;
  compare_at_price?: string | null;
  values?: { es?: string; en?: string; pt?: string; name?: string }[];
};
type TnProduct = {
  id: number;
  name: TnLangField;
  description?: TnLangField;
  handle?: TnLangField;
  canonical_url?: string;
  images?: TnImage[];
  variants?: TnVariant[];
  attributes?: { es?: string; en?: string; pt?: string }[];
};

function getLang(field: TnLangField | undefined, fallback = ""): string {
  if (!field) return fallback;
  if (typeof field === "string") return field;
  return field.es || field.en || field.pt || fallback;
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function formatARS(n: number) {
  return n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [product, setProduct] = useState<TnProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/tn/products/by-handle?handle=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setProduct(data.product);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  // ---------- loading ----------
  if (loading) {
    return (
      <>
        <main className="min-h-screen pt-24 px-6 md:px-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-square rounded-2xl bg-neutral-200" />
            <div className="space-y-4 pt-4">
              <div className="h-8 w-3/4 rounded bg-neutral-200" />
              <div className="h-6 w-1/3 rounded bg-neutral-200" />
              <div className="h-4 w-full rounded bg-neutral-200" />
              <div className="h-4 w-5/6 rounded bg-neutral-200" />
              <div className="h-12 w-full rounded bg-neutral-200 mt-8" />
            </div>
          </div>
        </main>
      </>
    );
  }

  // ---------- error / not found ----------
  if (error || !product) {
    return (
      <>
        <main className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-2xl font-extrabold uppercase">Producto no encontrado</p>
            <a
              href="/"
              className="inline-block bg-[#2563EB] text-white font-bold px-6 py-3 shadow-[4px_4px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000] transition-transform"
            >
              Volver al inicio
            </a>
          </div>
        </main>
      </>
    );
  }

  // ---------- datos ----------
  const name = getLang(product.name);
  const description = stripHtml(getLang(product.description ?? ""));
  const images = product.images ?? [];
  const variants = product.variants ?? [];
  const variant = variants[selectedVariant];
  const price = variant ? Number(variant.price) : 0;
  const comparePrice = variant?.compare_at_price
    ? Number(variant.compare_at_price)
    : null;
  const buyUrl = product.canonical_url ?? "#";
  const hasDiscount = comparePrice && comparePrice > price;

  const prevImage = () =>
    setActiveImage((i) => (i - 1 + images.length) % images.length);
  const nextImage = () =>
    setActiveImage((i) => (i + 1) % images.length);

  return (
    <>
      <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">

          {/* grid principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

            {/* ===== GALERÍA ===== */}
            <div className="space-y-4">
              {/* imagen principal */}
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-[#111] shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                {images.length > 0 ? (
                  <Image
                    src={images[activeImage]?.src}
                    alt={name}
                    fill
                    className="object-contain p-4"
                    priority
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400">
                    Sin imagen
                  </div>
                )}

                {/* flechas galería */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-black/10 shadow flex items-center justify-center hover:bg-neutral-100 transition"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-black/10 shadow flex items-center justify-center hover:bg-neutral-100 transition"
                      aria-label="Imagen siguiente"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>

              {/* thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                        i === activeImage
                          ? "border-[#2563EB] shadow-md"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={`${name} ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ===== DETALLES ===== */}
            <div className="space-y-6 pt-2">
              <h1 className="text-3xl md:text-4xl font-extrabold uppercase leading-tight tracking-tight">
                {name}
              </h1>

              {/* precio */}
              <div className="flex items-baseline gap-3">
                <span className="text-[#2563EB] text-3xl font-extrabold">
                  {formatARS(price)}
                </span>
                {hasDiscount && (
                  <span className="text-neutral-400 text-lg line-through">
                    {formatARS(comparePrice!)}
                  </span>
                )}
                {hasDiscount && (
                  <span className="bg-[#2563EB] text-white text-xs font-bold px-2 py-1 rounded">
                    {Math.round((1 - price / comparePrice!) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* variantes */}
              {variants.length > 1 && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
                    Opciones
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v, i) => {
                      const label =
                        v.values?.[0]?.es ||
                        v.values?.[0]?.en ||
                        v.values?.[0]?.name ||
                        `Variante ${i + 1}`;
                      return (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(i)}
                          className={`px-4 py-2 text-sm font-semibold border-2 transition ${
                            i === selectedVariant
                              ? "border-[#2563EB] bg-[#2563EB] text-white"
                              : "border-white/20 text-white/70 hover:border-white/60"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* descripción */}
              {description && (
                <div className="space-y-1">
                  <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
                    Descripción
                  </p>
                  <p className="text-white/60 leading-relaxed text-sm md:text-base">
                    {description}
                  </p>
                </div>
              )}

              {/* divider */}
              <div className="border-t border-white/10" />

              {/* CTA */}
              <a
                href={buyUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#2563EB] text-white font-extrabold text-base py-4 shadow-[6px_6px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_#000] transition-transform uppercase tracking-wide"
              >
                <ShoppingCart size={20} />
                Comprar ahora
              </a>

              <p className="text-xs text-white/30 text-center">
                Serás redirigido a la tienda para completar la compra.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
