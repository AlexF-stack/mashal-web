"use client";

import { useProject } from "@/context/ProjectContext";
import { FolderOpen, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function ProjectSupport() {
  const { items, removeItem } = useProject();
  const searchParams = useSearchParams();
  const isProject = searchParams.get("project") === "true";

  if (!isProject || items.length === 0) return null;

  return (
    <div className="mb-10 p-6 rounded-[2rem] border border-primary/20 bg-primary/5 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
          <FolderOpen className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-bold uppercase tracking-wider">Votre Projet de Devis</h3>
      </div>
      
      <p className="text-sm text-foreground/60 mb-6">
        Vous avez sélectionné les machines suivantes pour votre demande de devis groupée :
      </p>

      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 group">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">{item.category}</p>
              <p className="text-sm font-bold">{item.name}</p>
            </div>
            <button 
              onClick={() => removeItem(item.id)}
              className="p-2 text-foreground/20 hover:text-red-500 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
