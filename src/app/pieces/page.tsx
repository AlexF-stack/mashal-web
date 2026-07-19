import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Boxes, Filter, Settings2, Truck } from "lucide-react";
import PageHero from "@/components/PageHero";
import PartsStockTable from "@/components/PartsStockTable";
import ContactForm from "@/components/ContactForm";
import { partsFamilies, siteVisuals } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Pièces détachées & consommables",
  description:
    "Pièces d'origine, stocks critiques et kits d'usure pour maintenir votre parc machine en exploitation. Demandez une référence en quelques minutes.",
  path: "/pieces",
  image: siteVisuals.parts,
});

export default function PartsPage() {
  return (
    <>
      <PageHero
        eyebrow="Pièces détachées"
        title="La bonne référence,"
        highlight="au bon moment"
        description="Filtres, hydraulique, train de roulement et kits d'usure pour sécuriser la continuité d'exploitation de vos engins."
        primaryHref="/sav?type=pieces"
        primaryLabel="Demander une pièce"
        secondaryHref="/articles/pieces-origine-disponibilite"
        secondaryLabel="Conseils pièces"
        backgroundImage={siteVisuals.parts}
      />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid overflow-hidden rounded-[2.5rem] border border-white/8 bg-card shadow-[0_28px_80px_rgba(15,23,42,0.12)] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[360px]">
              <Image
                src={siteVisuals.parts}
                alt="Stock de pièces et composants industriels"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b2636]/70 via-transparent to-transparent" />
            </div>
            <div className="p-8 md:p-12">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-primary">
                Disponibilité réelle
              </p>
              <h2 className="mb-6 text-4xl lg:text-5xl">Identifiez vite la bonne référence</h2>
              <p className="mb-8 leading-relaxed text-foreground/70">
                Pour accélérer le traitement, préparez : machine concernée, moteur,
                référence éventuelle, urgence, localisation et photos. Nous vous
                confirmons compatibilité et délai.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {["Filtres et consommables", "Hydraulique", "Kits d'usure", "Références moteur"].map(
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

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Familles de pièces
            </p>
            <h2 className="mb-6 text-5xl leading-none lg:text-7xl">
              Un stock pensé pour <span className="text-primary">l&apos;exploitation</span>
            </h2>
            <p className="text-lg leading-relaxed text-foreground/60">
              Nous structurons l&apos;offre pièces autour des composants qui protègent
              réellement la disponibilité machine : filtration, hydraulique et usure.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partsFamilies.map((family, index) => {
              const icons = [Filter, Settings2, Truck];
              const Icon = icons[index] ?? Boxes;

              return (
                <div
                  key={family.title}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/8 bg-white/58 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-white/4"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={family.image}
                      alt={family.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/90 text-background">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="mb-4 text-3xl text-foreground">{family.title}</h3>
                    <p className="leading-relaxed text-foreground/72">{family.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-24">
        <div className="container mx-auto px-6">
          <PartsStockTable />
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2.5rem] border border-primary/18 bg-primary/5 px-8 py-12 md:px-12">
              <h2 className="mb-4 text-4xl lg:text-6xl">
                Besoin d&apos;une pièce <span className="text-primary">critique</span> ?
              </h2>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-foreground/65">
                Transmettez la référence, le modèle et l&apos;urgence. Nous confirmons
                disponibilité, compatibilité et délai de livraison.
              </p>
              <Link href="/sav?type=pieces" className="btn-premium btn-gold">
                Ouvrir une demande
              </Link>
            </div>

            <div className="rounded-[2.5rem] border border-white/8 bg-card p-8 shadow-[0_22px_60px_rgba(15,23,42,0.12)] md:p-10">
              <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-white/5" />}>
                <ContactForm
                  heading="Demande pièces"
                  description="Indiquez la référence ou décrivez la pièce. Joignez le contexte machine pour accélérer la réponse."
                  submitLabel="Envoyer la demande pièces"
                  hiddenContext="Pièces détachées"
                  defaultType="pieces"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
