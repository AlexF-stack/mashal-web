import fs from "node:fs";
import path from "node:path";

/** @typedef {{ id: string; category: string; fr: string; en: string; image_id?: string; description?: { fr: string; en: string }; specs_raw?: string; engine_brand_model?: string; net_power_kw?: number; rated_power_kw?: number; gross_power_kw?: number; net_power_hp?: number; rated_power_hp?: number; operating_mass_kg?: number; weight_min?: number; weight_max?: number; bucket_val?: number; depth_val?: number | string; working_width_mm?: number; max_speed_kmh?: number; breakout_force_kN?: number; extra_info?: string }} Row */

/** @type {Row[]} */
const rows = [
  // —— Bâtiment & Construction (CAT + BTP) ——
  {
    id: "tractopelle-cat-450e",
    category: "Bâtiment & Construction",
    fr: "TRACTOPELLE CAT 450E",
    en: "CAT 450E BACKHOE LOADER",
    image_id: "tractopelle-premium-4wd",
    description: {
      fr: "Tractopelle polyvalente pour terrassement, tranchées et manutention — godets avant et arrière pour chantiers BTP.",
      en: "Versatile backhoe loader for earthworks, trenching and handling — front and rear buckets for construction sites.",
    },
    engine_brand_model: "Cat® 3054C T",
    net_power_kw: 64.9,
    net_power_hp: 88,
    operating_mass_kg: 9460,
    bucket_val: 1.0,
    extra_info: "Modèle 428 · Godet arrière 0,18 m³",
  },
  {
    id: "camion-articule-cat-730",
    category: "Bâtiment & Construction",
    fr: "CAMION ARTICULÉ CAT 730",
    en: "CAT 730 ARTICULATED TRUCK",
    image_id: "camion-benne-6x4",
    description: {
      fr: "Camion articulé robuste pour transport de matériaux sur chantiers exigeants.",
      en: "Robust articulated truck for hauling material on demanding job sites.",
    },
    engine_brand_model: "C13 Cat®",
    operating_mass_kg: 28000,
    bucket_val: 17.5,
    extra_info: "Charge utile nominale 28 t · Capacité à refus 17,5 m³ (SAE 2:1)",
  },
  {
    id: "pelle-cat-315cl",
    category: "Bâtiment & Construction",
    fr: "PELLE HYDRAULIQUE CAT 315C L",
    en: "CAT 315C L HYDRAULIC EXCAVATOR",
    image_id: "pelle-hydraulique-20t",
    description: {
      fr: "Pelle sur chenilles pour fouille, chargement et travaux de terrassement en milieu urbain ou industriel.",
      en: "Tracked excavator for digging, loading and earthmoving in urban or industrial environments.",
    },
    net_power_kw: 73,
    operating_mass_kg: 15400,
    depth_val: 5990,
  },
  {
    id: "chargeuse-cat-966g",
    category: "Bâtiment & Construction",
    fr: "CHARGEUSE SUR PNEUS CAT 966G SÉRIE II",
    en: "CAT 966G SERIES II WHEEL LOADER",
    image_id: "chargeuse-pneus-3t",
    description: {
      fr: "Chargeuse sur pneus haute capacité pour alimentation de concasseurs, stockage et manutention lourde.",
      en: "High-capacity wheel loader for crusher feeding, stockpiling and heavy handling.",
    },
    engine_brand_model: "C9.3B Cat®",
    rated_power_hp: 325,
    operating_mass_kg: 23196,
  },
  {
    id: "tracteur-decapeuse-cat-627g",
    category: "Bâtiment & Construction",
    fr: "TRACTEUR-DÉCAPEUSE À ROUES CAT 627G",
    en: "CAT 627G WHEEL TRACTOR SCRAPER",
    image_id: "bulldozer-d6",
    description: {
      fr: "Décapeuse automotrice pour terrassements de grande envergure et déplacement de volumes importants.",
      en: "Motor scraper for large-scale earthmoving and high-volume material relocation.",
    },
    rated_power_kw: 304,
    bucket_val: 18.4,
    max_speed_kmh: 53.9,
    extra_info: "Puissance décapeuse 216 kW (290 HP)",
  },
  {
    id: "mini-pelle-cat-3015",
    category: "Bâtiment & Construction",
    fr: "MINI-PELLE CATERPILLAR 301.5",
    en: "CATERPILLAR 301.5 MINI EXCAVATOR",
    image_id: "mini-pelle-compacte",
    description: {
      fr: "Mini-pelle compacte pour accès restreints, travaux urbains et finitions de tranchées.",
      en: "Compact mini excavator for tight access, urban work and trench finishing.",
    },
  },
  {
    id: "betonniere-malaxeur-500l",
    category: "Bâtiment & Construction",
    fr: "BÉTONNIÈRE MALAXEUR 500 L",
    en: "500 L CONCRETE MIXER",
    image_id: "auto-betonniere-3-5m3",
    description: {
      fr: "Malaxeur portable pour production de béton sur petits et moyens chantiers.",
      en: "Portable mixer for concrete production on small to mid-size job sites.",
    },
  },
  {
    id: "betonniere-monte-charge-510l",
    category: "Bâtiment & Construction",
    fr: "BÉTONNIÈRE AVEC MONTE-CHARGE 510 L",
    en: "510 L CONCRETE MIXER WITH HOIST",
    image_id: "auto-betonniere-3-5m3",
    description: {
      fr: "Bétonnière équipée d'un monte-charge pour levage de buckets et coulage en hauteur.",
      en: "Concrete mixer with hoist for lifting buckets and pouring at height.",
    },
  },
  {
    id: "pompe-beton-remorque",
    category: "Bâtiment & Construction",
    fr: "POMPE À BÉTON MONTÉE SUR REMORQUE",
    en: "TRAILER-MOUNTED CONCRETE PUMP",
    image_id: "pompe-beton-37m",
    description: {
      fr: "Pompe à béton mobile pour coulage continu sur ouvrages verticaux et dalles.",
      en: "Mobile concrete pump for continuous placement on vertical structures and slabs.",
    },
  },
  {
    id: "aiguille-vibrante-26mm",
    category: "Bâtiment & Construction",
    fr: "AIGUILLE VIBRANTE 26 MM ÉLECTRIQUE",
    en: "26 MM ELECTRIC CONCRETE VIBRATOR",
    image_id: "pompe-beton-37m",
    description: {
      fr: "Aiguille vibrante électrique pour compactage du béton frais — plusieurs têtes interchangeables.",
      en: "Electric concrete vibrator for compacting fresh concrete — multiple interchangeable heads.",
    },
  },
  {
    id: "pilonneuse-essence",
    category: "Bâtiment & Construction",
    fr: "PILONNEUSE ESSENCE MANUELLE",
    en: "PETROL TAMPING RAMMER",
    image_id: "compacteur-monobille-12t",
    description: {
      fr: "Pilonneuse manuelle pour compactage de tranchées, fondations et zones étroites.",
      en: "Manual tamping rammer for trench, foundation and tight-area compaction.",
    },
  },

  // —— Construction Routière ——
  {
    id: "niveleuse-cat-160h",
    category: "Construction Routière",
    fr: "NIVELEUSE CAT 160H",
    en: "CAT 160H MOTOR GRADER",
    image_id: "niveleuse-160hp",
    description: {
      fr: "Niveleuse pour profilage, entretien routier et finition de plateformes.",
      en: "Motor grader for profiling, road maintenance and platform finishing.",
    },
    net_power_kw: 165,
    operating_mass_kg: 20660,
    working_width_mm: 4200,
  },
  {
    id: "compacteur-cp56-cat",
    category: "Construction Routière",
    fr: "COMPACTEUR CAT CP56 À PIEDS DAMEURS",
    en: "CAT CP56 SHEEPSFOOT ROLLER",
    image_id: "compacteur-monobille-12t",
    description: {
      fr: "Compacteur à pieds dameurs pour sols cohésifs, remblais et couches de forme.",
      en: "Sheepsfoot roller for cohesive soils, embankments and subgrade layers.",
    },
    gross_power_kw: 117,
    operating_mass_kg: 11665,
    working_width_mm: 2134,
  },
  {
    id: "compacteur-cs56-cat",
    category: "Construction Routière",
    fr: "COMPACTEUR CAT CS56 TAMBOUR LISSE",
    en: "CAT CS56 SMOOTH DRUM ROLLER",
    image_id: "compacteur-monobille-12t",
    description: {
      fr: "Rouleau compresseur lisse pour finition de couches granulaires et enrobés.",
      en: "Smooth drum roller for finishing granular layers and asphalt courses.",
    },
    gross_power_kw: 117,
    operating_mass_kg: 11500,
    working_width_mm: 2134,
  },
  {
    id: "compacteur-bw65h",
    category: "Construction Routière",
    fr: "COMPACTEUR VIBRANT MANUEL BW65H",
    en: "BW65H WALK-BEHIND ROLLER",
    image_id: "rouleau-tandem-9t",
    description: {
      fr: "Compacteur vibrant manuel pour trottoirs, tranchées et reprises localisées.",
      en: "Walk-behind vibratory roller for sidewalks, trenches and localized rework.",
    },
  },

  // —— Mines & Carrières ——
  {
    id: "camion-tout-terrain-cat-772",
    category: "Mines & Carrières",
    fr: "CAMION TOUT-TERRAIN CAT 772",
    en: "CAT 772 OFF-HIGHWAY TRUCK",
    image_id: "camion-hors-route-100t",
    description: {
      fr: "Tombereau rigide pour transport de roches et overburden en mine et carrière.",
      en: "Rigid haul truck for rock and overburden hauling in mining and quarry operations.",
    },
    engine_brand_model: "C18 Cat®",
    operating_mass_kg: 46800,
    max_speed_kmh: 79.1,
    extra_info: "Charge utile nominale 46,8 t",
  },
  {
    id: "tracteur-chenilles-cat-d9t",
    category: "Mines & Carrières",
    fr: "TRACTEUR À CHENILLES CAT D9T",
    en: "CAT D9T CRAWLER TRACTOR",
    image_id: "bulldozer-d8",
    description: {
      fr: "Bulldozer de forte puissance pour push, décapage et préparation de fronts de taille.",
      en: "High-power crawler tractor for push, stripping and working face preparation.",
    },
    engine_brand_model: "C18 Cat®",
    net_power_kw: 337,
    operating_mass_kg: 49988,
  },
  {
    id: "pelle-miniere-xe950pro",
    category: "Mines & Carrières",
    fr: "PELLE MINIÈRE XE950PRO 95T",
    en: "XE950PRO 95T MINING EXCAVATOR",
    image_id: "pelle-miniere-33t",
    description: {
      fr: "Pelle minière 95 t pour extraction, chargement de tombereaux et production intensive.",
      en: "95 t mining excavator for extraction, haul-truck loading and intensive production.",
    },
    net_power_kw: 563,
    operating_mass_kg: 95000,
    bucket_val: 4.6,
    depth_val: 12645,
    breakout_force_kN: 490,
    extra_info: "Godet 4,6–6,7 m³ · Hauteur de déchargement 8 025 mm",
  },
  {
    id: "pelle-xe3000e",
    category: "Mines & Carrières",
    fr: "PELLE HYDRAULIQUE XE3000E",
    en: "XE3000E HYDRAULIC EXCAVATOR",
    image_id: "pelle-extraction-60t",
    description: {
      fr: "Pelle de très grande taille (304 t) pour mines à ciel ouvert et chargement haute cadence.",
      en: "Ultra-class hydraulic excavator (304 t) for open-pit mining and high-volume loading.",
    },
    net_power_kw: 1050,
    operating_mass_kg: 304000,
    bucket_val: 16,
    depth_val: 13880,
    extra_info: "Godet 16/13/18 m³ · Hauteur de déchargement 10,3 m",
  },
  {
    id: "concassage-xft1860e",
    category: "Mines & Carrières",
    fr: "STATION DE CONCASSAGE ET CRIBLAGE XFT1860E",
    en: "XFT1860E CRUSHING & SCREENING PLANT",
    image_id: "broyeur-dechets-lourd",
    description: {
      fr: "Unité mobile de concassage et criblage pour production de granulats et valorisation de matériaux.",
      en: "Mobile crushing and screening unit for aggregate production and material processing.",
    },
    operating_mass_kg: 660000,
    net_power_kw: 1250,
    bucket_val: 30,
    extra_info: "Projet unité XE7000E · Rayon de fouille 16 700 mm",
  },
  {
    id: "concasseur-mobile-granulats",
    category: "Mines & Carrières",
    fr: "STATION CONCASSEUR GRANULATS MOBILE",
    en: "MOBILE AGGREGATE CRUSHING PLANT",
    image_id: "broyeur-dechets-lourd",
    description: {
      fr: "Concasseur mobile sur roues pour calcaire, granite et pierre de rivière — 50 à 800 tph.",
      en: "Wheel-mounted mobile crusher for limestone, granite and river stone — 50 to 800 tph.",
    },
    net_power_kw: 280,
    extra_info: "Entrée 1000×1200 mm · Sortie 20–50 mm · Matériaux: calcaire, gabbro, basalte",
  },
  {
    id: "forage-tunnel-xud235c",
    category: "Mines & Carrières",
    fr: "FORAGE DE TUNNEL HYDRAULIQUE XUD235C",
    en: "XUD235C HYDRAULIC TUNNEL DRILL",
    image_id: "foreuse-rotative-lourde",
    description: {
      fr: "Foreuse hydraulique sur chenilles pour tunnels miniers et galeries souterraines.",
      en: "Tracked hydraulic drill for mining tunnels and underground galleries.",
    },
    extra_info: "MonteBay HC95SA · Course télescopique 1 450 mm · Profondeur de forage 3 400 mm",
  },
  {
    id: "forage-xr240e",
    category: "Mines & Carrières",
    fr: "FORAGE ROTATIF XR240E",
    en: "XR240E ROTARY DRILL RIG",
    image_id: "foreuse-rotative-lourde",
    description: {
      fr: "Plate-forme de forage rotatif XCMG pour grands diamètres — mines et fondations profondes.",
      en: "XCMG rotary drill rig for large diameters — mining and deep foundation work.",
    },
    operating_mass_kg: 84000,
    extra_info: "Diamètre max. 2 200 mm · Profondeur max. 80 m",
  },
  {
    id: "forage-smartroc-d65",
    category: "Mines & Carrières",
    fr: "FORAGE SMARTROC D65",
    en: "SMARTROC D65 DRILL RIG",
    image_id: "foreuse-rotative-lourde",
    description: {
      fr: "Foreuse SmartROC pour mines et carrières — forage au fond du trou, profondeur 56 m.",
      en: "SmartROC drill for mining and quarries — down-the-hole drilling, 56 m depth.",
    },
    net_power_kw: 403,
    operating_mass_kg: 23000,
    extra_info: "Diamètre 110–229 mm · Débit d'air 470 l/s",
  },
  {
    id: "tombereau-xda40",
    category: "Mines & Carrières",
    fr: "TOMBEREAU ARTICULÉ XDA40 40T",
    en: "XDA40 40T ARTICULATED HAUL TRUCK",
    image_id: "camion-hors-route-100t",
    description: {
      fr: "Tombereau articulé 40 t pour transport en mine, carrière et grands chantiers.",
      en: "40 t articulated haul truck for mining, quarry and large-site hauling.",
    },
    net_power_kw: 350,
    operating_mass_kg: 39000,
    max_speed_kmh: 60,
    extra_info: "Poids à vide 34 t · Pente max. 45 %",
  },
  {
    id: "niveleuse-gr5505tiv",
    category: "Mines & Carrières",
    fr: "NIVELEUSE MINIÈRE GR5505TIV",
    en: "GR5505TIV MINING MOTOR GRADER",
    image_id: "niveleuse-160hp",
    description: {
      fr: "Grande niveleuse robuste développée pour mines à ciel ouvert — entretien de pistes et plateformes.",
      en: "Heavy mining motor grader for open-pit mines — haul-road and platform maintenance.",
    },
  },
  {
    id: "chargeuse-souterraine-xul621",
    category: "Mines & Carrières",
    fr: "CHARGEUSE SOUTERRAINE XUL621 10 M³",
    en: "XUL621 10 M³ UNDERGROUND LOADER",
    image_id: "chargeuse-pneus-3t",
    description: {
      fr: "Chargeuse compacte pour chargement en mine souterraine et galeries étroites.",
      en: "Compact loader for underground mining and narrow-gallery loading.",
    },
    bucket_val: 10,
    breakout_force_kN: 354,
    operating_mass_kg: 60000,
    extra_info: "Force de pelletage 354 kN · Traction max. 431 kN",
  },
  {
    id: "camion-mine-xut320",
    category: "Mines & Carrières",
    fr: "CAMION DE MINE SOUTERRAINE XUT320 45T",
    en: "XUT320 45T UNDERGROUND MINING TRUCK",
    image_id: "camion-hors-route-100t",
    description: {
      fr: "Camion basculant 45 t pour transport de minerai en mine souterraine.",
      en: "45 t underground mining truck for ore haulage in sub-surface operations.",
    },
    engine_brand_model: "Volvo TAD1643VE-B",
    operating_mass_kg: 45000,
    max_speed_kmh: 14,
  },
  {
    id: "chargeuse-volvo-l350h",
    category: "Mines & Carrières",
    fr: "CHARGEUSE VOLVO L350H",
    en: "VOLVO L350H WHEEL LOADER",
    image_id: "chargeuse-pneus-3t",
    description: {
      fr: "Grande chargeuse sur pneus pour chargement de tombereaux et stockage en mine/carrière.",
      en: "Large wheel loader for haul-truck loading and stockpiling in mining and quarry.",
    },
    engine_brand_model: "Volvo D16J",
    net_power_kw: 397,
    operating_mass_kg: 53000,
    bucket_val: 6.2,
    breakout_force_kN: 450,
    extra_info: "Godet 6,2–12,7 m³ · Poids 50 000–56 300 kg",
  },
  {
    id: "pelle-volvo-ec550e",
    category: "Mines & Carrières",
    fr: "PELLE SUR CHENILLES VOLVO EC550E",
    en: "VOLVO EC550E CRAWLER EXCAVATOR",
    image_id: "pelle-extraction-60t",
    description: {
      fr: "Grande pelle sur chenilles pour extraction, chargement et travaux de démolition lourde.",
      en: "Large crawler excavator for extraction, loading and heavy demolition work.",
    },
    gross_power_kw: 340,
    operating_mass_kg: 55800,
    bucket_val: 2.4,
    depth_val: 7690,
    breakout_force_kN: 251,
    extra_info: "Portée max. 12 180 mm · Force boost 269 kN",
  },

  // —— Industrie & Entreposage ——
  {
    id: "chariot-elevateur",
    category: "Industrie & Entreposage",
    fr: "CHARIOT ÉLÉVATEUR",
    en: "FORKLIFT",
    image_id: "chariot-elevateur-5t",
    description: {
      fr: "Chariot élévateur pour manutention en entrepôt, logistique et production.",
      en: "Forklift for warehousing, logistics and production handling.",
    },
  },
  {
    id: "chariot-contrebalance-7t",
    category: "Industrie & Entreposage",
    fr: "CHARIOT ÉLÉVATEUR CONTREBALANCÉ 7 T",
    en: "7T COUNTERBALANCE FORKLIFT",
    image_id: "chariot-elevateur-5t",
    description: {
      fr: "Chariot 7 t pour charges lourdes en environnement industriel intensif.",
      en: "7 t counterbalance forklift for heavy loads in intensive industrial settings.",
    },
    operating_mass_kg: 7000,
  },
  {
    id: "chariot-mat-retractable",
    category: "Industrie & Entreposage",
    fr: "CHARIOT À MÂT RÉTRACTABLE",
    en: "REACH TRUCK",
    image_id: "chariot-telescopique-7m",
    description: {
      fr: "Chariot à mât rétractable pour allées étroites et stockage en hauteur.",
      en: "Reach truck for narrow aisles and high-bay storage.",
    },
  },
  {
    id: "chariot-tridirectionnel",
    category: "Industrie & Entreposage",
    fr: "CHARIOT TRIDIRECTIONNEL",
    en: "VNA / TRI-DIRECTIONAL TRUCK",
    image_id: "chariot-elevateur-5t",
    description: {
      fr: "Chariot très étroit pour allées VNA et maximisation de la surface de stockage.",
      en: "Very narrow aisle truck for VNA layouts and maximum storage density.",
    },
  },
  {
    id: "gerbeur-plateforme-l14",
    category: "Industrie & Entreposage",
    fr: "GERBEUR À PLATEFORME L14",
    en: "L14 PLATFORM STACKER",
    image_id: "transpalette-electrique",
    description: {
      fr: "Gerbeur avec plateforme opérateur pour préparation de commandes et stockage moyen.",
      en: "Platform stacker for order picking and medium-height storage.",
    },
  },
  {
    id: "transpalette-electrique-catalogue",
    category: "Industrie & Entreposage",
    fr: "TRANSPALETTE ÉLECTRIQUE",
    en: "ELECTRIC PALLET TRUCK",
    image_id: "transpalette-electrique",
    description: {
      fr: "Transpalette électrique pour flux rapides en entrepôt et préparation logistique.",
      en: "Electric pallet truck for fast warehouse flows and order preparation.",
    },
  },
  {
    id: "grue-automotrice",
    category: "Industrie & Entreposage",
    fr: "GRUE AUTOMOTRICE MOBILE",
    en: "MOBILE CRANE",
    image_id: "grue-tour-60m",
    description: {
      fr: "Grue automotrice pour levage sur chantier, industrie et maintenance lourde.",
      en: "Mobile crane for lifting on job sites, industry and heavy maintenance.",
    },
  },
  {
    id: "nacelle-ciseaux-120sc",
    category: "Industrie & Entreposage",
    fr: "NACELLE ÉLÉVATRICE À CISEAUX 120 SC",
    en: "120 SC SCISSOR LIFT",
    image_id: "pont-roulant-20t",
    description: {
      fr: "Nacelle à ciseaux pour travaux en hauteur en intérieur ou sur dalle.",
      en: "Scissor lift for elevated work indoors or on slab.",
    },
  },
  {
    id: "camion-nacelle-53m",
    category: "Industrie & Entreposage",
    fr: "CAMION NACELLE 53 M",
    en: "53 M TRUCK-MOUNTED AERIAL PLATFORM",
    image_id: "grue-tour-60m",
    description: {
      fr: "Camion nacelle 53 m pour maintenance, éclairage public et travaux en hauteur.",
      en: "53 m truck-mounted platform for maintenance, utilities and elevated work.",
    },
  },
  {
    id: "camion-grue-160t",
    category: "Industrie & Entreposage",
    fr: "CAMION GRUE MOBILE 160 T",
    en: "160 T MOBILE CRANE TRUCK",
    image_id: "grue-tour-60m",
    description: {
      fr: "Grue mobile 160 t pour levage lourd — montage industriel et grands chantiers.",
      en: "160 t mobile crane for heavy lifts — industrial assembly and major projects.",
    },
  },

  // —— Agriculture & Sylviculture ——
  {
    id: "tracteur-7515",
    category: "Agriculture & Sylviculture",
    fr: "TRACTEUR 4 ROUES MOTRICES 7515",
    en: "7515 4WD TRACTOR",
    image_id: "tracteur-agricole-150hp",
    description: {
      fr: "Tracteur 4 RM pour travaux agricoles, traction d'outils et manutention rurale.",
      en: "4WD tractor for farm work, implement towing and rural handling.",
    },
  },
  {
    id: "tracteur-7515-cab",
    category: "Agriculture & Sylviculture",
    fr: "TRACTEUR COMPACT 7515 CAB",
    en: "7515 CAB COMPACT TRACTOR",
    image_id: "tracteur-agricole-150hp",
    description: {
      fr: "Tracteur compact avec cabine pour confort opérateur et polyvalence parcelle.",
      en: "Compact cab tractor for operator comfort and field versatility.",
    },
  },
  {
    id: "tracteur-enjambeur-5105mh",
    category: "Agriculture & Sylviculture",
    fr: "TRACTEUR ENJAMBEUR SPÉCIALISÉ 5105MH",
    en: "5105MH HIGH-CLEARANCE TRACTOR",
    image_id: "tracteur-agricole-150hp",
    description: {
      fr: "Tracteur enjambeur pour cultures hautes, viticulture et arboriculture.",
      en: "High-clearance tractor for tall crops, viticulture and arboriculture.",
    },
  },
  {
    id: "tracteur-t68",
    category: "Agriculture & Sylviculture",
    fr: "TRACTEUR TRANSMISSION MÉCANIQUE T68",
    en: "T68 MECHANICAL DRIVE TRACTOR",
    image_id: "tracteur-agricole-150hp",
    description: {
      fr: "Tracteur mécanique avec chargeur frontal intégré pour exploitation polyvalente.",
      en: "Mechanical-drive tractor with front loader for versatile farm operations.",
    },
  },
  {
    id: "tracteur-mf-9s",
    category: "Agriculture & Sylviculture",
    fr: "TRACTEUR VARIATION CONTINUE MF 9S",
    en: "MF 9S CVT TRACTOR",
    image_id: "tracteur-agricole-150hp",
    description: {
      fr: "Tracteur haut de gamme à transmission continuously variable pour grandes exploitations.",
      en: "Premium CVT tractor for large-scale farming operations.",
    },
  },
  {
    id: "transporteur-arst-evo5",
    category: "Agriculture & Sylviculture",
    fr: "TRANSPORTEUR TOUT-TERRAIN ARST EVO5",
    en: "ARST EVO5 UTILITY TRANSPORTER",
    image_id: "tracteur-agricole-150hp",
    description: {
      fr: "Transporteur tout-terrain 1 place pour déplacements en exploitation et zones difficiles.",
      en: "Single-seat utility transporter for farm mobility and rough terrain.",
    },
  },
  {
    id: "transporteur-ct-2places",
    category: "Agriculture & Sylviculture",
    fr: "TRANSPORTEUR TOUT-TERRAIN 2 PLACES CT",
    en: "CT 2-SEAT UTILITY TRANSPORTER",
    image_id: "tracteur-agricole-150hp",
    description: {
      fr: "Transporteur biplace pour équipes terrain, serres et grandes exploitations.",
      en: "Two-seat utility transporter for field teams, greenhouses and large farms.",
    },
  },
  {
    id: "remorque-bascule-1essieu",
    category: "Agriculture & Sylviculture",
    fr: "REMORQUE BASCULANTE 1 ESSIEU",
    en: "SINGLE-AXLE TIPPING TRAILER",
    image_id: "camion-benne-6x4",
    description: {
      fr: "Remorque basculante pour transport de récoltes, grains et matériaux agricoles.",
      en: "Tipping trailer for hauling crops, grain and agricultural materials.",
    },
  },
  {
    id: "benne-tandem-12-18t",
    category: "Agriculture & Sylviculture",
    fr: "BENNE TANDEM 12–18 T",
    en: "12–18 T TANDEM AXLE TRAILER",
    image_id: "camion-benne-6x4",
    description: {
      fr: "Benne tandem pour transport lourd en exploitation agricole et travaux ruraux.",
      en: "Tandem-axle dump trailer for heavy hauling on farms and rural projects.",
    },
  },

  // —— Services (groupes électrogènes) ——
  {
    id: "groupe-electrogene-7500w",
    category: "Services",
    fr: "GROUPE ÉLECTROGÈNE DIESEL 7 500 W",
    en: "7,500 W DIESEL GENERATOR",
    image_id: "groupe-electrogene-100kva",
    description: {
      fr: "Groupe mobile triphasé pour alimentation de chantier, atelier et secours.",
      en: "Mobile three-phase generator for site power, workshops and backup supply.",
    },
    extra_info: "12,5 L · 240/400 V · mobile triphasé",
  },
  {
    id: "groupe-electrogene-triphase",
    category: "Services",
    fr: "GROUPE ÉLECTROGÈNE DIESEL TRIPHASÉ",
    en: "THREE-PHASE DIESEL GENERATOR",
    image_id: "groupe-electrogene-500kva",
    description: {
      fr: "Groupe diesel triphasé insonorisé pour sites industriels et applications continues.",
      en: "Sound-attenuated three-phase diesel generator for industrial and continuous use.",
    },
    engine_brand_model: "Perkins",
  },
  {
    id: "groupe-electrogene-40kva",
    category: "Services",
    fr: "GROUPE ÉLECTROGÈNE 40 KVA TRACTABLE",
    en: "40 KVA TOWABLE GENERATOR",
    image_id: "groupe-electrogene-100kva",
    description: {
      fr: "Groupe 40 kVA sur remorque pour chantiers, événements et alimentation temporaire.",
      en: "40 kVA towable generator for job sites, events and temporary power.",
    },
  },
];

function toMachine(row) {
  const {
    id,
    category,
    fr,
    en,
    image_id,
    description,
    weight_min,
    weight_max,
    operating_mass_kg,
    ...rest
  } = row;

  const machine = {
    id,
    category,
    designation: { fr, en },
    description: description ?? null,
    image_id: image_id ?? null,
    ...rest,
  };

  if (operating_mass_kg && !weight_min) {
    machine.weight_min = operating_mass_kg;
  }
  if (weight_min) machine.weight_min = weight_min;
  if (weight_max) machine.weight_max = weight_max;
  if (operating_mass_kg) machine.operating_mass_kg = operating_mass_kg;

  return machine;
}

const machines = rows.map(toMachine);

const outTs = `import type { Machine } from "@/types/machine";

/** Catalogue officiel Mashal Equipment — extrait du PDF client. */
export const catalogueMachines: Machine[] = ${JSON.stringify(machines, null, 2)} as Machine[];

export default catalogueMachines;
`;

const outJson = JSON.stringify(machines, null, 2);

fs.writeFileSync(path.resolve("src/data/machines-catalogue.ts"), outTs, "utf8");
fs.writeFileSync(path.resolve("src/machines_master.json"), outJson, "utf8");
console.log(`Generated ${machines.length} machines.`);
