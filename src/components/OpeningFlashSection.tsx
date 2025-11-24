"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function OpeningFlashSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const bottom = document.body.scrollHeight - window.innerHeight;
      const nearBottom = scrollY > bottom - 200; // a 200px del final

      if (nearBottom) setVisible(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`
        relative w-full h-[70vh] md:h-[90vh] overflow-hidden
        bg-black
        transition-opacity duration-1000
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* Imagen de fondo */}
      <Image
        src="/openingwebflash.png"
        alt="Flash Opening"
        fill
        className={`
          object-cover
          transition-transform duration-[2000ms] ease-out
          ${visible ? "scale-100" : "scale-110"}
        `}
        priority
      />

      {/* Capa de humo / niebla encima */}
      <div
        className={`
          absolute inset-0 pointer-events-none z-10
          transition-opacity duration-[1500ms]
          ${visible ? "opacity-80" : "opacity-0"}
        `}
        style={{
          background: `radial-gradient(
            ellipse at bottom,
            rgba(0,0,0,0.9) 0%,
            rgba(0,0,0,0.6) 35%,
            rgba(0,0,0,0.3) 60%,
            rgba(0,0,0,0) 85%
          )`,
          filter: "blur(30px)",
          transform: "translateY(40px)",
        }}
      />
    </section>
  );
}
