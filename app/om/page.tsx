import type { Metadata } from "next";
import { About } from "@/components/About/About";
import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Om mig — IsakWeb",
  description:
    "Isak Forsberg, 21, fullstackutvecklare i Helsingborg. Jag bygger hemsidor från grunden till ett rimligt pris.",
  alternates: { canonical: absoluteUrl("/om") },
};

export default function OmPage() {
  return (
    <>
      <Nav />
      <main>
        <About />
      </main>
      <Footer />
    </>
  );
}
