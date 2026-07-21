"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  GraduationCap,
  HardHat,
  Package,
  Truck,
  Wrench,
  Lightbulb,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { useI18n } from "@/lib/i18n-context";

const icons = [
  GraduationCap,
  Lightbulb,
  Wrench,
  Package,
  HardHat,
  Truck,
] as const;

export default function CoreServices() {
  const { t } = useI18n();
  const items = t.coreServices.items;

  return (
    <section
      id="services"
      className="border-b border-[color:var(--border)] bg-[color:var(--surface)] py-16 md:py-24"
    >
      <div className="container mx-auto px-6">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            {t.coreServices.eyebrow}
          </p>
          <h2 className="mb-4 text-3xl leading-tight md:text-5xl">{t.coreServices.title}</h2>
          <p className="leading-relaxed text-foreground/65">{t.coreServices.lead}</p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = icons[index];
            return (
              <Reveal key={item.href} delay={index * 0.05} blur={false}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-3xl border border-[color:var(--border)] bg-background p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/60">{item.text}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
