"use client";
import dynamic from "next/dynamic";

const SmoothScroll = dynamic(() => import("./smooth-scroll"), { ssr: false });
const CustomCursor = dynamic(() => import("./custom-cursor"), { ssr: false });

export default function ClientProviders() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
    </>
  );
}
