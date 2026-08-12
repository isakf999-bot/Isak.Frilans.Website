/**
 * Delade knappklasser — lugn, professionell hover utan glow/shine/lift.
 */

const base =
  "inline-flex items-center justify-center gap-2 rounded-md text-[0.9375rem] font-semibold leading-none transition-[background-color,border-color,color,opacity] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-55";

export const btn = {
  primary: `${base} bg-brand px-6 py-3.5 text-white hover:bg-brand-dark`,
  secondary: `${base} border border-line bg-surface px-6 py-3.5 font-medium text-ink hover:border-ink/25 hover:bg-canvas`,
  ghostOnDark: `${base} border border-white/35 bg-transparent px-6 py-3.5 font-medium text-white hover:border-white/55 hover:bg-white/10`,
  onBrand: `${base} bg-white px-6 py-3.5 text-brand hover:bg-brand-tint`,
  chip: `${base} rounded-md border px-3.5 py-2 text-sm font-medium`,
  chipActive: "border-brand bg-brand text-white",
  chipIdle:
    "border-line bg-canvas text-ink hover:border-ink/20 hover:bg-surface",
} as const;
