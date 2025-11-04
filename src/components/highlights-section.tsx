"use client";
import Image from "next/image";

// fallback para .HEIC
const Img = ({ src, alt }: { src: string; alt: string }) => {
  const isHeic = src.toLowerCase().endsWith(".heic");
  return isHeic ? (
    <img src={src} alt={alt} className="h-full w-full object-cover" />
  ) : (
    <Image src={src} alt={alt} fill className="object-cover" />
  );
};

type Item = { src: string; title: string; desc: string };

const ITEMS: Item[] = [
  { src: "/biza.png",   title: "BIZARRAP", desc: "Minimalismo con carácter." },
  { src: "/flakko.png", title: "DUKI",     desc: "Actitud y detalle." },
  { src: "/duki.jpeg",  title: "DUKI",     desc: "Streetwear + música." },
  { src: "/acuna.png", title: "ACUÑA",    desc: "Fuerza y sutileza." },
];

export default function HighlightsRow() {
  return (
    <section className="relative w-full bg-neutral py-16">
      <div className="mx-auto max-w-[1250px] px-5">
        {/* título centrado */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="relative h-[100px] w-[380px] md:h-[150px] md:w-[560px]">
            <Image
              src="/destacados.png"
              alt="Destacados"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p className="mt-2 text-neutral-700 text-[15px] md:text-lg font-medium">
            Los pares más icónicos de nuestra colección
          </p>
        </div>

        {/* fila única (4 cards centradas) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-items-center">
          {ITEMS.map((it, i) => (
            <article
              key={`${it.title}-${i}`}
              className="group relative rounded-[10px] overflow-hidden bg-white/90 
                         ring-1 ring-black/5 shadow-[0_6px_20px_rgba(0,0,0,0.10)] 
                         hover:shadow-[0_10px_28px_rgba(0,0,0,0.14)] transition-all
                         w-[160px] md:w-[270px] h-[350px] md:h-[360px] flex flex-col"
            >
              {/* aro/acento sutil */}
              <span className="pointer-events-none absolute inset-0 rounded-[10px] ring-1 ring-[#2563EB]/15" />

              {/* imagen */}
              <div className="relative h-[200px] md:h-[230px] overflow-hidden rounded-t-[10px]">
                <Img src={it.src} alt={it.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* contenido */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 px-3 py-1">
                    <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                    <span className="text-[11px] font-semibold tracking-wider text-neutral-900">
                      {it.title}
                    </span>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-snug text-neutral-700 line-clamp-2">
                    {it.desc}
                  </p>
                </div>
              </div>

              {/* acento inferior */}
              <span className="absolute inset-x-6 bottom-3 h-[2px] bg-[#2563EB]/70 rounded-full scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
