// src/app/api/tn/products/route.ts
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const limit = Math.min(Number(url.searchParams.get("limit") ?? "10"), 50);

    // Leemos cookies desde el request
    const cookieStoreId = req.cookies.get("tn_store_id")?.value;
    const cookieToken = req.cookies.get("tn_access_token")?.value;

    const envStoreId = process.env.TN_STORE_ID;
    const envToken = process.env.TN_ACCESS_TOKEN;

    const storeId = cookieStoreId ?? envStoreId;
    const accessToken = cookieToken ?? envToken;

    if (!storeId || !accessToken) {
      return NextResponse.json(
        {
          error: "missing_env",
          message: "TN_STORE_ID / TN_ACCESS_TOKEN faltan",
          debug: {
            cookieStoreId: cookieStoreId ? "present" : "missing",
            cookieToken: cookieToken ? "present" : "missing",
            envStoreId: envStoreId ? "present" : "missing",
            envToken: envToken ? "present" : "missing",
          },
        },
        { status: 500 }
      );
    }

    const apiUrl = `https://api.tiendanube.com/v1/${storeId}/products?per_page=${limit}`;

    const headers: Record<string, string> = {
      Accept: "application/json",
      "User-Agent":
        process.env.TN_USER_AGENT ?? "FlashDesign (braianbts@gmail.com)",
      // Recomendado según docs:
      Authentication: `bearer ${accessToken}`,
      // Si te da drama, podés probar con Authorization:
      // Authorization: `Bearer ${accessToken}`,
      // "X-Nuvem-Api-Version": process.env.TN_API_VERSION ?? "2025-03",
    };

    const r = await fetch(apiUrl, { headers, cache: "no-store" });

    if (!r.ok) {
      const text = await r.text();
      return NextResponse.json(
        { error: "tn_products_failed", status: r.status, detail: text },
        { status: r.status }
      );
    }

    const data = await r.json();
    return NextResponse.json({ items: data });
  } catch (e: any) {
    return NextResponse.json(
      { error: "exception", message: e?.message ?? "unknown" },
      { status: 500 }
    );
  }
}
