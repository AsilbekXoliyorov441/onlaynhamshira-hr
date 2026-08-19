/**
 * "Ishlash hududi" boʻlimi uchun asset'lar:
 *   • stilizatsiya qilingan xarita foni (region-map.png)
 *   • 3D (clay) uslubidagi 3 ta ikonka
 *
 * Ishga tushirish:  npm run icons:region
 * Natija:           assets/region/*.png
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { ground, gloss, renderIcons } from "./icon-kit.mjs";

const OUT = new URL("../assets/region/", import.meta.url);

/* ============================================================
 *  1-qism — xarita foni
 * ============================================================ */

const MW = 1200;
const MH = 900;

/** Takrorlanuvchi (deterministik) tasodifiy sonlar — har safar bir xil xarita */
function lcg(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function mapSvg() {
  const rnd = lcg(20260819);
  const VROADS = [
    { x: 176, w: 26 },
    { x: 452, w: 44 },
    { x: 742, w: 26 },
    { x: 1004, w: 26 },
  ];
  const HROADS = [
    { y: 196, h: 26 },
    { y: 452, h: 44 },
    { y: 704, h: 26 },
  ];

  const vEdges = [-30, ...VROADS.map((r) => r.x), MW + 30];
  const hEdges = [-30, ...HROADS.map((r) => r.y), MH + 30];

  const BLOCK_FILLS = ["#FFFFFF", "#F4FBF7", "#EAF7F0", "#FAFDFB"];
  const BUILDING_FILLS = ["#C9E9D9", "#B9E2CB", "#D8EFE3"];

  /* Kvartallar va ular ichidagi binolar */
  let blocks = "";
  for (let i = 0; i < vEdges.length - 1; i++) {
    for (let j = 0; j < hEdges.length - 1; j++) {
      const x0 = vEdges[i] + (i === 0 ? 0 : VROADS[i - 1].w / 2) + 20;
      const x1 = vEdges[i + 1] - (i === vEdges.length - 2 ? 0 : VROADS[i].w / 2) - 20;
      const y0 = hEdges[j] + (j === 0 ? 0 : HROADS[j - 1].h / 2) + 20;
      const y1 = hEdges[j + 1] - (j === hEdges.length - 2 ? 0 : HROADS[j].h / 2) - 20;
      const w = x1 - x0;
      const h = y1 - y0;
      if (w < 40 || h < 40) continue;

      // Bitta kvartal — koʻl
      if (i === 1 && j === 2) {
        blocks += `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="26" fill="#DCF2E7"/>`;
        blocks += `<ellipse cx="${(x0 + w / 2).toFixed(0)}" cy="${(y0 + h / 2).toFixed(0)}" rx="${(w * 0.36).toFixed(
          0
        )}" ry="${(h * 0.3).toFixed(0)}" fill="#BFE4F7"/>`;
        blocks += `<ellipse cx="${(x0 + w / 2).toFixed(0)}" cy="${(y0 + h / 2 - 6).toFixed(0)}" rx="${(w * 0.27).toFixed(
          0
        )}" ry="${(h * 0.21).toFixed(0)}" fill="#D9F0FC"/>`;
        continue;
      }

      // Bitta kvartal — bogʻ (park)
      const isPark = i === 2 && j === 0;
      if (isPark) {
        blocks += `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="26" fill="#C6EFD6"/>`;
        for (let t = 0; t < 7; t++) {
          const cx = x0 + 34 + rnd() * (w - 68);
          const cy = y0 + 34 + rnd() * (h - 68);
          const r = 16 + rnd() * 12;
          blocks += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(0)}" fill="#8FDCB0" opacity="0.85"/>`;
        }
        continue;
      }

      blocks += `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="26" fill="${
        BLOCK_FILLS[Math.floor(rnd() * BLOCK_FILLS.length)]
      }"/>`;

      // Yirik kvartallarni boʻluvchi ingichka koʻchalar
      if (w > 220) {
        const sx = x0 + w * (0.4 + rnd() * 0.2);
        blocks += `<rect x="${sx.toFixed(0)}" y="${y0}" width="10" height="${h}" fill="#FFFFFF" opacity="0.9"/>`;
      }
      if (h > 200) {
        const sy = y0 + h * (0.4 + rnd() * 0.2);
        blocks += `<rect x="${x0}" y="${sy.toFixed(0)}" width="${w}" height="10" fill="#FFFFFF" opacity="0.9"/>`;
      }

      // Kvartal ichidagi kichik binolar
      const n = 2 + Math.floor(rnd() * 3);
      for (let b = 0; b < n; b++) {
        const bw = 40 + rnd() * Math.max(40, w * 0.34);
        const bh = 34 + rnd() * Math.max(34, h * 0.32);
        const bx = x0 + 18 + rnd() * Math.max(1, w - bw - 36);
        const by = y0 + 18 + rnd() * Math.max(1, h - bh - 36);
        blocks += `<rect x="${bx.toFixed(0)}" y="${by.toFixed(0)}" width="${bw.toFixed(0)}" height="${bh.toFixed(
          0
        )}" rx="12" fill="${BUILDING_FILLS[Math.floor(rnd() * BUILDING_FILLS.length)]}" opacity="0.9"/>`;
      }
    }
  }

  /* Yoʻllar — avval kulrang "kant", ustidan oq yoʻl */
  const roadCasing = [
    ...VROADS.map((r) => `<rect x="${r.x - r.w / 2 - 4}" y="-10" width="${r.w + 8}" height="${MH + 20}" fill="#E4F2EB"/>`),
    ...HROADS.map((r) => `<rect x="-10" y="${r.y - r.h / 2 - 4}" width="${MW + 20}" height="${r.h + 8}" fill="#E4F2EB"/>`),
  ].join("");
  const roads = [
    ...VROADS.map((r) => `<rect x="${r.x - r.w / 2}" y="-10" width="${r.w}" height="${MH + 20}" fill="#FFFFFF"/>`),
    ...HROADS.map((r) => `<rect x="-10" y="${r.y - r.h / 2}" width="${MW + 20}" height="${r.h}" fill="#FFFFFF"/>`),
  ].join("");

  /* Asosiy yoʻllarning oʻrta punktiri */
  const dashes = `
    <path d="M452 -10V${MH + 10}" stroke="#B7E3CD" stroke-width="4" stroke-dasharray="26 22"/>
    <path d="M-10 452H${MW + 10}" stroke="#B7E3CD" stroke-width="4" stroke-dasharray="26 22"/>`;

  /* Egri yoʻl — xaritaga tabiiylik beradi */
  const curve = `
    <path d="M-20 120 C 220 150 300 300 560 300 C 830 300 900 120 1220 160"
          stroke="#E1F1E9" stroke-width="34" fill="none" stroke-linecap="round"/>
    <path d="M-20 120 C 220 150 300 300 560 300 C 830 300 900 120 1220 160"
          stroke="#FFFFFF" stroke-width="26" fill="none" stroke-linecap="round"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${MW}" height="${MH}" viewBox="0 0 ${MW} ${MH}">
  <defs>
    <radialGradient id="vig" cx="0.5" cy="0.42" r="0.78">
      <stop offset="0.55" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="1" stop-color="#9FD6BB" stop-opacity="0.35"/>
    </radialGradient>
  </defs>
  <rect width="${MW}" height="${MH}" fill="#F2FBF6"/>
  ${blocks}
  ${roadCasing}
  ${roads}
  ${dashes}
  ${curve}
  <rect width="${MW}" height="${MH}" fill="url(#vig)"/>
</svg>`;
}

