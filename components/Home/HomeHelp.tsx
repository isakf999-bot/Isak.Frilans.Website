import Link from "next/link";
import { Reveal } from "@/components/Reveal/Reveal";
import { btn } from "@/components/ui/buttonStyles";
import { serviceNavGroups } from "@/lib/nav";

/**
 * "Vad jag hjälper till med" — inspirerad av Bravo Webbs "Vad vi hjälper till
 * med": intro + accent-border till vänster, tjänstelänklista till höger.
 * Ingen bild, ingen cardgrid — bara text, som en riktig byrå-sektion.
 */
export function HomeHelp() {
  return (
    <section
      id="vad-jag-hjalper-till-med"
      className="bg-white"
      aria-labelledby="hjalp-rubrik"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-16">
          <Reveal>
            <h2 id="hjalp-rubrik" className="text-h2">
              Vad jag hjälper till med
            </h2>
            <p className="mt-6 border-l-[3px] border-brand pl-5 text-lead text-muted">
              En hemsida ska göra ett jobb: få rätt person att höra av sig,
              boka eller köpa. Jag lyssnar först, föreslår en tydlig struktur
              och bygger den i kod ni äger — inte i ett byråsystem ni fastnar
              i.
            </p>
            <Link href="/kontakt" className={`${btn.secondary} mt-8`}>
              Berätta vad ni behöver
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <ul className="space-y-9 lg:mt-2">
              {serviceNavGroups.map((group) => (
                <li key={group.heading}>
                  <h3 className="text-eyebrow font-semibold tracking-[0.12em] text-ink/70 uppercase">
                    {group.heading}
                  </h3>
                  <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="group -mx-1 flex items-baseline gap-2 rounded-md px-1 py-1.5 text-[1.05rem] text-ink transition-colors hover:text-brand"
                        >
                          <span
                            aria-hidden="true"
                            className="text-brand transition-transform duration-150 group-hover:translate-x-0.5"
                          >
                            →
                          </span>
                          <span className="border-b border-transparent transition-colors group-hover:border-brand/40">
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
