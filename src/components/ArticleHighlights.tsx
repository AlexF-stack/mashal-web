import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articleHighlights } from "@/lib/site-content";

export default function ArticleHighlights() {
  return (
    <section className="border-t border-white/5 py-28">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">Articles</p>
            <h2 className="mb-6 text-5xl leading-none lg:text-7xl">
              Nos contenus <span className="text-primary">métier</span>
            </h2>
            <p className="text-lg leading-relaxed text-foreground/60">
              Conseils concrets pour mieux choisir, exploiter, maintenir et sécuriser vos
              équipements sur le long terme.
            </p>
          </div>

          <Link href="/articles" className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Voir tous les articles
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articleHighlights.map((article) => (
            <article
              key={article.slug}
              className="group overflow-hidden rounded-[2rem] border border-white/8 bg-white/60 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:bg-white/4"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 to-transparent" />
              </div>
              <div className="p-8">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  {article.category}
                </p>
                <h3 className="mb-4 text-3xl leading-tight">{article.title}</h3>
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
      </div>
    </section>
  );
}
