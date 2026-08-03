import {
  fromPriceLabel,
  monthlyPriceLabel,
  perPagePriceLabel,
  PRICES,
} from "@/lib/pricing";

export type PackageId = "starter" | "business" | "premium" | "enterprise";

export type SitePackage = {
  id: PackageId;
  name: string;
  tagline: string;
  who: string;
  priceLabel: string;
  /** Numeriskt startpris för kalkylatorn. null = offert. */
  priceFrom: number | null;
  priceNote?: string;
  recommended?: boolean;
  pages: string;
  features: string[];
  extrasHint?: string;
};

export type AddonBilling = "once" | "monthly" | "perPage";

export type PackageAddon = {
  id: string;
  name: string;
  description: string;
  priceLabel: string;
  price: number;
  billing: AddonBilling;
};

export const packages: SitePackage[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "En skarp första sajt",
    who: "Enskilda näringsidkare och nystartade bolag som behöver synas professionellt — snabbt.",
    priceLabel: fromPriceLabel(PRICES.packages.starter),
    priceFrom: PRICES.packages.starter,
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
    priceLabel: fromPriceLabel(PRICES.packages.business),
    priceFrom: PRICES.packages.business,
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
    priceLabel: fromPriceLabel(PRICES.packages.premium),
    priceFrom: PRICES.packages.premium,
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
    priceFrom: null,
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
    priceLabel: perPagePriceLabel(PRICES.addons.extraPage),
    price: PRICES.addons.extraPage,
    billing: "perPage",
  },
  {
    id: "booking",
    name: "Bokningssystem",
    description: "Tider, bekräftelser och kalenderkoppling.",
    priceLabel: fromPriceLabel(PRICES.addons.booking),
    price: PRICES.addons.booking,
    billing: "once",
  },
  {
    id: "blog",
    name: "Blogg / nyheter",
    description: "CMS-baserad blogg för SEO och innehåll.",
    priceLabel: fromPriceLabel(PRICES.addons.blog),
    price: PRICES.addons.blog,
    billing: "once",
  },
  {
    id: "i18n",
    name: "Flerspråk",
    description: "Svenska + engelska (eller fler) med tydlig struktur.",
    priceLabel: fromPriceLabel(PRICES.addons.i18n),
    price: PRICES.addons.i18n,
    billing: "once",
  },
  {
    id: "chatbot",
    name: "AI-chattbot",
    description: "Svarar på vanliga frågor och leder till kontakt.",
    priceLabel: fromPriceLabel(PRICES.addons.chatbot),
    price: PRICES.addons.chatbot,
    billing: "once",
  },
  {
    id: "forms",
    name: "Avancerade formulär",
    description: "Flierstegsformulär, villkor och CRM-koppling.",
    priceLabel: fromPriceLabel(PRICES.addons.forms),
    price: PRICES.addons.forms,
    billing: "once",
  },
  {
    id: "logo",
    name: "Logotyp",
    description: "Enkel, modern wordmark eller symbol för webben.",
    priceLabel: fromPriceLabel(PRICES.addons.logo),
    price: PRICES.addons.logo,
    billing: "once",
  },
  {
    id: "gbp",
    name: "Google Business Profile",
    description: "Setup och optimering för lokal synlighet.",
    priceLabel: fromPriceLabel(PRICES.addons.gbp),
    price: PRICES.addons.gbp,
    billing: "once",
  },
  {
    id: "maintenance",
    name: "Underhållsplan",
    description: "Månadsvis uppdatering, backup och småfixar.",
    priceLabel: monthlyPriceLabel(PRICES.addons.maintenanceMonthly),
    price: PRICES.addons.maintenanceMonthly,
    billing: "monthly",
  },
];

export function getPackageById(id: PackageId): SitePackage | undefined {
  return packages.find((p) => p.id === id);
}
