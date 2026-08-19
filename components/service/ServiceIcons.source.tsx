import type { SVGProps } from "react";

type I = SVGProps<SVGSVGElement>;

/*
 * "Mutaxassislar qanday xizmatlar koʻrsatadi?" boʻlimi uchun 3D ikonkalar.
 *
 * Uslub: yumshoq hajm (soft-3D) — chapdan tushuvchi yorugʻlik, toʻyingan
 * gradient, oq yaltiroq chekka (gloss) va yerdagi yumshoq soya. Plitka yoʻq —
 * ikonka shisha kartochka ustida "suzib" turadi.
 */

/* Har bir ikonka uchun umumiy soya filtri va yerdagi soya */
function Shadow({ seed }: { seed: string }) {
  return (
    <filter id={`sv-sh-${seed}`} x="-35%" y="-30%" width="170%" height="180%">
      <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#0B4C3A" floodOpacity="0.26" />
    </filter>
  );
}

type Num = number | string;

function Ground({ cx = 48, cy = 88, rx = 26 }: { cx?: Num; cy?: Num; rx?: Num }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry="5" fill="#0B2B1C" opacity="0.1" />;
}

/* ───────────────────────── 1. Ukol va inyeksiyalar ───────────────────────── */
export function SyringeVial3D(props: I) {
  return (
    <svg viewBox="0 0 96 96" fill="none" {...props}>
      <defs>
        <Shadow seed="syr" />
        <linearGradient id="sv-metal" x1="30" y1="8" x2="66" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FBFDFE" />
          <stop offset="0.45" stopColor="#DCE7EE" />
          <stop offset="1" stopColor="#9FB4C1" />
        </linearGradient>
        <linearGradient id="sv-glass" x1="34" y1="26" x2="62" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.98" />
          <stop offset="0.55" stopColor="#EAF4F8" stopOpacity="0.92" />
          <stop offset="1" stopColor="#C8DCE6" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="sv-liquid" x1="38" y1="40" x2="58" y2="66" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFC2D2" />
          <stop offset="1" stopColor="#F0507E" />
        </linearGradient>
        <linearGradient id="sv-vial" x1="62" y1="44" x2="84" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#CFE3EC" />
        </linearGradient>
        <linearGradient id="sv-vliq" x1="64" y1="60" x2="82" y2="84" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9BEFC5" />
          <stop offset="1" stopColor="#17A468" />
        </linearGradient>
      </defs>

      <Ground cx="50" cy="88" rx="30" />

      {/* ── Shprits ── */}
      <g
        filter="url(#sv-sh-syr)"
        transform="translate(-9 1) rotate(-30 48 48) translate(48 48) scale(.86) translate(-48 -48)"
      >
        {/* igna */}
        <path d="M48 3.5 51 12v8h-6v-8L48 3.5Z" fill="url(#sv-metal)" />
        <rect x="46.6" y="10" width="2.8" height="12" rx="1.4" fill="url(#sv-metal)" />
        {/* konus */}
        <path d="M41 20h14l-2.6 8h-8.8L41 20Z" fill="url(#sv-metal)" />
        {/* silindr */}
        <rect x="36.5" y="27" width="23" height="39" rx="5" fill="url(#sv-glass)" />
        <rect
          x="37.25"
          y="27.75"
          width="21.5"
          height="37.5"
          rx="4.25"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.9"
          strokeWidth="1.5"
        />
        {/* dori */}
        <path d="M39 43h18v18.5a3.5 3.5 0 0 1-3.5 3.5h-11A3.5 3.5 0 0 1 39 61.5V43Z" fill="url(#sv-liquid)" />
        {/* shkala */}
        <g stroke="#7FA0B2" strokeOpacity="0.65" strokeWidth="1.4" strokeLinecap="round">
          <path d="M54 33.5h3.5M54 38h3.5M54 42.5h3.5" />
        </g>
        {/* yaltiroq */}
        <rect x="40" y="30" width="3.6" height="32" rx="1.8" fill="#fff" fillOpacity="0.75" />
        {/* flanets va porshen */}
        <rect x="30" y="65.5" width="36" height="6" rx="3" fill="url(#sv-metal)" />
        <rect x="43.5" y="71" width="9" height="13" rx="2" fill="url(#sv-metal)" />
        <rect x="35.5" y="83" width="25" height="7.5" rx="3.75" fill="url(#sv-metal)" />
      </g>

      {/* ── Flakon ── */}
      <g filter="url(#sv-sh-syr)">
        <rect x="63" y="50" width="21" height="36" rx="6" fill="url(#sv-vial)" />
        <path d="M65.5 66h16v14a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 65.5 80V66Z" fill="url(#sv-vliq)" />
        <rect
          x="63.75"
          y="50.75"
          width="19.5"
          height="34.5"
          rx="5.25"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.92"
          strokeWidth="1.5"
        />
        <rect x="66" y="53.5" width="3.2" height="26" rx="1.6" fill="#fff" fillOpacity="0.8" />
        <rect x="65.5" y="42" width="16" height="9" rx="3" fill="url(#sv-metal)" />
        <rect x="68.5" y="38.5" width="10" height="5" rx="2" fill="url(#sv-metal)" />
      </g>
    </svg>
  );
}

