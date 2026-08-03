"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed ocean hero.
 * LCP = lightweight poster (next/image priority). Video loads only after idle
 * so it never blocks Largest Contentful Paint.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let cancelled = false;
    const start = () => {
      if (!cancelled) setLoadVideo(true);
    };

    // Wait until the page is quiet so poster can paint as LCP first.
    const fallback = window.setTimeout(start, 1800);
    const idle =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(start, { timeout: 2500 })
        : undefined;

    return () => {
      cancelled = true;
      if (idle != null) window.cancelIdleCallback(idle);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !loadVideo) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
        video.pause();
        setShowVideo(false);
      } else {
        void video.play().then(() => setShowVideo(true)).catch(() => {});
      }
    };

    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [loadVideo]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <Image
        src="/media/hero-lcp.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        quality={70}
      />

      {loadVideo ? (
        <video
          ref={ref}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            showVideo ? "opacity-100" : "opacity-0"
          }`}
          muted
          loop
          playsInline
          preload="none"
          poster="/media/hero-ocean-poster-sm.jpg"
        >
          <source src="/media/hero-ocean.mp4" type="video/mp4" />
        </video>
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220]/55 via-[#0b3a6e]/45 to-[#0b1220]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/50 via-transparent to-[#0b1220]/25" />
    </div>
  );
}
