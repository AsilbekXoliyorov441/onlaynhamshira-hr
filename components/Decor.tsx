import type { SVGProps } from "react";

type I = SVGProps<SVGSVGElement>;

/* Yorqin yashil 3D yurak + oq xoch */
export function HeartPlus3D(props: I) {
  return (
    <svg viewBox="0 0 120 110" fill="none" {...props}>
      <defs>
        <linearGradient
          id="hp-a"
          x1="14"
          y1="8"
          x2="104"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#B6ECC6" />
          <stop offset="0.45" stopColor="#4FD189" />
          <stop offset="1" stopColor="#1BA463" />
        </linearGradient>
        <radialGradient id="hp-b" cx="0.3" cy="0.22" r="0.6">
          <stop offset="0" stopColor="#fff" stopOpacity=".85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M60 102C34 84 8 64 8 40.5 8 22.5 21.6 10 38 10c9.4 0 17.6 4.6 22 11.8C64.4 14.6 72.6 10 82 10c16.4 0 30 12.5 30 30.5C112 64 86 84 60 102Z"
        fill="url(#hp-a)"
      />
      <path
        d="M60 102C34 84 8 64 8 40.5 8 22.5 21.6 10 38 10c9.4 0 17.6 4.6 22 11.8C64.4 14.6 72.6 10 82 10c16.4 0 30 12.5 30 30.5C112 64 86 84 60 102Z"
        fill="url(#hp-b)"
      />
      <path
        d="M52.5 34h15v13.5H81v15H67.5V76h-15V62.5H39v-15h13.5V34Z"
        fill="#fff"
      />
    </svg>
  );
}

/* Yorqin yashil-koʻk tanga qopchasi (logotip gradienti asosida) */
export function MoneyBag3D(props: I) {
  return (
    <svg viewBox="0 0 110 120" fill="none" {...props}>
      <defs>
        <linearGradient id="mb-a" x1="16" y1="26" x2="94" y2="112">
          <stop offset="0" stopColor="#CFF5DC" />
          <stop offset="0.45" stopColor="#4FD189" />
          <stop offset="1" stopColor="#1BB3F7" />
        </linearGradient>
        <linearGradient id="mb-c" x1="36" y1="6" x2="74" y2="30">
          <stop offset="0" stopColor="#C3F2D6" />
          <stop offset="1" stopColor="#4FD189" />
        </linearGradient>
        <filter id="mb-s" x="-30%" y="-20%" width="160%" height="160%">
          <feDropShadow
            dx="0"
            dy="10"
            stdDeviation="10"
            floodColor="#0B4C55"
            floodOpacity="0.28"
          />
        </filter>
      </defs>
      <path
        d="M38 8h34l-6.5 12.5c14.5 8 27.5 25 27.5 48 0 28-16 45.5-38 45.5S17 96.5 17 68.5c0-23 13-40 27.5-48L38 8Z"
        fill="url(#mb-a)"
        filter="url(#mb-s)"
      />
      <path d="M38 8h34l-6.5 12.5h-21L38 8Z" fill="url(#mb-c)" />
      <path
        d="M55 44v42M66 55.5c-2.2-3.6-6.3-5.5-11-5.5-6.3 0-11 3.6-11 8.8 0 11.6 22 5.8 22 17.4 0 5.2-4.7 8.8-11 8.8-4.7 0-8.8-1.9-11-5.5"
        stroke="#fff"
        strokeWidth="5.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Yorqin yashil oʻsish diagrammasi + oʻq */
export function GrowthChart3D(props: I) {
  return (
    <svg viewBox="0 0 120 110" fill="none" {...props}>
      <defs>
        <linearGradient id="gc-a" x1="10" y1="60" x2="60" y2="105">
          <stop offset="0" stopColor="#C3F2D6" />
          <stop offset="1" stopColor="#4FD189" />
        </linearGradient>
        <linearGradient id="gc-b" x1="40" y1="40" x2="90" y2="105">
          <stop offset="0" stopColor="#8FE0B4" />
          <stop offset="1" stopColor="#1EAF6E" />
        </linearGradient>
        <linearGradient id="gc-c" x1="60" y1="10" x2="115" y2="70">
          <stop offset="0" stopColor="#6FD19E" />
          <stop offset="1" stopColor="#0D8A52" />
        </linearGradient>
        <filter id="gc-s" x="-25%" y="-25%" width="150%" height="160%">
          <feDropShadow
            dx="0"
            dy="9"
            stdDeviation="9"
            floodColor="#0B4C30"
            floodOpacity="0.26"
          />
        </filter>
      </defs>
      <g filter="url(#gc-s)">
        <rect x="8" y="66" width="26" height="38" rx="8" fill="url(#gc-a)" />
        <rect x="42" y="48" width="26" height="56" rx="8" fill="url(#gc-b)" />
        <rect x="76" y="28" width="26" height="76" rx="8" fill="url(#gc-c)" />
      </g>
      <path
        d="M14 44 46 22l22 14L108 6"
        stroke="#159A5F"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M88 4h22v22"
        stroke="#159A5F"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Stetoskop */
export function Stethoscope3D(props: I) {
  return (
    <svg viewBox="0 0 130 130" fill="none" {...props}>
      <defs>
        <linearGradient id="st-a" x1="20" y1="12" x2="110" y2="120">
          <stop offset="0" stopColor="#A4EBC0" />
          <stop offset="1" stopColor="#17A167" />
        </linearGradient>
        <filter id="st-s" x="-25%" y="-20%" width="155%" height="155%">
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="8"
            floodColor="#10693F"
            floodOpacity="0.22"
          />
        </filter>
      </defs>
      <g filter="url(#st-s)" stroke="url(#st-a)" fill="none">
        <path
          d="M26 16v26c0 16 11 27 25 27s25-11 25-27V16"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M51 69v18c0 13 10 22 23 22s23-9 23-22v-9"
          strokeWidth="9"
          strokeLinecap="round"
        />
      </g>
      <circle cx="97" cy="66" r="15" fill="url(#st-a)" />
      <circle cx="97" cy="66" r="6.5" fill="#EAFBF0" />
      <rect x="18" y="8" width="16" height="14" rx="6" fill="url(#st-a)" />
      <rect x="68" y="8" width="16" height="14" rx="6" fill="url(#st-a)" />
    </svg>
  );
}

/* Kartochkalarni bogʻlovchi punktir chiziqlar */
export function DashedLinks(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 520 620" fill="none" preserveAspectRatio="none" {...props}>
      <g
        stroke="#4FC98C"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="5 8"
        opacity=".55"
      >
        <path d="M74 96C132 118 158 168 150 214" className="animate-dash" />
        <path d="M150 236c-34 26-56 52-62 92" className="animate-dash" />
        <path d="M300 208c56-14 96 6 118 44" className="animate-dash" />
        <path d="M318 402c58 10 96 40 108 82" className="animate-dash" />
      </g>
    </svg>
  );
}
