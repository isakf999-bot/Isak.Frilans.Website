/**
 * Tjänster — listkort + detaljsidor under /tjanster/[slug].
 *
 * Priser kommer från lib/pricing.ts så de stämmer med paket och tillägg.
 */

import {
  fromPriceLabel,
  monthlyPriceLabel,
  PRICES,
} from "@/lib/pricing";

export type Service = {
  slug: string;
  title: string;
  /** Kort text på kortet */
  description: string;
  /** Längre intro på detaljsidan */
  intro: string;
  /** Vad kunden faktiskt får. Visas som taggar. */
  deliverables: string[];
  /** Fördelar / varför det spelar roll */
  benefits: string[];
  /** Vem tjänsten passar */
  who: string;
  /** Ungefärlig tidslinje */
  timeline: string;
  price?: {
    from: number;
    to?: number;
    currency: "SEK";
    open?: boolean;
    note?: string;
    label?: string;
  };
  caseStudy?: { label: string; href: string };
};

/** Samma prisintervall som Starter–Premium. */
export const SITE_PRICE = {
  from: PRICES.services.siteFrom,
  to: PRICES.services.siteTo,
  currency: "SEK" as const,
  note: `Tillägg: ${monthlyPriceLabel(PRICES.addons.maintenanceMonthly)} för månadsvis uppdatering · 3 månaders bindningstid`,
};

