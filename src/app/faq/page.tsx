"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import PageHero from "@/components/PageHero";
import { useI18n } from "@/lib/i18n-context";
import { siteVisuals } from "@/lib/site-content";

const faqs = {
  fr: [
    {
      q: "Quels types de machines proposez-vous ?",
      a: "Pelles, chargeuses, bulldozers, compacteurs, niveleuses et matériel de manutention — avec moteurs Cummins, Perkins ou Shangchai selon les gammes.",
    },
    {
      q: "Faites-vous de l'export international ?",
      a: "Oui. Nous gérons préparation technique, documentation douanière, transport et coordination jusqu'à la réception.",
    },
    {
      q: "Quel délai pour les pièces détachées ?",
      a: "Stock : expédition rapide. Sur commande : selon origine. Les urgences techniques sont prioritaires.",
    },
    {
      q: "Proposez-vous des contrats de maintenance ?",
      a: "Oui — entretien préventif, pièces d'usure et formation opérateurs pour réduire les arrêts.",
    },
  ],
  en: [
    {
      q: "What machines do you offer?",
      a: "Excavators, loaders, bulldozers, compactors, graders and handling equipment — with Cummins, Perkins or Shangchai engines depending on the range.",
    },
    {
      q: "Do you handle international export?",
      a: "Yes. We manage technical prep, customs documents, transport and coordination through reception.",
    },
    {
      q: "What is the spare-parts lead time?",
      a: "In stock: fast dispatch. On order: depends on origin. Technical emergencies are prioritized.",
    },
    {
      q: "Do you offer maintenance contracts?",
      a: "Yes — preventive service, wear parts and operator training to reduce downtime.",
    },
  ],
};

export default function FAQPage() {
  const { t, language } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const p = t.pages.faq;
  const list = faqs[language] ?? faqs.fr;

  return (
    <>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        highlight={p.highlight}
        description={p.description}
        primaryHref="/sav?type=devis"
        primaryLabel={p.primary}
        secondaryHref="/pieces"
        secondaryLabel={p.secondary}
        backgroundImage={siteVisuals.sav}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-6">
          <div className="space-y-3">
            {list.map((faq, index) => {
              const open = openIndex === index;
              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-card"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-semibold">{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-primary transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-[color:var(--border)] px-5 py-4 text-sm leading-relaxed text-foreground/70">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
