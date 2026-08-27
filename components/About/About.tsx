import Link from "next/link";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";

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

export function About() {
  return (
    <section
      id="om-mig"
      className="scroll-mt-24"
      aria-labelledby="om-mig-rubrik"
    >
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-20 lg:px-8 lg:pt-32 lg:pb-28">
          <Reveal>
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <figure className="mx-auto w-full max-w-md self-start lg:sticky lg:top-28 lg:mx-0 lg:max-w-none">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={PORTRAIT_SRC}
                    alt="Isak Forsberg"
                    width={800}
                    height={1000}
                    className="absolute left-1/2 top-[62%] h-[200%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
                <figcaption className="mt-4 text-sm text-muted">
                  Isak Forsberg, Helsingborg
                </figcaption>
              </figure>

              <div>
                <SectionLabel>Om mig</SectionLabel>
                <h1 id="om-mig-rubrik" className="mt-6 text-h2">
                  Hej, jag heter Isak Forsberg.
                </h1>
                <p className="mt-3 text-lead text-muted">
                  21 år · Fullstackutvecklare · Helsingborg
                </p>

                <div className="mt-8 space-y-5 text-lead text-muted">
                  <p>
                    Jag älskar att bygga hemsidor. Inte bara sätta ihop något som
                    ser okej ut, utan designa och bygga från grunden. Responsiva
                    sidor, tydlig struktur och SEO som faktiskt hjälper dig att
                    synas.
                  </p>
                  <p>
                    Jag har länge velat starta något där man slipper webbyråpriser
                    för en helt vanlig hemsida. Alla ska kunna få en riktig sajt
                    till ett rimligt pris, utan att behöva gå via en stor byrå.
                    Därför jobbar jag som frilansare. Du pratar med mig, och jag
                    är den som skriver koden.
                  </p>
                  <p>
                    Jag har utbildat mig till fullstackutvecklare. Det som driver
                    mig mest är att hjälpa andra, både i projekten och i hur jag
                    vill jobba. Rakt, enkelt och utan krångel.
                  </p>
                  <p>
                    Vid sidan av koden har jag spelat hockey i 14 år. Jag är en
                    glad och ödmjuk kille som älskar att träna. Det syns nog i hur
                    jag tar mig an jobb också. Jag gillar att göra klart saker
                    ordentligt, och jag bygger alltid från grunden. Inga mallar.
                  </p>
                  <p>
                    Vill du se mer av vad jag byggt? Det finns på{" "}
                    <a
                      href={PORTFOLIO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand underline decoration-brand/40 decoration-2 underline-offset-4 transition-colors duration-150 hover:decoration-brand"
                    >
                      min portfolio
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-10 lg:mt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <div className="hidden lg:block" aria-hidden="true" />
              <div>
                <div>
                  <p className="text-eyebrow font-medium text-muted uppercase">
                    Bygger med
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {STACK.map((tool) => (
                      <li
                        key={tool}
                        className="border border-line bg-surface px-3 py-1.5 text-sm text-ink"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3.5 font-semibold text-black transition-opacity duration-150 hover:opacity-90"
                  >
                    Hör av dig
                    <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/paket"
                    className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-6 py-3.5 font-medium text-ink transition-colors duration-150 hover:border-ink/25"
                  >
                    Se paket och priser
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
    </section>
  );
}
