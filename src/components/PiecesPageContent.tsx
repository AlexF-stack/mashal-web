"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Boxes, Filter, Settings2, Truck } from "lucide-react";
import PageHero from "@/components/PageHero";
import PartsStockTable from "@/components/PartsStockTable";
import ContactForm from "@/components/ContactForm";
import { partsFamilies, siteVisuals } from "@/lib/site-content";
import { useI18n } from "@/lib/i18n-context";
import { Reveal } from "@/components/motion/Reveal";

const icons = [Filter, Settings2, Truck];

export default function PiecesPageContent() {
  const { t } = useI18n();
  const p = t.pages.pieces;

  return (
    <>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        highlight={p.highlight}
        description={p.description}
        primaryHref="/sav?type=pieces"
        primaryLabel={p.primary}
        secondaryHref="/articles/pieces-origine-disponibilite"
        secondaryLabel={p.secondary}
        backgroundImage={siteVisuals.parts}
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="grid overflow-hidden rounded-3xl border border-[color:var(--border)] bg-card lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[320px]">
                <Image
                  src={siteVisuals.parts}
                  alt={p.eyebrow}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-8 md:p-12">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-primary">
                  {p.availEyebrow}
                </p>
                <h2 className="mb-5 text-3xl md:text-4xl">{p.availTitle}</h2>
                <p className="leading-relaxed text-foreground/70">{p.availText}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <Reveal className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              {p.familiesEyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl">{p.familiesTitle}</h2>
          </Reveal>

          <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
            {partsFamilies.map((family, index) => {
              const Icon = icons[index] ?? Boxes;
              const copy = t.partsFamilies[family.key];
              return (
                <Reveal key={family.key} delay={index * 0.06} blur={false} className="min-w-[280px] md:min-w-0">
                  <article className="overflow-hidden rounded-3xl border border-[color:var(--border)] bg-card">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={family.image}
                        alt={copy.title}
                        fill
                        sizes="(max-width: 1024px) 80vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-background">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-3 text-2xl">{copy.title}</h3>
                      <p className="text-sm leading-relaxed text-foreground/65">{copy.text}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--border)] py-16">
        <div className="container mx-auto px-6">
          <PartsStockTable />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-primary/20 bg-primary/5 px-8 py-10 md:px-12">
              <h2 className="mb-4 text-3xl md:text-5xl">{p.formTitle}</h2>
              <p className="mb-6 max-w-xl leading-relaxed text-foreground/65">{p.availText}</p>
              <Link href="/sav?type=pieces" className="btn-premium btn-gold">
                {p.primary}
              </Link>
            </div>
            <div className="rounded-3xl border border-[color:var(--border)] bg-card p-8">
              <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-foreground/5" />}>
                <ContactForm
                  heading={p.formTitle}
                  description={p.availText}
                  submitLabel={t.contact.submit}
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
