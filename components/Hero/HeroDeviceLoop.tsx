"use client";

import { useEffect, useState } from "react";

/**
 * Hero-signaturen: en pur-React device-loop som skriver JSX på en laptop-
 * skärm, cross-fadear till en renderad preview, morphar hela chassit från
 * laptop → telefon och tillbaka. Ingen stock-video, inget lib — bara
 * CSS-transitions + tid.
 *
 * Signalen: "jag är personen som skriver koden. Jag bygger både desktop-
 * och mobil-versionen." Det är själva pitchen, inte dekoration.
 *
 * Reduced-motion: hoppa animationen, visa en stilla laptop med kod klar
 * + preview cross-faded. Ingen loop, ingen morph.
 */

// --- Kod-innehållet på laptop-skärmen -------------------------------------
// Riktig JSX från vår Hero, tokenized med color-classes i förhand så vi
// slipper köra en tokenizer på varje render.

type Span = { text: string; className?: string };
type Line = Span[];

const CLS = {
  keyword: "text-fuchsia-300/85",
  tag: "text-sky-300/85",
  attr: "text-fuchsia-200/70",
  str: "text-emerald-300/85",
  punct: "text-white/45",
  ident: "text-brand-glow",
  comment: "text-white/30 italic",
};

const LINES: Line[] = [
  [
    { text: "// components/Hero/Hero.tsx", className: CLS.comment },
  ],
  [
    { text: "export ", className: CLS.keyword },
    { text: "function ", className: CLS.keyword },
    { text: "Hero", className: CLS.ident },
    { text: "() {" },
  ],
  [{ text: "  return (" }],
  [
    { text: "    <", className: CLS.punct },
    { text: "section", className: CLS.tag },
    { text: " id=", className: CLS.attr },
    { text: '"hero"', className: CLS.str },
    { text: ">", className: CLS.punct },
  ],
  [
    { text: "      <", className: CLS.punct },
    { text: "h1", className: CLS.tag },
    { text: ">Hej. Jag är Isak.</", className: CLS.punct },
    { text: "h1", className: CLS.tag },
    { text: ">", className: CLS.punct },
  ],
  [
    { text: "      <", className: CLS.punct },
    { text: "p", className: CLS.tag },
    { text: ">Jag bygger hemsidor</", className: CLS.punct },
    { text: "p", className: CLS.tag },
    { text: ">", className: CLS.punct },
  ],
  [
    { text: "      <", className: CLS.punct },
    { text: "a ", className: CLS.tag },
    { text: "href=", className: CLS.attr },
    { text: '"/kontakt"', className: CLS.str },
    { text: ">Hör av dig</", className: CLS.punct },
    { text: "a", className: CLS.tag },
    { text: ">", className: CLS.punct },
  ],
  [
    { text: "    </", className: CLS.punct },
    { text: "section", className: CLS.tag },
    { text: ">", className: CLS.punct },
  ],
  [{ text: "  );" }],
  [{ text: "}" }],
];

const TOTAL_CHARS = LINES.reduce(
  (sum, line) => sum + line.reduce((s, span) => s + span.text.length, 0),
  0,
);

// --- Phase machine --------------------------------------------------------
// Ett fixerat kretslopp: typewriter → paus → cross-fade → morph → paus → …

type Phase =
  | "typing"
  | "codeHold"
  | "toPreview"
  | "previewLaptop"
  | "toPhone"
  | "previewPhone"
  | "toLaptop"
  | "toCode";

const PHASE_MS: Record<Phase, number> = {
  typing: 4200,
  codeHold: 900,
  toPreview: 550,
  previewLaptop: 1500,
  toPhone: 1100,
  previewPhone: 2200,
  toLaptop: 1100,
  toCode: 550,
};

const NEXT: Record<Phase, Phase> = {
  typing: "codeHold",
  codeHold: "toPreview",
  toPreview: "previewLaptop",
  previewLaptop: "toPhone",
  toPhone: "previewPhone",
  previewPhone: "toLaptop",
  toLaptop: "toCode",
  toCode: "typing",
};

// Fas-grupper som förenklar villkoren i render.
const PHONE_PHASES = new Set<Phase>(["toPhone", "previewPhone", "toLaptop"]);
const PREVIEW_VISIBLE = new Set<Phase>([
  "toPreview",
  "previewLaptop",
  "toPhone",
  "previewPhone",
  "toLaptop",
  "toCode",
]);

// --- Selv-komponenten -----------------------------------------------------

