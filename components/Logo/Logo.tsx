/**
 * Loggan: IW-märket + ordbilden "Isak Web".
 *
 * Märket är samma teckning som favikonen (app/icon.svg): svart platta, benvit
 * stapel och ett sandfärgat W. Det ritas här som SVG så att det är skarpt i
 * alla storlekar och tar färgerna ur sajtens tokens.
 *
 * I ordbilden står "Isak" i textfärgen och "Web" i sand, satta tätt så att de
 * läses som ett ord i två färger. Vid hover på länken (`logoLinkClass`) drar
 * ordbilden åt varumärkesfärgen.
 */

type Props = {
  className?: string;
  /** Vit text på mörk botten. Default är mörk text på ljus yta. */
  onDark?: boolean;
};

export const logoLinkClass = "group/logo inline-flex rounded-sm";

export function Logo({ className = "", onDark = false }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className={`h-8 w-8 shrink-0 rounded-md ${
          // På mörk botten behöver den svarta plattan en kant för att synas.
          onDark ? "ring-1 ring-white/15" : ""
        }`}
      >
        <rect width="48" height="48" className="fill-ink" />
        <circle
          cx="38"
          cy="10"
          r="9"
          className="fill-brand-glow"
          fillOpacity="0.22"
        />
        <rect x="11" y="13" width="5" height="22" rx="1.2" fill="#ededed" />
        <path
          className="fill-brand-glow"
          d="M19.5 13h5.2l2.55 14.2L29.7 13H35l-4.35 22h-5.4L22.7 20.2 20.2 35h-5.35L19.5 13z"
        />
      </svg>
      <span
        className={`text-[1.1875rem] leading-none font-semibold tracking-[-0.045em] whitespace-nowrap transition-colors duration-150 ease-out ${
          onDark
            ? "text-white group-hover/logo:text-brand-glow"
            : "text-ink group-hover/logo:text-brand"
        }`}
      >
        Isak{" "}
        <span className={onDark ? "text-brand-glow" : "text-brand"}>Web</span>
      </span>
    </span>
  );
}
