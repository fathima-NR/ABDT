import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const source = process.argv[2];
const outDir = path.resolve("public/assets");
const outLogo = path.join(outDir, "abdt-logo.png");
const outFavicon = path.resolve("public/favicon.png");

if (!source) {
  console.error("Usage: node scripts/prepare-logo.mjs <source-png>");
  process.exit(1);
}

const { data, info } = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const pixels = width * height;
const opaque = new Uint8Array(pixels);

// The canvas is pure black. The lettering is only a few levels lighter,
// so a wide "near black" cutoff would erase the A.
const backgroundCutoff = 6;

for (let index = 0; index < pixels; index += 1) {
  const offset = index * channels;
  const max = Math.max(data[offset], data[offset + 1], data[offset + 2]);
  if (max >= backgroundCutoff) opaque[index] = 1;
}

const exterior = new Uint8Array(pixels);
const stack = [];

function trySeed(x, y) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const index = y * width + x;
  if (exterior[index] || opaque[index]) return;
  exterior[index] = 1;
  stack.push(index);
}

for (let x = 0; x < width; x += 1) {
  trySeed(x, 0);
  trySeed(x, height - 1);
}
for (let y = 0; y < height; y += 1) {
  trySeed(0, y);
  trySeed(width - 1, y);
}

while (stack.length) {
  const index = stack.pop();
  const x = index % width;
  const y = (index / width) | 0;
  trySeed(x + 1, y);
  trySeed(x - 1, y);
  trySeed(x, y + 1);
  trySeed(x, y - 1);
}

// Fill only pinholes. Larger enclosed regions are the open counters of the mark.
const seen = new Uint8Array(pixels);
const fill = new Uint8Array(pixels);

for (let index = 0; index < pixels; index += 1) {
  if (opaque[index] || exterior[index] || seen[index]) continue;
  const component = [];
  const queue = [index];
  seen[index] = 1;
  while (queue.length) {
    const current = queue.pop();
    component.push(current);
    const x = current % width;
    const y = (current / width) | 0;
    const neighbors = [x + 1, x - 1, x, x];
    const neighborY = [y, y, y + 1, y - 1];
    for (let n = 0; n < 4; n += 1) {
      const nx = neighbors[n];
      const ny = neighborY[n];
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const next = ny * width + nx;
      if (opaque[next] || exterior[next] || seen[next]) continue;
      seen[next] = 1;
      queue.push(next);
    }
  }
  if (component.length < 40) {
    for (const pixel of component) fill[pixel] = 1;
  }
}

let minX = width;
let minY = height;
let maxX = 0;
let maxY = 0;
let content = 0;

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const index = y * width + x;
    const offset = index * channels;
    if (!opaque[index] && !fill[index]) {
      data[offset + 3] = 0;
      continue;
    }
    data[offset + 3] = 255;
    content += 1;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
}

if (!content) {
  console.error("No logo pixels found.");
  process.exit(1);
}

const pad = 16;
const left = Math.max(0, minX - pad);
const top = Math.max(0, minY - pad);
const cropWidth = Math.min(width - left, maxX - minX + 1 + pad * 2);
const cropHeight = Math.min(height - top, maxY - minY + 1 + pad * 2);

await mkdir(outDir, { recursive: true });

await sharp(data, { raw: { width, height, channels } })
  .extract({ left, top, width: cropWidth, height: cropHeight })
  .png()
  .toFile(outLogo);

await sharp(outLogo)
  .resize({ height: 64, fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .flatten({ background: "#ffffff" })
  .png()
  .toFile(outFavicon);

console.log(
  JSON.stringify(
    {
      sourceSize: { width, height },
      contentPixels: content,
      crop: { left, top, width: cropWidth, height: cropHeight },
      outLogo,
      outFavicon,
    },
    null,
    2,
  ),
);