export function HeroDeviceLoop() {
  const [phase, setPhase] = useState<Phase>("typing");
  const [chars, setChars] = useState(0);
  const [reduced, setReduced] = useState(false);

  // Respektera prefers-reduced-motion. Vi skippar animationen helt då —
  // ren stillbild av laptop + kod + preview cross-faded.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Driva phase-cykeln.
  useEffect(() => {
    if (reduced) return;
    const id = setTimeout(() => setPhase((p) => NEXT[p]), PHASE_MS[phase]);
    return () => clearTimeout(id);
  }, [phase, reduced]);

  // Typewriter: bara aktivt i 'typing'-fasen. Vid övriga faser sätter vi
  // chars till TOTAL_CHARS (kod komplett) eller 0 beroende på var i loopen
  // vi är, så resten av view håller sig konsistent.
  useEffect(() => {
    if (reduced) {
      setChars(TOTAL_CHARS);
      return;
    }
    if (phase === "typing") {
      setChars(0);
      const step = Math.max(20, Math.floor(PHASE_MS.typing / TOTAL_CHARS));
      const id = setInterval(() => {
        setChars((c) => (c < TOTAL_CHARS ? c + 1 : c));
      }, step);
      return () => clearInterval(id);
    }
    if (phase === "codeHold" || phase === "toPreview") {
      setChars(TOTAL_CHARS);
    }
  }, [phase, reduced]);

  const isPhone = PHONE_PHASES.has(phase);
  const previewOpacity = PREVIEW_VISIBLE.has(phase) ? 1 : 0;

  // Chassi-dimensioner. Vi transitionerar bredd/höjd/radie direkt istället
  // för aspect-ratio (aspect-ratio går inte att interpolera i CSS än).
  const frameW = isPhone ? "10.5rem" : "26rem";
  const frameH = isPhone ? "20.5rem" : "16.25rem";
  const frameRadius = isPhone ? "2rem" : "0.85rem";

  return (
    <div
      className="pointer-events-none relative flex w-full items-center justify-center"
      aria-hidden="true"
    >
      {/* Dov bronsradial bakom chassit — enda dekorationen. Ger devicet luft
          mot den mörka heron utan att bli en glow-explosion. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 45%, rgba(196,165,116,0.22) 0%, rgba(28,25,23,0) 65%)",
        }}
      />

      {/* Chassit. Alla morph-transitions ligger här. */}
      <div
        className="relative overflow-hidden border border-white/[0.08] bg-[#111014] shadow-[0_28px_80px_-30px_rgba(0,0,0,0.75)]"
        style={{
          width: frameW,
          height: frameH,
          borderRadius: frameRadius,
          transition: reduced
            ? "none"
            : "width 1050ms cubic-bezier(0.65,0.05,0.36,1), height 1050ms cubic-bezier(0.65,0.05,0.36,1), border-radius 1050ms cubic-bezier(0.65,0.05,0.36,1)",
        }}
      >
        {/* Chrome-top: laptop = tunn browser-bar; phone = liten pill-notch */}
        <div
          className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02]"
          style={{
            height: isPhone ? "1.25rem" : "1.35rem",
            paddingLeft: isPhone ? "0.6rem" : "0.7rem",
            paddingRight: isPhone ? "0.6rem" : "0.7rem",
            justifyContent: isPhone ? "center" : "flex-start",
            transition: reduced ? "none" : "all 900ms ease",
          }}
        >
          {isPhone ? (
            <span className="h-1 w-8 rounded-full bg-white/25" />
          ) : (
            <>
              {/* Tre neutrala prickar — inte macOS-röd/gul/grön, vi kör dov
                  brons/muted istället för att undvika Mac-clone-läsningen. */}
              <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
              <span className="ml-3 h-[0.42rem] flex-1 rounded-sm bg-white/[0.06]" />
            </>
          )}
        </div>

        {/* Skärm-yta. Både kod-view och preview läggs som två absolut-lager
            som cross-fadear via opacity. */}
        <div className="relative h-[calc(100%-1.35rem)] w-full">
          {/* Kod-view */}
          <div
            className="absolute inset-0"
            style={{
              opacity: 1 - previewOpacity,
              transition: reduced ? "none" : "opacity 500ms ease",
            }}
          >
            <CodeView shownChars={chars} showCursor={phase === "typing" || phase === "codeHold"} />
          </div>

          {/* Preview-view */}
          <div
            className="absolute inset-0"
            style={{
              opacity: previewOpacity,
              transition: reduced ? "none" : "opacity 500ms ease",
            }}
          >
            <PreviewView compact={isPhone} reduced={reduced} />
          </div>
        </div>

        {/* Phone bottom-indicator — bara på phone. */}
        {isPhone ? (
          <div className="absolute right-0 bottom-1.5 left-0 mx-auto h-[3px] w-14 rounded-full bg-white/30" />
        ) : null}
      </div>
    </div>
  );
}

// --- Kod-view (typewriter) ------------------------------------------------

