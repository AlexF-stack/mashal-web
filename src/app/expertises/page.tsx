import { siteVisuals } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/page-metadata";
import ExpertisesPageContent from "@/components/ExpertisesPageContent";

export const metadata = buildPageMetadata({
  title: "Nos expertises — formation, SAV, pièces & chantiers",
  description:
    "Formation opérateurs, consultation technique, service après-vente, pièces de rechange et gestion de chantiers BTP, miniers et hydrauliques.",
  path: "/expertises",
  image: siteVisuals.worksite,
});

export default function ExpertisesPage() {
  return <ExpertisesPageContent />;
}
