import Link from "next/link";

const PHONE_HREF = "tel:+46762514121";

/**
 * Hero med full-bleed drone-video som bakgrund. Videon täcker hela
 * sektionen från kant till kant (object-cover) och copyn ligger ovanpå
 * i en mörk gradient som säkrar läsbarhet mot den ljusa himlen och
 * de gröna trädkronorna.
 *
 * Videon är en riktig HTML5 <video> — cinematic top-down drone-shot
 * över svensk skog + väg + sjö. Autoplay + loop + muted + playsInline
 * så den startar utan användarinteraktion även på iOS.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden bg-ink text-white"
    >
      {/* Full-bleed video-bakgrund */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/media/hero-drone-poster-v2.jpg"
        aria-hidden="true"
      >
        <source src="/media/hero-drone-v2.mp4" type="video/mp4" />
      </video>

      {/* Två-lagers overlay:
          1) horisontell gradient — mörk vänster, klarare höger — så
             copyn (vänsterjusterad) alltid har hög kontrast mot videon
             utan att gömma det som händer i bilden.
          2) vertikal botten-fade som glider ner i den mörka delen
             efter heron så övergången till nästa section blir sömlös. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(20,18,17,0.86) 0%, rgba(20,18,17,0.72) 32%, rgba(20,18,17,0.35) 62%, rgba(20,18,17,0.12) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(28,25,23,0) 0%, rgba(28,25,23,0.65) 60%, rgba(28,25,23,1) 100%)",
        }}
      />

      {/* Copy-kolumnen — vänsterjusterad, håller sig i vänstra ⅔ på
          desktop så den inte lägger sig ovanpå horisonten i höger bild. */}
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-eyebrow font-medium tracking-[0.14em] text-white/80 uppercase">
            <span
              aria-hidden="true"
              className="mr-2 inline-block h-1 w-1 -translate-y-[3px] rounded-full bg-brand-glow align-middle"
            />
            Webbutveckling · Helsingborg
          </p>
          <h1 className="mt-5 text-h1 text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] lg:text-display">
            Hej. Jag är Isak.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)] lg:mt-6">
            Jag bygger hemsidor, webbutiker och system åt svenska företag.
            Fast pris, rak dialog — du pratar med den som skriver koden.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-[0.9375rem] font-semibold text-ink shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-colors hover:bg-white/90"
            >
              Ring mig
            </a>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center rounded-md border border-white/70 bg-white/10 px-5 py-3 text-[0.9375rem] font-semibold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/20"
            >
              Boka ett samtal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
