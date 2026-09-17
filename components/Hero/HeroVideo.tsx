"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Riktig bakgrundsfilm — bakifrån mot skärmen, utan ansikten.
 * Ingen Ken Burns. Vid reduced-motion visas bara stillbilden.
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

    const fallback = window.setTimeout(start, 400);
    const idle =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(start, { timeout: 800 })
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

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setShowVideo(true))
          .catch(() => setShowVideo(false));
      }
    };

    const onPlaying = () => setShowVideo(true);
    const onInteract = () => tryPlay();

    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };

    video.addEventListener("canplay", tryPlay);
    video.addEventListener("playing", onPlaying);
    window.addEventListener("touchstart", onInteract, { once: true, passive: true });
    window.addEventListener("click", onInteract, { once: true });
    document.addEventListener("visibilitychange", onVisible);

    video.load();
    tryPlay();
    const retry = window.setTimeout(tryPlay, 1800);

    return () => {
      window.clearTimeout(retry);
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("playing", onPlaying);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("click", onInteract);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [loadVideo, reduceMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink" aria-hidden="true">
      <Image
        src="/media/hero-behind-poster.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_30%]"
      />

      {loadVideo && !reduceMotion ? (
        <video
          ref={ref}
          className={`absolute inset-0 h-full w-full object-cover object-[center_30%] transition-opacity duration-500 ${
            showVideo ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/hero-behind-poster.jpg"
        >
          <source src="/media/hero-behind.mp4" type="video/mp4" />
        </video>
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/40 to-ink/25 lg:from-ink/75 lg:via-ink/45 lg:to-ink/20" />
    </div>
  );
}
