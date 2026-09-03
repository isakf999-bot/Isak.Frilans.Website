import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteLamps } from "@/components/Atmosphere/SiteLamps";
import { Chatbot } from "@/components/Chatbot/Chatbot";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "IsakWeb",
      description:
        "Frilansande fullstack-utvecklare i Helsingborg. Hemsidor åt svenska företag.",
      inLanguage: "sv-SE",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Isak Forsberg",
      url: SITE_URL,
      email: "info@isakweb.se",
      telephone: "+46762514121",
      jobTitle: "Webbutvecklare",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Helsingborg",
        addressCountry: "SE",
      },
      sameAs: [
        "https://isakforsberg.se/",
        "https://instagram.com/isakforsberg11",
        "https://x.com/FoppaCS",
        "https://www.facebook.com/isak.forsberg.31",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: "IsakWeb",
      url: SITE_URL,
      image: `${SITE_URL}/opengraph.jpg`,
      description:
        "Webbutveckling, landningssidor, e-handel och egna system för svenska företag.",
      areaServed: "SE",
      priceRange: "$$",
      founder: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "IsakWeb — Hemsidor åt svenska företag",
    template: "%s | IsakWeb",
  },
  description:
    "Frilansande webbutvecklare för svenska företag. Landningssidor, företagssajter och e-handel — med fast pris och direktkontakt.",
  keywords: [
    "IsakWeb",
    "Isak Web",
    "webbutvecklare",
    "frilans",
    "hemsida",
    "e-handel",
    "landningssida",
    "företagssajt",
    "fast pris",
    "Sverige",
  ],
  authors: [{ name: "Isak Forsberg", url: "https://isakforsberg.se/" }],
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: SITE_URL,
    siteName: "IsakWeb",
    title: "IsakWeb — Webbutvecklare | Hemsidor till fast pris från 3 795 kr",
    description:
      "Hemsidor med fast pris åt företag i hela Sverige. Du pratar alltid med den som skriver koden.",
    images: [
      {
        url: "/opengraph.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "IsakWeb — webbutvecklare för svenska företag",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IsakWeb — Webbutvecklare | Hemsidor till fast pris från 3 795 kr",
    description:
      "Hemsidor med fast pris åt företag i hela Sverige. Du pratar alltid med den som skriver koden.",
    images: ["/opengraph.jpg"],
  },
  robots: { index: true, follow: true },
  verification: {
    google: "7q_x-ctym9Tssc3-uWf-sY_gLfTMtDRrEVaDGx752yM",
  },
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${geistMono.variable} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{document.documentElement.classList.remove('dark');localStorage.removeItem('theme')}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteLamps />
        <div className="relative z-10">{children}</div>
        <Chatbot />
        <div className="grain" aria-hidden="true" />
        <Analytics />
      </body>
    </html>
  );
}
