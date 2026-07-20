"use client";

import Image from "next/image";
import { ArrowRight, BadgeCheck, HeartHandshake, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { founderProfile } from "@/lib/site-content";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

const founderIcons = [ShieldCheck, HeartHandshake, BadgeCheck];

export default function FounderSection() {
  return (
    <section id="fondateurs" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <Reveal className="mb-12 max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Fondateurs
          </p>
          <h2 className="mb-6 text-4xl leading-tight md:text-5xl lg:text-6xl">
            Une gouvernance <span className="text-primary">ancrée</span>
          </h2>
          <p className="text-lg leading-relaxed text-foreground/65">{founderProfile.intro}</p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal blur={false}>
            <TiltCard intensity={7}>
              <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-card shadow-[0_20px_60px_rgba(15,23,42,0.1)]">
                <Image
                  src={founderProfile.image}
                  alt={founderProfile.imageAlt}
                  width={1200}
                  height={1200}
                  priority
                  className="h-full min-h-[420px] w-full object-cover object-center"
                />
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-[color:var(--border)] bg-card p-8 shadow-[0_16px_48px_rgba(15,23,42,0.06)] md:p-10">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-primary">
                {founderProfile.subtitle}
              </p>
              <h3 className="mb-6 text-3xl md:text-4xl lg:text-5xl">{founderProfile.title}</h3>
              <div className="space-y-4 text-base leading-relaxed text-foreground/70">
                {founderProfile.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                {founderProfile.highlights.map((item, index) => {
                  const Icon = founderIcons[index] ?? BadgeCheck;
                  return (
                    <div
                      key={item}
                      className="flex items-start gap-4 rounded-2xl border border-[color:var(--border)] bg-background p-4"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="pt-1 text-sm font-semibold text-foreground/80">{item}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <Link
                  href="/a-propos"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-primary"
                >
                  Découvrir notre histoire <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
