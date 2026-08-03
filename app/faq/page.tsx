import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { HomeFaq } from "@/components/Home/HomeFaq";
import { Nav } from "@/components/Nav/Nav";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ — IsakWeb",
  description:
    "Vanliga frågor om priser, leveranstid, process och vad som ingår när jag bygger webbplats.",
  alternates: { canonical: absoluteUrl("/faq") },
};

export default function FaqPage() {
  return (
    <>
      <Nav />
      <main>
        <HomeFaq />
      </main>
      <Footer />
    </>
  );
}
