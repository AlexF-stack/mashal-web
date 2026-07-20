import type { Metadata, Viewport } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Script from "next/script";
import { company } from "@/lib/company";
import { organizationJsonLd } from "@/lib/json-ld";
import { I18nProvider } from "@/lib/i18n-context";
import { ProjectProvider } from "@/context/ProjectContext";
import AIChatAssistant from "@/components/AIChatAssistant";

const siteUrl = company.siteUrl;
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#D4AF37",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mashal Equipment | Équipements lourds & support cycle de vie",
    template: "%s | Mashal Equipment",
  },
  description:
    "Équipements industriels lourds, pièces détachées, maintenance et logistique export. Accompagnement technique pour chantiers, mines et projets internationaux.",
  keywords: [
    "équipements industriels",
    "machines lourdes",
    "pièces détachées",
    "export Afrique",
    "SAV technique",
    "maintenance préventive",
    "Mashal Equipment",
    "Cotonou",
  ],
  authors: [{ name: "Mashal Equipment" }],
  openGraph: {
    title: "Mashal Equipment | Équipements lourds & services",
    description:
      "Machines, pièces, SAV et logistique export pour sécuriser vos opérations industrielles.",
    url: siteUrl,
    siteName: "Mashal Equipment",
    images: [
      {
        url: "/mashal_hero_mining.png",
        width: 1200,
        height: 630,
        alt: "Mashal Equipment - Équipements Industriels",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mashal Equipment",
    description: "Équipements industriels lourds, pièces et support cycle de vie.",
    images: ["/mashal_hero_mining.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = organizationJsonLd();

  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans overflow-x-hidden antialiased">
        <I18nProvider>
          <ProjectProvider>
            {gaMeasurementId && (
              <>
                <Script
                  src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
                  strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                  {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gaMeasurementId}');
                  `}
                </Script>
              </>
            )}
            <Navbar />
            <main>{children}</main>
            <Footer />
            <AIChatAssistant />
          </ProjectProvider>
        </I18nProvider>
        <Script
          type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
