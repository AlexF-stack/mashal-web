"use client";

import Image from "next/image";
import Link from "next/link";
import { useProject } from "@/context/ProjectContext";
import { ArrowUpRight, Cpu, Database, Gauge, Scale, Plus, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getMachineImage } from "@/lib/machine-images";
import { getMachineSummary } from "@/lib/machine-copy";
import { formatMass } from "@/lib/machine-format";
import { Machine } from "@/types/machine";

const CATEGORY_COLORS: Record<string, string> = {
  "Agriculture & Sylviculture": "from-emerald-500/20 to-green-900/40",
  "Gestion des Déchets": "from-teal-500/20 to-teal-900/40",
  "Bâtiment & Construction": "from-amber-500/20 to-orange-900/40",
  "Industrie & Entreposage": "from-blue-500/20 to-blue-900/40",
  "Mines & Carrières": "from-slate-500/20 to-slate-900/40",
  "Construction Routière": "from-orange-500/20 to-red-900/40",
  "Services": "from-indigo-500/20 to-indigo-900/40",
};

export default function MachineCard({ machine, index }: { machine: Machine; index: number }) {
  const { addItem, isInProject, removeItem } = useProject();
  const inProject = isInProject(machine.id);
  const [imgSrc, setImgSrc] = useState(() => getMachineImage(machine.id));

  const handleImageError = () => {
    setImgSrc("/images/machines/default-machine.webp");
  };

  const gradientColor = CATEGORY_COLORS[machine.category] ?? "from-gray-500/20 to-gray-900/40";

  const powerKW = machine.net_power_kw
    ? Number(machine.net_power_kw)
    : machine.rated_power_kw
      ? Number(machine.rated_power_kw)
      : machine.gross_power_kw
        ? Number(machine.gross_power_kw)
        : null;

  const powerHP = machine.net_power_hp ?? machine.rated_power_hp ?? null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-[#243044] text-white transition-colors duration-300 hover:border-primary/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={imgSrc}
          alt={`${machine.designation.fr} - ${machine.category} - Mashal Equipment`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className="scale-105 object-cover brightness-75 transition-transform duration-700 group-hover:scale-100 group-hover:brightness-90"
          onError={handleImageError}
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b opacity-60 transition-opacity duration-500 group-hover:opacity-30",
            gradientColor,
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#243044] via-transparent to-transparent" />

        <div className="absolute top-5 left-5">
          <span className="rounded-full border border-primary/30 bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md">
            {machine.category}
          </span>
        </div>

        <button className="absolute right-5 bottom-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full border border-white/10 bg-black/40 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:border-primary group-hover:bg-primary group-hover:text-background group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </button>

        {powerKW && (
          <div className="absolute bottom-5 left-5 rounded-xl border border-white/10 bg-black/50 px-3 py-1.5 backdrop-blur-md">
            <span className="text-xs font-bold text-primary">{powerKW} kW</span>
            {powerHP && <span className="ml-1 text-[10px] text-white/58">/ {powerHP} hp</span>}
          </div>
        )}
      </div>

      <div className="p-7">
        <h3 className="mb-5 text-2xl leading-tight transition-colors duration-300 group-hover:text-primary">
          {machine.designation.fr}
        </h3>
        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-white/72">
          {getMachineSummary(machine)}
        </p>

        <div className="mb-6 grid grid-cols-2 gap-4 border-b border-white/5 pb-6">
          {machine.engine_brand_model && (
            <div className="flex items-start gap-3">
              <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-widest text-white/52">Moteur</p>
                <p className="text-xs font-semibold leading-tight text-white/88">{machine.engine_brand_model}</p>
              </div>
            </div>
          )}

          {machine.weight_min && (
            <div className="flex items-start gap-3">
              <Scale className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-widest text-white/52">Poids</p>
                <p className="text-xs font-semibold leading-tight text-white/88">
                  {formatMass(machine.weight_min)}
                </p>
              </div>
            </div>
          )}

          {machine.bucket_val && (
            <div className="flex items-start gap-3">
              <Database className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-widest text-white/52">Godet</p>
                <p className="text-xs font-semibold leading-tight text-white/88">{machine.bucket_val} m³</p>
              </div>
            </div>
          )}

          {machine.depth_val && (
            <div className="flex items-start gap-3">
              <Gauge className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-widest text-white/52">Prof. fouille</p>
                <p className="text-xs font-semibold leading-tight text-white/88">
                  {Number(machine.depth_val).toLocaleString("fr-FR")} mm
                </p>
              </div>
            </div>
          )}

          {!machine.engine_brand_model && !machine.weight_min && (
            <p className="col-span-2 text-xs italic text-white/58">
              Spécifications détaillées disponibles sur demande.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <Link
              href={`/machines/${machine.id}`}
              className="flex-1 rounded-xl border border-white/12 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-white/78 transition-all hover:border-primary/40 hover:bg-white/8 hover:text-white"
            >
              Fiche technique
            </Link>
            <button
              onClick={() => {
                if (inProject) {
                  removeItem(machine.id);
                } else {
                  addItem({ id: machine.id, name: machine.designation.fr, category: machine.category });
                }
              }}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300",
                inProject 
                  ? "border-primary bg-primary/10 text-primary" 
                  : "border-white/12 text-white/40 hover:border-primary/40 hover:text-primary"
              )}
              title={inProject ? "Retirer du projet" : "Ajouter au projet"}
            >
              {inProject ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            </button>
          </div>
          <Link
            href="/sav"
            className="w-full rounded-xl bg-primary py-3 text-center text-[11px] font-bold uppercase tracking-wider text-background transition-opacity hover:opacity-90"
          >
            Demande de devis direct
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
