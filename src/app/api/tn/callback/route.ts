import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "missing_code" }, { status: 400 });
  }

  const clientId = process.env.TN_APP_ID!;
  const clientSecret = process.env.TN_CLIENT_SECRET!;
  const redirectUri = "https://flashdesign.vercel.app/api/tn/callback";

  try {
    const tokenUrl = "https://api.tiendanube.com/v1/oauth/token";
    const body = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    });

    const r = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "application/json",
      },
      body,
    });

    const json = await r.json();

    if (!r.ok) {
      return NextResponse.json({ error: "token_exchange_failed", json }, { status: 502 });
    }

    // 🟢 Mostramos directamente el token y el store_id
    return NextResponse.json({
      success: true,
      store_id: json.user_id ?? json.store_id,
      access_token: json.access_token,
      scope: json.scope,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}