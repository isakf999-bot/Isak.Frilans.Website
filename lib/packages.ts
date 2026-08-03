export type PackageId = "starter" | "business" | "premium" | "enterprise";

export type SitePackage = {
  id: PackageId;
  name: string;
  tagline: string;
  who: string;
  priceLabel: string;
  priceNote?: string;
  recommended?: boolean;
  pages: string;
  features: string[];
  extrasHint?: string;
};

export type PackageAddon = {
  id: string;
  name: string;
  description: string;
  priceLabel: string;
};

export const packages: SitePackage[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "En skarp första sajt",
    who: "Enskilda näringsidkare och nystartade bolag som behöver synas professionellt — snabbt.",
    priceLabel: "från 5 999 kr",
    pages: "1–3 sidor",
    features: [
      "Responsiv design",
      "Kontaktformulär",
      "Grundläggande SEO",
      "Prestandaoptimering",
      "Analytics-setup",
      "14 dagars support efter lansering",
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "Sajten som säljer åt dig",
    who: "Småföretag som vill konvertera besökare till leads och kunder.",
    priceLabel: "från 9 599 kr",
    recommended: true,
    pages: "4–8 sidor",
    features: [
      "Allt i Starter",
      "Utökad innehållsstruktur",
      "Animationer & mikrointeraktioner",
      "CMS-alternativ (vid behov)",
      "Hosting-rådgivning",
      "Konverteringsfokuserade sektioner",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Byråkänsla, frilanspris",
    who: "Varumärken som vill sticka ut med skräddarsydd design och mer avancerad teknik.",
    priceLabel: "från 14 999 kr",
    pages: "8–15 sidor",
    features: [
      "Allt i Business",
      "Skräddarsydd visuell identitet på webben",
      "Avancerade animationer",
      "API-kopplingar",
      "A/B-vänlig struktur",
      "Prioriterad support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "System, skalbarhet, partnerskap",
    who: "Bolag som behöver mer än en marknadswebb — e-handel, portaler eller integrationer.",
    priceLabel: "Offert",
    priceNote: "Vi tar fram scope och tidplan tillsammans.",
    pages: "Efter behov",
    features: [
      "Allt i Premium",
      "E-handel / medlemsytor",
      "AI-integrationer",
      "Drift & underhållsplan",
      "SLA efter överenskommelse",
      "Löpande vidareutveckling",
    ],
  },
];

export const packageAddons: PackageAddon[] = [
  {
    id: "extra-pages",
    name: "Extra sidor",
    description: "Ytterligare undersidor utöver paketets omfång.",
    priceLabel: "från 1 200 kr/sida",
  },
  {
    id: "booking",
    name: "Bokningssystem",
    description: "Tider, bekräftelser och kalenderkoppling.",
    priceLabel: "från 2 500 kr",
  },
  {
    id: "blog",
    name: "Blogg / nyheter",
    description: "CMS-baserad blogg för SEO och innehåll.",
    priceLabel: "från 2 000 kr",
  },
  {
    id: "i18n",
    name: "Flerspråk",
    description: "Svenska + engelska (eller fler) med tydlig struktur.",
    priceLabel: "från 3 500 kr",
  },
  {
    id: "chatbot",
    name: "AI-chattbot",
    description: "Svarar på vanliga frågor och leder till kontakt.",
    priceLabel: "från 2 800 kr",
  },
  {
    id: "forms",
    name: "Avancerade formulär",
    description: "Flierstegsformulär, villkor och CRM-koppling.",
    priceLabel: "från 1 800 kr",
  },
  {
    id: "logo",
    name: "Logotyp",
    description: "Enkel, modern wordmark eller symbol för webben.",
    priceLabel: "från 2 200 kr",
  },
  {
    id: "gbp",
    name: "Google Business Profile",
    description: "Setup och optimering för lokal synlighet.",
    priceLabel: "från 1 500 kr",
  },
  {
    id: "maintenance",
    name: "Underhållsplan",
    description: "Månadsvis uppdatering, backup och småfixar.",
    priceLabel: "999 kr/mån",
  },
];
