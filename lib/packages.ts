import {
  fixedPriceLabel,
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
  /** Sidor som ingår i paketet. null = obegränsat. */
  includedPages: number | null;
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
    name: "Bas",
    tagline: "Perfekt för att komma igång snabbt",
    who: "Enskilda näringsidkare och nystartade bolag som behöver synas professionellt — snabbt.",
    priceLabel: fixedPriceLabel(PRICES.packages.starter),
    priceFrom: PRICES.packages.starter,
    pages: "Upp till 5 sidor",
    includedPages: 5,
    features: [
      "Responsiv hemsida",
      "Upp till 5 sidor",
      "Kontaktformulär",
      "Mobiloptimerad",
      "Grundläggande SEO",
      "14 dagars support efter lansering",
    ],
  },
  {
    id: "business",
    name: "Premium",
    tagline: "Det mest populära alternativet",
    who: "Småföretag som vill konvertera besökare till leads och kunder.",
    priceLabel: fixedPriceLabel(PRICES.packages.business),
    priceFrom: PRICES.packages.business,
    recommended: true,
    pages: "Upp till 15 sidor",
    includedPages: 15,
    features: [
      "Allt från Bas",
      "Upp till 15 sidor",
      "Admin-panel för innehåll",
      "SEO-optimerad",
      "Animationer & mikrointeraktioner",
      "1 månads support",
    ],
  },
  {
    id: "premium",
    name: "Full Service",
    tagline: "Komplett lösning med allt inkluderat",
    who: "Varumärken som vill ha mer: e-handel, fler sidor och längre support.",
    priceLabel: fixedPriceLabel(PRICES.packages.premium),
    priceFrom: PRICES.packages.premium,
    pages: "Obegränsat antal sidor",
    includedPages: null,
    features: [
      "Allt från Premium",
      "Obegränsat antal sidor",
      "E-handel via Stripe",
      "Avancerad admin-panel",
      "API-kopplingar vid behov",
      "3 månaders support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "System, skalbarhet, partnerskap",
    who: "Bolag som behöver mer än en marknadswebb — portaler, integrationer eller löpande utveckling.",
    priceLabel: "Offert",
    priceFrom: null,
    priceNote: "Vi tar fram scope och tidplan tillsammans.",
    pages: "Efter behov",
    includedPages: null,
    features: [
      "Allt från Full Service",
      "Skräddarsydda system / portaler",
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
    description: "Flerstegsformulär, villkor och CRM-koppling.",
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
