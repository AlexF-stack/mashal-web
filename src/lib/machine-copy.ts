import { Machine } from "@/types/machine";
import { formatLengthMmOrMeters, formatMass, formatMassRange } from "@/lib/machine-format";
import type { Language } from "@/lib/i18n";

function machineName(machine: Machine, lang: Language = "fr") {
  if (typeof machine.designation === "object") {
    return lang === "en" ? machine.designation.en : machine.designation.fr;
  }
  return String(machine.designation);
}

function power(machine: Machine) {
  const kw = machine.net_power_kw ?? machine.rated_power_kw ?? machine.gross_power_kw;
  const hp = machine.net_power_hp ?? machine.rated_power_hp;
  if (!kw) return null;
  return hp ? `${kw} kW / ${hp} hp` : `${kw} kW`;
}

export function getMachineHighlights(machine: Machine, lang: Language = "fr") {
  const labels =
    lang === "en"
      ? {
          engine: "Engine",
          power: "Power",
          bucket: "Bucket",
          depth: "Depth",
          width: "Width",
          force: "Force",
        }
      : {
          engine: "Moteur",
          power: "Puissance",
          bucket: "Godet",
          depth: "Profondeur",
          width: "Largeur",
          force: "Force",
        };

  const highlights = [
    machine.engine_brand_model ? `${labels.engine} ${machine.engine_brand_model}` : null,
    power(machine) ? `${labels.power} ${power(machine)}` : null,
    formatMassRange(machine.weight_min, machine.weight_max) ??
      formatMass(machine.operating_mass_kg),
    machine.bucket_val ? `${labels.bucket} ${machine.bucket_val} m3` : null,
    machine.depth_val
      ? `${labels.depth} ${formatLengthMmOrMeters(machine.depth_val)}`
      : null,
    machine.working_width_mm
      ? `${labels.width} ${formatLengthMmOrMeters(machine.working_width_mm)}`
      : null,
    machine.breakout_force_kN
      ? `${labels.force} ${machine.breakout_force_kN} kN`
      : null,
  ];

  return highlights.filter(Boolean).slice(0, 5) as string[];
}

export function getMachineSummary(machine: Machine, lang: Language = "fr") {
  const name = machineName(machine, lang);
  const details = getMachineHighlights(machine, lang);

  if (details.length === 0) {
    return lang === "en"
      ? `${name} is a consultation baseline to qualify a site need and prepare a detailed quote.`
      : `${name} est présenté comme une base de consultation pour qualifier un besoin chantier et préparer un devis détaillé.`;
  }

  const joined = details.slice(0, 3).join(", ");
  return lang === "en"
    ? `${name} is a ${machine.category} solution with ${joined}. The sheet helps compare key capacities before technical validation.`
    : `${name} est une solution ${machine.category.toLowerCase()} avec ${joined}. La fiche sert à comparer rapidement les capacités clés avant validation.`;
}

export function getMachineUseCases(machine: Machine, lang: Language = "fr") {
  const name = machineName(machine, lang).toLowerCase();

  if (lang === "en") {
    if (name.includes("excavator") || name.includes("pelle")) {
      return [
        "Earthmoving, digging, material loading and quarry work.",
        "Sites needing reach, depth and steady production cycles.",
      ];
    }
    if (name.includes("loader") || name.includes("charge")) {
      return [
        "Bulk handling, plant feeding and versatile site operations.",
        "Where bucket capacity, dump height and mobility matter.",
      ];
    }
    if (name.includes("compactor") || name.includes("roller") || name.includes("rouleau")) {
      return [
        "Compacting platforms, roads, embankments and formation layers.",
        "Density control with adapted width, frequency and force.",
      ];
    }
    return [
      "Qualify a site need with a fast read of available capacities.",
      "Technical comparison before quote, sourcing or logistics prep.",
    ];
  }

  if (name.includes("pelle")) {
    return [
      "Terrassement, fouille, chargement de matériaux et travaux de carrière.",
      "Chantiers nécessitant portée, profondeur et cycles réguliers.",
    ];
  }

  return [
    "Qualification d'un besoin chantier avec lecture rapide des capacités.",
    "Comparaison technique avant devis, sourcing ou préparation logistique.",
  ];
}
