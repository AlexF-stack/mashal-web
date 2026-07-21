"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ArticleHighlights from "@/components/ArticleHighlights";
import SectorsSection from "@/components/SectorsSection";
import FounderSection from "@/components/FounderSection";
import Hero from "@/components/Hero";
import FeaturedMachines from "@/components/FeaturedMachines";
import CategoryFinder from "@/components/CategoryFinder";
import CoreServices from "@/components/CoreServices";
import TrustStrip from "@/components/TrustStrip";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { siteVisuals } from "@/lib/site-content";
import { useI18n } from "@/lib/i18n-context";

export default function HomeContent() {
  const { t } = useI18n();

  const services = [
    {
      title: t.home.partsTitle,
      text: t.home.partsText,
      href: "/pieces",
      image: siteVisuals.parts,
    },
    {
      title: t.home.savTitle,
      text: t.home.savText,
      href: "/sav",
      image: siteVisuals.sav,
    },
    {
      title: t.home.logisticsTitle,
      text: t.home.logisticsText,
      href: "/logistique",
      image: siteVisuals.logistics,
    },
  ];

  return (
    <>
      <Hero />
      <CoreServices />
      <TrustStrip />

      <section className="border-b border-[color:var(--border)] py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <Reveal>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                {t.home.servicesEyebrow}
              </p>
              <h2 className="mb-4 text-3xl leading-tight md:text-5xl">
                {t.home.servicesTitle}
              </h2>
              <p className="max-w-md leading-relaxed text-foreground/65">
                {t.home.servicesLead}
              </p>
            </Reveal>

            <div className="space-y-0 divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
              {services.map((item, index) => (
                <Reveal key={item.href} delay={index * 0.06} blur={false}>
                  <Link
                    href={item.href}
                    className="group grid gap-4 py-6 transition-colors sm:grid-cols-[140px_1fr_auto] sm:items-center"
                  >
                    <div className="relative h-24 overflow-hidden rounded-2xl sm:h-20">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="140px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <h3 className="mb-1 text-xl font-semibold group-hover:text-primary">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground/60">{item.text}</p>
                    </div>
                    <ArrowUpRight className="hidden h-5 w-5 text-primary sm:block" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectorsSection />
      <CategoryFinder />
      <FeaturedMachines />
      <FounderSection />
      <ArticleHighlights />

      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={siteVisuals.logistics}
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