function CodeView({ shownChars, showCursor }: { shownChars: number; showCursor: boolean }) {
  let remaining = shownChars;
  let cursorPlaced = false;

  return (
    <pre
      className="h-full w-full overflow-hidden bg-[#0a0a0d] px-3.5 py-2.5 font-mono text-[0.62rem] leading-[1.55] text-white/80"
      style={{ margin: 0 }}
    >
      {LINES.map((line, li) => {
        const spans: React.ReactNode[] = [];
        for (let si = 0; si < line.length; si++) {
          const span = line[si];
          if (remaining <= 0) break;
          const shown = Math.min(span.text.length, remaining);
          spans.push(
            <span key={si} className={span.className}>
              {span.text.slice(0, shown)}
            </span>,
          );
          remaining -= shown;
        }
        // Placera cursorn direkt efter senast skrivna tecken på rätt rad.
        const lineTotal = line.reduce((s, sp) => s + sp.text.length, 0);
        const isCursorLine =
          !cursorPlaced && (remaining <= 0 || spans.length === line.length);
        if (
          showCursor &&
          !cursorPlaced &&
          spans.length > 0 &&
          (lineTotal > 0 ? true : false)
        ) {
          // Vi taggar cursorn på nuvarande rad om detta är sista raden med
          // synligt innehåll. En enkel heuristik: kom ihåg om nästa iteration
          // också får text — annars är detta cursor-raden.
          const rendered = spans.length > 0;
          if (rendered && (remaining <= 0 || li === LINES.length - 1)) {
            spans.push(<Cursor key="cursor" />);
            cursorPlaced = true;
          }
        }
        return (
          <div key={li}>
            {spans.length === 0 ? <span>&nbsp;</span> : spans}
          </div>
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        void isCursorLine;
      })}
    </pre>
  );
}

function Cursor() {
  return (
    <span
      aria-hidden="true"
      className="ml-[1px] inline-block h-[0.72em] w-[0.42em] translate-y-[0.13em] bg-brand-glow/85"
      style={{ animation: "hero-caret 1s steps(2, jump-none) infinite" }}
    />
  );
}

// --- Preview-view ---------------------------------------------------------
// En simplifierad rendering av vår faktiska hero — samma copy, samma CTA-
// hierarki, samma bronsaccent. Reflowar mellan laptop/phone via padding/
// text-storlek istället för att bytas ut helt.

function PreviewView({ compact, reduced }: { compact: boolean; reduced: boolean }) {
  const transition = reduced ? "none" : "padding 900ms ease, gap 900ms ease";

  return (
    <div
      className="flex h-full w-full flex-col bg-ink text-white"
      style={{
        padding: compact ? "0.85rem 0.75rem" : "1.35rem 1.5rem",
        gap: compact ? "0.5rem" : "0.75rem",
        transition,
      }}
    >
      {/* Mini top-row */}
      <div
        className="flex items-center justify-between text-[0.5rem] tracking-wider text-white/50 uppercase"
        style={{ fontSize: compact ? "0.42rem" : "0.5rem" }}
      >
        <span>Isak Web</span>
        <span className="text-brand-glow">Hör av dig</span>
      </div>

      {/* Eyebrow */}
      <div
        className="mt-1 text-brand-glow/80"
        style={{ fontSize: compact ? "0.38rem" : "0.46rem", letterSpacing: "0.14em" }}
      >
        <span
          className="mr-1 inline-block rounded-full bg-brand-glow/80 align-middle"
          style={{ width: compact ? "0.16rem" : "0.2rem", height: compact ? "0.16rem" : "0.2rem" }}
        />
        WEBBUTVECKLING
      </div>

      {/* Rubrik */}
      <div
        className="font-serif font-semibold text-white"
        style={{
          fontSize: compact ? "1rem" : "1.65rem",
          lineHeight: compact ? "1.1" : "1.05",
          transition,
        }}
      >
        Hej. Jag är Isak.
      </div>

      {/* Underrubrik */}
      <div
        className="text-white/70"
        style={{
          fontSize: compact ? "0.5rem" : "0.7rem",
          lineHeight: "1.4",
          transition,
        }}
      >
        Jag bygger hemsidor{compact ? " " : "\u00A0"}
        åt svenska företag.
      </div>

      {/* CTA-par */}
      <div className="mt-auto flex items-center" style={{ gap: compact ? "0.35rem" : "0.5rem" }}>
        <span
          className="rounded bg-white font-semibold text-ink"
          style={{
            fontSize: compact ? "0.5rem" : "0.6rem",
            padding: compact ? "0.28rem 0.55rem" : "0.4rem 0.8rem",
            transition,
          }}
        >
          Ring mig
        </span>
        <span
          className="rounded border border-white/50 font-semibold text-white"
          style={{
            fontSize: compact ? "0.5rem" : "0.6rem",
            padding: compact ? "0.28rem 0.55rem" : "0.4rem 0.8rem",
            transition,
          }}
        >
          Boka samtal
        </span>
      </div>
    </div>
  );
}
