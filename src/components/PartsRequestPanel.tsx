"use client";

import Link from "next/link";
import { Camera, FileText, PackageSearch } from "lucide-react";
import { IconBadge } from "@/components/ui/IconBadge";

/**
 * Pas de stock inventé : on invite le client à envoyer une demande réelle.
 */
export default function PartsRequestPanel() {
  return (
    <div className="rounded-[2.5rem] border border-[color:var(--border)] bg-card p-8 md:p-10">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
        Pièces de rechange
      </p>
      <h2 className="mb-4 text-3xl md:text-4xl">Demandez la bonne référence</h2>
      <p className="mb-8 max-w-2xl leading-relaxed text-foreground/65">
        Nous ne publions pas de stock fictif en ligne. Chaque demande est vérifiée
        (compatibilité, disponibilité, délai) avant confirmation — à partir de votre
        machine, référence constructeur ou photos.
      </p>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: FileText,
            title: "Référence ou n° machine",
            text: "Modèle, heures, n° moteur ou code pièce d'origine.",
          },
          {
            icon: Camera,
            title: "Photos utiles",
            text: "Pièce usée, plaque signalétique, environnement montage.",
          },
          {
            icon: PackageSearch,
            title: "Urgence & lieu",
            text: "Délai souhaité, chantier ou atelier, mode de livraison.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-[color:var(--border)] bg-background p-5"
          >
            <IconBadge icon={item.icon} variant="gold" className="mb-3" />
            <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-primary">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-foreground/65">{item.text}</p>
          </div>
        ))}
      </div>

      <Link href="/sav?type=pieces" className="btn-premium btn-gold inline-flex">
        Demander une pièce
      </Link>
    </div>
  );
}
