import { siteVisuals } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/page-metadata";
import AboutPageContent from "@/components/AboutPageContent";

export const metadata = buildPageMetadata({
  title: "À propos de Mashal Equipment",
  description:
    "Découvrez Mashal Equipment, partenaire pour équipements lourds, pièces, maintenance et logistique export.",
  path: "/a-propos",
  image: siteVisuals.founders,
});

export default function AboutPage() {
  return <AboutPageContent />;
}
