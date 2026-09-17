import { homeFaq } from "@/lib/faq";
import { services } from "@/lib/services";
import { seoLandings } from "@/lib/seoLandings";
import type { ChatMessage } from "@/lib/chatKnowledge";

type Fact = { id: string; text: string; terms: string[] };
type Intent = "includes" | "price" | "wordpress" | "redesign" | "contact" | "time" | null;

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9åäö\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreText(query: string, terms: string[]) {
  const q = normalize(query);
  let score = 0;
  for (const term of terms) {
    const t = normalize(term);
    if (!t) continue;
    if (q.includes(t)) score += t.includes(" ") ? 4 : Math.min(3, Math.ceil(t.length / 4));
  }
  return score;
}

function detectIntent(question: string): Intent {
  const q = normalize(question);

  if (/(wordpress|wp\b|wix|squarespace|elementor|malltema|fardiga mall)/.test(q)) {
    return "wordpress";
  }
  if (
    /(ingar|innehall|vad far jag|vad far man|vad innehaller|features|feature|vad bygger)/.test(
      q,
    )
  ) {
    return "includes";
  }
  if (/(kostar|pris|kostnad|hur mycket|billig|kalkylator|offert|bestall|paket)/.test(q)) {
    return "price";
  }
  if (
    /(gammal|modernisera|redesign|ombygga|uppdatera sajt|ute i tiden|langsam sajt)/.test(q)
  ) {
    return "redesign";
  }
  if (/(kontakt|mejla|maila|ringa|telefon|boka samtal|hor av dig)/.test(q)) {
    return "contact";
  }
  if (/(hur lang tid|leverans|arbetsdagar|veckor|nar klar|hur snabbt)/.test(q)) {
    return "time";
  }
  return null;
}

function servicesAnswer(): string {
  const lines = services
    .slice(0, 8)
    .map((s) => `${s.title}: ${s.description}`);
  return `Jag bygger bland annat:\n\n${lines.join("\n")}\n\nTjänsterna ligger i hamburgermenyn. Vill du veta vad som passar er: skriv till mig via /kontakt.`;
}

