const ASSET_BASE = process.env.NEXT_PUBLIC_ASSET_BASE || "";

/**
 * Returns the URL for a machine image (.webp under /images/machines/).
 */
export function getMachineImage(machineId: string): string {
  return `${ASSET_BASE}/images/machines/${machineId}.webp`;
}
