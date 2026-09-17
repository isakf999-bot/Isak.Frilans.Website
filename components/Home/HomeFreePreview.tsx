import Link from "next/link";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";

/**
 * "Se din hemsida innan du bestämmer dig" — det unika säljargumentet.
 *
 * Ligger direkt efter Hero så det syns tidigt, i vår varma brand-tint
 * så den bryter övergången mellan mörka heron och vita HomeHelp och
 * omedelbart drar ögat till sig. Tre numrerade steg gör erbjudandet
 * konkret istället för en luddig "kontakta mig".
 *
 * CTA:n går till /kontakt med ett förvalt meddelande så besökaren inte
 * behöver formulera sin första mening själv.
 */

const STEPS = [
  {
    n: "1",
    title: "Du skickar logga + kort brief",
    body: "Ett mejl med logga, färger om ni har dem, och en mening om vad sajten ska göra. Tar två minuter.",
  },
  {
    n: "2",
    title: "Jag gör ett första utkast",
    body: "Ni får ett riktigt förslag på hero, färger och typografi — inte en mall. Klart inom en vecka.",
  },
  {
    n: "3",
    title: "Du bestämmer om vi går vidare",
    body: "Gillar du det? Då tar vi det till skarp sajt. Vill du inte? Då kostar det ingenting — utkastet är ert att behålla.",
  },
];

const PREFILL_MESSAGE =
  "Hej Isak, jag vill gärna se ett gratis förslag på hur en ny sajt skulle kunna se ut för oss. Vår logga skickar jag på mejl.";

const CONTACT_HREF = `/kontakt?meddelande=${encodeURIComponent(PREFILL_MESSAGE)}`;

export function HomeFreePreview() {
  return (
    <section
      id="gratis-forslag"
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: "var(--color-brand-tint)" }}
      aria-labelledby="gratis-forslag-rubrik"
    >
      {/* Diskret bronsdiagonal så sektionen får djup utan textur-brus. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 60% at 100% 0%, rgba(176,137,79,0.12) 0%, rgba(244,235,224,0) 60%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        {/* HEADER — rubrik, brief, CTA */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <Reveal>
            <SectionLabel>Gratis förhandsvisning</SectionLabel>
            <h2
              id="gratis-forslag-rubrik"
              className="mt-4 text-h2 text-ink"
            >
              Se din nya hemsida — innan du bestämmer dig.
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="border-l-[3px] border-brand pl-5 text-lead text-ink/80">
              Skicka mig din logga och en kort beskrivning av företaget. Jag
              gör ett första utkast — färger, typografi, hero — helt
              kostnadsfritt. Först då bestämmer du om vi ska gå vidare.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={CONTACT_HREF}
                className="inline-flex items-center justify-center rounded-md bg-ink px-5 py-3 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-ink/90"
              >
                Få mitt gratis utkast
                <span aria-hidden="true" className="ml-2">→</span>
              </Link>
              <Link
                href="/process"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline-offset-4 hover:underline"
              >
                Så jobbar jag
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* 3 STEG */}
        <ol className="mt-14 grid gap-6 sm:grid-cols-3 lg:mt-16 lg:gap-8">
          {STEPS.map((step, i) => (
            <li key={step.n}>
              <Reveal delay={i * 100}>
                <article className="relative flex h-full flex-col rounded-xl border border-ink/10 bg-white/70 p-6 backdrop-blur-[2px] transition-colors duration-150 hover:border-brand/50">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white"
                  >
                    {step.n}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">
                    {step.body}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Diskret tillit-rad under */}
        <p className="mt-10 text-center text-sm text-ink/60">
          Ingen bindning · Inga dolda kostnader · Utkastet är ert att
          behålla oavsett
        </p>
      </div>
    </section>
  );
}
