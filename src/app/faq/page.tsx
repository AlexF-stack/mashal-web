"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import PageHero from "@/components/PageHero";

const faqs = [
  {
    question: "Quels types de machines proposez-vous ?",
    answer: "Nous proposons une gamme complète d'équipements industriels : pelles mécaniques, chargeuses, bulldozers, compacteurs, grues et matériel de manutention. Toutes nos machines sont équipées de moteurs Cummins, Perkins ou Shangchai."
  },
  {
    question: "Faites-vous de l'export international ?",
    answer: "Oui, nous exportons vers toute l'Afrique et le Moyen-Orient. Nous gérons l'intégralité de la chaîne logistique : préparation technique, documentation douanière, transport maritime/ro-routier et installation sur site."
  },
  {
    question: "Quel est le délai de livraison pour les pièces détachées ?",
    answer: "Les pièces en stock sont expédiées sous 24h. Pour les pièces sur commande, le délai varie de 7 à 21 jours selon l'origine. Nous priorisons les urgences techniques avec livraison express."
  },
  {
    question: "Proposez-vous des contrats de maintenance ?",
    answer: "Oui, nous proposons des contrats d'entretien préventif personnalisés incluant visites régulières, remplacement pièces d'usure et formation opérateurs. Cela réduit les pannes de 40% en moyenne."
  },
  {
    question: "Quelle est votre zone de couverture SAV ?",
    answer: "Notre service après-vente couvre le Maroc, l'Algérie, la Tunisie et toute l'Afrique de l'Ouest. Nos techniciens interviennent sur site avec pièces et outils. Pour les interventions d'urgence, réponse sous 4h."
  },
  {
    question: "Acceptez-vous les paiements à l'export ?",
    answer: "Oui, nous travaillons avec les lettres de crédit, virements bancaires et assurances-crédit. Pour les clients réguliers, nous proposons des facilités de paiement et garanties bancaires."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Questions"
        highlight="fréquentes"
        description="Trouvez rapidement les réponses à vos questions sur nos services, équipements et processus."
        primaryHref="/contact"
        primaryLabel="Nous contacter"
        secondaryHref="/pieces"
        secondaryLabel="Catalogue pièces"
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-white/5 bg-white/2"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">
                        {faq.question}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5 text-foreground/60" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="text-foreground/70 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center"
            >
              <h3 className="mb-4 text-2xl font-bold text-foreground">
                Vous n&apos;avez pas trouvé votre réponse ?
              </h3>
              <p className="mb-6 text-foreground/70">
                Notre équipe est là pour vous aider. Contactez-nous pour toute question spécifique.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                Nous contacter
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
