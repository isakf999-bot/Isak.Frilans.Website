/**
 * Datamodellen för tjänsterna.
 *
 * De valfria fälten (image, price, caseStudy) är avsiktligt definierade redan nu
 * men lämnade tomma. Nästa steg — att lägga till en skärmdump, ett prispaket
 * eller ett kundcase per tjänst — är då bara att fylla i data här, utan att röra
 * layouten i Services-komponenten.
 */
export type Service = {
  slug: string;
  title: string;
  description: string;
  /** Vad kunden faktiskt får. Visas som en rad taggar under beskrivningen. */
  deliverables: string[];
  image?: { src: string; alt: string };
  price?: { from: number; currency: "SEK"; note?: string };
  caseStudy?: { label: string; href: string };
};

export const services: Service[] = [
  {
    slug: "landningssidor",
    title: "Landningssidor",
    description:
      "En sida med ett enda jobb: få besökaren att höra av sig, boka eller köpa. Snabb, mätbar och byggd runt din faktiska målgrupp — inte runt en mall.",
    deliverables: ["Copy-struktur", "Formulär & spårning", "Publicering"],
  },
  {
    slug: "e-handel",
    title: "E-handel",
    description:
      "Webbutiker där produkten står i centrum och köpflödet inte tappar folk på vägen. Betalning, frakt och lager kopplat till det du redan använder.",
    deliverables: ["Produktvyer", "Kassaflöde", "Betalning & frakt"],
  },
  {
    slug: "foretagssajter",
    title: "Företagssajter",
    description:
      "Sajten som gör att någon vågar anlita er. Tydligt om vad ni gör, vilka ni är och hur man får tag på er — utan floskler och utan stockfoton.",
    deliverables: ["Struktur & innehåll", "Kontaktvägar", "Sökbarhet"],
  },
  {
    slug: "redesign",
    title: "Uppdatering & redesign",
    description:
      "Har ni redan en sajt som känns långsam, trasig i mobilen eller helt enkelt gammal? Jag går igenom den och bygger om det som faktiskt sitter i vägen.",
    deliverables: ["Genomgång", "Mobilanpassning", "Prestanda"],
  },
];
