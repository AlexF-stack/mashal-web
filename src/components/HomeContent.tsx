"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import ArticleHighlights from "@/components/ArticleHighlights";
import SectorsSection from "@/components/SectorsSection";
import FounderSection from "@/components/FounderSection";
import Hero from "@/components/Hero";
import MachineGrid from "@/components/MachineGrid";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { siteVisuals } from "@/lib/site-content";
import { useI18n } from "@/lib/i18n-context";

export default function HomeContent() {
  const { t } = useI18n();

  const serviceLinks = [
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

      <section className="border-b border-[color:var(--border)] py-16 md:py-20">
        <div className="container mx-auto px-6">
          <Reveal className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              {t.home.servicesEyebrow}
            </p>
            <h2 className="text-3xl leading-tight md:text-5xl">{t.home.servicesTitle}</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {serviceLinks.map((item, index) => (
              <Reveal key={item.href} delay={index * 0.08} blur={false}>
                <TiltCard intensity={9}>
                  <Link
                    href={item.href}
                    className="group relative block min-h-[280px] overflow-hidden rounded-3xl"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/45 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-7 [transform:translateZ(24px)]">
                      <h3 className="mb-2 text-2xl text-white">{item.title}</h3>
                      <p className="mb-4 text-sm leading-relaxed text-white/70">{item.text}</p>
                      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        {t.home.explore} <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectorsSection />
      <MachineGrid />
      <FounderSection />
      <ArticleHighlights />

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={siteVisuals.worksite}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-background/88" />
        </div>
        <Reveal className="container relative z-10 mx-auto px-6 text-center">
          <h2 className="mx-auto mb-5 max-w-3xl text-4xl md:text-6xl">
            {t.home.ctaTitle} <span className="text-primary">{t.home.ctaAccent}</span> ?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-foreground/65 md:text-lg">
            {t.home.ctaSub}
          </p>
          <MagneticButton href="/sav?type=devis" className="btn-premium btn-gold inline-flex">
            {t.home.ctaButton}
          </MagneticButton>
        </Reveal>
      </section>
    </>
  );
}
