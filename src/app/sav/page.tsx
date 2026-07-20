import { siteVisuals } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/page-metadata";
import SavPageContent from "@/components/SavPageContent";

export const metadata = buildPageMetadata({
  title: "Service après-vente & maintenance",
  description:
    "Diagnostic, maintenance planifiée, formation opérateurs et suivi cycle de vie.",
  path: "/sav",
  image: siteVisuals.sav,
});

export default function SupportPage() {
  return <SavPageContent />;
}
