import type { SVGProps } from "react";

type I = SVGProps<SVGSVGElement>;

/*
 * "Quyidagilarni tayyorlab qoʻying" boʻlimi uchun soft-3D ikonkalar.
 * Uslub ServiceIcons / HowItWorksIcons bilan bir xil: chapdan tushuvchi
 * yorugʻlik, toʻyingan gradient, oq gloss chekka va yerdagi yumshoq soya.
 */

function Shadow({ seed }: { seed: string }) {
  return (
    <filter id={`pr-sh-${seed}`} x="-40%" y="-30%" width="180%" height="180%">
      <feDropShadow dx="0" dy="3" stdDeviation="2.4" floodColor="#0B4C3A" floodOpacity="0.28" />
    </filter>
  );
}

function Ground({ cx = 24, cy = 43, rx = 12 }: { cx?: number; cy?: number; rx?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry="2.6" fill="#0B2B1C" opacity="0.09" />;
}

function Palette({ seed, from, mid, to }: { seed: string; from: string; mid: string; to: string }) {
  return (
    <linearGradient id={`pr-g-${seed}`} x1="10" y1="6" x2="38" y2="42" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor={from} />
      <stop offset="0.5" stopColor={mid} />
      <stop offset="1" stopColor={to} />
    </linearGradient>
  );
}

/* ───────────────── 1. Shaxsni tasdiqlovchi hujjat ─────────────────────────── */
export function IdCard3D(props: I) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <Shadow seed="id" />
        <Palette seed="id" from="#DCEEFF" mid="#8CC7EE" to="#2A7FB6" />
      </defs>
      <Ground rx={13} />
      <g filter="url(#pr-sh-id)">
        <rect x="4" y="9" width="40" height="28" rx="6.5" fill="url(#pr-g-id)" />
        <rect x="7.5" y="12.5" width="33" height="21" rx="4.5" fill="#F7FBFE" opacity="0.95" />
        <circle cx="17" cy="21" r="4.6" fill="#8CC7EE" />
        <path d="M11 31c.7-3.2 3.1-4.8 6-4.8s5.3 1.6 6 4.8H11Z" fill="#8CC7EE" />
        <g stroke="#B9D6E9" strokeWidth="2.2" strokeLinecap="round">
          <path d="M28 19h8.5M28 24h8.5M28 29h5.5" />
        </g>
      </g>
      <path d="M7.4 11.6c1.2-1.1 2.6-1.6 4.6-1.6" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

/* ───────────────── 2. Tibbiy diplom ───────────────────────────────────────── */
export function Diploma3D(props: I) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <Shadow seed="dip" />
        <Palette seed="dip" from="#FFFFFF" mid="#EDF3EF" to="#C2D4C9" />
        <Palette seed="rib" from="#FFE4A6" mid="#FFC44F" to="#E0901C" />
      </defs>
      <Ground rx={13} />
      <g filter="url(#pr-sh-dip)">
        <rect x="6" y="8" width="32" height="24" rx="4.5" fill="url(#pr-g-dip)" />
        <g stroke="#A9C0B4" strokeWidth="2.1" strokeLinecap="round">
          <path d="M11 15h16M11 20h22M11 25h13" />
        </g>
        <path
          d="M40 6.4c1.6 0 2.8 1.2 2.8 2.8v22c0 1.6-1.2 2.8-2.8 2.8V6.4Z"
          fill="#D5E3DA"
          opacity="0.8"
        />
        <circle cx="32.5" cy="30" r="7" fill="url(#pr-g-rib)" />
        <path
          d="M29 35.4l-1.4 7 4.9-2.6 4.9 2.6-1.4-7"
          fill="url(#pr-g-rib)"
        />
        <circle cx="32.5" cy="30" r="3.4" fill="#FFF3D6" opacity="0.9" />
      </g>
    </svg>
  );
}

/* ───────────────── 3. Malaka / toifa sertifikati ──────────────────────────── */
export function Certificate3D(props: I) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <Shadow seed="cer" />
        <Palette seed="cer" from="#D8F7E4" mid="#69DCA4" to="#0F8F5D" />
      </defs>
      <Ground rx={12} />
      <g filter="url(#pr-sh-cer)">
        <rect x="8" y="5" width="30" height="34" rx="6" fill="#FBFEFC" />
        <rect x="8" y="5" width="30" height="34" rx="6" stroke="#DCEBE2" strokeWidth="1.6" />
        <g stroke="#C6DDD0" strokeWidth="2.1" strokeLinecap="round">
          <path d="M13.5 12h19M13.5 17h19M13.5 22h11" />
        </g>
        <circle cx="30" cy="28.5" r="8" fill="url(#pr-g-cer)" />
        <path
          d="M26.4 28.6l2.6 2.6 4.8-5.4"
          stroke="#F2FFF7"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path d="M11.4 7.6c1-1 2.2-1.4 3.8-1.4" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

