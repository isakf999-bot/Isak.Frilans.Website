import Link from "next/link";
import { Phone } from "lucide-react";
import { HeroRotatingWord } from "@/components/Hero/HeroRotatingWord";
import { HeroShowcase } from "@/components/Hero/HeroShowcase";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { btn } from "@/components/ui/buttonStyles";

const PHONE_HREF = "tel:+46762514121";

/**
 * Hero på nattsvart botten med Aura-gradienten "Copper Shadow" (se
 * .aura-stage i globals.css). Lagren blandas mot sektionens bg-night, så
 * behållaren .aura-stage får medvetet ingen egen bakgrund, transform eller
 * z-index.
 *
 * Vänster: vem jag är och vad jag bygger. Höger: beviset — ett
 * webbläsarfönster med riktiga kundsajter (HeroShowcase). På mobil ligger
 * fönstret under texten i full bredd.
 */
export function Hero() {
  return (
    <section id="top" className="bg-night text-white">
      <div className="aura-stage aura-stage--drift">
        <div className="aura-stage__layer-1" aria-hidden="true" />
        <div className="aura-stage__layer-2" aria-hidden="true" />
        <div className="aura-stage__layer-3" aria-hidden="true" />
        <div className="aura-stage__layer-4" aria-hidden="true" />

        {/* Fyller första skärmen, men aldrig högre än 54rem — på en hög
            skärm ska nästa sektion synas i underkanten. */}
        <div className="aura-stage__content mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:py-20 lg:min-h-[min(calc(100svh-4.5rem),54rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14 lg:px-8 lg:py-20">
          <div>
            <SectionLabel tone="dark">Webbutveckling · Helsingborg</SectionLabel>
            <h1 className="mt-6 text-display text-white">
              Hej. <span className="whitespace-nowrap">Jag är Isak.</span>
            </h1>
            {/* Ordet för vad jag bygger byts ut (RotatingText). Skärmläsare
                och sökmotorer får hela meningen på en gång; den rörliga
                versionen är dold för dem. */}
            <p className="sr-only">
              Jag bygger hemsidor, webbutiker och system åt svenska företag.
            </p>
            <p
              aria-hidden="true"
              className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]"
            >
              Åt svenska företag bygger jag <HeroRotatingWord />
            </p>
            <p className="mt-4 max-w-md text-lead text-white/80">
              Fast pris, rak dialog — du pratar med den som skriver koden.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-4">
              <a href={PHONE_HREF} className={btn.onBrand}>
                <Phone aria-hidden="true" className="h-4 w-4" />
                Ring mig
              </a>
              <Link href="/kontakt" className={btn.glassOnVideo}>
                Boka ett samtal
              </Link>
            </div>
          </div>

          <div>
            <HeroShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
