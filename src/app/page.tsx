import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Boxes, Cog, Globe, ShieldCheck, Wrench } from "lucide-react";
import ArticleHighlights from "@/components/ArticleHighlights";
import Certifications from "@/components/Certifications";
import SectorsSection from "@/components/SectorsSection";
import FounderSection from "@/components/FounderSection";
import Hero from "@/components/Hero";
import MachineGrid from "@/components/MachineGrid";
import Testimonials from "@/components/Testimonials";
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
    icon: Boxes,
    title: "Pièces détachées",
    text: "Références critiques, familles de pièces et disponibilité pour réduire les immobilisations.",
    href: "/pieces",
    image: siteVisuals.parts,
  },
  {
    icon: Wrench,
    title: "Service après-vente",
    text: "Diagnostic, maintenance planifiée, formation opérateurs et suivi technique.",
    href: "/sav",
    image: siteVisuals.sav,
  },
  {
    icon: Cog,
    title: "Logistique export",
    text: "Préparation, documentation, transport et réception sécurisée à l'international.",
    href: "/logistique",
    image: siteVisuals.logistics,
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Certifications />
      <SectorsSection />

      <section className="bg-white/2 py-24">
        <div className="container mx-auto px-6">
          <div className="grid items-center gap-12 rounded-[3rem] border border-white/5 glass p-8 md:p-12 lg:grid-cols-2">
            <div>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  Positionnement métier
                </span>
              </div>
              <h2 className="mb-8 text-3xl leading-[0.9] sm:text-4xl md:text-5xl lg:text-6xl">
                Plus qu&apos;un <span className="text-primary">catalogue</span>
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-foreground/60">
                Mashal Equipment accompagne vos projets avec des machines adaptées, des
                pièces disponibles, un support technique réactif et une logistique export
                maîtrisée — de la sélection à la mise en service.
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-[1.75rem] border border-white/8 bg-white/45 p-5 dark:bg-white/4">
                  <ShieldCheck className="mb-3 h-6 w-6 text-primary" />
                  <p className="mb-1 text-sm font-bold uppercase tracking-[0.18em]">Fiabilité</p>
                  <p className="text-sm leading-relaxed text-foreground/60">
                    Un discours clair sur la qualité des références, la disponibilité des
                    pièces et la continuité d&apos;exploitation.
                  </p>
                </div>
                <div className="rounded-[1.75rem] border border-white/8 bg-white/45 p-5 dark:bg-white/4">
                  <Globe className="mb-3 h-6 w-6 text-primary" />
                  <p className="mb-1 text-sm font-bold uppercase tracking-[0.18em]">Export</p>
                  <p className="text-sm leading-relaxed text-foreground/60">
                    Une lecture métier pour les clients internationaux, partenaires et
                    appels d&apos;offres.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5">
              {serviceLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group grid overflow-hidden rounded-[2rem] border border-white/8 bg-white/52 transition-all hover:border-primary/40 hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:bg-white/4 sm:grid-cols-[140px_1fr]"
                >
                  <div className="relative min-h-[120px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="140px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <item.icon className="mb-3 h-5 w-5 text-primary" />
                    <h3 className="mb-2 text-2xl">{item.title}</h3>
                    <p className="mb-3 text-sm leading-relaxed text-foreground/65">{item.text}</p>
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Explorer <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MachineGrid />
      <FounderSection />

      <section className="border-t border-white/5 py-28">
        <div className="container mx-auto px-6">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">Engagements</p>
            <h2 className="mb-6 text-5xl leading-none lg:text-7xl">
              Des services qui <span className="text-primary">prolongent</span> la vente
            </h2>
            <p className="text-lg leading-relaxed text-foreground/60">
              Au-delà de la machine, nous sécurisons la disponibilité des pièces, la
              maintenance, la formation et le transport pour préserver la productivité de
              votre parc.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Disponibilité des pièces et consommables stratégiques",
              "Maintenance planifiée et interventions techniques",
              "Formation opérateurs et accompagnement usage",
              "Logistique export et documentation de livraison",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[2rem] border border-white/8 bg-white/58 p-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-white/4"
              >
                <p className="text-sm font-semibold leading-relaxed text-foreground/75">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ArticleHighlights />

      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 z-0">
          <Image
            src={siteVisuals.worksite}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="container relative z-10 mx-auto px-6">
          <div className="rounded-[2.5rem] border border-primary/18 bg-white/70 px-8 py-12 text-center shadow-[0_25px_70px_rgba(15,23,42,0.1)] backdrop-blur-xl dark:bg-white/6 md:px-16">
            <h2 className="mx-auto mb-6 max-w-4xl text-5xl md:text-7xl">
              Un projet machine, pièces ou <span className="text-primary">export</span> ?
            </h2>
            <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-foreground/65">
              Décrivez votre besoin : modèle, délai, localisation et urgence. Notre équipe
              vous répond avec une proposition claire et actionnable.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/sav?type=devis" className="btn-premium btn-gold">
                Demander un accompagnement
              </Link>
              <Link
                href="/articles"
                className="inline-flex items-center rounded-full border border-white/12 px-7 py-4 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Lire nos articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}
