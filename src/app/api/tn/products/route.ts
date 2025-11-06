import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? 8), 30);
  const tag = searchParams.get("tag") ?? ""; // si querés filtrar por tag

  const qs = new URLSearchParams();
  qs.set("per_page", String(limit));
  if (tag) qs.set("tag", tag);

  const storeId = process.env.TN_STORE_ID!;
  const token = process.env.TN_ACCESS_TOKEN!;

  if (!storeId || !token) {
    return NextResponse.json(
      { error: "missing_env", message: "TN_STORE_ID / TN_ACCESS_TOKEN faltan" },
      { status: 500 }
    );
  }

  // Endpoint oficial Tiendanube
  const url = `https://api.tiendanube.com/v1/${storeId}/products?${qs.toString()}`;

  const r = await fetch(url, {
    method: "GET",
    headers: {
      // Tiendanube usa este header (no "Authorization"). Mantener 'bearer' en minúscula:
      Authentication: `bearer ${token}`,
      Accept: "application/json",
      // Requerido por política: identificá tu app + contacto
      "User-Agent": "FlashDesign (contacto: tu-mail@tu-dominio.com)",
    },
    cache: "no-store",
  });

  const txt = await r.text();
  if (!r.ok) {
    return new NextResponse(
      `Tiendanube respondió ${r.status}\n\n${txt}`,
      { status: r.status, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  const products = JSON.parse(txt);

  // Normalizo para tu carrusel
  const mapped = products.map((p: any) => ({
    id: p.id,
    name: p.name?.es ?? p.name?.pt ?? p.name?.en ?? "",
    price: p.variants?.[0]?.price ? Number(p.variants[0].price) : 0,
    image: p.images?.[0]?.src ?? "/product.png",
    slug: p.handle ?? p.permalink ?? null,
  }));

  return NextResponse.json(mapped, { headers: { "Cache-Control": "no-store" } });
}
