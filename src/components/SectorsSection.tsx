"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const sectors = [
  {
    title: "Agriculture & Sylviculture",
    description: "Mécanisation agricole et exploitation forestière.",
    image: "/visuals/wheel-loader.jpg",
    href: "/machines?cat=Agriculture%20%26%20Sylviculture",
  },
  {
    title: "Gestion des Déchets",
    description: "Manutention et traitement pour l'économie circulaire.",
    image: "/visuals/parts-stock.jpg",
    href: "/machines?cat=Gestion%20des%20D%C3%A9chets",
  },
  {
    title: "Bâtiment & Construction",
    description: "Terrassement et levage pour chantiers BTP.",
    image: "/visuals/excavator-worksite.jpg",
    href: "/machines?cat=B%C3%A2timent%20%26%20Construction",
  },
  {
    title: "Industrie & Entreposage",
    description: "Flux intensifs et chariots élévateurs.",
    image: "/visuals/logistics-port.jpg",
    href: "/machines?cat=Industrie%20%26%20Entreposage",
  },
  {
    title: "Mines & Carrières",
    description: "Matériel lourd pour environnements extrêmes.",
    image: "/mashal_hero_mining.png",
    href: "/machines?cat=Mines%20%26%20Carri%C3%A8res",
  },
  {
    title: "Construction Routière",
    description: "Niveleuses, finisseurs et compacteurs.",
    image: "/images/hero-industrial.webp",
    href: "/machines?cat=Construction%20Routi%C3%A8re",
  },
];

export default function SectorsSection() {
  return (
    <section className="overflow-hidden bg-background py-20 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Secteurs
          </p>
          <h2 className="mb-4 text-3xl leading-tight md:text-5xl">
            Adapté à chaque terrain
          </h2>
          <p className="leading-relaxed text-foreground/65">
            Engins et services calés sur l&apos;environnement opérationnel de vos équipes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              <Link
                href={sector.href}
                className="group relative block h-[320px] overflow-hidden rounded-3xl"
              >
                <Image
                  src={sector.image}
                  alt={sector.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="mb-2 text-xl text-white md:text-2xl">{sector.title}</h3>
                  <p className="text-sm leading-relaxed text-white/70">{sector.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
