export type NavLink = { href: string; label: string };

export type NavGroup = {
  heading: string;
  items: NavLink[];
};

/** Synliga länkar i den vita listen — inte tjänster. */
export const primaryNav: NavLink[] = [
  { href: "/case", label: "Kundcase" },
  { href: "/om", label: "Om mig" },
  { href: "/process", label: "Process" },
  { href: "/faq", label: "FAQ" },
];

/** Tjänster — nås via hamburgermenyn, inte via en list-sida. */
export const serviceNavGroups: NavGroup[] = [
  {
    heading: "Hemsida & webb",
    items: [
      { href: "/tjanster/landningssidor", label: "Landningssidor" },
      { href: "/tjanster/foretagssajter", label: "Företagssajter" },
      { href: "/tjanster/e-handel", label: "E-handel" },
      { href: "/tjanster/redesign", label: "Uppdatering & redesign" },
      { href: "/tjanster/underhall", label: "Underhåll" },
      { href: "/tjanster/skradarsydda-system", label: "Egna system" },
    ],
  },
  {
    heading: "Synlighet & teknik",
    items: [
      { href: "/tjanster/seo", label: "SEO" },
      { href: "/tjanster/prestanda", label: "Prestanda" },
      { href: "/tjanster/hosting", label: "Hosting & lansering" },
      { href: "/tjanster/api-integrationer", label: "API-integrationer" },
      { href: "/tjanster/ai-integrationer", label: "AI-integrationer" },
    ],
  },
  {
    heading: "Design",
    items: [{ href: "/tjanster/webbdesign", label: "Webbdesign" }],
  },
];

export const menuPageLinks: NavLink[] = [
  { href: "/process", label: "Process" },
  { href: "/faq", label: "FAQ" },
  { href: "/case", label: "Kundcase" },
  { href: "/om", label: "Om mig" },
];
