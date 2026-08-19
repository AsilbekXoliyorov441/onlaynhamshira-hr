import type { SVGProps } from "react";

type I = SVGProps<SVGSVGElement>;

/*
 * Hamkorlik jarayoni (PartnerTimeline) bosqichlari uchun premium SVG
 * ikonkalar. Barchasi bitta vizual tizimga boʻysunadi: yumaloq burchakli
 * gradient "shisha" plitka + oq chiziqli glif + yumshoq ichki yorugʻlik va
 * tashqi soya — sahifaning umumiy yashil-koʻk uslubiga mos.
 */

const GRAD_IDS = {
  tile: "pt-tile",
  glow: "pt-glow",
  shadow: "pt-shadow",
} as const;

function Defs({ seed }: { seed: string }) {
  return (
    <defs>
      <linearGradient id={`${GRAD_IDS.tile}-${seed}`} x1="14" y1="10" x2="98" y2="102" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#7FE9C4" />
        <stop offset="0.5" stopColor="#3FCF6E" />
        <stop offset="1" stopColor="#1BA463" />
      </linearGradient>
      <radialGradient id={`${GRAD_IDS.glow}-${seed}`} cx="0.28" cy="0.2" r="0.65">
        <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <filter id={`${GRAD_IDS.shadow}-${seed}`} x="-30%" y="-20%" width="160%" height="160%">
        <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0F5132" floodOpacity="0.28" />
      </filter>
    </defs>
  );
}

function Tile({ seed }: { seed: string }) {
  return (
    <>
      <rect
        x="6"
        y="6"
        width="100"
        height="100"
        rx="28"
        fill={`url(#${GRAD_IDS.tile}-${seed})`}
        filter={`url(#${GRAD_IDS.shadow}-${seed})`}
      />
      <rect x="6" y="6" width="100" height="100" rx="28" fill={`url(#${GRAD_IDS.glow}-${seed})`} />
    </>
  );
}

