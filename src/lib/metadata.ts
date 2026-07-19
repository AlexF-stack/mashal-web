import { Metadata, Viewport } from "next";
import { Machine } from "@/types/machine";
import { articleHighlights } from "@/lib/site-content";

type Article = (typeof articleHighlights)[number];

function isString(value: string | null | undefined): value is string {
  return Boolean(value);
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://mashal.equipment"),
  title: {
    default:
      "Mashal Equipment - Équipements Industriels Lourds & Services Export",
    template: "%s | Mashal Equipment",
  },
  description:
    "Fournisseur de référence pour équipements lourds, pièces détachées, maintenance et services export. Fiabilité, disponibilité et accompagnement technique garantis.",
  keywords: [
    "équipements lourds",
    "terrassement",
    "compactage",
    "manutention",
    "pièces détachées",
    "maintenance préventive",
    "export Afrique",
  ],
  authors: [
    {
      name: "Mashal Equipment",
      url: "https://mashal.equipment",
    },
  ],
  creator: "Mashal Equipment",
  publisher: "Mashal Equipment",
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
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: "https://mashal.equipment",
    siteName: "Mashal Equipment",
    title: "Mashal Equipment - Équipements Industriels Lourds",
    description:
      "Équipements robustes, pièces détachées et accompagnement technique pour projets industriels.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mashal Equipment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mashal Equipment",
    description: "Équipements industriels lourds et services export",
    creator: "@MashalEquipment",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://mashal.equipment",
    languages: {
      "fr-FR": "https://mashal.equipment/fr",
      "en-US": "https://mashal.equipment/en",
    },
  },
};

export function generateMachineMetadata(machine: Machine): Metadata {
  const machineTitle =
    typeof machine.designation === "object"
      ? machine.designation.fr
      : machine.designation;

  const description = `${machineTitle} - ${machine.category || "Équipement"}${
    machine.engine_brand_model ? ` avec moteur ${machine.engine_brand_model}` : ""
  }${machine.net_power_kw ? ` - Puissance: ${machine.net_power_kw} kW` : ""}`;

  return {
    title: machineTitle,
    description,
    keywords: [
      machineTitle,
      machine.category,
      machine.engine_brand_model,
      "équipement lourd",
    ].filter(isString),
    openGraph: {
      type: "website",
      title: machineTitle,
      description,
      url: `https://mashal.equipment/machines/${machine.id}`,
      siteName: "Mashal Equipment",
    },
  };
}

export function generateArticleMetadata(article: Article): Metadata {
  return {
    title: article.title,
    description: article.excerpt,
    keywords: ["article", article.category, "mashal equipment"],
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `https://mashal.equipment/articles/${article.slug}`,
      images: article.image
        ? [
            {
              url: article.image,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : [],
    },
  };
}
