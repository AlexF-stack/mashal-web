"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import MachineCard from "./MachineCard";
import MachineSearch, { SearchFilters } from "./MachineSearch";
import machinesData from "@/data/machines-catalogue";
import { Machine } from "@/types/machine";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n-context";
import { Reveal } from "@/components/motion/Reveal";

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
  const { t } = useI18n();
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
        if (searchFilters.sortBy === "weight-asc")
          return (
            parseInt(String(a.weight_min || "0")) -
            parseInt(String(b.weight_min || "0"))
          );
        if (searchFilters.sortBy === "weight-desc")
          return (
            parseInt(String(b.weight_min || "0")) -
            parseInt(String(a.weight_min || "0"))
          );
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
    <section id="catalog" className="relative bg-background py-20 md:py-28">
      <div className="container mx-auto px-6">
        <Reveal className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            {t.home.catalogEyebrow}
          </p>
          <h2 className="mb-4 text-3xl leading-tight md:text-5xl">
            {t.home.catalogTitle}
          </h2>
          <p className="leading-relaxed text-foreground/65">{t.home.catalogText}</p>
        </Reveal>

        <MachineSearch onSearchChange={handleSearchChange} isLoading={false} />

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                activeCategory === category
                  ? "bg-primary text-background"
                  : "border border-[color:var(--border)] text-foreground/65 hover:border-primary/40 hover:text-foreground",
              )}
            >
              {category === "Tous" ? t.machines.allCategories : category}
            </button>
          ))}
        </div>

        <p className="mb-6 text-sm text-foreground/55">
          {filteredMachines.length}{" "}
          {filteredMachines.length > 1 ? t.home.refsPlural : t.home.refs}
        </p>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
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
