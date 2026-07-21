import type { Machine } from "@/types/machine";

/** Catalogue officiel Mashal Equipment — extrait du PDF client. */
export const catalogueMachines: Machine[] = [
  {
    "id": "tractopelle-cat-450e",
    "category": "Bâtiment & Construction",
    "designation": {
      "fr": "TRACTOPELLE CAT 450E",
      "en": "CAT 450E BACKHOE LOADER"
    },
    "description": {
      "fr": "Tractopelle polyvalente pour terrassement, tranchées et manutention — godets avant et arrière pour chantiers BTP.",
      "en": "Versatile backhoe loader for earthworks, trenching and handling — front and rear buckets for construction sites."
    },
    "image_id": "tractopelle-premium-4wd",
    "engine_brand_model": "Cat® 3054C T",
    "net_power_kw": 64.9,
    "net_power_hp": 88,
    "bucket_val": 1,
    "extra_info": "Modèle 428 · Godet arrière 0,18 m³",
    "weight_min": 9460,
    "operating_mass_kg": 9460
  },
  {
    "id": "camion-articule-cat-730",
    "category": "Bâtiment & Construction",
    "designation": {
      "fr": "CAMION ARTICULÉ CAT 730",
      "en": "CAT 730 ARTICULATED TRUCK"
    },
    "description": {
      "fr": "Camion articulé robuste pour transport de matériaux sur chantiers exigeants.",
      "en": "Robust articulated truck for hauling material on demanding job sites."
    },
    "image_id": "camion-benne-6x4",
    "engine_brand_model": "C13 Cat®",
    "bucket_val": 17.5,
    "extra_info": "Charge utile nominale 28 t · Capacité à refus 17,5 m³ (SAE 2:1)",
    "weight_min": 28000,
    "operating_mass_kg": 28000
  },
  {
    "id": "pelle-cat-315cl",
    "category": "Bâtiment & Construction",
    "designation": {
      "fr": "PELLE HYDRAULIQUE CAT 315C L",
      "en": "CAT 315C L HYDRAULIC EXCAVATOR"
    },
    "description": {
      "fr": "Pelle sur chenilles pour fouille, chargement et travaux de terrassement en milieu urbain ou industriel.",
      "en": "Tracked excavator for digging, loading and earthmoving in urban or industrial environments."
    },
    "image_id": "pelle-hydraulique-20t",
    "net_power_kw": 73,
    "depth_val": 5990,
    "weight_min": 15400,
    "operating_mass_kg": 15400
  },
  {
    "id": "chargeuse-cat-966g",
    "category": "Bâtiment & Construction",
    "designation": {
      "fr": "CHARGEUSE SUR PNEUS CAT 966G SÉRIE II",
      "en": "CAT 966G SERIES II WHEEL LOADER"
    },
    "description": {
      "fr": "Chargeuse sur pneus haute capacité pour alimentation de concasseurs, stockage et manutention lourde.",
      "en": "High-capacity wheel loader for crusher feeding, stockpiling and heavy handling."
    },
    "image_id": "chargeuse-pneus-3t",
    "engine_brand_model": "C9.3B Cat®",
    "rated_power_hp": 325,
    "weight_min": 23196,
    "operating_mass_kg": 23196
  },
  {
    "id": "tracteur-decapeuse-cat-627g",
    "category": "Bâtiment & Construction",
    "designation": {
      "fr": "TRACTEUR-DÉCAPEUSE À ROUES CAT 627G",
      "en": "CAT 627G WHEEL TRACTOR SCRAPER"
    },
    "description": {
      "fr": "Décapeuse automotrice pour terrassements de grande envergure et déplacement de volumes importants.",
      "en": "Motor scraper for large-scale earthmoving and high-volume material relocation."
    },
    "image_id": "bulldozer-d6",
    "rated_power_kw": 304,
    "bucket_val": 18.4,
    "max_speed_kmh": 53.9,
    "extra_info": "Puissance décapeuse 216 kW (290 HP)"
  },
  {
    "id": "mini-pelle-cat-3015",
    "category": "Bâtiment & Construction",
    "designation": {
      "fr": "MINI-PELLE CATERPILLAR 301.5",
      "en": "CATERPILLAR 301.5 MINI EXCAVATOR"
    },
    "description": {
      "fr": "Mini-pelle compacte pour accès restreints, travaux urbains et finitions de tranchées.",
      "en": "Compact mini excavator for tight access, urban work and trench finishing."
    },
    "image_id": "mini-pelle-compacte"
  },
  {
    "id": "betonniere-malaxeur-500l",
    "category": "Bâtiment & Construction",
    "designation": {
      "fr": "BÉTONNIÈRE MALAXEUR 500 L",
      "en": "500 L CONCRETE MIXER"
    },
    "description": {
      "fr": "Malaxeur portable pour production de béton sur petits et moyens chantiers.",
      "en": "Portable mixer for concrete production on small to mid-size job sites."
    },
    "image_id": "auto-betonniere-3-5m3"
  },
  {
    "id": "betonniere-monte-charge-510l",
    "category": "Bâtiment & Construction",
    "designation": {
      "fr": "BÉTONNIÈRE AVEC MONTE-CHARGE 510 L",
      "en": "510 L CONCRETE MIXER WITH HOIST"
    },
    "description": {
      "fr": "Bétonnière équipée d'un monte-charge pour levage de buckets et coulage en hauteur.",
      "en": "Concrete mixer with hoist for lifting buckets and pouring at height."
    },
    "image_id": "betonniere-portee-10m3"
  },
  {
    "id": "pompe-beton-remorque",
    "category": "Bâtiment & Construction",
    "designation": {
      "fr": "POMPE À BÉTON MONTÉE SUR REMORQUE",
      "en": "TRAILER-MOUNTED CONCRETE PUMP"
    },
    "description": {
      "fr": "Pompe à béton mobile pour coulage continu sur ouvrages verticaux et dalles.",
      "en": "Mobile concrete pump for continuous placement on vertical structures and slabs."
    },
    "image_id": "pompe-beton-37m"
  },
  {
    "id": "aiguille-vibrante-26mm",
    "category": "Bâtiment & Construction",
    "designation": {
      "fr": "AIGUILLE VIBRANTE 26 MM ÉLECTRIQUE",
      "en": "26 MM ELECTRIC CONCRETE VIBRATOR"
    },
    "description": {
      "fr": "Aiguille vibrante électrique pour compactage du béton frais — plusieurs têtes interchangeables.",
      "en": "Electric concrete vibrator for compacting fresh concrete — multiple interchangeable heads."
    },
    "image_id": "presse-balles-hydraulique"
  },
  {
    "id": "pilonneuse-essence",
    "category": "Bâtiment & Construction",
    "designation": {
      "fr": "PILONNEUSE ESSENCE MANUELLE",
      "en": "PETROL TAMPING RAMMER"
    },
    "description": {
      "fr": "Pilonneuse manuelle pour compactage de tranchées, fondations et zones étroites.",
      "en": "Manual tamping rammer for trench, foundation and tight-area compaction."
    },
    "image_id": "balayeuse-voirie"
  },
  {
    "id": "niveleuse-cat-160h",
    "category": "Construction Routière",
    "designation": {
      "fr": "NIVELEUSE CAT 160H",
      "en": "CAT 160H MOTOR GRADER"
    },
    "description": {
      "fr": "Niveleuse pour profilage, entretien routier et finition de plateformes.",
      "en": "Motor grader for profiling, road maintenance and platform finishing."
    },
    "image_id": "niveleuse-160hp",
    "net_power_kw": 165,
    "working_width_mm": 4200,
    "weight_min": 20660,
    "operating_mass_kg": 20660
  },
  {
    "id": "compacteur-cp56-cat",
    "category": "Construction Routière",
    "designation": {
      "fr": "COMPACTEUR CAT CP56 À PIEDS DAMEURS",
      "en": "CAT CP56 SHEEPSFOOT ROLLER"
    },
    "description": {
      "fr": "Compacteur à pieds dameurs pour sols cohésifs, remblais et couches de forme.",
      "en": "Sheepsfoot roller for cohesive soils, embankments and subgrade layers."
    },
    "image_id": "compacteur-monobille-12t",
    "gross_power_kw": 117,
    "working_width_mm": 2134,
    "weight_min": 11665,
    "operating_mass_kg": 11665
  },
  {
    "id": "compacteur-cs56-cat",
    "category": "Construction Routière",
    "designation": {
      "fr": "COMPACTEUR CAT CS56 TAMBOUR LISSE",
      "en": "CAT CS56 SMOOTH DRUM ROLLER"
    },
    "description": {
      "fr": "Rouleau compresseur lisse pour finition de couches granulaires et enrobés.",
      "en": "Smooth drum roller for finishing granular layers and asphalt courses."
    },
    "image_id": "rouleau-tandem-9t",
    "gross_power_kw": 117,
    "working_width_mm": 2134,
    "weight_min": 11500,
    "operating_mass_kg": 11500
  },
  {
    "id": "compacteur-bw65h",
    "category": "Construction Routière",
    "designation": {
      "fr": "COMPACTEUR VIBRANT MANUEL BW65H",
      "en": "BW65H WALK-BEHIND ROLLER"
    },
    "description": {
      "fr": "Compacteur vibrant manuel pour trottoirs, tranchées et reprises localisées.",
      "en": "Walk-behind vibratory roller for sidewalks, trenches and localized rework."
    },
    "image_id": "finisseur-asphalte-6m"
  },
  {
    "id": "camion-tout-terrain-cat-772",
    "category": "Mines & Carrières",
    "designation": {
      "fr": "CAMION TOUT-TERRAIN CAT 772",
      "en": "CAT 772 OFF-HIGHWAY TRUCK"
    },
    "description": {
      "fr": "Tombereau rigide pour transport de roches et overburden en mine et carrière.",
      "en": "Rigid haul truck for rock and overburden hauling in mining and quarry operations."
    },
    "image_id": "camion-hors-route-100t",
    "engine_brand_model": "C18 Cat®",
    "max_speed_kmh": 79.1,
    "extra_info": "Charge utile nominale 46,8 t",
    "weight_min": 46800,
    "operating_mass_kg": 46800
  },
  {
    "id": "tracteur-chenilles-cat-d9t",
    "category": "Mines & Carrières",
    "designation": {
      "fr": "TRACTEUR À CHENILLES CAT D9T",
      "en": "CAT D9T CRAWLER TRACTOR"
    },
    "description": {
      "fr": "Bulldozer de forte puissance pour push, décapage et préparation de fronts de taille.",
      "en": "High-power crawler tractor for push, stripping and working face preparation."
    },
    "image_id": "bulldozer-d8",
    "engine_brand_model": "C18 Cat®",
    "net_power_kw": 337,
    "weight_min": 49988,
    "operating_mass_kg": 49988
  },
  {
    "id": "pelle-miniere-xe950pro",
    "category": "Mines & Carrières",
    "designation": {
      "fr": "PELLE MINIÈRE XE950PRO 95T",
      "en": "XE950PRO 95T MINING EXCAVATOR"
    },
    "description": {
      "fr": "Pelle minière 95 t pour extraction, chargement de tombereaux et production intensive.",
      "en": "95 t mining excavator for extraction, haul-truck loading and intensive production."
    },
    "image_id": "pelle-miniere-33t",
    "net_power_kw": 563,
    "bucket_val": 4.6,
    "depth_val": 12645,
    "breakout_force_kN": 490,
    "extra_info": "Godet 4,6–6,7 m³ · Hauteur de déchargement 8 025 mm",
    "weight_min": 95000,
    "operating_mass_kg": 95000
  },
  {
    "id": "pelle-xe3000e",
    "category": "Mines & Carrières",
    "designation": {
      "fr": "PELLE HYDRAULIQUE XE3000E",
      "en": "XE3000E HYDRAULIC EXCAVATOR"
    },
    "description": {
      "fr": "Pelle de très grande taille (304 t) pour mines à ciel ouvert et chargement haute cadence.",
      "en": "Ultra-class hydraulic excavator (304 t) for open-pit mining and high-volume loading."
    },
    "image_id": "pelle-extraction-60t",
    "net_power_kw": 1050,
    "bucket_val": 16,
    "depth_val": 13880,
    "extra_info": "Godet 16/13/18 m³ · Hauteur de déchargement 10,3 m",
    "weight_min": 304000,
    "operating_mass_kg": 304000
  },
  {
    "id": "concassage-xft1860e",
    "category": "Mines & Carrières",
    "designation": {
      "fr": "STATION DE CONCASSAGE ET CRIBLAGE XFT1860E",
      "en": "XFT1860E CRUSHING & SCREENING PLANT"
    },
    "description": {
      "fr": "Unité mobile de concassage et criblage pour production de granulats et valorisation de matériaux.",
      "en": "Mobile crushing and screening unit for aggregate production and material processing."
    },
    "image_id": "broyeur-dechets-lourd",
    "net_power_kw": 1250,
    "bucket_val": 30,
    "extra_info": "Projet unité XE7000E · Rayon de fouille 16 700 mm",
    "weight_min": 660000,
    "operating_mass_kg": 660000
  },
  {
    "id": "concasseur-mobile-granulats",
    "category": "Mines & Carrières",
    "designation": {
      "fr": "STATION CONCASSEUR GRANULATS MOBILE",
      "en": "MOBILE AGGREGATE CRUSHING PLANT"
    },
    "description": {
      "fr": "Concasseur mobile sur roues pour calcaire, granite et pierre de rivière — 50 à 800 tph.",
      "en": "Wheel-mounted mobile crusher for limestone, granite and river stone — 50 to 800 tph."
    },
    "image_id": "compacteur-decharge",
    "net_power_kw": 280,
    "extra_info": "Entrée 1000×1200 mm · Sortie 20–50 mm · Matériaux: calcaire, gabbro, basalte"
  },
  {
    "id": "forage-tunnel-xud235c",
    "category": "Mines & Carrières",
    "designation": {
      "fr": "FORAGE DE TUNNEL HYDRAULIQUE XUD235C",
      "en": "XUD235C HYDRAULIC TUNNEL DRILL"
    },
    "description": {
      "fr": "Foreuse hydraulique sur chenilles pour tunnels miniers et galeries souterraines.",
      "en": "Tracked hydraulic drill for mining tunnels and underground galleries."
    },
    "image_id": "foreuse-rotative-lourde",
    "extra_info": "MonteBay HC95SA · Course télescopique 1 450 mm · Profondeur de forage 3 400 mm"
  },
  {
    "id": "forage-xr240e",
    "category": "Mines & Carrières",
    "designation": {
      "fr": "FORAGE ROTATIF XR240E",
      "en": "XR240E ROTARY DRILL RIG"
    },
    "description": {
      "fr": "Plate-forme de forage rotatif XCMG pour grands diamètres — mines et fondations profondes.",
      "en": "XCMG rotary drill rig for large diameters — mining and deep foundation work."
    },
    "image_id": "pelle-lourde-45t",
    "extra_info": "Diamètre max. 2 200 mm · Profondeur max. 80 m",
    "weight_min": 84000,
    "operating_mass_kg": 84000
  },
  {
    "id": "forage-smartroc-d65",
    "category": "Mines & Carrières",
    "designation": {
      "fr": "FORAGE SMARTROC D65",
      "en": "SMARTROC D65 DRILL RIG"
    },
    "description": {
      "fr": "Foreuse SmartROC pour mines et carrières — forage au fond du trou, profondeur 56 m.",
      "en": "SmartROC drill for mining and quarries — down-the-hole drilling, 56 m depth."
    },
    "image_id": "pelle-pneus-15t",
    "net_power_kw": 403,
    "extra_info": "Diamètre 110–229 mm · Débit d'air 470 l/s",
    "weight_min": 23000,
    "operating_mass_kg": 23000
  },
  {
    "id": "tombereau-xda40",
    "category": "Mines & Carrières",
    "designation": {
      "fr": "TOMBEREAU ARTICULÉ XDA40 40T",
      "en": "XDA40 40T ARTICULATED HAUL TRUCK"
    },
    "description": {
      "fr": "Tombereau articulé 40 t pour transport en mine, carrière et grands chantiers.",
      "en": "40 t articulated haul truck for mining, quarry and large-site hauling."
    },
    "image_id": "gravillonneur-automoteur",
    "net_power_kw": 350,
    "max_speed_kmh": 60,
    "extra_info": "Poids à vide 34 t · Pente max. 45 %",
    "weight_min": 39000,
    "operating_mass_kg": 39000
  },
  {
    "id": "niveleuse-gr5505tiv",
    "category": "Mines & Carrières",
    "designation": {
      "fr": "NIVELEUSE MINIÈRE GR5505TIV",
      "en": "GR5505TIV MINING MOTOR GRADER"
    },
    "description": {
      "fr": "Grande niveleuse robuste développée pour mines à ciel ouvert — entretien de pistes et plateformes.",
      "en": "Heavy mining motor grader for open-pit mines — haul-road and platform maintenance."
    },
    "image_id": "repandeuse-bitume"
  },
  {
    "id": "chargeuse-souterraine-xul621",
    "category": "Mines & Carrières",
    "designation": {
      "fr": "CHARGEUSE SOUTERRAINE XUL621 10 M³",
      "en": "XUL621 10 M³ UNDERGROUND LOADER"
    },
    "description": {
      "fr": "Chargeuse compacte pour chargement en mine souterraine et galeries étroites.",
      "en": "Compact loader for underground mining and narrow-gallery loading."
    },
    "image_id": "balayeuse-aspiratrice",
    "bucket_val": 10,
    "breakout_force_kN": 354,
    "extra_info": "Force de pelletage 354 kN · Traction max. 431 kN",
    "weight_min": 60000,
    "operating_mass_kg": 60000
  },
  {
    "id": "camion-mine-xut320",
    "category": "Mines & Carrières",
    "designation": {
      "fr": "CAMION DE MINE SOUTERRAINE XUT320 45T",
      "en": "XUT320 45T UNDERGROUND MINING TRUCK"
    },
    "description": {
      "fr": "Camion basculant 45 t pour transport de minerai en mine souterraine.",
      "en": "45 t underground mining truck for ore haulage in sub-surface operations."
    },
    "image_id": "pelle-lourde-45t",
    "engine_brand_model": "Volvo TAD1643VE-B",
    "max_speed_kmh": 14,
    "weight_min": 45000,
    "operating_mass_kg": 45000
  },
  {
    "id": "chargeuse-volvo-l350h",
    "category": "Mines & Carrières",
    "designation": {
      "fr": "CHARGEUSE VOLVO L350H",
      "en": "VOLVO L350H WHEEL LOADER"
    },
    "description": {
      "fr": "Grande chargeuse sur pneus pour chargement de tombereaux et stockage en mine/carrière.",
      "en": "Large wheel loader for haul-truck loading and stockpiling in mining and quarry."
    },
    "image_id": "pelle-pneus-15t",
    "engine_brand_model": "Volvo D16J",
    "net_power_kw": 397,
    "bucket_val": 6.2,
    "breakout_force_kN": 450,
    "extra_info": "Godet 6,2–12,7 m³ · Poids 50 000–56 300 kg",
    "weight_min": 53000,
    "operating_mass_kg": 53000
  },
  {
    "id": "pelle-volvo-ec550e",
    "category": "Mines & Carrières",
    "designation": {
      "fr": "PELLE SUR CHENILLES VOLVO EC550E",
      "en": "VOLVO EC550E CRAWLER EXCAVATOR"
    },
    "description": {
      "fr": "Grande pelle sur chenilles pour extraction, chargement et travaux de démolition lourde.",
      "en": "Large crawler excavator for extraction, loading and heavy demolition work."
    },
    "image_id": "finisseur-asphalte-6m",
    "gross_power_kw": 340,
    "bucket_val": 2.4,
    "depth_val": 7690,
    "breakout_force_kN": 251,
    "extra_info": "Portée max. 12 180 mm · Force boost 269 kN",
    "weight_min": 55800,
    "operating_mass_kg": 55800
  },
  {
    "id": "chariot-elevateur",
    "category": "Industrie & Entreposage",
    "designation": {
      "fr": "CHARIOT ÉLÉVATEUR",
      "en": "FORKLIFT"
    },
    "description": {
      "fr": "Chariot élévateur pour manutention en entrepôt, logistique et production.",
      "en": "Forklift for warehousing, logistics and production handling."
    },
    "image_id": "chariot-elevateur-5t"
  },
  {
    "id": "chariot-contrebalance-7t",
    "category": "Industrie & Entreposage",
    "designation": {
      "fr": "CHARIOT ÉLÉVATEUR CONTREBALANCÉ 7 T",
      "en": "7T COUNTERBALANCE FORKLIFT"
    },
    "description": {
      "fr": "Chariot 7 t pour charges lourdes en environnement industriel intensif.",
      "en": "7 t counterbalance forklift for heavy loads in intensive industrial settings."
    },
    "image_id": "chariot-telescopique-7m",
    "weight_min": 7000,
    "operating_mass_kg": 7000
  },
  {
    "id": "chariot-mat-retractable",
    "category": "Industrie & Entreposage",
    "designation": {
      "fr": "CHARIOT À MÂT RÉTRACTABLE",
      "en": "REACH TRUCK"
    },
    "description": {
      "fr": "Chariot à mât rétractable pour allées étroites et stockage en hauteur.",
      "en": "Reach truck for narrow aisles and high-bay storage."
    },
    "image_id": "pont-roulant-20t"
  },
  {
    "id": "chariot-tridirectionnel",
    "category": "Industrie & Entreposage",
    "designation": {
      "fr": "CHARIOT TRIDIRECTIONNEL",
      "en": "VNA / TRI-DIRECTIONAL TRUCK"
    },
    "description": {
      "fr": "Chariot très étroit pour allées VNA et maximisation de la surface de stockage.",
      "en": "Very narrow aisle truck for VNA layouts and maximum storage density."
    },
    "image_id": "transpalette-electrique"
  },
  {
    "id": "gerbeur-plateforme-l14",
    "category": "Industrie & Entreposage",
    "designation": {
      "fr": "GERBEUR À PLATEFORME L14",
      "en": "L14 PLATFORM STACKER"
    },
    "description": {
      "fr": "Gerbeur avec plateforme opérateur pour préparation de commandes et stockage moyen.",
      "en": "Platform stacker for order picking and medium-height storage."
    },
    "image_id": "groupe-electrogene-100kva"
  },
  {
    "id": "transpalette-electrique-catalogue",
    "category": "Industrie & Entreposage",
    "designation": {
      "fr": "TRANSPALETTE ÉLECTRIQUE",
      "en": "ELECTRIC PALLET TRUCK"
    },
    "description": {
      "fr": "Transpalette électrique pour flux rapides en entrepôt et préparation logistique.",
      "en": "Electric pallet truck for fast warehouse flows and order preparation."
    },
    "image_id": "groupe-electrogene-500kva"
  },
  {
    "id": "grue-automotrice",
    "category": "Industrie & Entreposage",
    "designation": {
      "fr": "GRUE AUTOMOTRICE MOBILE",
      "en": "MOBILE CRANE"
    },
    "description": {
      "fr": "Grue automotrice pour levage sur chantier, industrie et maintenance lourde.",
      "en": "Mobile crane for lifting on job sites, industry and heavy maintenance."
    },
    "image_id": "grue-tour-60m"
  },
  {
    "id": "nacelle-ciseaux-120sc",
    "category": "Industrie & Entreposage",
    "designation": {
      "fr": "NACELLE ÉLÉVATRICE À CISEAUX 120 SC",
      "en": "120 SC SCISSOR LIFT"
    },
    "description": {
      "fr": "Nacelle à ciseaux pour travaux en hauteur en intérieur ou sur dalle.",
      "en": "Scissor lift for elevated work indoors or on slab."
    },
    "image_id": "repandeuse-bitume"
  },
  {
    "id": "camion-nacelle-53m",
    "category": "Industrie & Entreposage",
    "designation": {
      "fr": "CAMION NACELLE 53 M",
      "en": "53 M TRUCK-MOUNTED AERIAL PLATFORM"
    },
    "description": {
      "fr": "Camion nacelle 53 m pour maintenance, éclairage public et travaux en hauteur.",
      "en": "53 m truck-mounted platform for maintenance, utilities and elevated work."
    },
    "image_id": "gravillonneur-automoteur"
  },
  {
    "id": "camion-grue-160t",
    "category": "Industrie & Entreposage",
    "designation": {
      "fr": "CAMION GRUE MOBILE 160 T",
      "en": "160 T MOBILE CRANE TRUCK"
    },
    "description": {
      "fr": "Grue mobile 160 t pour levage lourd — montage industriel et grands chantiers.",
      "en": "160 t mobile crane for heavy lifts — industrial assembly and major projects."
    },
    "image_id": "balayeuse-voirie"
  },
  {
    "id": "tracteur-7515",
    "category": "Agriculture & Sylviculture",
    "designation": {
      "fr": "TRACTEUR 4 ROUES MOTRICES 7515",
      "en": "7515 4WD TRACTOR"
    },
    "description": {
      "fr": "Tracteur 4 RM pour travaux agricoles, traction d'outils et manutention rurale.",
      "en": "4WD tractor for farm work, implement towing and rural handling."
    },
    "image_id": "moissonneuse-batteuse"
  },
  {
    "id": "tracteur-7515-cab",
    "category": "Agriculture & Sylviculture",
    "designation": {
      "fr": "TRACTEUR COMPACT 7515 CAB",
      "en": "7515 CAB COMPACT TRACTOR"
    },
    "description": {
      "fr": "Tracteur compact avec cabine pour confort opérateur et polyvalence parcelle.",
      "en": "Compact cab tractor for operator comfort and field versatility."
    },
    "image_id": "pulverisateur-automoteur"
  },
  {
    "id": "tracteur-enjambeur-5105mh",
    "category": "Agriculture & Sylviculture",
    "designation": {
      "fr": "TRACTEUR ENJAMBEUR SPÉCIALISÉ 5105MH",
      "en": "5105MH HIGH-CLEARANCE TRACTOR"
    },
    "description": {
      "fr": "Tracteur enjambeur pour cultures hautes, viticulture et arboriculture.",
      "en": "High-clearance tractor for tall crops, viticulture and arboriculture."
    },
    "image_id": "semoir-precision"
  },
  {
    "id": "tracteur-t68",
    "category": "Agriculture & Sylviculture",
    "designation": {
      "fr": "TRACTEUR TRANSMISSION MÉCANIQUE T68",
      "en": "T68 MECHANICAL DRIVE TRACTOR"
    },
    "description": {
      "fr": "Tracteur mécanique avec chargeur frontal intégré pour exploitation polyvalente.",
      "en": "Mechanical-drive tractor with front loader for versatile farm operations."
    },
    "image_id": "dechiqueteur-bois"
  },
  {
    "id": "tracteur-mf-9s",
    "category": "Agriculture & Sylviculture",
    "designation": {
      "fr": "TRACTEUR VARIATION CONTINUE MF 9S",
      "en": "MF 9S CVT TRACTOR"
    },
    "description": {
      "fr": "Tracteur haut de gamme à transmission continuously variable pour grandes exploitations.",
      "en": "Premium CVT tractor for large-scale farming operations."
    },
    "image_id": "presse-balles-hydraulique"
  },
  {
    "id": "transporteur-arst-evo5",
    "category": "Agriculture & Sylviculture",
    "designation": {
      "fr": "TRANSPORTEUR TOUT-TERRAIN ARST EVO5",
      "en": "ARST EVO5 UTILITY TRANSPORTER"
    },
    "description": {
      "fr": "Transporteur tout-terrain 1 place pour déplacements en exploitation et zones difficiles.",
      "en": "Single-seat utility transporter for farm mobility and rough terrain."
    },
    "image_id": "dechiqueteur-bois"
  },
  {
    "id": "transporteur-ct-2places",
    "category": "Agriculture & Sylviculture",
    "designation": {
      "fr": "TRANSPORTEUR TOUT-TERRAIN 2 PLACES CT",
      "en": "CT 2-SEAT UTILITY TRANSPORTER"
    },
    "description": {
      "fr": "Transporteur biplace pour équipes terrain, serres et grandes exploitations.",
      "en": "Two-seat utility transporter for field teams, greenhouses and large farms."
    },
    "image_id": "semoir-precision"
  },
  {
    "id": "remorque-bascule-1essieu",
    "category": "Agriculture & Sylviculture",
    "designation": {
      "fr": "REMORQUE BASCULANTE 1 ESSIEU",
      "en": "SINGLE-AXLE TIPPING TRAILER"
    },
    "description": {
      "fr": "Remorque basculante pour transport de récoltes, grains et matériaux agricoles.",
      "en": "Tipping trailer for hauling crops, grain and agricultural materials."
    },
    "image_id": "pulverisateur-automoteur"
  },
  {
    "id": "benne-tandem-12-18t",
    "category": "Agriculture & Sylviculture",
    "designation": {
      "fr": "BENNE TANDEM 12–18 T",
      "en": "12–18 T TANDEM AXLE TRAILER"
    },
    "description": {
      "fr": "Benne tandem pour transport lourd en exploitation agricole et travaux ruraux.",
      "en": "Tandem-axle dump trailer for heavy hauling on farms and rural projects."
    },
    "image_id": "pont-roulant-20t"
  },
  {
    "id": "groupe-electrogene-7500w",
    "category": "Services",
    "designation": {
      "fr": "GROUPE ÉLECTROGÈNE DIESEL 7 500 W",
      "en": "7,500 W DIESEL GENERATOR"
    },
    "description": {
      "fr": "Groupe mobile triphasé pour alimentation de chantier, atelier et secours.",
      "en": "Mobile three-phase generator for site power, workshops and backup supply."
    },
    "image_id": "chariot-telescopique-7m",
    "extra_info": "12,5 L · 240/400 V · mobile triphasé"
  },
  {
    "id": "groupe-electrogene-triphase",
    "category": "Services",
    "designation": {
      "fr": "GROUPE ÉLECTROGÈNE DIESEL TRIPHASÉ",
      "en": "THREE-PHASE DIESEL GENERATOR"
    },
    "description": {
      "fr": "Groupe diesel triphasé insonorisé pour sites industriels et applications continues.",
      "en": "Sound-attenuated three-phase diesel generator for industrial and continuous use."
    },
    "image_id": "rouleau-tandem-9t",
    "engine_brand_model": "Perkins"
  },
  {
    "id": "groupe-electrogene-40kva",
    "category": "Services",
    "designation": {
      "fr": "GROUPE ÉLECTROGÈNE 40 KVA TRACTABLE",
      "en": "40 KVA TOWABLE GENERATOR"
    },
    "description": {
      "fr": "Groupe 40 kVA sur remorque pour chantiers, événements et alimentation temporaire.",
      "en": "40 kVA towable generator for job sites, events and temporary power."
    },
    "image_id": "betonniere-portee-10m3"
  }
] as Machine[];

export default catalogueMachines;
