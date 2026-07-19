import PageHero from "@/components/PageHero";
import TCOCalculator from "@/components/TCOCalculator";
import { Hammer, Ruler, Lightbulb } from "lucide-react";

export default function ToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Outils & Aide à la décision"
        title="Maîtrisez votre"
        highlight="investissement"
        description="Parce que l'achat d'un équipement lourd est une décision stratégique, nous mettons à votre disposition des outils pour calculer la rentabilité de votre parc."
        primaryHref="/machines"
        primaryLabel="Voir le catalogue"
        secondaryHref="/sav"
        secondaryLabel="Expertise technique"
        backgroundImage="/visuals/excavator-worksite.jpg"
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-16 lg:grid-cols-[400px_1fr]">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">Rentabilité</p>
              <h2 className="mb-8 text-5xl leading-tight">Pourquoi calculer le <span className="text-primary">TCO</span> ?</h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-primary">
                    <Hammer className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Au-delà du prix d&apos;achat</h4>
                    <p className="text-sm text-foreground/60 leading-relaxed">Le prix d&apos;acquisition ne représente que 30 à 40% du coût réel d&apos;une machine sur sa durée de vie.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-primary">
                    <Ruler className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Optimisation opérationnelle</h4>
                    <p className="text-sm text-foreground/60 leading-relaxed">Comprendre votre coût par heure vous permet d&apos;ajuster vos tarifs de location ou de prestation.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-primary">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Choix stratégique</h4>
                    <p className="text-sm text-foreground/60 leading-relaxed">Comparez différents modèles pour identifier celui qui offre le meilleur retour sur investissement.</p>
                  </div>
                </div>
              </div>
            </div>

            <TCOCalculator />
          </div>
        </div>
      </section>
    </>
  );
}
