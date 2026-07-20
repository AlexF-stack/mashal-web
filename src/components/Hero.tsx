"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 md:items-center md:pb-24 md:pt-32">
      <div className="absolute inset-0 z-0">
        <Image
          src="/visuals/excavator-worksite.jpg"
          alt="Engin de chantier Mashal Equipment"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0B1220]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/35 to-[#0B1220]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/80 via-[#0B1220]/25 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            Mashal Equipment
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Engins, pièces et support
            <span className="block text-primary">pour chantiers exigeants</span>
          </h1>
          <p className="mb-10 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            Catalogue machines, disponibilité des pièces, SAV et logistique export —
            un interlocuteur pour tout le cycle de vie.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/machines" className="btn-premium btn-gold">
              Voir le catalogue
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sav?type=devis"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
            >
              Demander un devis
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
