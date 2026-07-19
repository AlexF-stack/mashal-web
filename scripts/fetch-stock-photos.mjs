import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pLimit from "p-limit";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "../public/images/machines");
const MANIFEST_PATH = path.join(OUTPUT_DIR, "manifest.json");

// Machines that still need real photos (placeholders / family overrides excluded if already good)
const MACHINES = [
  { id: "auto-betonniere-3-5m3", queries: ["concrete mixer truck", "cement mixer truck construction"] },
  { id: "pelle-pneus-15t", queries: ["wheeled excavator", "mobile excavator tires"] },
  { id: "tractopelle-premium-4wd", queries: ["backhoe loader", "JCB backhoe"] },
  { id: "mini-pelle-compacte", queries: ["mini excavator", "compact excavator construction"] },
  { id: "pompe-beton-37m", queries: ["concrete pump truck", "boom concrete pump"] },
  { id: "betonniere-portee-10m3", queries: ["ready mix concrete truck", "transit mixer truck"] },
  { id: "camion-hors-route-100t", queries: ["mining dump truck", "haul truck quarry"] },
  { id: "foreuse-rotative-lourde", queries: ["drilling rig", "rotary drill mining"] },
  { id: "niveleuse-160hp", queries: ["motor grader", "road grader construction"] },
  { id: "compacteur-monobille-12t", queries: ["soil compact roller", "single drum roller"] },
  { id: "finisseur-asphalte-6m", queries: ["asphalt paver", "road paver machine"] },
  { id: "rouleau-tandem-9t", queries: ["tandem roller", "asphalt roller road"] },
  { id: "repandeuse-bitume", queries: ["bitumen sprayer", "asphalt distributor truck"] },
  { id: "gravillonneur-automoteur", queries: ["chip spreader", "aggregate spreader road"] },
  { id: "chariot-elevateur-5t", queries: ["forklift warehouse", "industrial forklift outdoor"] },
  { id: "chariot-telescopique-7m", queries: ["telehandler", "telescopic handler construction"] },
  { id: "chargeuse-pneus-3t", queries: ["wheel loader", "front end loader construction"] },
  { id: "camion-benne-6x4", queries: ["dump truck construction", "tipper truck"] },
  { id: "pont-roulant-20t", queries: ["overhead crane factory", "bridge crane industrial"] },
  { id: "transpalette-electrique", queries: ["electric pallet jack", "pallet truck warehouse"] },
  { id: "tracteur-agricole-150hp", queries: ["farm tractor field", "agricultural tractor"] },
  { id: "pulverisateur-automoteur", queries: ["self propelled sprayer", "crop sprayer"] },
  { id: "semoir-precision", queries: ["seed drill agriculture", "precision seeder"] },
  { id: "presse-balles-hydraulique", queries: ["waste baler", "hydraulic baler recycling"] },
  { id: "compacteur-decharge", queries: ["landfill compactor", "refuse compact roller"] },
  // Also refresh family-shared ones with dedicated shots when possible
  { id: "bulldozer-d8", queries: ["heavy bulldozer", "Caterpillar bulldozer D8"] },
  { id: "pelle-miniere-33t", queries: ["mining excavator", "quarry excavator"] },
  { id: "pelle-lourde-45t", queries: ["large excavator construction", "heavy hydraulic excavator"] },
  { id: "pelle-extraction-60t", queries: ["large mining excavator", "quarry digger"] },
  { id: "groupe-electrogene-500kva", queries: ["diesel generator industrial", "power generator outdoor"] },
  { id: "broyeur-dechets-lourd", queries: ["industrial shredder", "waste shredder machine"] },
  { id: "balayeuse-aspiratrice", queries: ["street sweeper truck", "road sweeper"] },
];

const BAD = /toy|lego|cartoon|miniature|drawing|clipart|illustration|logo|diagram|schematic/i;

let manifest = {};
if (fs.existsSync(MANIFEST_PATH)) {
  manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
}

