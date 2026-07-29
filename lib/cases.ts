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
  /** Bakgrundsfärg bakom webbläsarramen (Generation-stil) */
  accentColor?: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "mats-svensson",
    // Dolt tills projektet är klart. All data nedan är orörd — sätt tillbaka
    // till true så syns caset igen i listan och på sin detaljsida.
    published: false,
    domain: "mats-svensson.se",
    client: "Mats Svensson",
    industry: "Finans & sparande",
    teaser:
      "En befintlig sajt moderniserades från grunden — tydligare, snyggare och mer förtroendeingivande.",
    intro:
      "Mats Svensson hade redan en webbplats för sin fondbytesinformationstjänst. Den fungerade, men behövde ett lyft. Uppdraget var att modernisera den: ge tjänsten ett uttryck som matchar förtroendet Mats byggt upp, och göra det enklare att förstå erbjudandet och ta nästa steg.",
    liveUrl: "https://mats-ppm.vercel.app/",
    services: [
      "Webbdesign",
      "UX/UI",
      "Frontend-utveckling",
      "Omdesign",
      "Konvertering",
    ],
    launched: "2026",
    platform: "Next.js",
    challenge:
      "Den gamla sajten bar innehållet men saknade modern känsla, tydlig hierarki och en övertygande väg till abonnemang. Mats ville behålla kärnan i erbjudandet — PPM, ISK och community — men få en webbplats som ser professionell ut, känns premium och konverterar bättre.",
    outcome:
      "En helt omgjord startsida med mörk premiumkänsla, stark personlig närvaro och tydlig paketering av erbjudandena. Besökaren förstår snabbt vad tjänsten är, vad den kostar och hur man kommer igång — utan att något känns malligt eller generiskt.",
    work: [
      {
        title: "Omdesign & uttryck",
        body: "Vi bytte ut det gamla uttrycket mot en modern, mörk design med skarp typografi och en varm accentfärg. Porträttet av Mats får stå i centrum, så att besökaren direkt känner personen bakom tjänsten.",
      },
      {
        title: "Struktur & budskap",
        body: "Innehållet från den gamla sajten omskrevs och prioriterades: vad tjänsten är, vad som ingår, vad det kostar och hur man abonnerar. Mindre brus, tydligare nästa steg.",
      },
      {
        title: "Teknik & leverans",
        body: "Ombyggd som en snabb, modern sajt med fokus på mobilupplevelse, tydlig hierarki och enkel vidareutveckling när erbjudandet växer.",
      },
    ],
    results: [
      { value: "Ny", label: "modern design från grunden" },
      { value: "100%", label: "mobilanpassad" },
      { value: "Tydlig", label: "väg till abonnemang" },
    ],
    heroImage: "/case/mats/hero.png",
    heroAlt:
      "Moderniserad startsida för Mats Svensson — fondbytesinformation för PPM och ISK",
    accentColor: "#1C1917",
  },
  {
    slug: "jopas-honung",
    // Dolt tills projektet är klart. All data nedan är orörd — sätt tillbaka
    // till true så syns caset igen i listan och på sin detaljsida.
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
    platform: "Next.js",
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
      { value: "Snabb", label: "laddningstid" },
    ],
    heroImage: "/case/jopas/hero.png",
    heroAlt: "Startsida för Jopas Honung — småskalig svensk honung från Söderåsen",
    accentColor: "#F3E6C8",
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
