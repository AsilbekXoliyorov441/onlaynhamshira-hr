import type { SVGProps } from "react";

type I = SVGProps<SVGSVGElement>;

/*
 * "Mutaxassis qanday ishlaydi?" boʻlimi uchun soft-3D ikonkalar.
 *
 * Uslub ServiceIcons bilan bir xil: chapdan tushuvchi yorugʻlik, toʻyingan
 * gradient, oq gloss chekka va yerdagi yumshoq soya. Ikonka 48x48 lokal
 * boʻshliqda chiziladi va shisha plitka ustida "suzib" turadi.
 */

function Shadow({ seed }: { seed: string }) {
  return (
    <filter id={`hw-sh-${seed}`} x="-40%" y="-30%" width="180%" height="180%">
      <feDropShadow dx="0" dy="3" stdDeviation="2.4" floodColor="#0B4C3A" floodOpacity="0.28" />
    </filter>
  );
}

/* Ikonka ostidagi yumshoq yer soyasi */
function Ground({ cx = 24, cy = 43, rx = 13 }: { cx?: number; cy?: number; rx?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry="2.6" fill="#0B2B1C" opacity="0.09" />;
}

/* Barcha ikonkalarda takrorlanadigan gradientlar */
function Palette({ seed, from, mid, to }: { seed: string; from: string; mid: string; to: string }) {
  return (
    <linearGradient id={`hw-g-${seed}`} x1="12" y1="6" x2="38" y2="42" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor={from} />
      <stop offset="0.5" stopColor={mid} />
      <stop offset="1" stopColor={to} />
    </linearGradient>
  );
}

/* ───────────────── 1. Yangi buyurtmalar — bildirishnomali qoʻngʻiroq ──────── */
export function BellNew3D(props: I) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <Shadow seed="bell" />
        <Palette seed="bell" from="#FFE9A8" mid="#FFC85C" to="#E9962B" />
      </defs>
      <Ground rx={11} />
      <g filter="url(#hw-sh-bell)">
        <path
          d="M24 7c-6.2 0-10.4 4.4-10.4 10.6 0 6.6-1.4 8.9-3.2 11-.9 1 .1 2.4 1.6 2.4h24c1.5 0 2.5-1.4 1.6-2.4-1.8-2.1-3.2-4.4-3.2-11C34.4 11.4 30.2 7 24 7Z"
          fill="url(#hw-g-bell)"
        />
        <path
          d="M18 32.6h12c0 3.4-2.7 5.9-6 5.9s-6-2.5-6-5.9Z"
          fill="url(#hw-g-bell)"
        />
        <path
          d="M24 9.4c-4.7 0-7.9 3-8.4 7.4 2.4-2.6 5.3-3.9 8.6-3.9 1.4 0 2.7.2 3.9.6-.9-2.6-2.4-4.1-4.1-4.1Z"
          fill="#FFF6DC"
          opacity="0.75"
        />
      </g>
      <circle cx="35.5" cy="12" r="6" fill="#FF6B7E" />
      <circle cx="33.6" cy="10" r="2" fill="#FFD4DA" opacity="0.9" />
    </svg>
  );
}

