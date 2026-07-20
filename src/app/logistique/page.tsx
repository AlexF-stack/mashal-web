import { siteVisuals } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/page-metadata";
import LogisticsPageContent from "@/components/LogisticsPageContent";

export const metadata = buildPageMetadata({
  title: "Logistique export d'engins",
  description:
    "Préparation technique, documentation douanière, transport et réception sécurisée.",
  path: "/logistique",
  image: siteVisuals.logistics,
});

export default function LogisticsPage() {
  return <LogisticsPageContent />;
}
