import type { Metadata } from "next";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";

export const metadata: Metadata = {
  title: "Kontakt — Isak Web",
  description:
    "Berätta vad du behöver hjälp med, så återkommer jag med en bekräftad tid inom ett par arbetsdagar.",
};

export default async function KontaktPage({
  searchParams,
}: {
  searchParams: Promise<{ meddelande?: string }>;
}) {
  const { meddelande } = await searchParams;

  return (
    <>
      <Nav />
      <main>
        <Contact initialMessage={meddelande} />
      </main>
      <Footer hideCta />
    </>
  );
}
