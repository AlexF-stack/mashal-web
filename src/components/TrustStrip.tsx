"use client";

import { LifeBuoy, MapPinned, PackageCheck, Plane, Timer } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { Reveal } from "@/components/motion/Reveal";
import { IconBadge } from "@/components/ui/IconBadge";

export default function TrustStrip() {
  const { t } = useI18n();

  const items = [
    { icon: Timer, label: t.home.trustResponse },
    { icon: PackageCheck, label: t.home.trustParts },
    { icon: Plane, label: t.home.trustExport },
    { icon: MapPinned, label: t.home.trustLocation },
  ];

  return (
    <section className="border-y border-[color:var(--border)] bg-card py-8">
      <div className="container mx-auto px-6">
        <Reveal blur={false}>
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-4">
            {items.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <IconBadge icon={item.icon} size="sm" variant="neutral" />
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
