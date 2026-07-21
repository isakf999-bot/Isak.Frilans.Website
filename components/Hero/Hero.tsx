import Link from "next/link";
import { HeroCarousel } from "./HeroCarousel";

const PROOF = [
  { value: "1–3 v", label: "Från start till live" },
  { value: "100%", label: "Du pratar med mig" },
  { value: "Fast pris", label: "Innan vi börjar" },
];

/** TODO: byt till din riktiga Trustpilot-profil (t.ex.
 *  https://se.trustpilot.com/review/isakweb.se). */
const TRUSTPILOT_URL = "https://se.trustpilot.com/review/isakweb.se";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Aurora — det lugna, drivande centrumelementet bakom hero:n. Tre mjuka
          färgfält som rör sig sakta. Ren atmosfär, aldrig i vägen för innehåll. */}
      <div className="aurora" aria-hidden="true">
        <span className="aurora__blob aurora__blob--1" />
        <span className="aurora__blob aurora__blob--2" />
        <span className="aurora__blob aurora__blob--3" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
        {/* Textkolumnen får lite mer bredd än bildspelet — annars ryms inte
            proof-raden (tre siffror + Trustpilot) på en rad. */}
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="rise inline-flex items-center gap-2 rounded-pill border border-brand-glow bg-brand-tint px-3.5 py-1.5 text-eyebrow font-medium text-brand uppercase">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-brand"
              />
              Frilansande webbutvecklare
            </p>

            <h1 className="rise rise-2 mt-6 text-h1 lg:text-display">
              Hemsidor som gör{" "}
              <em className="shimmer not-italic">mer</em> än att se bra ut.
            </h1>

            <p className="rise rise-3 mt-6 max-w-lg text-lead text-muted">
              Jag heter Isak och bygger landningssidor, e-handel och
              företagssajter åt små företag. Du pratar med den som faktiskt
              bygger sajten inte en säljare, inte en projektledare.
            </p>

            <div className="rise rise-3 mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/kontakt"
                className="shine group inline-flex items-center gap-2.5 rounded-pill bg-brand px-7 py-4 font-medium text-white shadow-brand transition-all duration-200 ease-out hover:bg-brand-dark hover:shadow-lift active:scale-[0.97]"
              >
                Boka ett samtal
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href="/tjanster"
                className="group inline-flex items-center gap-2.5 rounded-pill border border-line bg-surface px-7 py-4 font-medium text-ink shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand hover:bg-brand-tint hover:text-brand hover:shadow-lift active:translate-y-0"
              >
                Se vad jag bygger
                <span
                  aria-hidden="true"
                  className="text-muted transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-brand"
                >
                  →
                </span>
              </Link>
            </div>

            {/* Proof-raden. Trustpilot ligger som en fjärde cell längst till
                höger, med samma avdelarlinje som siffrorna — flex-wrap ser till
                att den lägger sig under i stället för att spränga raden när
                utrymmet tryter. */}
            <div className="rise rise-4 mt-12 flex max-w-xl flex-wrap items-start gap-y-6 border-t border-line pt-8">
              {/* min-w tvingar Trustpilot att wrappa under på små skärmar i
                  stället för att klämma ihop siffrorna till oläsbarhet. */}
              <dl className="grid min-w-[300px] flex-1 grid-cols-3">
                {PROOF.map((item, i) => (
                  <div
                    key={item.label}
                    className={i > 0 ? "border-l border-line pl-3" : "pr-3"}
                  >
                    {/* leading-9 låser radboxen till 2.25rem. Utan den blir
                        höjden fontstorlek × 1.333, vilket ändras vid sm och
                        gör att Trustpilot-cellen bredvid hamnar i otakt. */}
                    <dt className="text-2xl leading-9 font-semibold tracking-tight text-ink sm:text-[1.75rem]">
                      {item.value}
                    </dt>
                    <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm">
                      {item.label}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Ingen siffra/betyg visas: profilen är helt ny, och påhittad
                  social proof är värre än ingen alls. */}
              <a
                href={TRUSTPILOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group shrink-0 border-l border-line pl-3"
              >
                {/* h-9 matchar dt:s låsta radhöjd (leading-9), så "Läs omdömen"
                    hamnar i linje med "Innan vi börjar". */}
                <span className="flex h-9 items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[5px] bg-[#00B67A]"
                  >
                    <svg viewBox="0 0 24 24" fill="#fff" className="h-4 w-4">
                      <path d="M12 2.6l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.62 6.12 20.7l1.12-6.55L2.48 9.5l6.58-.95z" />
                    </svg>
                  </span>
                  <span className="text-lg font-semibold tracking-tight text-ink transition-colors duration-200 ease-out group-hover:text-brand">
                    Trustpilot
                  </span>
                </span>
                <span className="mt-1 flex items-center gap-1 text-xs leading-snug text-muted transition-colors duration-200 ease-out group-hover:text-brand sm:text-sm">
                  Läs omdömen
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="rise rise-3 relative">
            {/* Bildspel av riktiga, live-satta projekt — byter var 3:e sekund
                och går att klicka sig igenom. Ersätter porträttet: det säger
                mer om vad jag bygger, och går att verifiera på riktigt. */}
            <HeroCarousel />

            {/* Litet flytande kort — ger djup och säger något konkret. */}
            <div className="absolute -top-5 -left-5 z-30 hidden items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3 shadow-lift sm:flex">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-emerald-500"
              />
              <span className="text-sm font-medium">
                Tar emot projekt just nu
              </span>
            </div>
          </div>
        </div>

        {/* Scroll-hint: säger att sidan fortsätter, och tar dig dit vid klick.
            Vanlig ankarlänk — scroll-behavior: smooth sköter resan. */}
        <div className="rise rise-4 mt-10 flex justify-center lg:mt-12">
          <a
            href="#om-mig"
            className="group inline-flex flex-col items-center gap-2.5 text-muted transition-colors duration-200 ease-out hover:text-brand"
          >
            <span className="text-eyebrow font-medium uppercase">
              Mer om mig nedan
            </span>
            <span
              aria-hidden="true"
              className="scroll-hint flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-card transition-all duration-200 ease-out group-hover:border-brand group-hover:bg-brand group-hover:text-white group-hover:shadow-lift"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
