/**
 * Sektionsetikett. En liten färgad markör + versal text, så att man direkt
 * ser var en ny sektion börjar — det var precis det som saknades tidigare.
 */
export function SectionLabel({ children }: { children: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-pill bg-brand-tint px-3 py-1.5 text-eyebrow font-medium text-brand uppercase">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </p>
  );
}
