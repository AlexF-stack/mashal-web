import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { articleHighlights } from "@/lib/site-content";
import { generateArticleMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export function generateStaticParams() {
  return articleHighlights.map((article) => ({ slug: article.slug }));
}

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articleHighlights.find((item) => item.slug === slug);
  if (!article) {
    return { title: "Article introuvable" };
  }
  return generateArticleMetadata(article);
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articleHighlights.find((item) => item.slug === slug);
  if (!article) {
    notFound();
  }

  const related = articleHighlights.filter((item) => item.slug !== article.slug).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
        primaryHref="/articles"
        primaryLabel="Tous les articles"
        secondaryHref="/sav?type=devis"
        secondaryLabel="Demander un conseil"
        backgroundImage={article.image}
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative mb-12 overflow-hidden rounded-[2.5rem] border border-white/8 shadow-[0_28px_80px_rgba(15,23,42,0.16)]">
            <div className="relative aspect-[16/7] min-h-[320px]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b2636]/75 via-[#1b2636]/12 to-transparent" />
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
            <article className="space-y-10 rounded-[2rem] border border-white/8 bg-white/60 p-10 shadow-[0_32px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-white/5">
              {article.quote && (
                <blockquote className="rounded-[1.75rem] border border-primary/20 bg-primary/5 px-6 py-5">
                  <p className="text-xl leading-relaxed text-foreground/85 italic">
                    “{article.quote}”
                  </p>
                  {article.quoteAuthor && (
                    <footer className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      {article.quoteAuthor}
                    </footer>
                  )}
                </blockquote>
              )}

              {article.body?.map((block) => (
                <div key={block.title} className="space-y-4">
                  <h2 className="text-3xl font-semibold">{block.title}</h2>
                  <p className="leading-relaxed text-foreground/70">{block.text}</p>
                </div>
              ))}
            </article>

            <aside className="space-y-8">
              <div className="rounded-[2rem] border border-white/8 bg-slate-950/5 p-8 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-slate-900/60">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  À retenir
                </p>
                <h3 className="mt-4 text-2xl font-semibold">Points clés</h3>
                <div className="mt-6 space-y-4">
                  {article.body?.slice(0, 3).map((block) => (
                    <div
                      key={block.title}
                      className="rounded-3xl border border-white/8 bg-white/50 p-5 dark:bg-slate-950/70"
                    >
                      <p className="text-sm font-semibold text-foreground">{block.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                        {block.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-primary/15 bg-primary/5 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  Besoin d&apos;accompagnement ?
                </p>
                <p className="mt-4 text-sm leading-relaxed text-foreground/75">
                  Nos équipes vous aident à traduire ces recommandations en plan pièces,
                  maintenance ou export.
                </p>
                <Link
                  href="/sav?type=devis"
                  className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-background"
                >
                  Contacter le SAV
                </Link>
              </div>

              {related.length > 0 && (
                <div className="rounded-[2rem] border border-white/8 bg-white/55 p-6 dark:bg-white/4">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                    À lire aussi
                  </p>
                  <div className="space-y-4">
                    {related.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/articles/${item.slug}`}
                        className="block rounded-2xl border border-white/8 p-4 transition-colors hover:border-primary/30"
                      >
                        <p className="text-sm font-semibold leading-snug">{item.title}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-primary">
                          {item.category}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
