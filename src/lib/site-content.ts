export const founderProfile = {
  title: "Une vision portée par le couple fondateur",
  subtitle: "Mr Ithiel DOSSOU & Mykem DOSSOU",
  image: "/fondateurs-dossou.jpeg",
  imageAlt: "Le couple fondateur Mr Ithiel DOSSOU et Mykem DOSSOU",
  intro:
    "Mashal Equipment s'appuie sur une direction engagée, proche du terrain et attentive aux réalités des exploitants, des entrepreneurs et des acheteurs publics.",
  body: [
    "Leur ambition est de bâtir une entreprise fiable, capable de livrer des équipements robustes, un accompagnement durable et une relation de confiance sur tout le cycle de vie des machines.",
    "Cette approche combine disponibilité des pièces, assistance technique, formation, logistique internationale et suivi après livraison pour que chaque investissement reste productif dans le temps.",
  ],
  highlights: [
    "Vision long terme orientée fiabilité opérationnelle",
    "Culture du service et de la proximité client",
    "Pilotage de projets complexes en Afrique et à l'international",
  ],
};

export const articleHighlights = [
  {
    slug: "entretien-preventif-engins",
    title: "Pourquoi la maintenance préventive protège votre investissement",
    category: "SAV & Performance",
    excerpt:
      "Une machine bien suivie dure plus longtemps, consomme mieux et réduit les arrêts imprévus sur chantier.",
    image: "/visuals/sav-maintenance.jpg",
    quote:
      "La meilleure panne est celle qui n'arrive jamais: l'entretien préventif est un investissement prioritaire.",
    quoteAuthor: "Responsable SAV Mashal Equipment",
    body: [
      {
        title: "Risques d'une maintenance réactive",
        text:
          "Attendre une panne avant de réagir augmente les coûts, allonge les délais et fragilise la disponibilité du parc. La maintenance planifiée transforme les arrêts en interventions prévisibles.",
      },
      {
        title: "La valeur des inspections régulières",
        text:
          "Contrôler les composants critiques, vérifier les niveaux et analyser l'usure permet d'anticiper le remplacement des pièces et d'éviter les dégâts collatéraux sur les systèmes hydrauliques et moteurs.",
      },
      {
        title: "Un plan d'entretien qui rassure",
        text:
          "Proposer un calendrier d'entretien avec des interventions claires, des pièces de rechange et des rapports de conformité renforce la confiance des clients et améliore la performance opérationnelle.",
      },
    ],
  },
  {
    slug: "pieces-origine-disponibilite",
    title: "Pièces d'origine, stocks critiques et rapidité d'intervention",
    category: "Pièces détachées",
    excerpt:
      "Filtres, fluides, composants hydrauliques et kits d'usure doivent être pensés comme un système de disponibilité, pas comme des achats isolés.",
    image: "/visuals/parts-stock.jpg",
    quote:
      "Une pièce d'origine ne se remplace pas: elle se garantit dans l'architecture même de la machine.",
    quoteAuthor: "Chef de gamme pièces détachées",
    body: [
      {
        title: "Compatibilité et sécurité",
        text:
          "Une pièce d'origine est conçue pour fonctionner avec le système de la machine. C'est un levier de sécurité mécanique, de performance et de préservation des garanties constructeur.",
      },
      {
        title: "La gestion des stocks critiques",
        text:
          "Identifier les pièces à rotation rapide, les éléments d'usure et les kits de maintenance est essentiel pour réduire les délais d'immobilisation et simplifier les interventions sur chantier.",
      },
      {
        title: "Agilité d'intervention",
        text:
          "La disponibilité des pièces, associée à des références claires et un réseau logistique fiable, permet de livrer et de remplacer rapidement, même pour des engins exportés vers l'Afrique ou l'international.",
      },
    ],
  },
  {
    slug: "logistique-export-engins",
    title: "Export d'engins: les points qui sécurisent une livraison internationale",
    category: "Logistique",
    excerpt:
      "Conditionnement, documentation, incoterms, assurance et coordination portuaire font la différence entre une livraison fluide et une opération risquée.",
    image: "/visuals/logistics-port.jpg",
    quote:
      "La logistique n'est pas une ligne du devis, c'est la colonne vertébrale de l'export.",
    quoteAuthor: "Directeur logistique export",
    body: [
      {
        title: "Préparation et conformité",
        text:
          "Préparer un engin pour l'export, c'est documenter son état, sécuriser ses équipements et respecter les exigences douanières du pays de destination.",
      },
      {
        title: "Choisir le bon mode de transport",
        text:
          "La multimodalité, le transit maritime ou la route doivent être choisis selon la taille, le poids et le calendrier de la livraison pour minimiser les ruptures de charge.",
      },
      {
        title: "Accompagnement jusqu'à la réception",
        text:
          "Un suivi serré avec point de contact unique, des mises à jour régulières et des instructions de réception permet de sécuriser l'arrivée et la mise en service des engins.",
      },
    ],
  },
];

