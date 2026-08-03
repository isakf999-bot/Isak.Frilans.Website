import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://isak-frilans.vercel.app";

/** Rensa ev. kvarvarande dark-klass från äldre besök. */
const CLEAR_DARK =
  "(function(){try{document.documentElement.classList.remove('dark');localStorage.removeItem('theme');}catch(e){}})();";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "IsakWeb — Webbplatser som växer företag",
  description:
    "Frilansande fullstack-utvecklare i Helsingborg. Jag bygger snabba, moderna hemsidor, e-handel och system åt svenska företag — med fast pris och direktkontakt.",
  keywords: [
    "IsakWeb",
    "Isak Web",
    "webbutvecklare",
    "frilans",
    "hemsida",
    "e-handel",
    "landningssida",
    "företagssajt",
    "Helsingborg",
    "Sverige",
  ],
  authors: [{ name: "Isak Forsberg", url: "https://isakforsberg.se/" }],
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: SITE_URL,
    siteName: "IsakWeb",
    title: "IsakWeb — Webbplatser som växer företag",
    description:
      "Snabba, moderna sajter åt svenska företag. Du pratar med den som bygger — inte en projektledare.",
  },
  twitter: {
    card: "summary_large_image",
    title: "IsakWeb — Webbplatser som växer företag",
    description:
      "Snabba, moderna sajter åt svenska företag. Du pratar med den som bygger.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${geistMono.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: CLEAR_DARK }} />
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {children}
        <div className="grain" aria-hidden="true" />
        <Analytics />
      </body>
    </html>
  );
}
