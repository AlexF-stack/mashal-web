"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, CheckCircle, FileCheck } from "lucide-react";

const certifications = [
  { icon: ShieldCheck, label: "ISO 9001:2015", description: "Qualité certifiée" },
  { icon: Award, label: "Conformité EPA", description: "Normes environnementales" },
  { icon: CheckCircle, label: "Normes CE", description: "Sécurité européenne" },
  { icon: FileCheck, label: "Expertise Mining", description: "Solutions spécialisées" },
];

export default function Certifications() {
  return (
    <section className="relative z-20 -mt-12 mb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:animate-bounce">
                <cert.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  {cert.label}
                </p>
                <p className="text-[10px] text-foreground/40 uppercase">
                  {cert.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