/* ============================================================
 *  2-qism — ikonkalar
 * ============================================================ */

/** Standart marker (pin) yoʻli — 512x512 maydonda toʻliq oʻlchamda */
const PIN =
  "M256 76 C186 76 130 132 130 202 C130 268 196 344 234 402 a26 26 0 0 0 44 0 C316 344 382 268 382 202 C382 132 326 76 256 76 Z";

/* 1. Hududni oʻzingiz belgilaysiz — marker + yer maydoni */
function pinArea() {
  return `
${ground(256, 432, 128, 22)}
<ellipse cx="256" cy="410" rx="136" ry="46" fill="#CBEEDC"/>
<ellipse cx="256" cy="404" rx="92" ry="30" fill="#AEE6C9"/>
<g filter="url(#soft)"><path d="${PIN}" fill="url(#gG)"/></g>
${gloss(`<path d="${PIN}"/>`, 200, 150, 62, 66, 0.55)}
<circle cx="256" cy="200" r="62" fill="#FFFFFF"/>
<path d="M228 200 l20 21 l38 -42" fill="none" stroke="url(#gGd)" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>`;
}

/* 2. Yaqin buyurtmalar — qamrov radiusi + marker */
function radius() {
  return `
${ground(256, 424, 150, 24, 0.13)}
<ellipse cx="256" cy="340" rx="198" ry="82" fill="#D5F2E4"/>
<ellipse cx="256" cy="340" rx="198" ry="82" fill="none" stroke="url(#gG)" stroke-width="9" opacity="0.45"/>
<ellipse cx="256" cy="340" rx="128" ry="53" fill="#B2E7CB"/>
<ellipse cx="256" cy="340" rx="128" ry="53" fill="none" stroke="url(#gGd)" stroke-width="7" opacity="0.35"/>
<ellipse cx="256" cy="340" rx="62" ry="26" fill="#7FDCAE"/>
<g filter="url(#soft2)"><circle cx="416" cy="252" r="26" fill="url(#gB)"/></g>
<g filter="url(#soft2)"><circle cx="102" cy="292" r="20" fill="url(#gB)" opacity="0.55"/></g>
<g transform="translate(256 200) scale(0.66) translate(-256 -230)">
  <g filter="url(#soft)"><path d="${PIN}" fill="url(#gGd)"/></g>
  <circle cx="256" cy="200" r="58" fill="#FFFFFF"/>
  <circle cx="256" cy="200" r="26" fill="url(#gGd)"/>
</g>`;
}

