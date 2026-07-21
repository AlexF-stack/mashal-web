"use client";

import FounderSection from "@/components/FounderSection";
import PageHero from "@/components/PageHero";
import { siteVisuals } from "@/lib/site-content";
import { company } from "@/lib/company";
import { useI18n } from "@/lib/i18n-context";
import Link from "next/link";
import { Globe2, ShieldCheck, Sparkles, Target } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const valueKeys = ["h1", "h2", "h3", "h4"] as const;
const valueIcons = [ShieldCheck, Target, Sparkles, Globe2];

export default function AboutPageContent() {
  const { t } = useI18n();
  const p = t.pages.about;

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
                    <Icon className="mb-4 h-6 w-6 text-primary" />
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

      <section
        id="chantiers"
        className="border-t border-[color:var(--border)] bg-[color:var(--surface)] py-16 md:py-24"
      >
        <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              {p.chantiersEyebrow}
            </p>
            <h2 className="mb-4 text-3xl md:text-5xl">{p.chantiersTitle}</h2>
            <p className="leading-relaxed text-foreground/70">{p.chantiersText}</p>
            <Link href="/sav?type=devis" className="btn-premium btn-gold mt-8 inline-flex">
              {p.primary}
            </Link>
          </Reveal>
          <Reveal delay={0.08} blur={false}>
            <div className="rounded-3xl border border-[color:var(--border)] bg-background p-8">
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
        </div>
      </section>
    </>
  );
}
