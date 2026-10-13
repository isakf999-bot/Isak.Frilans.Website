/**
 * Delade knappklasser.
 *
 * Modellen är en tangent: en solid platta med synlig underkant. Vid hover
 * lyfter den en pixel och kanten växer, vid tryck går den i botten och
 * kanten försvinner. Fyllnadsfärgen byts aldrig ut. De sekundära ("ghost")
 * är ett annat objekt — text med en linje under — inte en blekare platta.
 *
 * Välj efter botten: primary/secondary/ghost på ljus yta, onBrand/
 * ghostOnDark på mörk yta.
 */

const base =
  "inline-flex items-center justify-center gap-2 text-[0.9375rem] font-semibold leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-55";

const plate = `${base} rounded-md px-6 py-3.5 transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-px active:translate-y-[2px] active:duration-75`;

const rule = `${base} border-b-2 px-0.5 py-2 font-medium transition-[border-color,color] duration-150 ease-out`;

/** Svart tangent med sandfärgad underkant — loggans färger, sajtens
 *  primära handling på ljus yta. */
export const btnWhite =
  "bg-ink text-white shadow-[0_3px_0_var(--color-brand-glow),0_14px_24px_-12px_rgb(15_13_11/0.5)] hover:shadow-[0_4px_0_var(--color-brand-glow),0_18px_28px_-12px_rgb(15_13_11/0.55)] active:shadow-[0_0_0_var(--color-brand-glow)]";

/** Sandfärgad tangent med bronskant — primär handling på mörk yta. */
const sandPlate =
  "bg-brand-glow text-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_3px_0_var(--color-brand),0_14px_26px_-12px_rgb(0_0_0/0.8)] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_4px_0_var(--color-brand),0_18px_30px_-12px_rgb(0_0_0/0.85)] active:shadow-[inset_0_2px_3px_rgb(0_0_0/0.2),0_0_0_var(--color-brand)]";

export const btn = {
  primary: `${plate} ${btnWhite}`,
  /* Ljus tangent med linjefärgad underkant — bredvid en primär på ljus yta. */
  secondary: `${plate} bg-surface text-ink shadow-[inset_0_0_0_1px_var(--color-line),0_3px_0_var(--color-line-cool)] hover:shadow-[inset_0_0_0_1px_var(--color-line-cool),0_4px_0_var(--color-line-cool)] active:shadow-[inset_0_0_0_1px_var(--color-line-cool),0_0_0_var(--color-line-cool)]`,
  ghostOnDark: `${rule} border-brand-glow/60 text-white hover:border-white`,
  ghost: `${rule} border-brand/40 text-ink hover:border-brand`,
  /* Sandfärgad tangent — primär handling på mörk yta. */
  onBrand: `${plate} ${sandPlate}`,
  onPaper: `${plate} ${btnWhite}`,
  /* Glasplatta — bara ovanpå bild eller gradient, där glaset har något
     bakom sig att släppa igenom. */
  glassOnVideo: `${plate} border border-white/30 bg-white/10 text-white shadow-[0_3px_0_rgb(255_255_255/0.28)] backdrop-blur-sm hover:shadow-[0_4px_0_rgb(255_255_255/0.4)] active:shadow-[0_0_0_rgb(255_255_255/0.28)]`,
  chip: `${base} rounded-md border px-3.5 py-2 text-sm font-medium transition-colors duration-150 ease-out`,
  chipActive: `border-ink bg-ink text-white`,
  chipIdle:
    "border-line-cool bg-surface text-ink hover:border-brand/40 hover:bg-brand-tint",
} as const;
