import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";
import { Services } from "@/components/Services/Services";

export const metadata: Metadata = {
  title: "Vad jag bygger — Isak Web",
  description:
    "Landningssidor, e-handel, företagssajter och redesign av befintliga sajter — se vad som passar dig och vad det brukar kosta.",
};

export default function TjansterPage() {
  return (
    <>
      <Nav />
      <main>
        <Services />
      </main>
      <Footer />
    </>
  );
}
