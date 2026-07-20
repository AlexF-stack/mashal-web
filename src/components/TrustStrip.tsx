"use client";

import { Clock3, Globe2, MapPin, Wrench } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { Reveal } from "@/components/motion/Reveal";

export default function TrustStrip() {
  const { t } = useI18n();

  const items = [
    { icon: Clock3, label: t.home.trustResponse },
    { icon: Wrench, label: t.home.trustParts },
    { icon: Globe2, label: t.home.trustExport },
    { icon: MapPin, label: t.home.trustLocation },
  ];

  return (
    <section className="border-y border-[color:var(--border)] bg-card py-8">
      <div className="container mx-auto px-6">
        <Reveal blur={false}>
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-4">
            {items.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-semibold leading-snug text-foreground/85">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
