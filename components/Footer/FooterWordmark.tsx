"use client";

import { useEffect, useRef, useState } from "react";
import EchoText from "@/components/reactbits/EchoText";

const TEXT = "Isak Web";

/** Samma storlek i den stilla och den animerade versionen — annars hoppar
 *  footern när animationen startar. */
const SIZE = "clamp(2.25rem, 10vw, 8rem)";

/**
 * Footerns avslutande ordbild. Ren dekor — den riktiga loggan med länk finns
 * högst upp i footern.
 *
 * Animationen är EchoText från React Bits: ordet glider in från vänster med
 * en svans av ekon i brons som hinner ikapp och lägger sig till ett enda ord,
 * och ekona följer sedan pekaren när den är nära.
 *
 * EchoText spelar sin entré när den monteras, så den monteras först när
 * ordbilden skrollats in i bild. Dessförinnan (och utan JavaScript) står
 * samma ord stilla på samma plats. Vid reducerad rörelse ritar EchoText
 * inga ekon alls.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="mt-16 overflow-hidden py-[0.12em] lg:mt-20"
    >
      {inView ? (
        <EchoText
          text={TEXT}
          echoes={9}
          offset={44}
          lag={0.2}
          direction="right"
          blur={2}
          fade={0.7}
          duration={1100}
          mode="both"
          cursorRadius={280}
          color="var(--color-brand-glow)"
          tint="var(--color-brand)"
          fontSize={SIZE}
          fontWeight={600}
        />
      ) : (
        <span
          className="inline-block leading-[0.9] font-semibold tracking-[-0.04em] whitespace-nowrap text-brand-glow select-none"
          // Måste vara exakt samma storlek som EchoText får (SIZE ovan).
          style={{ fontSize: SIZE }}
        >
          {TEXT}
        </span>
      )}
    </div>
  );
}
