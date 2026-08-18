/**
 * "Nomzodlarga qoʻyiladigan talablar" boʻlimi uchun 3D (clay) uslubidagi
 * ikonkalarni generatsiya qiladi.
 *
 * Har bir ikonka vektor sifatida chiziladi (koʻp qatlamli gradient + yumshoq
 * soya + oq yaltiroq), soʻng `sharp` orqali shaffof PNG'ga render qilinadi.
 *
 * Ishga tushirish:  node scripts/gen-requirement-icons.mjs
 * Natija:           assets/requirements/*.png
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SIZE = 512;
const OUT = new URL("../assets/requirements/", import.meta.url);

/* ===== Umumiy gradient va filtrlar ===== */
const DEFS = `
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
  <filter id="bl22"><feGaussianBlur stdDeviation="22"/></filter>
  <filter id="bl12"><feGaussianBlur stdDeviation="12"/></filter>
</defs>`;

/** Plitka foni — barcha ikonkalar uchun bir xil */
const TILE = `
<rect x="10" y="10" width="492" height="492" rx="132" fill="url(#gTile)"/>
<rect x="10" y="10" width="492" height="492" rx="132" fill="url(#tileShine)"/>
<rect x="14" y="14" width="484" height="484" rx="128" fill="none" stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="8"/>`;

/** Obyekt ostidagi yumshoq yer soyasi */
const ground = (cx = 256, cy = 418, rx = 148, ry = 26, op = 0.16) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#0B4C30" opacity="${op}" filter="url(#bl22)"/>`;

/** Shakl ichiga tushuvchi oq yaltiroq (clip orqali) */
let clipSeq = 0;
const gloss = (shape, cx, cy, rx, ry, op = 0.5) => {
  const id = `cl${++clipSeq}`;
  return `<clipPath id="${id}">${shape}</clipPath>
<g clip-path="url(#${id})"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#FFFFFF" opacity="${op}" filter="url(#bl12)"/></g>`;
};

/** Medal/rozetka qirrasi — tishli doira yoʻli */
const rosette = (cx, cy, rOut, rIn, points) => {
  const step = Math.PI / points;
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? rOut : rIn;
    const a = i * step - Math.PI / 2;
    d += `${i === 0 ? "M" : "L"}${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)} `;
  }
  return d + "Z";
};

/* ===== 1. Tibbiy maʼlumot — diplom + muhr ===== */
function diploma() {
  const page = `<rect x="112" y="116" width="288" height="212" rx="30"/>`;
  return `
${ground(256, 412, 140, 24)}
<g transform="rotate(-7 256 222)" filter="url(#soft)">
  <rect x="112" y="116" width="288" height="212" rx="30" fill="url(#gW)"/>
</g>
<g transform="rotate(-7 256 222)">
  ${gloss(page, 175, 150, 120, 60, 0.75)}
  <rect x="146" y="152" width="220" height="26" rx="13" fill="url(#gG)"/>
  <rect x="146" y="202" width="220" height="20" rx="10" fill="url(#gB)" opacity="0.85"/>
  <rect x="146" y="242" width="152" height="20" rx="10" fill="url(#gB)" opacity="0.6"/>
</g>
<g filter="url(#soft2)">
  <path d="M330 352 h32 v96 l-18 -16 l-24 12 z" fill="url(#gGd)"/>
  <path d="M394 352 h-32 v96 l18 -16 l24 12 z" fill="url(#gG)"/>
</g>
<g filter="url(#soft)">
  <path d="${rosette(362, 316, 72, 60, 12)}" fill="url(#gGd)"/>
  <circle cx="362" cy="316" r="56" fill="url(#gG)"/>
</g>
${gloss(`<circle cx="362" cy="316" r="56"/>`, 338, 290, 40, 30, 0.62)}
<circle cx="362" cy="316" r="38" fill="#FFFFFF" opacity="0.26"/>
<path d="M342 316 l14 15 l27 -30" fill="none" stroke="#FFFFFF" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>`;
}

/* ===== 2. Tajriba — soat + hamshira qalpogʻi ===== */
function experience() {
  return `
${ground(250, 424, 132, 24)}
<g filter="url(#soft)"><circle cx="250" cy="278" r="132" fill="url(#gG)"/></g>
${gloss(`<circle cx="250" cy="278" r="132"/>`, 200, 200, 96, 72, 0.6)}
<circle cx="250" cy="278" r="102" fill="url(#gW)"/>
<circle cx="250" cy="278" r="102" fill="none" stroke="#FFFFFF" stroke-opacity="0.85" stroke-width="8"/>
<g stroke="#12855A" stroke-width="10" stroke-linecap="round" opacity="0.45">
  <path d="M250 196v16"/><path d="M250 344v16"/><path d="M168 278h16"/><path d="M316 278h16"/>
</g>
<path d="M250 278V214" stroke="#0B6A45" stroke-width="18" stroke-linecap="round"/>
<path d="M250 278l46 30" stroke="#12855A" stroke-width="15" stroke-linecap="round"/>
<circle cx="250" cy="278" r="15" fill="#0B6A45"/>
<g transform="rotate(-18 344 150)">
  <g filter="url(#soft2)">
    <path d="M288 194 C288 130 316 104 358 104 C400 104 428 130 428 194 Z" fill="url(#gW)"/>
  </g>
  <path d="M348 130h20v20h20v20h-20v20h-20v-20h-20v-20h20z" fill="url(#gGd)"/>
</g>`;
}

