"use client";

import { useState } from "react";
import { FileText, Image as ImageIcon, Settings, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Machine } from "@/types/machine";

interface MachineDetailsTabsProps {
  specs: React.ReactNode;
  machine: Machine;
  imageUrl: string;
}

export default function MachineDetailsTabs({ specs, imageUrl }: MachineDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState("specs");

  const tabs = [
    { id: "specs", label: "Caractéristiques", icon: Settings },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "gallery", label: "Galerie", icon: ImageIcon },
  ];

  return (
    <div className="space-y-8">
      <div className="flex gap-2 p-1.5 rounded-2xl border border-white/5 glass w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all",
              activeTab === tab.id
                ? "bg-primary text-background shadow-lg"
                : "text-foreground/60 hover:bg-white/5"
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
              <h3 className="text-2xl mb-6">Documentation technique</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Fiche technique complète (PDF)",
                  "Manuel d'entretien (Extrait)",
                  "Catalogue pièces de rechange",
                  "Guide de sécurité",
                ].map((doc) => (
                  <div key={doc} className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:border-primary/40 transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-sm font-semibold">{doc}</span>
                    </div>
                    <Download className="h-4 w-4 text-foreground/40 group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="rounded-[2rem] border border-white/8 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="text-2xl mb-6">Galerie d&apos;images</h3>
              <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-xl border border-white/10 group cursor-zoom-in">
                    <Image
                      src={imageUrl}
                      alt={`Vue ${i}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110 brightness-75 group-hover:brightness-100"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-foreground/40 italic">
                Photos contractuelles du modèle de référence. Les configurations peuvent varier.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
