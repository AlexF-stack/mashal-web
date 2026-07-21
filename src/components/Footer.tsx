"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, companyLinks } from "@/lib/company";
import { companyDocuments } from "@/lib/documents";
import { useI18n } from "@/lib/i18n-context";

export default function Footer() {
  const { t } = useI18n();

  const navColumns = [
    {
      title: t.footer.catalog,
      links: [
        { href: "/machines", label: t.footer.machines },
        { href: "/pieces", label: t.footer.pieces },
        { href: "/outils", label: t.footer.tools },
        {
          href: companyDocuments.catalogue.href,
          label: t.pages.about.catalogueTitle,
          download: companyDocuments.catalogue.filename,
        },
      ],
    },
    {
      title: t.footer.services,
      links: [
        { href: "/expertises", label: t.nav.services },
        { href: "/sav", label: t.footer.sav },
        { href: "/logistique", label: t.footer.logistics },
        { href: "/articles", label: t.footer.articles },
        { href: "/a-propos", label: t.footer.about },
        { href: "/a-propos#documents", label: t.footer.brochures },
      ],
    },
  ];

  return (
    <footer className="border-t border-[color:var(--border)] bg-[#0F172A] pt-24 pb-12 text-white dark:bg-[#0B1220]">
      <div className="container mx-auto px-6">
        <div className="mb-16 grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden">
                <Image
                  src="/images/LOGO.png"
                  alt="Mashal Equipment Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-black tracking-tighter">
                MASHAL <span className="text-primary">EQUIPMENT</span>
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              {company.tagline}. Accompagnement commercial, technique et logistique pour
              vos projets en Afrique et à l&apos;international.
            </p>
            <p className="mt-4 text-xs text-white/40">
              {t.footer.holding}{" "}
              <a
                href={company.parentHolding.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/55 transition-colors hover:text-primary"
              >
                {company.parentHolding.name}
              </a>
            </p>
            <p className="mt-2 text-xs text-white/40">{company.founders}</p>
          </div>

          {navColumns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-white">
                {column.title}
              </h4>
              <ul className="space-y-3 text-sm text-white/60">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    {"download" in link && link.download ? (
                      <a
                        href={link.href}
                        download={link.download}
                        className="transition-colors hover:text-primary"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="transition-colors hover:text-primary">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-white">
              {t.nav.contact}
            </h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{company.location}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={companyLinks.phone} className="transition-colors hover:text-primary">
                  {company.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a
                  href={companyLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={companyLinks.email} className="transition-colors hover:text-primary">
                  {company.email}
                </a>
              </li>
              <li className="text-xs text-white/40">{company.hours}</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/sav?type=devis" className="btn-premium btn-gold px-5 py-2.5 text-xs">
                {t.home.ctaQuote}
              </Link>
              <a
                href={companyLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors hover:border-primary hover:text-primary"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 md:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {company.name}. {t.footer.rights}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/35">
            <Link href="/mentions-legales" className="transition-colors hover:text-primary">
              {t.footer.legal}
            </Link>
            <Link href="/confidentialite" className="transition-colors hover:text-primary">
              {t.footer.privacy}
            </Link>
            <Link href="/faq" className="transition-colors hover:text-primary">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
