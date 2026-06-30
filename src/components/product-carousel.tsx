"use client";
import { useState } from "react";
import useSWR from "swr";
import ProductCard from "@/components/product-card";

const fetcher = (url: string) =>
  fetch(url).then(async (r) => {
    const json = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(json?.detail || json?.error || json?.message || `Error ${r.status}`);
    return json;
  });

type TnLangField = string | { es?: string; en?: string; pt?: string };
type TnImage = { src: string };
type TnVariant = { price: string; compare_at_price?: string | null };
type TnProduct = { id: number; name: TnLangField; handle?: TnLangField; images?: TnImage[]; variants?: TnVariant[] };
type TnCategory = { id: number; name: TnLangField };

function getLang(field: TnLangField | undefined, fallback = ""): string {
  if (!field) return fallback;
  if (typeof field === "string") return field;
  return field.es || field.en || field.pt || fallback;
}

export default function ProductCarousel() {
  const [activeCat, setActiveCat] = useState<number | null>(null);

  const { data: catData } = useSWR<{ categories: TnCategory[] }>("/api/tn/categories", fetcher);
  const categories = catData?.categories ?? [];

  const productsUrl = activeCat
    ? `/api/tn/products?limit=200&category_id=${activeCat}`
    : `/api/tn/products?limit=200`;

  const { data, error, isLoading } = useSWR<{ items: TnProduct[] }>(productsUrl, fetcher, { keepPreviousData: true });

  const items = (data?.items ?? []).map((p) => ({
    id: String(p.id),
    name: getLang(p.name),
    price: Number(p.variants?.[0]?.price ?? 0),
    image: p.images?.[0]?.src || "/product.png",
    slug: getLang(p.handle),
  }));

  return (
    <div>
      {/* Filtro categorías */}
      <div className="flex flex-wrap gap-2 px-10 md:px-20 mb-8">
        <button
          onClick={() => setActiveCat(null)}
          className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest border transition-all ${
            activeCat === null
              ? "bg-[#2563EB] border-[#2563EB] text-white"
              : "border-white/15 text-white/40 hover:border-white/30 hover:text-white"
          }`}
        >
          Todos
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCat(c.id)}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest border transition-all ${
              activeCat === c.id
                ? "bg-[#2563EB] border-[#2563EB] text-white"
                : "border-white/15 text-white/40 hover:border-white/30 hover:text-white"
            }`}
          >
            {getLang(c.name)}
          </button>
        ))}
      </div>

      {/* Grid */}
      {isLoading && !data ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 px-10 md:px-20">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-[#111] border border-white/8">
              <div className="aspect-square bg-white/5 animate-pulse" />
              <div className="p-3 space-y-2">
                <div className="h-4 w-2/3 bg-white/10 animate-pulse rounded" />
                <div className="h-4 w-1/3 bg-white/10 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-sm text-red-500 px-10 md:px-20">Error: {error.message}</p>
      ) : (
        <div role="list" className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 px-10 md:px-20">
          {items.map((p) => (
            <ProductCard
              key={p.id}
              product={{ id: p.id, title: p.name, price: p.price, image_url: p.image, in_stock: true, handle: p.slug }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
