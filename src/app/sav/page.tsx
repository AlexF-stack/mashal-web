import Image from "next/image";
import { BadgeCheck, GraduationCap, Siren, Wrench } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { serviceOffers, siteVisuals } from "@/lib/site-content";
import ProjectSupport from "@/components/ProjectSupport";
import { Suspense } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Service après-vente & maintenance",
  description:
    "Diagnostic, maintenance planifiée, formation opérateurs et suivi cycle de vie pour sécuriser la disponibilité de vos machines.",
  path: "/sav",
  image: siteVisuals.sav,
});

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Service après-vente"
        title="Un support pensé pour"
        highlight="la durée"
        description="Nous accompagnons la machine, l'opérateur et l'exploitant dans le temps : diagnostic, maintenance, pièces critiques et formation."
        primaryHref="/pieces"
        primaryLabel="Voir les pièces"
        secondaryHref="/logistique"
        secondaryLabel="Voir la logistique"
        backgroundImage={siteVisuals.sav}
      />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid overflow-hidden rounded-[2.5rem] border border-white/8 bg-card shadow-[0_28px_80px_rgba(15,23,42,0.12)] lg:grid-cols-[0.95fr_1.05fr]">
            <div className="p-8 md:p-12">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-primary">
                Terrain & atelier
              </p>
              <h2 className="mb-6 text-4xl lg:text-5xl">
                Un dossier SAV exploitable dès le premier échange
              </h2>
              <p className="mb-8 leading-relaxed text-foreground/70">
                Décrivez la panne, l&apos;urgence, le modèle, les heures compteur et les
                symptômes. Cela réduit les allers-retours et accélère pièces ou
                intervention.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {["Diagnostic", "Maintenance planifiée", "Pièces critiques", "Formation opérateur"].map(
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
            <div className="relative min-h-[360px]">
              <Image
                src={siteVisuals.sav}
                alt="Technicien en maintenance sur équipement industriel"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b2636]/70 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Prestations
            </p>
            <h2 className="mb-6 text-5xl leading-none lg:text-7xl">
              Des services qui <span className="text-primary">sécurisent</span> l&apos;usage
            </h2>
            <p className="text-lg leading-relaxed text-foreground/60">
              Maintenance, formation, diagnostic et appui technique : un support cycle de
              vie pour protéger votre investissement machine.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {serviceOffers.map((service, index) => {
              const icons = [Wrench, Siren, GraduationCap, BadgeCheck];
              const Icon = icons[index] ?? Wrench;

              return (
                <div
                  key={service.title}
                  className="rounded-[2rem] border border-white/8 bg-white/58 p-8 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-white/4"
                >
                  <Icon className="mb-4 h-6 w-6 text-primary" />
                  <h3 className="mb-4 text-3xl">{service.title}</h3>
                  <p className="leading-relaxed text-foreground/65">{service.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2.5rem] border border-white/8 bg-white/60 p-10 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-white/4">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                Méthode d&apos;intervention
              </p>
              <h2 className="mb-6 text-4xl lg:text-5xl">Comment nous traitons votre besoin</h2>
              <div className="space-y-5 text-foreground/68">
                <p>
                  Qualification de la panne, collecte d&apos;informations, diagnostic,
                  pièces nécessaires, délai d&apos;intervention, puis suivi jusqu&apos;au
                  retour en exploitation.
                </p>
                <p>
                  La formation opérateur et la maintenance préventive restent les meilleurs
                  leviers pour réduire les arrêts et améliorer la rentabilité du parc.
                </p>
              </div>

              <div className="mt-8 grid gap-4">
                {[
                  "Diagnostic rapide et collecte des données machine",
                  "Préconisation des pièces ou opérations nécessaires",
                  "Coordination de l'intervention ou du plan de maintenance",
                  "Suivi client jusqu'au retour en exploitation",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/8 bg-white/55 px-5 py-4 text-sm font-semibold text-foreground/75 dark:bg-white/3"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/8 bg-card p-10 text-foreground shadow-[0_22px_60px_rgba(15,23,42,0.12)] dark:bg-white/8">
              <Suspense fallback={<div className="mb-10 h-20 animate-pulse rounded-2xl bg-white/5" />}>
                <ProjectSupport />
              </Suspense>

              <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-white/5" />}>
                <ContactForm
                  heading="Ouvrir un dossier"
                  description="Remplissez ce formulaire pour qualifier votre demande et obtenir une réponse prioritaire."
                  submitLabel="Envoyer la demande"
                  hiddenContext="SAV / Project Request"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
