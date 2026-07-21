"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ArticleHighlights from "@/components/ArticleHighlights";
import SectorsSection from "@/components/SectorsSection";
import FounderSection from "@/components/FounderSection";
import Hero from "@/components/Hero";
import CoreServices from "@/components/CoreServices";
import SiteManagementSection from "@/components/SiteManagementSection";
import CatalogTeaser from "@/components/CatalogTeaser";
import TrustStrip from "@/components/TrustStrip";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { siteVisuals } from "@/lib/site-content";
import { useI18n } from "@/lib/i18n-context";

export default function HomeContent() {
  const { t } = useI18n();

  return (
    <>
      <Hero />
      <CoreServices />
      <TrustStrip />
      <SiteManagementSection />
      <SectorsSection />
      <CatalogTeaser />
      <FounderSection />
      <ArticleHighlights />

      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={siteVisuals.sav}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-background/90" />
        </div>
        <Reveal className="container relative z-10 mx-auto px-6">
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <h2 className="mb-4 text-3xl md:text-5xl">
                {t.home.ctaTitle}{" "}
                <span className="text-primary">{t.home.ctaAccent}</span> ?
              </h2>
              <p className="leading-relaxed text-foreground/65">{t.home.ctaSub}</p>
            </div>
            <MagneticButton href="/sav?type=devis" className="btn-premium btn-gold shrink-0">
              {t.home.ctaButton}
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
