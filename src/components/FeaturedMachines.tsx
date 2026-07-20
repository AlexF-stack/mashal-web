"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MachineCard from "./MachineCard";
import machinesData from "../machines_master.json";
import { Machine } from "@/types/machine";
import { useI18n } from "@/lib/i18n-context";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";

const FEATURED_IDS = [
  "pelle-hydraulique-20t",
  "niveleuse-160hp",
  "tracteur-agricole-150hp",
  "chargeuse-pneus-3t",
  "compacteur-monobille-12t",
  "chariot-elevateur-5t",
];

export default function FeaturedMachines() {
  const { t } = useI18n();
  const machines = (machinesData as Machine[]).filter((m) =>
    FEATURED_IDS.includes(m.id),
  );

  return (
    <section id="catalog" className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-6">
        <Reveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              {t.home.catalogEyebrow}
            </p>
            <h2 className="mb-3 text-3xl leading-tight md:text-5xl">
              {t.home.catalogTitle}
            </h2>
            <p className="leading-relaxed text-foreground/65">{t.home.catalogText}</p>
          </div>
          <MagneticButton
            href="/machines"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary"
          >
            {t.home.catalogAll}
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {machines.map((machine, index) => (
            <MachineCard key={machine.id} machine={machine} index={index} />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/machines"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            {t.home.catalogAll} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
