"use client";

import Image from "next/image";
import Link from "next/link";
import { useProject } from "@/context/ProjectContext";
import { Cpu, Database, Gauge, Scale, Plus, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getMachineImage } from "@/lib/machine-images";
import { getMachineSummary } from "@/lib/machine-copy";
import { formatMass } from "@/lib/machine-format";
import { Machine } from "@/types/machine";
import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal } from "@/components/motion/Reveal";
import { useI18n } from "@/lib/i18n-context";

export default function MachineCard({
  machine,
  index,
}: {
  machine: Machine;
  index: number;
}) {
  const { addItem, isInProject, removeItem } = useProject();
  const { t, language } = useI18n();
  const inProject = isInProject(machine.id);
  const [imgSrc, setImgSrc] = useState(() => getMachineImage(machine.id));

  const handleImageError = () => {
    setImgSrc("/images/machines/default-machine.webp");
  };

  const powerKW = machine.net_power_kw
    ? Number(machine.net_power_kw)
    : machine.rated_power_kw
      ? Number(machine.rated_power_kw)
      : machine.gross_power_kw
        ? Number(machine.gross_power_kw)
        : null;

  const powerHP = machine.net_power_hp ?? machine.rated_power_hp ?? null;
  const name =
    typeof machine.designation === "object"
      ? language === "en"
        ? machine.designation.en
        : machine.designation.fr
      : String(machine.designation);

  return (
    <Reveal delay={Math.min(index * 0.04, 0.28)} blur={false}>
      <TiltCard intensity={8} className="h-full">
        <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--border)] bg-card text-foreground shadow-[0_16px_48px_rgba(15,23,42,0.06)] transition-colors duration-300 hover:border-primary/35">
          <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
            <Image
              src={imgSrc}
              alt={`${name} - ${machine.category} - Mashal Equipment`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                {machine.category}
              </span>
            </div>

            {powerKW && (
              <div className="absolute bottom-4 left-4 rounded-xl border border-white/15 bg-black/45 px-3 py-1.5 backdrop-blur-md">
                <span className="text-xs font-bold text-primary">{powerKW} kW</span>
                {powerHP && (
                  <span className="ml-1 text-[10px] text-white/70">/ {powerHP} hp</span>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col p-6">
            <h3 className="mb-3 text-xl leading-tight transition-colors duration-300 group-hover:text-primary md:text-2xl">
              {name}
            </h3>
            <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-foreground/65">
              {getMachineSummary(machine)}
            </p>

            <div className="mb-6 grid flex-1 grid-cols-2 gap-4 border-b border-[color:var(--border)] pb-5">
              {machine.engine_brand_model && (
                <div className="flex items-start gap-3">
                  <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                  <div>
                    <p className="mb-1 text-[10px] uppercase tracking-widest text-foreground/45">
                      {t.machines.specs.engine}
                    </p>
                    <p className="text-xs font-semibold leading-tight">
                      {machine.engine_brand_model}
                    </p>
                  </div>
                </div>
              )}

              {machine.weight_min && (
                <div className="flex items-start gap-3">
                  <Scale className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                  <div>
                    <p className="mb-1 text-[10px] uppercase tracking-widest text-foreground/45">
                      {t.machines.specs.weight}
                    </p>
                    <p className="text-xs font-semibold leading-tight">
                      {formatMass(machine.weight_min)}
                    </p>
                  </div>
                </div>
              )}

              {machine.bucket_val && (
                <div className="flex items-start gap-3">
                  <Database className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                  <div>
                    <p className="mb-1 text-[10px] uppercase tracking-widest text-foreground/45">
                      {t.machines.specs.bucket}
                    </p>
                    <p className="text-xs font-semibold leading-tight">
                      {machine.bucket_val} m³
                    </p>
                  </div>
                </div>
              )}

              {machine.depth_val && (
                <div className="flex items-start gap-3">
                  <Gauge className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                  <div>
                    <p className="mb-1 text-[10px] uppercase tracking-widest text-foreground/45">
                      {t.machines.specs.depth}
                    </p>
                    <p className="text-xs font-semibold leading-tight">
                      {Number(machine.depth_val).toLocaleString("fr-FR")} mm
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-auto flex flex-col gap-3">
              <div className="flex gap-3">
                <Link
                  href={`/machines/${machine.id}`}
                  className="flex-1 rounded-xl border border-[color:var(--border)] py-3 text-center text-[11px] font-bold uppercase tracking-wider text-foreground/75 transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {t.machines.techSheet}
                </Link>
                <button
                  onClick={() => {
                    if (inProject) {
                      removeItem(machine.id);
                    } else {
                      addItem({
                        id: machine.id,
                        name,
                        category: machine.category,
                      });
                    }
                  }}
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl border transition-colors",
                    inProject
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-[color:var(--border)] text-foreground/40 hover:border-primary/40 hover:text-primary",
                  )}
                  title={inProject ? "Retirer du projet" : "Ajouter au projet"}
                >
                  {inProject ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                </button>
              </div>
              <Link
                href="/sav?type=devis"
                className="w-full rounded-xl bg-primary py-3 text-center text-[11px] font-bold uppercase tracking-wider text-background transition-opacity hover:opacity-90"
              >
                {t.machines.quoteDirect}
              </Link>
            </div>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  );
}
