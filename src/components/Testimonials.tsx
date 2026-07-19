"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Bennani",
    role: "Directeur Exploitation, Mine d'Ouarzazate",
    content: "Mashal Equipment nous a fourni des pelles mécaniques fiables avec un SAV réactif. Leur expertise en pièces détachées a réduit nos temps d'arrêt de 30%.",
    rating: 5,
    company: "Société Minière du Maroc"
  },
  {
    name: "Fatima Alaoui",
    role: "Responsable Achats, Chantier Dakar",
    content: "Le service logistique est impeccable. Export propre, documentation complète et suivi en temps réel. Un partenaire de confiance pour nos projets africains.",
    rating: 5,
    company: "Construction Sénégal"
  },
  {
    name: "Mohamed Tazi",
    role: "Chef de Parc, Carrière Rabat",
    content: "Les pièces Cummins et Perkins sont toujours en stock. Leur équipe technique nous conseille parfaitement sur la maintenance préventive.",
    rating: 5,
    company: "Carrières Modernes"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-surface">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Témoignages clients
          </p>
          <h2 className="mb-6 text-5xl leading-none lg:text-7xl">
            Ils nous <span className="text-primary">font confiance</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-foreground/60">
            Découvrez ce que disent nos clients partenaires sur notre service et nos équipements.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/8 bg-white/55 p-6 dark:bg-white/3"
            >
              <Quote className="mb-4 h-8 w-8 text-primary/60" />
              <p className="mb-6 leading-relaxed text-foreground/80">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-foreground/60">{testimonial.role}</p>
                <p className="text-xs text-primary">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
