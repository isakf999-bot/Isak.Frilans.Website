/**
 * Delade knappklasser — vit primär CTA på mörk botten (Vercel-stil).
 */

const base =
  "inline-flex items-center justify-center gap-2 rounded-md text-[0.9375rem] font-semibold leading-none transition-[background-color,border-color,color,opacity] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-55";

export const btn = {
  primary: `${base} bg-white px-6 py-3.5 text-black hover:opacity-90`,
  secondary: `${base} border border-line-cool bg-transparent px-6 py-3.5 font-medium text-ink hover:border-white/30 hover:bg-white/5`,
  ghostOnDark: `${base} border border-white/20 bg-transparent px-6 py-3.5 font-medium text-white hover:border-white/40 hover:bg-white/5`,
  onBrand: `${base} bg-black px-6 py-3.5 text-white hover:bg-black/85`,
  /** CTA på vit/paper-sektion */
  onPaper: `${base} bg-paper-ink px-6 py-3.5 text-white hover:opacity-90`,
  chip: `${base} rounded-md border px-3.5 py-2 text-sm font-medium`,
  chipActive: "border-white bg-white text-black",
  chipIdle:
    "border-line-cool bg-transparent text-ink hover:border-white/25 hover:bg-white/5",
} as const;
