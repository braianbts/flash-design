"use client";
import { useRef, ReactNode } from "react";

export default function MagneticButton({
  children,
  className,
  style,
  href,
  onClick,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  onClick?: () => void;
  strength?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  const props = {
    ref: ref as any,
    "data-magnetic": true,
    className,
    style: { transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)", ...style },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
  };

  if (href) {
    return <a href={href} {...props}>{children}</a>;
  }
  return <button {...props}>{children}</button>;
}
