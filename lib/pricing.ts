/**
 * Gemensamma priser — enda källan för paket, tillägg och tjänster.
 * Ändra här, så /paket, /process och /tjanster håller sig synkade.
 */

export const PRICES = {
  packages: {
    starter: 5_999,
    business: 9_599,
    premium: 14_999,
  },

  addons: {
    /** Per tillagd undersida utöver paketets omfång */
    extraPage: 495,
    booking: 2_500,
    blog: 2_000,
    i18n: 3_500,
    chatbot: 2_800,
    forms: 1_800,
    logo: 2_200,
    gbp: 1_500,
    maintenanceMonthly: 999,
  },

  /** Fristående tjänster (visas på /process och /tjanster) */
  services: {
    /** Landning / företag — spann Starter–Premium */
    siteFrom: 5_999,
    siteTo: 14_999,
    /** Uppdatering & redesign — kan börja lägre än ny sajt */
    redesignFrom: 3_000,
    redesignTo: 14_999,
    designFrom: 4_500,
    designTo: 12_000,
    seoFrom: 2_500,
    seoTo: 8_000,
    performanceFrom: 3_000,
    performanceTo: 9_000,
    /** Samma golv som Google Business Profile-tillägget */
    hostingFrom: 1_500,
    hostingTo: 4_500,
    /** Samma som tillägget Underhållsplan */
    maintenanceMonthly: 999,
    /**
     * API / kopplingar — golv = Avancerade formulär.
     * Bokningssystem som tillägg ligger på addons.booking.
     */
    apiFrom: 1_800,
    /** AI — golv = AI-chattbot-tillägget */
    aiFrom: 2_800,
    /** Skräddarsydda system / Enterprise-nivå */
    customFrom: 15_000,
  },
} as const;

/** Svensk formatering: 2800 → "2 800" */
export function formatSek(amount: number): string {
  return amount.toLocaleString("sv-SE");
}

export function fromPriceLabel(amount: number): string {
  return `från ${formatSek(amount)} kr`;
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
