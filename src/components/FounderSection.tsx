"use client";

import Image from "next/image";
import { ArrowRight, BadgeCheck, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { founderProfile } from "@/lib/site-content";
import { Reveal } from "@/components/motion/Reveal";
import { useI18n } from "@/lib/i18n-context";

const founderIcons = [ShieldCheck, HeartHandshake, Sparkles, BadgeCheck];
const valueKeys = ["h1", "h2", "h3", "h4"] as const;

export default function FounderSection() {
  const { t } = useI18n();

  return (
    <section id="fondateurs" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <Reveal className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
            {t.home.foundersEyebrow}
          </p>
          <h2 className="mb-4 text-3xl leading-tight md:text-5xl">
            {t.home.foundersTitle}
          </h2>
          <p className="text-lg leading-relaxed text-foreground/65">{t.founder.intro}</p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
          <Reveal blur={false}>
            <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border)]">
              <Image
                src={founderProfile.image}
                alt={founderProfile.imageAlt}
                width={1200}
                height={1200}
                className="h-full min-h-[380px] w-full object-cover object-center"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-center py-2">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-primary">
                {t.founder.subtitle}
              </p>
              <h3 className="mb-5 text-3xl md:text-4xl">{t.founder.title}</h3>
              <div className="space-y-4 text-base leading-relaxed text-foreground/70">
                <p>{t.founder.body1}</p>
                <p>{t.founder.body2}</p>
              </div>

              <ul className="mt-8 space-y-4">
                {valueKeys.map((key, index) => {
                  const Icon = founderIcons[index] ?? BadgeCheck;
                  return (
                    <li key={key} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="pt-1">
                        <p className="text-sm font-semibold text-foreground/85">
                          {t.founder[key]}
                        </p>
                        <p className="mt-1 text-sm text-foreground/60">
                          {t.founder[`${key}Text`]}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <Link
                href="/a-propos"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-primary"
              >
                {t.home.foundersCta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
