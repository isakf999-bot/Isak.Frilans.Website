/**
 * Ordbild — bara "Isak Web", ingen glob/mark.
 */

type Props = {
  className?: string;
  /** Ljusare text på mörk botten (default). */
  onDark?: boolean;
};

export const logoLinkClass =
  "inline-flex transition-opacity duration-150 ease-out hover:opacity-70";

export function Logo({ className = "", onDark = true }: Props) {
  return (
    <span
      className={`text-[15px] leading-none font-semibold tracking-[-0.02em] ${
        onDark ? "text-white" : "text-paper-ink"
      } ${className}`}
    >
      Isak{" "}
      <span className={onDark ? "text-white/55" : "text-paper-muted"}>Web</span>
    </span>
  );
}
