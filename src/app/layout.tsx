import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import OpeningSplash from "@/components/opening-splash";
import Navbar from "@/components/navbar";
import ClientProviders from "@/components/client-providers";
import { Plus_Jakarta_Sans } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://flashdesign.com.ar"),
  title: {
    default: "Flash Design — Sneakers Custom Argentina",
    template: "%s | Flash Design",
  },
  description:
    "Customización de sneakers a mano, blackout de botines, canvas de lujo y más. Trabajos únicos hechos a medida en Argentina. Pedí tu diseño.",
  keywords: [
    "sneakers custom argentina",
    "zapatillas personalizadas",
    "custom sneaker buenos aires",
    "blackout botines",
    "upcycling calzado",
    "flash design",
    "customizador zapatillas",
    "pinturas profesionales calzado",
    "just married sneakers",
  ],
  authors: [{ name: "Flash Design" }],
  creator: "Flash Design",
  publisher: "Flash Design",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://flashdesign.com.ar",
    siteName: "Flash Design",
    title: "Flash Design — Sneakers Custom Argentina",
    description:
      "Customización de sneakers a mano, blackout de botines, canvas de lujo y más. Trabajos únicos hechos a medida en Argentina.",
    images: [
      {
        url: "/openingwebflash.jpg",
        width: 1200,
        height: 630,
        alt: "Flash Design — Custom Sneakers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flash Design — Sneakers Custom Argentina",
    description:
      "Customización de sneakers a mano, trabajos únicos hechos a medida en Argentina.",
    images: ["/openingwebflash.jpg"],
  },
  icons: {
    icon: "/small-logo.png",
    shortcut: "/small-logo.png",
    apple: "/small-logo.png",
  },
  category: "ecommerce",
};

export const viewport: Viewport = {
  themeColor: "#2563EB",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// Cargamos la fuente global
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-jakarta",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={jakarta.variable}>
      <body
        className="bg-[#0a0a0a] text-white overflow-x-hidden font-sans"
        style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
      >
        {/* Bordes azules laterales */}
        <div className="fixed left-0 top-0 h-full w-[5px] z-[9999] overflow-hidden side-bar-left" />
        <div className="fixed right-0 top-0 h-full w-[5px] z-[9999] overflow-hidden side-bar-right" />

        <style>{`
          .side-bar-left {
            background: linear-gradient(180deg,
              #1e3a8a 0%,
              #2563EB 30%,
              #60a5fa 50%,
              #2563EB 70%,
              #1e3a8a 100%);
          }
          .side-bar-right {
            background: linear-gradient(180deg,
              #1e3a8a 0%,
              #2563EB 30%,
              #60a5fa 50%,
              #2563EB 70%,
              #1e3a8a 100%);
          }
          .side-bar-left::after,
          .side-bar-right::after {
            content: '';
            position: absolute;
            left: 0;
            width: 100%;
            height: 30%;
            background: linear-gradient(180deg,
              transparent 0%,
              rgba(255,255,255,0) 10%,
              rgba(255,255,255,0.85) 50%,
              rgba(255,255,255,0) 90%,
              transparent 100%);
            filter: blur(1px);
            animation: sideSweep 4s ease-in-out infinite;
          }
          .side-bar-right::after {
            animation-delay: 2s;
          }
          @keyframes sideSweep {
            0%   { top: -30%; }
            100% { top: 130%; }
          }
        `}</style>



        <ClientProviders />
        <Navbar />

        {/* Contenido principal */}
        {children}
      </body>
    </html>
  );
}