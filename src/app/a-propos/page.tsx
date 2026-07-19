import { BadgeCheck, Globe2, HeartHandshake, ShieldCheck } from "lucide-react";
import FounderSection from "@/components/FounderSection";
import PageHero from "@/components/PageHero";
import SectorsSection from "@/components/SectorsSection";
import { siteVisuals } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/page-metadata";
import Link from "next/link";

export const metadata = buildPageMetadata({
  title: "À propos de Mashal Equipment",
  description:
    "Découvrez Mashal Equipment, partenaire pour équipements lourds, pièces, maintenance et logistique export, dirigé par Mr Ithiel DOSSOU & Mykem DOSSOU.",
  path: "/a-propos",
  image: siteVisuals.founders,
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Une entreprise guidée par"
        highlight="la confiance"
        description="Partenaire commercial et opérationnel pour les besoins en équipements lourds, pièces détachées, maintenance et logistique export."
        primaryHref="/machines"
        primaryLabel="Voir le catalogue"
        secondaryHref="/sav?type=devis"
        secondaryLabel="Nous contacter"
        backgroundImage={siteVisuals.loader}
      />

      <SectorsSection />
      <FounderSection />

      <section className="border-t border-white/5 py-28">
        <div className="container mx-auto px-6">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Notre vision
            </p>
            <h2 className="mb-6 text-5xl leading-none lg:text-7xl">
              Construire une relation <span className="text-primary">durable</span>
            </h2>
            <p className="text-lg leading-relaxed text-foreground/60">
              Devenir un repère fiable pour les clients qui ont besoin d&apos;un
              interlocuteur solide sur toute la chaîne : sélection des machines,
              disponibilité des pièces, formation, assistance et livraison maîtrisée.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Fiabilité",
                text: "Des engagements clairs sur la qualité des références proposées et sur le sérieux du suivi client.",
              },
              {
                icon: HeartHandshake,
                title: "Proximité",
                text: "Une relation commerciale pensée dans la durée, avec écoute, conseil et accompagnement pragmatique.",
              },
              {
                icon: BadgeCheck,
                title: "Structure",
                text: "Une offre organisée entre catalogue, pièces, SAV et logistique pour inspirer confiance.",
              },
              {
                icon: Globe2,
                title: "Ouverture",
                text: "Une lecture internationale des besoins terrain, des standards métier et des parcours d'exportation.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-white/8 bg-white/58 p-8 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-white/4"
              >
                <item.icon className="mb-4 h-6 w-6 text-primary" />
                <h3 className="mb-4 text-3xl">{item.title}</h3>
                <p className="leading-relaxed text-foreground/65">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-4">
            <Link href="/sav?type=devis" className="btn-premium btn-gold">
              Parler à l&apos;équipe
            </Link>
            <Link
              href="/articles"
              className="inline-flex items-center rounded-full border border-white/12 px-7 py-4 text-sm font-bold transition-colors hover:border-primary hover:text-primary"
            >
              Lire nos analyses
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
