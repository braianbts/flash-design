import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string | undefined;
  if (!code) return res.status(400).send("Falta el parámetro ?code=");

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

    if (!r.ok) {
      const txt = await r.text();
      return res.status(r.status).send(`Error al obtener token:\n${txt}`);
    }

    const data = await r.json();

    // Mostramos el resultado directamente en pantalla:
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(`
      <style>
        body { font-family: sans-serif; background: #111; color: #fff; padding: 3rem; }
        pre { background: #222; padding: 1rem; border-radius: 8px; }
      </style>
      <h1>✅ ¡Integración exitosa!</h1>
      <p>Copiá estos valores en tu <code>.env.local</code>:</p>
      <pre>TN_ACCESS_TOKEN=${data.access_token}</pre>
      <pre>TN_STORE_ID=${data.user_id}</pre>
      <p>Luego reiniciá el servidor o redeployeá en Vercel.</p>
    `);
  } catch (err: any) {
    res.status(500).send("Error inesperado: " + err.message);
  }
}
