import Link from "next/link";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { btn } from "@/components/ui/buttonStyles";

const OUTCOMES = [
  {
    title: "En sajt som säljer åt dig",
    body: "Inte bara “något snyggt på nätet”. Du får en struktur som gör det enkelt för besökaren att förstå vad ni gör, lita på er och ta nästa steg — boka, köpa eller höra av sig.",
  },
  {
    title: "Fast pris innan vi börjar",
    body: "Du vet vad det kostar innan första raden kod. Inga timmar som tickar i det tysta, inga “vi får se”-fakturor. Scope och pris är klara — så du kan planera.",
  },
  {
    title: "Du äger allt",
    body: "Koden, domänen, hostingen och innehållet är ert. Ingen byrå-låsning, ingen månadsavgift för att “få ut” sajten. Ni kan byta leverantör imorgon om ni vill.",
  },
  {
    title: "Direkt med den som bygger",
    body: "Du pratar med mig — samma person som designar, kodar och publicerar. Snabba svar, färre feltolkningar, och beslut som faktiskt landar i produkten.",
  },
  {
    title: "Snabb, sökbar och byggd rätt",
    body: "Mobilanpassning, prestanda och grundläggande SEO ingår i hur jag bygger. Sajten ska kännas snabb, synas i sök och gå att utveckla vidare när ni växer.",
  },
  {
    title: "Leverans du kan lita på",
    body: "Tydlig tidplan, avstämningar längs vägen och en färdig sajt som ni kan använda från dag ett — med support så ni kommer igång utan att känna er ensamma.",
  },
];

/**
 * Säljsektion: konkret vad kunden får av att anlita Isak Web.
 */
export function HomeValue() {
  return (
    <section
      id="vad-du-far"
      className="border-t border-line bg-transparent"
      aria-labelledby="vad-du-far-rubrik"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal className="max-w-3xl">
          <SectionLabel>Vad du får</SectionLabel>
          <h2 id="vad-du-far-rubrik" className="mt-4 text-h2">
            Det här får du när du anlitar mig.
          </h2>
          <p className="mt-5 text-lead text-muted">
            Du betalar inte för möten, mellanlager eller en mall med er logga
            på. Du betalar för en hemsida som gör jobbet — byggd åt ert företag,
            med tydligt pris och dig i kontroll.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.map((item, i) => (
            <Reveal key={item.title} delay={i * 45}>
              <li className="flex h-full flex-col rounded-lg border border-line glass p-6 transition-[border-color] duration-150 hover:border-ink/20">
                <span
                  aria-hidden="true"
                  className="font-mono text-sm font-semibold text-brand"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 grow text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <div className="mt-14 max-w-3xl border-t border-line pt-10">
            <p className="text-lg leading-relaxed text-ink">
              Kort sagt: du får en partner som tar ansvar för resultatet — inte
              bara levererar filer. Från första samtalet till live sajt vet du
              vad som händer, vad det kostar och vad du går hem med.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/kontakt" className={btn.primary}>
                Berätta om ditt projekt
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/paket" className={btn.ghostOnDark}>
                Se vad det kostar
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
