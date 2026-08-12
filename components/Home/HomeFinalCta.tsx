import Link from "next/link";
import { Reveal } from "@/components/Reveal/Reveal";
import { btn } from "@/components/ui/buttonStyles";

export function HomeFinalCta() {
  return (
    <section
      id="starta"
      className="border-t border-line bg-brand text-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <p className="text-eyebrow font-medium tracking-[0.14em] text-white/65 uppercase">
            Kontakt
          </p>
          <h2 className="mt-4 max-w-3xl text-h2 text-white">
            Berätta vad du vill bygga — så säger jag rakt vad det kräver.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            Du får en tydlig rekommendation och ungefärligt pris. Jag säger också
            rakt om jag är rätt person för jobbet — även om svaret är att vänta.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/kontakt" className={btn.onBrand}>
              Starta ett projekt
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/case" className={btn.ghostOnDark}>
              Se kundcase
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
