"use client";

import Link from "next/link";
import { ArrowRight, HardHat, Mountain, Waves } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { IconBadge } from "@/components/ui/IconBadge";
import { useI18n } from "@/lib/i18n-context";

const icons = [HardHat, Mountain, Waves] as const;

export default function SiteManagementSection() {
  const { t } = useI18n();
  const s = t.siteManagement;

  return (
    <section className="border-b border-[color:var(--border)] bg-[#0F172A] py-16 text-white md:py-24">
      <div className="container mx-auto px-6">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            {s.eyebrow}
          </p>
          <h2 className="mb-4 text-3xl leading-tight md:text-5xl">{s.title}</h2>
          <p className="leading-relaxed text-white/65">{s.text}</p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {s.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <Reveal key={item.title} delay={index * 0.06} blur={false}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-7">
                  <IconBadge icon={Icon} variant="dark" className="mb-4" />
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.12} className="mt-10 text-center">
          <Link href="/expertises#chantiers" className="btn-premium btn-gold inline-flex">
            {s.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