/* ───────────────────────── 2. Tomchilatib davolash ───────────────────────── */
export function IvDrip3D(props: I) {
  return (
    <svg viewBox="0 0 96 96" fill="none" {...props}>
      <defs>
        <Shadow seed="iv" />
        <linearGradient id="iv-pole" x1="16" y1="10" x2="26" y2="86" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FBFDFE" />
          <stop offset="0.5" stopColor="#D6E4EC" />
          <stop offset="1" stopColor="#98AEBC" />
        </linearGradient>
        <linearGradient id="iv-bag" x1="32" y1="14" x2="62" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.98" />
          <stop offset="1" stopColor="#D5E9F2" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="iv-liq" x1="34" y1="28" x2="60" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8FE9F7" />
          <stop offset="1" stopColor="#1B92C9" />
        </linearGradient>
        <linearGradient id="iv-drop" x1="40" y1="68" x2="54" y2="84" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#B6F0FF" />
          <stop offset="1" stopColor="#1B92C9" />
        </linearGradient>
      </defs>

      <Ground cx="26" cy="88" rx="17" />

      {/* ── Shtativ ── */}
      <g filter="url(#sv-sh-iv)">
        <path d="M23 12h9a5 5 0 0 1 5 5v2" stroke="url(#iv-pole)" strokeWidth="4" strokeLinecap="round" />
        <rect x="20" y="10" width="5" height="76" rx="2.5" fill="url(#iv-pole)" />
        <ellipse cx="22.5" cy="86" rx="11" ry="3.6" fill="url(#iv-pole)" />
      </g>

      {/* ── Paket ── */}
      <g filter="url(#sv-sh-iv)">
        <path d="M34 22h26a4 4 0 0 1 4 4v26a8 8 0 0 1-8 8H38a8 8 0 0 1-8-8V26a4 4 0 0 1 4-4Z" fill="url(#iv-bag)" />
        <path d="M31.5 36h31v16a8 8 0 0 1-8 8H39.5a8 8 0 0 1-8-8V36Z" fill="url(#iv-liq)" />
        <path
          d="M34 22h26a4 4 0 0 1 4 4v26a8 8 0 0 1-8 8H38a8 8 0 0 1-8-8V26a4 4 0 0 1 4-4Z"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.92"
          strokeWidth="1.6"
        />
        <rect x="34.5" y="26" width="3.6" height="29" rx="1.8" fill="#fff" fillOpacity="0.72" />
        <path d="M43 22v-4a4 4 0 0 1 8 0v4" stroke="#C4D8E4" strokeWidth="2.6" strokeLinecap="round" />
        <rect x="42" y="27" width="14" height="4" rx="2" fill="#fff" fillOpacity="0.85" />
      </g>

      {/* ── Tomchi kamerasi va tomchi ── */}
      <path d="M47 60v4" stroke="#BFD6E2" strokeWidth="3" strokeLinecap="round" />
      <g filter="url(#sv-sh-iv)">
        <rect x="41" y="63" width="12" height="17" rx="6" fill="url(#iv-bag)" />
        <rect
          x="41.75"
          y="63.75"
          width="10.5"
          height="15.5"
          rx="5.25"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.9"
          strokeWidth="1.5"
        />
        <path d="M47 66c2.6 3 4 4.8 4 6.4a4 4 0 1 1-8 0c0-1.6 1.4-3.4 4-6.4Z" fill="url(#iv-drop)" />
      </g>
      <path d="M53 76c6 3 8 6 8 10" stroke="#CFE2EC" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M61 82c1.8 2.4 2.8 3.9 2.8 5.2a2.8 2.8 0 1 1-5.6 0c0-1.3 1-2.8 2.8-5.2Z" fill="url(#iv-drop)" />
    </svg>
  );
}

/* ───────────────────── 3. Uyda bemor parvarishi (yurak) ───────────────────── */
export function HeartCare3D(props: I) {
  return (
    <svg viewBox="0 0 96 96" fill="none" {...props}>
      <defs>
        <Shadow seed="hc" />
        <linearGradient id="hc-a" x1="12" y1="10" x2="82" y2="84" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFB3C1" />
          <stop offset="0.42" stopColor="#F65A72" />
          <stop offset="1" stopColor="#C81E45" />
        </linearGradient>
        <radialGradient id="hc-gloss" cx="0.3" cy="0.2" r="0.62">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hc-cross" x1="48" y1="34" x2="82" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#B6ECC6" />
          <stop offset="0.45" stopColor="#4FD189" />
          <stop offset="1" stopColor="#12855A" />
        </linearGradient>
      </defs>

      <Ground cx="46" cy="88" rx="27" />

      <g filter="url(#sv-sh-hc)">
        <path
          d="M46 84C24 68 8 53 8 35.5 8 22.5 18 12 30.5 12c7.2 0 13.6 3.5 17.5 9 3.9-5.5 10.3-9 17.5-9C78 12 88 22.5 88 35.5 88 53 68 68 46 84Z"
          fill="url(#hc-a)"
        />
        <path
          d="M46 84C24 68 8 53 8 35.5 8 22.5 18 12 30.5 12c7.2 0 13.6 3.5 17.5 9 3.9-5.5 10.3-9 17.5-9C78 12 88 22.5 88 35.5 88 53 68 68 46 84Z"
          fill="url(#hc-gloss)"
        />
        {/* yaltiroq nur */}
        <path
          d="M24 24c-5 3.5-8 8.6-8 13.6 0 2 2.6 2.6 3.6.8 2.6-4.6 6-8.6 10.2-11.4 1.9-1.3.9-4.3-1.4-4.3-1.6 0-3 .4-4.4 1.3Z"
          fill="#fff"
          fillOpacity="0.6"
        />
      </g>

      {/* Yashil tibbiy xoch */}
      <g filter="url(#sv-sh-hc)">
        <rect x="59" y="35" width="14" height="38" rx="6" fill="url(#hc-cross)" />
        <rect x="47" y="47" width="38" height="14" rx="6" fill="url(#hc-cross)" />
        <rect x="61.5" y="38" width="4" height="12" rx="2" fill="#fff" fillOpacity="0.55" />
      </g>
    </svg>
  );
}

/* ─────────────────── 4. Bogʻlam va yara parvarishi (plastir) ─────────────────── */
export function Bandage3D(props: I) {
  return (
    <svg viewBox="0 0 96 96" fill="none" {...props}>
      <defs>
        <Shadow seed="bd" />
        <linearGradient id="bd-a" x1="16" y1="20" x2="80" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFEBDC" />
          <stop offset="0.5" stopColor="#FFCFAE" />
          <stop offset="1" stopColor="#E9A277" />
        </linearGradient>
        <linearGradient id="bd-b" x1="20" y1="70" x2="78" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFF6EE" />
          <stop offset="0.5" stopColor="#FFDCC3" />
          <stop offset="1" stopColor="#F0AF86" />
        </linearGradient>
        <linearGradient id="bd-pad" x1="34" y1="34" x2="62" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFEEE1" />
        </linearGradient>
      </defs>

      <Ground cx="48" cy="87" rx="28" />

      <g filter="url(#sv-sh-bd)">
        {/* pastki plastir */}
        <g transform="rotate(-38 48 48)">
          <rect x="10" y="37" width="76" height="22" rx="11" fill="url(#bd-b)" />
          <rect
            x="10.9"
            y="37.9"
            width="74.2"
            height="20.2"
            rx="10.1"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.85"
            strokeWidth="1.6"
          />
          <rect x="36" y="38.5" width="24" height="19" rx="4" fill="url(#bd-pad)" />
          <g fill="#E0A07A" opacity="0.75">
            <circle cx="19" cy="44" r="1.8" />
            <circle cx="25" cy="52" r="1.8" />
            <circle cx="25" cy="44" r="1.8" />
            <circle cx="19" cy="52" r="1.8" />
            <circle cx="71" cy="44" r="1.8" />
            <circle cx="77" cy="52" r="1.8" />
            <circle cx="77" cy="44" r="1.8" />
            <circle cx="71" cy="52" r="1.8" />
          </g>
        </g>
        {/* ustki plastir */}
        <g transform="rotate(38 48 48)">
          <rect x="10" y="37" width="76" height="22" rx="11" fill="url(#bd-a)" />
          <rect
            x="10.9"
            y="37.9"
            width="74.2"
            height="20.2"
            rx="10.1"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.9"
            strokeWidth="1.6"
          />
          <rect x="36" y="38.5" width="24" height="19" rx="4" fill="url(#bd-pad)" />
          <rect x="14" y="40" width="58" height="3.4" rx="1.7" fill="#fff" fillOpacity="0.55" />
          <g fill="#D89164" opacity="0.75">
            <circle cx="19" cy="44" r="1.8" />
            <circle cx="25" cy="52" r="1.8" />
            <circle cx="25" cy="44" r="1.8" />
            <circle cx="19" cy="52" r="1.8" />
            <circle cx="71" cy="44" r="1.8" />
            <circle cx="77" cy="52" r="1.8" />
            <circle cx="77" cy="44" r="1.8" />
            <circle cx="71" cy="52" r="1.8" />
          </g>
        </g>
      </g>
    </svg>
  );
}

/* ─────────────────── 5. Bosim va puls oʻlchash (tonometr) ─────────────────── */
export function BloodPressure3D(props: I) {
  return (
    <svg viewBox="0 0 96 96" fill="none" {...props}>
      <defs>
        <Shadow seed="bp" />
        <linearGradient id="bp-body" x1="8" y1="26" x2="54" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.55" stopColor="#E6F3F8" />
          <stop offset="1" stopColor="#B9D3E0" />
        </linearGradient>
        <linearGradient id="bp-screen" x1="14" y1="32" x2="46" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1E6B7E" />
          <stop offset="1" stopColor="#0B3B47" />
        </linearGradient>
        <linearGradient id="bp-bulb" x1="54" y1="52" x2="82" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F5FAFD" />
          <stop offset="0.5" stopColor="#CFE0EA" />
          <stop offset="1" stopColor="#8FA9B8" />
        </linearGradient>
        <linearGradient id="bp-heart" x1="54" y1="8" x2="88" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFB3C1" />
          <stop offset="0.45" stopColor="#F65A72" />
          <stop offset="1" stopColor="#C81E45" />
        </linearGradient>
      </defs>

      <Ground cx="44" cy="88" rx="30" />

      {/* ── Tonometr ── */}
      <g filter="url(#sv-sh-bp)">
        <rect x="8" y="28" width="46" height="48" rx="13" fill="url(#bp-body)" />
        <rect
          x="8.9"
          y="28.9"
          width="44.2"
          height="46.2"
          rx="12.1"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.92"
          strokeWidth="1.8"
        />
        <rect x="14" y="34" width="34" height="22" rx="7" fill="url(#bp-screen)" />
        <path
          d="M18 47.5h5l3-7 4 12 3.5-8 2.5 3h8"
          stroke="#7FE7B4"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <rect x="15.5" y="36" width="9" height="2.6" rx="1.3" fill="#fff" fillOpacity="0.28" />
        <circle cx="22" cy="66" r="6.5" fill="#fff" />
        <circle cx="22" cy="66" r="6.5" fill="none" stroke="#C3D8E3" strokeWidth="1.4" />
        <path d="M22 66l3.4-3" stroke="#1BA463" strokeWidth="2" strokeLinecap="round" />
        <rect x="34" y="61" width="14" height="10" rx="5" fill="#4FD189" />
        <rect x="35.5" y="62.5" width="11" height="3" rx="1.5" fill="#fff" fillOpacity="0.45" />
      </g>

      {/* ── Nok (груша) ── */}
      <g filter="url(#sv-sh-bp)">
        <path d="M54 58c2-6 7-9 12-9s10 3 12 9c1.6 4.6.4 10-3.4 13.4C70.6 75 66.4 76.5 62 76.5c-6.6 0-11.4-4.4-11.4-10.5 0-2.6 1.1-5.4 3.4-8Z" fill="url(#bp-bulb)" />
        <path d="M60 52c-3.4-2.6-6-6-7.4-9.6" stroke="#B9D3E0" strokeWidth="3.4" strokeLinecap="round" fill="none" />
        <ellipse cx="62" cy="60" rx="5" ry="3.4" fill="#fff" fillOpacity="0.6" />
      </g>

      {/* ── Yurak + puls ── */}
      <g filter="url(#sv-sh-bp)">
        <path
          d="M71 44c-9-6.6-16-12.6-16-19.8C55 18.6 59.2 14 64.4 14c3 0 5.7 1.4 7.3 3.7 1.6-2.3 4.3-3.7 7.3-3.7C84.2 14 88.4 18.6 88.4 24.2 88.4 31.4 80 38 71 44Z"
          fill="url(#bp-heart)"
        />
        <path d="M60 27h5l2.6-5 3.6 10 3-6.4 1.8 2.4h6.6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}

/* ───────── 6. Shifokor tavsiyasiga asosan muolajalar (retsept/planshet) ───────── */
export function Prescription3D(props: I) {
  return (
    <svg viewBox="0 0 96 96" fill="none" {...props}>
      <defs>
        <Shadow seed="rx" />
        <linearGradient id="rx-board" x1="14" y1="12" x2="78" y2="84" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#CFF5DC" />
          <stop offset="0.45" stopColor="#4FD189" />
          <stop offset="1" stopColor="#12855A" />
        </linearGradient>
        <linearGradient id="rx-paper" x1="22" y1="20" x2="70" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#EDF6F2" />
        </linearGradient>
        <linearGradient id="rx-clip" x1="34" y1="6" x2="60" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FBFDFE" />
          <stop offset="1" stopColor="#9FB4C1" />
        </linearGradient>
      </defs>

      <Ground cx="48" cy="88" rx="26" />

      <g filter="url(#sv-sh-rx)" transform="rotate(-5 48 48)">
        {/* planshet */}
        <rect x="15" y="14" width="58" height="70" rx="12" fill="url(#rx-board)" />
        <rect
          x="15.9"
          y="14.9"
          width="56.2"
          height="68.2"
          rx="11.1"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.6"
          strokeWidth="1.8"
        />
        {/* qogʻoz */}
        <rect x="21" y="22" width="46" height="56" rx="7" fill="url(#rx-paper)" />
        {/* qisqich */}
        <rect x="37" y="8" width="16" height="13" rx="5" fill="url(#rx-clip)" />
        <rect x="40" y="5" width="10" height="7" rx="3.5" fill="url(#rx-clip)" />
        {/* tibbiy xoch */}
        <rect x="42.5" y="28" width="7" height="19" rx="3" fill="#4FD189" />
        <rect x="36.5" y="34" width="19" height="7" rx="3" fill="#4FD189" />
        {/* matn satrlari */}
        <g fill="#C6D8D0">
          <rect x="27" y="54" width="34" height="4" rx="2" />
          <rect x="27" y="62" width="26" height="4" rx="2" />
          <rect x="27" y="70" width="30" height="4" rx="2" />
        </g>
        <rect x="23.5" y="26" width="3" height="48" rx="1.5" fill="#fff" fillOpacity="0.7" />
      </g>
    </svg>
  );
}

/* ───────────── 7. Massaj xizmatlari (yumshoq qoʻllar + tebranish) ───────────── */
export function Massage3D(props: I) {
  return (
    <svg viewBox="0 0 96 96" fill="none" {...props}>
      <defs>
        <Shadow seed="ms" />
        <linearGradient id="ms-hand" x1="20" y1="26" x2="72" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFEBDC" />
          <stop offset="0.5" stopColor="#FFCFAE" />
          <stop offset="1" stopColor="#E29B6F" />
        </linearGradient>
        <linearGradient id="ms-wave" x1="24" y1="10" x2="80" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8FE9F7" />
          <stop offset="1" stopColor="#2CC176" />
        </linearGradient>
      </defs>

      <Ground cx="48" cy="88" rx="26" />

      {/* tebranish toʻlqinlari */}
      <g stroke="url(#ms-wave)" strokeLinecap="round" fill="none">
        <path d="M28 30c5-7 12-11 20-11s15 4 20 11" strokeWidth="4" opacity="0.95" />
        <path d="M22 21c7-8 16-13 26-13s19 5 26 13" strokeWidth="3.4" opacity="0.6" />
      </g>

      <g filter="url(#sv-sh-ms)" transform="rotate(6 48 58)">
        {/* barmoqlar */}
        <rect x="31" y="34" width="8.5" height="26" rx="4.25" fill="url(#ms-hand)" />
        <rect x="41" y="30" width="8.5" height="30" rx="4.25" fill="url(#ms-hand)" />
        <rect x="51" y="32" width="8.5" height="28" rx="4.25" fill="url(#ms-hand)" />
        <rect x="61" y="38" width="8" height="22" rx="4" fill="url(#ms-hand)" />
        {/* kaft */}
        <path d="M29 54h42v12c0 8.8-7.2 16-16 16H45c-8.8 0-16-7.2-16-16V54Z" fill="url(#ms-hand)" />
        {/* bosh barmoq */}
        <rect
          x="14"
          y="56"
          width="20"
          height="10.5"
          rx="5.25"
          fill="url(#ms-hand)"
          transform="rotate(-18 24 61)"
        />
        {/* yaltiroq */}
        <path
          d="M36 62c0 6 2.5 11 7 14"
          stroke="#fff"
          strokeOpacity="0.55"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

/* ───────────── 8. Mutaxassislikka mos boshqa xizmatlar (tibbiy chamadon) ───────────── */
export function MedicalBag3D(props: I) {
  return (
    <svg viewBox="0 0 96 96" fill="none" {...props}>
      <defs>
        <Shadow seed="mb" />
        <linearGradient id="mbg-a" x1="10" y1="30" x2="84" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#B6ECC6" />
          <stop offset="0.42" stopColor="#4FD189" />
          <stop offset="1" stopColor="#12855A" />
        </linearGradient>
        <linearGradient id="mbg-b" x1="12" y1="40" x2="84" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F4FFF8" />
          <stop offset="1" stopColor="#CFEFDD" />
        </linearGradient>
        <linearGradient id="mbg-h" x1="34" y1="16" x2="62" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8FDCB0" />
          <stop offset="1" stopColor="#17835A" />
        </linearGradient>
      </defs>

      <Ground cx="48" cy="87" rx="30" />

      <g filter="url(#sv-sh-mb)">
        {/* tutqich */}
        <path
          d="M36 32v-6a12 12 0 0 1 24 0v6"
          stroke="url(#mbg-h)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        {/* korpus */}
        <rect x="10" y="30" width="76" height="50" rx="14" fill="url(#mbg-a)" />
        <rect
          x="10.9"
          y="30.9"
          width="74.2"
          height="48.2"
          rx="13.1"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.7"
          strokeWidth="1.8"
        />
        {/* oq belbogʻ */}
        <rect x="10" y="44" width="76" height="15" fill="url(#mbg-b)" />
        {/* xoch */}
        <rect x="43" y="38" width="10" height="27" rx="4" fill="#17A468" />
        <rect x="34.5" y="46.5" width="27" height="10" rx="4" fill="#17A468" />
        {/* qulf va yaltiroq */}
        <rect x="41" y="26.5" width="14" height="7" rx="3.5" fill="url(#mbg-b)" />
        <rect x="16" y="34" width="26" height="4" rx="2" fill="#fff" fillOpacity="0.5" />
      </g>
    </svg>
  );
}

/* ───────────────── Kartochka burchagidagi yashil "check" nishoni ───────────────── */
export function CheckBadge3D(props: I) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <defs>
        <linearGradient id="cb-a" x1="4" y1="3" x2="28" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#B6ECC6" />
          <stop offset="0.45" stopColor="#4FD189" />
          <stop offset="1" stopColor="#12855A" />
        </linearGradient>
        <radialGradient id="cb-b" cx="0.3" cy="0.22" r="0.6">
          <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="url(#cb-a)" />
      <circle cx="16" cy="16" r="14" fill="url(#cb-b)" />
      <circle cx="16" cy="16" r="14" fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="1.6" />
      <path d="M10 16.4l4 4 8-8.6" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ───────────────── Dekor: mikroskop (pastki-oʻng burchak) ───────────────── */
export function Microscope3D(props: I) {
  return (
    <svg viewBox="0 0 96 96" fill="none" {...props}>
      <defs>
        <Shadow seed="mc" />
        <linearGradient id="mc-a" x1="26" y1="10" x2="76" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#CFF5DC" />
          <stop offset="0.45" stopColor="#4FD189" />
          <stop offset="1" stopColor="#1B92C9" />
        </linearGradient>
        <linearGradient id="mc-b" x1="18" y1="60" x2="78" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F2FBF6" />
          <stop offset="1" stopColor="#BFE0D4" />
        </linearGradient>
      </defs>

      <Ground cx="48" cy="88" rx="28" />

      <g filter="url(#sv-sh-mc)">
        {/* asos */}
        <rect x="16" y="76" width="64" height="10" rx="5" fill="url(#mc-a)" />
        <rect x="26" y="68" width="44" height="8" rx="4" fill="url(#mc-b)" />
        {/* qulf/tutqich */}
        <path d="M44 68c-14-4-16-24-2-32" stroke="url(#mc-a)" strokeWidth="9" strokeLinecap="round" fill="none" />
        {/* stol */}
        <rect x="30" y="56" width="30" height="7" rx="3.5" fill="url(#mc-b)" />
        {/* tubus */}
        <g transform="rotate(20 56 36)">
          <rect x="48" y="12" width="17" height="40" rx="7" fill="url(#mc-a)" />
          <rect x="50.5" y="6" width="12" height="9" rx="4" fill="url(#mc-b)" />
          <rect x="50" y="50" width="13" height="9" rx="4" fill="url(#mc-b)" />
          <rect x="51" y="16" width="3.6" height="28" rx="1.8" fill="#fff" fillOpacity="0.55" />
        </g>
      </g>
    </svg>
  );
}
