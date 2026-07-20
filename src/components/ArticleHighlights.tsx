import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articleHighlights } from "@/lib/site-content";

export default function ArticleHighlights() {
  return (
    <section className="border-t border-white/8 py-20 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Articles
            </p>
            <h2 className="mb-4 text-3xl leading-tight md:text-5xl">
              Contenus métier
            </h2>
            <p className="leading-relaxed text-foreground/65">
              Choisir, exploiter et maintenir vos équipements sur le long terme.
            </p>
          </div>
          <Link
            href="/articles"
            className="text-sm font-semibold uppercase tracking-[0.16em] text-primary"
          >
            Tous les articles
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articleHighlights.map((article) => (
            <article key={article.slug} className="group overflow-hidden rounded-3xl">
              <Link href={`/articles/${article.slug}`} className="block">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/70 to-transparent" />
                </div>
                <div className="border border-t-0 border-white/8 p-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    {article.category}
                  </p>
                  <h3 className="mb-3 text-xl leading-tight md:text-2xl">{article.title}</h3>
                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-foreground/65">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    Lire <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
