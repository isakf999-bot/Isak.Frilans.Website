import type { ReactNode } from "react";

/**
 * Laptop-mockup (MacBook Pro-look) för att presentera kundcase.
 * Ren CSS — inga bilder — så framen alltid är sylvass oavsett skärm.
 *
 * Struktur:
 *   1) skärm-frame med aluminium-bezel och kamerapunkt i toppens mitt
 *   2) hinge/underdel — silverband med touchpad-notch i mitten
 *   3) mjuk skugga under så laptopen "svävar" över bakgrunden
 *
 * Skärmen har aspect 16/10 (samma proportion som MacBook Pro), och
 * innehållet clippas snyggt in bakom rundade skärmhörn.
 */
export function LaptopFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Skärm-delen (bezel + kamera + innehåll) */}
      <div
        className="relative rounded-t-[10px] px-[9px] pt-[13px] pb-[8px]"
        style={{
          background:
            "linear-gradient(180deg,#e5e8ec 0%,#d3d7dc 45%,#b7bcc2 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -1px 0 rgba(0,0,0,0.08)",
        }}
      >
        {/* Kamera-punkt högt upp i bezel-mitten */}
        <span
          aria-hidden="true"
          className="absolute top-[5px] left-1/2 block h-[3px] w-[3px] -translate-x-1/2 rounded-full"
          style={{ background: "#1a1c1f" }}
        />

        {/* Själva skärmen — svart bakgrund så vita/tomma bilder inte
            visar sömmarna runt hörnen. Innehållet clippas inuti. */}
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-black"
          style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.6)" }}
        >
          {children}
        </div>
      </div>

      {/* Hinge/underdel — sticker ut lite bredare än skärmen (MacBook-look) */}
      <div
        aria-hidden="true"
        className="relative mx-auto h-[14px] w-[104%] -translate-x-[2%] rounded-b-[10px]"
        style={{
          background:
            "linear-gradient(180deg,#c8ccd1 0%,#a6abb1 40%,#82878d 100%)",
          boxShadow:
            "0 2px 4px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
      >
        {/* Touchpad-notch — en smal, lite mörkare fördjupning i mitten */}
        <div
          className="absolute top-0 left-1/2 h-[5px] w-[14%] -translate-x-1/2 rounded-b-[4px]"
          style={{
            background:
              "linear-gradient(180deg,#5b6167 0%,#464b50 60%,#3a3e42 100%)",
            boxShadow: "inset 0 1px 1px rgba(0,0,0,0.5)",
          }}
        />
      </div>

      {/* Ambient skugga under laptopen — organisk, mjuk */}
      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto mt-3 h-6 w-[78%] rounded-[50%] opacity-70 blur-2xl"
        style={{ background: "rgba(0,0,0,0.55)" }}
      />
    </div>
  );
}
