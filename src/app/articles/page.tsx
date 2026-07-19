import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { articleHighlights, siteVisuals } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/page-metadata";
import ArticlesFilter from "@/components/ArticlesFilter";

export const metadata = buildPageMetadata({
  title: "Articles & conseils métier",
  description:
    "Maintenance préventive, pièces d'origine et logistique export : contenus pour mieux choisir, exploiter et sécuriser vos équipements.",
  path: "/articles",
  image: siteVisuals.worksite,
});

const longFormBlocks = [
  {
    title: "Maintenance préventive et disponibilité",
    text:
      "Un parc bien entretenu réduit les arrêts imprévus et prolonge la valeur de chaque machine. Nos contenus aident à planifier inspections, consommables et interventions.",
  },
  {
    title: "Pièces d'origine et logique système",
    text:
      "Filtres, fluides, hydraulique et usure protègent la performance globale. Nous insistons sur compatibilité, cycles de remplacement et bénéfices opérationnels.",
  },
  {
    title: "Export maîtrisé et documentation",
    text:
      "Préparation technique, formalités et coordination transport : des étapes claires pour diminuer l'incertitude côté acheteur international.",
  },
];

export default function ArticlesPage() {
  return (
    <>
      <PageHero
        eyebrow="Articles"
        title="Des contenus qui"
        highlight="éclairent"
        description="Analyses et conseils pour mieux choisir, exploiter, maintenir et exporter vos équipements lourds."
        primaryHref="/sav?type=devis"
        primaryLabel="Parler à un expert"
        secondaryHref="/pieces"
        secondaryLabel="Voir les pièces"
        backgroundImage={siteVisuals.worksite}
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <Suspense
            fallback={
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articleHighlights.map((article) => (
                  <article
                    key={article.slug}
                    className="overflow-hidden rounded-[2rem] border border-white/8 bg-white/58 dark:bg-white/4"
                  >
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                        {article.category}
                      </p>
                      <h2 className="mb-4 text-3xl leading-tight">{article.title}</h2>
                      <p className="mb-6 leading-relaxed text-foreground/65">{article.excerpt}</p>
                      <Link
                        href={`/articles/${article.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-primary"
                      >
                        Lire l&apos;article <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            }
          >
            <ArticlesFilter />
          </Suspense>
        </div>
      </section>

      <section className="border-t border-white/5 py-24">
        <div className="container mx-auto px-6">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Orientation éditoriale
            </p>
            <h2 className="mb-6 text-5xl leading-none lg:text-7xl">
              Ce que nos <span className="text-primary">articles</span> démontrent
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {longFormBlocks.map((block) => (
              <div
                key={block.title}
                className="rounded-[2rem] border border-white/8 bg-white/60 p-8 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-white/4"
              >
                <h3 className="mb-4 text-3xl">{block.title}</h3>
                <p className="leading-relaxed text-foreground/65">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
