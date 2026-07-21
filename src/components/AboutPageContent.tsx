"use client";

import FounderSection from "@/components/FounderSection";
import PageHero from "@/components/PageHero";
import { siteVisuals } from "@/lib/site-content";
import { company } from "@/lib/company";
import { companyDocuments } from "@/lib/documents";
import { useI18n } from "@/lib/i18n-context";
import Link from "next/link";
import { Download, FileText, Globe2, Handshake, ShieldCheck, Sparkles, Target } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { IconBadge } from "@/components/ui/IconBadge";

const valueKeys = ["h1", "h2", "h3", "h4"] as const;
const valueIcons = [ShieldCheck, Target, Sparkles, Globe2];

export default function AboutPageContent() {
  const { t } = useI18n();
  const p = t.pages.about;

  const downloads = [
    {
      key: "presentation",
      title: p.presentationTitle,
      text: p.presentationText,
      doc: companyDocuments.presentation,
    },
    {
      key: "catalogue",
      title: p.catalogueTitle,
      text: p.catalogueText,
      doc: companyDocuments.catalogue,
    },
  ] as const;

  return (
    <>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        highlight={p.highlight}
        description={p.description}
        primaryHref="/sav?type=devis"
        primaryLabel={p.primary}
        secondaryHref="/machines"
        secondaryLabel={p.secondary}
        backgroundImage={siteVisuals.founders}
      />

      <section className="border-b border-[color:var(--border)] py-16 md:py-24">
        <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-2">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              {p.visionEyebrow}
            </p>
            <h2 className="mb-4 text-3xl md:text-4xl">{p.visionTitle}</h2>
            <p className="leading-relaxed text-foreground/70">{p.visionText}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              {p.missionEyebrow}
            </p>
            <h2 className="mb-4 text-3xl md:text-4xl">{p.missionTitle}</h2>
            <p className="leading-relaxed text-foreground/70">{p.missionText}</p>
          </Reveal>
        </div>
      </section>

      <section
        id="documents"
        className="border-b border-[color:var(--border)] bg-[color:var(--surface)] py-16 md:py-20"
      >
        <div className="container mx-auto px-6">
          <Reveal className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              {p.documentsEyebrow}
            </p>
            <h2 className="mb-4 text-3xl md:text-5xl">{p.documentsTitle}</h2>
            <p className="leading-relaxed text-foreground/65">{p.documentsLead}</p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {downloads.map((item, index) => (
              <Reveal key={item.key} delay={index * 0.06} blur={false}>
                <article className="flex h-full flex-col rounded-3xl border border-[color:var(--border)] bg-background p-7">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-foreground/65">
                    {item.text}
                  </p>
                  <a
                    href={item.doc.href}
                    download={item.doc.filename}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-primary hover:underline"
                  >
                    <Download className="h-4 w-4" aria-hidden />
                    {p.download}
                    <span className="font-normal normal-case tracking-normal text-foreground/45">
                      · {item.doc.sizeLabel}
                    </span>
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FounderSection />

      <section className="border-t border-[color:var(--border)] py-16 md:py-24">
        <div className="container mx-auto px-6">
          <Reveal className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              {p.valuesEyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl">{p.valuesTitle}</h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {valueKeys.map((key, index) => {
              const Icon = valueIcons[index];
              return (
                <Reveal key={key} delay={index * 0.05} blur={false}>
                  <div className="h-full rounded-3xl border border-[color:var(--border)] p-7">
                    <IconBadge icon={Icon} variant="gold" className="mb-4" />
                    <h3 className="mb-2 text-lg font-semibold">{t.founder[key]}</h3>
                    <p className="text-sm leading-relaxed text-foreground/65">
                      {t.founder[`${key}Text`]}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--border)] bg-[color:var(--surface)] py-16 md:py-20">
        <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              {p.partnerEyebrow}
            </p>
            <h2 className="mb-4 text-3xl md:text-5xl">{p.partnerTitle}</h2>
            <p className="max-w-xl leading-relaxed text-foreground/70">{p.partnerText}</p>
          </Reveal>
          <Reveal delay={0.08} blur={false}>
            <div className="rounded-3xl border border-[color:var(--border)] bg-background p-8">
              <IconBadge icon={Handshake} variant="gold" className="mb-4" />
              <p className="text-2xl font-semibold">HMD</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                {p.partnerCardText}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="chantiers"
        className="border-t border-[color:var(--border)] py-16 md:py-24"
      >
        <div className="container mx-auto px-6">
          {(() => {
            const sites = t.expertises.items.sites;
            return (
              <>
                <Reveal className="mb-10 max-w-3xl">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
                    {p.chantiersEyebrow}
                  </p>
                  <h2 className="mb-4 text-3xl md:text-5xl">{sites.title}</h2>
                  <p className="text-lg font-medium text-primary/90">{sites.tagline}</p>
                  <p className="mt-4 leading-relaxed text-foreground/70">{sites.intro}</p>
                  <p className="mt-3 leading-relaxed text-foreground/60">{sites.body}</p>
                </Reveal>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {sites.highlights.map((highlight, index) => (
                    <Reveal key={highlight.title} delay={index * 0.05} blur={false}>
                      <div className="h-full rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
                        <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-primary">
                          {highlight.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-foreground/65">{highlight.text}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-4">
                  <Link href="/expertises#chantiers" className="btn-premium btn-gold inline-flex">
                    {sites.cta}
                  </Link>
                  <Link
                    href="/sav?type=devis"
                    className="inline-flex items-center rounded-full border border-[color:var(--border)] px-6 py-3 text-sm font-bold uppercase tracking-wide hover:border-primary/40"
                  >
                    {p.primary}
                  </Link>
                </Reveal>

                <Reveal delay={0.12} className="mt-12">
                  <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                      {t.footer.holding} {company.parentHolding.name}
                    </p>
                    <p className="mt-4 leading-relaxed text-foreground/70">
                      Mashal Equipment s&apos;inscrit dans l&apos;écosystème HERNA HOLDING aux côtés de
                      Tsalach Development et The Pertinent Group.
                    </p>
                    <a
                      href={company.parentHolding.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex text-sm font-bold uppercase tracking-[0.16em] text-primary hover:underline"
                    >
                      {company.parentHolding.name} →
                    </a>
                  </div>
                </Reveal>
              </>
            );
          })()}
        </div>
      </section>
    </>
  );
}
