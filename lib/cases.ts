/**
 * Kundcase. Fyll i platshållarna markerade med [ … ] med riktig data innan
 * caset görs live (läggs på main och pushas).
 *
 * Bilder: lägg skärmdumparna i public/case/ och peka ut dem här. "afterDesktop"
 * visas i laptop-ramen, "afterMobile" i mobilramen, "before" som liten
 * hörn-thumbnail. Utan bild visas en snygg platshållare i ramen.
 */
export type CaseResult = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  title: string;
  intro: string;
  liveUrl: string;
  challenge: string;
  work: { title: string; body: string }[];
  results: CaseResult[];
  quote?: { text: string; author: string };
  images: {
    afterDesktop?: string;
    afterMobile?: string;
    before?: string;
  };
};

export const cases: CaseStudy[] = [
  {
    slug: "mats-svensson-ppm",
    client: "Mats Svensson",
    industry: "Trading & rådgivning · PPM & ISK",
    title: "En sajt som känns lika seriös som rådgivningen bakom.",
    intro:
      "Mats Svensson — expert på aktivt fondsparande inom PPM och ISK. Tung erfarenhet, men en hemsida som inte visade det. Vi byggde om allt från grunden.",
    liveUrl: "", // Live-länk hoppas över tills vidare.
    challenge:
      "Kunden hade en föråldrad WordPress-sida som inte speglade hans expertis. Långsam, svår att uppdatera och byggd på en mall som tusen andra sajter också använde — långt ifrån det förtroende en rådgivare inom privatekonomi behöver inge.",
    work: [
      {
        title: "Ombyggd från grunden i React",
        body: "Ingen mall, ingen WordPress-tyngd. En egen kodbas byggd för just den här verksamheten.",
      },
      {
        title: "Ny, förtroendeingivande design",
        body: "Ett uttryck som matchar nivån på rådgivningen — rent, tydligt och seriöst.",
      },
      {
        title: "Snabbare laddning",
        body: "Optimerad från start, så sidan känns direkt responsiv i stället för trög.",
      },
      {
        title: "Fullt mobilanpassad",
        body: "Lika skarp i mobilen som på desktop — där de flesta besökarna faktiskt landar.",
      },
    ],
    results: [
      // Kör PageSpeed på gamla och nya sajten och fyll i riktiga siffror:
      { value: "[XX]", label: "PageSpeed före" },
      { value: "[9X]", label: "PageSpeed efter" },
      { value: "[X,X s → X,X s]", label: "Laddtid" },
    ],
    quote: {
      text: "[Citat från kunden — t.ex. “Äntligen en sajt som känns lika seriös som det jag levererar.”]",
      author: "[Kundens namn, titel]",
    },
    images: {
      afterDesktop: "/case/after-desktop.jpg",
      afterMobile: "/case/after-mobile.jpg",
      before: "/case/before.jpg",
    },
  },
];
