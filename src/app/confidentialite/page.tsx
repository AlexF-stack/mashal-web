import PageHero from "@/components/PageHero";
import { company } from "@/lib/company";
import { siteVisuals } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Confidentialité",
  description: `Politique de confidentialité et traitement des données de ${company.name}.`,
  path: "/confidentialite",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Données personnelles"
        title="Politique de"
        highlight="confidentialité"
        description="Comment nous collectons et utilisons les informations transmises via nos formulaires."
        primaryHref="/sav"
        primaryLabel="Nous contacter"
        backgroundImage={siteVisuals.worksite}
      />
      <section className="py-20">
        <div className="container mx-auto max-w-3xl px-6">
          <div className="space-y-8 rounded-[2rem] border border-white/8 bg-white/60 p-8 leading-relaxed text-foreground/70 dark:bg-white/4 md:p-12">
            <div>
              <h2 className="mb-3 text-2xl text-foreground">Données collectées</h2>
              <p>
                Nom, email, téléphone, entreprise, référence machine/pièce et message
                transmis via les formulaires de contact ou de devis.
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl text-foreground">Finalité</h2>
              <p>
                Traiter vos demandes commerciales, techniques ou logistiques, et assurer
                le suivi de la relation client.
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl text-foreground">Conservation & droits</h2>
              <p>
                Les données sont conservées le temps nécessaire au traitement de votre
                demande. Pour accéder, rectifier ou supprimer vos informations, contactez{" "}
                {company.email}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
