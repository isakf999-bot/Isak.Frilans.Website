"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// WebGL (ogl) — laddas först i webbläsaren och först när sektionen är nära.
const Topography = dynamic(() => import("@/components/reactbits/Topography"), {
  ssr: false,
});

type Colors = { low: string; mid: string; high: string };

/**
 * Bakgrunden bakom "Gratis förhandsvisning": Topography från React Bits, en
 * långsam höjdkarta i sajtens blå — konturlinjer som på en skiss innan
 * bygget.
 *
 * Rent dekorativ. Ritas inte vid reducerad rörelse, och inte förrän
 * sektionen närmar sig — då står sektionens egen mörka färg kvar.
 */
export function FreePreviewBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const [colors, setColors] = useState<Colors | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Topography vill ha hex-värden. De läses ur sajtens tokens här,
          // så att färgerna bara finns på ett ställe (globals.css).
          const tokens = getComputedStyle(document.documentElement);
          const read = (name: string) => tokens.getPropertyValue(name).trim();
          setColors({
            low: read("--palette-night-raised"),
            mid: read("--palette-brand"),
            high: read("--palette-brand-glow"),
          });
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {colors ? (
        <Topography
          lowColor={colors.low}
          midColor={colors.mid}
          highColor={colors.high}
          speed={0.18}
          morphSpeed={0.03}
          bands={2.4}
          thickness={0.008}
          glow={0.25}
          brightness={0.8}
          opacity={0.5}
          grain={false}
          mouseInteraction={false}
        />
      ) : null}
      {/* Vår egen toning: håller texten läsbar mot linjerna. */}
      <div className="absolute inset-0 bg-gradient-to-r from-night via-night/80 to-night/45" />
    </div>
  );
}
