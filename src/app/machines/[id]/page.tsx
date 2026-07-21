import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowDownToLine, Container, Cog, Gauge, Weight } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import ProductPageButtons from "@/components/ProductPageButtons";
import MachineHeroImage from "@/components/MachineHeroImage";
import { getMachineImage, getMachineImageFallback } from "@/lib/machine-images";
import { getMachineHighlights, getMachineSummary } from "@/lib/machine-copy";
import { formatLengthMmOrMeters, formatMass, formatMassRange } from "@/lib/machine-format";
import machinesData from "@/data/machines-catalogue";
import { Machine } from "@/types/machine";
import { Suspense } from "react";
import MachineDetailsTabs from "@/components/MachineDetailsTabs";
import { siteVisuals } from "@/lib/site-content";

const machines = machinesData as Machine[];

interface MachinePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return machines.map((machine: Machine) => ({
    id: machine.id,
  }));
}

export async function generateMetadata({ params }: MachinePageProps): Promise<Metadata> {
  const { id } = await params;
  const machine = machines.find((m: Machine) => m.id === id);

  if (!machine) {
    return {
      title: "Machine non trouvée",
    };
  }

  return {
    title: `${machine.designation.fr} | Mashal Equipment`,
    description:
      machine.description?.fr ??
      `Fiche technique ${machine.designation.fr} — ${machine.category}.`,
  };
}

