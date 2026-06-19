import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const handle = url.searchParams.get("handle");

  if (!handle) {
    return NextResponse.json({ error: "missing_handle" }, { status: 400 });
  }

  const storeId =
    req.cookies.get("tn_store_id")?.value ?? process.env.TN_STORE_ID;
  const accessToken =
    req.cookies.get("tn_access_token")?.value ?? process.env.TN_ACCESS_TOKEN;

  if (!storeId || !accessToken) {
    return NextResponse.json({ error: "missing_credentials" }, { status: 500 });
  }

  const apiUrl = `https://api.tiendanube.com/v1/${storeId}/products?handle=${encodeURIComponent(handle)}&per_page=1`;

  const headers: Record<string, string> = {
    Accept: "application/json",
    "User-Agent": process.env.TN_USER_AGENT ?? "FlashDesign (braianbts@gmail.com)",
    Authentication: `bearer ${accessToken}`,
  };

  const r = await fetch(apiUrl, { headers, cache: "no-store" });

  if (!r.ok) {
    const text = await r.text();
    return NextResponse.json(
      { error: "tn_failed", status: r.status, detail: text },
      { status: r.status }
    );
  }

  const items = await r.json();
  const product = Array.isArray(items) ? items[0] : null;

  if (!product) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({ product });
}
