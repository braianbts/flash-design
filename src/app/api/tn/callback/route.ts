import { NextResponse } from "next/server";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  if (!code) return new NextResponse("Falta el parámetro ?code=", { status: 400 });

  const redirectUri = "https://flashdesign.vercel.app/api/tn/callback"; // el mismo que pusiste en Partners

  try {
    const body = new URLSearchParams({
      client_id: process.env.TN_APP_ID ?? "",
      client_secret: process.env.TN_CLIENT_SECRET ?? "",
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri, // Recomendado: incluirlo
    });

    const r = await fetch("https://www.tiendanube.com/apps/authorize/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      // Si estás en edge por algún motivo, forza nodejs arriba
    });

    const txt = await r.text();
    let data: any = {};
    try { data = JSON.parse(txt); } catch {}

    // Si falló, devolvemos el error crudo para ver el motivo
    if (!r.ok || !data.access_token) {
      return new NextResponse(
        `❌ Error al obtener token (${r.status}):\n\n${txt}`,
        { status: r.ok ? 500 : r.status, headers: { "Content-Type": "text/plain; charset=utf-8" } }
      );
    }

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