/* ===== 3. Standartlar — qalqon + tibbiy xoch ===== */
function shield() {
  const sh = `<path d="M256 84 L410 140 V276 C410 356 340 414 256 440 C172 414 102 356 102 276 V140 Z"/>`;
  return `
${ground(256, 430, 128, 22)}
<g filter="url(#soft)">
  <path d="M256 84 L410 140 V276 C410 356 340 414 256 440 C172 414 102 356 102 276 V140 Z" fill="url(#gG)"/>
</g>
${gloss(sh, 190, 150, 96, 88, 0.62)}
<path d="M256 118 L380 163 V276 C380 340 324 388 256 411 C188 388 132 340 132 276 V163 Z" fill="#FFFFFF" opacity="0.18"/>
<path d="M228 190h56v54h54v56h-54v54h-56v-54h-54v-56h54z" fill="#FFFFFF"/>`;
}

/* ===== 4. Muloqot — ikki inson + suhbat pufagi ===== */
function dialog() {
  const bubble = `<path d="M240 74 h190 a44 44 0 0 1 44 44 v62 a44 44 0 0 1 -44 44 h-52 l-46 40 v-40 h-92 a44 44 0 0 1 -44 -44 v-62 a44 44 0 0 1 44 -44 z"/>`;
  return `
${ground(256, 432, 148, 24)}
<g filter="url(#soft)">
  <path d="M240 74 h190 a44 44 0 0 1 44 44 v62 a44 44 0 0 1 -44 44 h-52 l-46 40 v-40 h-92 a44 44 0 0 1 -44 -44 v-62 a44 44 0 0 1 44 -44 z" fill="url(#gW)"/>
</g>
${gloss(bubble, 250, 100, 120, 46, 0.8)}
<g fill="url(#gGd)">
  <circle cx="290" cy="150" r="17"/><circle cx="350" cy="150" r="17"/><circle cx="410" cy="150" r="17"/>
</g>
<g filter="url(#soft2)">
  <circle cx="348" cy="268" r="48" fill="url(#gSk)"/>
  <path d="M270 414 c0-44 35-79 78-79 s78 35 78 79 z" fill="url(#gB)"/>
</g>
<g filter="url(#soft)">
  <circle cx="196" cy="284" r="58" fill="url(#gSk)"/>
  <path d="M104 424 c0-51 41-92 92-92 s92 41 92 92 z" fill="url(#gG)"/>
</g>
${gloss(`<circle cx="196" cy="284" r="58"/>`, 176, 262, 34, 26, 0.55)}
${gloss(`<path d="M104 424 c0-51 41-92 92-92 s92 41 92 92 z"/>`, 150, 356, 52, 34, 0.5)}`;
}

/* ===== 5. Kasbiy bilim — bitiruv qalpogʻi + kitob ===== */
function knowledge() {
  const top = `<path d="M256 96 L456 172 L256 248 L56 172 Z"/>`;
  return `
${ground(256, 424, 150, 24)}
<g filter="url(#soft2)">
  <rect x="128" y="352" width="256" height="26" rx="8" fill="url(#gW)"/>
  <rect x="120" y="360" width="272" height="22" rx="7" fill="#FFFFFF" opacity="0.9"/>
  <path d="M110 376 h292 a20 20 0 0 1 20 20 v14 a20 20 0 0 1 -20 20 h-292 a20 20 0 0 1 -20 -20 v-14 a20 20 0 0 1 20 -20 z" fill="url(#gB)"/>
  <rect x="236" y="376" width="40" height="54" fill="#FFFFFF" opacity="0.35"/>
</g>
<g filter="url(#soft2)">
  <path d="M158 230 v104 c0 30 44 46 98 46 s98-16 98-46 V230 L256 268 Z" fill="url(#gGd)"/>
</g>
<g filter="url(#soft)">
  <path d="M256 96 L456 172 L256 248 L56 172 Z" fill="url(#gG)"/>
</g>
${gloss(top, 170, 150, 100, 34, 0.7)}
<path d="M436 180 v96" stroke="#0E7BB0" stroke-width="14" stroke-linecap="round"/>
<circle cx="436" cy="292" r="24" fill="url(#gB)" filter="url(#soft2)"/>`;
}

