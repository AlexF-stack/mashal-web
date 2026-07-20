"use client";

import FounderSection from "@/components/FounderSection";
import PageHero from "@/components/PageHero";
import { siteVisuals } from "@/lib/site-content";
import { useI18n } from "@/lib/i18n-context";
import Link from "next/link";
import { Globe2, HeartHandshake, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const values = [
  { icon: ShieldCheck, key: "h1" as const },
  { icon: HeartHandshake, key: "h2" as const },
  { icon: Globe2, key: "h3" as const },
];

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

      <FounderSection />

      <section className="border-t border-[color:var(--border)] py-16 md:py-24">
        <div className="container mx-auto px-6">
          <Reveal className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              {t.home.foundersEyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl">{t.founder.title}</h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((item, index) => (
              <Reveal key={item.key} delay={index * 0.06} blur={false}>
                <div className="rounded-3xl border border-[color:var(--border)] p-7">
                  <item.icon className="mb-4 h-6 w-6 text-primary" />
                  <p className="text-sm font-semibold leading-relaxed text-foreground/80">
                    {t.founder[item.key]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/machines" className="btn-premium btn-gold">
              {p.secondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
