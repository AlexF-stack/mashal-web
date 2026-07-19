"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sprout,
  Trash2,
  HardHat,
  Warehouse,
  Pickaxe,
  Construction,
} from "lucide-react";

const sectors = [
  {
    title: "Agriculture & Sylviculture",
    icon: Sprout,
    description: "Solutions pour l'exploitation durable et la mécanisation agricole.",
    image: "/visuals/wheel-loader.jpg",
  },
  {
    title: "Gestion des Déchets",
    icon: Trash2,
    description: "Équipements de manutention et de traitement pour l'économie circulaire.",
    image: "/visuals/parts-stock.jpg",
  },
  {
    title: "Bâtiment & Construction",
    icon: HardHat,
    description: "Engins de terrassement et de levage pour tous vos chantiers BTP.",
    image: "/visuals/excavator-worksite.jpg",
  },
  {
    title: "Industrie & Entreposage",
    icon: Warehouse,
    description: "Solutions logistiques et chariots élévateurs pour flux intensifs.",
    image: "/visuals/logistics-port.jpg",
  },
  {
    title: "Mines & Carrières",
    icon: Pickaxe,
    description: "Matériel lourd haute performance pour environnements extrêmes.",
    image: "/mashal_hero_mining.png",
  },
  {
    title: "Construction Routière",
    icon: Construction,
    description: "Niveleuses, finisseurs et compacteurs pour infrastructures durables.",
    image: "/images/hero-industrial.webp",
  },
];

export default function SectorsSection() {
  return (
    <section className="overflow-hidden bg-background py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Expertise multi-secteurs
            </p>
            <h2 className="mb-8 text-4xl leading-[0.9] md:text-5xl lg:text-6xl">
              Des solutions adaptées à{" "}
              <span className="italic text-primary">chaque défi</span>
            </h2>
            <p className="text-lg leading-relaxed text-foreground/60">
              Mashal Equipment accompagne ses clients dans des secteurs exigeants, avec des
              engins et services calés sur chaque environnement opérationnel.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative h-[400px] overflow-hidden rounded-[2.5rem] border border-white/10"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={sector.image}
                  alt={sector.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover brightness-[0.45] transition-transform duration-700 group-hover:scale-110 group-hover:brightness-[0.55]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-end p-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/20 text-primary backdrop-blur-xl transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-background">
                  <sector.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-4 text-2xl transition-colors group-hover:text-primary">
                  {sector.title}
                </h3>
                <p className="translate-y-4 text-sm leading-relaxed text-foreground/60 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {sector.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
