import { company } from "@/lib/company";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${company.siteUrl}/#organization`,
        name: company.name,
        url: company.siteUrl,
        email: company.email,
        telephone: company.phoneDisplay,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cotonou",
          addressCountry: "BJ",
        },
        logo: `${company.siteUrl}/images/LOGO.png`,
        image: `${company.siteUrl}/mashal_hero_mining.png`,
        description: company.tagline,
        foundingLocation: "Cotonou, Bénin",
      },
      {
        "@type": "WebSite",
        "@id": `${company.siteUrl}/#website`,
        url: company.siteUrl,
        name: company.name,
        description: company.tagline,
        publisher: { "@id": `${company.siteUrl}/#organization` },
        inLanguage: "fr",
      },
    ],
  };
}
