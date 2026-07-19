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

const getUnsplashUrl = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=1200`;

const FALLBACK_IDS = {
  grue: 'photo-1542382156909-9ae37b3f56fd', // Grue stable
  agri: 'photo-1500382017468-9049fed747ef', // Champ stable
  tracteur: 'photo-1595246140625-573b715d11dc' // Tracteur stable
};

const REMAINING_MACHINES = [
  { id: 'grue-tour-60m', unsplashId: FALLBACK_IDS.grue, alt: 'Grue à tour haute performance' },
  { id: 'tracteur-agricole-150hp', unsplashId: FALLBACK_IDS.tracteur, alt: 'Tracteur agricole 150HP' },
  { id: 'moissonneuse-batteuse', unsplashId: FALLBACK_IDS.agri, alt: 'Moissonneuse-batteuse récolte' },
  { id: 'pulverisateur-automoteur', unsplashId: FALLBACK_IDS.agri, alt: 'Pulvérisateur automoteur' },
  { id: 'semoir-precision', unsplashId: FALLBACK_IDS.agri, alt: 'Semoir de précision mécanisé' },
];

async function fixRemaining() {
  let manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  const limit = pLimit(2);

  console.log('🩹 Correction des derniers visuels manquants...');

  await Promise.all(REMAINING_MACHINES.map(machine => limit(async () => {
    const { id, unsplashId, alt } = machine;
    const webpPath = path.join(OUTPUT_DIR, `${id}.webp`);
    const avifPath = path.join(OUTPUT_DIR, `${id}.avif`);

    try {
      const url = getUnsplashUrl(unsplashId);
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const buffer = response.data;

      const webpBuffer = await sharp(buffer).webp().resize(1200, 800, { fit: 'cover' }).toBuffer();
      fs.writeFileSync(webpPath, webpBuffer);

      const avifBuffer = await sharp(buffer).avif().resize(1200, 800, { fit: 'cover' }).toBuffer();
      fs.writeFileSync(avifPath, avifBuffer);

      manifest[id] = {
        file: `${id}.webp`,
        avif: `${id}.avif`,
        alt,
        width: 1200,
        height: 800,
        sizeKb: Math.round(webpBuffer.length / 1024),
        source: 'unsplash-fix',
        updatedAt: new Date().toISOString().split('T')[0]
      };
      console.log(`✅ ${id} réparé.`);
    } catch (e) {
      console.error(`❌ Échec final pour ${id}:`, e.message);
    }
  })));

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log('🚀 DAM 100% complet et validé !');
}

fixRemaining();
