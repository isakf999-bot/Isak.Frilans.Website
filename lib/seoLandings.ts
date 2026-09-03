import { formatSek, PRICES } from "@/lib/pricing";

export type SeoFaq = { q: string; a: string };

export type SeoLanding = {
  slug: string;
  /** Footer-etikett */
  navLabel: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  priceNote: string;
  contactPrefill: string;
  relatedServiceHref: string;
  relatedServiceLabel: string;
  sections: { heading: string; body: string }[];
  points: { title: string; body: string }[];
  faqs: SeoFaq[];
};

const bas = formatSek(PRICES.packages.starter);
const premium = formatSek(PRICES.packages.business);
const full = formatSek(PRICES.packages.premium);
const redesignFrom = formatSek(PRICES.services.redesignFrom);
const redesignTo = formatSek(PRICES.services.redesignTo);
const bookingFrom = formatSek(PRICES.addons.booking);
const underhall = formatSek(PRICES.addons.maintenanceMonthly);
const seoFrom = formatSek(PRICES.services.seoFrom);
const designFrom = formatSek(PRICES.services.designFrom);

export const seoLandings: SeoLanding[] = [
  {
    slug: "hemsida-foretag",
    navLabel: "Hemsida till företag",
    title: "Hemsida till företag — fast pris från " + bas + " kr",
    description:
      "En företagssajt som gör att någon vågar anlita er. Byggd från grunden åt svenska företag, med fast pris, tydlig struktur och dig som ägare.",
    eyebrow: "Företagssajt",
    h1: "Hemsida till företag som tar in kunder — inte bara ser snygg ut",
    lead: "Besökaren ska förstå vad ni gör, lita på er och veta hur man tar nästa steg. Jag designar och kodar sajten från grunden, med fast pris innan vi börjar.",
    priceNote: `Paket från ${bas} kr. Företagssajt (Premium) ${premium} kr.`,
    contactPrefill: "Jag vill ha en hemsida till mitt företag",
    relatedServiceHref: "/tjanster/foretagssajter",
    relatedServiceLabel: "Företagssajter",
    sections: [
      {
        heading: "Vad en företagssajt faktiskt ska göra",
        body: "De flesta företagshemsidor berättar för mycket och säljer för lite. Jag bygger sidorna kring erbjudandet: vad ni gör, för vem, vad det kostar att ta kontakt, och bevis som gör att någon vågar höra av sig. Inga mallteman. Ingen generisk “välkommen till vår hemsida”.",
      },
      {
        heading: "Hur jag bygger den",
        body: "Struktur först, sen design, sen kod i React eller Next.js. Responsiv på mobil, grundläggande SEO (titlar, rubriker, sitemap), kontaktformulär och publicering ingår. Du äger koden — ingen byrå-låsning.",
      },
    ],
    points: [
      {
        title: "Tydlig väg till kontakt",
        body: "En huvudknapp, synlig formulärväg och kontaktuppgifter som går att hitta på tre sekunder.",
      },
      {
        title: "Fast pris i offerten",
        body: `Bas ${bas} kr, Premium ${premium} kr, Full Service ${full} kr. Scope klart innan första raden kod.`,
      },
      {
        title: "3–10 arbetsdagar",
        body: "När texter och bilder är på plats. Större sajter planeras i milstolpar så du vet var vi är.",
      },
    ],
    faqs: [
      {
        q: "Vad kostar en hemsida till företag?",
        a: `Mina paket ligger på ${bas} kr (upp till 5 sidor), ${premium} kr (upp till 15 sidor) och ${full} kr för Full Service. Extra sidor och tillägg prisas separat — du ser det innan vi startar.`,
      },
      {
        q: "Ingår SEO?",
        a: "Ja, grundläggande SEO ingår: sidtitlar, descriptions, struktur, sitemap och robots. Löpande innehålls-SEO är ett tillägg om ni vill att jag skriver och publicerar över tid.",
      },
      {
        q: "Kan vi uppdatera sajten själva?",
        a: "Ja. I Premium och uppåt sätter vi oftast en enkel admin-panel. Annars uppdaterar jag via underhållsplanen, eller ni får tydliga filer att peka en annan utvecklare mot.",
      },
      {
        q: "Jobbar du i hela Sverige?",
        a: "Ja. Möten sker digitalt — samma leverans oavsett var ni sitter. Behöver vi ses går det att lösa.",
      },
    ],
  },
  {
    slug: "webbutvecklare",
    navLabel: "Webbutvecklare",
    title: "Frilansande webbutvecklare — hemsidor åt svenska företag",
    description:
      "Frilansande webbutvecklare för företag i hela Sverige. Hemsidor, landningssidor och e-handel med fast pris. Du pratar alltid med den som skriver koden.",
    eyebrow: "Hela Sverige",
    h1: "Webbutvecklare som bygger sajten — du pratar med den som kodar",
    lead: "Jag heter Isak Forsberg och bygger hemsidor åt företag i hela Sverige. Inga projektledare, inga mallar, fast pris innan start. Möten digitalt, samma leverans oavsett stad.",
    priceNote: `Hemsidor från ${bas} kr. Uppdrag i hela Sverige.`,
    contactPrefill: "Jag söker en webbutvecklare till vårt företag",
    relatedServiceHref: "/om",
    relatedServiceLabel: "Om mig",
    sections: [
      {
        heading: "En utvecklare, inte en byråkedja",
        body: "När du mejlar IsakWeb svarar jag. Jag ritar strukturen, skriver koden och publicerar sajten. Det är därför det går fort och därför det du sagt faktiskt hamnar i produkten — inte i ett mötesprotokoll tre led bort.",
      },
      {
        heading: "Digitalt i hela landet",
        body: "Utkast, feedback och lansering via mejl och korta samtal. Samma leverans oavsett om ni sitter i Stockholm, Göteborg, Malmö eller en mindre ort. Behöver vi ses går det att lösa — de flesta projekten behöver det inte.",
      },
    ],
    points: [
      {
        title: "React och Next.js",
        body: "Modern teknik, inte WordPress-mall. Sajten blir snabb, sökbar och enkel att utveckla vidare.",
      },
      {
        title: "Fast pris",
        body: `Inga timmar i bakgrunden. Du vet vad det kostar — paket från ${bas} kr.`,
      },
      {
        title: "Svar inom två arbetsdagar",
        body: "Telefontid alla dagar 10–22. En mening om vad du behöver räcker för att jag ska kunna säga om jag är rätt person.",
      },
    ],
    faqs: [
      {
        q: "Måste vi ses på plats?",
        a: "Nej. För de flesta räcker ett kort videosamtal plus mejl — då håller vi också priset nere. Sitter ni långt bort är det standard.",
      },
      {
        q: "Bygger du appar och system också?",
        a: "Ja, skräddarsydda system och integrationer finns som tjänst. En vanlig företagssajt är vanligast — mer avancerat tar vi per offert.",
      },
      {
        q: "Vad skiljer dig från en webbyrå?",
        a: "Inget mellanlager. Du betalar för design och kod, inte för möten och projektledning. Du äger sajten när den är klar.",
      },
      {
        q: "Hur bokar jag?",
        a: "Skicka ett mejl via kontaktformuläret eller info@isakweb.se. Jag återkommer med tider och en grov känsla för pris.",
      },
    ],
  },
  {
    slug: "hemsida-fast-pris",
    navLabel: "Hemsida fast pris",
    title: "Hemsida till fast pris — från " + bas + " kr",
    description:
      "Hemsida med fast pris innan koden börjar. Inga löpande timmar. Bas, Premium och Full Service — tydligt scope och 14 dagars support.",
    eyebrow: "Fast pris",
    h1: "Hemsida till fast pris — du vet kostnaden innan vi startar",
    lead: "Inga “vi får se”-fakturor. Du får ett scope och ett pris. Behöver något läggas till gör vi det medvetet, inte som en överraskning efteråt.",
    priceNote: `Bas ${bas} kr · Premium ${premium} kr · Full Service ${full} kr. Alla priser exkl. moms.`,
    contactPrefill: "Jag vill ha en hemsida till fast pris",
    relatedServiceHref: "/paket",
    relatedServiceLabel: "Alla paket",
    sections: [
      {
        heading: "Så funkar fast pris hos mig",
        body: "Vi pratar 20–30 minuter. Jag säger vad jag hade byggt och vilket paket det landar i. Offerten innehåller omfattning och pris. Halva summan innan start, andra halvan när sajten är godkänd.",
      },
      {
        heading: "Vad som alltid ingår",
        body: "Responsiv design, grundläggande SEO, kontaktformulär, publicering, hjälp med domän och 14 dagars support efter lansering. Extra sidor, bokning, blogg, chattbot och underhåll prisas som tillägg — synliga på paket-sidan.",
      },
    ],
    points: [
      {
        title: "Bas",
        body: `${bas} kr · upp till 5 sidor. För den som behöver en seriös sajt snabbt.`,
      },
      {
        title: "Premium",
        body: `${premium} kr · upp till 15 sidor, admin och mer SEO. Det de flesta företag väljer.`,
      },
      {
        title: "Full Service",
        body: `${full} kr · fler sidor, e-handel där det behövs, längre support.`,
      },
    ],
    faqs: [
      {
        q: "Tillkommer moms?",
        a: "Ja, priser på sajten är exklusive moms om inget annat anges.",
      },
      {
        q: "Vad händer om vi vill ha mer längs vägen?",
        a: "Då säger jag till innan det kostar mer. Aldrig en extra rad på slutfakturan som du inte godkänt.",
      },
      {
        q: "Ingår hosting?",
        a: "Jag hjälper er koppla domän och publicera. Hosting kan ni ha själva (t.ex. Vercel) eller så sätter vi upp det — det finns som tjänst/tillägg.",
      },
      {
        q: "Kan jag se paketen i detalj?",
        a: "Ja — öppna paketsidan. Där finns kalkylator, tillägg och vad som ingår i varje nivå.",
      },
    ],
  },
  {
    slug: "landningssida",
    navLabel: "Landningssida",
    title: "Landningssida som konverterar — från " + bas + " kr",
    description:
      "En landningssida med ett jobb: få besökaren att höra av sig, boka eller köpa. Tydligt erbjudande, en knapp, snabb mobil. Fast pris.",
    eyebrow: "Kampanj & leads",
    h1: "Landningssida med ett jobb — inte en minibroschyr",
    lead: "En landningssida ska inte berätta allt om företaget. Den ska få rätt person att ta nästa steg. Jag bygger hierarki, text och formulär så vägen dit är uppenbar.",
    priceNote: `Ofta Bas-paketet från ${bas} kr. Typiskt 3–7 arbetsdagar när innehållet är klart.`,
    contactPrefill: "Jag vill ha en landningssida",
    relatedServiceHref: "/tjanster/landningssidor",
    relatedServiceLabel: "Landningssidor",
    sections: [
      {
        heading: "Vad som skiljer en landningssida från en hemsida",
        body: "Hemsidan förklarar helheten. Landningssidan har ett erbjudande, ett bevis och en handling. Jag tar bort konkurrerande knappar, sätter budskapet ovanför vecket och kopplar formuläret så ni kan följa upp leads.",
      },
      {
        heading: "Vad du får",
        body: "En sida byggd runt er kampanj eller ert erbjudande. Mobil först, grundläggande SEO, spårning om ni vill, och publicering. Behöver ni fler undersidor efteråt växer det till en företagssajt utan att kasta om allt.",
      },
    ],
    points: [
      {
        title: "Ett erbjudande, en knapp",
        body: "Ingen meny som stjäl klick. Besökaren ska veta vad ni säljer på tre sekunder.",
      },
      {
        title: "Formulär som går att följa upp",
        body: "Leads till er mejl, webhook eller CRM — inte ett formulär som rinner ut i sanden.",
      },
      {
        title: "Snabb på mobil",
        body: "De flesta kommer från annons eller Instagram. Sidan ska ladda, inte spinna.",
      },
    ],
    faqs: [
      {
        q: "Kan landningssidan bli en hel sajt sen?",
        a: "Ja. Jag bygger så att ni kan lägga till sidor utan att börja om. Många börjar med en landning och tar Premium när de behöver mer.",
      },
      {
        q: "Skriver du texterna?",
        a: "Jag strukturerar och skärper. Bäst resultat blir det när ni har erbjudandet klart — jag hjälper er formulera det på sidan.",
      },
      {
        q: "Fungerar det mot Google Ads eller Meta?",
        a: "Ja. Sidan är en URL ni pekar kampanjen mot. Spårning (t.ex. via GTM) kan vi sätta upp med cookie-samtycke.",
      },
      {
        q: "Hur lång tid tar det?",
        a: "Oftast 3–7 arbetsdagar när copy och bilder finns. Annars väntar bygget på innehållet — inte tvärtom.",
      },
    ],
  },
  {
    slug: "byta-wordpress",
    navLabel: "Byta från WordPress",
    title: "Byt från WordPress — modern hemsida från " + redesignFrom + " kr",
    description:
      "Modernisera en gammal WordPress-sajt. Ny, snabb sajt i React/Next.js — inte en ny mall. Fast pris, ni äger koden.",
    eyebrow: "Uppdatering & redesign",
    h1: "Byt från WordPress till en sajt som är snabb och er egen",
    lead: "Jag tar er befintliga sajt och bygger om den — struktur, design och kod. Inte ett nytt WordPress-tema. Ni behåller det som fungerar i budskapet, och slänger det som gör sidan långsam.",
    priceNote: `Uppdatering & redesign ca ${redesignFrom}–${redesignTo} kr beroende på omfång.`,
    contactPrefill: "Jag vill byta ut vår WordPress-sajt",
    relatedServiceHref: "/tjanster/redesign",
    relatedServiceLabel: "Uppdatering & redesign",
    sections: [
      {
        heading: "Varför folk lämnar WordPress",
        body: "Plugins som krockar, tunga teman, säkerhetsuppdateringar och en admin som ingen vill röra. Jag bygger om i React eller Next.js: färre rörliga delar, bättre prestanda, enklare att lämna över till nästa utvecklare.",
      },
      {
        heading: "Vad som händer med ert innehåll",
        body: "Vi går igenom sidor, texter och bilder. Det som ska med flyttas. Det som är dött slängs. Domänen behåller ni. Redirects sätter vi så Google inte tappar de URL:er ni redan rankar på.",
      },
    ],
    points: [
      {
        title: "Ingen ny mall",
        body: "Samma misstag om igen hjälper ingen. Ni får en sajt ritad efter ert erbjudande.",
      },
      {
        title: "Ni äger koden",
        body: "Inget tema ni hyrt, inget byrå-CMS ni fastnar i. Imorgon kan någon annan ta över.",
      },
      {
        title: "Behåll det som redan fungerar",
        body: "Texter, varumärke och sidstruktur kan följa med. Vi kastar inte om allt för att tekniken byts.",
      },
    ],
    faqs: [
      {
        q: "Måste vi byta webbhotell?",
        a: "Oftast ja, till ett host som passar Next.js (t.ex. Vercel). Jag hjälper er flytta och peka om domänen.",
      },
      {
        q: "Försvinner vi från Google?",
        a: "Inte om vi gör redirects och behåller viktiga URL:er. Jag sätter canonical, sitemap och en plan för vilka sidor som ska med.",
      },
      {
        q: "Kan WooCommerce följa med?",
        a: "En webbshop byggs om som e-handel, inte som “WordPress med plugins”. Scope och pris tar vi i offert.",
      },
      {
        q: "Vad kostar det?",
        a: `Redesign ligger oftast mellan ${redesignFrom} och ${redesignTo} kr. En helt ny sajt i paketpris kan vara rätt om den gamla ändå ska skrivas om.`,
      },
    ],
  },
  {
    slug: "webbshop",
    navLabel: "Webbshop",
    title: "Webbshop & e-handel till företag — offert efter scope",
    description:
      "Webbshop där produkten står i centrum och kassan inte tappar folk. Byggd från grunden, kopplad till betalning och frakt ni redan använder.",
    eyebrow: "E-handel",
    h1: "Webbshop som går att förstå — och att betala i",
    lead: "E-handel är förtroende i varje steg: produkt, varukorg, kassa. Jag bygger butiker med tydliga produktvyer och ett mobilvänligt köpflöde, kopplat till den betalning och frakt ni faktiskt använder.",
    priceNote: `Full Service från ${full} kr när shoppen är liten. Större katalog och integrationer = offert.`,
    contactPrefill: "Jag vill ha en webbshop",
    relatedServiceHref: "/tjanster/e-handel",
    relatedServiceLabel: "E-handel",
    sections: [
      {
        heading: "Vad jag tar ansvar för",
        body: "Produktlistor och produktsidor som går att skumma. En kassa som inte frågar tre gånger om samma sak. Koppling mot betalning (t.ex. Stripe) och frakt ni redan har. Mobil först — de flesta handlar i telefonen.",
      },
      {
        heading: "När det blir offert istället för paket",
        body: "Många produkter, varianter, lager, bokning eller koppling mot affärssystem gör att Fast Full Service inte räcker. Då tar vi ett samtal, jag säger vad jag hade gjort, och du får ett pris för just den shoppen.",
      },
    ],
    points: [
      {
        title: "Produkt i centrum",
        body: "Bilder, pris och köpknapp utan onödigt brus. Ni ska kunna lägga till fler produkter utan att bygget rasar.",
      },
      {
        title: "Kassa som håller ihop",
        body: "Färre fält, tydliga felmeddelanden, betalsätt ni litar på. Inte tio checkout-steg.",
      },
      {
        title: "Ni äger butiken",
        body: "Ingen hyra för temat. Koden är er den dagen ni vill byta utvecklare eller plattform.",
      },
    ],
    faqs: [
      {
        q: "Kan ni koppla Klarna, Stripe eller Swish?",
        a: "Ja, det som passar er. Vilken väg som är rätt beror på volym och vad ni redan har — det tar vi i scopet.",
      },
      {
        q: "Fungerar det mot lager eller affärssystem?",
        a: "Ja som integration, pris efter hur systemet ser ut. Enklare shoppar kör vi utan tung koppling först.",
      },
      {
        q: "Behöver jag Full Service-paketet?",
        a: `En liten shop kan landa i Full Service från ${full} kr. Katalog, varianter och fraktregler gör att vi oftast går på offert — jag säger det rakt efter genomgången.`,
      },
      {
        q: "Hur lång tid tar en webbshop?",
        a: "Ofta 2–5 veckor beroende på antal produkter och integrationer. Du får milstolpar, inte en tyst månad.",
      },
    ],
  },
  {
    slug: "hemsida-smaforetag",
    navLabel: "Hemsida till småföretag",
    title: "Hemsida till småföretag — fast pris från " + bas + " kr",
    description:
      "Hemsida till småföretag och enskild firma. Tydligt erbjudande, fast pris, klar på 3–10 dagar. Du pratar med den som kodar.",
    eyebrow: "Småföretag",
    h1: "Hemsida till småföretag — seriös utan byråpris",
    lead: "Du behöver inte en stor byrå för att se ut som ett riktigt bolag. Jag bygger en sajt som förklarar vad ni gör och hur man hör av sig — med fast pris innan vi startar.",
    priceNote: `De flesta småföretag landar i Bas ${bas} kr eller Premium ${premium} kr.`,
    contactPrefill: "Jag vill ha en hemsida till mitt småföretag",
    relatedServiceHref: "/tjanster/foretagssajter",
    relatedServiceLabel: "Företagssajter",
    sections: [
      {
        heading: "Vad småföretag faktiskt behöver på webben",
        body: "Inte 40 undersidor. En tydlig startsida, vad ni erbjuder, vilka ni är och ett formulär som fungerar i mobilen. Jag skär bort det som inte säljer och lägger tiden på struktur och förtroende.",
      },
      {
        heading: "Byggd för att ni ska hinna med",
        body: "Ingen tung admin ni aldrig öppnar. Antingen en enkel panel, eller så uppdaterar jag via underhåll. Ni äger koden den dagen ni växer ur första versionen.",
      },
    ],
    points: [
      {
        title: "Ett erbjudande som går att skumma",
        body: "Besökaren ska förstå er på några sekunder — även mellan två möten i telefonen.",
      },
      {
        title: "Pris ni kan planera efter",
        body: `Bas ${bas} kr för upp till 5 sidor. Inga timmar som tickar i bakgrunden.`,
      },
      {
        title: "Klar när innehållet är klart",
        body: "Typiskt 3–10 arbetsdagar. Jag väntar på texter och bilder, inte tvärtom.",
      },
    ],
    faqs: [
      {
        q: "Jag har enskild firma — räcker det?",
        a: "Ja. Många av mina sajter är just enskild firma eller litet AB. Paketet styrs av hur många sidor ni behöver, inte av bolagsform.",
      },
      {
        q: "Måste jag skriva alla texter själv?",
        a: "Ni kan det ni säljer. Jag strukturerar och skärper. Har ni nästan inget skrivet hjälper jag er få ihop det som ska stå på sidan.",
      },
      {
        q: "Kan sajten växa sen?",
        a: "Ja. Extra sidor är 295 kr styck. Behöver ni admin eller fler funktioner tar vi Premium eller ett tillägg — utan att bygga om allt.",
      },
      {
        q: "Jobbar du i hela Sverige?",
        a: "Ja. Allt sker digitalt. Samma pris och samma leverans oavsett ort.",
      },
    ],
  },
  {
    slug: "ny-hemsida",
    navLabel: "Ny hemsida",
    title: "Ny hemsida till företaget — från " + bas + " kr",
    description:
      "Behöver ni en ny hemsida? Jag bygger om från grunden: struktur, design och kod. Fast pris, ni äger allt, 14 dagars support efter lansering.",
    eyebrow: "Ny sajt",
    h1: "Ny hemsida — byt det som inte längre gör jobbet",
    lead: "Gammal sajt, trasig i mobilen eller bara tråkig. Jag bygger en ny som presenterar er rätt och tar in förfrågningar — inte en kosmetisk färgklick på det gamla.",
    priceNote: `Ny sajt från ${bas} kr. Redesign av befintlig ${redesignFrom}–${redesignTo} kr när mycket kan behållas.`,
    contactPrefill: "Vi behöver en ny hemsida",
    relatedServiceHref: "/tjanster/redesign",
    relatedServiceLabel: "Uppdatering & redesign",
    sections: [
      {
        heading: "När det är ny sajt — och när det är redesign",
        body: "Om strukturen, texterna och tekniken ändå ska slängas är det oftast billigare och renare att bygga nytt i paketpris. Om ni har sidor som redan rankar och ett budskap som sitter kan vi bygga om det som skaver och sätta redirects.",
      },
      {
        heading: "Så byter vi utan att tappa er",
        body: "Domänen behåller ni. Jag publicerar, pekar om och sätter de redirects som behövs. Ni får inlogg och en kort genomgång. Andra halvan av fakturan kommer när sajten är godkänd.",
      },
    ],
    points: [
      {
        title: "Från grunden, inte en ny mall",
        body: "React eller Next.js. Inget tema ni hyrt och fastnar i.",
      },
      {
        title: "Samma domän",
        body: "Besökare och Google ska landa rätt. Vi planerar URL:er innan vi släcker den gamla.",
      },
      {
        title: "Fast pris innan start",
        body: "Scope i offerten. Inga överraskningar på slutfakturan.",
      },
    ],
    faqs: [
      {
        q: "Kan vi vara utan hemsida några dagar?",
        a: "Oftast inte. Den nya går live när den är klar, den gamla pekas om samma dag. Kort DNS-tid, inte en tom vecka.",
      },
      {
        q: "Måste vi byta webbhotell?",
        a: "Ofta ja, till ett host som passar hur sajten är byggd. Jag hjälper er flytta och äga kontona.",
      },
      {
        q: "Vad händer med mejlen på domänen?",
        a: "Mejl och webb är olika saker. Vi rör inte mejlen om ni inte ber om det.",
      },
      {
        q: "Hur lång tid tar en ny hemsida?",
        a: "3–10 arbetsdagar för en vanlig företagssajt när innehållet är på plats. Större sajter i milstolpar.",
      },
    ],
  },
  {
    slug: "hemsida-seo",
    navLabel: "Hemsida som syns",
    title: "Hemsida som syns på Google — SEO inbyggt från start",
    description:
      "En hemsida som Google förstår: titlar, struktur, sitemap och snabb mobil. Grundläggande SEO ingår. Löpande innehåll efter behov.",
    eyebrow: "Sök & synlighet",
    h1: "Hemsida som syns på Google — utan tomma löften om plats 1",
    lead: "SEO börjar i hur sajten är byggd. Jag sätter titlar, rubriker, intern länkning och sitemap så Google kan indexera er. Sen kan ni bygga innehåll över tid — jag lovar inte mirakel overnight.",
    priceNote: `Grundläggande SEO ingår i varje paket. Fristående SEO-arbete från ${seoFrom} kr.`,
    contactPrefill: "Jag vill ha en hemsida som syns på Google",
    relatedServiceHref: "/tjanster/seo",
    relatedServiceLabel: "SEO",
    sections: [
      {
        heading: "Vad som faktiskt ingår när jag bygger",
        body: "En H1 per sida, unika titles och descriptions, logisk URL-struktur, sitemap, robots och sidor som är snabba på mobil. Det är grunden. Utan den hjälper ingen blogg i världen.",
      },
      {
        heading: "Vad SEO inte är hos mig",
        body: "Inga paket som lovar topp-3 på tre veckor. Konkurrens, innehåll och tid spelar roll. Jag säger rakt vilka sökord som är rimliga för er — och vilka som är slöseri.",
      },
    ],
    points: [
      {
        title: "Tekniken först",
        body: "Indexerbara sidor, canonical, intern länkning. Det ni kan kontrollera från dag ett.",
      },
      {
        title: "Sidor med ett sökord var",
        body: "Precis så som den här sajten är byggd: en tydlig sida per intention, inte en startsida som ska vinna allt.",
      },
      {
        title: "Innehåll sen",
        body: "Vill ni att jag skriver och publicerar löpande tar vi det som tillägg. Annars får ni en sajt ni kan fylla själva.",
      },
    ],
    faqs: [
      {
        q: "Syns vi direkt när sajten är live?",
        a: "Google hittar ofta nya sidor inom dagar till veckor. Ranking tar längre. Jag skickar in sitemap och ser till att inget blockerar.",
      },
      {
        q: "Ingår SEO i paketpriset?",
        a: "Ja, den tekniska grunden. Texter skrivna för specifika sökord och löpande publicering är extra.",
      },
      {
        q: "Kan du ta över SEO på en sajt vi redan har?",
        a: `Ja. Fristående SEO-arbete från ${seoFrom} kr beroende på utgångsläge. Jag börjar med vad som är trasigt tekniskt.`,
      },
      {
        q: "Gör du lokal SEO för en stad?",
        a: "Om ni säljer lokalt kan vi bygga sidor för det. Standard är att sajten ska gå att hitta på vad ni gör — i hela Sverige.",
      },
    ],
  },
  {
    slug: "hemsida-med-bokning",
    navLabel: "Hemsida med bokning",
    title: "Hemsida med bokningssystem — från " + bookingFrom + " kr extra",
    description:
      "Hemsida med tider, bekräftelser och kalender. Bokning som tillägg ovanpå fast paketpris. Byggd så kunden bokar utan att ringa.",
    eyebrow: "Bokning",
    h1: "Hemsida med bokning — kunden tar tiden själv",
    lead: "Salong, verkstad, konsult, vård. Jag bygger sajten och kopplar ett bokningsflöde: lediga tider, bekräftelse och kalender. Ni slutar jaga tider i mejlen.",
    priceNote: `Sajt från ${bas} kr. Bokningssystem från ${bookingFrom} kr som tillägg.`,
    contactPrefill: "Jag vill ha en hemsida med bokning",
    relatedServiceHref: "/paket",
    relatedServiceLabel: "Paket och tillägg",
    sections: [
      {
        heading: "Sajten och bokningen hör ihop",
        body: "En bokningsknapp som syns. Tjänster som går att förstå innan man väljer tid. Bekräftelse till kunden, kalender till er. Jag kopplar det ni redan använder om det är rätt — eller sätter upp något enklare.",
      },
      {
        heading: "Inte ett jättesystem om ni inte behöver det",
        body: "Många klarar sig med ett tydligt flöde och en kalenderkoppling. Behöver ni personal, resurser och påminnelser tar vi det i scopet så priset stämmer.",
      },
    ],
    points: [
      {
        title: "En väg till bokad tid",
        body: "Från startsidan till bekräftad slot utan att kunden tappar bort sig.",
      },
      {
        title: "Tillägg, inte överraskning",
        body: `Bokning från ${bookingFrom} kr ovanpå paketet. Ni ser det i offerten.`,
      },
      {
        title: "Mobil först",
        body: "De flesta bokar i telefonen mellan två ärenden. Flödet ska hålla där.",
      },
    ],
    faqs: [
      {
        q: "Kan ni koppla Google Calendar eller den kalender vi har?",
        a: "Ofta ja. Vilken väg som är rätt beror på hur ni jobbar — det tar vi innan jag bygger.",
      },
      {
        q: "Fungerar det för flera personer i teamet?",
        a: "Ja, när scopet säger det. Enmansbolag är enklare och billigare. Flera resurser prisas efter hur kalendern ser ut.",
      },
      {
        q: "Behöver jag en hel sajt, eller räcker en landningssida?",
        a: "Ibland räcker en sida plus bokning. Ibland vill ni ha om-oss och priser också. Jag säger vad jag hade gjort.",
      },
      {
        q: "Tar ni betalt i bokningen också?",
        a: "Kan ordnas. Kortbetalning i samband med bokning är ett extra steg — vi tar det bara om ni faktiskt behöver det.",
      },
    ],
  },
  {
    slug: "underhall-hemsida",
    navLabel: "Underhåll av hemsida",
    title: "Underhåll av hemsida — " + underhall + " kr/mån",
    description:
      "Månadsvis uppdatering, backup och småfixar efter lansering. Ingen anställd utvecklare. 3 månaders bindningstid.",
    eyebrow: "Efter lansering",
    h1: "Underhåll av hemsidan — så den inte stannar på lanseringsdagen",
    lead: "Texter som ska bytas, en knapp som strular, en ny sida. Jag tar det månadsvis så ni inte behöver jaga en frilansare varje gång något litet händer.",
    priceNote: `${underhall} kr/mån · 3 månaders bindningstid. Småfix och uppdateringar, inte nya jätteprojekt.`,
    contactPrefill: "Jag vill ha underhåll av hemsidan",
    relatedServiceHref: "/tjanster/underhall",
    relatedServiceLabel: "Underhåll",
    sections: [
      {
        heading: "Vad som ingår i planen",
        body: "Innehållsuppdateringar, småfix, backup-rutin och att sajten hålls igång. Ni skickar vad som ska ändras. Jag gör det utan att öppna en ny offert för varje mening.",
      },
      {
        heading: "Vad som inte är underhåll",
        body: "Ny e-handel, ny design från grunden eller ett bokningssystem hör hemma i ett projekt. Då säger jag till och ger ett pris — planen ska inte bli en slasktratt.",
      },
    ],
    points: [
      {
        title: "En kontakt",
        body: "Samma person som byggde sajten. Ingen ny byrå som ska sätta sig in i koden.",
      },
      {
        title: "Fast månadskostnad",
        body: `${underhall} kr. Ni vet vad det kostar. Ingen timdebitering för att byta ett telefonnummer.`,
      },
      {
        title: "Ni kan sluta",
        body: "Efter bindningstiden. Sajten är er. Ingen inlåsning för att få ut filerna.",
      },
    ],
    faqs: [
      {
        q: "Måste jag ha underhåll?",
        a: "Nej. 14 dagars support efter lansering ingår ändå. Planen är för er som vill ha löpande hjälp.",
      },
      {
        q: "Jag byggde inte sajten hos dig — kan du ta över?",
        a: "Ibland. Jag tittar på koden först. Är den byggd så jag kan jobba i den ger jag ett ja och ett pris. Annars är det ärligare att säga nej.",
      },
      {
        q: "Hur snabbt åtgärdar du saker?",
        a: "Inom ett par arbetsdagar för vanliga uppdateringar. Akuta fel prioriteras.",
      },
      {
        q: "Kan jag bara höra av mig ibland istället?",
        a: "Ja, då tar vi det som småjobb per gång. Planen lönar sig när det händer något varje månad.",
      },
    ],
  },
  {
    slug: "skradarsydd-hemsida",
    navLabel: "Skräddarsydd hemsida",
    title: "Skräddarsydd hemsida — inte en mall med er logga",
    description:
      "Skräddarsydd hemsida i React eller Next.js. Inga WordPress-teman. Fast pris, ni äger koden, byggd efter ert erbjudande.",
    eyebrow: "Från grunden",
    h1: "Skräddarsydd hemsida — ritad efter er, inte efter ett tema",
    lead: "Mallar ser likadana ut för att de är likadana. Jag designar och kodar från noll: typografi, struktur och flöde efter hur ni säljer. Ni betalar för en sajt, inte för en licens ni inte äger.",
    priceNote: `Från ${bas} kr. Samma paket — skillnaden är att inget är ett färdigt tema.`,
    contactPrefill: "Jag vill ha en skräddarsydd hemsida, inte en mall",
    relatedServiceHref: "/tjanster/webbdesign",
    relatedServiceLabel: "Webbdesign",
    sections: [
      {
        heading: "Vad skräddarsytt betyder här",
        body: "Jag utgår från ert erbjudande och er målgrupp. Färg och form följer varumärket — eller ett lugnt system om ni saknar ett. Koden skrivs för just den sajten, så den går att utveckla utan att slåss mot ett tema.",
      },
      {
        heading: "Vad ni slipper",
        body: "Plugin-krockar, tunga sidbyggare och en admin som ser ut som någon annans. Och känslan att fem konkurrenter har samma startsida med annan logga.",
      },
    ],
    points: [
      {
        title: "React eller Next.js",
        body: "Modern teknik som är snabb och enkel att lämna över. Inte WordPress med 30 tillägg.",
      },
      {
        title: "Ni äger filerna",
        body: "Ingen månadsavgift för temat. Imorgon kan en annan utvecklare ta vid.",
      },
      {
        title: "Fast pris ändå",
        body: "Skräddarsytt betyder inte timdebitering. Scope och pris först.",
      },
    ],
    faqs: [
      {
        q: "Blir det inte dyrare än en mall?",
        a: `Mina paket börjar på ${bas} kr. En “billig” mall blir ofta dyr när ni ska laga den. Här är priset klart och sajten er.`,
      },
      {
        q: "Kan vi ha en enkel admin ändå?",
        a: "Ja, i Premium och uppåt. Admin är för innehåll — inte ett tema ni måste förstå.",
      },
      {
        q: "Har du färdiga stilar vi får välja mellan?",
        a: "Nej. Vi utgår från er. Har ni redan färg och typsnitt använder jag det. Annars tar jag fram ett uttryck som håller på hela sajten.",
      },
      {
        q: "Gör du bara design, eller kod också?",
        a: "Båda. Samma person. Det ni godkänt i strukturen är det som publiceras.",
      },
    ],
  },
  {
    slug: "hemsida-design",
    navLabel: "Hemsidedesign",
    title: "Hemsidedesign — uttryck som går att bygga",
    description:
      "Webbdesign för hemsidor: typografi, färg, layout och komponenter. Inte en mall. Designpass från " +
      designFrom +
      " kr, eller ingår när jag bygger sajten.",
    eyebrow: "Design",
    h1: "Hemsidedesign som besökaren förstår — och jag kan koda",
    lead: "Design är hur någon fattar er på tre sekunder. Jag tar fram ett uttryck som är konsekvent genom hela sajten, med läsbarhet och en tydlig nästa knapp — inte dekoration för sakens skull.",
    priceNote: `Designpass från ${designFrom} kr. När jag bygger hela sajten ingår designen i paketet.`,
    contactPrefill: "Jag vill ha design till hemsidan",
    relatedServiceHref: "/tjanster/webbdesign",
    relatedServiceLabel: "Webbdesign",
    sections: [
      {
        heading: "Design som hänger ihop med koden",
        body: "Jag ritar inte något som sen ska “tolkas” av någon annan. Samma person som sätter typografin skriver komponenterna. Därför blir det ni sett också det som går live.",
      },
      {
        heading: "När ni bara behöver design",
        body: "Har ni redan en utvecklare kan jag ta ett designpass: sidor, tillstånd, mobil. Har ni ingen — bygg paketet och få båda.",
      },
    ],
    points: [
      {
        title: "Hierarki först",
        body: "Rubrik, stödtext, knapp. Besökaren ska veta var ögat ska ta vägen.",
      },
      {
        title: "Ert varumärke, eller ett lugnt system",
        body: "Finns färg och logga använder jag det. Annars ett stramt uttryck som inte ser ut som en mall.",
      },
      {
        title: "Redo för mobil",
        body: "Layouten ritas för telefonen, inte bara skalas ner från desktop.",
      },
    ],
    faqs: [
      {
        q: "Får vi Figma-filer?",
        a: "När det är ett rent designuppdrag ja. När jag också kodar är den levande sajten leveransen — filer efter behov.",
      },
      {
        q: "Gör du logotyp också?",
        a: "Enkel wordmark eller symbol för webben finns som tillägg från 999 kr. En stor varumärkesprocess är ett annat uppdrag.",
      },
      {
        q: "Kan du rita om en sajt vi redan har?",
        a: "Ja. Då är det oftast redesign: behåll det som funkar, byt det som skadar förtroendet.",
      },
      {
        q: "Hur många referensvarv ingår?",
        a: "Vi stämmer av längs vägen. Inte oändliga varv — jag säger när något är utanför scopet.",
      },
    ],
  },
  {
    slug: "hemsida-med-admin",
    navLabel: "Hemsida med admin",
    title: "Hemsida med admin-panel — uppdatera själva",
    description:
      "Hemsida där ni byter texter och bilder utan utvecklare. Admin ingår i Premium från " +
      premium +
      " kr. Byggd från grunden, ni äger koden.",
    eyebrow: "Admin",
    h1: "Hemsida med admin — ni ändrar innehållet, jag har byggt resten",
    lead: "Inte alla behöver en admin. Men när ni byter priser, personal eller nyheter varje månad ska ni inte mejla en utvecklare. Premium och uppåt får en enkel panel för det som faktiskt ändras.",
    priceNote: `Premium ${premium} kr (upp till 15 sidor + admin). Full Service ${full} kr när det är mer.`,
    contactPrefill: "Jag vill ha en hemsida vi kan uppdatera själva",
    relatedServiceHref: "/paket",
    relatedServiceLabel: "Paket",
    sections: [
      {
        heading: "Admin för innehåll — inte ett tema",
        body: "Ni ska kunna byta en rubrik, en bild, en sida. Inte råka slå sönder layouten. Jag sätter panelen runt det ni faktiskt rör, inte runt hundra fält ni aldrig använder.",
      },
      {
        heading: "När admin är överkill",
        body: "En landningssida som står still i ett år behöver ingen panel. Då är Bas + en underhållsplan oftast lugnare och billigare.",
      },
    ],
    points: [
      {
        title: "En kort genomgång",
        body: "Vid överlämning visar jag var ni klickar. Inget 40-sidors manual.",
      },
      {
        title: "Ni äger den",
        body: "Inget hyrt CMS ni förlorar om ni slutar betala någon byrå.",
      },
      {
        title: "Jag kan fortfarande hjälpa till",
        body: "Större grejer och strul tar underhållsplanen. Admin tar vardagen.",
      },
    ],
    faqs: [
      {
        q: "Ingår admin i billigaste paketet?",
        a: `Bas (${bas} kr) är utan panel. Premium (${premium} kr) har admin. Behöver ni bara Bas plus en enstaka uppdatering ibland räcker underhåll.`,
      },
      {
        q: "Kan flera personer ha inlogg?",
        a: "Ja. Vi sätter de konton ni behöver vid lansering.",
      },
      {
        q: "Kan vi råka ta ner sajten?",
        a: "Panelen är avgränsad. Inget “radera hela temat”-läge. Tar ni bort en bild försvinner bilden — inte sajten.",
      },
      {
        q: "Fungerar det i mobilen?",
        a: "Att redigera är enklast i dator. Sajten ni publicerar är självklart mobil.",
      },
    ],
  },
];

export function getSeoLanding(slug: string): SeoLanding | undefined {
  return seoLandings.find((l) => l.slug === slug);
}

export function otherSeoLandings(slug: string): SeoLanding[] {
  return seoLandings.filter((l) => l.slug !== slug);
}
