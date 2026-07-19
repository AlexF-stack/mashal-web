"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { articleHighlights } from "@/lib/site-content";

export default function ArticlesFilter() {
  const categories = useMemo(
    () => ["Tous", ...Array.from(new Set(articleHighlights.map((article) => article.category)))],
    [],
  );
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredArticles = useMemo(
    () =>
      activeCategory === "Tous"
        ? articleHighlights
        : articleHighlights.filter((article) => article.category === activeCategory),
    [activeCategory],
  );

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">Filtrer</p>
          <h2 className="text-5xl lg:text-6xl">
            Articles par <span className="text-primary">thématique</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category
                  ? "rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-background shadow-lg shadow-primary/20"
                  : "rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-foreground/72 hover:bg-white/10"
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-8 text-sm text-foreground/60">
        {filteredArticles.length} article{filteredArticles.length > 1 ? "s" : ""}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <article
            key={article.slug}
            className="group overflow-hidden rounded-[2rem] border border-white/8 bg-white/58 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:bg-white/4"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b2636]/70 via-transparent to-transparent" />
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
    </>
  );
}
