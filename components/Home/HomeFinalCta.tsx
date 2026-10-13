import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Magnet from "@/components/reactbits/Magnet";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { btn } from "@/components/ui/buttonStyles";

/**
 * Mörkt avslut på undersidor, direkt före footern: en enda uppmaning.
 *
 * Bakgrunden är Aura-gradienten "Copper Shadow" (se .aura-stage i
 * globals.css). Lagren blandas mot sektionens bg-night, så behållaren
 * .aura-stage får medvetet ingen egen bakgrund, transform eller z-index —
 * och innehållet ligger därför inte i en <Reveal>.
 */
export function HomeFinalCta() {
  return (
    <section
      id="starta"
      className="bg-night text-white"
      aria-labelledby="starta-rubrik"
    >
      <div className="aura-stage">
        <div className="aura-stage__layer-1" aria-hidden="true" />
        <div className="aura-stage__layer-2" aria-hidden="true" />
        <div className="aura-stage__layer-3" aria-hidden="true" />
        <div className="aura-stage__layer-4" aria-hidden="true" />

        <div className="aura-stage__content mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
          <SectionLabel tone="dark">Nästa steg</SectionLabel>
          <h2 id="starta-rubrik" className="mt-4 max-w-3xl text-h2 text-white">
            Berätta vad sajten ska göra för er — så får ni veta vad det kostar
            och vad ni får.
          </h2>
          <p className="mt-6 max-w-2xl text-lead text-white/80">
            Ni får en rak rekommendation, ungefärligt pris och en tydlig bild
            av leveransen. Jag säger också om jag inte är rätt person för
            jobbet — hellre det än en felaktig start.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-5">
            {/* Magnet (React Bits): knappen dras en aning mot pekaren. */}
            <Magnet padding={48} magnetStrength={5}>
              <Link href="/kontakt" className={`group ${btn.onBrand}`}>
                Starta ett projekt
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                />
              </Link>
            </Magnet>
            <Link href="/case" className={btn.ghostOnDark}>
              Se kundcase
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
