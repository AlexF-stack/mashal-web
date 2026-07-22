/**
 * 1) Télécharge des photos libres (Openverse / Wikimedia) pour les familles manquantes
 * 2) Réassigne chaque machine à une image sémantiquement correcte
 */
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pLimit from "p-limit";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "../public/images/machines");
const CATALOGUE = path.join(__dirname, "../src/data/machines-catalogue.ts");
const MANIFEST_PATH = path.join(OUTPUT_DIR, "manifest.json");

const NEW_ASSETS = [
  { id: "aiguille-vibrante", queries: ["concrete vibrator poker", "needle vibrator concrete"] },
  { id: "pilonneuse", queries: ["jumping jack rammer", "trench rammer compaction"] },
  { id: "plaque-vibrante", queries: ["plate compactor", "vibrating plate compaction"] },
  { id: "grue-mobile", queries: ["mobile crane truck", "all terrain crane"] },
  { id: "camion-grue", queries: ["truck mounted crane", "lorry crane boom"] },
  { id: "nacelle-ciseaux", queries: ["scissor lift warehouse", "scissor lift aerial"] },
  { id: "nacelle-camion", queries: ["bucket truck boom lift", "cherry picker truck"] },
  { id: "chariot-retractable", queries: ["reach truck warehouse", "reach forklift"] },
  { id: "chariot-vna", queries: ["very narrow aisle forklift", "turret truck warehouse"] },
  { id: "gerbeur", queries: ["electric stacker warehouse", "walkie stacker"] },
  { id: "tombereau-articule", queries: ["articulated dump truck", "ADT haul truck"] },
  { id: "station-concassage", queries: ["mobile rock crusher", "crushing plant quarry"] },
  { id: "concasseur-mobile", queries: ["jaw crusher mobile", "aggregate crusher"] },
  { id: "jumbo-forage", queries: ["tunnel jumbo drill", "underground drill jumbo"] },
  { id: "foreuse-surface", queries: ["surface drill rig quarry", "blasthole drill"] },
  { id: "lhd-souterraine", queries: ["underground LHD loader", "mining scooptram"] },
  { id: "camion-mine-souterraine", queries: ["underground mining truck", "mine dump truck underground"] },
  { id: "chargeuse-lourde", queries: ["large wheel loader quarry", "heavy front loader mining"] },
  { id: "remorque-agricole", queries: ["farm tipper trailer", "agricultural dump trailer"] },
  { id: "benne-agricole", queries: ["tandem farm trailer", "agricultural trailer grain"] },
  { id: "utv-agricole", queries: ["utility vehicle farm", "side by side UTV agriculture"] },
  { id: "tracteur-cabine", queries: ["farm tractor cabin", "agricultural tractor cab field"] },
  { id: "tracteur-chargeur", queries: ["tractor front loader", "farm tractor with bucket"] },
  { id: "groupe-portable", queries: ["portable diesel generator", "small generator outdoor"] },
  { id: "groupe-tractable", queries: ["trailer mounted generator", "towable generator"] },
  { id: "decapeuse", queries: ["motor scraper earthmoving", "wheel tractor scraper"] },
  { id: "malaxeur-beton", queries: ["portable concrete mixer", "cement mixer drum site"] },
];