/* ───────────────── 4. Ish tajribasi ───────────────────────────────────────── */
export function Experience3D(props: I) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <Shadow seed="exp" />
        <Palette seed="exp" from="#CFEBFF" mid="#6FB6E4" to="#1E6E9E" />
        <Palette seed="exps" from="#FFF0BE" mid="#FFC94F" to="#E2921E" />
      </defs>
      <Ground rx={13} />
      <g filter="url(#pr-sh-exp)">
        <path
          d="M18 10.5A3.5 3.5 0 0 1 21.5 7h5A3.5 3.5 0 0 1 30 10.5V13h-3v-2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2h-3v-2.5Z"
          fill="#9BB9CB"
        />
        <rect x="5" y="13" width="38" height="24" rx="6" fill="url(#pr-g-exp)" />
        <rect x="5" y="21.5" width="38" height="3.4" fill="#FFFFFF" opacity="0.28" />
        <rect x="19.5" y="20" width="9" height="6" rx="2" fill="#F4FAFE" />
        <path d="M8 15.6c1.2-1.2 2.6-1.8 4.4-1.8" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" opacity="0.8" />
      </g>
      <g filter="url(#pr-sh-exp)">
        <path
          d="M36.6 27.6l1.7 3.4 3.8.5c.7.1.9.9.4 1.4l-2.7 2.6.6 3.7c.1.7-.6 1.2-1.2.9l-3.4-1.8-3.4 1.8c-.6.3-1.3-.2-1.2-.9l.6-3.7-2.7-2.6c-.5-.5-.2-1.3.4-1.4l3.8-.5 1.7-3.4c.3-.6 1.2-.6 1.6 0Z"
          fill="url(#pr-g-exps)"
        />
      </g>
    </svg>
  );
}

/* ───────────────── 5. Profil uchun fotosurat ──────────────────────────────── */
export function PhotoPortrait3D(props: I) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <Shadow seed="pho" />
        <Palette seed="pho" from="#E4D9FF" mid="#A992EC" to="#6244B8" />
      </defs>
      <Ground rx={13} />
      <g filter="url(#pr-sh-pho)">
        <path
          d="M4 17.5A5 5 0 0 1 9 12.5h3.4l1.7-3a3 3 0 0 1 2.6-1.5h10.6a3 3 0 0 1 2.6 1.5l1.7 3H39a5 5 0 0 1 5 5v13a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-13Z"
          fill="url(#pr-g-pho)"
        />
        <circle cx="24" cy="24" r="9" fill="#F8F5FF" />
        <circle cx="24" cy="21" r="3.5" fill="#A992EC" />
        <path d="M17.8 30.6c1.2-3 3.6-4.4 6.2-4.4s5 1.4 6.2 4.4c-1.7 1.5-3.8 2.4-6.2 2.4s-4.5-.9-6.2-2.4Z" fill="#A992EC" />
        <circle cx="37.5" cy="18.5" r="1.8" fill="#FFFFFF" opacity="0.85" />
        <path d="M7.4 15.4c1.2-1.2 2.6-1.8 4.4-1.8" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" opacity="0.75" />
      </g>
    </svg>
  );
}

/* ───────────────── 6. Qisqa video yozish imkoniyati ───────────────────────── */
export function VideoRecord3D(props: I) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <Shadow seed="vid" />
        <Palette seed="vid" from="#FFD9DF" mid="#F9899F" to="#D2405F" />
      </defs>
      <Ground rx={13} />
      <g filter="url(#pr-sh-vid)">
        <rect x="4" y="12" width="27" height="24" rx="6.5" fill="url(#pr-g-vid)" />
        <path
          d="M33 20.4l7.6-4.4c1.2-.7 2.6.2 2.6 1.5v13c0 1.3-1.4 2.2-2.6 1.5L33 27.6v-7.2Z"
          fill="url(#pr-g-vid)"
        />
        <circle cx="12.4" cy="19.6" r="2.8" fill="#FFF1F4" opacity="0.9" />
        <path d="M7.4 14.6c1.2-1.2 2.6-1.8 4.4-1.8" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" opacity="0.8" />
      </g>
      <g>
        <circle cx="17.5" cy="30" r="3.4" fill="#FFFFFF" opacity="0.95" />
        <circle cx="17.5" cy="30" r="1.7" fill="#D2405F" />
      </g>
    </svg>
  );
}

/* ───────────────── 7. Internetga ulangan smartfon ─────────────────────────── */
export function SmartphoneWifi3D(props: I) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <Shadow seed="sm" />
        <Palette seed="sm" from="#D9F7E7" mid="#63D9A2" to="#12855A" />
      </defs>
      <Ground rx={11} />
      <g filter="url(#pr-sh-sm)">
        <rect x="12" y="4" width="24" height="38" rx="7" fill="url(#pr-g-sm)" />
        <rect x="14.6" y="8.6" width="18.8" height="28" rx="4.2" fill="#F5FEF9" />
        <rect x="20.4" y="6" width="7.2" height="1.8" rx="0.9" fill="#EAFBF2" opacity="0.7" />
        <circle cx="24" cy="39.2" r="1.5" fill="#EAFBF2" opacity="0.8" />
        <path d="M15.4 7c1-1.2 2.2-1.8 3.8-1.8" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" opacity="0.8" />
      </g>
      <g stroke="#2CC176" strokeLinecap="round" fill="none">
        <path d="M20.4 24.6a5.2 5.2 0 0 1 7.2 0" strokeWidth="2.4" />
        <path d="M17.8 20.8a9 9 0 0 1 12.4 0" strokeWidth="2.4" opacity="0.6" />
        <circle cx="24" cy="28.6" r="1.6" fill="#2CC176" stroke="none" />
      </g>
    </svg>
  );
}