function buildFacts(): Fact[] {
  const facts: Fact[] = [
    {
      id: "includes",
      terms: [
        "ingar",
        "ingår",
        "innehåll",
        "innehaller",
        "vad ingår",
        "vad bygger",
        "tjanster",
        "tjänster",
        "features",
      ],
      text: servicesAnswer(),
    },
    {
      id: "wordpress",
      terms: [
        "wordpress",
        "wp",
        "wix",
        "squarespace",
        "mall",
        "mallar",
        "elementor",
        "bygga i",
        "bygger i",
        "anvander",
      ],
      text: "Nej — jag bygger inte i WordPress eller färdiga mallteman. Jag skräddarsyr sajter med modern teknik (bland annat React/Next.js), så resultatet inte känns generiskt. Har du redan en WordPress-sajt kan jag modernisera den via Uppdatering & redesign — mer på /byta-wordpress.",
    },
    {
      id: "redesign",
      terms: [
        "gammal hemsida",
        "gamla sajten",
        "gammal sajt",
        "modernisera",
        "redesign",
        "ombygga",
        "uppdatera sajt",
        "ute i tiden",
        "langsam sajt",
      ],
      text: "Ja, det är ett av mina vanligaste uppdrag. Via Uppdatering & redesign tar jag din befintliga sajt och lyfter det som skaver — mobil, prestanda, uttryck och väg till kontakt. Mer på /ny-hemsida och /tjanster/redesign.",
    },
    {
      id: "price",
      terms: [
        "pris",
        "kostar",
        "kostnad",
        "hur mycket",
        "billigt",
        "kalkylator",
        "vad kostar",
        "paket",
      ],
      text: "Jag visar inte paketpriser på sajten. Berätta kort vad ni behöver via /kontakt så återkommer jag med en tydlig offert efter omfattningen — utan dolda poster.",
    },
    {
      id: "contact",
      terms: ["kontakt", "mejla", "maila", "ringa", "telefon", "boka samtal", "hor av dig"],
      text: "Enklast är /kontakt, annars mejlar du info@isakweb.se eller ringer 076-251 41 21 (alla dagar 10–22). Jag brukar svara inom två arbetsdagar.",
    },
    {
      id: "time",
      terms: ["hur lang tid", "hur lång tid", "leverans", "arbetsdagar", "veckor", "nar klar"],
      text:
        homeFaq.find((f) => f.q.toLowerCase().includes("lång tid"))?.a ??
        "En landningssida eller mindre företagssajt tar oftast 3–10 arbetsdagar när innehållet är på plats.",
    },
    {
      id: "location",
      terms: ["helsingborg", "hela sverige", "var bor", "distans", "pa plats"],
      text: "Jag sitter i Helsingborg men tar uppdrag i hela Sverige — digitalt eller på plats när det passar.",
    },
    {
      id: "owner",
      terms: ["ager jag", "äger jag", "min kod", "inlasning", "flytta sajten"],
      text: "Ja — när projektet är klart äger du kod, design och konton. Inga inlåsningar.",
    },
  ];

  for (const service of services) {
    facts.push({
      id: `svc-${service.slug}`,
      terms: [
        service.title,
        service.slug.replace(/-/g, " "),
        ...service.description
          .split(" ")
          .filter((w) => w.length > 5)
          .slice(0, 6),
      ],
      text: `${service.title}: ${service.description} Tidslinje: ${service.timeline}`,
    });
  }

  for (const item of homeFaq) {
    facts.push({
      id: `faq-${item.q.slice(0, 24)}`,
      terms: item.q.split(" ").filter((w) => w.length > 3),
      text: item.a,
    });
  }

  for (const landing of seoLandings) {
    facts.push({
      id: `land-${landing.slug}`,
      terms: [
        landing.navLabel,
        landing.slug.replace(/-/g, " "),
        ...landing.h1
          .split(/[—,\s]+/)
          .filter((w) => w.length > 4)
          .slice(0, 6),
      ],
      text: `${landing.lead} Mer på /${landing.slug}.`,
    });
  }

  return facts;
}

/**
 * Lokal fallback när LLM saknas: plockar mest relevanta fakta och
 * formulerar ett svar som speglar frågan — i Isaks röst.
 */
export function answerFromSiteKnowledge(
  question: string,
  _history: ChatMessage[] = [],
): string {
  const q = question.trim();
  if (!q) {
    return "Skriv gärna din fråga — till exempel om tjänster, redesign, teknik eller hur du tar kontakt.";
  }

  const intent = detectIntent(q);
  if (intent === "includes") return servicesAnswer();
  if (intent === "price") {
    return buildFacts().find((f) => f.id === "price")!.text;
  }
  if (intent === "wordpress") {
    return buildFacts().find((f) => f.id === "wordpress")!.text;
  }
  if (intent === "redesign") {
    return buildFacts().find((f) => f.id === "redesign")!.text;
  }
  if (intent === "contact") {
    return buildFacts().find((f) => f.id === "contact")!.text;
  }
  if (intent === "time") {
    return buildFacts().find((f) => f.id === "time")!.text;
  }

  const facts = buildFacts();
  const ranked = facts
    .map((fact) => ({ fact, score: scoreText(q, fact.terms) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (ranked.length === 0) {
    return "Bra fråga — utifrån hemsidan kan jag främst hjälpa kring tjänster, teknik, redesign och kontakt. Omformulera gärna lite, eller skriv till mig via /kontakt så tar jag det personligen.";
  }

  const top = ranked[0]!;
  const second = ranked[1];

  let answer = top.fact.text;
  if (second && second.score >= 4 && second.fact.id !== top.fact.id) {
    answer += ` ${second.fact.text}`;
  }

  if (answer.length > 900) answer = answer.slice(0, 880).trim() + "…";
  return answer;
}
