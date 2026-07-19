export const company = {
  name: "Mashal Equipment",
  tagline: "Équipements lourds, pièces et support cycle de vie",
  location: "Cotonou, Bénin",
  email: "contact@mashal.equipment",
  salesEmail: "commercial@mashal.equipment",
  techEmail: "tech@mashal.equipment",
  /** Remplacer par le numéro officiel dès confirmation client */
  phoneDisplay: "+229 01 40 00 00 00",
  phoneTel: "+2290140000000",
  hours: "Lun–Ven · 8h–18h (GMT+1)",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mashal.equipment",
} as const;

export const companyLinks = {
  email: `mailto:${company.email}`,
  phone: `tel:${company.phoneTel}`,
  whatsapp: `https://wa.me/2290140000000`,
} as const;
