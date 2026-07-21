"use client";

import Image from "next/image";
import { BadgeCheck, ClipboardList, GraduationCap, Wrench } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { serviceOffers, siteVisuals } from "@/lib/site-content";
import ProjectSupport from "@/components/ProjectSupport";
import { Suspense } from "react";
import { useI18n } from "@/lib/i18n-context";
import { Reveal } from "@/components/motion/Reveal";
import { IconBadge } from "@/components/ui/IconBadge";

const icons = [Wrench, ClipboardList, GraduationCap, BadgeCheck];

export default function SavPageContent() {
  const { t } = useI18n();
  const p = t.pages.sav;

  return (
    <>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        highlight={p.highlight}
        description={p.description}
        primaryHref="/pieces"
        primaryLabel={p.primary}
        secondaryHref="/logistique"
        secondaryLabel={p.secondary}
        backgroundImage={siteVisuals.sav}
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="grid overflow-hidden rounded-3xl border border-[color:var(--border)] bg-card lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-8 md:p-12">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-primary">
                  {p.fieldEyebrow}
                </p>
                <h2 className="mb-5 text-3xl md:text-4xl">{p.fieldTitle}</h2>
                <p className="leading-relaxed text-foreground/70">{p.fieldText}</p>
              </div>
              <div className="relative min-h-[320px]">
                <Image
                  src={siteVisuals.sav}
                  alt={p.eyebrow}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <Reveal className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              {p.offersEyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl">{p.offersTitle}</h2>
          </Reveal>

          <div className="space-y-0 divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
            {serviceOffers.map((service, index) => {
              const Icon = icons[index] ?? Wrench;
              const copy = t.serviceOffers[service.key];
              return (
                <Reveal key={service.key} delay={index * 0.05} blur={false}>
                  <div
                    id={service.key === "training" ? "formation" : undefined}
                    className="grid gap-4 py-7 md:grid-cols-[56px_1fr_1.2fr] md:items-start"
                  >
                    <IconBadge icon={Icon} size="md" variant="gold" />
                    <h3 className="text-2xl">{copy.title}</h3>
                    <p className="leading-relaxed text-foreground/65">{copy.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--border)] py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Suspense fallback={<div className="h-40 animate-pulse rounded-2xl bg-foreground/5" />}>
              <ProjectSupport />
            </Suspense>
            <div className="rounded-3xl border border-[color:var(--border)] bg-card p-8">
              <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-foreground/5" />}>
                <ContactForm
                  heading={p.formTitle}
                  description={p.fieldText}
                  submitLabel={t.contact.submit}
                  hiddenContext="SAV / Project Request"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