async function searchOpenverse(query) {
  const { data } = await axios.get("https://api.openverse.org/v1/images/", {
    params: {
      q: query,
      license_type: "commercial,modification",
      category: "photograph",
      size: "large",
      page_size: 8,
    },
    timeout: 20000,
    headers: { "User-Agent": "MashalEquipmentBot/1.0 (catalog assets)" },
  });
  return (data.results || []).filter(
    (r) => r.url && r.width >= 800 && !BAD.test(`${r.title || ""} ${r.tags?.join?.(" ") || ""}`),
  );
}

async function searchWikimedia(query) {
  const { data } = await axios.get("https://commons.wikimedia.org/w/api.php", {
    params: {
      action: "query",
      format: "json",
      generator: "search",
      gsrsearch: `${query} filetype:bitmap`,
      gsrlimit: 8,
      prop: "imageinfo",
      iiprop: "url|size|mime",
      iiurlwidth: 1280,
    },
    timeout: 20000,
    headers: { "User-Agent": "MashalEquipmentBot/1.0 (catalog assets)" },
  });
  const pages = Object.values(data.query?.pages || {});
  return pages
    .map((p) => {
      const info = p.imageinfo?.[0];
      if (!info?.url) return null;
      if (!/^image\/(jpeg|png|webp)/i.test(info.mime || "")) return null;
      if ((info.width || 0) < 700) return null;
      if (BAD.test(p.title || "")) return null;
      return {
        url: info.thumburl || info.url,
        width: info.width,
        title: p.title,
      };
    })
    .filter(Boolean);
}

async function fetchCandidates(queries) {
  const all = [];
  for (const q of queries) {
    try {
      const ov = await searchOpenverse(q);
      all.push(...ov.map((r) => ({ url: r.url, source: "openverse", title: r.title })));
    } catch (e) {
      console.warn(`  openverse fail (${q}): ${e.message}`);
    }
    try {
      const wm = await searchWikimedia(q);
      all.push(...wm.map((r) => ({ url: r.url, source: "wikimedia", title: r.title })));
    } catch (e) {
      console.warn(`  wikimedia fail (${q}): ${e.message}`);
    }
    if (all.length >= 3) break;
  }
  return all;
}

async function downloadAndConvert(id, imageUrl, source) {
  const response = await axios.get(imageUrl, {
    responseType: "arraybuffer",
    timeout: 45000,
    headers: { "User-Agent": "MashalEquipmentBot/1.0 (catalog assets)" },
  });
  const buffer = Buffer.from(response.data);

  const webpPath = path.join(OUTPUT_DIR, `${id}.webp`);
  const avifPath = path.join(OUTPUT_DIR, `${id}.avif`);

  const webpBuffer = await sharp(buffer)
    .rotate()
    .resize(1200, 800, { fit: "cover" })
    .webp({ quality: 80 })
    .toBuffer();
  fs.writeFileSync(webpPath, webpBuffer);

  const avifBuffer = await sharp(buffer)
    .rotate()
    .resize(1200, 800, { fit: "cover" })
    .avif({ quality: 65 })
    .toBuffer();
  fs.writeFileSync(avifPath, avifBuffer);

  manifest[id] = {
    file: `${id}.webp`,
    avif: `${id}.avif`,
    width: 1200,
    height: 800,
    sizeKb: Math.round(webpBuffer.length / 1024),
    source,
    validated: true,
    updatedAt: new Date().toISOString().split("T")[0],
  };
}

async function processMachine(machine) {
  const { id, queries } = machine;
  console.log(`🔎 ${id}…`);
  const candidates = await fetchCandidates(queries);
  if (!candidates.length) {
    console.log(`❌ ${id}: aucune source`);
    return false;
  }

  for (const candidate of candidates.slice(0, 5)) {
    try {
      await downloadAndConvert(id, candidate.url, candidate.source);
      console.log(`✨ ${id} ← ${candidate.source} (${manifest[id].sizeKb} KB)`);
      return true;
    } catch (e) {
      console.warn(`  retry ${id}: ${e.message}`);
    }
  }
  console.log(`❌ ${id}: téléchargements échoués`);
  return false;
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const limit = pLimit(2);
  const results = await Promise.all(
    MACHINES.map((m) => limit(() => processMachine(m))),
  );
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  const ok = results.filter(Boolean).length;
  console.log(`\n🚀 Terminé: ${ok}/${MACHINES.length} images mises à jour`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
