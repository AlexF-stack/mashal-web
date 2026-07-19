"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import MachineCard from "./MachineCard";
import MachineSearch, { SearchFilters } from "./MachineSearch";
import machinesData from "../machines_master.json";
import { Machine } from "@/types/machine";
import { cn } from "@/lib/utils";

const machines = machinesData as Machine[];

const categories = [
  "Tous",
  "Agriculture & Sylviculture",
  "Gestion des Déchets",
  "Bâtiment & Construction",
  "Industrie & Entreposage",
  "Mines & Carrières",
  "Construction Routière",
  "Services",
];

export default function MachineGrid() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    search: "",
    category: "all",
    page: 1,
  });
  const filteredMachines = useMemo(() => {
    let result = [...machines];

    if (activeCategory !== "Tous") {
      result = result.filter((machine) => machine.category === activeCategory);
    }

    if (searchFilters.search) {
      const searchLower = searchFilters.search.toLowerCase();
      result = result.filter((machine) => {
        const designation =
          typeof machine.designation === "object"
            ? `${machine.designation.fr} ${machine.designation.en}`.toLowerCase()
            : String(machine.designation).toLowerCase();
        const engine = (machine.engine_brand_model || "").toLowerCase();
        return designation.includes(searchLower) || engine.includes(searchLower);
      });
    }

    if (searchFilters.category && searchFilters.category !== "all") {
      result = result.filter(
        (machine) =>
          machine.category?.toLowerCase() === searchFilters.category.toLowerCase(),
      );
    }

    if (searchFilters.maxWeight) {
      result = result.filter((m) => {
        const w = m.weight_min ? parseInt(String(m.weight_min)) : 0;
        return w <= (searchFilters.maxWeight || 100000);
      });
    }

    if (searchFilters.sortBy) {
      result.sort((a, b) => {
        if (searchFilters.sortBy === "weight-asc") return (parseInt(String(a.weight_min || "0"))) - (parseInt(String(b.weight_min || "0")));
        if (searchFilters.sortBy === "weight-desc") return (parseInt(String(b.weight_min || "0"))) - (parseInt(String(a.weight_min || "0")));
        if (searchFilters.sortBy === "power-desc") {
          const pA = parseInt(String(a.net_power_kw || a.rated_power_kw || "0"));
          const pB = parseInt(String(b.net_power_kw || b.rated_power_kw || "0"));
          return pB - pA;
        }
        return 0;
      });
    }

    return result;
  }, [activeCategory, searchFilters]);

  const handleSearchChange = (filters: SearchFilters) => {
    setSearchFilters(filters);
  };

  return (
    <section id="catalog" className="relative bg-background py-32">
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6">
        {/* Search Component */}
        <MachineSearch
          onSearchChange={handleSearchChange}
          isLoading={false}
        />

        <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">Catalogue</p>
            <h2 className="mb-6 text-3xl leading-[0.9] sm:text-4xl md:text-5xl lg:text-6xl">
              Expertise <span>Sérielle</span>
            </h2>
            <p className="leading-relaxed text-foreground/60">
              Explorez notre gamme d&apos;équipements lourds, d&apos;unités de support et
              de solutions opérationnelles. Chaque référence est présentée comme une
              base de travail pour vos besoins terrain, vos appels d&apos;offres ou vos
              consultations techniques.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/5 glass p-1.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-xl px-6 py-2.5 text-xs font-bold transition-all duration-300",
                  activeCategory === category
                    ? "bg-primary text-background shadow-lg shadow-primary/20"
                    : "text-foreground/70 hover:bg-white/5 hover:text-foreground dark:text-white/72 dark:hover:text-white",
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-10 grid gap-6 rounded-[2rem] border border-white/8 bg-white/60 p-6 md:p-8 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl md:grid-cols-3 dark:bg-white/4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">Équipements</p>
            <p className="text-sm leading-relaxed text-foreground/65">
              Terrassement, compactage, manutention, béton et solutions de polyvalence
              pour les opérations lourdes.
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">Pièces & service</p>
            <p className="text-sm leading-relaxed text-foreground/65">
              Le catalogue est pensé pour s&apos;articuler avec l&apos;approvisionnement en
              pièces, l&apos;entretien préventif et l&apos;appui après-vente.
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">Usage commercial</p>
            <p className="text-sm leading-relaxed text-foreground/65">
              Demandez une configuration adaptée, une fiche technique détaillée ou un
              accompagnement pour votre projet d&apos;acquisition.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] grid-auto-rows-fr gap-8">
          <AnimatePresence mode="popLayout">
            {filteredMachines.map((machine, index) => (
              <MachineCard key={machine.id} machine={machine} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
