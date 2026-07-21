import Link from "next/link";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";

const PORTFOLIO_URL = "https://isakforsberg.se/";

/** Verklig stack — samma skills som visas på portfolion. Konkret och
 *  kontrollerbart, vilket är själva poängen: det går att verifiera.
 *  Ordnad språk → ramverk → verktyg. */
const STACK = [
  "HTML5",
  "CSS3",
  "Sass",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Figma",
  "GitHub",
  "VS Code",
];

const PRINCIPLES = [
  {
    title: "Du pratar med den som bygger",
    body: "Ingen säljare som lovar, ingen projektledare som tolkar. Du beskriver problemet för mig, och jag är den som sedan sitter i koden.",
  },
  {
    title: "Fast pris, satt i förväg",
    body: "Du får en summa innan vi börjar, inte en räkning efteråt. Ändras omfattningen säger jag till — du blir aldrig överraskad.",
  },
  {
    title: "Jag säger till om du inte behöver det",
    body: "Om du är på väg att betala för något som inte kommer ge dig något tillbaka, är det min uppgift att säga det. Även när det kostar mig jobbet.",
  },
];

export function About() {
  return (
    <section
      id="om-mig"
      className="scroll-mt-24 border-t border-line"
      aria-labelledby="om-mig-rubrik"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <SectionLabel>Om mig</SectionLabel>
            <h2 id="om-mig-rubrik" className="mt-6 text-h2">
              En person, inte en byrå.
            </h2>
            <div className="mt-6 space-y-5 text-lead text-muted">
              <p>
                Jag är Frontend och Backend-Utvecklare från Sverige och bygger
                hemsidor på frilansbasis. Det jag gillar mest är det som händer
                precis innan koden, att förstå vad ett företag faktiskt lever på,
                och sedan bygga sajten runt det.
              </p>
              <p>
                Tyngdpunkten ligger i Frontend det som syns och känns. Men jag
                bygger även det som ligger bakom ytan formulär som landar rätt,
                bokning och betalning som hänger ihop, data som hamnar där den
                ska. Du behöver alltså inte ta in någon annan för att få en komplett sajt.
              </p>
              <p>
                Jag jobbar mesta dels i React, Next.js och TypeScript. Allt jag har byggt ligger öppet på{" "}
                <a
                  href={PORTFOLIO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand underline decoration-brand-glow decoration-2 underline-offset-4 transition-colors duration-200 hover:decoration-brand"
                >
                  min portfolio
                </a>
                , så du kan se hur det ser ut och känns innan vi ens har pratat.
              </p>
            </div>

            <div className="mt-8">
              <p className="text-eyebrow font-medium text-muted uppercase">
                Bygger med
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {STACK.map((tool) => (
                  <li
                    key={tool}
                    className="cursor-default rounded-pill border border-line bg-surface px-3 py-1.5 text-sm text-ink shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-glow hover:text-brand hover:shadow-lift"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <Link
                href="/case"
                className="shine group inline-flex items-center gap-2.5 rounded-pill bg-brand px-6 py-3.5 font-medium whitespace-nowrap text-white shadow-brand transition-all duration-200 ease-out hover:bg-brand-dark hover:shadow-lift active:scale-[0.97]"
              >
                Se mina tidigare kunders resultat
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>

              {/* Handtecknad pil som pekar tillbaka på knappen. Ligger till
                  höger om den — inte ovanför, där stack-taggarna redan bor.
                  Döljs på små skärmar där raden ändå blir för trång. */}
              <div
                aria-hidden="true"
                className="point-bounce pointer-events-none hidden shrink-0 items-center gap-1.5 lg:flex"
              >
                <svg
                  viewBox="0 0 48 24"
                  fill="none"
                  className="h-6 w-12 text-brand"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M44 6Q22 6 6 18" />
                  <path d="M6 18l11-2M6 18l5-10" />
                </svg>
                <span className="text-sm font-semibold whitespace-nowrap text-brand">
                  Klicka här
                </span>
              </div>
            </div>
          </div>

          <ul className="space-y-4">
            {PRINCIPLES.map((item) => (
              <li
                key={item.title}
                className="card-glow group relative isolate overflow-hidden rounded-xl border border-line bg-gradient-to-b from-white to-[#f5f6fc] p-6 shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-glow hover:shadow-lift"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-6 -left-6 -z-10 h-24 w-24 rounded-full bg-brand-glow opacity-40 blur-2xl"
                />
                <h3 className="flex items-start gap-3 font-sans text-base font-semibold tracking-normal text-ink">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-brand-glow/60 bg-brand-tint text-xs text-brand shadow-sm transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-brand group-hover:text-white"
                  >
                    ✓
                  </span>
                  {item.title}
                </h3>
                <p className="mt-2.5 pl-10 text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