/** Mapping machine id → image slug (sémantique) */
const IMAGE_MAP = {
  "tractopelle-cat-450e": "tractopelle-premium-4wd",
  "camion-articule-cat-730": "tombereau-articule",
  "pelle-cat-315cl": "pelle-hydraulique-20t",
  "chargeuse-cat-966g": "chargeuse-pneus-3t",
  "tracteur-decapeuse-cat-627g": "decapeuse",
  "mini-pelle-cat-3015": "mini-pelle-compacte",
  "betonniere-malaxeur-500l": "malaxeur-beton",
  "betonniere-monte-charge-510l": "betonniere-portee-10m3",
  "pompe-beton-remorque": "pompe-beton-37m",
  "aiguille-vibrante-26mm": "aiguille-vibrante",
  "pilonneuse-essence": "pilonneuse",
  "niveleuse-cat-160h": "niveleuse-160hp",
  "compacteur-cp56-cat": "compacteur-monobille-12t",
  "compacteur-cs56-cat": "rouleau-tandem-9t",
  "compacteur-bw65h": "plaque-vibrante",
  "camion-tout-terrain-cat-772": "camion-hors-route-100t",
  "tracteur-chenilles-cat-d9t": "bulldozer-d8",
  "pelle-miniere-xe950pro": "pelle-miniere-33t",
  "pelle-xe3000e": "pelle-extraction-60t",
  "concassage-xft1860e": "station-concassage",
  "concasseur-mobile-granulats": "concasseur-mobile",
  "forage-tunnel-xud235c": "jumbo-forage",
  "forage-xr240e": "foreuse-rotative-lourde",
  "forage-smartroc-d65": "foreuse-surface",
  "tombereau-xda40": "tombereau-articule",
  "niveleuse-gr5505tiv": "niveleuse-160hp",
  "chargeuse-souterraine-xul621": "lhd-souterraine",
  "camion-mine-xut320": "camion-mine-souterraine",
  "chargeuse-volvo-l350h": "chargeuse-lourde",
  "pelle-volvo-ec550e": "pelle-lourde-45t",
  "chariot-elevateur": "chariot-elevateur-5t",
  "chariot-contrebalance-7t": "chariot-elevateur-5t",
  "chariot-mat-retractable": "chariot-retractable",
  "chariot-tridirectionnel": "chariot-vna",
  "gerbeur-plateforme-l14": "gerbeur",
  "transpalette-electrique-catalogue": "transpalette-electrique",
  "grue-automotrice": "grue-mobile",
  "nacelle-ciseaux-120sc": "nacelle-ciseaux",
  "camion-nacelle-53m": "nacelle-camion",
  "camion-grue-160t": "camion-grue",
  "tracteur-7515": "tracteur-agricole-150hp",
  "tracteur-7515-cab": "tracteur-cabine",
  "tracteur-enjambeur-5105mh": "tracteur-agricole-150hp",
  "tracteur-t68": "tracteur-chargeur",
  "tracteur-mf-9s": "tracteur-cabine",
  "transporteur-arst-evo5": "utv-agricole",
  "transporteur-ct-2places": "utv-agricole",
  "remorque-bascule-1essieu": "remorque-agricole",
  "benne-tandem-12-18t": "benne-agricole",
  "groupe-electrogene-7500w": "groupe-portable",
  "groupe-electrogene-triphase": "groupe-electrogene-500kva",
  "groupe-electrogene-40kva": "groupe-tractable",
};

const BAD = /toy|lego|cartoon|miniature|drawing|clipart|illustration|logo|diagram|schematic|icon|svg/i;

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
      page_size: 10,
    },
    timeout: 25000,
    headers: { "User-Agent": "MashalEquipmentBot/1.0 (catalog assets)" },
  });
  return (data.results || []).filter(
    (r) => r.url && (r.width || 0) >= 600 && !BAD.test(`${r.title || ""}`),
  );
}

async function searchWikimedia(query) {
  const { data } = await axios.get("https://commons.wikimedia.org/w/api.php", {
    params: {
      action: "query",
      format: "json",
      generator: "search",
      gsrsearch: `${query} filetype:bitmap`,
      gsrlimit: 10,
      prop: "imageinfo",
      iiprop: "url|size|mime",
      iiurlwidth: 1280,
    },
    timeout: 25000,
    headers: { "User-Agent": "MashalEquipmentBot/1.0 (catalog assets)" },
  });
  const pages = Object.values(data.query?.pages || {});
  return pages
    .map((p) => {
      const info = p.imageinfo?.[0];
      if (!info?.url) return null;
      if (!/^image\/(jpeg|png|webp)/i.test(info.mime || "")) return null;
      if ((info.width || 0) < 600) return null;
      if (BAD.test(p.title || "")) return null;
      return { url: info.thumburl || info.url, width: info.width, title: p.title };
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
      console.warn(`  openverse (${q}): ${e.message}`);
    }
    try {
      const wm = await searchWikimedia(q);
      all.push(...wm.map((r) => ({ url: r.url, source: "wikimedia", title: r.title })));
    } catch (e) {
      console.warn(`  wikimedia (${q}): ${e.message}`);
    }
    if (all.length >= 4) break;
  }
  return all;
}

