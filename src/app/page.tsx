import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import ArticleHighlights from "@/components/ArticleHighlights";
import SectorsSection from "@/components/SectorsSection";
import FounderSection from "@/components/FounderSection";
import Hero from "@/components/Hero";
import MachineGrid from "@/components/MachineGrid";
import { siteVisuals } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Équipements lourds & support cycle de vie",
  description:
    "Mashal Equipment fournit des engins, pièces détachées, maintenance et logistique export pour sécuriser vos chantiers et votre parc machine.",
  path: "/",
  image: siteVisuals.mining,
});

const serviceLinks = [
  {
    title: "Pièces détachées",
    text: "Références critiques et disponibilité pour réduire les immobilisations.",
    href: "/pieces",
    image: siteVisuals.parts,
  },
  {
    title: "Service après-vente",
    text: "Diagnostic, maintenance planifiée et formation opérateurs.",
    href: "/sav",
    image: siteVisuals.sav,
  },
  {
    title: "Logistique export",
    text: "Préparation, documentation et livraison internationale.",
    href: "/logistique",
    image: siteVisuals.logistics,
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="border-b border-white/8 py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Services
            </p>
            <h2 className="text-3xl leading-tight md:text-5xl">
              Au-delà de la machine
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {serviceLinks.map((item) => (
              <Link
                key={item.title}
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
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="mb-2 text-2xl text-white">{item.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-white/70">{item.text}</p>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Explorer <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
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
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="container relative z-10 mx-auto px-6 text-center">
          <h2 className="mx-auto mb-5 max-w-3xl text-4xl md:text-6xl">
            Un projet machine, pièces ou <span className="text-primary">export</span> ?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-foreground/65 md:text-lg">
            Décrivez le modèle, le délai et l&apos;urgence — réponse claire et actionnable.
          </p>
          <Link href="/sav?type=devis" className="btn-premium btn-gold inline-flex">
            Contacter l&apos;équipe
          </Link>
        </div>
      </section>
    </>
  );
}
