"use client";

import { useEffect, useState } from "react";
import RotatingText from "@/components/reactbits/RotatingText";

const WORDS = ["hemsidor.", "webbutiker.", "system."];

/**
 * Ordet som byts i hero:n — RotatingText från React Bits.
 *
 * Det står sist i meningen, så att inget annat flyttar sig när ordet byter
 * längd. Vid reducerad rörelse står första ordet stilla.
 */
export function HeroRotatingWord() {
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    setAuto(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <RotatingText
      texts={WORDS}
      auto={auto}
      rotationInterval={2600}
      staggerDuration={0.02}
      staggerFrom="first"
      transition={{ type: "spring", damping: 28, stiffness: 320 }}
      mainClassName="-mb-1 inline-flex overflow-hidden pb-1 align-bottom text-brand-glow"
      splitLevelClassName="overflow-hidden"
    />
  );
}
