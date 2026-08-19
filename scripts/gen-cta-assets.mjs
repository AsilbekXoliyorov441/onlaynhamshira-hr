/**
 * Yakuniy CTA bloki uchun 3D emblema.
 *
 * Uslub — qolgan ikonkalardan jiddiyroq: boʻgʻiq (muted) yashil palitra,
 * matt yuza, kuchli yaltiroq va multfilm detallarisiz. Sertifikat muhriga
 * yaqin geometriya: yumaloq burchakli nishon + ichki halqa + tibbiy xoch.
 *
 * Ishga tushirish:  npm run icons:cta
 * Natija:           assets/cta/*.png
 */
import { renderIcons } from "./icon-kit.mjs";

const OUT = new URL("../assets/cta/", import.meta.url);

function emblem() {
  return `
<defs>
  <!-- Boʻgʻiq, matt yashil — neon emas -->
  <linearGradient id="ct-base" x1="0.12" y1="0" x2="0.88" y2="1">
    <stop offset="0" stop-color="#2C8A62"/>
    <stop offset="0.52" stop-color="#116245"/>
    <stop offset="1" stop-color="#053324"/>
  </linearGradient>
  <!-- Yuqoridan tushuvchi juda yumshoq yorugʻlik (yaltiroq emas) -->
  <linearGradient id="ct-top" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.18"/>
    <stop offset="0.55" stop-color="#FFFFFF" stop-opacity="0.04"/>
    <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
  </linearGradient>
  <!-- Pastki qismdagi hajm soyasi -->
  <linearGradient id="ct-bottom" x1="0" y1="0.45" x2="0" y2="1">
    <stop offset="0" stop-color="#06301F" stop-opacity="0"/>
    <stop offset="1" stop-color="#031E14" stop-opacity="0.38"/>
  </linearGradient>
  <filter id="ct-shadow" x="-40%" y="-30%" width="180%" height="180%">
    <feDropShadow dx="0" dy="22" stdDeviation="20" flood-color="#04241A" flood-opacity="0.34"/>
  </filter>
  <filter id="ct-blur" x="-60%" y="-60%" width="220%" height="220%">
    <feGaussianBlur stdDeviation="18"/>
  </filter>
</defs>

<ellipse cx="256" cy="452" rx="128" ry="18" fill="#06301F" opacity="0.14" filter="url(#ct-blur)"/>

<g filter="url(#ct-shadow)">
  <rect x="78" y="58" width="356" height="356" rx="102" fill="url(#ct-base)"/>
</g>
<rect x="78" y="58" width="356" height="356" rx="102" fill="url(#ct-top)"/>
<rect x="78" y="58" width="356" height="356" rx="102" fill="url(#ct-bottom)"/>
<rect x="80.5" y="60.5" width="351" height="351" rx="99.5"
      fill="none" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="5"/>

<!-- Ichki halqa — rasmiy muhr hissi -->
<circle cx="256" cy="236" r="124" fill="none" stroke="#FFFFFF" stroke-opacity="0.26" stroke-width="6"/>
<circle cx="256" cy="236" r="104" fill="#FFFFFF" opacity="0.07"/>

<!-- Tibbiy xoch -->
<path d="M231 158 h50 a10 10 0 0 1 10 10 v45 h45 a10 10 0 0 1 10 10 v50 a10 10 0 0 1 -10 10 h-45 v45
         a10 10 0 0 1 -10 10 h-50 a10 10 0 0 1 -10 -10 v-45 h-45 a10 10 0 0 1 -10 -10 v-50
         a10 10 0 0 1 10 -10 h45 v-45 a10 10 0 0 1 10 -10 z"
      fill="#F3FAF6"/>`;
}

await renderIcons([["cta-emblem", emblem]], OUT, { tile: false });
