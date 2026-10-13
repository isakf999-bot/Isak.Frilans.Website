import Link from "next/link";
import { AppWindow, ArrowRight, PenTool, Search, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { btn } from "@/components/ui/buttonStyles";
import { serviceNavGroups } from "@/lib/nav";

/**
 * Ikon och en rad vardagssvenska per tjänstegrupp. Nyckeln är gruppens
 * rubrik i `lib/nav.ts`; en grupp utan träff här visas ändå, bara utan ikon
 * och förklaring.
 */
const GROUP_META: Record<string, { icon: LucideIcon; summary: string }> = {
  "Hemsida & webb": {
    icon: AppWindow,
    summary:
      "Själva sajten — från en enda kampanjsida till webbutik eller ett eget system, och skötseln efteråt.",
  },
  "Synlighet & teknik": {
    icon: Search,
    summary:
      "Det som gör att ni syns på Google, att sidan laddar snabbt och att den pratar med era andra system.",
  },
  Design: {
    icon: PenTool,
    summary:
      "Hur sajten ser ut och känns — färger, typsnitt och layout som passar just ert företag.",
  },
};

/**
 * "Vad jag hjälper till med" — tjänsterna som tre tydliga kategorier, en rad
 * per kategori med hård linje ovanför: vad kategorin är till vänster, dess
 * tjänster som länklista till höger. Inga kort; alla tolv tjänster är länkar.
 */
export function HomeHelp() {
  return (
    <section
      id="vad-jag-hjalper-till-med"
      className="bg-surface"
      aria-labelledby="hjalp-rubrik"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
          <div>
            <SectionLabel>Tjänster</SectionLabel>
            <h2 id="hjalp-rubrik" className="mt-4 text-h2">
              Vad jag hjälper till med
            </h2>
          </div>
          <div>
            <p className="text-lead text-pretty text-muted lg:mt-9">
              En hemsida ska göra ett jobb: få rätt person att höra av sig,
              boka eller köpa. Jag lyssnar först, föreslår en tydlig struktur
              och bygger den i kod ni äger — inte i ett byråsystem ni fastnar
              i.
            </p>
            <Link href="/kontakt" className={`group ${btn.secondary} mt-7`}>
              Berätta vad ni behöver
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 lg:mt-20">
          {serviceNavGroups.map((group) => {
            const meta = GROUP_META[group.heading];
            const Icon = meta?.icon;
            return (
              <Reveal
                key={group.heading}
                className="grid gap-x-14 gap-y-6 border-t border-ink py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:py-12"
              >
                <div className="max-w-md">
                  <h3 className="flex items-center gap-3 text-h3">
                    {Icon ? (
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5 shrink-0 text-brand"
                      />
                    ) : null}
                    {group.heading}
                  </h3>
                  {meta ? (
                    <p className="mt-3 text-muted">{meta.summary}</p>
                  ) : null}
                </div>

                <ul className="grid content-start gap-x-8 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between gap-3 border-b border-line py-3 font-medium text-ink transition-[border-color,color] duration-150 ease-out hover:border-brand hover:text-brand active:text-brand-dark"
                      >
                        <span className="min-w-0 break-words hyphens-auto">
                          {item.label}
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 -translate-x-1 text-brand opacity-0 transition-[opacity,transform] duration-150 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
