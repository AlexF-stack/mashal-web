// Dictionnaire français
export const fr = {
  // Navigation
  nav: {
    machines: "Machines",
    pieces: "Pièces",
    articles: "Articles",
    logistique: "Logistique",
    sav: "SAV",
    aPropos: "À Propos",
    contact: "Contact",
  },

  // Machines
  machines: {
    title: "Expertise Sérielle",
    subtitle: "Catalogue équipements lourds",
    searchPlaceholder: "Rechercher une machine...",
    filterByCategory: "Filtrer par catégorie",
    allCategories: "Toutes les catégories",
    noResults: "Aucune machine trouvée",
    specs: {
      power: "Puissance",
      weight: "Poids",
      engine: "Moteur",
      bucket: "Godet",
    },
  },

  // Services
  services: {
    parts: "Pièces détachées",
    logistics: "Logistique & Export",
    afterSales: "Service après-vente",
    training: "Formation",
  },

  // Contact
  contact: {
    heading: "Contactez-nous",
    description: "Remplissez le formulaire pour nous envoyer votre demande",
    submit: "Envoyer",
    success: "Message envoyé avec succès",
    error: "Erreur lors de l'envoi",
  },

  // Common
  common: {
    readMore: "En savoir plus",
    learnMore: "Découvrir",
    backToHome: "Retour à l'accueil",
    loading: "Chargement...",
    error: "Une erreur est survenue",
  },
};

// Dictionnaire anglais
export const en = {
  // Navigation
  nav: {
    machines: "Machines",
    pieces: "Parts",
    articles: "Articles",
    logistique: "Logistics",
    sav: "Support",
    aPropos: "About",
    contact: "Contact",
  },

  // Machines
  machines: {
    title: "Serial Expertise",
    subtitle: "Heavy equipment catalog",
    searchPlaceholder: "Search for a machine...",
    filterByCategory: "Filter by category",
    allCategories: "All categories",
    noResults: "No machines found",
    specs: {
      power: "Power",
      weight: "Weight",
      engine: "Engine",
      bucket: "Bucket",
    },
  },

  // Services
  services: {
    parts: "Spare parts",
    logistics: "Logistics & Export",
    afterSales: "After-sales service",
    training: "Training",
  },

  // Contact
  contact: {
    heading: "Get in touch",
    description: "Fill out the form to send us your request",
    submit: "Send",
    success: "Message sent successfully",
    error: "Error sending message",
  },

  // Common
  common: {
    readMore: "Read more",
    learnMore: "Discover",
    backToHome: "Back to home",
    loading: "Loading...",
    error: "An error occurred",
  },
};

export type Translation = typeof fr;

export const translations = {
  fr,
  en,
} as const;

export type Language = keyof typeof translations;

export const defaultLanguage: Language = "fr";
export const supportedLanguages: Language[] = ["fr", "en"];

export function getTranslation(
  lang: Language | string = defaultLanguage
): Translation {
  return translations[(lang as Language) || defaultLanguage] || translations.fr;
}
