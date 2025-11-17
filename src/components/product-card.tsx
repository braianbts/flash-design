import Image from "next/image";

type Props = {
  product: {
    id: string;
    title: string;
    price: number;
    compare_at_price?: number;
    image_url: string;
    in_stock: boolean;
    handle?: string; // 👈 agregado
  };
};

export default function ProductCard({ product }: Props) {
  const format = (n: number) =>
    n.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });

  // 👇 Generamos URL pública del producto (Tiendanube)
  const url = product.handle
    ? `https://flashxdesign.mitiendanube.com/productos/${product.handle}`
    : "#";

  return (
    <a href={url} target="_blank" rel="noreferrer" className="block">
      <div className="group rounded-2xl border p-3 hover:shadow-lg transition cursor-pointer">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            sizes="(min-width:768px) 25vw, 50vw"
            className="object-cover group-hover:scale-105 transition"
          />
          {!product.in_stock && (
            <span className="absolute left-2 top-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
              Sin stock
            </span>
          )}
        </div>

        <div className="mt-3 space-y-1">
          <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>

          <div className="flex items-center gap-2">
            <span className="text-base font-semibold">{format(product.price)}</span>
            {product.compare_at_price && (
              <span className="text-sm text-neutral-500 line-through">
                {format(product.compare_at_price)}
              </span>
            )}
          </div>

          <button className="mt-2 w-full rounded-xl bg-black px-3 py-2 text-white hover:bg-black/90">
            Comprar ahora
          </button>
        </div>
      </div>
    </a>
  );
}
