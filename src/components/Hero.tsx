"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useRef } from "react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useI18n } from "@/lib/i18n-context";
import { siteVisuals } from "@/lib/site-content";
import { company, companyLinks } from "@/lib/company";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92svh] items-end overflow-hidden pb-14 pt-28 md:min-h-[100svh] md:items-center md:pb-24 md:pt-32"
    >
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src={siteVisuals.sav}
          alt="Équipe technique Mashal Equipment"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center ${reduced ? "" : "media-kenburns"}`}
        />
        <div className="absolute inset-0 bg-[#0B1220]/52" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/35 to-[#0B1220]/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/82 via-[#0B1220]/25 to-transparent" />
      </motion.div>

      <motion.div style={{ opacity }} className="container relative z-10 mx-auto px-6">
        <div className="max-w-3xl">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary"
          >
            {t.home.brand}
          </motion.p>
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease }}
            className="mb-5 text-4xl font-bold leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t.home.headline}
            <span className="block text-primary">{t.home.headlineAccent}</span>
          </motion.h1>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease }}
            className="mb-8 max-w-xl text-base leading-relaxed text-white/78 md:text-lg"
          >
            {t.home.sub}
          </motion.p>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.42, ease }}
            className="flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#services" className="btn-premium btn-gold">
              {t.home.ctaServices}
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href="/machines"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
            >
              {t.home.ctaCatalog}
            </MagneticButton>
            <MagneticButton
              href="/sav?type=devis"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-sm transition-colors hover:border-primary hover:text-primary max-md:hidden"
            >
              {t.home.ctaQuote}
            </MagneticButton>
            <a
              href={companyLinks.phone}
              className="hidden items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-primary hover:text-primary md:inline-flex"
            >
              <Phone className="h-4 w-4 text-primary" />
              {company.phoneDisplay}
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
