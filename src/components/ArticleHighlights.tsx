"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articleHighlights } from "@/lib/site-content";
import { useI18n } from "@/lib/i18n-context";
import { Reveal } from "@/components/motion/Reveal";

export default function ArticleHighlights() {
  const { t } = useI18n();
  const [featured, ...rest] = articleHighlights;

  return (
    <section className="border-t border-[color:var(--border)] py-16 md:py-24">
      <div className="container mx-auto px-6">
        <Reveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              {t.home.articlesEyebrow}
            </p>
            <h2 className="mb-3 text-3xl leading-tight md:text-5xl">
              {t.home.articlesTitle}
            </h2>
            <p className="leading-relaxed text-foreground/65">{t.home.articlesText}</p>
          </div>
          <Link
            href="/articles"
            className="text-sm font-semibold uppercase tracking-[0.16em] text-primary"
          >
            {t.home.articlesAll}
          </Link>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
          <Reveal blur={false}>
            <Link
              href={`/articles/${featured.slug}`}
              className="group relative block min-h-[360px] overflow-hidden rounded-3xl"
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  {featured.category}
                </p>
                <h3 className="mb-3 max-w-xl text-2xl text-white md:text-4xl">
                  {featured.title}
                </h3>
                <p className="mb-4 max-w-lg text-sm text-white/70">{featured.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {t.home.articlesRead} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="flex flex-col gap-4">
            {rest.map((article, index) => (
              <Reveal key={article.slug} delay={0.06 * (index + 1)} blur={false}>
                <Link
                  href={`/articles/${article.slug}`}
                  className="group grid flex-1 grid-cols-[110px_1fr] gap-4 rounded-2xl border border-[color:var(--border)] p-3 transition-colors hover:border-primary/35"
                >
                  <div className="relative h-full min-h-[96px] overflow-hidden rounded-xl">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="110px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="py-1 pr-2">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                      {article.category}
                    </p>
                    <h3 className="mb-2 text-base font-semibold leading-snug group-hover:text-primary">
                      {article.title}
                    </h3>
                    <p className="line-clamp-2 text-xs leading-relaxed text-foreground/60">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
