import type { Metadata } from "next";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Starta ett projekt — IsakWeb",
  description:
    "Berätta vad du vill bygga — jag återkommer inom ett par arbetsdagar med nästa steg.",
  alternates: { canonical: absoluteUrl("/kontakt") },
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
