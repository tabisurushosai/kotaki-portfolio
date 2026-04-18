/**
 * OGP・favicon・apple-touch-icon を public/ に生成（sharp で SVG→PNG）。
 * 日本語ラベルはシステムのサンセリフでラスタライズ（環境により字形が異なります）。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = path.join(__dirname, "..", "public");

const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#152a45"/>
  <text x="600" y="260" text-anchor="middle" fill="#ffffff" font-family="system-ui, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="52" font-weight="700">教育 × AI × 実装</text>
  <text x="600" y="350" text-anchor="middle" fill="#ffffff" font-family="system-ui, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="44" font-weight="600">小瀧雄基</text>
  <rect x="380" y="410" width="440" height="5" fill="#c9a961"/>
</svg>`;

const iconKSvg = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#152a45"/>
  <text x="${size / 2}" y="${Math.round(size * 0.68)}" text-anchor="middle" fill="#ffffff" font-family="Georgia, 'Noto Serif JP', ui-serif, serif" font-size="${Math.round(size * 0.52)}" font-weight="700">K</text>
</svg>`;

async function main() {
  fs.mkdirSync(pub, { recursive: true });

  await sharp(Buffer.from(ogSvg)).png().toFile(path.join(pub, "og.png"));

  const appleBuf = await sharp(Buffer.from(iconKSvg(180)))
    .png()
    .toBuffer();
  await fs.promises.writeFile(path.join(pub, "apple-touch-icon.png"), appleBuf);

  const fav32 = await sharp(Buffer.from(iconKSvg(32))).png().toBuffer();
  await fs.promises.writeFile(path.join(pub, "favicon-32x32.png"), fav32);

  const fav16 = await sharp(Buffer.from(iconKSvg(16))).png().toBuffer();
  await fs.promises.writeFile(path.join(pub, "favicon-16x16.png"), fav16);

  await fs.promises.copyFile(
    path.join(pub, "favicon-32x32.png"),
    path.join(pub, "favicon.png")
  );

  const fav16Path = path.join(pub, "favicon-16x16.png");
  const fav32Path = path.join(pub, "favicon-32x32.png");
  const icoBuf = await pngToIco([fav16Path, fav32Path]);
  await fs.promises.writeFile(path.join(pub, "favicon.ico"), icoBuf);

  console.log(
    "Wrote public/og.png, apple-touch-icon.png, favicon-32x32.png, favicon-16x16.png, favicon.png, favicon.ico"
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
