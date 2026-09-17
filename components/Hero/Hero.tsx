import Link from "next/link";

const PHONE_HREF = "tel:+46762514121";

/**
 * Hero med två kolumner på desktop: copy vänster + cinematic drone-video
 * höger. Videon är en riktig HTML5 <video> — cinematic top-down drone-shot
 * över svensk skog + väg + sjö. Autoplayar tyst, loopar seamlessly.
 *
 * På mobil ligger videon under copyn (stacked) så vertikalflödet fungerar
 * utan att videon konkurrerar med rubriken.
 *
 * Videon är hostad lokalt i /public/media/hero-drone.mp4 (Pexels 2711134,
 * royalty-free). Poster laddas som LCP-fallback så första paint blir snabb
 * även om nätverket är segt.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-ink text-white"
    >
      {/* Enda dekorationen: en dov, varm radial i höger topphörnet så
          mörkret får djup utan att skrika. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-40 right-[-14rem] h-[38rem] w-[38rem] rounded-full opacity-45 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(196,165,116,0.32) 0%, rgba(28,25,23,0) 65%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:items-center lg:gap-14">
          {/* Copy-kolumnen */}
          <div className="max-w-xl">
            <p className="text-eyebrow font-medium tracking-[0.14em] text-white/70 uppercase">
              <span
                aria-hidden="true"
                className="mr-2 inline-block h-1 w-1 -translate-y-[3px] rounded-full bg-brand-glow align-middle"
              />
              Webbutveckling · Helsingborg
            </p>
            <h1 className="mt-5 text-h1 text-white lg:text-display">
              Hej. Jag är Isak.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/85 lg:mt-6">
              Jag bygger hemsidor, webbutiker och system åt svenska företag.
              Fast pris, rak dialog — du pratar med den som skriver koden.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-white/90"
              >
                Ring mig
              </a>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-md border border-white/70 bg-white/10 px-5 py-3 text-[0.9375rem] font-semibold text-white transition-colors hover:border-white hover:bg-white/20"
              >
                Boka ett samtal
              </Link>
            </div>
          </div>

          {/* Drone-video-kolumnen. En riktig HTML5-video, ingen animation. */}
          <div className="relative">
            {/* Subtil brons-glow bakom framen — läser som atmosfär, inte
                dekoration. Ligger bara på desktop där det ger effekt. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10 hidden rounded-[1.5rem] opacity-40 blur-3xl lg:block"
              style={{
                background:
                  "radial-gradient(60% 55% at 50% 50%, rgba(196,165,116,0.28) 0%, rgba(28,25,23,0) 70%)",
              }}
            />

            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-[0_28px_80px_-30px_rgba(0,0,0,0.75)]">
              <video
                className="block h-full w-full object-cover"
                style={{ aspectRatio: "16 / 9" }}
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

              {/* Vinjett-overlay som mörkar hörnen svagt så videon smälter
                  in i den mörka heron i stället för att sitta som en
                  fyrkantig affisch. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,0) 55%, rgba(28,25,23,0.5) 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
