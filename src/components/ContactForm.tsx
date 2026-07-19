"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";

interface ContactFormProps {
  heading: string;
  description: string;
  submitLabel: string;
  hiddenContext?: string;
  defaultType?: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  type?: string;
  urgency?: string;
  message?: string;
}

const inputBase =
  "w-full rounded-2xl border px-4 py-3.5 text-foreground placeholder:text-foreground/40 transition-colors focus:outline-none disabled:opacity-50";

function buildInitialState(defaultType: string, ref: string, type: string) {
  return {
    name: "",
    email: "",
    phone: "",
    company: "",
    reference: ref,
    type: type || defaultType,
    urgency: "",
    message: ref ? `Demande concernant la référence ${ref}.` : "",
    website: "",
  };
}

export default function ContactForm({
  heading,
  description,
  submitLabel,
  hiddenContext,
  defaultType = "",
}: ContactFormProps) {
  const searchParams = useSearchParams();
  const refParam = searchParams.get("ref") ?? "";
  const typeParam = searchParams.get("type") ?? "";

  const [formData, setFormData] = useState(() =>
    buildInitialState(defaultType, refParam, typeParam),
  );

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Le téléphone est requis";
    } else if (!/^[0-9\s\-\+\(\)]{8,}$/.test(formData.phone)) {
      newErrors.phone = "Format de téléphone invalide";
    }
    if (!formData.type) newErrors.type = "Veuillez sélectionner un type d'intervention";
    if (!formData.urgency) newErrors.urgency = "Veuillez sélectionner l'urgence";
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const fieldClass = (hasError?: string) =>
    `${inputBase} ${
      hasError
        ? "border-red-500/50 bg-red-500/5 focus:border-red-500"
        : "border-white/10 bg-white/5 focus:border-primary/50"
    }`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          context: hiddenContext,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData(buildInitialState(defaultType, "", defaultType));
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">
        Demande
      </p>
      <h3 className="mb-4 text-4xl">{heading}</h3>
      <p className="mb-6 text-sm leading-relaxed text-foreground/60">{description}</p>

      {submitStatus === "success" && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 p-4">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <div>
            <p className="font-semibold text-green-500">Demande envoyée</p>
            <p className="text-sm text-green-500/80">Nous vous recontactons rapidement.</p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <div>
            <p className="font-semibold text-red-500">Erreur</p>
            <p className="text-sm text-red-500/80">
              Une erreur est survenue. Veuillez réessayer.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={fieldClass(errors.name)}
            placeholder="Nom complet"
            disabled={isLoading}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={fieldClass(errors.email)}
              placeholder="Email professionnel"
              disabled={isLoading}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={fieldClass(errors.phone)}
              placeholder="Téléphone"
              disabled={isLoading}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={fieldClass()}
            placeholder="Entreprise (optionnel)"
            disabled={isLoading}
          />
          <input
            type="text"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            className={fieldClass()}
            placeholder="Référence machine / pièce"
            disabled={isLoading}
          />
        </div>

        <div>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={fieldClass(errors.type)}
            disabled={isLoading}
          >
            <option value="">Type d&apos;intervention</option>
            <option value="maintenance">Maintenance planifiée</option>
            <option value="urgence">Urgence technique</option>
            <option value="pieces">Demande de pièces</option>
            <option value="formation">Formation opérateurs</option>
            <option value="devis">Demande de devis</option>
            <option value="export">Enquête export</option>
            <option value="autre">Autre</option>
          </select>
          {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
        </div>

        <div>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className={fieldClass(errors.urgency)}
            disabled={isLoading}
          >
            <option value="">Niveau d&apos;urgence</option>
            <option value="low">Normal (réponse sous 24h)</option>
            <option value="medium">Urgent (réponse sous 4h)</option>
            <option value="high">Critique (réponse immédiate)</option>
          </select>
          {errors.urgency && <p className="mt-1 text-sm text-red-500">{errors.urgency}</p>}
        </div>

        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={fieldClass(errors.message)}
            rows={5}
            placeholder="Décrivez votre besoin, le contexte chantier et le niveau d'urgence."
            disabled={isLoading}
          />
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
        </div>

        {hiddenContext && <input type="hidden" name="context" value={hiddenContext} />}

        {/* Honeypot anti-spam — leave empty */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="btn-premium btn-gold w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading && <Loader className="h-4 w-4 animate-spin" />}
          {isLoading ? "Envoi..." : submitLabel}
        </button>
      </form>
    </>
  );
}