/* 3. Qaror mutaxassisda — buyurtma kartasi + qabul/rad tugmalari */
function decision() {
  const card = `<rect x="86" y="86" width="340" height="188" rx="34"/>`;
  return `
${ground(256, 430, 150, 24)}
<g filter="url(#soft)"><rect x="86" y="86" width="340" height="188" rx="34" fill="url(#gW)"/></g>
${gloss(card, 150, 118, 118, 44, 0.8)}
<circle cx="146" cy="146" r="30" fill="url(#gG)"/>
<rect x="196" y="130" width="180" height="20" rx="10" fill="url(#gGd)" opacity="0.75"/>
<rect x="196" y="164" width="120" height="16" rx="8" fill="url(#gB)" opacity="0.55"/>
<rect x="116" y="212" width="260" height="16" rx="8" fill="url(#gB)" opacity="0.35"/>
<g filter="url(#soft)"><circle cx="180" cy="366" r="66" fill="url(#gG)"/></g>
${gloss(`<circle cx="180" cy="366" r="66"/>`, 152, 336, 46, 34, 0.55)}
<path d="M152 366 l20 21 l38 -42" fill="none" stroke="#FFFFFF" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
<g filter="url(#soft)"><circle cx="336" cy="366" r="60" fill="url(#gW)"/></g>
<path d="M314 344 l44 44 M358 344 l-44 44" stroke="#9CBBAE" stroke-width="17" stroke-linecap="round"/>`;
}

/* ============================================================ */

await mkdir(OUT, { recursive: true });

await sharp(Buffer.from(mapSvg()))
  .png({ compressionLevel: 9 })
  .toFile(new URL("region-map.png", OUT).pathname);
console.log("✓ region-map");

await renderIcons(
  [
    ["region-1-hudud", pinArea],
    ["region-2-yaqin", radius],
    ["region-3-qaror", decision],
  ],
  OUT
);
