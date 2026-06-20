"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function InnerNavbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 md:px-10 h-16">
      <div className="absolute inset-0 -z-10 border-b border-black/10 bg-white/80 supports-[backdrop-filter]:backdrop-blur-md shadow-sm" />

      <Link
        href="/"
        className="flex items-center gap-2 text-sm font-semibold text-black hover:text-[#2563EB] transition-colors"
      >
        <ArrowLeft size={16} />
        Volver
      </Link>

      <Link href="/" className="absolute left-1/2 -translate-x-1/2">
        <Image
          src="/small-logo.png"
          alt="Flash Design"
          width={38}
          height={38}
          className="object-contain"
          priority
        />
      </Link>

      <div className="w-16" />
    </nav>
  );
}
