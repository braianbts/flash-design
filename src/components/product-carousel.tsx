"use client";
import Image from "next/image";
import useSWR from "swr";
import ProductCard from "@/components/product-card"; // 👈 IMPORTANTE

const fetcher = (url: string) =>
  fetch(url).then(async (r) => {
    const json = await r.json().catch(() => ({}));
    if (!r.ok) {
      const msg = json?.error || json?.message || `Network error (${r.status})`;
      throw new Error(msg);
    }
    return json;
  });

// Formateador ARS
const peso = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

type TnLangField = string | { es?: string; en?: string; pt?: string };
type TnImage = { src: string };
type TnVariant = { price: string; compare_at_price?: string | null };
type TnProduct = {
  id: number;
  name: TnLangField;
  handle?: TnLangField;
  images?: TnImage[];
  variants?: TnVariant[];
};
type ApiResponse = { items: TnProduct[] };
type Product = {
  id: string | number;
  name: string;
  price: number;
  image: string;
  slug?: string;
};

function getLang(field: TnLangField | undefined, fallback: string = ""): string {
  if (!field) return fallback;
  if (typeof field === "string") return field;
  return field.es || field.en || field.pt || fallback;
}

export default function ProductCarousel({
  tag = "landing-featured",
  limit = 8,
}: {
  tag?: string;
  limit?: number;
}) {
  const { data, error, isLoading } = useSWR<ApiResponse>(
    `/api/tn/products?tag=${encodeURIComponent(tag)}&limit=${limit}`,
    fetcher,
    { keepPreviousData: true }
  );

  const normalized: Product[] =
    data?.items?.slice(0, limit).map((p) => {
      const name = getLang(p.name);
      const image = p.images?.[0]?.src || "/product.png";
      const price = Number(p.variants?.[0]?.price ?? 0);
      const slug = getLang(p.handle);

      return {
        id: p.id,
        name,
        price,
        image,
        slug,
      };
    }) ?? [];

  const mock: Product[] = Array.from({ length: limit }).map((_, i) => ({
    id: `mock-${i}`,
    name: `Producto #${i + 1}`,
    price: 99999 + i * 10000,
    image: "/product.png",
  }));

  const items = normalized.length ? normalized : mock;

  if (isLoading && !data) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: Math.min(limit, 8) }).map((_, i) => (
          <div key={i} className="rounded-md overflow-hidden bg-white shadow-md">
            <div className="aspect-square bg-neutral-200 animate-pulse" />
            <div className="p-3 md:p-4 space-y-2">
              <div className="h-4 w-2/3 bg-neutral-200 animate-pulse rounded" />
              <div className="h-4 w-1/3 bg-neutral-200 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-red-600">Error cargando productos: {error.message}</p>;
  }

  return (
    <div role="list" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {items.map((p, idx) => (
        <ProductCard
          key={p.id ?? idx}
          product={{
            id: String(p.id),
            title: p.name,
            price: p.price,
            image_url: p.image,
            in_stock: true,
            handle: p.slug, // 👈 AHORA EL LINK FUNCIONA
          }}
        />
      ))}
    </div>
  );
}
