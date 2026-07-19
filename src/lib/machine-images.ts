const ASSET_BASE = process.env.NEXT_PUBLIC_ASSET_BASE || "";

// Mappings for overrides where the machine ID doesn't exactly match the filename in /images/machines/[id].webp
// Also maps machines to a real photo of the same family (photo d'illustration)
// while awaiting a dedicated shot.
const MACHINE_IMAGE_OVERRIDES: Record<string, string> = {
  "balayeuse-aspiratrice": "balayeuse-voirie",
  "bulldozer-d8": "bulldozer-d6",
  "groupe-electrogene-500kva": "groupe-electrogene-100kva",
  "pelle-lourde-45t": "pelle-hydraulique-20t",
  "pelle-miniere-33t": "pelle-hydraulique-20t",
  "pelle-extraction-60t": "pelle-hydraulique-20t",
  "broyeur-dechets-lourd": "dechiqueteur-bois",
};

/**
 * Returns the URL for a machine image.
 * - All machine images in the repository are optimized .webp files under /images/machines/.
 * - Mapped dynamically by machine ID, with a few overrides for custom naming.
 */
export function getMachineImage(machineId: string): string {
  const imageName = MACHINE_IMAGE_OVERRIDES[machineId] || machineId;
  return `${ASSET_BASE}/images/machines/${imageName}.webp`;
}