/* ===== 6. Texnik koʻnikma — monitor + smartfon ===== */
function tech() {
  const mon = `<rect x="76" y="106" width="330" height="218" rx="30"/>`;
  return `
${ground(256, 430, 140, 22)}
<g filter="url(#soft)"><rect x="76" y="106" width="330" height="218" rx="30" fill="url(#gG)"/></g>
${gloss(mon, 140, 140, 110, 50, 0.65)}
<rect x="104" y="134" width="274" height="162" rx="18" fill="url(#gW)"/>
<path d="M186 168h40v34h34v40h-34v34h-40v-34h-34v-40h34z" fill="url(#gGd)"/>
<g filter="url(#soft2)">
  <path d="M226 324 h60 v42 h-60 z" fill="url(#gGd)"/>
  <rect x="176" y="362" width="160" height="26" rx="13" fill="url(#gG)"/>
</g>
<g filter="url(#soft)">
  <rect x="300" y="230" width="132" height="204" rx="30" fill="url(#gB)"/>
  <rect x="318" y="256" width="96" height="152" rx="14" fill="url(#gW)"/>
</g>
${gloss(`<rect x="300" y="230" width="132" height="204" rx="30"/>`, 330, 252, 44, 32, 0.6)}
<path d="M354 292h24v22h22v24h-22v22h-24v-22h-22v-24h22z" fill="url(#gGd)"/>`;
}

/* ===== 7. Maʼlumotlar toʻgʻriligi — planshet-roʻyxat ===== */
function accuracy() {
  const board = `<rect x="106" y="96" width="268" height="330" rx="36"/>`;
  return `
${ground(240, 432, 132, 22)}
<g filter="url(#soft)"><rect x="106" y="96" width="268" height="330" rx="36" fill="url(#gG)"/></g>
${gloss(board, 160, 140, 90, 60, 0.6)}
<rect x="134" y="132" width="212" height="266" rx="22" fill="url(#gW)"/>
<g filter="url(#soft2)"><rect x="188" y="70" width="104" height="56" rx="26" fill="url(#gGd)"/></g>
<g fill="url(#gB)" opacity="0.75">
  <rect x="216" y="176" width="106" height="18" rx="9"/>
  <rect x="216" y="248" width="106" height="18" rx="9"/>
  <rect x="216" y="320" width="106" height="18" rx="9"/>
</g>
<g fill="none" stroke="url(#gGd)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
  <path d="M160 186 l14 14 l26 -30"/>
  <path d="M160 258 l14 14 l26 -30"/>
  <path d="M160 330 l14 14 l26 -30"/>
</g>
<g transform="rotate(28 380 300)" filter="url(#soft2)">
  <rect x="360" y="200" width="42" height="150" rx="12" fill="url(#gS)"/>
  <path d="M360 350 h42 l-21 40 z" fill="#8A5A12"/>
  <rect x="360" y="200" width="42" height="30" rx="12" fill="url(#gGd)"/>
</g>`;
}

/* ===== 8. Mutaxassislik — yurak ritmi monitori ===== */
function monitor() {
  const dev = `<rect x="72" y="118" width="368" height="238" rx="40"/>`;
  return `
${ground(256, 434, 132, 22)}
<g filter="url(#soft)"><rect x="72" y="118" width="368" height="238" rx="40" fill="url(#gG)"/></g>
${gloss(dev, 140, 156, 118, 54, 0.62)}
<rect x="104" y="150" width="304" height="174" rx="24" fill="url(#gW)"/>
<path d="M128 240 h44 l22 -52 l32 100 l26 -74 l20 26 h112"
      fill="none" stroke="url(#gGd)" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/>
<g filter="url(#soft2)">
  <path d="M366 214 c-9-11-24-15-36-8 -13 8-16 26-6 38 l38 44 38-44 c10-12 7-30-6-38 -12-7-27-3-36 8 z" fill="url(#gR)"/>
</g>
<g filter="url(#soft2)">
  <path d="M226 356 h60 v40 h-60 z" fill="url(#gGd)"/>
  <rect x="166" y="392" width="180" height="28" rx="14" fill="url(#gG)"/>
</g>`;
}

const ICONS = [
  ["req-1-tibbiy-malumot", diploma],
  ["req-2-tajriba", experience],
  ["req-3-standartlar", shield],
  ["req-4-muloqot", dialog],
  ["req-5-kasbiy-bilim", knowledge],
  ["req-6-texnik-konikma", tech],
  ["req-7-malumotlar-togriligi", accuracy],
  ["req-8-mutaxassislik", monitor],
];

await mkdir(OUT, { recursive: true });

for (const [name, draw] of ICONS) {
  clipSeq = 0;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">${DEFS}${TILE}${draw()}</svg>`;
  const file = new URL(`${name}.png`, OUT);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(file.pathname);
  console.log("✓", name);
}
