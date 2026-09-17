import Link from "next/link";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";

/**
 * "Se din hemsida innan du bestämmer dig" — unika säljargumentet.
 *
 * Kort, redaktionell sektion mellan HomeHelp och HomeCases. Bakgrunden är
 * en varm mörk ton — snäppet ljusare än vår bg-ink så den lyfter en aning
 * mot hero + cases utan att bryta det mörka temat.
 *
 * Enbart rubrik + brief + CTA + trust-rad. Inga stegs-boxar, inga
 * numrerade cirklar — säljbudskapet är enkelt nog att bäras av copyn.
 */

const PREFILL_MESSAGE =
  "Hej Isak, jag vill gärna se ett gratis förslag på hur en ny sajt skulle kunna se ut för oss. Vår logga skickar jag på mejl.";

const CONTACT_HREF = `/kontakt?meddelande=${encodeURIComponent(PREFILL_MESSAGE)}`;

export function HomeFreePreview() {
  return (
    <section
      id="gratis-forslag"
      className="text-white"
      style={{ backgroundColor: "#26221f" }}
      aria-labelledby="gratis-forslag-rubrik"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-16">
          <Reveal>
            <SectionLabel tone="dark">Gratis förhandsvisning</SectionLabel>
            <h2
              id="gratis-forslag-rubrik"
              className="mt-4 text-h2 text-white"
            >
              Se din nya hemsida
              <br className="hidden sm:inline" />
              — innan du bestämmer dig.
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="border-l-[3px] border-brand-glow pl-5 text-lead text-white/80">
              Skicka din logga och en kort beskrivning. Jag gör ett första
              utkast — färger, typografi, hero — helt kostnadsfritt. Först
              då bestämmer du om vi ska gå vidare.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link
                href={CONTACT_HREF}
                className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-white/90"
              >
                Få mitt gratis utkast
                <span aria-hidden="true" className="ml-2">→</span>
              </Link>
              <Link
                href="/process"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-glow underline-offset-4 hover:underline"
              >
                Så jobbar jag
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <p className="mt-8 text-sm text-white/55">
              Ingen bindning · Inga dolda kostnader · Utkastet är ert att
              behålla oavsett.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
