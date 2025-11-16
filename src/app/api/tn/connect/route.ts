import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const store = url.searchParams.get("store"); // opcional, para trackear de dónde vino

  const appId = process.env.TN_APP_ID;
  if (!appId) {
    return NextResponse.json(
      { error: "missing_env", message: "TN_APP_ID no está configurado" },
      { status: 500 }
    );
  }

  const state = randomBytes(16).toString("hex");
  const redirectUri =
    process.env.TN_REDIRECT_URI ??
    "https://flashdesign.vercel.app/api/tn/callback";
  const scope = "read_products,write_products,read_orders,write_orders";

  const authorizeUrl = new URL(
    `https://www.tiendanube.com/apps/${appId}/authorize`
  );
  authorizeUrl.searchParams.set("state", state);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", scope);
  // si querés guardar el store del frontend, lo codificás en el state, etc.

  const res = NextResponse.redirect(authorizeUrl.toString(), { status: 302 });
  res.cookies.set("tn_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 600,
  });
  return res;
}
