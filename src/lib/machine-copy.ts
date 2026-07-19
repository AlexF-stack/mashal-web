import { Machine } from "@/types/machine";
import { formatLengthMmOrMeters, formatMass, formatMassRange } from "@/lib/machine-format";

function machineName(machine: Machine) {
  return typeof machine.designation === "object"
    ? machine.designation.fr
    : String(machine.designation);
}

function power(machine: Machine) {
  const kw = machine.net_power_kw ?? machine.rated_power_kw ?? machine.gross_power_kw;
  const hp = machine.net_power_hp ?? machine.rated_power_hp;

  if (!kw) {
    return null;
  }

  return hp ? `${kw} kW / ${hp} hp` : `${kw} kW`;
}

export function getMachineHighlights(machine: Machine) {
  const highlights = [
    machine.engine_brand_model ? `Moteur ${machine.engine_brand_model}` : null,
    power(machine) ? `Puissance ${power(machine)}` : null,
    formatMassRange(machine.weight_min, machine.weight_max) ??
      formatMass(machine.operating_mass_kg),
    machine.bucket_val ? `Godet ${machine.bucket_val} m3` : null,
    machine.depth_val ? `Profondeur ${formatLengthMmOrMeters(machine.depth_val)}` : null,
    machine.working_width_mm ? `Largeur ${formatLengthMmOrMeters(machine.working_width_mm)}` : null,
    machine.breakout_force_kN ? `Force ${machine.breakout_force_kN} kN` : null,
  ];

  return highlights.filter(Boolean).slice(0, 5) as string[];
}

export function getMachineSummary(machine: Machine) {
  const name = machineName(machine);
  const details = getMachineHighlights(machine);

  if (details.length === 0) {
    return `${name} est présenté comme une base de consultation pour qualifier un besoin chantier, confirmer les options disponibles et préparer une demande de devis détaillée.`;
  }

  return `${name} est une solution ${machine.category.toLowerCase()} avec ${details
    .slice(0, 3)
    .join(", ")}. La fiche sert à comparer rapidement les capacités clés avant une validation technique et commerciale.`;
}

export function getMachineUseCases(machine: Machine) {
  const name = machineName(machine).toLowerCase();

  if (name.includes("pelle")) {
    return [
      "Terrassement, fouille, chargement de matériaux et travaux de carrière.",
      "Chantiers nécessitant portée, profondeur et cycles de production réguliers.",
    ];
  }

  if (name.includes("chargeur")) {
    return [
      "Chargement, manutention de vrac, alimentation de centrales et opérations polyvalentes.",
      "Sites où la capacité de godet, la hauteur de déversement et la mobilité comptent.",
    ];
  }

  if (name.includes("compacteur") || name.includes("rouleau")) {
    return [
      "Compactage de plateformes, voiries, remblais et couches de forme.",
      "Contrôle de densité avec largeur de travail, fréquence et force centrifuge adaptées.",
    ];
  }

  if (name.includes("béton") || name.includes("beton") || name.includes("pompe")) {
    return [
      "Production, transport ou mise en place du béton sur chantiers structurés.",
      "Organisation de cycles béton avec débit, portée et disponibilité des pièces critiques.",
    ];
  }

  if (name.includes("finisseur") || name.includes("grader") || name.includes("niveleuse")) {
    return [
      "Préparation, nivellement et finition des infrastructures routières.",
      "Travaux où précision, largeur utile et vitesse opérationnelle sont prioritaires.",
    ];
  }

  if (name.includes("génératrice") || name.includes("generatrice")) {
    return [
      "Alimentation électrique temporaire pour chantier, base vie ou atelier mobile.",
      "Sécurisation des opérations lorsque la continuité énergétique est critique.",
    ];
  }

  return [
    "Qualification d'un besoin chantier avec lecture rapide des capacités disponibles.",
    "Comparaison technique avant devis, sourcing ou préparation logistique.",
  ];
}