export const partsFamilies = [
  {
    key: "engine" as const,
    image: "/visuals/sav-maintenance.jpg",
  },
  {
    key: "hydraulic" as const,
    image: "/visuals/parts-stock.jpg",
  },
  {
    key: "undercarriage" as const,
    image: "/images/machines/pelle-miniere-33t.webp",
  },
];

export const stockParts = [
  {
    sku: "CUM-FLTR-8.3",
    name: "Filtre à huile haute performance",
    compatibility: "Pelle 33T / Moteur HM8.3",
    availability: "En stock" as const,
    family: "Moteur & filtration",
  },
  {
    sku: "PERK-INJ-1104",
    name: "Injecteur carburant Perkins",
    compatibility: "Tractopelle / Série 1104C",
    availability: "En stock" as const,
    family: "Moteur & filtration",
  },
  {
    sku: "LUB-HYD-ISO46",
    name: "Huile hydraulique ISO 46 - fût 200L",
    compatibility: "Gamme chantier",
    availability: "Sous 72h" as const,
    family: "Hydraulique & transmission",
  },
  {
    sku: "HYD-HOSE-1IN",
    name: "Flexible hydraulique 1\" haute pression",
    compatibility: "Pelles 20–45T",
    availability: "En stock" as const,
    family: "Hydraulique & transmission",
  },
  {
    sku: "KIT-WEAR-60T",
    name: "Kit d'usure godet et dents",
    compatibility: "Pelle 60T",
    availability: "Sur commande" as const,
    family: "Train roulant & usure",
  },
  {
    sku: "CHAIN-TRACK-33T",
    name: "Chaîne de train de roulement",
    compatibility: "Pelle chenilles 33T",
    availability: "Sous 72h" as const,
    family: "Train roulant & usure",
  },
  {
    sku: "AIR-FLTR-CAT",
    name: "Filtre à air primaire",
    compatibility: "Chargeuses / compacteurs",
    availability: "En stock" as const,
    family: "Moteur & filtration",
  },
  {
    sku: "SEAL-KIT-CYL",
    name: "Kit joints vérin principal",
    compatibility: "Pelles hydrauliques",
    availability: "Sur commande" as const,
    family: "Hydraulique & transmission",
  },
];

export const serviceOffers = [
  { key: "planned" as const },
  { key: "diagnostic" as const },
  { key: "training" as const },
  { key: "lifecycle" as const },
];

export const logisticsSteps = [
  { key: "prep" as const },
  { key: "docs" as const },
  { key: "transport" as const },
  { key: "reception" as const },
];

export const siteVisuals = {
  hero: "/visuals/excavator-worksite.jpg",
  mining: "/mashal_hero_mining.png",
  worksite: "/visuals/excavator-worksite.jpg",
  parts: "/visuals/parts-stock.jpg",
  sav: "/visuals/sav-maintenance.jpg",
  logistics: "/visuals/logistics-port.jpg",
  loader: "/visuals/wheel-loader.jpg",
  road: "/images/machines/niveleuse-160hp.webp",
  agriculture: "/images/machines/tracteur-agricole-150hp.webp",
  waste: "/images/machines/compacteur-decharge.webp",
  warehouse: "/images/machines/chariot-elevateur-5t.webp",
  founders: "/fondateurs-dossou.jpeg",
} as const;
