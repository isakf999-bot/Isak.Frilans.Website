import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { btn } from "@/components/ui/buttonStyles";

const PORTFOLIO_URL = "https://isakforsberg.se/";

const PORTRAIT_SRC = "/media/isak-portrait.png";

const STACK = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Figma",
  "GitHub",
];

const STORY = [
  {
    title: "Varför frilans",
    body: "Jag har länge velat starta något där man slipper webbyråpriser för en helt vanlig hemsida. Alla ska kunna få en riktig sajt till ett rimligt pris, utan att behöva gå via en stor byrå. Därför jobbar jag som frilansare.",
  },
  {
    title: "Bakgrund",
    body: "Jag har utbildat mig till fullstackutvecklare. Det som driver mig mest är att hjälpa andra, både i projekten och i hur jag vill jobba. Rakt, enkelt och utan krångel.",
  },
  {
    title: "Vid sidan av koden",
    body: "Vid sidan av koden har jag spelat hockey i 14 år. Jag är en glad och ödmjuk kille som älskar att träna. Det syns nog i hur jag tar mig an jobb också. Jag gillar att göra klart saker ordentligt, och jag bygger alltid från grunden. Inga mallar.",
  },
];

const ROW =
  "grid gap-3 border-t border-ink py-8 lg:grid-cols-12 lg:gap-16 lg:py-10";

export function About() {
  return (
    <section
      id="om-mig"
      className="scroll-mt-24"
      aria-labelledby="om-mig-rubrik"
    >
      {/* Öppning: vem jag är + porträttet */}
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-20 lg:grid-cols-12 lg:items-end lg:gap-16 lg:px-8 lg:pt-24 lg:pb-28">
        <Reveal className="lg:col-span-7">
          <SectionLabel>Om mig</SectionLabel>
          <h1 id="om-mig-rubrik" className="mt-6 text-h1">
            Hej, jag heter Isak Forsberg.
          </h1>
          <p className="mt-6 font-mono text-sm text-muted">
            21 år · Fullstackutvecklare · Helsingborg
          </p>
          <p className="mt-8 max-w-xl text-lead text-ink">
            Jag älskar att bygga hemsidor. Inte bara sätta ihop något som ser
            okej ut, utan designa och bygga från grunden. Responsiva sidor,
            tydlig struktur och SEO som faktiskt hjälper dig att synas.
          </p>
        </Reveal>

        {/* Porträttet är en friläggning. Den står på sajtens blå gradient och
            beskärs vid midjan, så att den ser placerad ut och inte inklistrad.
            Ligger utanför <Reveal> eftersom gradienten inte tål transform. */}
        <figure className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div className="overflow-hidden rounded-xl bg-night">
            <div className="aura-stage">
              <div className="aura-stage__layer-1" aria-hidden="true" />
              <div className="aura-stage__layer-2" aria-hidden="true" />
              <div className="aura-stage__layer-3" aria-hidden="true" />
              <div className="aura-stage__layer-4" aria-hidden="true" />
              <div className="aura-stage__content aspect-[4/5]">
                <div className="absolute top-[-30%] left-1/2 aspect-[472/1024] w-[115%] -translate-x-1/2">
                  <Image
                    src={PORTRAIT_SRC}
                    alt="Isak Forsberg ler och gör tummen upp med båda händerna"
                    fill
                    priority
                    sizes="(max-width: 1024px) min(115vw, 515px), 520px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          <figcaption className="mt-4 flex flex-wrap justify-between gap-x-6 gap-y-1 font-mono text-sm text-muted">
            <span>Isak Forsberg</span>
            <span>Helsingborg</span>
          </figcaption>
        </figure>
      </div>

      {/* Berättelsen */}
      <div className="bg-mist">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <Reveal>
            <h2 className="max-w-4xl text-h2">
              Du pratar med mig, och jag är den som skriver koden.
            </h2>
          </Reveal>

          <Reveal className="mt-12 lg:mt-16">
            {STORY.map((part) => (
              <div key={part.title} className={ROW}>
                <h3 className="text-h3 lg:col-span-4">{part.title}</h3>
                <p className="max-w-[62ch] text-muted lg:col-span-8">
                  {part.body}
                </p>
              </div>
            ))}

            <div className={ROW}>
              <h3 className="text-h3 lg:col-span-4">Bygger med</h3>
              <ul className="flex flex-wrap gap-2 lg:col-span-8">
                {STACK.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-md border border-line-cool bg-surface px-3 py-1.5 font-mono text-xs text-ink"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${ROW} border-b`}>
              <h3 className="text-h3 lg:col-span-4">Mer av det jag byggt</h3>
              <p className="max-w-[62ch] text-muted lg:col-span-8">
                Vill du se mer av vad jag byggt? Det finns på{" "}
                <a
                  href={PORTFOLIO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link inline-flex items-center gap-1"
                >
                  min portfolio
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  <span className="sr-only">(öppnas i ny flik)</span>
                </a>
                .
              </p>
            </div>
          </Reveal>

          <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href="/kontakt" className={btn.primary}>
              Hör av dig
            </Link>
            <Link href="/process" className={btn.ghost}>
              Så går det till
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
