import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Container,
  Drill,
  Factory,
  HardHat,
  Leaf,
  Mountain,
  Recycle,
  Route,
  Truck,
  Warehouse,
} from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  "Bâtiment & Construction": HardHat,
  "Construction Routière": Route,
  "Mines & Carrières": Mountain,
  "Industrie & Entreposage": Warehouse,
  "Agriculture & Sylviculture": Leaf,
  "Gestion des Déchets": Recycle,
  Services: Factory,
};

export const serviceIcons = {
  training: Building2,
  consulting: Drill,
  sav: HardHat,
  parts: Container,
  sites: Mountain,
  machines: Truck,
} as const satisfies Record<string, LucideIcon>;

export function getCategoryIcon(category: string): LucideIcon {
  return categoryIcons[category] ?? Truck;
}
