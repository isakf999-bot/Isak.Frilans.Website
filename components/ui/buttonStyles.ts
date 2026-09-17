/**
 * Delade knappklasser — ljusa ytor, pill-form (inspiration: vänlig byrå-CTA).
 */

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill text-[0.9375rem] font-semibold leading-none transition-[background-color,border-color,color,box-shadow] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-55";

export const btnWhite =
  "border border-transparent bg-ink text-white hover:bg-ink/85 active:bg-ink/90";

export const btn = {
  primary: `${base} ${btnWhite} px-6 py-3.5`,
  secondary: `${base} border border-transparent bg-brand px-6 py-3.5 text-white hover:bg-brand-dark`,
  ghostOnDark: `${base} border border-white/70 bg-white/10 px-6 py-3.5 font-medium text-white hover:bg-white hover:text-ink`,
  ghost: `${base} border border-line-cool bg-transparent px-6 py-3.5 font-medium text-ink hover:border-ink/30 hover:bg-mist`,
  onBrand: `${base} bg-white px-6 py-3.5 text-ink hover:bg-mist`,
  onPaper: `${base} bg-ink px-6 py-3.5 text-white hover:bg-ink/85`,
  chip: `${base} rounded-pill border px-3.5 py-2 text-sm font-medium`,
  chipActive: `border-ink bg-ink text-white`,
  chipIdle:
    "border-line-cool bg-surface text-ink hover:border-ink/25 hover:bg-mist",
} as const;
