import "./globals.css";
import type { ReactNode } from "react";
import OpeningSplash from "@/components/opening-splash";
import { Plus_Jakarta_Sans } from "next/font/google";

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
        className="bg-white text-black overflow-x-hidden font-sans"
        style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
      >
        {/* Bordes azules laterales */}
        <div className="fixed left-0 top-0 h-full w-[5px] bg-[#2563EB] z-[9999]" />
        <div className="fixed right-0 top-0 h-full w-[5px] bg-[#2563EB] z-[9999]" />



        {/* Contenido principal */}
        {children}
      </body>
    </html>
  );
}