"use client";

import { motion } from "framer-motion";
import { 
  ClipboardCheck, 
  Ship, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  CheckCircle2,
  Clock
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "prep",
    title: "Préparation & Inspection",
    description: "Contrôle technique rigoureux, nettoyage et rapport photo complet avant mise en colisage.",
    icon: ClipboardCheck,
    duration: "2-3 jours",
  },
  {
    id: "docs",
    title: "Formalités Export",
    description: "Établissement de la facture, packing list, certificats d'origine et documents douaniers.",
    icon: ShieldCheck,
    duration: "1-2 jours",
  },
  {
    id: "port",
    title: "Transport Portuaire",
    description: "Acheminement de l'équipement vers le port de départ (Ro-Ro ou Conteneur).",
    icon: Truck,
    duration: "1 jour",
  },
  {
    id: "sea",
    title: "Transit Maritime",
    description: "Expédition sécurisée via nos partenaires maritimes internationaux vers votre hub.",
    icon: Ship,
    duration: "15-25 jours",
  },
  {
    id: "arrival",
    title: "Livraison Finale",
    description: "Dédouanement à l'arrivée et remise des clés à votre équipe sur site.",
    icon: MapPin,
    duration: "Variable",
  },
];

export default function LogisticsTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="py-12">
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-8 top-0 h-full w-0.5 bg-white/10 md:left-0 md:right-0 md:top-8 md:h-0.5 md:w-full">
          <motion.div 
            className="absolute top-0 left-0 bg-primary h-full md:h-full md:w-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: (activeStep + 1) / STEPS.length }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ originX: 0 }}
          />
        </div>

        {/* Steps */}
        <div className="relative grid gap-12 md:grid-cols-5 md:gap-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= activeStep;
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-row items-start gap-6 md:flex-col md:items-center md:text-center"
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Icon Circle */}
                <div 
                  className={cn(
                    "relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 transition-all duration-500",
                    isActive 
                      ? "border-primary bg-primary text-background shadow-[0_0_20px_rgba(212,175,55,0.4)]" 
                      : "border-white/10 bg-background text-foreground/40 group-hover:border-primary/50 group-hover:text-primary"
                  )}
                >
                  <Icon className="h-7 w-7" />
                  {isActive && (
                    <motion.div
                      layoutId="active-glow"
                      className="absolute -inset-2 rounded-3xl bg-primary/20 blur-xl"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="md:pt-4">
                  <div className="mb-2 flex items-center gap-2 md:justify-center">
                    <h4 className={cn(
                      "text-lg font-bold transition-colors",
                      isActive ? "text-foreground" : "text-foreground/40"
                    )}>
                      {step.title}
                    </h4>
                    {isActive && <CheckCircle2 className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="mb-3 text-sm leading-relaxed text-foreground/60 md:px-4">
                    {step.description}
                  </p>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                    <Clock className="h-3 w-3" />
                    {step.duration}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Tracker Mockup */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="mt-20 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
      >
        <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl mb-1">Simulateur de suivi</h3>
            <p className="text-sm text-foreground/40 font-bold uppercase tracking-widest">Ordre de transport #ME-8892-BJ</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs font-bold text-green-500 bg-green-500/10 px-4 py-2 rounded-full">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              En cours de transit maritime
            </span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Origine</p>
            <p className="text-lg font-bold">Anvers, Belgique</p>
            <p className="text-sm text-foreground/40">Départ le 12/05/2026</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Destination</p>
            <p className="text-lg font-bold">Cotonou, Bénin</p>
            <p className="text-sm text-foreground/40">Arrivée estimée : 04/06/2026</p>
          </div>
          <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Statut Actuel</p>
            <p className="text-lg font-bold">Golfe de Guinée</p>
            <p className="text-sm text-foreground/40">Navire: MSC GEMMA</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
