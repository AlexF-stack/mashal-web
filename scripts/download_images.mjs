import 'dotenv/config';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pLimit from 'p-limit';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURATION
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const OUTPUT_DIR = path.join(__dirname, '../public/images/machines');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'manifest.json');

const MACHINES = [
  { id: 'auto-betonniere-3-5m3', query: 'concrete mixer truck', alt: 'Auto-bétonnière 3.5m³ pour chantiers de construction' },
  { id: 'pelle-hydraulique-20t', query: 'excavator construction', alt: 'Pelle hydraulique 20 tonnes pour travaux de terrassement' },
  { id: 'pelle-pneus-15t', query: 'wheeled excavator', alt: 'Pelle sur pneus 15 tonnes pour travaux urbains' },
  { id: 'tractopelle-premium-4wd', query: 'backhoe loader', alt: 'Tractopelle premium 4WD polyvalente' },
  { id: 'mini-pelle-compacte', query: 'mini excavator', alt: 'Mini-pelle compacte pour travaux de précision' },
  { id: 'grue-tour-60m', query: 'tower crane construction', alt: 'Grue à tour 60m pour grands projets de bâtiment' },
  { id: 'pompe-beton-37m', query: 'concrete pump truck', alt: 'Pompe à béton 37m pour distribution précise' },
  { id: 'betonniere-portee-10m3', query: 'cement mixer truck', alt: 'Bétonnière portée 10m³ transport de béton' },
  { id: 'pelle-miniere-33t', query: 'large excavator mining', alt: 'Pelle minière 33 tonnes pour extraction' },
  { id: 'pelle-lourde-45t', query: 'heavy excavator quarry', alt: 'Pelle lourde 45 tonnes pour carrières' },
  { id: 'pelle-extraction-60t', query: 'huge excavator mining', alt: 'Pelle d\'extraction 60 tonnes colosse minier' },
  { id: 'bulldozer-d6', query: 'bulldozer earthmoving', alt: 'Bulldozer D6 pour nivellement de terrain' },
  { id: 'bulldozer-d8', query: 'heavy bulldozer', alt: 'Bulldozer D8 lourd pour poussée massive' },
  { id: 'camion-hors-route-100t', query: 'mining dump truck', alt: 'Camion hors-route 100 tonnes transport minier' },
  { id: 'foreuse-rotative-lourde', query: 'drilling rig mining', alt: 'Foreuse rotative lourde foration de précision' },
  { id: 'niveleuse-160hp', query: 'motor grader road', alt: 'Niveleuse 160HP finition de chaussée' },
  { id: 'compacteur-monobille-12t', query: 'soil compactor roller', alt: 'Compacteur monobille 12 tonnes compactage sols' },
  { id: 'finisseur-asphalte-6m', query: 'asphalt paver road', alt: 'Finisseur d\'asphalte 6m application enrobé' },
  { id: 'rouleau-tandem-9t', query: 'tandem roller road', alt: 'Rouleau tandem 9 tonnes finition lisse' },
  { id: 'balayeuse-aspiratrice', query: 'street sweeper truck', alt: 'Balayeuse aspiratrice entretien voirie' },
  { id: 'repandeuse-bitume', query: 'bitumen sprayer truck', alt: 'Répandeuse de bitume application émulsions' },
  { id: 'gravillonneur-automoteur', query: 'chip spreader road', alt: 'Gravillonneur automoteur traitement de surface' },
  { id: 'chariot-elevateur-5t', query: 'forklift diesel 5t', alt: 'Chariot élévateur diesel 5 tonnes manutention' },
  { id: 'chariot-telescopique-7m', query: 'telehandler construction', alt: 'Chariot télescopique 7m levage déporté' },
  { id: 'chargeuse-pneus-3t', query: 'wheel loader industrial', alt: 'Chargeuse sur pneus 3 tonnes chargement vrac' },
  { id: 'camion-benne-6x4', query: 'dump truck 6x4', alt: 'Camion benne 6x4 transport logistique' },
  { id: 'pont-roulant-20t', query: 'overhead crane factory', alt: 'Pont roulant 20 tonnes levage industriel fixe' },
  { id: 'transpalette-electrique', query: 'electric pallet jack', alt: 'Transpalette électrique flux logistiques' },
  { id: 'tracteur-agricole-150hp', query: 'farm tractor 150hp', alt: 'Tracteur agricole 150HP force de traction' },
  { id: 'moissonneuse-batteuse', query: 'combine harvester field', alt: 'Moissonneuse-batteuse récolte mécanisée' },
  { id: 'pulverisateur-automoteur', query: 'crop sprayer machine', alt: 'Pulvérisateur automoteur protection cultures' },
  { id: 'semoir-precision', query: 'seed drill agriculture', alt: 'Semoir de précision mécanisation semis' },
  { id: 'presse-balles-hydraulique', query: 'waste baler machine', alt: 'Presse à balles hydraulique compactage déchets' },
  { id: 'broyeur-dechets-lourd', query: 'industrial shredder waste', alt: 'Broyeur de déchets lourd réduction volume' },
  { id: 'compacteur-decharge', query: 'landfill compactor', alt: 'Compacteur de décharge gestion sites enfouissement' },
  { id: 'dechiqueteur-bois', query: 'wood chipper machine', alt: 'Déchiqueteur de bois valorisation résidus' },
  { id: 'groupe-electrogene-100kva', query: 'diesel generator 100kva', alt: 'Groupe électrogène 100kVA puissance continue' },
  { id: 'groupe-electrogene-500kva', query: 'diesel generator 500kva', alt: 'Groupe électrogène 500kVA puissance secours' },
];

