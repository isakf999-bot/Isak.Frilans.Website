import type { ReactNode } from "react";

/**
 * Egendesignade linjeikoner, en per tjänst.
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
  landningssidor: (
    <svg {...svgProps}>
      <rect x="3" y="4" width="18" height="15" rx="2.2" />
      <path d="M3 8h18" />
      <rect x="7" y="11" width="7" height="2.4" rx="1.2" />
      <path d="m15.5 14.5 3 3M17 17.6l1.6-.1.1-1.6" />
    </svg>
  ),
  "e-handel": (
    <svg {...svgProps}>
      <path d="M6.5 8h11l-.9 10.2a1.5 1.5 0 0 1-1.5 1.4H8.9a1.5 1.5 0 0 1-1.5-1.4L6.5 8Z" />
      <path d="M9.2 8V6.4a2.8 2.8 0 0 1 5.6 0V8" />
    </svg>
  ),
  foretagssajter: (
    <svg {...svgProps}>
      <path d="M4 20V5.5A1.5 1.5 0 0 1 5.5 4h6A1.5 1.5 0 0 1 13 5.5V20" />
      <path d="M13 20V9.5h4.5A1.5 1.5 0 0 1 19 11v9" />
      <path d="M3 20h18" />
      <path d="M7 8h2.5M7 12h2.5M7 16h2.5M16 13v3" />
    </svg>
  ),
  webbdesign: (
    <svg {...svgProps}>
      <path d="M4 6.5h16v11H4z" />
      <path d="M4 10h16M9 6.5v11" />
      <circle cx="7" cy="8.2" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  ),
  redesign: (
    <svg {...svgProps}>
      <path d="M20 12a8 8 0 1 1-2.3-5.6" />
      <path d="M20 4.5V9h-4.5" />
    </svg>
  ),
  seo: (
    <svg {...svgProps}>
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="m15 15 4.5 4.5" />
    </svg>
  ),
  prestanda: (
    <svg {...svgProps}>
      <path d="M4 19h16" />
      <path d="M7 19V11M12 19V7M17 19v-5" />
    </svg>
  ),
  hosting: (
    <svg {...svgProps}>
      <rect x="4" y="4" width="16" height="5" rx="1.2" />
      <rect x="4" y="10.5" width="16" height="5" rx="1.2" />
      <rect x="4" y="17" width="16" height="3" rx="1" />
      <circle cx="7.2" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="7.2" cy="13" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  ),
  underhall: (
    <svg {...svgProps}>
      <path d="M14.5 6.5a3.5 3.5 0 0 0 3 3L19 11l-2.5 2.5-1.5-1.2a3.5 3.5 0 0 0-3-3L10.5 8 13 5.5z" />
      <path d="m5 19 5.5-5.5" />
    </svg>
  ),
  "api-integrationer": (
    <svg {...svgProps}>
      <path d="M8 12h8" />
      <path d="M7 8H5.5A2.5 2.5 0 0 0 5.5 13H7" />
      <path d="M17 8h1.5a2.5 2.5 0 0 1 0 5H17" />
      <circle cx="8" cy="12" r="1.2" />
      <circle cx="16" cy="12" r="1.2" />
    </svg>
  ),
  "ai-integrationer": (
    <svg {...svgProps}>
      <rect x="5" y="7" width="14" height="10" rx="2" />
      <path d="M9 11v2M12 10v4M15 11v2" />
      <path d="M12 4v3M12 17v3" />
    </svg>
  ),
  "skradarsydda-system": (
    <svg {...svgProps}>
      <rect x="3.5" y="4" width="17" height="13" rx="2" />
      <path d="M8 20h8M12 17v3" />
      <path d="M7 8h4M7 11h6" />
    </svg>
  ),
};
