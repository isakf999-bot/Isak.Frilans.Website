"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Glider upp sitt innehåll när det kommer in i vy.
 *
 * Renderar en <div> och skickar vidare `className`, så den kan ersätta en
 * befintlig container utan extra nästling. Säkerheten ligger i CSS (.reveal):
 * utan JS eller vid reduced-motion syns innehållet direkt — den här klassen
 * lägger bara till "reveal-in" när elementet skrollats fram.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Saknas stöd — visa direkt hellre än att riskera dolt innehåll.
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