const BAD_WORDS = ['toy', 'cartoon', 'lego', 'miniature', 'drawing', 'render', '3d'];

let manifest = {};
if (fs.existsSync(MANIFEST_PATH)) {
  manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
}

async function downloadImage(machine) {
  const { id, query, alt } = machine;
  const webpPath = path.join(OUTPUT_DIR, `${id}.webp`);
  const avifPath = path.join(OUTPUT_DIR, `${id}.avif`);

  // MANUAL OVERRIDE CHECK : Si le fichier webp existe déjà, on ne le retélécharge pas (Sauf si manifest absent)
  if (fs.existsSync(webpPath) && manifest[id]) {
    console.log(`✅ ${id} déjà présent (Respect de l'override manuel).`);
    return;
  }

  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: PIXABAY_API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        min_width: 1200,
        editors_choice: true,
        per_page: 5
      }
    });

    const hits = response.data.hits;
    if (!hits || hits.length === 0) {
      console.log(`❌ Aucune image trouvée pour ${id} (${query})`);
      return;
    }

    const bestHit = hits.find(hit => {
      const tags = hit.tags.toLowerCase();
      return !BAD_WORDS.some(word => tags.includes(word));
    }) || hits[0];

    console.log(`⬇️ Traitement de ${id}...`);
    const imageResponse = await axios.get(bestHit.largeImageURL, { responseType: 'arraybuffer' });
    const buffer = imageResponse.data;

    // GENERATION WEBP
    const webpBuffer = await sharp(buffer)
      .webp({ quality: 80 })
      .resize(1200, 800, { fit: 'cover' })
      .toBuffer();
    fs.writeFileSync(webpPath, webpBuffer);

    // GENERATION AVIF
    const avifBuffer = await sharp(buffer)
      .avif({ quality: 65 })
      .resize(1200, 800, { fit: 'cover' })
      .toBuffer();
    fs.writeFileSync(avifPath, avifBuffer);

    // MISE À JOUR MANIFEST
    manifest[id] = {
      file: `${id}.webp`,
      avif: `${id}.avif`,
      alt: alt,
      width: 1200,
      height: 800,
      sizeKb: Math.round(webpBuffer.length / 1024),
      source: 'pixabay',
      validated: true,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    console.log(`✨ ${id} terminé (WebP + AVIF + Manifest).`);

  } catch (error) {
    console.error(`💥 Erreur pour ${id}:`, error.message);
  }
}

async function main() {
  if (!PIXABAY_API_KEY) {
    console.error('🛑 ERREUR: PIXABAY_API_KEY manquante dans .env');
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const limit = pLimit(3);
  await Promise.all(MACHINES.map(m => limit(() => downloadImage(m))));

  // SAUVEGARDE DU MANIFEST
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log('🚀 Pipeline DAM terminé avec succès !');
}

main();
