"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { siteVisuals } from "@/lib/site-content";

const sectors = [
  {
    key: "agriculture" as const,
    image: siteVisuals.agriculture,
    href: "/machines?cat=Agriculture%20%26%20Sylviculture",
    span: "md:col-span-2 md:row-span-1",
    tall: false,
  },
  {
    key: "mining" as const,
    image: siteVisuals.mining,
    href: "/machines?cat=Mines%20%26%20Carri%C3%A8res",
    span: "md:col-span-1 md:row-span-2",
    tall: true,
  },
  {
    key: "construction" as const,
    image: siteVisuals.worksite,
    href: "/machines?cat=B%C3%A2timent%20%26%20Construction",
    span: "md:col-span-1",
    tall: false,
  },
  {
    key: "road" as const,
    image: siteVisuals.road,
    href: "/machines?cat=Construction%20Routi%C3%A8re",
    span: "md:col-span-1",
    tall: false,
  },
  {
    key: "waste" as const,
    image: siteVisuals.waste,
    href: "/machines?cat=Gestion%20des%20D%C3%A9chets",
    span: "md:col-span-1",
    tall: false,
  },
  {
    key: "industry" as const,
    image: siteVisuals.warehouse,
    href: "/machines?cat=Industrie%20%26%20Entreposage",
    span: "md:col-span-2",
    tall: false,
  },
];

export default function SectorsSection() {
  const { t } = useI18n();

  return (
    <section className="overflow-hidden bg-[#0F172A] py-16 text-white md:py-24">
      <div className="container mx-auto px-6">
        <Reveal className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            {t.home.sectorsEyebrow}
          </p>
          <h2 className="mb-4 text-3xl leading-tight md:text-5xl">
            {t.home.sectorsTitle}
          </h2>
          <p className="leading-relaxed text-white/65">{t.home.sectorsText}</p>
        </Reveal>

        <div className="grid auto-rows-[220px] grid-cols-1 gap-3 md:auto-rows-[240px] md:grid-cols-3">
          {sectors.map((sector, index) => {
            const copy = t.sectors[sector.key];
            return (
              <Reveal
                key={sector.key}
                delay={index * 0.04}
                blur={false}
                className={sector.span}
              >
                <TiltCard intensity={index % 2 === 0 ? 8 : 5} className="h-full">
                  <Link
                    href={sector.href}
                    className={`group relative block h-full overflow-hidden rounded-3xl ${
                      sector.tall ? "min-h-[220px] md:min-h-full" : ""
                    }`}
                  >
                    <Image
                      src={sector.image}
                      alt={copy.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                      <h3 className="mb-1 text-xl md:text-2xl">{copy.title}</h3>
                      <p className="text-sm text-white/70">{copy.description}</p>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
