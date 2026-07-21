"use client";

import { useState } from "react";
import { FileText, Image as ImageIcon, Settings, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Machine } from "@/types/machine";
import { companyDocuments } from "@/lib/documents";

interface MachineDetailsTabsProps {
  specs: React.ReactNode;
  machine: Machine;
  imageUrl: string;
}

export default function MachineDetailsTabs({
  specs,
  machine,
  imageUrl,
}: MachineDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState("specs");

  const tabs = [
    { id: "specs", label: "Caractéristiques", icon: Settings },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "gallery", label: "Photo", icon: ImageIcon },
  ];

  return (
    <div className="space-y-8">
      <div className="glass flex w-fit gap-2 rounded-2xl border border-white/5 p-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all",
              activeTab === tab.id
                ? "bg-primary text-background shadow-lg"
                : "text-foreground/60 hover:bg-white/5",
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "specs" && (
            <div className="rounded-[2rem] border border-white/8 bg-white/5 p-8 backdrop-blur-xl">
              {specs}
            </div>
          )}

          {activeTab === "documents" && (
            <div className="rounded-[2rem] border border-white/8 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="mb-3 text-2xl">Documentation disponible</h3>
              <p className="mb-6 text-sm leading-relaxed text-foreground/60">
                Documents officiels Mashal. Pour une fiche constructeur spécifique à{" "}
                {machine.designation.fr}, ouvrez une demande auprès de notre équipe.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href={companyDocuments.catalogue.href}
                  download={companyDocuments.catalogue.filename}
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-primary/40"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <span className="block text-sm font-semibold">Catalogue machines (PDF)</span>
                      <span className="text-xs text-foreground/45">
                        {companyDocuments.catalogue.sizeLabel}
                      </span>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-foreground/40 group-hover:text-primary" />
                </a>
                <a
                  href={companyDocuments.presentation.href}
                  download={companyDocuments.presentation.filename}
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-primary/40"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <span className="block text-sm font-semibold">Présentation Mashal (PDF)</span>
                      <span className="text-xs text-foreground/45">
                        {companyDocuments.presentation.sizeLabel}
                      </span>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-foreground/40 group-hover:text-primary" />
                </a>
              </div>
              <Link
                href={`/sav?type=devis&ref=${encodeURIComponent(machine.id)}`}
                className="mt-6 inline-flex text-sm font-bold uppercase tracking-[0.14em] text-primary hover:underline"
              >
                Demander la documentation technique →
              </Link>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="rounded-[2rem] border border-white/8 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="mb-6 text-2xl">Photo de référence</h3>
              <div className="relative mx-auto aspect-[16/10] max-w-2xl overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={imageUrl}
                  alt={machine.designation.fr}
                  fill
                  sizes="(max-width: 768px) 100vw, 640px"
                  className="object-cover"
                />
              </div>
              <p className="mt-6 text-xs text-foreground/45">
                Visuel de référence pour ce type d&apos;équipement. La configuration finale peut
                varier selon options et disponibilité — confirmation sur devis.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
