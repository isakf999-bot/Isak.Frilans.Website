import Link from "next/link";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";

const PORTFOLIO_URL = "https://isakforsberg.se/";

/** Byt till "/media/isak.jpg" när ditt foto ligger i public/media/. */
const PORTRAIT_SRC = "/media/isak.svg";

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
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgb(29_78_216_/_0.08),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgb(147_180_248_/_0.14),transparent_50%)]"
        />

        <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-20 lg:px-8 lg:pt-32 lg:pb-28">
          <Reveal className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <figure className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-mist shadow-lift">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PORTRAIT_SRC}
                  alt="Isak Forsberg"
                  width={800}
                  height={1000}
                  className="absolute inset-0 h-full w-full object-cover object-top"
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
                  Vill du se mer av vad jag byggt finns det på{" "}
                  <a
                    href={PORTFOLIO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand underline decoration-brand-glow decoration-2 underline-offset-4 transition-colors duration-200 hover:decoration-brand"
                  >
                    min portfolio
                  </a>
                  .
                </p>
              </div>

              <div className="mt-10">
                <p className="text-eyebrow font-medium text-muted uppercase">
                  Bygger med
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {STACK.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-pill border border-line bg-surface px-3 py-1.5 text-sm text-ink shadow-card"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/kontakt"
                  className="shine group inline-flex items-center gap-2.5 rounded-pill bg-brand px-6 py-3.5 font-medium whitespace-nowrap text-white shadow-brand transition-all duration-200 ease-out hover:bg-brand-dark hover:shadow-lift active:scale-[0.97]"
                >
                  Hör av dig
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
                <Link
                  href="/paket"
                  className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-6 py-3.5 font-medium text-ink shadow-card transition-all duration-200 ease-out hover:border-brand hover:text-brand"
                >
                  Se paket och priser
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
