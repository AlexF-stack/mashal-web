"use client";

import { useProject } from "@/context/ProjectContext";
import { Plus, Check, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductPageButtonsProps {
  machineId: string;
  machineName: string;
  category: string;
}

export default function ProductPageButtons({ machineId, machineName, category }: ProductPageButtonsProps) {
  const { addItem, isInProject, removeItem } = useProject();
  const inProject = isInProject(machineId);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <button
          onClick={() => {
            if (inProject) {
              removeItem(machineId);
            } else {
              addItem({ id: machineId, name: machineName, category });
            }
          }}
          className={cn(
            "flex-1 flex items-center justify-center gap-3 rounded-2xl border py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300",
            inProject 
              ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10" 
              : "border-white/10 text-foreground/60 hover:border-primary/40 hover:text-primary hover:bg-white/5"
          )}
        >
          {inProject ? (
            <>
              <Check className="h-5 w-5" />
              Retirer du projet
            </>
          ) : (
            <>
              <Plus className="h-5 w-5" />
              Ajouter au projet
            </>
          )}
        </button>
      </div>
      
      <Link
        href="/sav"
        className="btn-premium btn-gold w-full justify-center py-5 text-sm"
      >
        <MessageSquare className="h-5 w-5" />
        Demander un devis direct
      </Link>
    </div>
  );
}
