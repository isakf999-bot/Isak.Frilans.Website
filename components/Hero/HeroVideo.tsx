"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed ocean hero.
 *
 * LCP = lightweight poster. Video starts shortly after so LCP stays good.
 * If autoplay is blocked (common on work PCs / Low Power Mode), we keep a
 * subtle Ken Burns on the poster so the hero never looks completely frozen —
 * unless the user has prefers-reduced-motion.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(mq.matches);
    syncMotion();
    mq.addEventListener("change", syncMotion);

    if (mq.matches) {
      return () => mq.removeEventListener("change", syncMotion);
    }

    let cancelled = false;
    const start = () => {
      if (!cancelled) setLoadVideo(true);
    };

    // Short delay so poster can win LCP, then start video for real users.
    const fallback = window.setTimeout(start, 600);
    const idle =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(start, { timeout: 1000 })
        : undefined;

    return () => {
      cancelled = true;
      if (idle != null) window.cancelIdleCallback(idle);
      window.clearTimeout(fallback);
      mq.removeEventListener("change", syncMotion);
    };
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !loadVideo || reduceMotion) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setShowVideo(true))
          .catch(() => setShowVideo(false));
      }
    };

    const onCanPlay = () => tryPlay();
    const onPlaying = () => setShowVideo(true);
    const onInteract = () => tryPlay();
    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("playing", onPlaying);
    window.addEventListener("touchstart", onInteract, {
      once: true,
      passive: true,
    });
    window.addEventListener("click", onInteract, { once: true });
    window.addEventListener("keydown", onInteract, { once: true });
    document.addEventListener("visibilitychange", onVisible);

    video.load();
    tryPlay();

    // Work browsers sometimes need a second attempt after network settles.
    const retry = window.setTimeout(tryPlay, 2000);

    return () => {
      window.clearTimeout(retry);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("playing", onPlaying);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("click", onInteract);
      window.removeEventListener("keydown", onInteract);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [loadVideo, reduceMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <Image
        src="/media/hero-lcp.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className={`object-cover ${
          showVideo || reduceMotion ? "" : "hero-poster-motion"
        }`}
        quality={70}
      />

      {loadVideo && !reduceMotion ? (
        <video
          ref={ref}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            showVideo ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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
