import type { Machine } from "@/types/machine";
import type { Language, Translation } from "@/lib/i18n";
import { categoryLabel } from "@/lib/i18n";
import { formatMass } from "@/lib/machine-format";

export type ServiceKey =
  | "training"
  | "consulting"
  | "sav"
  | "parts"
  | "sites"
  | "machines"
  | "contact"
  | "menu";

export type ChatLink = { label: string; href: string };

export type BotReply = {
  text: string;
  options?: string[];
  links?: ChatLink[];
};

export function machineName(machine: Machine, lang: Language) {
  return lang === "en" ? machine.designation.en : machine.designation.fr;
}

export function getCatalogCategories(machines: Machine[]): string[] {
  return Array.from(new Set(machines.map((m) => m.category))).sort();
}

export function findMachineByLabel(machines: Machine[], label: string, lang: Language) {
  const norm = label.trim().toLowerCase();
  return machines.find((m) => machineName(m, lang).toLowerCase() === norm);
}

export function findMachineByCategoryLabel(
  machines: Machine[],
  label: string,
  t: Translation,
): string | null {
  const categories = getCatalogCategories(machines);
  return (
    categories.find((cat) => cat === label || categoryLabel(t, cat) === label) ?? null
  );
}

export function searchMachines(machines: Machine[], query: string, lang: Language): Machine[] {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 2) return [];

  return machines.filter((m) => {
    const name = machineName(m, lang).toLowerCase();
    const desc = (m.description?.[lang] ?? "").toLowerCase();
    const cat = m.category.toLowerCase();
    const engine = (m.engine_brand_model ?? "").toLowerCase();
    const extra = (m.extra_info ?? "").toLowerCase();
    return (
      name.includes(q) ||
      desc.includes(q) ||
      cat.includes(q) ||
      engine.includes(q) ||
      extra.includes(q) ||
      m.id.includes(q.replace(/\s+/g, "-"))
    );
  });
}

export function formatMachineDetail(
  machine: Machine,
  lang: Language,
  t: Translation,
): string {
  const p = t.chat.product;
  const lines = [
    `📦 ${machineName(machine, lang)}`,
    `${p.category}: ${machine.category}`,
    "",
    machine.description?.[lang] ?? "",
  ].filter(Boolean);

  const specs: string[] = [];
  if (machine.engine_brand_model) specs.push(`${p.engine}: ${machine.engine_brand_model}`);
  if (machine.net_power_kw) specs.push(`${p.power}: ${machine.net_power_kw} kW`);
  if (machine.rated_power_hp) specs.push(`${p.powerHp}: ${machine.rated_power_hp} hp`);
  if (machine.operating_mass_kg || machine.weight_min) {
    specs.push(`${p.weight}: ${formatMass(machine.operating_mass_kg ?? machine.weight_min)}`);
  }
  if (machine.bucket_val) specs.push(`${p.bucket}: ${machine.bucket_val} m³`);
  if (machine.depth_val) specs.push(`${p.depth}: ${Number(machine.depth_val).toLocaleString("fr-FR")} mm`);
  if (machine.max_speed_kmh) specs.push(`${p.speed}: ${machine.max_speed_kmh} km/h`);
  if (machine.breakout_force_kN) specs.push(`${p.force}: ${machine.breakout_force_kN} kN`);
  if (machine.extra_info) specs.push(`${p.extra}: ${machine.extra_info}`);

  if (specs.length) {
    lines.push("", p.specsTitle, ...specs.map((s) => `• ${s}`));
  }

  return lines.join("\n");
}

export type StepServiceKey = "training" | "consulting" | "sav" | "parts" | "sites";

export function formatServiceSteps(service: StepServiceKey, t: Translation): string {
  const steps = t.chat.steps[service];
  if (!steps?.length) return t.chat.replies[service] ?? "";
  return [t.chat.stepsIntro, "", ...steps.map((step, i) => `${i + 1}. ${step}`)].join("\n");
}

export function formatMachineList(
  machines: Machine[],
  lang: Language,
  t: Translation,
  category?: string,
): string {
  const header = category
    ? `${t.chat.product.listInCategory} ${categoryLabel(t, category)} (${machines.length})`
    : `${t.chat.product.searchResults} (${machines.length})`;
  const preview = machines
    .slice(0, 8)
    .map((m) => `• ${machineName(m, lang)}`)
    .join("\n");
  const more =
    machines.length > 8
      ? `\n\n${t.chat.product.andMore.replace("{n}", String(machines.length - 8))}`
      : "";
  return `${header}\n\n${preview}${more}\n\n${t.chat.product.pickModel}`;
}