/* 1. Ariza topshirish — forma + qalam */
export function IntroIcon(props: I) {
  const seed = "intro";
  return (
    <svg viewBox="0 0 112 112" fill="none" {...props}>
      <Defs seed={seed} />
      <Tile seed={seed} />
      <rect x="34" y="28" width="44" height="56" rx="7" fill="#fff" fillOpacity="0.95" />
      <rect x="42" y="40" width="28" height="4" rx="2" fill="#1BA463" fillOpacity="0.55" />
      <rect x="42" y="50" width="28" height="4" rx="2" fill="#1BA463" fillOpacity="0.4" />
      <rect x="42" y="60" width="18" height="4" rx="2" fill="#1BA463" fillOpacity="0.4" />
      <path
        d="M69 68 82 55a4.2 4.2 0 0 1 6 6L75 74l-8 2 2-8Z"
        fill="#fff"
        stroke="#1BA463"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* 2. Dastlabki saralash — katta ko'zoyna + tekshiruv roʻyxati */
export function QualificationIcon(props: I) {
  const seed = "qual";
  return (
    <svg viewBox="0 0 112 112" fill="none" {...props}>
      <Defs seed={seed} />
      <Tile seed={seed} />
      <rect x="33" y="27" width="34" height="46" rx="6" fill="#fff" fillOpacity="0.95" />
      {[35, 45, 55].map((y) => (
        <g key={y}>
          <circle cx="41" cy={y} r="3.4" fill="none" stroke="#1BA463" strokeWidth="2.4" />
          <path d={`M39 ${y}l1.4 1.6L43 ${y - 2}`} stroke="#1BA463" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="48" y={y - 1.6} width="14" height="3.2" rx="1.6" fill="#1BA463" fillOpacity="0.45" />
        </g>
      ))}
      <circle cx="73" cy="70" r="13" fill="#fff" stroke="#fff" strokeWidth="2" />
      <circle cx="73" cy="70" r="10" fill="none" stroke="#1BA463" strokeWidth="4.2" />
      <line x1="81" y1="78" x2="90" y2="87" stroke="#1BA463" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/* 3. O'quv va mini-test — ochiq kitob */
export function EducationIcon(props: I) {
  const seed = "edu";
  return (
    <svg viewBox="0 0 112 112" fill="none" {...props}>
      <Defs seed={seed} />
      <Tile seed={seed} />
      <path
        d="M56 40c-5-5-14-7-24-6v38c10-1 19 1 24 6 5-5 14-7 24-6V34c-10-1-19 1-24 6Z"
        fill="#fff"
        fillOpacity="0.95"
      />
      <line x1="56" y1="40" x2="56" y2="78" stroke="#1BA463" strokeWidth="2.2" />
      <line x1="36" y1="42" x2="47" y2="41" stroke="#1BA463" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="36" y1="50" x2="47" y2="49" stroke="#1BA463" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="65" y1="41" x2="76" y2="42" stroke="#1BA463" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="65" y1="49" x2="76" y2="50" stroke="#1BA463" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
      <circle cx="82" cy="30" r="10" fill="#FFC440" />
      <path d="M78 30.5 81 33.5 87 26.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* 4. Video xabar yuborish — video kamera + play */
export function MotivationIcon(props: I) {
  const seed = "motiv";
  return (
    <svg viewBox="0 0 112 112" fill="none" {...props}>
      <Defs seed={seed} />
      <Tile seed={seed} />
      <rect x="28" y="40" width="38" height="30" rx="8" fill="#fff" fillOpacity="0.95" />
      <path d="M66 50 82 42v26l-16-8Z" fill="#fff" fillOpacity="0.95" />
      <circle cx="47" cy="55" r="10" fill="#1BA463" />
      <path d="M44 50.5 53 55l-9 4.5Z" fill="#fff" />
    </svg>
  );
}

/* 5. Batafsil video darslar — telefon + play tugmasi */
export function AppLessonsIcon(props: I) {
  const seed = "lessons";
  return (
    <svg viewBox="0 0 112 112" fill="none" {...props}>
      <Defs seed={seed} />
      <Tile seed={seed} />
      <rect x="38" y="24" width="36" height="64" rx="9" fill="#fff" fillOpacity="0.95" />
      <rect x="43" y="32" width="26" height="42" rx="3" fill="#1BA463" fillOpacity="0.16" />
      <circle cx="56" cy="53" r="11" fill="#1BA463" />
      <path d="M53 48 62 53l-9 5Z" fill="#fff" />
      <circle cx="56" cy="80" r="2.6" fill="#1BA463" fillOpacity="0.5" />
    </svg>
  );
}

/* 6. Ilovada roʻyxatdan oʻtish — profil + tasdiq */
export function RegisterIcon(props: I) {
  const seed = "register";
  return (
    <svg viewBox="0 0 112 112" fill="none" {...props}>
      <Defs seed={seed} />
      <Tile seed={seed} />
      <circle cx="52" cy="44" r="13" fill="#fff" fillOpacity="0.95" />
      <path
        d="M30 82c2-14 12-22 22-22s20 8 22 22"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.95"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <circle cx="80" cy="76" r="14" fill="#FFC440" />
      <path d="M74 76.5 78.5 81 87 71.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* 7. Buyurtmani qabul qilish — tasdiqlangan chek/plomba */
export function OrderIcon(props: I) {
  const seed = "order";
  return (
    <svg viewBox="0 0 112 112" fill="none" {...props}>
      <Defs seed={seed} />
      <Tile seed={seed} />
      <rect x="32" y="26" width="40" height="52" rx="7" fill="#fff" fillOpacity="0.95" />
      <line x1="40" y1="38" x2="64" y2="38" stroke="#1BA463" strokeWidth="2.4" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="40" y1="47" x2="64" y2="47" stroke="#1BA463" strokeWidth="2.4" strokeLinecap="round" strokeOpacity="0.4" />
      <line x1="40" y1="56" x2="54" y2="56" stroke="#1BA463" strokeWidth="2.4" strokeLinecap="round" strokeOpacity="0.4" />
      <circle cx="76" cy="70" r="17" fill="#FFC440" />
      <circle cx="76" cy="70" r="17" fill="none" stroke="#fff" strokeWidth="2.4" strokeDasharray="3 4" />
      <path d="M68 70.5 73.5 76 85 63" stroke="#fff" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
