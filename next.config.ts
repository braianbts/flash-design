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
};

export default nextConfig;