export default async function MachinePage({ params }: MachinePageProps) {
  const { id } = await params;
  const machine = machines.find((m: Machine) => m.id === id);

  if (!machine) {
    notFound();
  }

  const highlights = getMachineHighlights(machine);
  const imageUrl = getMachineImage(machine);
  const fallbackUrl = getMachineImageFallback(machine);

  const powerKw =
    machine.net_power_kw ?? machine.rated_power_kw ?? machine.gross_power_kw ?? null;
  const powerHp = machine.net_power_hp ?? machine.rated_power_hp ?? null;
  const mass =
    formatMass(machine.operating_mass_kg) ??
    formatMassRange(machine.weight_min, machine.weight_max) ??
    formatMass(machine.weight_min);

  const specsOverview = [
    powerKw
      ? {
          icon: Cog,
          label: "Puissance",
          value: powerHp ? `${powerKw} kW / ${powerHp} hp` : `${powerKw} kW`,
        }
      : null,
    machine.engine_brand_model
      ? { icon: Cog, label: "Moteur", value: machine.engine_brand_model }
      : null,
    mass ? { icon: Weight, label: "Poids opérationnel", value: mass } : null,
    machine.max_speed_kmh
      ? { icon: Gauge, label: "Vitesse max", value: `${machine.max_speed_kmh} km/h` }
      : null,
    machine.bucket_val
      ? { icon: Container, label: "Capacité godet", value: `${machine.bucket_val} m³` }
      : null,
    machine.depth_val
      ? {
          icon: ArrowDownToLine,
          label: "Profondeur max",
          value: formatLengthMmOrMeters(machine.depth_val) ?? `${machine.depth_val} mm`,
        }
      : null,
    machine.breakout_force_kN
      ? {
          icon: Gauge,
          label: "Force d'arrachement",
          value: `${machine.breakout_force_kN} kN`,
        }
      : null,
  ].filter(Boolean) as { icon: typeof Cog; label: string; value: string }[];

  const specsContent = (
    <div className="space-y-12">
      <div>
        <h3 className="text-2xl mb-6">Description</h3>
        <p className="leading-relaxed text-foreground/75">
          {getMachineSummary(machine)}
        </p>
        {machine.extra_info && (
          <p className="mt-5 rounded-2xl border border-white/8 bg-white/45 p-5 text-sm leading-relaxed text-foreground/68 dark:bg-white/6">
            Données complémentaires: {machine.extra_info}
          </p>
        )}
      </div>

      <div>
        <h3 className="text-2xl mb-6">Spécifications techniques</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {machine.engine_brand_model && (
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Moteur</p>
              <p className="text-lg">{machine.engine_brand_model}</p>
            </div>
          )}
          {machine.displacement_l && (
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Cylindrée</p>
              <p className="text-lg">{machine.displacement_l} L</p>
            </div>
          )}
          {machine.cylinders && (
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Cylindres</p>
              <p className="text-lg">{machine.cylinders}</p>
            </div>
          )}
          {machine.rated_speed_rpm && (
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Régime nominal</p>
              <p className="text-lg">{machine.rated_speed_rpm} tr/min</p>
            </div>
          )}
          {machine.max_torque_nm && (
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Couple max</p>
              <p className="text-lg">{machine.max_torque_nm} Nm</p>
            </div>
          )}
          {machine.fuel_type && (
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Carburant</p>
              <p className="text-lg">{machine.fuel_type}</p>
            </div>
          )}
          {machine.weight_min && machine.weight_max && (
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Poids</p>
              <p className="text-lg">{formatMassRange(machine.weight_min, machine.weight_max)}</p>
            </div>
          )}
          {machine.depth_val && (
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Profondeur max</p>
              <p className="text-lg">{machine.depth_val} mm</p>
            </div>
          )}
          {machine.blade_width_mm && (
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Largeur lame</p>
              <p className="text-lg">{formatLengthMmOrMeters(machine.blade_width_mm)}</p>
            </div>
          )}
          {machine.draw_bar_pull_kN && (
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Effort de traction</p>
              <p className="text-lg">{machine.draw_bar_pull_kN} kN</p>
            </div>
          )}
          {machine.breakout_force_kN && (
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Force d&apos;arrachement</p>
              <p className="text-lg">{machine.breakout_force_kN} kN</p>
            </div>
          )}
          {machine.dump_clearance_mm && (
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Hauteur de déversement</p>
              <p className="text-lg">{machine.dump_clearance_mm} mm</p>
            </div>
          )}
          {machine.amplitude_range && (
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Amplitude</p>
              <p className="text-lg">{machine.amplitude_range}</p>
            </div>
          )}
          {machine.vibration_frequency_hz && (
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Fréquence vibration</p>
              <p className="text-lg">{machine.vibration_frequency_hz} Hz</p>
            </div>
          )}
          {machine.centrifugal_force_kN && (
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Force centrifuge</p>
              <p className="text-lg">{machine.centrifugal_force_kN} kN</p>
            </div>
          )}
          {machine.working_width_mm && (
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Largeur de travail</p>
              <p className="text-lg">{machine.working_width_mm} mm</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <PageHero
        eyebrow={machine.category}
        title={machine.designation.fr}
        description={`Fiche technique et spécifications de ${machine.designation.fr}.`}
        primaryHref={`/sav?type=devis&ref=${encodeURIComponent(machine.id)}`}
        primaryLabel="Demande de devis"
        secondaryHref="/machines"
        secondaryLabel="Voir toutes les machines"
        backgroundImage={imageUrl || siteVisuals.worksite}
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <Link
              href="/machines"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-primary hover:text-primary/80"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au catalogue
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            <div className="space-y-12">
              <MachineHeroImage
                src={imageUrl}
                fallbackSrc={fallbackUrl}
                alt={`${machine.designation.fr} — Mashal Equipment`}
              />

              <MachineDetailsTabs 
                specs={specsContent} 
                machine={machine} 
                imageUrl={imageUrl} 
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Specs overview */}
              <div className="rounded-[2rem] border border-white/8 bg-card p-8 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-white/6">
                <h3 className="mb-6 text-2xl">Caractéristiques principales</h3>
                {highlights.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {highlights.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
                {specsOverview.length > 0 ? (
                  <div className="space-y-4">
                    {specsOverview.map((spec) => {
                      const Icon = spec.icon;
                      return (
                        <div key={spec.label} className="flex items-center gap-4">
                          <Icon className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                              {spec.label}
                            </p>
                            <p className="text-lg">{spec.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed text-foreground/60">
                    Spécifications détaillées disponibles sur devis — indiquez le modèle à notre
                    équipe technique.
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="rounded-[2rem] border border-white/8 bg-card p-8 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-white/6">
                <ProductPageButtons 
                  machineId={machine.id} 
                  machineName={machine.designation.fr} 
                  category={machine.category} 
                />
              </div>

              {/* Contact form */}
              <div className="rounded-[2rem] border border-white/8 bg-card p-8 text-foreground shadow-[0_22px_60px_rgba(15,23,42,0.12)] dark:bg-white/8">
                <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-white/5" />}>
                  <ContactForm
                    heading="Besoin d'aide ?"
                    description={`Notre équipe technique est à votre disposition pour vous conseiller sur ${machine.designation.fr}.`}
                    submitLabel="Envoyer ma demande"
                    hiddenContext={`Machine: ${machine.designation.fr}`}
                    defaultType="devis"
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
