import { formatSek, PRICES } from "@/lib/pricing";
import { packages, packageAddons } from "@/lib/packages";
import { homeFaq } from "@/lib/faq";
import { services } from "@/lib/services";
import type { ChatMessage } from "@/lib/chatKnowledge";

type Fact = { id: string; text: string; terms: string[] };

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

function buildFacts(): Fact[] {
  const facts: Fact[] = [
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
      text: `Nej — Isak bygger inte i WordPress eller färdiga mallteman. Han skräddarsyr sajter med modern teknik (bland annat React/Next.js), så resultatet inte känns generiskt. Har du redan en WordPress-sajt kan han däremot modernisera den via Uppdatering & redesign (${formatSek(PRICES.services.redesignFrom)}–${formatSek(PRICES.services.redesignTo)} kr) — då blir det en ny, snabb sajt snarare än ännu en mall.`,
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
      text: `Ja, det är ett av Isaks vanligaste uppdrag. Via Uppdatering & redesign (ca ${formatSek(PRICES.services.redesignFrom)}–${formatSek(PRICES.services.redesignTo)} kr) tar han en befintlig sajt och lyfter det som skaver — mobil, prestanda, uttryck och väg till kontakt — utan att du alltid måste börja från noll. Mer på /tjanster/redesign.`,
    },
    {
      id: "price",
      terms: [
        "pris",
        "kostar",
        "kostnad",
        "hur mycket",
        "billigt",
        "paket",
        "bas",
        "premium",
        "full service",
        "kalkylator",
      ],
      text: `Enligt priskalkylatorn ligger det ungefär så här: landningssida ${formatSek(PRICES.packages.starter)}–${formatSek(PRICES.packages.starterHigh)} kr, företagssida ${formatSek(PRICES.packages.business)}–${formatSek(PRICES.packages.businessHigh)} kr, webbshop ${formatSek(PRICES.packages.premium)}–${formatSek(PRICES.packages.premiumHigh)} kr. Enterprise är offert. På /paket kan du dra i antal sidor och bocka tillägg för ett snabbare estimat.`,
    },
    {
      id: "contact",
      terms: ["kontakt", "mejla", "maila", "ringa", "telefon", "boka samtal", "hor av dig"],
      text: `Enklast är /kontakt. Du kan också mejla info@isakweb.se eller ringa 076-251 41 21 (alla dagar 10–22). Isak brukar svara inom två arbetsdagar.`,
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
      text: "Isak sitter i Helsingborg men tar uppdrag i hela Sverige — digitalt eller på plats när det passar.",
    },
    {
      id: "owner",
      terms: ["ager jag", "äger jag", "min kod", "inlasning", "flytta sajten"],
      text: "Ja — när projektet är klart äger du kod, design och konton. Inga inlåsningar.",
    },
  ];

  for (const pkg of packages) {
    facts.push({
      id: `pkg-${pkg.id}`,
      terms: [pkg.name, pkg.tagline, ...pkg.features.slice(0, 3)],
      text: `${pkg.name} (${pkg.priceLabel}): ${pkg.tagline}. ${pkg.pages}. Bland annat: ${pkg.features.slice(0, 4).join(", ")}.`,
    });
  }

  for (const addon of packageAddons) {
    facts.push({
      id: `addon-${addon.id}`,
      terms: [addon.name, ...addon.description.split(" ").filter((w) => w.length > 5)],
      text: `Tillägget ${addon.name} kostar ${addon.priceLabel}. ${addon.description}`,
    });
  }

  for (const service of services) {
    facts.push({
      id: `svc-${service.slug}`,
      terms: [service.title, service.slug.replace(/-/g, " "), ...service.description.split(" ").filter((w) => w.length > 5).slice(0, 6)],
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

  return facts;
}

/**
 * Lokal fallback när LLM saknas: plockar mest relevanta fakta och
 * formulerar ett svar som speglar frågan — inte ett fast script.
 */
export function answerFromSiteKnowledge(
  question: string,
  _history: ChatMessage[] = [],
): string {
  const q = question.trim();
  if (!q) {
    return "Skriv gärna din fråga — till exempel om priser, teknik (som WordPress) eller om Isak kan hjälpa med just din sajt.";
  }

  const facts = buildFacts();
  const ranked = facts
    .map((fact) => ({ fact, score: scoreText(q, fact.terms) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (ranked.length === 0) {
    return `Bra fråga. Utifrån hemsidan kan jag främst hjälpa kring priser, paket, teknikval, redesign och kontakt. Om du omformulerar lite — eller går till /kontakt — får du svar direkt från Isak.`;
  }

  const top = ranked[0]!;
  const second = ranked[1];
  const qLower = normalize(q);

  // Ja/nej-frågor om teknik: lyft wordpress-faktat först om det matchar starkt.
  const wordpressHit = ranked.find((r) => r.fact.id === "wordpress" && r.score >= 3);
  if (wordpressHit && /(wordpress|wp|wix|mall)/i.test(q)) {
    return wordpressHit.fact.text;
  }

  let lead = "";
  if (/^(kan|bygger|jobbar|anvander|gör|gor|hjalper|hjälper)/i.test(q.trim()) || qLower.includes("?")) {
    // Kort inledning som speglar frågan utan att vara ett script.
    if (top.fact.id === "wordpress") lead = "";
    else if (top.score >= 4) lead = `Angående det du frågar om: `;
  }

  let answer = `${lead}${top.fact.text}`;
  if (second && second.score >= 4 && second.fact.id !== top.fact.id) {
    answer += ` ${second.fact.text}`;
  }

  // Håll det läsbart.
  if (answer.length > 700) answer = answer.slice(0, 680).trim() + "…";
  return answer;
}
