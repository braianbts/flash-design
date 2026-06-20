"use client";
import dynamic from "next/dynamic";

const SneakerCustomizer = dynamic(
  () => import("@/components/sneaker-customizer"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-white/40 text-sm uppercase tracking-widest">
        Cargando customizador...
      </div>
    ),
  }
);

export default function CustomizerPage() {
  return <SneakerCustomizer />;
}
