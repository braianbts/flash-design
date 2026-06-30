import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const storeId = process.env.TN_STORE_ID;
  const accessToken = process.env.TN_ACCESS_TOKEN;

  if (!storeId || !accessToken) {
    return NextResponse.json({ error: "missing_env" }, { status: 500 });
  }

  const r = await fetch(`https://api.tiendanube.com/v1/${storeId}/categories`, {
    headers: {
      Accept: "application/json",
      Authentication: `bearer ${accessToken}`,
      "User-Agent": process.env.TN_USER_AGENT ?? "FlashDesign (braianbts@gmail.com)",
    },
    cache: "no-store",
  });

  if (!r.ok) return NextResponse.json({ error: "tn_failed", status: r.status }, { status: r.status });

  const data = await r.json();
  return NextResponse.json({ categories: data });
}
