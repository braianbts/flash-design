"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type OpeningSplashProps = {
  durationMs?: number;
  oncePerSession?: boolean;
  src?: string; // /openingwebflash.jpg|.png|.webp
  enabled?: boolean; // permitir desactivar fácilmente (ej. en dev)
};

export default function OpeningSplash({
  durationMs = 2200,
  oncePerSession = true,
  src = "/openingwebflash.png",
  enabled = true,
}: OpeningSplashProps) {
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // cerrar (click, Esc, fin de timer, reduce motion)
  const close = useCallback(() => setShow(false), []);

  // Mostrar una vez por sesión (clave incluye src por si cambias la imagen)
  useEffect(() => {
    if (!enabled) return;
    const key = `seenOpening:${src}`;
    if (oncePerSession && typeof window !== "undefined" && sessionStorage.getItem(key) === "1") return;
    setShow(true);
    if (oncePerSession && typeof window !== "undefined") sessionStorage.setItem(key, "1");
  }, [enabled, oncePerSession, src]);

  // Iniciar temporizador cuando la imagen ya cargó
  useEffect(() => {
    if (!show || !loaded) return;
    const t = setTimeout(close, durationMs);
    return () => clearTimeout(t);
  }, [show, loaded, durationMs, close]);

  // Respeta reduce-motion -> cierra rápido
  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (m.matches) {
      const t = setTimeout(close, 300);
      return () => clearTimeout(t);
    }
  }, [close]);

  // Bloquear scroll mientras está visible
  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  // “Skip” con Escape
  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, close]);

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Opening"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          onClick={close} // permite cerrar tocando
        >
          <div className="relative h-full w-full overflow-hidden will-change-transform">
            {/* Imagen base */}
            <motion.div
              className="absolute inset-0 will-change-transform"
              initial={{ scale: 1, opacity: 0.88 }}
              animate={{ scale: 1.05, opacity: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={src}
                alt="FLASH DESIGN opening"
                fill
                priority
                sizes="100vw"
                onLoad={() => setLoaded(true)}
                className="object-cover select-none"
                draggable={false}
              />
              {/* viñeta cine */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(transparent,rgba(0,0,0,0.5))]" />
            </motion.div>

            {/* HUMO sutil (capas de gradientes con blur y drift vertical) */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="smoke-layer" />
              <div className="smoke-layer delay" />
            </div>

            {/* cortina negra que se desvanece para transición suave */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </div>

          {/* estilos locales del humo */}
          <style jsx>{`
            .smoke-layer {
              position: absolute;
              inset: 0;
              background:
                radial-gradient(circle at 20% 85%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 58%),
                radial-gradient(circle at 55% 95%, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 55%),
                radial-gradient(circle at 80% 75%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 52%),
                radial-gradient(circle at 35% 70%, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0) 50%);
              filter: blur(20px) contrast(105%);
              opacity: 0.55;
              transform: translate3d(0, 12%, 0) scale(1.06);
              animation: driftUp 10s ease-in-out infinite alternate;
              mix-blend-mode: screen;
              will-change: transform, opacity, filter;
            }
            .smoke-layer.delay {
              animation-duration: 13s;
              opacity: 0.45;
              filter: blur(24px);
              transform: translate3d(0, 16%, 0) scale(1.1);
            }
            @keyframes driftUp {
              0%   { transform: translate3d(0, 14%, 0) scale(1.06); }
              100% { transform: translate3d(0, -6%, 0) scale(1.12); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
