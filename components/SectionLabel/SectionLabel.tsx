/**
 * Diskret sektionsmarkör — punkt + uppercase, utan tint-pill.
 */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-eyebrow font-medium tracking-[0.14em] text-brand uppercase">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
      />
      {children}
    </p>
  );
}