/* ───────────────── 2. Qabul yoki rad — ikki tomonli tanlov ────────────────── */
export function AcceptDecline3D(props: I) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <Shadow seed="acc" />
        <Palette seed="acc" from="#B6F2D0" mid="#57D79B" to="#159C66" />
        <Palette seed="dec" from="#FFD3D9" mid="#FB8FA0" to="#DC4B63" />
      </defs>
      <Ground rx={13} />
      <g filter="url(#hw-sh-acc)">
        <rect x="4" y="12" width="21" height="21" rx="7.5" fill="url(#hw-g-acc)" />
        <path
          d="M9.6 22.6l3.9 3.9 6.4-7.4"
          stroke="#F2FFF7"
          strokeWidth="3.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="24" y="17" width="19" height="19" rx="6.8" fill="url(#hw-g-dec)" />
        <path
          d="M29.6 22.6l7.8 7.8M37.4 22.6l-7.8 7.8"
          stroke="#FFF1F3"
          strokeWidth="2.9"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M7.6 14.4c1.4-1.2 3.4-1.6 6.4-1.6"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

/* ───────────────── 3. Xizmat turi va manzil — xaritadagi belgi ────────────── */
export function MapPinCare3D(props: I) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <Shadow seed="pin" />
        <Palette seed="pin" from="#CFEFFF" mid="#5FC2EF" to="#1478B4" />
      </defs>
      <Ground rx={9} cy={42} />
      <g filter="url(#hw-sh-pin)">
        <path
          d="M24 5.5c-7.2 0-13 5.7-13 12.8 0 8.9 10.2 19 12.1 20.8.5.5 1.3.5 1.8 0C26.8 37.3 37 27.2 37 18.3 37 11.2 31.2 5.5 24 5.5Z"
          fill="url(#hw-g-pin)"
        />
        <circle cx="24" cy="18" r="6.6" fill="#FBFEFF" />
        <path
          d="M24 14.6v6.8M20.6 18h6.8"
          stroke="#1478B4"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M16.4 10.6c1.8-2 4.2-3 7.2-3"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>
    </svg>
  );
}

/* ───────────────── 4. Mijoz bilan aloqa — goʻshak ─────────────────────────── */
export function PhoneCall3D(props: I) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <Shadow seed="call" />
        <Palette seed="call" from="#C7F6DD" mid="#4FD189" to="#128A57" />
      </defs>
      <Ground rx={12} />
      <g filter="url(#hw-sh-call)">
        <path
          d="M13.6 7.4c1.6-1.5 4.1-1.3 5.4.5l3.2 4.4c1 1.4.8 3.3-.5 4.4l-2 1.7c-.6.5-.8 1.3-.5 2 1.4 3.2 3.9 5.7 7.1 7.1.7.3 1.5.1 2-.5l1.7-2c1.1-1.3 3-1.5 4.4-.5l4.4 3.2c1.8 1.3 2 3.8.5 5.4l-2.3 2.4c-1.6 1.7-4.1 2.3-6.3 1.5-4.9-1.8-9.2-4.6-12.8-8.2-3.6-3.6-6.4-7.9-8.2-12.8-.8-2.2-.2-4.7 1.5-6.3l2.4-2.3Z"
          fill="url(#hw-g-call)"
        />
        <path
          d="M14.8 9.6c1-.9 2.3-.8 3 .2"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.75"
        />
      </g>
      <g stroke="#4FD189" strokeLinecap="round" fill="none" opacity="0.95">
        <path d="M31.4 12.6a7.6 7.6 0 0 1 4.4 4.4" strokeWidth="2.6" />
        <path d="M31.9 6.4a13.8 13.8 0 0 1 9.9 9.9" strokeWidth="2.4" opacity="0.6" />
      </g>
    </svg>
  );
}

/* ───────────────── 5. Xizmatni boshlash — "play" tugmasi ──────────────────── */
export function StartService3D(props: I) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <Shadow seed="play" />
        <Palette seed="play" from="#D8F7E4" mid="#63DBA1" to="#0F8F5D" />
        <radialGradient id="hw-play-gloss" cx="0.35" cy="0.28" r="0.7">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <Ground rx={12} />
      <g filter="url(#hw-sh-play)">
        <circle cx="24" cy="23" r="16.5" fill="url(#hw-g-play)" />
        <circle cx="24" cy="23" r="16.5" fill="url(#hw-play-gloss)" />
        <path
          d="M20.4 16.6l10.2 5.6c.7.4.7 1.4 0 1.8l-10.2 5.6c-.7.4-1.5-.1-1.5-.9V17.5c0-.8.8-1.3 1.5-.9Z"
          fill="#F4FFF9"
        />
      </g>
      <circle cx="24" cy="23" r="19.6" stroke="#4FD189" strokeWidth="1.6" opacity="0.4" fill="none" />
    </svg>
  );
}

