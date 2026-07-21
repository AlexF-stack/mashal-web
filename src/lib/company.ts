const phoneDisplay =
  process.env.NEXT_PUBLIC_PHONE_DISPLAY?.trim() || "+229 01 96 39 99 88";
const phoneTel =
  process.env.NEXT_PUBLIC_PHONE_TEL?.trim() ||
  phoneDisplay.replace(/[^\d+]/g, "");

export const company = {
  name: "Mashal Equipment",
  tagline: "Des machines et des hommes en qui vous pouvez avoir confiance",
  location: "Cotonou, Bénin",
  parentHolding: {
    name: "HERNA HOLDING",
    url: "https://www.hernaholding.com",
  },
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "contact@mashal.equipment",
  salesEmail: "commercial@mashal.equipment",
  techEmail: "tech@mashal.equipment",
  phoneDisplay,
  phoneTel,
  hours: "Lun–Ven · 8h–18h (GMT+1)",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mashal.equipment",
  founders: "Wayisuhu Zannude Dossou & Mykem DOSSOU",
} as const;

export const companyLinks = {
  email: `mailto:${company.email}`,
  phone: `tel:${company.phoneTel}`,
  whatsapp: `https://wa.me/${company.phoneTel.replace(/\D/g, "")}`,
} as const;
