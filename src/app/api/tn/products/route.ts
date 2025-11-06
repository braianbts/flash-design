// app/api/tn/products/route.ts
import { NextResponse } from "next/server";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "8", 10), 50);

  const storeId = process.env.TN_STORE_ID;
  const token = process.env.TN_ACCESS_TOKEN;

  if (!storeId || !token) {
    return NextResponse.json(
      { error: "missing_env", message: "TN_STORE_ID / TN_ACCESS_TOKEN faltan" },
      { status: 500 }
    );
  }

  const apiUrl = `https://api.tiendanube.com/v1/${storeId}/products?per_page=${limit}`;

  const r = await fetch(apiUrl, {
    headers: {
      // 👇 OBLIGATORIO
      "Authorization": `Bearer ${token}`,
      "User-Agent": "FlashDesign (contacto@tudominio.com)",
      "Accept": "application/json",
    },
    // method: "GET" // opcional
  });

  const txt = await r.text();
  if (!r.ok) {
    // Devolvé el error crudo para depurar
    return new NextResponse(`tiendanube respondió ${r.status}\n\n${txt}`, {
      status: r.status,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  try {
    return NextResponse.json(JSON.parse(txt), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "bad_json", raw: txt }, { status: 502 });
  }
}
