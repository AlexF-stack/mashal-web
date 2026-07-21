"use client";

import Link from "next/link";
import {
  ClipboardCheck,
  HardHat,
  Headset,
  PackageSearch,
  UserCog,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import ExpertiseBlock from "@/components/ExpertiseBlock";
import ContactForm from "@/components/ContactForm";
import { EXPERTISE_KEYS } from "@/lib/expertises-i18n";
import { siteVisuals } from "@/lib/site-content";
import { useI18n } from "@/lib/i18n-context";
import { Reveal } from "@/components/motion/Reveal";
import { Suspense } from "react";

const icons = [UserCog, ClipboardCheck, Headset, PackageSearch, HardHat] as const;

export default function ExpertisesPageContent() {
  const { t } = useI18n();
  const p = t.expertises.page;

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
        backgroundImage={siteVisuals.worksite}
      />

      <section className="sticky top-[4.5rem] z-30 border-b border-[color:var(--border)] bg-[color:var(--surface)]/95 py-3 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <Reveal blur={false}>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-foreground/40">
              {p.navLabel}
            </p>
            <nav
              aria-label={p.navLabel}
              className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {EXPERTISE_KEYS.map((key) => {
                const item = t.expertises.items[key];
                return (
                  <Link
                    key={key}
                    href={`#${item.id}`}
                    className="shrink-0 rounded-full border border-[color:var(--border)] bg-background px-4 py-2 text-xs font-bold text-foreground/75 transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </Reveal>
        </div>
      </section>

      {EXPERTISE_KEYS.map((key, index) => (
        <ExpertiseBlock key={key} expertiseKey={key} icon={icons[index]!} index={index} />
      ))}

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <Reveal blur={false}>
              <div className="rounded-3xl border border-primary/20 bg-primary/5 px-8 py-10 md:px-12">
                <h2 className="mb-4 text-3xl md:text-4xl">{p.primary}</h2>
                <p className="max-w-xl leading-relaxed text-foreground/70">{p.description}</p>
              </div>
            </Reveal>
            <div className="rounded-3xl border border-[color:var(--border)] bg-card p-8">
              <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-foreground/5" />}>
                <ContactForm
                  heading={p.primary}
                  description={p.description}
                  submitLabel={t.contact.submit}
                  hiddenContext="Expertises Mashal"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
