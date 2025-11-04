"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Bloque superior (negro más claro) */}
      <div className="bg-[#111] flex justify-center items-center py-3">
        <div className="relative w-[40px] h-[55px] md:w-[55px] md:h-[40px]">
          <Image
            src="/small-logo.png"
            alt="Flash Design logo"
            fill
            className="object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
       </footer>
  );
}
