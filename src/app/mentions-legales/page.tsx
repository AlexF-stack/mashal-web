import PageHero from "@/components/PageHero";
import { company } from "@/lib/company";
import { siteVisuals } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Mentions légales",
  description: `Mentions légales du site ${company.name}.`,
  path: "/mentions-legales",
});

export default function LegalMentionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Informations légales"
        title="Mentions"
        highlight="légales"
        description="Informations éditeur et conditions d'utilisation du site Mashal Equipment."
        primaryHref="/"
        primaryLabel="Retour à l'accueil"
        backgroundImage={siteVisuals.worksite}
      />
      <section className="py-20">
        <div className="container mx-auto max-w-3xl px-6">
          <div className="space-y-8 rounded-[2rem] border border-white/8 bg-white/60 p-8 leading-relaxed text-foreground/70 dark:bg-white/4 md:p-12">
            <div>
              <h2 className="mb-3 text-2xl text-foreground">Éditeur</h2>
              <p>
                {company.name} — {company.location}
                <br />
                Email : {company.email}
                <br />
                Téléphone : {company.phoneDisplay}
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl text-foreground">Hébergement</h2>
              <p>
                Le site est hébergé par Vercel Inc. Les contenus présentés ont une vocation
                commerciale et informative. Les spécifications techniques peuvent évoluer.
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl text-foreground">Propriété intellectuelle</h2>
              <p>
                Textes, visuels et marques présentés restent la propriété de {company.name}
                ou de leurs ayants droit. Toute reproduction non autorisée est interdite.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
