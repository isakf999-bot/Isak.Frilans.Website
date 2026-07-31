"use client";

import { useCallback, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";

/**
 * Interaktiv före/efter-jämförelse. Dra i reglaget så förvandlas en förlegad
 * sajt till en modern. Talar direkt till kunden som vill uppdatera sin gamla
 * hemsida — och visar hantverket i praktiken i stället för att bara påstå det.
 *
 * Båda vyerna är ren HTML/CSS (inga bilder). "Efter" ligger överst och klipps
 * till vänster andel via clip-path; positionen styrs av pekare eller piltangenter.
 */
export function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(52);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(97, Math.max(3, next)));
  }, []);

  const onPointerDown = (event: React.PointerEvent) => {
    dragging.current = true;
    containerRef.current?.setPointerCapture(event.pointerId);
    setFromClientX(event.clientX);
  };
  const onPointerMove = (event: React.PointerEvent) => {
    if (dragging.current) setFromClientX(event.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPos((p) => Math.max(3, p - 4));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setPos((p) => Math.min(97, p + 4));
    }
  };

  return (
    <section
      className="scroll-mt-24 border-t border-line bg-canvas"
      aria-labelledby="forvandling-rubrik"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <SectionLabel>Se förvandlingen</SectionLabel>
          <h2 id="forvandling-rubrik" className="mt-6 text-h2">
            Din gamla sajt förtjänar bättre.
          </h2>
          <p className="mt-5 text-lead text-muted">
            Har du en hemsida som känns fast i ett tidigare årtionde? Dra i
            reglaget och se vad samma företag kan se ut som i stället.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={80}>
          <div
            ref={containerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="relative aspect-[16/10] w-full touch-none overflow-hidden rounded-xl border border-line bg-surface shadow-lift select-none sm:aspect-[16/9]"
          >
            {/* EFTER ligger underst i DOM men visas överst till vänster via clip. */}
            <div className="absolute inset-0">
              <OldSiteMock />
            </div>
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <NewSiteMock />
            </div>

            {/* Etiketter — utanför klippet så båda alltid syns. */}
            <span className="pointer-events-none absolute left-3 top-3 rounded-pill bg-brand px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white uppercase shadow-brand">
              Efter
            </span>
            <span className="pointer-events-none absolute right-3 top-3 rounded-pill bg-ink/80 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
              Innan
            </span>

            {/* Delare + handtag */}
            <div
              className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-surface/90 shadow-[0_0_0_1px_color-mix(in_srgb,var(--palette-ink)_12%,transparent)]"
              style={{ left: `${pos}%` }}
            >
              <button
                type="button"
                role="slider"
                tabIndex={0}
                aria-label="Dra för att jämföra före och efter"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pos)}
                onKeyDown={onKeyDown}
                className="pointer-events-auto absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-line bg-surface text-ink shadow-lift transition-transform duration-200 ease-out hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-95"
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  ⟺
                </span>
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal
          className="mt-6 flex items-center justify-center gap-2 text-sm text-muted"
          delay={120}
        >
          <span aria-hidden="true">←</span>
          Dra i reglaget
          <span aria-hidden="true">→</span>
        </Reveal>
      </div>
    </section>
  );
}

/** Förlegad sajt ~2010: serif, trånga rader, skrikiga färger, besöksräknare. */
function OldSiteMock() {
  return (
    <div className="h-full w-full bg-[#d9d7cd] font-['Times_New_Roman',_serif] text-[#1e1e1e] select-none">
      <div className="flex items-center gap-2 bg-[#2e3a86] px-3 py-2 text-white sm:px-5 sm:py-3">
        <span className="grid h-6 w-6 place-items-center bg-[#f2c200] text-[10px] font-bold text-[#2e3a86]">
          AB
        </span>
        <span className="text-sm font-bold tracking-wide sm:text-base">
          ANDERSSONS BYGG AB
        </span>
        <span className="ml-auto animate-pulse bg-[#c81d1d] px-1.5 py-0.5 text-[8px] font-bold sm:text-[10px]">
          NYHET!
        </span>
      </div>

      <div className="flex gap-3 border-b-2 border-[#2e3a86] bg-[#c9c7bd] px-3 py-1 text-[10px] text-[#0000cc] underline sm:px-5 sm:text-xs">
        <span>Hem</span>
        <span>Om oss</span>
        <span>Tjänster</span>
        <span>Gästbok</span>
        <span>Kontakt</span>
      </div>

      <div className="px-3 py-3 sm:px-5 sm:py-4">
        <p className="text-center text-sm font-bold text-[#aa0000] underline sm:text-lg">
          Välkommen till vår hemsida!!
        </p>
        <div className="mt-2 flex gap-3">
          <div className="hidden h-16 w-20 shrink-0 items-center justify-center border border-[#888] bg-[#b7c7e0] text-[9px] text-[#33527a] sm:flex">
            [ bild saknas ]
          </div>
          <p className="text-[9px] leading-snug text-[#333] sm:text-[11px]">
            Vi är ett byggföretag med lång erfarenhet. Ring oss idag för offert!
            Vi utför alla sorters arbeten. Klicka här för mer information om våra
            tjänster och priser. Öppettider mån–fre 07–16.
          </p>
        </div>
        <p className="mt-2 text-center text-[8px] text-[#555] sm:text-[10px]">
          Besökare: 004213 &nbsp;|&nbsp; Senast uppdaterad: 2011-03-14
        </p>
      </div>
    </div>
  );
}

/** Modern version i samma anda som resten av sajten. */
function NewSiteMock() {
  return (
    <div className="flex h-full w-full flex-col bg-canvas px-4 py-3 select-none sm:px-7 sm:py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="grid h-5 w-5 place-items-center rounded-md bg-ink text-[10px] font-bold text-white">
            A
          </span>
          <span className="text-xs font-semibold sm:text-sm">Andersson Bygg</span>
        </div>
        <span className="rounded-pill bg-brand px-2.5 py-1 text-[10px] font-medium text-white sm:text-xs">
          Begär offert
        </span>
      </div>

      <div className="mt-auto max-w-[85%]">
        <p className="text-[10px] font-medium tracking-wide text-brand uppercase sm:text-xs">
          Bygg i Mälardalen
        </p>
        <h3 className="mt-1.5 text-lg leading-[1.05] font-semibold tracking-tight text-ink sm:text-3xl">
          Bygg som håller.
          <br />
          Hantverk du kan lita på.
        </h3>
        <p className="mt-2 hidden text-xs text-muted sm:block">
          Från tillbyggnad till totalrenovering — tydlig offert, satt tidsplan,
          jobbet gjort rätt.
        </p>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="rounded-pill bg-brand px-3 py-1.5 text-[10px] font-medium text-white shadow-brand sm:px-4 sm:py-2 sm:text-xs">
          Boka besök →
        </span>
        <span className="rounded-pill border border-line bg-surface px-3 py-1.5 text-[10px] font-medium text-ink sm:px-4 sm:py-2 sm:text-xs">
          Se projekt
        </span>
      </div>

      <div className="mt-auto grid grid-cols-3 gap-2 border-t border-line pt-2.5">
        {[
          ["25+", "år i branschen"],
          ["ROT", "avdrag ordnas"],
          ["5.0", "snitt på Google"],
        ].map(([value, label]) => (
          <div key={label}>
            <p className="text-xs font-semibold text-ink sm:text-base">{value}</p>
            <p className="text-[8px] text-muted sm:text-[10px]">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
