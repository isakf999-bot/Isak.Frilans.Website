"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Lock } from "lucide-react";
import { publishedCases } from "@/lib/cases";

/** Hur länge varje kundsajt visas innan fönstret byter flik av sig självt. */
const DWELL_MS = 6000;

/**
 * Hero:ns signatur: ett webbläsarfönster där flikarna ÄR kundcasen.
 *
 * Varje flik är en publicerad kundsajt ur `lib/cases.ts`, adressfältet visar
 * dess riktiga domän och "Besök live" öppnar sajten. Den aktiva fliken har en
 * förloppslinje som visar när fönstret byter sajt — linjens animation är
 * själva timern, så det som syns och det som händer kan aldrig hamna i otakt.
 *
 * Finns bara ett publicerat case visas ett fönster utan flikar.
 */
export function HeroShowcase() {
  const id = useId();
  const [active, setActive] = useState(0);
  // Autoväxlingen startar först i webbläsaren, och aldrig om besökaren bett om
  // reducerad rörelse. Väljer besökaren en flik själv stannar den för gott.
  const [auto, setAuto] = useState(false);
  const [paused, setPaused] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const barRef = useRef<HTMLSpanElement | null>(null);
  const timerRef = useRef<Animation | null>(null);

  const total = publishedCases.length;
  const hasTabs = total > 1;

  useEffect(() => {
    if (total < 2) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAuto(!mq.matches);
  }, [total]);

  // Förloppslinjen ritas med Web Animations API: den går att pausa och säger
  // själv till när den är klar, utan en egen keyframe i den globala CSS:en.
  useEffect(() => {
    const bar = barRef.current;
    if (!auto || !bar || typeof bar.animate !== "function") return;
    const timer = bar.animate(
      [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
      { duration: DWELL_MS, easing: "linear", fill: "forwards" },
    );
    timer.onfinish = () => setActive((v) => (v + 1) % total);
    timerRef.current = timer;
    return () => {
      timer.onfinish = null;
      timer.cancel();
      timerRef.current = null;
    };
  }, [auto, active, total]);

  useEffect(() => {
    const timer = timerRef.current;
    if (!timer) return;
    if (paused) timer.pause();
    else timer.play();
  }, [paused, auto, active]);

  if (total === 0) return null;

  const current = publishedCases[active];

  const select = (index: number) => {
    setAuto(false);
    setActive((index + total) % total);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    let next: number;
    if (event.key === "ArrowRight") next = (active + 1) % total;
    else if (event.key === "ArrowLeft") next = (active - 1 + total) % total;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = total - 1;
    else return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      className="overflow-hidden rounded-xl border border-white/15 bg-night-raised shadow-window"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Flikraden */}
      <div className="flex items-end gap-3 bg-night px-3 pt-3 sm:gap-4 sm:px-4">
        <div
          aria-hidden="true"
          className="mb-4 hidden shrink-0 items-center gap-1.5 sm:flex"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>

        {hasTabs ? (
          <div
            role="tablist"
            aria-label="Kundsajter jag har byggt"
            onKeyDown={onKeyDown}
            className="flex min-w-0 flex-1 items-end gap-1"
          >
            {publishedCases.map((study, i) => {
              const isActive = i === active;
              return (
                <button
                  key={study.slug}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls={`${id}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(i)}
                  className={`relative min-w-0 flex-1 cursor-pointer overflow-hidden rounded-t-lg px-3 py-2.5 text-left text-sm transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-glow sm:max-w-60 sm:px-4 ${
                    isActive
                      ? "bg-night-raised font-medium text-white"
                      : "text-white/65 hover:bg-white/5 hover:text-white active:bg-white/10"
                  }`}
                >
                  <span className="block truncate">{study.client}</span>
                  <span className="hidden truncate text-xs font-normal text-white/65 sm:block">
                    {study.industry}
                  </span>

                  {isActive && auto ? (
                    <span
                      ref={barRef}
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-0.5 origin-left bg-brand-glow [transform:scaleX(0)]"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="min-w-0 flex-1 truncate rounded-t-lg bg-night-raised px-4 py-2.5 text-sm font-medium text-white sm:max-w-60">
            {current.client}
          </p>
        )}
      </div>

      {/* Adressfältet */}
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5 sm:gap-3 sm:px-4">
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-night px-3 py-2">
          <Lock
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0 text-brand-glow"
          />
          <span className="truncate font-mono text-xs text-white/85 sm:text-[0.8125rem]">
            {current.domain}
          </span>
        </div>
        <a
          href={current.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Besök ${current.domain} live (öppnas i ny flik)`}
          className="group link-on-dark inline-flex shrink-0 items-center gap-1 px-1 py-1.5 text-sm"
        >
          Besök live
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      {/* Sidan i fönstret */}
      <div
        role={hasTabs ? "tabpanel" : undefined}
        id={`${id}-panel`}
        aria-labelledby={hasTabs ? `${id}-tab-${active}` : undefined}
        className="relative aspect-[16/10] w-full bg-night"
      >
        {publishedCases.map((study, i) => (
          <Image
            key={study.slug}
            src={study.heroImage}
            alt={i === active ? study.heroAlt : ""}
            aria-hidden={i === active ? undefined : true}
            fill
            priority={i === 0}
            sizes="(max-width: 1024px) 92vw, 640px"
            className={`object-cover object-top transition-opacity duration-500 ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
