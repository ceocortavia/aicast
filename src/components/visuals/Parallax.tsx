"use client";

import { PropsWithChildren, useEffect, useRef } from "react";

export default function Parallax({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = window.innerHeight / 2;
      const distance = (rect.top + rect.height / 2) - center;
      const translate = Math.max(-30, Math.min(30, -distance * 0.05));
      el.style.transform = `translateY(${translate}px)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="transition-transform duration-300 will-change-transform">
      {children}
    </div>
  );
}




