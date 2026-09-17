import Image from "next/image";
import Link from "next/link";

const PHONE_HREF = "tel:+46762514121";

/**
 * Hero med stillbild av arbetsyta (uppifrån-vy på laptop + två personer),
 * inspirerad av Bravo Webbs foto-hero men med vårt eget material och vår
 * egen copy. Ingen video just nu — bilden är statisk tills vi har ett
 * top-down-klipp som matchar. Videons load-logik satt lite i vägen och
 * hero-behind.mp4 speglade inte längre "vi bygger hemsidor".
 */
export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/media/hero-desk-work.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/55 to-ink/25 lg:from-ink/78 lg:via-ink/45 lg:to-ink/15" />
      </div>

      <div className="relative mx-auto flex min-h-[34.7rem] max-w-6xl flex-col justify-center px-6 py-16 sm:min-h-[42rem] lg:min-h-[800px] lg:px-8 lg:py-24">
        <p className="text-eyebrow font-medium tracking-[0.14em] text-white/70 uppercase">
          Webbutveckling · Helsingborg
        </p>
        <h1 className="mt-5 max-w-3xl text-h1 text-white lg:text-display">
          Hej. Jag är Isak.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85 lg:mt-6">
          Jag bygger hemsidor, webbutiker och system åt svenska företag. Fast
          pris, rak dialog — du pratar med den som skriver koden.
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
    </section>
  );
}
