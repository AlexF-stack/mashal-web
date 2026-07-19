import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.resolve(
  "C:/Users/ALEX/.cursor/projects/c-Users-ALEX-Desktop-marshal/assets",
);
const OUT = path.join(__dirname, "../public/images/machines");
const MANIFEST_PATH = path.join(OUT, "manifest.json");

const IDS = [
  "auto-betonniere-3-5m3",
  "pompe-beton-37m",
  "betonniere-portee-10m3",
  "niveleuse-160hp",
  "compacteur-monobille-12t",
  "finisseur-asphalte-6m",
  "repandeuse-bitume",
  "gravillonneur-automoteur",
  "chariot-telescopique-7m",
  "pulverisateur-automoteur",
  "presse-balles-hydraulique",
  "compacteur-decharge",
  "pelle-extraction-60t",
  "groupe-electrogene-500kva",
];

const manifest = fs.existsSync(MANIFEST_PATH)
  ? JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"))
  : {};

for (const id of IDS) {
  const input = path.join(ASSETS, `${id}.png`);
  if (!fs.existsSync(input)) {
    console.error(`missing ${id}`);
    continue;
  }

  const webpBuf = await sharp(input)
    .rotate()
    .resize(1200, 800, { fit: "cover" })
    .webp({ quality: 80 })
    .toBuffer();
  const avifBuf = await sharp(input)
    .rotate()
    .resize(1200, 800, { fit: "cover" })
    .avif({ quality: 65 })
    .toBuffer();

  fs.writeFileSync(path.join(OUT, `${id}.webp`), webpBuf);
  fs.writeFileSync(path.join(OUT, `${id}.avif`), avifBuf);

  manifest[id] = {
    file: `${id}.webp`,
    avif: `${id}.avif`,
    width: 1200,
    height: 800,
    sizeKb: Math.round(webpBuf.length / 1024),
    source: "ai-generated",
    validated: true,
    updatedAt: new Date().toISOString().split("T")[0],
  };
  console.log(`✨ ${id} (${manifest[id].sizeKb} KB)`);
}

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log("done");
