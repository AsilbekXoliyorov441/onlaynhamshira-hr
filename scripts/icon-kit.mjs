/**
 * 3D (clay) uslubidagi ikonkalarni chizish uchun umumiy "asboblar toʻplami".
 *
 * Bu yerda barcha generator skriptlar uchun bir xil gradient, filtr, plitka
 * va yordamchi funksiyalar saqlanadi — shunda turli boʻlimlarning ikonkalari
 * bitta vizual tizimda qoladi.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

export const SIZE = 512;

/* ===== Umumiy gradient va filtrlar ===== */
export const DEFS = `
<defs>
  <linearGradient id="gTile" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#FFFFFF"/>
    <stop offset="0.45" stop-color="#EAF9F0"/>
    <stop offset="1" stop-color="#C4EEDA"/>
  </linearGradient>
  <linearGradient id="gW" x1="0.1" y1="0" x2="0.9" y2="1">
    <stop offset="0" stop-color="#FFFFFF"/>
    <stop offset="0.55" stop-color="#F4FBF8"/>
    <stop offset="1" stop-color="#D2E7DE"/>
  </linearGradient>
  <linearGradient id="gG" x1="0.1" y1="0" x2="0.9" y2="1">
    <stop offset="0" stop-color="#BDF4D6"/>
    <stop offset="0.5" stop-color="#4FD189"/>
    <stop offset="1" stop-color="#12855A"/>
  </linearGradient>
  <linearGradient id="gGd" x1="0.1" y1="0" x2="0.9" y2="1">
    <stop offset="0" stop-color="#71E0A6"/>
    <stop offset="0.5" stop-color="#2CC176"/>
    <stop offset="1" stop-color="#0B6A45"/>
  </linearGradient>
  <linearGradient id="gB" x1="0.1" y1="0" x2="0.9" y2="1">
    <stop offset="0" stop-color="#D6F2FF"/>
    <stop offset="0.5" stop-color="#58C7F5"/>
    <stop offset="1" stop-color="#0E7BB0"/>
  </linearGradient>
  <linearGradient id="gS" x1="0.1" y1="0" x2="0.9" y2="1">
    <stop offset="0" stop-color="#FFEFCC"/>
    <stop offset="0.5" stop-color="#FFC65C"/>
    <stop offset="1" stop-color="#CE8511"/>
  </linearGradient>
  <linearGradient id="gSk" x1="0.1" y1="0" x2="0.9" y2="1">
    <stop offset="0" stop-color="#FFEBD9"/>
    <stop offset="0.55" stop-color="#FBC49A"/>
    <stop offset="1" stop-color="#D08E60"/>
  </linearGradient>
  <linearGradient id="gR" x1="0.1" y1="0" x2="0.9" y2="1">
    <stop offset="0" stop-color="#FFC2CE"/>
    <stop offset="0.5" stop-color="#FF7A93"/>
    <stop offset="1" stop-color="#D0304F"/>
  </linearGradient>

  <radialGradient id="tileShine" cx="0.26" cy="0.16" r="0.75">
    <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.95"/>
    <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
  </radialGradient>

  <filter id="soft" x="-40%" y="-40%" width="180%" height="190%">
    <feDropShadow dx="0" dy="16" stdDeviation="15" flood-color="#0B4C30" flood-opacity="0.28"/>
  </filter>
  <filter id="soft2" x="-40%" y="-40%" width="180%" height="190%">
    <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#0B4C30" flood-opacity="0.24"/>
  </filter>
  <filter id="bl22" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="22"/></filter>
  <filter id="bl12" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="12"/></filter>
</defs>`;

/** Plitka foni — barcha ikonkalar uchun bir xil */
export const TILE = `
<rect x="10" y="10" width="492" height="492" rx="132" fill="url(#gTile)"/>
<rect x="10" y="10" width="492" height="492" rx="132" fill="url(#tileShine)"/>
<rect x="14" y="14" width="484" height="484" rx="128" fill="none" stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="8"/>`;

/** Obyekt ostidagi yumshoq yer soyasi */
export const ground = (cx = 256, cy = 418, rx = 148, ry = 26, op = 0.16) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#0B4C30" opacity="${op}" filter="url(#bl22)"/>`;

/** Shakl ichiga tushuvchi oq yaltiroq (clip orqali) */
let clipSeq = 0;
export const resetClips = () => {
  clipSeq = 0;
};
export const gloss = (shape, cx, cy, rx, ry, op = 0.5) => {
  const id = `cl${++clipSeq}`;
  return `<clipPath id="${id}">${shape}</clipPath>
<g clip-path="url(#${id})"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#FFFFFF" opacity="${op}" filter="url(#bl12)"/></g>`;
};

/** Medal/rozetka qirrasi — tishli doira yoʻli */
export const rosette = (cx, cy, rOut, rIn, points) => {
  const step = Math.PI / points;
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? rOut : rIn;
    const a = i * step - Math.PI / 2;
    d += `${i === 0 ? "M" : "L"}${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)} `;
  }
  return d + "Z";
};

/**
 * Ikonkalar roʻyxatini PNG'ga render qiladi.
 * @param {object} [opts]
 * @param {boolean} [opts.tile=true]  mentol plitka foni chizilsinmi
 * @param {number}  [opts.size=512]   kanvas oʻlchami (viewBox ham shu)
 */
export async function renderIcons(icons, outUrl, opts = {}) {
  const { tile = true, size = SIZE } = opts;
  await mkdir(outUrl, { recursive: true });
  for (const [name, draw] of icons) {
    resetClips();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${DEFS}${tile ? TILE : ""}${draw()}</svg>`;
    await sharp(Buffer.from(svg))
      .png({ compressionLevel: 9 })
      .toFile(new URL(`${name}.png`, outUrl).pathname);
    console.log("✓", name);
  }
}
