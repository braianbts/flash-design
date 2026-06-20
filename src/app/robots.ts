import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/customizer/"],
      },
    ],
    sitemap: "https://flashdesign.com.ar/sitemap.xml",
  };
}