/* ───────────────── 6. Yakunlash — tasdiq nishoni ──────────────────────────── */
export function CompleteBadge3D(props: I) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <Shadow seed="done" />
        <Palette seed="done" from="#BFF3D6" mid="#4CCE8D" to="#0E8154" />
      </defs>
      <Ground rx={11} />
      <g filter="url(#hw-sh-done)">
        <path
          d="M24 5.2l4.4 3.2 5.4-.5c1.3-.1 2.4.9 2.4 2.2l.1 5.4 3.4 4.2c.8 1 .6 2.5-.5 3.2l-4.5 3-1.6 5.2c-.4 1.2-1.7 1.9-2.9 1.5l-5.2-1.6-5.2 1.6c-1.2.4-2.5-.3-2.9-1.5l-1.6-5.2-4.5-3c-1.1-.7-1.3-2.2-.5-3.2l3.4-4.2.1-5.4c0-1.3 1.1-2.3 2.4-2.2l5.4.5L24 5.2Z"
          fill="url(#hw-g-done)"
        />
        <path
          d="M17.6 21.4l4.5 4.5 8.3-9"
          stroke="#F3FFF8"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M18.6 33.4l-2.4 8.4 5.2-3 3 3.2 2.4-8.2"
        fill="#4FD189"
        opacity="0.35"
      />
    </svg>
  );
}

/* ───────────────── 7. Buyurtmalar tarixi — soatli hujjat ──────────────────── */
export function HistoryList3D(props: I) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <Shadow seed="hist" />
        <Palette seed="hist" from="#FFFFFF" mid="#E6F1EB" to="#B9CFC3" />
        <Palette seed="clock" from="#CDEEFF" mid="#63BFEE" to="#1478B4" />
      </defs>
      <Ground rx={12} />
      <g filter="url(#hw-sh-hist)">
        <rect x="9" y="6" width="26" height="33" rx="6" fill="url(#hw-g-hist)" />
        <g stroke="#8FA79A" strokeWidth="2.4" strokeLinecap="round">
          <path d="M15 14.5h14M15 21h14M15 27.5h8" />
        </g>
        <circle cx="34" cy="31" r="9.4" fill="url(#hw-g-clock)" />
        <path
          d="M34 26.4V31l3 2"
          stroke="#F5FCFF"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path d="M12.4 9.4c.9-1 2-1.4 3.6-1.4" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ───────────────── 8. Profil va reyting — avatar + yulduz ─────────────────── */
export function ProfileStar3D(props: I) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <defs>
        <Shadow seed="prof" />
        <Palette seed="prof" from="#D9F2FF" mid="#7FC9EE" to="#2A7FB6" />
        <Palette seed="star" from="#FFF0BE" mid="#FFC94F" to="#E2921E" />
      </defs>
      <Ground rx={12} />
      <g filter="url(#hw-sh-prof)">
        <circle cx="21" cy="16.5" r="8.2" fill="url(#hw-g-prof)" />
        <path
          d="M6.6 37.4c0-6.6 6.4-10.4 14.4-10.4s14.4 3.8 14.4 10.4c0 1.4-1.1 2.4-2.5 2.4H9.1c-1.4 0-2.5-1-2.5-2.4Z"
          fill="url(#hw-g-prof)"
        />
        <path
          d="M15.8 11.4c1.2-1.6 3-2.4 5.2-2.4"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.75"
        />
      </g>
      <g filter="url(#hw-sh-prof)">
        <path
          d="M36.6 20.6l2.3 4.6 5.1.7c.9.1 1.2 1.2.6 1.8l-3.7 3.5.9 5c.2.9-.8 1.6-1.6 1.2l-4.5-2.4-4.5 2.4c-.8.4-1.8-.3-1.6-1.2l.9-5-3.7-3.5c-.6-.6-.3-1.7.6-1.8l5.1-.7 2.3-4.6c.4-.8 1.5-.8 1.8 0Z"
          fill="url(#hw-g-star)"
        />
      </g>
    </svg>
  );
}
