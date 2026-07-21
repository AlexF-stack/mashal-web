"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageHero from "@/components/PageHero";
import MachineCard from "@/components/MachineCard";
import machinesData from "@/data/machines-catalogue";
import { Machine } from "@/types/machine";
import { useI18n } from "@/lib/i18n-context";
import { categoryLabel } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { siteVisuals } from "@/lib/site-content";
import { Suspense } from "react";

function MachinesCatalog() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const categories = useMemo(
    () => [
      "Tous",
      ...Array.from(
        new Set((machinesData as Machine[]).map((machine) => machine.category)),
      ),
    ],
    [],
  );
  const [activeCategory, setActiveCategory] = useState("Tous");

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat && categories.includes(cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams, categories]);

  const filteredMachines = useMemo(
    () =>
      activeCategory === "Tous"
        ? (machinesData as Machine[])
        : (machinesData as Machine[]).filter(
            (machine) => machine.category === activeCategory,
          ),
    [activeCategory],
  );

  return (
    <>
      <PageHero
        eyebrow={t.pages.machines.eyebrow}
        title={t.pages.machines.title}
        highlight={t.pages.machines.highlight}
        description={t.pages.machines.description}
        primaryHref="/sav?type=devis"
        primaryLabel={t.pages.machines.primary}
        secondaryHref="/pieces"
        secondaryLabel={t.pages.machines.secondary}
        backgroundImage={siteVisuals.loader}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
                {t.pages.machines.filter}
              </p>
              <h2 className="text-3xl md:text-4xl">{t.pages.machines.byCategory}</h2>
            </div>
            <p className="text-sm text-foreground/55">
              {filteredMachines.length}{" "}
              {filteredMachines.length > 1 ? t.home.refsPlural : t.home.refs}
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                  activeCategory === category
                    ? "bg-primary text-background"
                    : "border border-[color:var(--border)] text-foreground/65 hover:border-primary/40",
                )}
              >
                {category === "Tous"
                  ? t.machines.allCategories
                  : categoryLabel(t, category)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredMachines.map((machine, index) => (
              <MachineCard key={machine.id} machine={machine} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function MachinesPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-background" />}>
      <MachinesCatalog />
    </Suspense>
  );
}
