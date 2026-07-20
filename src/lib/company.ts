const phoneDisplay =
  process.env.NEXT_PUBLIC_PHONE_DISPLAY?.trim() || "+229 01 96 39 99 88";
const phoneTel =
  process.env.NEXT_PUBLIC_PHONE_TEL?.trim() ||
  phoneDisplay.replace(/[^\d+]/g, "");

export const company = {
  name: "Mashal Equipment",
  tagline: "Équipements lourds, pièces et support cycle de vie",
  location: "Cotonou, Bénin",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "contact@mashal.equipment",
  salesEmail: "commercial@mashal.equipment",
  techEmail: "tech@mashal.equipment",
  phoneDisplay,
  phoneTel,
  hours: "Lun–Ven · 8h–18h (GMT+1)",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mashal.equipment",
  founders: "Mr Ithiel DOSSOU & Mykem DOSSOU",
} as const;

export const companyLinks = {
  email: `mailto:${company.email}`,
  phone: `tel:${company.phoneTel}`,
  whatsapp: `https://wa.me/${company.phoneTel.replace(/\D/g, "")}`,
} as const;
