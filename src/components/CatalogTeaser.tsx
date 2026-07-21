"use client";

import Link from "next/link";
import { ArrowRight, Download, Truck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { useI18n } from "@/lib/i18n-context";
import { companyDocuments } from "@/lib/documents";

/** Entrée catalogue + téléchargement PDF officiel */
export default function CatalogTeaser() {
  const { t } = useI18n();
  const c = t.catalogTeaser;
  const pdf = companyDocuments.catalogue;

  return (
    <section className="border-b border-[color:var(--border)] py-12 md:py-16">
      <div className="container mx-auto px-6">
        <Reveal blur={false}>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface)] p-8 md:flex-row md:items-center md:p-10">
            <div className="max-w-2xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                {c.eyebrow}
              </p>
              <h2 className="mb-2 text-2xl md:text-3xl">{c.title}</h2>
              <p className="text-sm leading-relaxed text-foreground/65 md:text-base">{c.text}</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href={pdf.href}
                download={pdf.filename}
                className="btn-premium btn-gold inline-flex justify-center"
              >
                <Download className="h-4 w-4" />
                {t.pages.about.download}
                <span className="font-normal normal-case tracking-normal opacity-80">
                  · {pdf.sizeLabel}
                </span>
              </a>
              <Link
                href="/machines"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border)] bg-background px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                <Truck className="h-4 w-4 text-primary" />
                {c.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
