"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { useI18n } from "@/lib/i18n-context";

const sectors = [
  {
    title: { fr: "Agriculture & Sylviculture", en: "Agriculture & Forestry" },
    description: {
      fr: "Mécanisation agricole et exploitation forestière.",
      en: "Farm mechanization and forestry operations.",
    },
    image: "/visuals/agriculture.webp",
    href: "/machines?cat=Agriculture%20%26%20Sylviculture",
  },
  {
    title: { fr: "Gestion des Déchets", en: "Waste Management" },
    description: {
      fr: "Manutention et traitement pour l'économie circulaire.",
      en: "Handling and processing for circular economy.",
    },
    image: "/visuals/waste.webp",
    href: "/machines?cat=Gestion%20des%20D%C3%A9chets",
  },
  {
    title: { fr: "Bâtiment & Construction", en: "Building & Construction" },
    description: {
      fr: "Terrassement et levage pour chantiers BTP.",
      en: "Earthmoving and lifting for construction sites.",
    },
    image: "/visuals/excavator-worksite.jpg",
    href: "/machines?cat=B%C3%A2timent%20%26%20Construction",
  },
  {
    title: { fr: "Industrie & Entreposage", en: "Industry & Warehousing" },
    description: {
      fr: "Flux intensifs et chariots élévateurs.",
      en: "Intensive flows and forklift solutions.",
    },
    image: "/visuals/warehouse.webp",
    href: "/machines?cat=Industrie%20%26%20Entreposage",
  },
  {
    title: { fr: "Mines & Carrières", en: "Mining & Quarries" },
    description: {
      fr: "Matériel lourd pour environnements extrêmes.",
      en: "Heavy equipment for extreme environments.",
    },
    image: "/mashal_hero_mining.png",
    href: "/machines?cat=Mines%20%26%20Carri%C3%A8res",
  },
  {
    title: { fr: "Construction Routière", en: "Road Construction" },
    description: {
      fr: "Niveleuses, finisseurs et compacteurs.",
      en: "Graders, pavers and compactors.",
    },
    image: "/visuals/road.webp",
    href: "/machines?cat=Construction%20Routi%C3%A8re",
  },
];

export default function SectorsSection() {
  const { t, language } = useI18n();
  const lang = language === "en" ? "en" : "fr";

  return (
    <section className="overflow-hidden bg-background py-20 md:py-24">
      <div className="container mx-auto px-6">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            {t.home.sectorsEyebrow}
          </p>
          <h2 className="mb-4 text-3xl leading-tight md:text-5xl">
            {t.home.sectorsTitle}
          </h2>
          <p className="leading-relaxed text-foreground/65">{t.home.sectorsText}</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, index) => (
            <Reveal key={sector.href} delay={index * 0.05} blur={false}>
              <TiltCard intensity={9}>
                <Link
                  href={sector.href}
                  className="group relative block h-[320px] overflow-hidden rounded-3xl"
                >
                  <Image
                    src={sector.image}
                    alt={sector.title[lang]}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 [transform:translateZ(28px)]">
                    <h3 className="mb-2 text-xl text-white md:text-2xl">
                      {sector.title[lang]}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/70">
                      {sector.description[lang]}
                    </p>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
