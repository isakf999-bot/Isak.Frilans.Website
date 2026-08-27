/**
 * Delade knappklasser — vit primär CTA på mörk botten (Vercel-stil).
 */

const base =
  "inline-flex items-center justify-center gap-2 rounded-md text-[0.9375rem] font-semibold leading-none transition-[background-color,border-color,color,box-shadow] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-55";

/**
 * Vit primär — hover som “Vad du får”: mjuk vit/transparent bakgrund.
 */
export const btnWhite =
  "border border-transparent bg-white text-black hover:border-white/40 hover:bg-white/10 hover:text-white active:bg-white/15";

export const btn = {
  primary: `${base} ${btnWhite} px-6 py-3.5`,
  secondary: `${base} border border-line-cool bg-transparent px-6 py-3.5 font-medium text-ink hover:border-white/40 hover:bg-white/5`,
  /** Outline på mörk botten — samma hover som innan */
  ghostOnDark: `${base} border border-white/20 bg-transparent px-6 py-3.5 font-medium text-white hover:border-white/40 hover:bg-white/5`,
  onBrand: `${base} bg-black px-6 py-3.5 text-white hover:bg-black/85`,
  onPaper: `${base} bg-paper-ink px-6 py-3.5 text-white hover:opacity-90`,
  chip: `${base} rounded-md border px-3.5 py-2 text-sm font-medium`,
  chipActive: `border-white ${btnWhite}`,
  chipIdle:
    "border-line-cool bg-transparent text-ink hover:border-white/40 hover:bg-white/5",
} as const;