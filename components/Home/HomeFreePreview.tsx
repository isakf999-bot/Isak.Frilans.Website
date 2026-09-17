import Link from "next/link";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";

/**
 * "Se din hemsida innan du bestämmer dig" — unika säljargumentet.
 *
 * Ligger mellan HomeHelp och HomeCases. Bakgrunden är vår mörka ink så
 * sektionen ansluter till hero + cases-mörkret istället för att sitta som
 * en gul kub i mitten av sidan.
 *
 * Stegen är medvetet BARA typografi — nummer i eyebrow-format, rubrik,
 * kort mening. Inga glasskort, inga cirklar, inga hover-lyft. Redaktionellt
 * istället för "AI-slop 3-column feature grid".
 */

const STEPS = [
  {
    n: "01",
    title: "Du skickar logga + kort brief",
    body: "Ett mejl med logga, färger om ni har dem, och en mening om vad sajten ska göra.",
  },
  {
    n: "02",
    title: "Jag gör ett första utkast",
    body: "Ni får ett riktigt förslag på hero, färger och typografi — inte en mall. Klart inom en vecka.",
  },
  {
    n: "03",
    title: "Du bestämmer om vi går vidare",
    body: "Gillar ni det tar vi det till skarp sajt. Vill ni inte kostar det ingenting.",
  },
];

const PREFILL_MESSAGE =
  "Hej Isak, jag vill gärna se ett gratis förslag på hur en ny sajt skulle kunna se ut för oss. Vår logga skickar jag på mejl.";

const CONTACT_HREF = `/kontakt?meddelande=${encodeURIComponent(PREFILL_MESSAGE)}`;

export function HomeFreePreview() {
  return (
    <section
      id="gratis-forslag"
      className="bg-ink text-white"
      aria-labelledby="gratis-forslag-rubrik"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        {/* HEADER — rubrik vänster, brief + CTA höger (matchar HomeHelp-mönstret) */}
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
            <p className="border-l-[3px] border-brand-glow pl-5 text-lead text-white/75">
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
          </Reveal>
        </div>

        {/* STEG — ren typografi, tunn topplinje per kolumn, ingen box */}
        <ol className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8 lg:mt-20 lg:gap-14">
          {STEPS.map((step, i) => (
            <li key={step.n} className="border-t border-white/15 pt-5">
              <Reveal delay={i * 80}>
                <p className="text-eyebrow font-medium tracking-[0.18em] text-brand-glow">
                  {step.n}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-white/65">
                  {step.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>

        <p className="mt-14 text-sm text-white/50">
          Ingen bindning · Inga dolda kostnader · Utkastet är ert att
          behålla oavsett.
        </p>
      </div>
    </section>
  );
}
