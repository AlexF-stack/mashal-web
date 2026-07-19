import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pLimit from 'p-limit';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../public/images/machines');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'manifest.json');

const GET_URL = (query) => `https://loremflickr.com/1200/800/${encodeURIComponent(query)}/all`;

const MACHINES = [
  { id: 'auto-betonniere-3-5m3', query: 'concrete,mixer,truck', alt: 'Auto-bétonnière industrielle' },
  { id: 'pelle-hydraulique-20t', query: 'excavator,construction', alt: 'Pelle hydraulique 20 tonnes' },
  { id: 'pelle-pneus-15t', query: 'wheeled,excavator', alt: 'Pelle sur pneus construction' },
  { id: 'tractopelle-premium-4wd', query: 'backhoe,loader', alt: 'Tractopelle lourde' },
  { id: 'mini-pelle-compacte', query: 'mini,excavator', alt: 'Mini-pelle de précision' },
  { id: 'grue-tour-60m', query: 'tower,crane,construction', alt: 'Grue à tour de chantier' },
  { id: 'pompe-beton-37m', query: 'concrete,pump,truck', alt: 'Pompe à béton articulée' },
  { id: 'betonniere-portee-10m3', query: 'cement,mixer,truck', alt: 'Bétonnière portée malaxeur' },
  { id: 'pelle-miniere-33t', query: 'mining,excavator', alt: 'Pelle minière d\'extraction' },
  { id: 'pelle-lourde-45t', query: 'heavy,excavator', alt: 'Pelle lourde de carrière' },
  { id: 'pelle-extraction-60t', query: 'huge,excavator,mining', alt: 'Pelle d\'extraction géante' },
  { id: 'bulldozer-d6', query: 'bulldozer,earthmoving', alt: 'Bulldozer D6 terrassement' },
  { id: 'bulldozer-d8', query: 'heavy,bulldozer', alt: 'Bulldozer D8 haute puissance' },
  { id: 'camion-hors-route-100t', query: 'mining,dump,truck', alt: 'Camion minier 100 tonnes' },
  { id: 'foreuse-rotative-lourde', query: 'drilling,rig,mining', alt: 'Foreuse rotative de mine' },
  { id: 'niveleuse-160hp', query: 'motor,grader,road', alt: 'Niveleuse de route' },
  { id: 'compacteur-monobille-12t', query: 'soil,compactor,roller', alt: 'Compacteur de sol 12 tonnes' },
  { id: 'finisseur-asphalte-6m', query: 'asphalt,paver,road', alt: 'Finisseur d\'enrobé 6m' },
  { id: 'rouleau-tandem-9t', query: 'tandem,roller,road', alt: 'Rouleau tandem finition' },
  { id: 'balayeuse-voirie', query: 'street,sweeper,truck', alt: 'Balayeuse de voirie' },
  { id: 'repandeuse-bitume', query: 'bitumen,sprayer,truck', alt: 'Répandeuse de bitume routière' },
  { id: 'gravillonneur-automoteur', query: 'chip,spreader,road', alt: 'Gravillonneur de route' },
  { id: 'chariot-elevateur-5t', query: 'forklift,diesel', alt: 'Chariot élévateur logistique' },
  { id: 'chariot-telescopique-7m', query: 'telehandler,construction', alt: 'Chariot télescopique 7m' },
  { id: 'chargeuse-pneus-3t', query: 'wheel,loader,industrial', alt: 'Chargeuse industrielle' },
  { id: 'camion-benne-6x4', query: 'dump,truck,6x4', alt: 'Camion benne 6x4' },
  { id: 'pont-roulant-20t', query: 'overhead,crane,factory', alt: 'Pont roulant industriel' },
  { id: 'transpalette-electrique', query: 'electric,pallet,jack', alt: 'Transpalette électrique' },
  { id: 'tracteur-agricole-150hp', query: 'farm,tractor', alt: 'Tracteur agricole puissant' },
  { id: 'moissonneuse-batteuse', query: 'combine,harvester', alt: 'Moissonneuse-batteuse champ' },
  { id: 'pulverisateur-automoteur', query: 'crop,sprayer', alt: 'Pulvérisateur agricole' },
  { id: 'semoir-precision', query: 'seed,drill', alt: 'Semoir de précision' },
  { id: 'presse-balles-hydraulique', query: 'waste,baler', alt: 'Presse à balles de déchets' },
  { id: 'broyeur-dechets-lourd', query: 'industrial,shredder', alt: 'Broyeur industriel lourd' },
  { id: 'compacteur-decharge', query: 'landfill,compactor', alt: 'Compacteur de décharge' },
  { id: 'dechiqueteur-bois', query: 'wood,chipper', alt: 'Déchiqueteur de bois' },
  { id: 'groupe-electrogene-100kva', query: 'diesel,generator', alt: 'Groupe électrogène 100kVA' },
  { id: 'groupe-electrogene-500kva', query: 'diesel,generator', alt: 'Groupe électrogène 500kVA' },
];

async function initialize() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let manifest = {};
  const limit = pLimit(2); // Doucement pour éviter les bans IP

  console.log('🚀 INITIALISATION DU DAM (Méthode robuste LoremFlickr)...');

  await Promise.all(MACHINES.map(machine => limit(async () => {
    const { id, query, alt } = machine;
    const webpPath = path.join(OUTPUT_DIR, `${id}.webp`);
    const avifPath = path.join(OUTPUT_DIR, `${id}.avif`);

    try {
      const url = GET_URL(query);
      console.log(`⬇️ Téléchargement de ${id}...`);
      
      const response = await axios.get(url, { responseType: 'arraybuffer', timeout: 30000 });
      const buffer = response.data;

      // WebP
      const webpBuffer = await sharp(buffer)
        .webp({ quality: 80 })
        .resize(1200, 800, { fit: 'cover' })
        .toBuffer();
      fs.writeFileSync(webpPath, webpBuffer);

      // AVIF
      const avifBuffer = await sharp(buffer)
        .avif({ quality: 65 })
        .resize(1200, 800, { fit: 'cover' })
        .toBuffer();
      fs.writeFileSync(avifPath, avifBuffer);

      manifest[id] = {
        file: `${id}.webp`,
        avif: `${id}.avif`,
        alt,
        width: 1200,
        height: 800,
        sizeKb: Math.round(webpBuffer.length / 1024),
        source: 'loremflickr-industrial',
        updatedAt: new Date().toISOString().split('T')[0]
      };

      console.log(`✅ ${id} OK.`);
    } catch (e) {
      console.error(`❌ Échec pour ${id}:`, e.message);
    }
  })));

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log('🏁 DAM REMPLI AVEC DES VISUELS MÉTIER LOCAUX !');
}

initialize();
