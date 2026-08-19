/**
 * "Koʻp beriladigan savollar" boʻlimi uchun 3D savol belgisi.
 *
 * Ishga tushirish:  npm run icons:faq
 * Natija:           assets/faq/*.png
 */
import { gloss, renderIcons } from "./icon-kit.mjs";

const OUT = new URL("../assets/faq/", import.meta.url);

/* Savol belgisi — asosiy suhbat pufagi + orqadagi kichik pufak */
function faqBubble() {
  const bubble = `<path d="M150 82 h236 a68 68 0 0 1 68 68 v130 a68 68 0 0 1 -68 68 h-116 l-74 62 v-62 h-46 a68 68 0 0 1 -68 -68 V150 a68 68 0 0 1 68 -68 z"/>`;
  return `
<ellipse cx="256" cy="424" rx="150" ry="26" fill="#0B4C30" opacity="0.15" filter="url(#bl22)"/>
<g filter="url(#soft2)">
  <path d="M330 44 h86 a48 48 0 0 1 48 48 v52 a48 48 0 0 1 -48 48 h-86 a48 48 0 0 1 -48 -48 V92 a48 48 0 0 1 48 -48 z" fill="url(#gW)"/>
  <g fill="#9CD9BC">
    <circle cx="348" cy="118" r="11"/><circle cx="374" cy="118" r="11"/><circle cx="400" cy="118" r="11"/>
  </g>
</g>
<g filter="url(#soft)">
  <path d="M150 82 h236 a68 68 0 0 1 68 68 v130 a68 68 0 0 1 -68 68 h-116 l-74 62 v-62 h-46 a68 68 0 0 1 -68 -68 V150 a68 68 0 0 1 68 -68 z" fill="url(#gG)"/>
</g>
${gloss(bubble, 176, 130, 96, 56, 0.62)}
<path d="M222 190 a46 46 0 1 1 46 46 v22"
      fill="none" stroke="#FFFFFF" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="268" cy="304" r="20" fill="#FFFFFF"/>`;
}

await renderIcons([["faq-hero", faqBubble]], OUT, { tile: false });
