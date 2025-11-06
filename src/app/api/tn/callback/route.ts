// src/app/api/tn/callback/route.ts
import { NextResponse } from "next/server";

// Opcional, fuerza runtime Node (no edge)
export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  if (!code) {
    return new NextResponse("Falta el parámetro ?code=", { status: 400 });
  }

  try {
    const r = await fetch("https://www.tiendanube.com/apps/authorize/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.TN_APP_ID,
        client_secret: process.env.TN_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
      }),
    });

    const txt = await r.text();
    if (!r.ok) {
      return new NextResponse(`Error al obtener token:\n${txt}`, { status: r.status });
    }

    const data = JSON.parse(txt); // { access_token, token_type, user_id, ... }

    return new NextResponse(
      `
      <style>
        body { font-family: ui-sans-serif, system-ui; background:#0b0b0b; color:#fff; padding:32px }
        pre { background:#151515; padding:12px; border-radius:8px; overflow:auto }
      </style>
      <h1>✅ ¡Integración exitosa!</h1>
      <p>Copiá en tu <code>.env</code> / <code>.env.local</code> y redeployeá:</p>
      <pre>TN_ACCESS_TOKEN=${data.access_token}</pre>
      <pre>TN_STORE_ID=${data.user_id}</pre>
      `,
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  } catch (err: any) {
    return new NextResponse("Error inesperado: " + err.message, { status: 500 });
  }
}
