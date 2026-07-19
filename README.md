# Isak Web — frilans-landningssida

Landningssida för Isak Web (Isak Forsberg), frilansande webbutvecklare. En sida,
fyra sektioner, ett mål: att besökaren hör av sig via kontaktformuläret.

Loggan bor i `components/Logo/Logo.tsx` som inline-SVG, inte som bildfil — så
den är skarp i alla storlekar och tar sidans färger.

## Kom igång

```bash
npm install
npm run dev      # http://localhost:3000
```

## Formuläret (Web3Forms)

Formuläret postar **direkt från webbläsaren** till `api.web3forms.com`.

**Varför inte via en API-route på servern?** Det var första försöket, men
Web3Forms ligger bakom Cloudflare som blockerar server-till-server-anrop med en
`403 "Just a moment"`-utmaning. Verifierat: Node → 403, headless webbläsare →
blockerad, riktig webbläsare → 200. Det hade slagit likadant på Vercel, vars
funktioner kör från datacenter-IP:n. Att posta från webbläsaren är hur Web3Forms
är designat.

**Därför är nyckeln `NEXT_PUBLIC_`** och syns i webbläsaren. Det är Web3Forms
egen modell — deras dokumentation lägger nyckeln rakt i HTML. Nyckeln kan inte
läsa något, bara skicka mejl till adressen den är kopplad till. Skräppost-skydd
finns hos Web3Forms, plus en honeypot i formuläret. Domänen kan låsas i deras
dashboard.

1. Gå till [web3forms.com](https://web3forms.com), skriv in `info@isakweb.se`
   och tryck på "Create Access Key". Nyckeln mejlas till dig direkt — inget konto,
   inget lösenord.
2. Kopiera `.env.example` till `.env.local` och klistra in nyckeln:
   ```
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=din-nyckel-här
   ```
3. **Starta om dev-servern** — miljövariabler läses bara in vid start.
4. Lägg in samma variabel i Vercel: **Project → Settings → Environment
   Variables** (Production + Preview).

Utan nyckeln visar formuläret ett tydligt fel i UI:t — det kraschar inte.

Vill du i stället dölja nyckeln helt och validera på servern, är **Resend** rätt
val (byggt för server-anrop). Det kräver ett konto och en verifierad
avsändardomän.

## Struktur

```
app/
  layout.tsx          metadata, Open Graph, fonter
  page.tsx            sätter ihop sektionerna
  globals.css         ← ALLA design tokens (färg, typografi, radie) bor här
components/
  Nav/  Hero/  About/  Services/  Contact/  Footer/
  Logo/               ISAK WEB-loggan som inline-SVG
  SectionLabel/       sektionsetiketterna
lib/
  services.ts         tjänsterna som data
  availability.ts     dagar, tidsfönster och svarstid
  contactEmail.ts     formaterar mejlets brödtext
```

## Ändra innehåll

- **Tjänster:** `lib/services.ts`. Typen `Service` har redan valfria fält för
  `image`, `price` och `caseStudy` — fyll bara i data, `Services.tsx` renderar
  dem automatiskt utan att layouten behöver byggas om.
- **Färg och typografi:** `app/globals.css`, blocket `@theme`. Ändra på ett
  ställe, slår igenom överallt.
- **Svarstid i bekräftelsen:** `RESPONSE_TIME_DAYS` i `lib/availability.ts`.
- **Porträttbild:** platshållaren i `components/Hero/Hero.tsx` — byt ut mot
  `next/image` och behåll klasserna på wrappern.
- **Linktree:** lägg till i `ELSEWHERE` i `components/Footer/Footer.tsx` när
  den finns.

## Design

Off-white canvas (`#F7F6F3`), nästan-svart ink, en enda mättad accent (`#1B34C4`)
som bara används på fokus, valda tider och länkar. Display: Instrument Serif.
Brödtext: Geist. Mikroetiketter: Geist Mono.

Signaturelementet är det hårfina rutnätet som löper bakom hela sidan — strukturen
bakom en webbsida, gjord synlig — plus sektionsetiketter formade som routes.

Scroll-reveal är byggd på CSS `animation-timeline: view()`, inte JavaScript. Det
betyder att allt innehåll är fullt synligt även utan JS och i webbläsare som
saknar stöd — en animation får aldrig gömma innehåll.
