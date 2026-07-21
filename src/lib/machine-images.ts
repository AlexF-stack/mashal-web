import type { Machine } from "@/types/machine";

const ASSET_BASE = process.env.NEXT_PUBLIC_ASSET_BASE || "";

const categoryFallback: Record<string, string> = {
  "Bâtiment & Construction": "pelle-hydraulique-20t",
  "Construction Routière": "niveleuse-160hp",
  "Mines & Carrières": "pelle-miniere-33t",
  "Industrie & Entreposage": "chariot-elevateur-5t",
  "Agriculture & Sylviculture": "tracteur-agricole-150hp",
  "Gestion des Déchets": "compacteur-decharge",
  Services: "groupe-electrogene-100kva",
};

/**
 * Returns the URL for a machine image (.webp under /images/machines/).
 * Uses image_id override, then machine id, then category fallback.
 */
export function getMachineImage(machine: Pick<Machine, "id" | "image_id" | "category">): string {
  const slug = machine.image_id || machine.id;
  return `${ASSET_BASE}/images/machines/${slug}.webp`;
}

export function getMachineImageFallback(
  machine: Pick<Machine, "id" | "image_id" | "category">,
): string {
  const slug =
    machine.image_id ||
    categoryFallback[machine.category] ||
    "pelle-hydraulique-20t";
  return `${ASSET_BASE}/images/machines/${slug}.webp`;
}
