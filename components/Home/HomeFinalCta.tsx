import Link from "next/link";
import { Reveal } from "@/components/Reveal/Reveal";
import { btn } from "@/components/ui/buttonStyles";

export function HomeFinalCta() {
  return (
    <section id="starta" className="border-t border-line bg-transparent text-white">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <p className="text-eyebrow font-medium tracking-[0.14em] text-muted uppercase">
            Nästa steg
          </p>
          <h2 className="mt-4 max-w-3xl text-h2 text-white">
            Berätta vad sajten ska göra för er — så får ni veta vad det kostar
            och vad ni får.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Ni får en rak rekommendation, ungefärligt pris och en tydlig bild av
            leveransen. Jag säger också om jag inte är rätt person för jobbet —
            hellre det än en felaktig start.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/kontakt" className={btn.primary}>
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
