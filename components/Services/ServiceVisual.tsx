import type { ReactNode } from "react";
import { ChevronRight, Lock, Search } from "lucide-react";

/**
 * En liten skiss per tjänst, ritad i ren markup. Skisserna är abstrakta och
 * visar bara sådant som står i tjänstens egen text i lib/services.ts — inga
 * siffror, kundnamn eller påhittade resultat. Nyckeln matchar service.slug.
 */

/** En rad "text" i en skiss. */
function Bar({ className = "" }: { className?: string }) {
  return <span className={`block h-2 rounded-sm bg-white/15 ${className}`} />;
}

/** Webbläsarfönster som ram runt en sidskiss. */
function Window({ children }: { children: ReactNode }) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-white/15 bg-night-raised">
      <div className="flex gap-1.5 border-b border-white/10 px-3 py-2.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/25" />
        ))}
      </div>
      {children}
    </div>
  );
}

/** Rad med etikett till vänster och skissad del till höger. */
function Zone({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] items-center gap-3 border-t border-white/10 py-4 first:border-t-0">
      <span className="text-xs font-medium text-brand-glow">{label}</span>
      <div>{children}</div>
    </div>
  );
}

function Node({
  children,
  active = false,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={`block rounded-md px-3 py-2 text-center text-xs font-medium text-white ${
        active ? "bg-brand" : "border border-white/20 bg-night-raised"
      }`}
    >
      {children}
    </span>
  );
}

const months = [
  "jan", "feb", "mar", "apr", "maj", "jun",
  "jul", "aug", "sep", "okt", "nov", "dec",
];

