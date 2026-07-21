import fs from "node:fs";
import path from "node:path";
import { createCanvas, Image } from "canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

if (!globalThis.Image) {
  globalThis.Image = Image;
}

const pdfPath = path.resolve("public/documents/Catalogue_Mashal_Equipment.pdf");
const outDir = path.resolve("scripts/catalogue-pages");

fs.mkdirSync(outDir, { recursive: true });

const data = new Uint8Array(fs.readFileSync(pdfPath));
const pdf = await getDocument({
  data,
  useSystemFonts: true,
  disableWorker: true,
}).promise;

for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
  const page = await pdf.getPage(pageNum);
  const viewport = page.getViewport({ scale: 2 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const context = canvas.getContext("2d");

  await page.render({ canvasContext: context, viewport }).promise;

  const outPath = path.join(outDir, `page-${String(pageNum).padStart(2, "0")}.png`);
  fs.writeFileSync(outPath, canvas.toBuffer("image/png"));
  console.log(`Wrote ${outPath}`);
}

console.log(`Done: ${pdf.numPages} pages`);
