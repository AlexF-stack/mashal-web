import { siteVisuals } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/page-metadata";
import HomeContent from "@/components/HomeContent";

export const metadata = buildPageMetadata({
  title: "Équipements lourds & support cycle de vie",
  description:
    "Mashal Equipment fournit des engins, pièces détachées, maintenance et logistique export pour sécuriser vos chantiers et votre parc machine.",
  path: "/",
  image: siteVisuals.mining,
});

export default function Home() {
  return <HomeContent />;
}