const visuals: Record<string, { caption: string; art: ReactNode }> = {
  landningssidor: {
    caption: "Skiss: ett erbjudande, en huvudknapp, ett formulär.",
    art: (
      <Window>
        <div className="px-4">
          <Zone label="Erbjudande">
            <Bar className="h-3 w-4/5 bg-white/45" />
            <Bar className="mt-2 w-3/5" />
          </Zone>
          <Zone label="En huvudknapp">
            <span className="block h-8 w-28 rounded-md bg-brand" />
          </Zone>
          <Zone label="Formulär">
            <span className="block h-7 rounded-md border border-white/20" />
            <span className="mt-2 block h-7 rounded-md border border-white/20" />
          </Zone>
        </div>
      </Window>
    ),
  },

  foretagssajter: {
    caption: "Skiss: sajtens struktur. Vad ni gör, vilka ni är, hur man når er.",
    art: (
      <div className="w-full">
        <div className="mx-auto w-24">
          <Node active>Start</Node>
        </div>
        <span className="mx-auto block h-6 w-px bg-white/25" />
        <span className="mx-[16.67%] block h-px bg-white/25" />
        <div className="grid grid-cols-3 gap-2">
          {["Vad ni gör", "Vilka ni är", "Kontakt"].map((label) => (
            <div key={label} className="flex flex-col items-center">
              <span className="block h-6 w-px bg-white/25" />
              <div className="w-full">
                <Node>{label}</Node>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  "e-handel": {
    caption: "Skiss: köpflödet i tre steg.",
    art: (
      <div className="flex w-full items-stretch gap-1">
        <div className="flex-1">
          <div className="h-28 rounded-lg border border-white/15 bg-night-raised p-3">
            <span className="block h-12 rounded-sm bg-white/15" />
            <Bar className="mt-3 w-4/5 bg-white/40" />
            <Bar className="mt-2 w-1/2" />
          </div>
          <p className="mt-3 text-xs font-medium text-brand-glow">Produkt</p>
        </div>
        <ChevronRight className="mt-12 h-4 w-4 shrink-0 text-white/40" />
        <div className="flex-1">
          <div className="h-28 rounded-lg border border-white/15 bg-night-raised p-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="mb-3 flex items-center gap-2">
                <span className="h-4 w-4 shrink-0 rounded-sm bg-white/15" />
                <Bar className="grow" />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs font-medium text-brand-glow">Varukorg</p>
        </div>
        <ChevronRight className="mt-12 h-4 w-4 shrink-0 text-white/40" />
        <div className="flex-1">
          <div className="flex h-28 flex-col rounded-lg border border-white/15 bg-night-raised p-3">
            <span className="block h-5 rounded-sm border border-white/20" />
            <span className="mt-2 block h-5 rounded-sm border border-white/20" />
            <span className="mt-auto block h-6 rounded-md bg-brand" />
          </div>
          <p className="mt-3 text-xs font-medium text-brand-glow">Kassa</p>
        </div>
      </div>
    ),
  },

  webbdesign: {
    caption: "Skiss: typografi, färg och komponenter i ett system.",
    art: (
      <div className="w-full">
        <Zone label="Typografi">
          <span className="block text-5xl leading-none font-semibold tracking-tighter text-white">
            Aa
          </span>
        </Zone>
        <Zone label="Färg">
          <span className="flex gap-2">
            <span className="h-8 w-8 rounded-md bg-brand" />
            <span className="h-8 w-8 rounded-md bg-brand-glow" />
            <span className="h-8 w-8 rounded-md bg-accent" />
            <span className="h-8 w-8 rounded-md bg-canvas" />
          </span>
        </Zone>
        <Zone label="Komponenter">
          <span className="flex gap-2">
            <span className="h-8 w-24 rounded-md bg-brand" />
            <span className="h-8 w-20 rounded-md border border-white/30" />
          </span>
        </Zone>
      </div>
    ),
  },

  redesign: {
    caption: "Skiss: samma innehåll, före och efter.",
    art: (
      <div className="grid w-full grid-cols-2 gap-3">
        <div>
          <div className="h-36 rounded-lg border border-dashed border-white/20 p-3">
            <Bar className="w-11/12" />
            <Bar className="mt-1.5 ml-4 w-2/3" />
            <Bar className="mt-1.5 w-full" />
            <Bar className="mt-1.5 ml-2 w-1/2" />
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="h-4 w-10 rounded-sm bg-white/20" />
              <span className="h-4 w-8 rounded-sm bg-white/20" />
              <span className="h-4 w-12 rounded-sm bg-white/20" />
              <span className="h-4 w-9 rounded-sm bg-white/20" />
            </div>
            <Bar className="mt-3 w-3/4" />
          </div>
          <p className="mt-3 text-xs font-medium text-white/70">Före</p>
        </div>
        <div>
          <div className="flex h-36 flex-col rounded-lg border border-white/20 bg-night-raised p-3">
            <Bar className="h-3 w-4/5 bg-white/45" />
            <Bar className="mt-2.5 w-3/5" />
            <span className="mt-auto block h-7 w-20 rounded-md bg-brand" />
          </div>
          <p className="mt-3 text-xs font-medium text-brand-glow">Efter</p>
        </div>
      </div>
    ),
  },

  seo: {
    caption:
      "Så ser en träff ut i ett sökresultat. Titel och adress är den här sajtens egna.",
    art: (
      <div className="w-full">
        <div className="flex items-center gap-2 rounded-md border border-white/20 px-3 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-white/50" />
          <Bar className="w-2/5" />
        </div>
        <div className="mt-4 rounded-lg bg-surface p-4">
          <p className="font-mono text-xs text-muted">www.isakweb.se</p>
          <p className="mt-1.5 text-[0.9375rem] leading-snug font-semibold text-brand">
            IsakWeb — Hemsidor åt svenska företag
          </p>
          <span className="mt-3 block h-2 rounded-sm bg-line-cool" />
          <span className="mt-1.5 block h-2 w-4/5 rounded-sm bg-line-cool" />
        </div>
        <div className="mt-3 px-4 opacity-60">
          <Bar className="w-1/4" />
          <Bar className="mt-2 h-3 w-3/5 bg-white/25" />
        </div>
      </div>
    ),
  },

  prestanda: {
    caption: "Illustration, inte ett mätvärde.",
    art: (
      <div className="w-full max-w-64">
        <svg viewBox="0 0 200 112" fill="none" className="w-full">
          <path
            d="M20 100 A80 80 0 0 1 180 100"
            strokeWidth="10"
            strokeLinecap="round"
            className="stroke-white/15"
          />
          <path
            d="M140 30.7 A80 80 0 0 1 180 100"
            strokeWidth="10"
            strokeLinecap="round"
            className="stroke-brand"
          />
          <path
            d="M100 100 147.5 60.1"
            strokeWidth="3"
            strokeLinecap="round"
            className="stroke-white"
          />
          <circle cx="100" cy="100" r="6" className="fill-white" />
        </svg>
        <div className="mt-2 flex justify-between text-xs font-medium">
          <span className="text-white/70">Trög</span>
          <span className="text-brand-glow">Snabb</span>
        </div>
      </div>
    ),
  },

  hosting: {
    caption: "Skiss: från domän till publicerad sajt med HTTPS.",
    art: (
      <div className="w-full">
        <div className="flex items-center gap-2 rounded-md border border-white/20 bg-night-raised px-3 py-2.5">
          <Lock className="h-4 w-4 shrink-0 text-brand-glow" />
          <span className="font-mono text-xs text-white/80">
            https://er-domän.se
          </span>
        </div>
        <div className="relative mt-8 grid grid-cols-4">
          <span className="absolute top-1.5 right-[12.5%] left-[12.5%] h-px bg-white/25" />
          {["Domän", "DNS", "SSL", "Live"].map((step, i) => (
            <div key={step} className="relative flex flex-col items-center">
              <span
                className={`h-3 w-3 rounded-full ${
                  i === 3 ? "bg-brand ring-2 ring-brand-glow" : "bg-white/60"
                }`}
              />
              <span
                className={`mt-3 text-xs font-medium ${
                  i === 3 ? "text-brand-glow" : "text-white/70"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  underhall: {
    caption: "Skiss: uppdateringar varje månad, året om.",
    art: (
      <div className="grid w-full grid-cols-6 gap-2">
        {months.map((month) => (
          <div
            key={month}
            className="flex flex-col items-center gap-2 rounded-md border border-white/15 bg-night-raised py-3"
          >
            <span className="font-mono text-[0.6875rem] text-white/70">{month}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-glow" />
          </div>
        ))}
      </div>
    ),
  },

  "api-integrationer": {
    caption: "Skiss: sajten kopplad till verktyg ni redan använder.",
    art: (
      <div className="grid h-44 w-full grid-cols-[1fr_3rem_1fr] items-stretch sm:grid-cols-[1fr_5rem_1fr]">
        <div className="flex items-center">
          <div className="w-full">
            <Node active>Er sajt</Node>
          </div>
        </div>
        {/* Linjerna möter nodernas mittpunkter: 1/6, 3/6 och 5/6 av höjden. */}
        <svg
          viewBox="0 0 100 120"
          preserveAspectRatio="none"
          fill="none"
          className="h-full w-full stroke-white/35"
        >
          <path d="M0 60 C50 60 50 20 100 20" vectorEffect="non-scaling-stroke" />
          <path d="M0 60 H100" vectorEffect="non-scaling-stroke" />
          <path d="M0 60 C50 60 50 100 100 100" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="grid grid-rows-3">
          {["CRM", "Bokning", "Betalning"].map((tool) => (
            <div key={tool} className="flex items-center">
              <div className="w-full">
                <Node>{tool}</Node>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  "ai-integrationer": {
    caption: "Skiss: en fråga, ett svar, inom ramar ni sätter.",
    art: (
      <div className="relative w-full rounded-lg border border-dashed border-brand-glow/50 px-4 pt-7 pb-4">
        <span className="absolute -top-2.5 left-3 bg-night px-2 text-xs font-medium text-brand-glow">
          Gränser ni bestämmer
        </span>
        <div className="ml-auto w-3/5">
          <div className="rounded-lg rounded-br-sm bg-brand p-3">
            <Bar className="bg-white/70" />
            <Bar className="mt-2 w-2/3 bg-white/70" />
          </div>
          <p className="mt-2 text-right text-xs font-medium text-white/70">Fråga</p>
        </div>
        <div className="mt-2 w-3/4">
          <div className="rounded-lg rounded-bl-sm border border-white/15 bg-night-raised p-3">
            <Bar className="bg-white/35" />
            <Bar className="mt-2 w-11/12 bg-white/35" />
            <Bar className="mt-2 w-1/2 bg-white/35" />
          </div>
          <p className="mt-2 text-xs font-medium text-brand-glow">Svar</p>
        </div>
      </div>
    ),
  },

  "skradarsydda-system": {
    caption: "Skiss: inloggad yta med meny och lista.",
    art: (
      <Window>
        <div className="grid grid-cols-[4rem_1fr]">
          <div className="space-y-3 border-r border-white/10 p-3">
            <Bar className="bg-brand-glow" />
            <Bar />
            <Bar />
            <Bar className="w-2/3" />
          </div>
          <div className="p-3">
            <div className="flex items-center justify-between gap-3">
              <Bar className="h-3 w-1/3 bg-white/45" />
              <span className="h-6 w-16 rounded-md bg-brand" />
            </div>
            <div className="mt-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 border-t border-white/10 py-2.5"
                >
                  <span className="h-3 w-3 shrink-0 rounded-sm bg-white/20" />
                  <Bar className="grow" />
                  <Bar className="w-1/5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Window>
    ),
  },
};

export function ServiceVisual({ slug }: { slug: string }) {
  const visual = visuals[slug];
  if (!visual) return null;

  return (
    <figure className="rounded-xl bg-night p-5 shadow-lift sm:p-8">
      <div
        aria-hidden="true"
        className="flex min-h-56 items-center justify-center sm:min-h-64"
      >
        {visual.art}
      </div>
      <figcaption className="mt-6 border-t border-white/15 pt-4 text-sm text-white/70">
        {visual.caption}
      </figcaption>
    </figure>
  );
}
