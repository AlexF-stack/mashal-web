import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";

const dir = path.resolve("public/images/machines");
const files = (await readdir(dir)).filter((f) => f.endsWith(".jpg"));

for (const file of files) {
  const base = file.replace(/\.jpg$/, "");
  const input = path.join(dir, file);
  const output = path.join(dir, `${base}.webp`);

  const info = await sharp(input)
    .rotate()
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(output);

  console.log(`${base}.webp <- ${file} (${Math.round(info.size / 1024)} KB)`);
}