export const services: Service[] = [
  {
    slug: "landningssidor",
    title: "Landningssidor",
    description:
      "En sida med ett enda jobb: få besökaren att höra av sig, boka eller köpa. Snabb, mätbar och byggd runt din faktiska målgrupp.",
    intro:
      "En landningssida ska inte berätta allt om företaget — den ska få rätt person att ta nästa steg. Jag bygger sidor med tydlig hierarki, skarp copy-struktur och formulär som faktiskt går att mäta.",
    deliverables: ["Copy-struktur", "Formulär & spårning", "Publicering"],
    benefits: [
      "Tydligt erbjudande ovanför vecket",
      "En primär CTA — inte tio konkurrerande",
      "Snabb laddning på mobil",
      "Grundläggande SEO och analytics",
    ],
    who: "Företag som kör kampanjer, vill samla leads eller lansera ett erbjudande snabbt.",
    timeline: "Oftast 3–7 arbetsdagar när innehållet är på plats.",
    price: SITE_PRICE,
  },
  {
    slug: "foretagssajter",
    title: "Företagssajter",
    description:
      "Sajten som gör att någon vågar anlita er. Tydligt om vad ni gör, vilka ni är och hur man får tag på er.",
    intro:
      "En företagssajt ska bygga förtroende. Jag strukturerar innehåll så besökaren förstår erbjudandet, ser bevis och hittar kontaktvägen — utan floskler och utan stockfoton.",
    deliverables: ["Struktur & innehåll", "Kontaktvägar", "Sökbarhet"],
    benefits: [
      "Tydlig informationsarkitektur",
      "Sidor som speglar ert erbjudande",
      "Responsiv, modern design",
      "Redo att växa med fler sidor",
    ],
    who: "Små och medelstora bolag som behöver en seriös webb närvaro.",
    timeline: "Oftast 1–3 veckor beroende på omfång.",
    price: SITE_PRICE,
  },
  {
    slug: "e-handel",
    title: "E-handel",
    description:
      "Webbutiker där produkten står i centrum och köpflödet inte tappar folk på vägen.",
    intro:
      "E-handel handlar om förtroende i varje steg: produkt, varukorg, kassa. Jag bygger butiker med tydliga produktvyer och ett flöde som är enkelt att förstå — kopplat till betalning och frakt ni redan använder.",
    deliverables: ["Produktvyer", "Kassaflöde", "Betalning & frakt"],
    benefits: [
      "Produktfokus utan onödigt brus",
      "Mobilvänligt köpflöde",
      "Integrationer mot betalning/frakt",
      "Underlag för vidare tillväxt",
    ],
    who: "Varumärken som säljer produkter online och vill ha en butik som känns premium.",
    timeline: "Oftast 2–5 veckor beroende på katalog och integrationer.",
    price: { ...SITE_PRICE, open: true, note: "Pris efter scope — offert efter genomgång." },
  },
  {
    slug: "webbdesign",
    title: "Webbdesign",
    description:
      "Visuell identitet på webben: typografi, färg, layout och komponenter som känns som ert varumärke.",
    intro:
      "Design är inte dekoration — det är hur besökaren förstår er. Jag tar fram ett uttryck som är modernt, skandinaviskt och konsekvent genom hela sajten, med fokus på läsbarhet och konvertering.",
    deliverables: ["Designsystem", "Komponenter", "Responsiva layouts"],
    benefits: [
      "Unikt uttryck — ingen mallkänsla",
      "Tydlig typografisk hierarki",
      "Blå/vit premiumkänsla eller ert egna varumärke",
      "Design som går att bygga vidare på",
    ],
    who: "Bolag som vill lyfta känslan innan eller tillsammans med utveckling.",
    timeline: "Oftast 3–10 arbetsdagar för ett designpass.",
    price: {
      from: PRICES.services.designFrom,
      to: PRICES.services.designTo,
      currency: "SEK",
    },
  },
  {
    slug: "redesign",
    title: "Uppdatering & redesign",
    description:
      "Har ni redan en sajt som känns långsam, trasig i mobilen eller gammal? Jag bygger om det som sitter i vägen.",
    intro:
      "Ni behöver inte alltid börja om från noll — men ofta behöver ni det som känns som ett lyft. Jag går igenom befintlig sajt, prioriterar vad som faktiskt skaver och levererar en modern, snabb version.",
    deliverables: ["Genomgång", "Mobilanpassning", "Prestanda"],
    benefits: [
      "Behåll det som fungerar",
      "Byt ut det som skadar förtroendet",
      "Bättre Core Web Vitals",
      "Tydligare väg till kontakt/köp",
    ],
    who: "Företag med en befintlig sajt som inte längre matchar verksamheten.",
    timeline: "Oftast 1–3 veckor.",
    price: {
      from: PRICES.services.redesignFrom,
      to: PRICES.services.redesignTo,
      currency: "SEK",
    },
  },
  {
    slug: "seo",
    title: "SEO",
    description:
      "Teknisk och innehållsmässig SEO så rätt personer hittar er — utan tomma löften om 'plats 1'.",
    intro:
      "SEO börjar i hur sajten är byggd: struktur, rubriker, hastighet, metadata och intern länkning. Jag sätter en grund som Google förstår och som ni kan bygga innehåll på över tid.",
    deliverables: ["Teknisk SEO", "Metadata", "Innehållsstruktur"],
    benefits: [
      "Indexerbara, rena sidor",
      "Tydliga titles och descriptions",
      "Sitemap & robots på plats",
      "Råd kring innehåll som faktiskt rankar",
    ],
    who: "Bolag som vill synas lokalt eller inom sin nisch utan att köpa en 'SEO-byrå'-överdrift.",
    timeline: "Grundsetup 2–5 dagar; löpande innehåll efter behov.",
    price: {
      from: PRICES.services.seoFrom,
      to: PRICES.services.seoTo,
      currency: "SEK",
      note: "Löpande paket enligt överenskommelse.",
    },
  },
  {
    slug: "prestanda",
    title: "Prestanda & optimering",
    description:
      "Snabbare sidladdning, bättre Lighthouse-poäng och en sajt som känns premium på mobil.",
    intro:
      "Långsamma sajter tappar både Google och kunder. Jag profilerar, komprimerar, lazy-loadar och städar bort det som tynger — med fokus på det som faktiskt påverkar upplevelsen.",
    deliverables: ["Lighthouse-genomgång", "Bild/asset-optimering", "Kodtrim"],
    benefits: [
      "Snabbare LCP och interaktion",
      "Lättare sidor på mobilnät",
      "Mindre bounce från långsam start",
      "Rapport med före/efter",
    ],
    who: "Sajter som redan finns men känns tröga eller får dåliga scores.",
    timeline: "Oftast 2–7 arbetsdagar.",
    price: {
      from: PRICES.services.performanceFrom,
      to: PRICES.services.performanceTo,
      currency: "SEK",
    },
  },
  {
    slug: "hosting",
    title: "Hosting & lansering",
    description:
      "Domän, DNS, SSL och publicering — utan att ni drunknar i tekniska detaljer.",
    intro:
      "Jag hjälper er från färdig kod till live: rätt host (t.ex. Vercel), DNS-pekning, HTTPS och en stabil publicering. Ni får en kort genomgång så ni vet hur uppdateringar går till.",
    deliverables: ["Hosting-setup", "DNS & SSL", "Publicering"],
    benefits: [
      "Sajten är live med HTTPS",
      "Tydlig ägarskap av konton",
      "Backup- och uppdateringsråd",
      "Ingen inlåsning hos mig",
    ],
    who: "Bolag som vill att någon tar hand om det sista tekniska steget.",
    timeline: "Oftast 1–3 dagar när sajten är klar.",
    price: {
      from: PRICES.services.hostingFrom,
      to: PRICES.services.hostingTo,
      currency: "SEK",
      note: "Hostingavgift till leverantör tillkommer.",
    },
  },
  {
    slug: "underhall",
    title: "Underhåll",
    description:
      "Månadsvis uppdatering, småfixar och trygghet efter lansering — utan att anställa en utvecklare.",
    intro:
      "En sajt behöver omsorg. Med underhållsplanen tar jag hand om uppdateringar, små text/bild-ändringar och håller koll så inget ruttnar — till ett fast månadspris.",
    deliverables: ["Månadsvisa uppdateringar", "Småfixar", "Övervakning"],
    benefits: [
      "Fast kostnad, tydligt scope",
      "Snabbare svar när något strular",
      "Innehållshållning utan stresstoppar",
      "3 månaders bindningstid",
    ],
    who: "Företag som vill att sajten ska fortsätta kännas aktuell.",
    timeline: "Löpande, månadsvis.",
    price: {
      from: PRICES.services.maintenanceMonthly,
      currency: "SEK",
      label: monthlyPriceLabel(PRICES.services.maintenanceMonthly),
      note: "3 månaders bindningstid.",
    },
  },
  {
    slug: "api-integrationer",
    title: "API-integrationer",
    description:
      "Koppla sajten till CRM, bokning, betalsystem eller andra verktyg ni redan använder.",
    intro:
      "Integrationer sparar tid när de görs rätt. Jag kopplar er webb till externa API:er — formulär till CRM, bokning till kalender, produkter till lager — med felhantering och tydlig dokumentation.",
    deliverables: ["API-koppling", "Felhantering", "Dokumentation"],
    benefits: [
      "Mindre manuellt arbete",
      "Data på rätt ställe",
      "Stabila flöden istället för zapier-spaghetti",
      "Enklare att bygga vidare",
    ],
    who: "Bolag som växer ur manuella processer och behöver system som pratar med varandra.",
    timeline: "Oftast 3–14 dagar beroende på API och komplexitet.",
    price: {
      from: PRICES.services.apiFrom,
      currency: "SEK",
      open: true,
      note: `T.ex. formulär ${fromPriceLabel(PRICES.addons.forms)}, bokning ${fromPriceLabel(PRICES.addons.booking)}.`,
    },
  },
  {
    slug: "ai-integrationer",
    title: "AI-integrationer",
    description:
      "Praktisk AI på sajten — chattbot, innehållsstöd eller automatisering som sparar tid på riktigt.",
    intro:
      "AI ska lösa ett konkret jobb, inte vara en gimmick. Jag bygger avgränsade lösningar: FAQ-bot, leadkvalificering eller interna hjälpverktyg — med tydliga gränser och er ton of voice.",
    deliverables: ["Use-case & scope", "Implementation", "Uppföljning"],
    benefits: [
      "Svarar på vanliga frågor dygnet runt",
      "Fångar leads när ni sover",
      "Kontroll över vad AI får säga",
      "Mätbart värde, inte hype",
    ],
    who: "Företag med återkommande frågor eller processer som kan automatiseras försiktigt.",
    timeline: "Oftast 1–3 veckor för en första version.",
    price: {
      from: PRICES.services.aiFrom,
      currency: "SEK",
      open: true,
      note: `AI-chattbot ${fromPriceLabel(PRICES.addons.chatbot)} — större lösningar enligt offert.`,
    },
  },
  {
    slug: "skradarsydda-system",
    title: "Skräddarsydda system",
    description:
      "Portaler, dashboards och interna verktyg när WordPress-mallar inte räcker.",
    intro:
      "Ibland behövs mer än en marknadswebb: inloggade ytor, adminpaneler eller flöden unika för er verksamhet. Jag bygger med React/Next.js och TypeScript — skalbart och underhållbart.",
    deliverables: ["Krav & scope", "Utveckling", "Överlämning"],
    benefits: [
      "Lösning anpassad efter er process",
      "Modern, snabb stack",
      "Ni äger koden",
      "Möjlighet till löpande vidareutveckling",
    ],
    who: "Bolag med behov som inte ryms i färdiga plattformar.",
    timeline: "Efter scope — milstolpar och demos längs vägen.",
    price: {
      from: PRICES.services.customFrom,
      currency: "SEK",
      open: true,
      label: "Offert",
      note: "Pris efter discovery.",
    },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function formatServicePrice(service: Service): string {
  const p = service.price;
  if (!p) return "Pris enligt offert";
  if (p.label) return p.label;
  if (p.open && p.to == null) {
    return `från ${p.from.toLocaleString("sv-SE")} kr`;
  }
  if (p.to != null) {
    return `${p.from.toLocaleString("sv-SE")}–${p.to.toLocaleString("sv-SE")} kr${p.open ? "+" : ""}`;
  }
  return `från ${p.from.toLocaleString("sv-SE")} kr`;
}
