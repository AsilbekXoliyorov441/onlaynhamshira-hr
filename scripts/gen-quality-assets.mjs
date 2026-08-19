/**
 * "Xizmat sifati va xavfsizlik" boʻlimi asset'lari:
 *   • katta 3D qalqon illyustratsiyasi (shaffof fon)
 *   • qoidalar uchun 6 ta plitkali ikonka
 *   • ogohlantirish belgisi (shaffof fon)
 *
 * Ishga tushirish:  npm run icons:quality
 * Natija:           assets/quality/*.png
 */
import { ground, gloss, renderIcons } from "./icon-kit.mjs";

const OUT = new URL("../assets/quality/", import.meta.url);

/* ============================================================
 *  Katta qalqon — 800x800, plitkasiz
 * ============================================================ */
function heroShield() {
  const sh = `<path d="M400 128 L648 220 V452 C648 584 534 682 400 724 C266 682 152 584 152 452 V220 Z"/>`;
  return `
<ellipse cx="400" cy="722" rx="212" ry="40" fill="#0B4C30" opacity="0.16" filter="url(#bl22)"/>
<g filter="url(#soft)">
  <path d="M400 128 L648 220 V452 C648 584 534 682 400 724 C266 682 152 584 152 452 V220 Z" fill="url(#gG)"/>
</g>
${gloss(sh, 296, 232, 150, 138, 0.6)}
<path d="M400 182 L602 257 V452 C602 556 511 634 400 671 C289 634 198 556 198 452 V257 Z" fill="#FFFFFF" opacity="0.18"/>
<path d="M312 430 l56 58 l120 -136" fill="none" stroke="#FFFFFF" stroke-width="46" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M400 128 L648 220 V452 C648 584 534 682 400 724 C266 682 152 584 152 452 V220 Z"
      fill="none" stroke="#FFFFFF" stroke-opacity="0.5" stroke-width="8"/>`;
}

/* ============================================================
 *  Ogohlantirish — 512x512, plitkasiz
 * ============================================================ */
function warning() {
  const tri = `<path d="M256 96 C272 96 284 104 292 118 L446 386 C462 414 448 442 416 442 H96 C64 442 50 414 66 386 L220 118 C228 104 240 96 256 96 Z"/>`;
  return `
<ellipse cx="256" cy="438" rx="150" ry="24" fill="#7A4B00" opacity="0.16" filter="url(#bl22)"/>
<g filter="url(#soft)">
  <path d="M256 96 C272 96 284 104 292 118 L446 386 C462 414 448 442 416 442 H96 C64 442 50 414 66 386 L220 118 C228 104 240 96 256 96 Z" fill="url(#gS)"/>
</g>
${gloss(tri, 210, 210, 90, 100, 0.55)}
<rect x="234" y="192" width="44" height="130" rx="22" fill="#FFFFFF"/>
<circle cx="256" cy="374" r="26" fill="#FFFFFF"/>`;
}

/* ============================================================
 *  Qoidalar ikonkalari — 512x512, plitkali
 * ============================================================ */

/* 1. Tibbiy etika — kaft ustidagi yurak */
function ethics() {
  const heart = `<path d="M256 214 c-22-30-60-40-92-22 -34 20-42 68-16 100 l108 118 108-118 c26-32 18-80-16-100 -32-18-70-8-92 22 z"/>`;
  return `
${ground(256, 428, 140, 24)}
<g filter="url(#soft2)">
  <path d="M96 316 c0-18 16-30 34-26 l70 16 c10 2 20 4 30 4 h96 c20 0 30 14 30 26 0 14-12 24-28 24 h-70
           c30 0 96 2 116 2 18 0 26 12 26 24 0 16-14 26-34 28 l-136 12 c-46 4-84-10-116-40 l-18-16 z" fill="url(#gSk)"/>
</g>
<g filter="url(#soft)">
  <path d="M256 214 c-22-30-60-40-92-22 -34 20-42 68-16 100 l108 118 108-118 c26-32 18-80-16-100 -32-18-70-8-92 22 z" fill="url(#gR)"/>
</g>
${gloss(heart, 196, 218, 56, 40, 0.55)}
<path d="M238 250h36v30h30v36h-30v30h-36v-30h-30v-36h30z" fill="#FFFFFF" opacity="0.92"/>`;
}

