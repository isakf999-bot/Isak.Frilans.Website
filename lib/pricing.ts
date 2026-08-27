/**
 * Gemensamma priser — enda källan för paket, tillägg och tjänster.
 * Ändra här, så /paket, /process och /tjanster håller sig synkade.
 */

export const PRICES = {
  packages: {
    /** Bas */
    starter: 3_795,
    starterHigh: 3_795,
    /** Premium (mest vald) */
    business: 5_995,
    businessHigh: 5_995,
    /** Full Service */
    premium: 10_995,
    premiumHigh: 10_995,
  },

  addons: {
    /** Per tillagd undersida utöver paketets omfång */
    extraPage: 295,
    booking: 1_200,
    blog: 800,
    i18n: 1_500,
    chatbot: 999,
    forms: 699,
    logo: 999,
    maintenanceMonthly: 499,
  },

  /** Fristående tjänster (visas på /process och /tjanster) */
  services: {
    /** Landning / företag — spann Bas–Full service */
    siteFrom: 3_795,
    siteTo: 10_995,
    /** Uppdatering & redesign */
    redesignFrom: 1_500,
    redesignTo: 6_000,
    designFrom: 1_500,
    designTo: 4_000,
    seoFrom: 999,
    seoTo: 3_000,
    performanceFrom: 999,
    performanceTo: 3_000,
    hostingFrom: 499,
    hostingTo: 1_500,
    /** Samma som tillägget Underhållsplan */
    maintenanceMonthly: 499,
    /** Golv = Avancerade formulär */
    apiFrom: 699,
    /** Golv = AI-chattbot */
    aiFrom: 999,
    /** Skräddarsydda system / Enterprise */
    customFrom: 8_000,
  },
} as const;

/** Svensk formatering: 2800 → "2 800" */
export function formatSek(amount: number): string {
  return amount.toLocaleString("sv-SE");
}

export function fromPriceLabel(amount: number): string {
  return `från ${formatSek(amount)} kr`;
}

/** Fast paketpris utan "från". */
export function fixedPriceLabel(amount: number): string {
  return `${formatSek(amount)} kr`;
}

export function rangePriceLabel(from: number, to: number): string {
  return `${formatSek(from)}–${formatSek(to)} kr`;
}

export function monthlyPriceLabel(amount: number): string {
  return `${formatSek(amount)} kr/mån`;
}

export function perPagePriceLabel(amount: number): string {
  return `${formatSek(amount)} kr/sida`;
}
