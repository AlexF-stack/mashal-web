"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { categoryLabel } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { siteVisuals } from "@/lib/site-content";

const families = [
  {
    category: "Bâtiment & Construction",
    image: "/images/machines/pelle-hydraulique-20t.webp",
    href: "/machines?cat=B%C3%A2timent%20%26%20Construction",
  },
  {
    category: "Construction Routière",
    image: siteVisuals.road,
    href: "/machines?cat=Construction%20Routi%C3%A8re",
  },
  {
    category: "Mines & Carrières",
    image: siteVisuals.mining,
    href: "/machines?cat=Mines%20%26%20Carri%C3%A8res",
  },
  {
    category: "Agriculture & Sylviculture",
    image: siteVisuals.agriculture,
    href: "/machines?cat=Agriculture%20%26%20Sylviculture",
  },
  {
    category: "Industrie & Entreposage",
    image: siteVisuals.warehouse,
    href: "/machines?cat=Industrie%20%26%20Entreposage",
  },
  {
    category: "Gestion des Déchets",
    image: siteVisuals.waste,
    href: "/machines?cat=Gestion%20des%20D%C3%A9chets",
  },
];

/** Manitou / dealer pattern: inventory-first category finder */
export default function CategoryFinder() {
  const { t } = useI18n();

  return (
    <section className="border-b border-[color:var(--border)] bg-background py-14 md:py-16">
      <div className="container mx-auto px-6">
        <Reveal className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              {t.home.findEyebrow}
            </p>
            <h2 className="text-3xl leading-tight md:text-4xl">{t.home.findTitle}</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-foreground/60 md:text-right">
            {t.home.findText}
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {families.map((family, index) => (
            <Reveal key={family.category} delay={index * 0.04} blur={false}>
              <Link
                href={family.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-[#0F172A] md:aspect-[4/5]"
              >
                <Image
                  src={family.image}
                  alt={categoryLabel(t, family.category)}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 md:p-4">
                  <span className="text-xs font-semibold leading-snug text-white md:text-sm">
                    {categoryLabel(t, family.category)}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-primary" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