/* 2. Maxfiylik — qulf + hujjat */
function privacy() {
  const body = `<rect x="134" y="238" width="244" height="196" rx="44"/>`;
  return `
${ground(256, 434, 136, 22)}
<g filter="url(#soft2)">
  <rect x="176" y="94" width="176" height="120" rx="22" fill="url(#gW)"/>
  <rect x="204" y="126" width="120" height="16" rx="8" fill="url(#gB)" opacity="0.6"/>
  <rect x="204" y="158" width="80" height="16" rx="8" fill="url(#gB)" opacity="0.4"/>
</g>
<path d="M186 262 v-40 c0-39 31-70 70-70 s70 31 70 70 v40" fill="none" stroke="url(#gGd)" stroke-width="36" stroke-linecap="round"/>
<g filter="url(#soft)"><rect x="134" y="238" width="244" height="196" rx="44" fill="url(#gG)"/></g>
${gloss(body, 186, 274, 68, 44, 0.55)}
<circle cx="256" cy="318" r="30" fill="#FFFFFF"/>
<path d="M244 336h24l8 46h-40z" fill="#FFFFFF"/>`;
}

/* 3. Malaka doirasi — mutaxassis nishoni (ID) */
function scope() {
  const card = `<rect x="98" y="112" width="316" height="228" rx="36"/>`;
  return `
${ground(256, 430, 140, 22)}
<g filter="url(#soft2)">
  <path d="M240 40h32v86h-32z" fill="url(#gGd)"/>
  <rect x="216" y="28" width="80" height="30" rx="15" fill="url(#gG)"/>
</g>
<g filter="url(#soft)"><rect x="98" y="112" width="316" height="228" rx="36" fill="url(#gW)"/></g>
${gloss(card, 160, 146, 110, 46, 0.8)}
<circle cx="182" cy="196" r="42" fill="url(#gSk)"/>
<path d="M132 292 c0-28 22-50 50-50 s50 22 50 50 z" fill="url(#gG)"/>
<rect x="256" y="170" width="128" height="20" rx="10" fill="url(#gGd)" opacity="0.75"/>
<rect x="256" y="206" width="98" height="16" rx="8" fill="url(#gB)" opacity="0.5"/>
<rect x="256" y="238" width="112" height="16" rx="8" fill="url(#gB)" opacity="0.35"/>
<g filter="url(#soft2)"><circle cx="376" cy="352" r="58" fill="url(#gGd)"/></g>
<path d="M352 352 l17 18 l33 -38" fill="none" stroke="#FFFFFF" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/>`;
}

/* 4. Sanitariya — antiseptik flakon + tomchilar */
function sanitary() {
  const bottle = `<rect x="152" y="180" width="180" height="238" rx="46"/>`;
  return `
${ground(240, 432, 130, 22)}
<g filter="url(#soft2)">
  <rect x="206" y="82" width="72" height="52" rx="18" fill="url(#gGd)"/>
  <path d="M278 96 h58 a16 16 0 0 1 16 16 v26" fill="none" stroke="url(#gGd)" stroke-width="22" stroke-linecap="round"/>
  <rect x="196" y="126" width="92" height="62" rx="20" fill="url(#gG)"/>
</g>
<g filter="url(#soft)"><rect x="152" y="180" width="180" height="238" rx="46" fill="url(#gW)"/></g>
${gloss(bottle, 190, 214, 40, 46, 0.75)}
<rect x="176" y="242" width="132" height="118" rx="26" fill="url(#gG)"/>
<path d="M242 268h32v26h26v32h-26v26h-32v-26h-26v-32h26z" fill="#FFFFFF"/>
<g filter="url(#soft2)">
  <path d="M396 190 c-18 24-28 40-28 54 a28 28 0 0 0 56 0 c0-14-10-30-28-54 z" fill="url(#gB)"/>
  <path d="M372 300 c-12 16-19 27-19 36 a19 19 0 0 0 38 0 c0-9-7-20-19-36 z" fill="url(#gB)" opacity="0.7"/>
</g>`;
}

