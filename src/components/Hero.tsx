"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useI18n } from "@/lib/i18n-context";
import { siteVisuals } from "@/lib/site-content";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 md:items-center md:pb-24 md:pt-32"
    >
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src={siteVisuals.worksite}
          alt="Engin de chantier Mashal Equipment"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center ${reduced ? "" : "media-kenburns"}`}
        />
        <div className="absolute inset-0 bg-[#0B1220]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/30 to-[#0B1220]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/78 via-[#0B1220]/20 to-transparent" />
      </motion.div>

      <motion.div style={{ opacity }} className="container relative z-10 mx-auto px-6">
        <div className="max-w-3xl">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-primary"
          >
            {t.home.brand}
          </motion.p>
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease }}
            className="mb-6 text-4xl font-bold leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t.home.headline}
            <span className="block text-primary">{t.home.headlineAccent}</span>
          </motion.h1>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="mb-10 max-w-xl text-base leading-relaxed text-white/78 md:text-lg"
          >
            {t.home.sub}
          </motion.p>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.48, ease }}
            className="flex flex-wrap gap-3"
          >
            <MagneticButton href="/machines" className="btn-premium btn-gold">
              {t.home.ctaCatalog}
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href="/sav?type=devis"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
            >
              {t.home.ctaQuote}
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
