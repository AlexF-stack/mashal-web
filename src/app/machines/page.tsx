"use client";

import { useMemo, useState } from "react";
import PageHero from "@/components/PageHero";
import MachineCard from "@/components/MachineCard";
import machinesData from "@/machines_master.json";
import { Machine } from "@/types/machine";

export default function MachinesPage() {
  const categories = useMemo(
    () => ["Tous", ...Array.from(new Set((machinesData as Machine[]).map((machine) => machine.category)))],
    [],
  );
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredMachines = useMemo(
    () =>
      activeCategory === "Tous"
        ? machinesData
        : (machinesData as Machine[]).filter((machine) => machine.category === activeCategory),
    [activeCategory],
  );

  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title="Notre parc"
        highlight="d'engins"
        description="Découvrez notre sélection d'équipements de construction et travaux publics, rigoureusement sélectionnés pour leur fiabilité et leurs performances."
        primaryHref="/sav?type=devis"
        primaryLabel="Demande de devis"
        secondaryHref="/pieces"
        secondaryLabel="Voir les pièces"
        backgroundImage="/visuals/excavator-worksite.jpg"
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">Filtrer</p>
              <h2 className="text-3xl leading-[0.9] sm:text-4xl md:text-5xl">
                Machines par <span className="text-primary">catégorie</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={
                    activeCategory === category
                      ? "rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-background shadow-lg shadow-primary/20"
                      : "rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-foreground/72 hover:bg-white/10 hover:text-foreground dark:text-white/72 dark:hover:text-white"
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-16 rounded-[2rem] border border-white/8 bg-white/60 p-8 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-white/4">
            <p className="text-sm text-foreground/70">
              {filteredMachines.length} machine{filteredMachines.length > 1 ? "s" : ""} trouvée{filteredMachines.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(filteredMachines as Machine[]).map((machine, index) => (
              <MachineCard key={machine.id} machine={machine} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
