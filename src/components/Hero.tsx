"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, ShieldCheck, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 bg-[#0A0F1C]">
        <Image
          src="/images/hero-industrial.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(212,175,55,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(212,175,55,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "4rem 4rem",
          }}
        />
        <div className="absolute top-0 left-[20%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-[10%] bottom-0 h-[50%] w-[30%] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/50 to-[#0A0F1C]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1C] via-[#0A0F1C]/55 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_400px]">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 px-4 py-1.5 glass">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Solutions industrielles & minières
                </span>
              </div>

              <h1 className="mb-8 text-3xl font-bold leading-[0.9] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                Mashal <br />
                <span className="text-primary">Equipment</span>
              </h1>

              <p className="mb-12 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
                Équipements lourds, pièces détachées, support technique et logistique
                export pour sécuriser la continuité d&apos;exploitation de vos chantiers.
              </p>

              <div className="flex flex-wrap gap-6">
                <Link href="/sav?type=devis" className="btn-premium btn-gold group">
                  Demander un devis
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/machines"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition-all hover:bg-white/10"
                >
                  <Globe className="h-5 w-5 text-primary" />
                  Voir le catalogue
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/visuals/wheel-loader.jpg"
                  alt="Chargeuse Mashal Equipment"
                  fill
                  sizes="400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 space-y-3 p-6">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-bold text-white">Disponibilité & confiance</p>
                    <p className="text-[10px] uppercase tracking-widest text-white/45">
                      Pièces · SAV · Export
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
                  <Zap className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-bold text-white">Support cycle de vie</p>
                    <p className="text-[10px] uppercase tracking-widest text-white/45">
                      Maintenance & formation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-24 grid grid-cols-2 gap-8 border-t border-white/10 pt-12 md:grid-cols-4"
        >
          {[
            { label: "Produits catalogue", value: "40+" },
            { label: "Secteurs couverts", value: "6" },
            { label: "Services support", value: "4" },
            { label: "Expertise métier", value: "360°" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="mb-1 text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
