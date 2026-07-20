"use client";

import Image from "next/image";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import LogisticsTimeline from "@/components/LogisticsTimeline";
import ContactForm from "@/components/ContactForm";
import { logisticsSteps, siteVisuals } from "@/lib/site-content";
import { useI18n } from "@/lib/i18n-context";
import { Reveal } from "@/components/motion/Reveal";

export default function LogisticsPageContent() {
  const { t } = useI18n();
  const p = t.pages.logistique;

  return (
    <>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        highlight={p.highlight}
        description={p.description}
        primaryHref="/sav?type=export"
        primaryLabel={p.primary}
        secondaryHref="/machines"
        secondaryLabel={p.secondary}
        backgroundImage={siteVisuals.logistics}
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="grid overflow-hidden rounded-3xl border border-[color:var(--border)] bg-card lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[340px]">
                <Image
                  src={siteVisuals.logistics}
                  alt={p.eyebrow}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-8 md:p-12">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-primary">
                  {p.flowEyebrow}
                </p>
                <h2 className="mb-5 text-3xl md:text-4xl">{p.flowTitle}</h2>
                <div className="space-y-5">
                  {logisticsSteps.map((step, index) => {
                    const copy = t.logisticsSteps[step.key];
                    return (
                      <div key={step.key} className="flex gap-4">
                        <span className="text-sm font-bold text-primary">
                          0{index + 1}
                        </span>
                        <div>
                          <p className="mb-1 font-semibold">{copy.title}</p>
                          <p className="text-sm leading-relaxed text-foreground/65">
                            {copy.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0F172A] py-16 text-white md:py-20">
        <div className="container mx-auto px-6">
          <Reveal className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              {p.flowEyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl">{p.flowTitle}</h2>
          </Reveal>
          <LogisticsTimeline />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="rounded-3xl border border-[color:var(--border)] bg-card p-8 md:p-10">
            <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-foreground/5" />}>
              <ContactForm
                heading={p.formTitle}
                description={p.description}
                submitLabel={t.contact.submit}
                hiddenContext="Logistique export"
                defaultType="export"
              />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
