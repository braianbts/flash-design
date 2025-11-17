import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 🚫 Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 🚫 Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["dcdn-us.mitiendanube.com"],
    // Si en algún momento ves que tus imágenes vienen de otro subdominio,
    // lo agregás acá, ej: "dcdn-la.mitiendanube.com"
  },
};

export default nextConfig;
