/**
 * Innehåll för sidan "Pris & process" — hur samarbetet går till,
 * hur jag kommunicerar, och vad som ingår.
 *
 * Priserna själva bor i lib/services.ts så de bara behöver uppdateras på ett ställe.
 */

export type ProcessStep = {
  number: string;
  title: string;
  body: string;
};

export type Principle = {
  title: string;
  body: string;
};

/** Stegen från första mejlet till lanserad sajt. */
export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Du hör av dig",
    body: "Berätta vad du behöver — en mening räcker. Jag svarar inom ett par arbetsdagar.",
  },
  {
    number: "02",
    title: "Vi pratar igenom",
    body: "20–30 minuter, gratis. Jag säger rakt vad jag hade gjort, ungefärligt pris och om jag är rätt för jobbet.",
  },
  {
    number: "03",
    title: "Offert",
    body: "Du får en tydlig offert med omfattning och pris. Inga dolda poster — det ni ser är det vi jobbar efter.",
  },
  {
    number: "04",
    title: "Start & första fakturan",
    body: "När vi är överens faktureras halva summan. När den är betald börjar jag — skicka gärna texter, logga och bilder.",
  },
  {
    number: "05",
    title: "Bygge med avstämningar",
    body: "Du får se utkast längs vägen. Feedback via mejl eller kort samtal — utan onödiga möten.",
  },
  {
    number: "06",
    title: "Lansering & överlämning",
    body: "Sajten publiceras, du får inlogg och en kort genomgång. Andra halvan faktureras. 14 dagar gratis buggfix ingår.",
  },
];

/** Hur jag jobbar och kommunicerar i praktiken. */
export const principles: Principle[] = [
  {
    title: "Du pratar med den som bygger",
    body: "Ingen projektledare emellan. Frågor, beslut och feedback går direkt till mig — samma person som sitter i koden.",
  },
  {
    title: "Tydliga svar, korta ledtider",
    body: "Jag svarar vanligtvis inom 1–2 arbetsdagar. Hellre ett rakt mejl än ett långt möte om det räcker.",
  },
  {
    title: "Inga dolda tillägg",
    body: "Priset i offerten är det vi jobbar efter. Behöver omfattningen växa säger jag till innan något kostar mer — aldrig i efterhand.",
  },
  {
    title: "Du äger allt",
    body: "Kod, designfiler och konton är dina. Inga inlåsningar, inga månadsavgifter för att behålla sajten hos mig.",
  },
];

/**
 * Betalning, support och överlämning — det folk oftast undrar över
 * innan de vågar starta.
 */
export const practicalTerms: Principle[] = [
  {
    title: "Betalning i två delar",
    body: "Halva summan faktureras innan jag börjar. Andra halvan faktureras när sajten är klar och godkänd. Så vet båda att vi är överens — och du betalar inte allt innan du sett resultatet.",
  },
  {
    title: "14 dagar gratis efter lansering",
    body: "Om något strular, en bugg dyker upp eller något inte beter sig som vi sagt — fixar jag det utan kostnad i 14 dagar efter att sajten är live. Nya funktioner eller större ändringar ingår inte i det fönstret.",
  },
  {
    title: "Överlämning som passar projektet",
    body: "Exakt hur överlämningen ser ut beror på upplägget (t.ex. hosting, domän och hur sajten är byggd), men du får alltid: sajten publicerad, inlogg/åtkomst till det du behöver, och en kort genomgång av hur du uppdaterar det viktigaste. Kod, filer och konton är dina — utan inlåsning.",
  },
];

/** Kort om vad priset brukar täcka. */
export const priceIncludes = [
  "Modern och responsiv webbdesign",
  "Anpassad design efter ert varumärke",
  "Mobil-, surfplatta- och datoranpassning",
  "Grundläggande SEO",
  "Kontaktformulär",
  "Snabb och optimerad prestanda",
  "Hjälp med domänkoppling",
  "Publicering av hemsidan",
  "14 dagars support efter lansering",
  "Säkerhets- och prestandaoptimering",
];

export const priceExtras = [
  "Fler undersidor",
  "Webbshop / e-handel",
  "Bokningssystem",
  "Blogg eller nyhetssektion",
  "Flerspråkig hemsida",
  "Professionell copywriting",
  "Logotyp och grafisk profil",
  "Google Analytics och Search Console",
  "Avancerad SEO",
  "Integrationer (Instagram, nyhetsbrev)",
];
