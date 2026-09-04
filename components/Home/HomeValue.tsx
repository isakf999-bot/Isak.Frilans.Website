import Link from "next/link";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { btn } from "@/components/ui/buttonStyles";

const OUTCOMES = [
  {
    title: "En sajt med ett tydligt jobb",
    body: "Jag börjar inte med en mall och “något snyggt”. Jag börjar med vad besökaren ska göra: höra av sig, boka eller köpa. Sen ritar jag struktur, text och knappar så den vägen är uppenbar — på mobil först, utan brus.",
  },
  {
    title: "Fast pris innan första raden kod",
    body: "Du får scope och pris innan jag börjar bygga. Inga timmar som tickar i bakgrunden, inga “vi får se”-fakturor. Behöver något läggas till gör vi det medvetet — du vet vad det kostar innan det händer.",
  },
  {
    title: "Ni äger koden. På riktigt.",
    body: "Sajten, koden, domänen och hostingen är ert. Jag bygger i modern teknik, inte i ett byråsystem ni fastnar i. Vill ni byta utvecklare imorgon tar ni med er allt — ingen månadsavgift för att “få ut” sajten.",
  },
  {
    title: "Du pratar med den som kodar",
    body: "Ingen projektledare som översätter. Du skriver till mig — samma person som designar, kodar och publicerar. Därför går det fort, därför blir besluten rätt, och därför landar det du sagt faktiskt i sajten.",
  },
  {
    title: "Byggd som en produkt — inte en mall",
    body: "Från grunden i React/Next.js. Responsiv på riktigt, snabba laddtider, formulär som går att följa upp och grundläggande SEO (titlar, struktur, sitemap) ingår i hur jag bygger. Inte som tillägg. Redo att växa när ni gör det.",
  },
  {
    title: "Live på utsatt tid",
    body: "Typiskt 3–10 arbetsdagar när innehållet är på plats. Du får en tidplan, avstämningar längs vägen och en sajt som går att använda från dag ett — plus 14 dagars support efter lansering så ni inte står ensamma.",
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
            Jag designar och kodar sajten. Du äger den.
          </h2>
          <p className="mt-5 text-lead text-muted">
            Du betalar inte för möten, mellanlager eller en{" "}
            <Link
              href="/byta-wordpress"
              className="font-medium text-brand hover:opacity-70"
            >
              WordPress-mall
            </Link>{" "}
            med er logga på. Du betalar för en{" "}
            <Link
              href="/hemsida-foretag"
              className="font-medium text-brand hover:opacity-70"
            >
              hemsida till företaget
            </Link>{" "}
            byggd från grunden — med{" "}
            <Link
              href="/hemsida-fast-pris"
              className="font-medium text-brand hover:opacity-70"
            >
              fast pris
            </Link>
            , tydlig struktur och dig i kontroll från dag ett.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.map((item, i) => (
            <Reveal key={item.title} delay={i * 45}>
              <li className="flex h-full flex-col rounded-lg border border-line glass p-6 transition-[border-color] duration-150 hover:border-ink/20">
                <h3 className="text-lg font-semibold tracking-tight text-ink">
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
              Kort sagt: jag tar ansvar för att sajten faktiskt fungerar —
              struktur, kod, publicering och att ni kommer igång. Från första
              samtalet till live vet du vad som händer, vad det kostar och vad
              du går hem med.
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
