import type { ReactNode } from "react";

/**
 * Egendesignade linjeikoner, en per tjänst. Samma stroke och stil genom hela
 * setet så de känns som en familj — inte hämtade från ett ikonbibliotek.
 * Nyckeln matchar service.slug i lib/services.ts.
 */
const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-5 w-5",
  "aria-hidden": true,
};

export const serviceIcons: Record<string, ReactNode> = {
  // Landningssida: ett fönster med en tydlig CTA-knapp och en klickpekare.
  landningssidor: (
    <svg {...svgProps}>
      <rect x="3" y="4" width="18" height="15" rx="2.2" />
      <path d="M3 8h18" />
      <rect x="7" y="11" width="7" height="2.4" rx="1.2" />
      <path d="m15.5 14.5 3 3M17 17.6l1.6-.1.1-1.6" />
    </svg>
  ),
  // E-handel: en shoppingväska.
  "e-handel": (
    <svg {...svgProps}>
      <path d="M6.5 8h11l-.9 10.2a1.5 1.5 0 0 1-1.5 1.4H8.9a1.5 1.5 0 0 1-1.5-1.4L6.5 8Z" />
      <path d="M9.2 8V6.4a2.8 2.8 0 0 1 5.6 0V8" />
    </svg>
  ),
  // Företagssajt: en byggnad med fönster.
  foretagssajter: (
    <svg {...svgProps}>
      <path d="M4 20V5.5A1.5 1.5 0 0 1 5.5 4h6A1.5 1.5 0 0 1 13 5.5V20" />
      <path d="M13 20V9.5h4.5A1.5 1.5 0 0 1 19 11v9" />
      <path d="M3 20h18" />
      <path d="M7 8h2.5M7 12h2.5M7 16h2.5M16 13v3" />
    </svg>
  ),
  // Uppdatering & redesign: en förnyelse-pil runt ett fönster.
  redesign: (
    <svg {...svgProps}>
      <path d="M20 12a8 8 0 1 1-2.3-5.6" />
      <path d="M20 4.5V9h-4.5" />
    </svg>
  ),
};
