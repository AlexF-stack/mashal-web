import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pLimit from 'p-limit';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../public/images/machines');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'manifest.json');

const MACHINES = [
  { id: 'auto-betonniere-3-5m3', alt: 'Auto-bétonnière industrielle' },
  { id: 'pelle-hydraulique-20t', alt: 'Pelle hydraulique 20 tonnes' },
  { id: 'pelle-pneus-15t', alt: 'Pelle sur pneus construction' },
  { id: 'tractopelle-premium-4wd', alt: 'Tractopelle lourde' },
  { id: 'mini-pelle-compacte', alt: 'Mini-pelle de précision' },
  { id: 'grue-tour-60m', alt: 'Grue à tour de chantier' },
  { id: 'pompe-beton-37m', alt: 'Pompe à béton articulée' },
  { id: 'betonniere-portee-10m3', alt: 'Bétonnière portée malaxeur' },
  { id: 'pelle-miniere-33t', alt: 'Pelle minière d\'extraction' },
  { id: 'pelle-lourde-45t', alt: 'Pelle lourde de carrière' },
  { id: 'pelle-extraction-60t', alt: 'Pelle d\'extraction géante' },
  { id: 'bulldozer-d6', alt: 'Bulldozer D6 terrassement' },
  { id: 'bulldozer-d8', alt: 'Bulldozer D8 haute puissance' },
  { id: 'camion-hors-route-100t', alt: 'Camion minier 100 tonnes' },
  { id: 'foreuse-rotative-lourde', alt: 'Foreuse rotative de mine' },
  { id: 'niveleuse-160hp', alt: 'Niveleuse de route' },
  { id: 'compacteur-monobille-12t', alt: 'Compacteur de sol 12 tonnes' },
  { id: 'finisseur-asphalte-6m', alt: 'Finisseur d\'enrobé 6m' },
  { id: 'rouleau-tandem-9t', alt: 'Rouleau tandem finition' },
  { id: 'balayeuse-voirie', alt: 'Balayeuse de voirie' },
  { id: 'repandeuse-bitume', alt: 'Répandeuse de bitume routière' },
  { id: 'gravillonneur-automoteur', alt: 'Gravillonneur de route' },
  { id: 'chariot-elevateur-5t', alt: 'Chariot élévateur logistique' },
  { id: 'chariot-telescopique-7m', alt: 'Chariot télescopique 7m' },
  { id: 'chargeuse-pneus-3t', alt: 'Chargeuse industrielle' },
  { id: 'camion-benne-6x4', alt: 'Camion benne 6x4' },
  { id: 'pont-roulant-20t', alt: 'Pont roulant industriel' },
  { id: 'transpalette-electrique', alt: 'Transpalette électrique' },
  { id: 'tracteur-agricole-150hp', alt: 'Tracteur agricole puissant' },
  { id: 'moissonneuse-batteuse', alt: 'Moissonneuse-batteuse champ' },
  { id: 'pulverisateur-automoteur', alt: 'Pulvérisateur agricole' },
  { id: 'semoir-precision', alt: 'Semoir de précision' },
  { id: 'presse-balles-hydraulique', alt: 'Presse à balles de déchets' },
  { id: 'broyeur-dechets-lourd', alt: 'Broyeur industriel lourd' },
  { id: 'compacteur-decharge', alt: 'Compacteur de décharge' },
  { id: 'dechiqueteur-bois', alt: 'Déchiqueteur de bois' },
  { id: 'groupe-electrogene-100kva', alt: 'Groupe électrogène 100kVA' },
  { id: 'groupe-electrogene-500kva', alt: 'Groupe électrogène 500kVA' },
];

function generateSVG(id, alt) {
  const title = alt.toUpperCase();
  return `
    <svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="800" fill="#0A0F1C"/>
      <rect x="0" y="0" width="1200" height="800" fill="url(#grid)"/>
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(212,175,55,0.05)" stroke-width="1"/>
        </pattern>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#D4AF37"/>
          <stop offset="100%" stop-color="#8A6D24"/>
        </linearGradient>
      </defs>
      
      <rect x="40" y="40" width="1120" height="720" fill="none" stroke="#D4AF37" stroke-width="2" stroke-opacity="0.3"/>
      <rect x="60" y="60" width="1080" height="680" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" stroke-dasharray="10 10"/>
      
      <circle cx="600" cy="350" r="100" fill="none" stroke="rgba(212,175,55,0.1)" stroke-width="2"/>
      <circle cx="600" cy="350" r="140" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" stroke-dasharray="5 5"/>
      
      <text x="600" y="350" font-family="sans-serif" font-size="80" font-weight="900" fill="url(#gold)" text-anchor="middle" dominant-baseline="middle">M</text>
      
      <text x="600" y="520" font-family="sans-serif" font-size="32" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="4">${title}</text>
      <text x="600" y="580" font-family="monospace" font-size="16" font-weight="400" fill="#D4AF37" text-anchor="middle" letter-spacing="8">A S S E T   P E N D I N G</text>
      
      <text x="80" y="720" font-family="monospace" font-size="12" fill="rgba(255,255,255,0.3)">REF: MASHAL-${id.toUpperCase()}</text>
      <text x="1120" y="720" font-family="monospace" font-size="12" fill="rgba(255,255,255,0.3)" text-anchor="end">SYS.VER: 2.1.0</text>
    </svg>
  `;
}

async function generateBlueprints() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let manifest = {};
  const limit = pLimit(5);

  console.log('🚀 GÉNÉRATION DES BLUEPRINTS PREMIUM (Remplacement des mauvaises images)...');

  await Promise.all(MACHINES.map(machine => limit(async () => {
    const { id, alt } = machine;
    const webpPath = path.join(OUTPUT_DIR, `${id}.webp`);
    const avifPath = path.join(OUTPUT_DIR, `${id}.avif`);

    try {
      const svgBuffer = Buffer.from(generateSVG(id, alt));

      // WebP
      const webpBuffer = await sharp(svgBuffer)
        .webp({ quality: 90 })
        .toBuffer();
      fs.writeFileSync(webpPath, webpBuffer);

      // AVIF
      const avifBuffer = await sharp(svgBuffer)
        .avif({ quality: 80 })
        .toBuffer();
      fs.writeFileSync(avifPath, avifBuffer);

      manifest[id] = {
        file: `${id}.webp`,
        avif: `${id}.avif`,
        alt,
        width: 1200,
        height: 800,
        sizeKb: Math.round(webpBuffer.length / 1024),
        source: 'blueprint-generator',
        updatedAt: new Date().toISOString().split('T')[0]
      };

      console.log(`✅ Blueprint généré pour ${id}.`);
    } catch (e) {
      console.error(`❌ Échec pour ${id}:`, e.message);
    }
  })));

  // Generate default machine as well
  const defaultSvgBuffer = Buffer.from(generateSVG("default-machine", "Visuel Bientôt Disponible"));
  fs.writeFileSync(path.join(OUTPUT_DIR, "default-machine.webp"), await sharp(defaultSvgBuffer).webp({ quality: 90 }).toBuffer());
  fs.writeFileSync(path.join(OUTPUT_DIR, "default-machine.avif"), await sharp(defaultSvgBuffer).avif({ quality: 80 }).toBuffer());


  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log('🏁 TOUTES LES MAUVAISES IMAGES ONT ÉTÉ REMPLACÉES PAR DES BLUEPRINTS PREMIUM !');
}

generateBlueprints();
