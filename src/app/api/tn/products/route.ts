import { NextResponse } from "next/server";

const API_BASE = "https://api.tiendanube.com";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get("tag") || "";              // ej: landing-featured
    const limit = Number(searchParams.get("limit") || 8);
    const categoryId = searchParams.get("category_id");     // opcional
    const published = searchParams.get("published") ?? "true";

    const storeId = process.env.NUVEM_STORE_ID!;
    const version = process.env.NUVEM_API_VERSION || "2025-03";
    const token = process.env.NUVEM_ACCESS_TOKEN!;
    const ua = process.env.NUVEM_USER_AGENT || "FlashDesign (contact@example.com)";

    const url = new URL(`${API_BASE}/${version}/${storeId}/products`);
    if (tag) url.searchParams.set("q", tag);                // busca en nombre/tags/SKU
    if (categoryId) url.searchParams.set("category_id", categoryId);
    if (published) url.searchParams.set("published", published);
    url.searchParams.set("fields", "id,name,handle,images,variants,tags");
    url.searchParams.set("per_page", String(Math.min(Math.max(limit, 1), 50)));
    url.searchParams.set("page", "1");

    const res = await fetch(url.toString(), {
      headers: {
        Authentication: `bearer ${token}`,
        "User-Agent": ua,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text || "Upstream error" }, { status: res.status });
    }

    const data = await res.json();

    const items = (Array.isArray(data) ? data : []).map((p: any) => {
      const name =
        (p?.name && (p.name.es || p.name.pt || p.name.en)) ||
        (typeof p?.name === "string" ? p.name : "Producto");

      const slug =
        (p?.handle && (p.handle.es || p.handle.pt || p.handle.en)) ||
        (typeof p?.handle === "string" ? p.handle : String(p?.id || ""));

      const image = p?.images?.[0]?.src || "/product.png";
      const v0 = p?.variants?.[0];
      const raw =
        (v0?.promotional_price && Number(v0.promotional_price)) ||
        (v0?.price && Number(v0.price)) || 0;

      return {
        id: p.id,
        name,
        slug,
        image,
        price: Number.isFinite(raw) ? raw : null,
      };
    });

    return NextResponse.json(items);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Internal error" }, { status: 500 });
  }
}