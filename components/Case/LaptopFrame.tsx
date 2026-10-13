import type { CSSProperties, ReactNode } from "react";

/**
 * Detaljerad MacBook Pro-mockup helt i CSS (inga bilder, inga SVG-bakgrunder).
 *
 * Struktur (uppifrån och ner):
 *   1) Chassi-topp — silver aluminium med rundade övre hörn, subtila
 *      inner-highlights som fångar ljus.
 *   2) Svart display-bezel — den mörka kanten runt själva LCD-panelen.
 *      Extra padding upptill så kamera + light-sensor får plats.
 *   3) Kamera & light-sensor — kamera har liten inner-lens-reflektion.
 *   4) LCD-panel — 16:10, glossy diagonal glare overlay + subtil topp-
 *      shimmer så den känns som en riktig skärm.
 *   5) Aluminum bottom edge — tunn silverkant där skärm-chassit möter
 *      hinge (samma detalj syns när man tittar rakt framifrån på en Mac).
 *   6) Hinge — mörk skarv under skärmen med skugga uppåt.
 *   7) Base — silverkropp som sticker ut lite bredare på båda sidorna,
 *      touchpad-notch upptill i mitten, botten-skugga runt om.
 *   8) Floor shadow — en tät kontaktskugga + ett sandfärgat sken, så att
 *      laptopen står på den mörkblå scenen i stället för att sväva i svart.
 *
 * Aluminiumets gråskala är materialfärger för själva mockupen (kall, neutral
 * metall) och ligger därför här och inte bland sajtens tokens.
 */
export function LaptopFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  // Bryter ut styles så komponenten inte drunknar i inline-CSS.
  const chassisTop: CSSProperties = {
    background:
      "linear-gradient(180deg,#e6e9ee 0%,#d5d9df 30%,#c1c5cc 65%,#b0b4bc 100%)",
    boxShadow: [
      "inset 0 1px 0 rgba(255,255,255,0.9)", // top highlight (aluminium beveled edge)
      "inset 1px 0 0 rgba(255,255,255,0.45)", // left edge
      "inset -1px 0 0 rgba(2,6,23,0.18)", // right edge
      "inset 0 -1px 0 rgba(2,6,23,0.15)", // faint bottom seam
    ].join(","),
  };

  const displayBezel: CSSProperties = {
    background: "#07090d",
    boxShadow: [
      "inset 0 0 0 1px rgba(255,255,255,0.04)", // subtile inner ring
      "0 1px 2px rgba(2,6,23,0.6)",
    ].join(","),
  };

  const lightSensor: CSSProperties = {
    background: "radial-gradient(circle,#1a1c21 30%,#050507 100%)",
    boxShadow: "0 0 0 0.5px rgba(255,255,255,0.08)",
  };

  const cameraLens: CSSProperties = {
    background:
      "radial-gradient(circle at 32% 32%,#2b3341 0%,#0a0e14 55%,#000 100%)",
    boxShadow:
      "0 0 0 0.5px rgba(255,255,255,0.12), 0 0 5px rgba(70,100,150,0.22)",
  };

  const screenGlare: CSSProperties = {
    background:
      "linear-gradient(120deg,rgba(255,255,255,0.11) 0%,rgba(255,255,255,0.03) 18%,rgba(255,255,255,0) 42%)",
  };

  const screenTopShimmer: CSSProperties = {
    background:
      "linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0))",
  };

  const chassisBottomEdge: CSSProperties = {
    background: "linear-gradient(180deg,#a4a9b1 0%,#7d828b 100%)",
    boxShadow: "inset 0 -1px 0 rgba(2,6,23,0.35)",
  };

  const hinge: CSSProperties = {
    background:
      "linear-gradient(180deg,#24272e 0%,#3b4049 45%,#24272e 100%)",
    boxShadow:
      "0 2px 3px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(2,6,23,0.55)",
  };

  const base: CSSProperties = {
    background:
      "linear-gradient(180deg,#d0d4da 0%,#b3b8c0 40%,#8b9099 82%,#70757f 100%)",
    boxShadow: [
      "0 8px 16px -4px rgba(2,6,23,0.6)",
      "inset 0 1px 0 rgba(255,255,255,0.75)",
      "inset 0 -2px 3px rgba(2,6,23,0.28)",
    ].join(","),
  };

  const baseHighlight: CSSProperties = {
    background:
      "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.5) 50%,transparent 100%)",
  };

  const touchpadNotch: CSSProperties = {
    background: "linear-gradient(180deg,#3b4049 0%,#2a2e35 100%)",
    boxShadow:
      "inset 0 1px 2px rgba(2,6,23,0.7), 0 1px 0 rgba(255,255,255,0.15)",
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* === SKÄRM-DELEN === */}
      {/* Chassi-topp (silver aluminium) — smal ram runt display-bezel */}
      <div
        className="relative rounded-t-[16px] px-[9px] pt-[9px] pb-[7px]"
        style={chassisTop}
      >
        {/* Svart display-bezel — extra topp-padding för kamera-raden */}
        <div
          className="relative rounded-[6px] px-[10px] pt-[16px] pb-[11px]"
          style={displayBezel}
        >
          {/* Kamera-rad: light-sensor + kameralins med inner reflection */}
          <div className="pointer-events-none absolute top-[6px] left-1/2 flex -translate-x-1/2 items-center gap-[6px]">
            <span
              aria-hidden="true"
              className="block h-[3px] w-[3px] rounded-full"
              style={lightSensor}
            />
            <span
              aria-hidden="true"
              className="relative block h-[5px] w-[5px] rounded-full"
              style={cameraLens}
            >
              {/* Mikroskopisk lens-highlight */}
              <span className="absolute top-[1px] left-[1px] block h-[1px] w-[1px] rounded-full bg-brand-glow/50" />
            </span>
          </div>

          {/* LCD-panel — själva skärm-innehållet */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-night">
            {children}

            {/* Diagonal glossy glare (subtil) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={screenGlare}
            />
            {/* Övre kant-shimmer så pixel-linjen "syns" som glas */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
              style={screenTopShimmer}
            />
          </div>
        </div>
      </div>

      {/* Aluminum bottom edge — tunn silverkant där skärm-chassit slutar */}
      <div
        aria-hidden="true"
        className="mx-auto h-[3px] w-full"
        style={chassisBottomEdge}
      />

      {/* === HINGE — mörk skarv där skärm möter base === */}
      <div
        aria-hidden="true"
        className="relative mx-auto h-[6px] w-[94%] rounded-b-[2px]"
        style={hinge}
      />

      {/* === BASE — aluminium-kropp, sticker ut på båda sidor === */}
      <div
        className="relative mx-auto h-[18px] w-[108%] -translate-x-[4%] rounded-b-[14px]"
        style={base}
      >
        {/* Touchpad-notch — indent upptill i mitten */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 h-[6px] w-[15%] -translate-x-1/2 rounded-b-[10px]"
          style={touchpadNotch}
        />
        {/* Bred ljus-highlight ridå — simulerar aluminium ovanljus */}
        <div
          aria-hidden="true"
          className="absolute top-[3px] right-[10%] left-[10%] h-[1px]"
          style={baseHighlight}
        />
      </div>

      {/* === FLOOR SHADOW — kontaktskugga + sandsken === */}
      <div aria-hidden="true" className="pointer-events-none relative h-12">
        <div className="absolute inset-x-[6%] top-0 h-3 rounded-[50%] bg-night opacity-80 blur-md" />
        <div className="absolute inset-x-[12%] top-3 h-8 rounded-[50%] bg-brand opacity-45 blur-2xl" />
      </div>
    </div>
  );
}
