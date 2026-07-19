"use client";

import { useState, useCallback, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";

interface MachineSearchProps {
  onSearchChange: (filters: SearchFilters) => void;
  isLoading?: boolean;
}

export interface SearchFilters {
  search: string;
  category: string;
  page: number;
  maxWeight?: number;
  sortBy?: string;
}

export default function MachineSearch({
  onSearchChange,
  isLoading = false,
}: MachineSearchProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [maxWeight, setMaxWeight] = useState(100000);
  const [sortBy, setSortBy] = useState("default");
  const [categories, setCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/machines", { method: "POST" });
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Debounced search
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      onSearchChange({ search: value, category, maxWeight, sortBy, page: 1 });
    },
    [category, maxWeight, sortBy, onSearchChange]
  );

  const handleCategoryChange = useCallback(
    (value: string) => {
      setCategory(value);
      onSearchChange({ search, category: value, maxWeight, sortBy, page: 1 });
    },
    [search, maxWeight, sortBy, onSearchChange]
  );

  const handleWeightChange = (value: number) => {
    setMaxWeight(value);
    onSearchChange({ search, category, maxWeight: value, sortBy, page: 1 });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSearchChange({ search, category, maxWeight, sortBy: value, page: 1 });
  };

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setMaxWeight(100000);
    setSortBy("default");
    onSearchChange({ search: "", category: "all", maxWeight: 100000, sortBy: "default", page: 1 });
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-foreground/40" />
        <input
          type="text"
          placeholder="Rechercher une machine, marque, modèle..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          disabled={isLoading}
          className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-foreground placeholder:text-foreground/40 transition-colors focus:border-primary/50 focus:bg-white/10 focus:outline-none disabled:opacity-50"
        />
        {search && (
          <button
            onClick={() => handleSearchChange("")}
            className="absolute right-4 top-3.5 text-foreground/40 hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Filter Toggle & Category Filter */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white/10"
        >
          <Filter className="h-4 w-4" />
          Filtres
        </button>

        {categories.length > 0 && (
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            disabled={isLoading}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white/10 focus:outline-none disabled:opacity-50"
          >
            <option value="all">Toutes les catégories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}

        {(search || category !== "all") && (
          <button
            onClick={handleReset}
            className="text-sm text-primary hover:underline"
          >
            Réinitialiser filtres
          </button>
        )}
      </div>

      {/* Advanced Filters Panel (expandable) */}
      {showFilters && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <label className="text-sm font-bold text-foreground">
                  Poids maximum
                </label>
                <span className="text-xs font-bold text-primary">
                  {maxWeight >= 100000 ? "Illimité" : `${(maxWeight / 1000).toFixed(0)} t`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={maxWeight}
                onChange={(e) => handleWeightChange(parseInt(e.target.value))}
                className="w-full accent-primary h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
              <div className="mt-2 flex justify-between text-[10px] text-foreground/40 font-bold">
                <span>0 t</span>
                <span>100 t</span>
              </div>
            </div>

            <div>
              <label className="mb-4 block text-sm font-bold text-foreground">
                Trier par
              </label>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
              >
                <option value="default">Pertinence</option>
                <option value="weight-asc">Poids (croissant)</option>
                <option value="weight-desc">Poids (décroissant)</option>
                <option value="power-desc">Puissance (décroissant)</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
