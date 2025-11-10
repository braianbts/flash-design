import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const store = url.searchParams.get("store"); // ej: flashxdesign
  if (!store) {
    return NextResponse.json(
      { error: "missing_store", message: "Usá ?store=flashxdesign (subdominio de tu tienda)" },
      { status: 400 }
    );
  }

  const clientId = process.env.TN_APP_ID!;
  const redirectUri = encodeURIComponent("https://flashdesign.vercel.app/api/tn/callback");
  const scope = encodeURIComponent("read_products,write_products,read_orders,write_orders");
  const state = randomBytes(16).toString("hex");

  const authorizeUrl =
    `https://${store}.tiendanube.com/admin/apps/authorize` +
    `?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}` +
    `&response_type=code&state=${state}`;

  const res = NextResponse.redirect(authorizeUrl, { status: 302 });
  res.cookies.set("tn_oauth_state", state, {
    httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 600,
  });
  return res;
}