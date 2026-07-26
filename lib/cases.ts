/**
 * Kundcase-data — Generation-liknande list- och detaljvy.
 *
 * Lägg till nya case som objekt i `cases`. Listan på /case och detaljsidan
 * /case/[slug] läser automatiskt från den här filen.
 *
 * Synlighet: sätt `published: false` för att gömma ett case utan att radera
 * något. Sätt tillbaka till `true` när det ska synas igen.
 */

export type CaseResult = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  /** false = dolt från listan och detaljsidan, men all data finns kvar */
  published: boolean;
  /** Visningsnamn i stil med Generation: "jopashonung.se" */
  domain: string;
  client: string;
  industry: string;
  /** Kort ingress på kortet i listan */
  teaser: string;
  /** Längre intro på detaljsidan */
  intro: string;
  liveUrl: string;
  services: string[];
  launched: string;
  platform: string;
  challenge: string;
  outcome: string;
  work: { title: string; body: string }[];
  results: CaseResult[];
  quote?: { text: string; author: string; role?: string };
  /** Hero-bild för listkort + detaljsida */
  heroImage: string;
  heroAlt: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "jopas-honung",
    // Byt till true när Jopas ska synas på /case igen.
    published: false,
    domain: "jopashonung.se",
    client: "Jopas Bisyssla",
    industry: "Livsmedel & lokal produktion",
    teaser:
      "Småskalig svensk honung från Söderåsen — en sajt som känns lika handgjord som produkten.",
    intro:
      "Jopas Honung är en småskalig biodling på Söderåsens sluttningar mot Hallandsåsen. De behövde en webbplats som speglar hantverket: lokal, varm och tydlig — utan att kännas som en generisk mall.",
    liveUrl: "https://jopas-bisyssla.vercel.app/",
    services: ["Webbdesign", "UX/UI", "Frontend-utveckling", "Landningssida"],
    launched: "2026",
    platform: "Next.js · Vercel",
    challenge:
      "En lokal biodling utan tydlig digital närvaro behövde en sajt som både berättar historien bakom honungen och gör det enkelt att förstå erbjudandet. Tonen skulle kännas äkta och hantverksmässig — inte corporate, inte mallig.",
    outcome:
      "En modern landningssida med starkt visuellt fokus, tydlig hierarki och en varm känsla som matchar produkten. Sajten laddar snabbt, fungerar lika bra i mobilen och gör det enkelt att gå vidare till kontakt eller köp.",
    work: [
      {
        title: "Design & uttryck",
        body: "Färg, typografi och layout byggdes kring honungens varma toner och känslan av småskaligt hantverk — så att besökaren direkt förstår vad Jopas står för.",
      },
      {
        title: "Struktur & budskap",
        body: "Innehållet prioriterades: vem de är, varifrån honungen kommer, och hur man tar nästa steg. Inga onödiga sektioner — bara det som säljer förtroende.",
      },
      {
        title: "Teknik & leverans",
        body: "Byggd som en snabb, modern sajt med fokus på mobilupplevelse, SEO-grunder och enkel vidareutveckling när sortimentet växer.",
      },
    ],
    results: [
      { value: "1", label: "tydlig digital butiksyta" },
      { value: "100%", label: "mobilanpassad" },
      { value: "Snabb", label: "laddning på Vercel" },
    ],
    heroImage: "/case/jopas/hero.png",
    heroAlt: "Startsida för Jopas Honung — småskalig svensk honung från Söderåsen",
  },
];

/** Endast publicerade case — det som syns på sajten. */
export const publishedCases = cases.filter((c) => c.published);

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return publishedCases.find((c) => c.slug === slug);
}

export const industries = [
  "Alla branscher",
  ...Array.from(new Set(publishedCases.map((c) => c.industry))),
];
