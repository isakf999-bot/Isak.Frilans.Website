/**
 * Diskret sektionsmarkör.
 */
export function SectionLabel({
  children,
  onPaper = false,
}: {
  children: React.ReactNode;
  /** Ljus sektion — mörkare markör */
  onPaper?: boolean;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-eyebrow font-medium tracking-[0.14em] uppercase ${
        onPaper ? "text-paper-muted" : "text-muted"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1 w-1 shrink-0 rounded-full ${
          onPaper ? "bg-paper-ink" : "bg-white"
        }`}
      />
      {children}
    </p>
  );
}
