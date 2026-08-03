import Link from "next/link";
import { Reveal } from "@/components/Reveal/Reveal";

export function HomeFinalCta() {
  return (
    <section
      id="starta"
      className="relative overflow-hidden border-t border-line bg-brand text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <p className="text-eyebrow font-medium tracking-[0.14em] text-white/70 uppercase">
            Nästa steg
          </p>
          <h2 className="mt-4 max-w-3xl text-h2 text-white">
            Berätta vad du vill bygga — så säger jag rakt vad det kräver.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            Inget säljsnack. Du får en tydlig rekommendation, ungefärligt pris och
            om jag är rätt person för jobbet. Också om svaret är att vänta.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-pill bg-white px-7 py-4 font-semibold text-brand shadow-lift transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-brand-tint active:scale-[0.98]"
            >
              Starta ett projekt
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/case"
              className="inline-flex items-center gap-2 rounded-pill border border-white/35 px-7 py-4 font-medium text-white transition-all duration-200 ease-out hover:bg-white/10"
            >
              Se kundcase
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
