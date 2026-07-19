import Image from "next/image";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import LogisticsTimeline from "@/components/LogisticsTimeline";
import ContactForm from "@/components/ContactForm";
import { logisticsSteps, siteVisuals } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Logistique export d'engins",
  description:
    "Préparation technique, documentation douanière, transport et réception sécurisée pour l'export d'équipements lourds.",
  path: "/logistique",
  image: siteVisuals.logistics,
});

export default function LogisticsPage() {
  return (
    <>
      <PageHero
        eyebrow="Logistique export"
        title="De la préparation à"
        highlight="la livraison"
        description="Nous sécurisons l'export de vos équipements lourds : inspection, documentation, coordination transport et réception."
        primaryHref="/sav?type=export"
        primaryLabel="Demander un devis export"
        secondaryHref="/machines"
        secondaryLabel="Voir le catalogue"
        backgroundImage={siteVisuals.logistics}
      />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid overflow-hidden rounded-[2.5rem] border border-white/8 bg-card shadow-[0_28px_80px_rgba(15,23,42,0.12)] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[380px]">
              <Image
                src={siteVisuals.logistics}
                alt="Logistique portuaire et expédition internationale"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b2636]/72 via-transparent to-transparent" />
            </div>
            <div className="p-8 md:p-12">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-primary">
                Export sécurisé
              </p>
              <h2 className="mb-6 text-4xl lg:text-5xl">Préparer la machine avant le transport</h2>
              <p className="mb-8 leading-relaxed text-foreground/70">
                Inspection, photos, liste de colisage, contrôle des accessoires, documents
                douaniers et choix du mode d&apos;expédition : une vision claire du risque,
                du délai et des responsabilités.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {["Ro-Ro / breakbulk", "Documents export", "Inspection photo", "Réception client"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/8 bg-white/50 px-4 py-3 text-sm font-bold text-foreground/78 dark:bg-white/6"
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white/2 py-24">
        <div className="container mx-auto px-6">
          <div className="mb-20 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Le parcours machine
            </p>
            <h2 className="mb-6 text-5xl leading-none lg:text-7xl">
              Une logistique <span className="text-primary">transparente</span>
            </h2>
            <p className="text-lg leading-relaxed text-foreground/60">
              Suivez chaque étape, de l&apos;inspection initiale jusqu&apos;à la mise en
              service sur votre site. La clarté réduit l&apos;incertitude.
            </p>
          </div>

          <LogisticsTimeline />
        </div>
      </section>

      <section className="border-t border-white/5 py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[2.5rem] border border-white/8 bg-white/60 p-10 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-white/4">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                Ce que nous sécurisons
              </p>
              <h2 className="mb-6 text-4xl lg:text-5xl">Pour votre export</h2>
              <div className="mb-8 space-y-5 text-foreground/68">
                <p>
                  Une logistique export réussie repose autant sur la coordination humaine
                  que sur le transport : inspection, photos, emballage, documentation,
                  assurance, incoterms et suivi.
                </p>
              </div>
              <div className="grid gap-4">
                {logisticsSteps.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-white/8 bg-white/55 px-5 py-4 dark:bg-white/3"
                  >
                    <p className="mb-1 text-sm font-bold text-foreground">{step.title}</p>
                    <p className="text-sm leading-relaxed text-foreground/65">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2.5rem] border border-primary/18 bg-primary/5 p-10">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  Points de contrôle
                </p>
                <div className="space-y-4">
                  {[
                    "Types de transport: conteneur, breakbulk, Ro-Ro, exceptionnel",
                    "Documents: facture, packing list, certificat, conformité, origine",
                    "Zones couvertes: Afrique de l'Ouest, hubs, corridors logistiques",
                    "Gestion client: suivi, délais estimatifs, coordination réception",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/55 px-5 py-4 text-sm font-semibold text-foreground/75 dark:bg-white/3"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2.5rem] border border-white/8 bg-card p-8 shadow-[0_22px_60px_rgba(15,23,42,0.12)]">
                <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-white/5" />}>
                  <ContactForm
                    heading="Devis export"
                    description="Indiquez destination, machine et calendrier souhaité pour une estimation logistique."
                    submitLabel="Demander un devis export"
                    hiddenContext="Logistique export"
                    defaultType="export"
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
