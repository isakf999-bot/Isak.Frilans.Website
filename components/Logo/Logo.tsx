/**
 * ISAK WEB-loggan, ritad som SVG i stället för att läggas in som bildfil.
 *
 * Originalet är en skärmdump med blå gradientbakgrund inbränd — den hade blivit
 * en blå rektangel i den ljusa navbaren. Som SVG är den skarp i alla storlekar,
 * saknar bakgrund, och kan ta sidans färger (jordklotet i varumärkesblått,
 * ordbilden i ink).
 */

type Props = {
  /** Vald färg på jordklotet. På ljus botten: varumärkesblått. */
  className?: string;
};

export function Logo({ className = "" }: Props) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <GlobeMark />
      <span className="text-lg leading-none font-bold tracking-[0.02em] uppercase">
        Isak <span className="text-brand">Web</span>
      </span>
    </span>
  );
}

/** Jordklotet: meridianer, breddgrader och tre noder på nätet. */
function GlobeMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-8 w-8 shrink-0 text-brand"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="20" />
      {/* Meridianer */}
      <line x1="24" y1="4" x2="24" y2="44" />
      <ellipse cx="24" cy="24" rx="9" ry="20" />
      {/* Breddgrader — kordor genom cirkeln */}
      <line x1="4" y1="24" x2="44" y2="24" />
      <line x1="6.7" y1="14" x2="41.3" y2="14" />
      <line x1="6.7" y1="34" x2="41.3" y2="34" />
      {/* Noder: nätverket i nätet. Fylls med bakgrundsfärgen så linjerna bryts. */}
      <circle cx="6.9" cy="24" r="3" className="fill-canvas" />
      <circle cx="30.5" cy="14" r="3" className="fill-canvas" />
      <circle cx="33" cy="34" r="3" className="fill-canvas" />
    </svg>
  );
}
