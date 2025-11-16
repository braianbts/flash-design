// src/app/api/tn/callback/route.ts
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return NextResponse.json(
      { error: "missing_code", message: "Falta el parámetro ?code=" },
      { status: 400 }
    );
  }

  const clientId = process.env.TN_APP_ID;
  const clientSecret = process.env.TN_CLIENT_SECRET;
  const redirectUri =
    process.env.TN_REDIRECT_URI ??
    "https://flashdesign.vercel.app/api/tn/callback";

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      {
        error: "missing_env",
        message: "TN_APP_ID o TN_CLIENT_SECRET no están configurados",
      },
      { status: 500 }
    );
  }

  try {
    const tokenUrl = "https://www.tiendanube.com/apps/authorize/token";

    const r = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    const json = await r.json();

    if (!r.ok) {
      return NextResponse.json(
        { error: "token_exchange_failed", detail: json },
        { status: 502 }
      );
    }

    const storeId = json.user_id ?? json.store_id;
    const accessToken = json.access_token;

    // Creamos la respuesta y seteamos cookies sobre la respuesta
    const res = NextResponse.json({
      success: true,
      store_id: storeId,
      access_token: accessToken,
      scope: json.scope,
    });

    res.cookies.set("tn_store_id", String(storeId), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    res.cookies.set("tn_access_token", String(accessToken), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    return res;
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "unknown" },
      { status: 500 }
    );
  }
}
