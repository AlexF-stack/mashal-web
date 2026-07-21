/**
 * Assigne 1 image par machine en maximisant l'unicité (52 machines, 38 photos).
 * 1) préfère l'image type si libre  2) sinon première image libre  3) sinon recycle
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cataloguePath = path.join(__dirname, "../src/data/machines-catalogue.ts");

const UNIQUE_POOL = [
  "tractopelle-premium-4wd",
  "camion-benne-6x4",
  "pelle-hydraulique-20t",
  "chargeuse-pneus-3t",
  "bulldozer-d6",
  "mini-pelle-compacte",
  "auto-betonniere-3-5m3",
  "betonniere-portee-10m3",
  "pompe-beton-37m",
  "presse-balles-hydraulique",
  "balayeuse-voirie",
  "niveleuse-160hp",
  "compacteur-monobille-12t",
  "rouleau-tandem-9t",
  "finisseur-asphalte-6m",
  "camion-hors-route-100t",
  "bulldozer-d8",
  "pelle-miniere-33t",
  "pelle-extraction-60t",
  "broyeur-dechets-lourd",
  "compacteur-decharge",
  "foreuse-rotative-lourde",
  "pelle-lourde-45t",
  "pelle-pneus-15t",
  "gravillonneur-automoteur",
  "repandeuse-bitume",
  "balayeuse-aspiratrice",
  "chariot-elevateur-5t",
  "chariot-telescopique-7m",
  "transpalette-electrique",
  "pont-roulant-20t",
  "grue-tour-60m",
  "moissonneuse-batteuse",
  "pulverisateur-automoteur",
  "semoir-precision",
  "dechiqueteur-bois",
  "groupe-electrogene-100kva",
  "groupe-electrogene-500kva",
];

const preferred = {
  "tractopelle-cat-450e": "tractopelle-premium-4wd",
  "camion-articule-cat-730": "camion-benne-6x4",
  "pelle-cat-315cl": "pelle-hydraulique-20t",
  "chargeuse-cat-966g": "chargeuse-pneus-3t",
  "tracteur-decapeuse-cat-627g": "bulldozer-d6",
  "mini-pelle-cat-3015": "mini-pelle-compacte",
  "betonniere-malaxeur-500l": "auto-betonniere-3-5m3",
  "betonniere-monte-charge-510l": "betonniere-portee-10m3",
  "pompe-beton-remorque": "pompe-beton-37m",
  "aiguille-vibrante-26mm": "presse-balles-hydraulique",
  "pilonneuse-essence": "balayeuse-voirie",
  "niveleuse-cat-160h": "niveleuse-160hp",
  "compacteur-cp56-cat": "compacteur-monobille-12t",
  "compacteur-cs56-cat": "rouleau-tandem-9t",
  "compacteur-bw65h": "finisseur-asphalte-6m",
  "camion-tout-terrain-cat-772": "camion-hors-route-100t",
  "tracteur-chenilles-cat-d9t": "bulldozer-d8",
  "pelle-miniere-xe950pro": "pelle-miniere-33t",
  "pelle-xe3000e": "pelle-extraction-60t",
  "concassage-xft1860e": "broyeur-dechets-lourd",
  "concasseur-mobile-granulats": "compacteur-decharge",
  "forage-tunnel-xud235c": "foreuse-rotative-lourde",
  "forage-xr240e": "pelle-lourde-45t",
  "forage-smartroc-d65": "pelle-pneus-15t",
  "tombereau-xda40": "gravillonneur-automoteur",
  "niveleuse-gr5505tiv": "repandeuse-bitume",
  "chargeuse-souterraine-xul621": "balayeuse-aspiratrice",
  "camion-mine-xut320": "camion-hors-route-100t",
  "chargeuse-volvo-l350h": "chargeuse-pneus-3t",
  "pelle-volvo-ec550e": "pelle-hydraulique-20t",
  "chariot-elevateur": "chariot-elevateur-5t",
  "chariot-contrebalance-7t": "chariot-telescopique-7m",
  "chariot-mat-retractable": "pont-roulant-20t",
  "chariot-tridirectionnel": "transpalette-electrique",
  "gerbeur-plateforme-l14": "groupe-electrogene-100kva",
  "transpalette-electrique-catalogue": "groupe-electrogene-500kva",
  "grue-automotrice": "grue-tour-60m",
  "nacelle-ciseaux-120sc": "chariot-elevateur-5t",
  "camion-nacelle-53m": "grue-tour-60m",
  "camion-grue-160t": "camion-benne-6x4",
  "tracteur-7515": "moissonneuse-batteuse",
  "tracteur-7515-cab": "pulverisateur-automoteur",
  "tracteur-enjambeur-5105mh": "semoir-precision",
  "tracteur-t68": "dechiqueteur-bois",
  "tracteur-mf-9s": "moissonneuse-batteuse",
  "transporteur-arst-evo5": "camion-benne-6x4",
  "transporteur-ct-2places": "balayeuse-aspiratrice",
  "remorque-bascule-1essieu": "camion-benne-6x4",
  "benne-tandem-12-18t": "camion-hors-route-100t",
  "groupe-electrogene-7500w": "groupe-electrogene-100kva",
  "groupe-electrogene-triphase": "groupe-electrogene-500kva",
  "groupe-electrogene-40kva": "groupe-electrogene-100kva",
};

const ORDER = Object.keys(preferred);
const used = new Set();
const assignment = {};

// Pass 1: preferred if free
for (const id of ORDER) {
  const want = preferred[id];
  if (!used.has(want)) {
    assignment[id] = want;
    used.add(want);
  }
}

// Pass 2: any unused image for remaining
for (const id of ORDER) {
  if (assignment[id]) continue;
  const next = UNIQUE_POOL.find((img) => !used.has(img));
  if (next) {
    assignment[id] = next;
    used.add(next);
  }
}

// Pass 3: recycle least-used preferred family images
const recycleOrder = [
  "pelle-lourde-45t",
  "pelle-pneus-15t",
  "finisseur-asphalte-6m",
  "repandeuse-bitume",
  "gravillonneur-automoteur",
  "balayeuse-voirie",
  "presse-balles-hydraulique",
  "dechiqueteur-bois",
  "semoir-precision",
  "pulverisateur-automoteur",
  "pont-roulant-20t",
  "chariot-telescopique-7m",
  "rouleau-tandem-9t",
  "betonniere-portee-10m3",
];
let ri = 0;
for (const id of ORDER) {
  if (assignment[id]) continue;
  assignment[id] = recycleOrder[ri % recycleOrder.length];
  ri += 1;
}

let src = fs.readFileSync(cataloguePath, "utf8");
for (const [id, imageId] of Object.entries(assignment)) {
  const re = new RegExp(`("id": "${id}"[\\s\\S]*?"image_id": ")[^"]+(")`, "m");
  if (!re.test(src)) {
    console.warn("Missing:", id);
    continue;
  }
  src = src.replace(re, `$1${imageId}$2`);
}
fs.writeFileSync(cataloguePath, src);

const counts = {};
for (const img of Object.values(assignment)) counts[img] = (counts[img] || 0) + 1;
const dups = Object.entries(counts)
  .filter(([, c]) => c > 1)
  .sort((a, b) => b[1] - a[1]);

console.log("Assigned", Object.keys(assignment).length);
console.log("Max reuse:", dups[0] || "none");
console.log("All duplicates:", dups);
