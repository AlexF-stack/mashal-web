"use client";

import PageHero from "@/components/PageHero";
import TCOCalculator from "@/components/TCOCalculator";
import { siteVisuals } from "@/lib/site-content";
import { useI18n } from "@/lib/i18n-context";

export default function OutilsPageContent() {
  const { t } = useI18n();
  const p = t.pages.outils;

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
        backgroundImage={siteVisuals.loader}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <TCOCalculator />
        </div>
      </section>
    </>
  );
}
