import Link from "next/link";
import { HeroDeviceLoop } from "@/components/Hero/HeroDeviceLoop";

const PHONE_HREF = "tel:+46762514121";

/**
 * Hero med två kolumner på desktop: copy vänster + live device-loop höger.
 * Devicen skriver JSX, cross-fadear till renderad preview, morphar från
 * laptop → telefon och tillbaka. Det är själva pitchen — "jag skriver
 * koden och bygger både desktop- och mobil-versionen" — utan att stavas ut.
 *
 * På mobil visas bara copyn. Device-loopen skulle konkurrera med den
 * riktiga mobil-vyn av sajten som besökaren redan tittar på, så den är
 * medvetet gömd där.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-ink text-white"
    >
      {/* Enda dekorationen: en dov, varm radial i höger topphörnet så
          mörkret får djup utan att skrika. Devicen är fokus, inte glowet. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-40 right-[-14rem] h-[38rem] w-[38rem] rounded-full opacity-55 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(196,165,116,0.35) 0%, rgba(28,25,23,0) 65%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:items-center lg:gap-14">
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

          {/* Device-loopen — bara desktop */}
          <div className="hidden justify-center lg:flex">
            <HeroDeviceLoop />
          </div>
        </div>
      </div>
    </section>
  );
}
