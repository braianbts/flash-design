import Image from "next/image";
import Link from "next/link";

type Props = {
  product: {
    id: string;
    title: string;
    price: number;
    compare_at_price?: number;
    image_url: string;
    in_stock: boolean;
    handle?: string;
  };
};

export default function ProductCard({ product }: Props) {
  const format = (n: number) =>
    n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

  const url = product.handle ? `/producto/${product.handle}` : "#";

  return (
    <Link href={url} className="block group">
      {/* imagen */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#161616]">
        <Image
          src={product.image_url}
          alt={product.title}
          fill
          sizes="(min-width:768px) 20vw, 45vw"
          className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
        />

        {!product.in_stock && (
          <span className="absolute left-2 top-2 rounded-full bg-black/70 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-white/70 uppercase tracking-wide">
            Agotado
          </span>
        )}

        {/* overlay hover sutil */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        {/* botón flotante al hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <div className="w-full bg-white/95 backdrop-blur-sm text-black font-bold text-xs py-2.5 text-center uppercase tracking-widest rounded-lg">
            Ver producto
          </div>
        </div>
      </div>

      {/* info debajo */}
      <div className="mt-3 px-0.5 space-y-1">
        <h3 className="text-white/85 text-sm font-medium leading-snug line-clamp-1">
          {product.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-sm">{format(product.price)}</span>
          {product.compare_at_price && (
            <span className="text-white/30 text-xs line-through">{format(product.compare_at_price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
