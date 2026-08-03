"use client";

import { useEffect, useRef } from "react";

/**
 * Full-bleed ocean video for the hero.
 * Muted loop + poster; pauses and hides video when reduced-motion is on.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
        video.pause();
        video.classList.add("opacity-0");
      } else {
        video.classList.remove("opacity-0");
        void video.play().catch(() => {});
      }
    };

    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Poster always underneath for LCP / reduced motion / load fail */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/media/hero-ocean-poster.png)",
        }}
      />
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/hero-ocean-poster.jpg"
      >
        <source src="/media/hero-ocean.mp4" type="video/mp4" />
      </video>
      {/* Soft blue wash so text stays readable and brand stays blue */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220]/55 via-[#0b3a6e]/45 to-[#0b1220]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/50 via-transparent to-[#0b1220]/25" />
    </div>
  );
}
