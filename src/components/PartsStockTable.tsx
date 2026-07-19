"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { stockParts } from "@/lib/site-content";

const availabilityClass: Record<(typeof stockParts)[number]["availability"], string> = {
  "En stock": "font-bold text-emerald-600 dark:text-emerald-400",
  "Sous 72h": "font-bold text-sky-600 dark:text-sky-400",
  "Sur commande": "font-bold text-amber-600 dark:text-amber-400",
};

export default function PartsStockTable() {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("Tous");

  const families = useMemo(
    () => ["Tous", ...Array.from(new Set(stockParts.map((part) => part.family)))],
    [],
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return stockParts.filter((part) => {
      const matchesFamily = family === "Tous" || part.family === family;
      const matchesQuery =
        !normalized ||
        part.sku.toLowerCase().includes(normalized) ||
        part.name.toLowerCase().includes(normalized) ||
        part.compatibility.toLowerCase().includes(normalized) ||
        part.family.toLowerCase().includes(normalized);
      return matchesFamily && matchesQuery;
    });
  }, [family, query]);

  return (
    <div className="rounded-[2.5rem] border border-white/8 bg-white/60 p-8 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-white/4">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Références suivies
          </p>
          <h2 className="text-4xl lg:text-5xl">Disponibilité pièces</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/60">
            Recherchez par référence, famille ou compatibilité machine. Pour une pièce
            absente du tableau, ouvrez une demande avec photos et numéro de série.
          </p>
        </div>

        <div className="flex w-full max-w-xl flex-col gap-3">
          <label className="relative block">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-foreground/40" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Référence, moteur, famille…"
              className="w-full rounded-2xl border border-white/8 bg-white/70 py-3.5 pr-4 pl-11 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-primary/40 dark:bg-white/6"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {families.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFamily(item)}
                className={
                  family === item
                    ? "rounded-full bg-primary px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-background"
                    : "rounded-full border border-white/10 bg-white/40 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground/65 hover:border-primary/30 dark:bg-white/5"
                }
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mb-4 text-sm text-foreground/55">
        {filtered.length} référence{filtered.length > 1 ? "s" : ""} trouvée
        {filtered.length > 1 ? "s" : ""}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/8 text-left text-primary">
              <th className="px-4 py-4">Référence</th>
              <th className="px-4 py-4">Désignation</th>
              <th className="px-4 py-4">Compatibilité</th>
              <th className="px-4 py-4">Disponibilité</th>
              <th className="px-4 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((part) => (
              <tr key={part.sku} className="border-b border-white/6 text-foreground/70">
                <td className="px-4 py-4 font-semibold text-foreground">{part.sku}</td>
                <td className="px-4 py-4">{part.name}</td>
                <td className="px-4 py-4">{part.compatibility}</td>
                <td className="px-4 py-4">
                  <span className={availabilityClass[part.availability]}>
                    {part.availability}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <Link
                    href={`/sav?ref=${encodeURIComponent(part.sku)}&type=pieces`}
                    className="text-xs font-bold uppercase tracking-[0.16em] text-primary hover:underline"
                  >
                    Demander
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-foreground/55">
                  Aucune référence ne correspond.{" "}
                  <Link href="/sav?type=pieces" className="font-semibold text-primary hover:underline">
                    Ouvrir une demande pièces
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
