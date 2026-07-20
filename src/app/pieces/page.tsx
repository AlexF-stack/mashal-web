import { siteVisuals } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/page-metadata";
import PiecesPageContent from "@/components/PiecesPageContent";

export const metadata = buildPageMetadata({
  title: "Pièces détachées & consommables",
  description:
    "Pièces d'origine, stocks critiques et kits d'usure pour maintenir votre parc machine en exploitation.",
  path: "/pieces",
  image: siteVisuals.parts,
});

export default function PartsPage() {
  return <PiecesPageContent />;
}