/* 5. Hushmuomalalik — kulib turgan yuz + yurak */
function courtesy() {
  const face = `<circle cx="240" cy="256" r="146"/>`;
  return `
${ground(240, 430, 140, 24)}
<g filter="url(#soft)"><circle cx="240" cy="256" r="146" fill="url(#gG)"/></g>
${gloss(face, 180, 186, 82, 66, 0.6)}
<circle cx="240" cy="256" r="112" fill="#FFFFFF" opacity="0.16"/>
<g fill="#FFFFFF">
  <ellipse cx="192" cy="226" rx="19" ry="24"/>
  <ellipse cx="288" cy="226" rx="19" ry="24"/>
</g>
<path d="M176 300 c18 34 46 52 84 52 s66-18 84-52" fill="none" stroke="#FFFFFF" stroke-width="24" stroke-linecap="round"/>
<g filter="url(#soft2)">
  <path d="M404 152 c-11-15-30-20-46-11 -17 10-21 34-8 50 l54 59 54-59 c13-16 9-40-8-50 -16-9-35-4-46 11 z"
        transform="translate(-32 8) scale(0.72) translate(112 40)" fill="url(#gR)"/>
</g>`;
}

/* 6. Ilovada holat — smartfon + bosqichlar */
function appStatus() {
  const phone = `<rect x="140" y="72" width="232" height="368" rx="46"/>`;
  return `
${ground(256, 442, 128, 20)}
<g filter="url(#soft)"><rect x="140" y="72" width="232" height="368" rx="46" fill="url(#gG)"/></g>
${gloss(phone, 186, 118, 56, 60, 0.6)}
<rect x="166" y="112" width="180" height="288" rx="26" fill="#FFFFFF"/>
<rect x="226" y="86" width="60" height="12" rx="6" fill="#FFFFFF" opacity="0.75"/>
<path d="M206 168 V310" stroke="#CFEADD" stroke-width="8" stroke-linecap="round"/>
<g>
  <circle cx="206" cy="168" r="20" fill="url(#gGd)"/>
  <path d="M198 168 l7 8 l12 -14" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="240" y="158" width="94" height="20" rx="10" fill="url(#gGd)" opacity="0.6"/>
</g>
<g>
  <circle cx="206" cy="239" r="20" fill="url(#gGd)"/>
  <path d="M198 239 l7 8 l12 -14" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="240" y="229" width="80" height="20" rx="10" fill="url(#gGd)" opacity="0.45"/>
</g>
<g>
  <circle cx="206" cy="310" r="20" fill="#FFFFFF" stroke="url(#gB)" stroke-width="8"/>
  <rect x="240" y="300" width="64" height="20" rx="10" fill="url(#gB)" opacity="0.35"/>
</g>
<rect x="196" y="356" width="120" height="26" rx="13" fill="url(#gG)" opacity="0.5"/>`;
}

/* ============================================================ */

await renderIcons([["quality-hero", heroShield]], OUT, { tile: false, size: 800 });
await renderIcons([["quality-warning", warning]], OUT, { tile: false });
await renderIcons(
  [
    ["q-1-etika", ethics],
    ["q-2-maxfiylik", privacy],
    ["q-3-malaka", scope],
    ["q-4-sanitariya", sanitary],
    ["q-5-muomala", courtesy],
    ["q-6-ilova", appStatus],
  ],
  OUT
);
