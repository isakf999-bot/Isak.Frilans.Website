"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/** Riktiga projekt från min portfolio. Varje bild länkar till den live-satta
 *  sajten — poängen är att det går att klicka sig vidare och verifiera att
 *  det inte är påhittat. */
type Slide = {
  src: string;
  title: string;
  tag: string;
  liveSite: string;
  /** Låser sliden sist i bildspelet. Nya projekt kan läggas till var som helst
   *  i listan nedan och hamnar automatiskt före den. Sätt bara på EN slide. */
  pinLast?: boolean;
};

/** Lägg till nya projekt här, i vilken ordning som helst. */
const PROJECTS: Slide[] = [
  {
    src: "/work/netflix.png",
    title: "Netflix-inspirerad trailer-sajt",
    tag: "Streaming-UI",
    liveSite: "https://netflix-inspired-website.vercel.app/",
  },
  {
    src: "/work/ecommerce.png",
    title: "E-handel för kläder",
    tag: "E-handel",
    liveSite: "https://e-commerce-clothing-sable.vercel.app/",
  },
  {
    src: "/work/genesis.png",
    title: "Genesis — företagssajt",
    tag: "Landningssida",
    liveSite: "https://genesiswebsiteisak.netlify.app/",
  },
  {
    src: "/work/landingpage.png",
    title: "Landing Page",
    // "SaaS" och inte "Landningssida" — Genesis har redan den taggen, och
    // taggarna ska skilja projekten åt, inte upprepa varandra.
    tag: "SaaS",
    liveSite: "https://landingpage-portfolio-orpin.vercel.app/",
  },
  {
    src: "/work/planner-editor.png",
    title: "Project Planner-app",
    tag: "Webbapp",
    liveSite: "https://project-planner-app-gamma.vercel.app/",
    pinLast: true,
  },
];

/**
 * Visningsordningen. Allt utan pinLast först, den fastnålade sist.
 *
 * Räknas ut här i stället för att sorteras för hand, så att Planner-appen
 * hamnar sist även om ett nytt projekt läggs till längst ner i PROJECTS.
 */
const SLIDES: Slide[] = [
  ...PROJECTS.filter((project) => !project.pinLast),
  ...PROJECTS.filter((project) => project.pinLast),
];

const INTERVAL = 3000;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = SLIDES.length;

  const go = useCallback(
    (next: number) => setActive((next + total) % total),
    [total],
  );

  // Håll koll på om användaren bett om reducerad rörelse — då stannar
  // auto-rotationen och bilderna blir helt manuella.
  const reducedMotion = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;
  }, []);

  useEffect(() => {
    if (paused || reducedMotion.current) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, total]);

  const current = SLIDES[active];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="group"
      aria-roledescription="Bildspel"
      aria-label="Utvalda projekt från min portfolio"
    >
      <div className="relative aspect-[14/9] overflow-hidden rounded-xl border border-line bg-gradient-to-b from-canvas to-brand-tint shadow-lift">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={i === active ? undefined : true}
          >
            <Image
              src={slide.src}
              alt={`${slide.title} — projekt av Isak Forsberg`}
              fill
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-top"
            />
          </div>
        ))}

        {/* Klick var som helst på bilden bläddrar vidare. */}
        <button
          type="button"
          onClick={() => go(active + 1)}
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label="Nästa projekt"
        />

        {/* Pilar — gör det tydligt att bilderna går att bläddra. */}
        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Föregående projekt"
          className="group absolute top-1/2 left-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 pb-0.5 text-2xl leading-none text-ink shadow-card transition-all duration-200 ease-out hover:bg-brand hover:text-white hover:shadow-lift active:scale-95"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
          >
            ‹
          </span>
        </button>
        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Nästa projekt"
          className="group absolute top-1/2 right-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 pb-0.5 text-2xl leading-none text-ink shadow-card transition-all duration-200 ease-out hover:bg-brand hover:text-white hover:shadow-lift active:scale-95"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
          >
            ›
          </span>
        </button>

        {/* Scrim + textremsa längst ner: säger vad man tittar på och länkar
            till den live-satta sajten. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent p-4 pt-14">
          <div className="min-w-0">
            <p className="text-eyebrow font-medium text-white/70 uppercase">
              {current.tag}
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-white">
              {current.title}
            </p>
          </div>
          <a
            href={current.liveSite}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex shrink-0 items-center gap-1.5 rounded-pill bg-white/95 px-3.5 py-2 text-sm font-medium text-ink shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-lift active:translate-y-0"
          >
            Besök live
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {/* Prickar — klicka för att hoppa direkt till ett projekt. */}
      <div className="mt-5 flex items-center justify-center gap-2.5">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Visa ${slide.title}`}
            aria-current={i === active ? "true" : undefined}
            className={`h-2 rounded-pill transition-all duration-300 ease-out ${
              i === active
                ? "w-7 bg-brand"
                : "w-2 bg-line hover:bg-brand-glow"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
