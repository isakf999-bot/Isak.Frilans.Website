/**
 * Tillgänglighetsmatrisen i kontaktformuläret.
 *
 * Ingen kalenderintegration: besökaren markerar flera tider som passar dem, och
 * Isak återkommer med en bekräftad tid. Värdena är stabila id:n som skickas i
 * mejlet — labels är det besökaren ser.
 */
export const DAYS = [
  { id: "mon", label: "Måndag" },
  { id: "tue", label: "Tisdag" },
  { id: "wed", label: "Onsdag" },
  { id: "thu", label: "Torsdag" },
  { id: "fri", label: "Fredag" },
  { id: "sat", label: "Helg" },
] as const;

export const SLOTS = [
  { id: "morning", label: "Förmiddag", hint: "08–12" },
  { id: "afternoon", label: "Eftermiddag", hint: "12–17" },
  { id: "evening", label: "Kväll", hint: "17–21" },
] as const;

export type DayId = (typeof DAYS)[number]["id"];
export type SlotId = (typeof SLOTS)[number]["id"];

/** Ett valt tidsfönster, t.ex. "tue:afternoon". */
export type AvailabilityId = `${DayId}:${SlotId}`;

export function availabilityId(day: DayId, slot: SlotId): AvailabilityId {
  return `${day}:${slot}`;
}

/** Gör om "tue:afternoon" till "Tisdag eftermiddag" för mejlet. */
export function formatAvailability(id: string): string | null {
  const [dayId, slotId] = id.split(":");
  const day = DAYS.find((d) => d.id === dayId);
  const slot = SLOTS.find((s) => s.id === slotId);
  if (!day || !slot) return null;
  return `${day.label} ${slot.label.toLowerCase()}`;
}

/** Svarstiden som utlovas i bekräftelsen. Ändra på ETT ställe. */
export const RESPONSE_TIME_DAYS = 2;
