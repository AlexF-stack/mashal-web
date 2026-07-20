"use client";

import { motion } from "framer-motion";
import {
  ClipboardCheck,
  Ship,
  ShieldCheck,
  Truck,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n-context";

const STEP_META = [
  { id: "prep" as const, icon: ClipboardCheck, duration: { fr: "2-3 jours", en: "2-3 days" } },
  { id: "docs" as const, icon: ShieldCheck, duration: { fr: "1-2 jours", en: "1-2 days" } },
  { id: "transport" as const, icon: Truck, duration: { fr: "1 jour", en: "1 day" } },
  { id: "reception" as const, icon: MapPin, duration: { fr: "Variable", en: "Variable" } },
];

export default function LogisticsTimeline() {
  const { t, language } = useI18n();
  const [activeStep, setActiveStep] = useState(0);
  const lang = language === "en" ? "en" : "fr";

  // Map: prep, docs, transport (+ port/sea merged into transport visually), reception
  const steps = [
    { meta: STEP_META[0], copy: t.logisticsSteps.prep },
    { meta: STEP_META[1], copy: t.logisticsSteps.docs },
    {
      meta: { id: "sea", icon: Ship, duration: { fr: "15-25 jours", en: "15-25 days" } },
      copy: t.logisticsSteps.transport,
    },
    { meta: STEP_META[3], copy: t.logisticsSteps.reception },
  ];

  return (
    <div className="py-4">
      <div className="relative">
        <div className="absolute left-8 top-0 h-full w-0.5 bg-white/10 md:left-0 md:right-0 md:top-8 md:h-0.5 md:w-full" />

        <div className="relative grid gap-10 md:grid-cols-4 md:gap-4">
          {steps.map((step, index) => {
            const Icon = step.meta.icon;
            const isActive = index <= activeStep;

            return (
              <motion.div
                key={step.meta.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative pl-16 md:pl-0 md:pt-16"
                onMouseEnter={() => setActiveStep(index)}
              >
                <button
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border-2 transition-colors md:left-1/2 md:-translate-x-1/2",
                    isActive
                      ? "border-primary bg-primary text-background"
                      : "border-white/20 bg-[#0F172A] text-white/50",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </button>

                <div className="md:text-center">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                    {step.meta.duration[lang]}
                  </p>
                  <h3 className="mb-2 text-lg font-semibold">{step.copy.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{step.copy.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
