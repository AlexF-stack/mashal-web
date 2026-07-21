"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { IconBadge } from "@/components/ui/IconBadge";
import { useI18n } from "@/lib/i18n-context";
import type { ExpertiseKey } from "@/lib/expertises-i18n";
import { cn } from "@/lib/utils";

type ExpertiseBlockProps = {
  expertiseKey: ExpertiseKey;
  icon: LucideIcon;
  index: number;
};

export default function ExpertiseBlock({ expertiseKey, icon, index }: ExpertiseBlockProps) {
  const { t } = useI18n();
  const page = t.expertises.page;
  const item = t.expertises.items[expertiseKey];
  const reversed = index % 2 === 1;

  return (
    <section
      id={item.id}
      className={cn(
        "scroll-mt-28 border-b border-[color:var(--border)] py-16 md:py-24",
        index % 2 === 1 && "bg-[color:var(--surface)]",
      )}
    >
      <div className="container mx-auto px-6">
        <div
          className={cn(
            "grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start",
            reversed && "lg:[direction:rtl] lg:*:[direction:ltr]",
          )}
        >
          <Reveal blur={false}>
            <div className="lg:sticky lg:top-28">
              <IconBadge icon={icon} variant="gold" className="mb-5" />
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mb-3 text-3xl leading-tight md:text-4xl">{item.title}</h2>
              <p className="mb-5 text-lg font-medium text-primary/90">{item.tagline}</p>
              <p className="mb-4 leading-relaxed text-foreground/70">{item.intro}</p>
              <p className="mb-8 leading-relaxed text-foreground/60">{item.body}</p>
              <Link href={item.ctaHref} className="btn-premium btn-gold inline-flex">
                {item.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.05} blur={false}>
              <div className="grid gap-4 sm:grid-cols-2">
                {item.highlights.map((highlight) => (
                  <div
                    key={highlight.title}
                    className="rounded-2xl border border-[color:var(--border)] bg-background p-5"
                  >
                    <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-primary">
                      {highlight.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/65">{highlight.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08} blur={false}>
              <div className="rounded-3xl border border-[color:var(--border)] bg-background p-6 md:p-8">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-foreground/45">
                  {page.includesLabel}
                </h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {item.includes.map((line) => (
                    <li key={line} className="flex gap-2 text-sm leading-relaxed text-foreground/70">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1} blur={false}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-[color:var(--border)] bg-background p-6">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-foreground/45">
                    {page.stepsLabel}
                  </h3>
                  <ol className="space-y-3">
                    {item.steps.map((step, stepIndex) => (
                      <li key={step} className="flex gap-3 text-sm leading-relaxed text-foreground/70">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {stepIndex + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-foreground/45">
                    {page.sectorsLabel}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.sectors.map((sector) => (
                      <span
                        key={sector}
                        className="rounded-full border border-primary/25 bg-background px-3 py-1.5 text-xs font-semibold text-foreground/75"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
