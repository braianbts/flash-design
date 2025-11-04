"use client";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => {
  if (!r.ok) throw new Error("Network error");
  return r.json();
});

// Pequeño formateador ARS
const peso = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

type Product = {
  id: string | number;
  name: string;
  price: number;            // en ARS
  image: string;            // url
  slug?: string;
};

export default function ProductCarousel({
  tag = "landing-featured",
  limit = 8,
}: {
  tag?: string;
  limit?: number;
}) {
  const { data, error, isLoading } = useSWR<Product[]>(
    `/api/tn/products?tag=${encodeURIComponent(tag)}&limit=${limit}`,
    fetcher,
    { keepPreviousData: true }
  );

  // fallback mock si no hay data
  const mock: Product[] = Array.from({ length: limit }).map((_, i) => ({
    id: `mock-${i}`,
    name: `Producto #${i + 1}`,
    price: 99999 + i * 10000,
    image: "/product.png",
  }));

  const items: Product[] = data?.slice(0, limit) ?? mock;

  // Skeleton mientras carga inicial
  if (isLoading && !data) {
    return (
      <div role="status" aria-live="polite" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
    return <p className="text-sm text-red-600">Error cargando productos.</p>;
  }

  return (
    <div role="list" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {items.map((p, idx) => (
        <article
          role="listitem"
          key={p.id ?? idx}
          className="
            group relative overflow-hidden rounded-md bg-white shadow-md
            transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl
            focus-within:-translate-y-1 focus-within:shadow-xl
          "
        >
          {/* Imagen */}
          <div className="relative w-full aspect-square overflow-hidden">
            <Image
              src={p.image || "/product.png"}
              alt={"asd"}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={idx < 2}  // primeras 2 en prioridad
            />
          </div>

          {/* Contenido */}
          <div className="p-3 md:p-4 text-center">
            <h3 className="text-sm md:text-base font-semibold text-neutral-800 line-clamp-2">
              {p.name}
            </h3>
            <p className="text-neutral-500 text-sm md:text-[15px] mt-1">
              {Number.isFinite(p.price) ? peso.format(p.price) : "—"}
            </p>
            {/* Accesibilidad teclado */}
            <a
              href={p.slug ? `/producto/${p.slug}` : "#"}
              className="absolute inset-0"
              aria-label={`Ver detalle de ${p.name}`}
            />
          </div>
        </article>
      ))}
    </div>
  );
}