async function downloadAndConvert(id, imageUrl, source) {
  const response = await axios.get(imageUrl, {
    responseType: "arraybuffer",
    timeout: 60000,
    headers: { "User-Agent": "MashalEquipmentBot/1.0 (catalog assets)" },
    maxRedirects: 5,
  });
  const buffer = Buffer.from(response.data);
  if (buffer.length < 8000) throw new Error("fichier trop petit");

  const webpPath = path.join(OUTPUT_DIR, `${id}.webp`);
  const webpBuffer = await sharp(buffer)
    .rotate()
    .resize(1200, 800, { fit: "cover" })
    .webp({ quality: 82 })
    .toBuffer();
  fs.writeFileSync(webpPath, webpBuffer);

  manifest[id] = {
    file: `${id}.webp`,
    width: 1200,
    height: 800,
    sizeKb: Math.round(webpBuffer.length / 1024),
    source,
    validated: true,
    updatedAt: new Date().toISOString().split("T")[0],
  };
}

async function processAsset(asset, force = false) {
  const webpPath = path.join(OUTPUT_DIR, `${asset.id}.webp`);
  if (!force && fs.existsSync(webpPath) && fs.statSync(webpPath).size > 20000) {
    console.log(`⏭  ${asset.id} déjà présent`);
    return true;
  }
  console.log(`🔎 ${asset.id}…`);
  const candidates = await fetchCandidates(asset.queries);
  if (!candidates.length) {
    console.log(`❌ ${asset.id}: aucune source`);
    return false;
  }
  for (const c of candidates.slice(0, 6)) {
    try {
      await downloadAndConvert(asset.id, c.url, c.source);
      console.log(`✨ ${asset.id} ← ${c.source} (${manifest[asset.id].sizeKb} KB)`);
      return true;
    } catch (e) {
      console.warn(`  retry: ${e.message}`);
    }
  }
  console.log(`❌ ${asset.id}: échec`);
  return false;
}

function updateCatalogue() {
  let src = fs.readFileSync(CATALOGUE, "utf8");
  let updated = 0;
  for (const [machineId, imageId] of Object.entries(IMAGE_MAP)) {
    const re = new RegExp(
      `("id":\\s*"${machineId}"[\\s\\S]*?"image_id":\\s*")([^"]+)(")`,
      "m",
    );
    if (re.test(src)) {
      src = src.replace(re, `$1${imageId}$3`);
      updated++;
    } else {
      console.warn(`⚠ machine introuvable: ${machineId}`);
    }
  }
  fs.writeFileSync(CATALOGUE, src);
  console.log(`\n📝 Catalogue: ${updated}/${Object.keys(IMAGE_MAP).length} image_id mis à jour`);
}

function verifyFiles() {
  const missing = [];
  for (const img of new Set(Object.values(IMAGE_MAP))) {
    const p = path.join(OUTPUT_DIR, `${img}.webp`);
    if (!fs.existsSync(p) || fs.statSync(p).size < 10000) missing.push(img);
  }
  if (missing.length) {
    console.log(`\n⚠ Images manquantes ou trop petites:\n  - ${missing.join("\n  - ")}`);
  } else {
    console.log("\n✅ Toutes les images référencées sont présentes");
  }
  return missing;
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const force = process.argv.includes("--force");
  const limit = pLimit(2);
  const results = await Promise.all(
    NEW_ASSETS.map((a) => limit(() => processAsset(a, force))),
  );
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\n📥 Téléchargements: ${results.filter(Boolean).length}/${NEW_ASSETS.length}`);

  updateCatalogue();
  const missing = verifyFiles();
  if (missing.length) process.exitCode = 2;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
