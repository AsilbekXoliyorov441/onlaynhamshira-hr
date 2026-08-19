"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n/LanguageProvider";
import { ChevronRight, PinIcon, SyringeIcon } from "./Icons";

/*
 * Ekran mazmuni haqiqiy telefon fotosuratining ekran maydoniga (aylantirilgan
 * toʻrtburchak) mos tushishi uchun proyektiv (homography) transformatsiya
 * qoʻllaniladi. Fotosuratdagi ekran burchaklari piksel skanerlash orqali
 * aniq oʻlchandi (800x1024 tabiiy oʻlchamda): yuqori-chap (395,5),
 * yuqori-oʻng (781,28), pastki-chap (-11,922), pastki-oʻng (369,1002).
 * Kontent 246x480 lokal boʻshliqda chiziladi va matrix3d shu burchaklarga
 * aylantiradi.
 */
const SCREEN_TRANSFORM =
  "matrix3d(1.4841391695397097,0.08759609905644677,0,-0.0002231064812641015,-0.8092189569472834,1.825271492312335,0,-9.263479225760543e-05,0,0,1,0,0,0,0,1)";

/* Ilova ekranidagi kichik xarita */
function MiniMap() {
  return (
    <div className="relative h-[86px] overflow-hidden rounded-xl bg-[color:var(--map-bg)]">
      <svg viewBox="0 0 200 90" className="absolute inset-0 h-full w-full">
        <rect width="200" height="90" fill="var(--map-bg-2)" />
        <path
          d="M8 58c14-16 30-24 52-22s34 12 54 6 40-16 62-6l16 8v46H8V58Z"
          fill="var(--map-fill)"
        />
        <path
          d="M0 34h200M0 62h200M46 0v90M108 0v90M162 0v90"
          stroke="var(--map-line)"
          strokeWidth="1"
        />
        <path
          d="M30 74c26-10 44-30 72-30s44 14 70 6"
          stroke="var(--map-line-2)"
          strokeWidth="3"
          fill="none"
        />
      </svg>

      <span className="absolute left-[52%] top-[26%] flex items-center gap-1">
        <PinIcon className="h-[13px] w-[13px] text-brand-600" />
        <span className="text-[8.5px] font-semibold text-ink">Toshkent</span>
      </span>
      <span className="absolute left-[44%] top-[56%] flex items-center gap-1">
        <PinIcon className="h-[13px] w-[13px] text-brand-500" />
        <span className="text-[8.5px] font-semibold text-ink">Toshkent</span>
      </span>
    </div>
  );
}

/* Ekranga proyeksiyalanadigan ilova kontenti (246x480 lokal boʻshliq) */
function ScreenContent() {
  const t = useT();
  return (
    <div
      className="absolute overflow-hidden rounded-[36px] bg-surface"
      style={{
        left: 395.1,
        top: 4.8,
        width: 245,
        height: 479,
        transform: SCREEN_TRANSFORM,
        transformOrigin: "0 0",
      }}
    >
      {/* Hamshira surati */}
      <div className="relative h-[210px] w-full overflow-hidden bg-[linear-gradient(160deg,#DDEFE3_0%,#C7E6D3_45%,#A9D8BE_100%)]">
        <Image
          src="/nurse.png"
          alt="Hamshira"
          fill
          className="object-cover object-[50%_12%]"
          sizes="(min-width: 640px) 180px, 100px"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Kontent */}
      <div className="relative -mt-6 space-y-2 px-3 pb-3.5">
        {/* Bemor manzili */}
        <div className="rounded-2xl bg-surface p-2.5 shadow-card">
          <p className="mb-2 text-[10.5px] font-semibold text-ink">
            {t.phone.address}
          </p>
          <MiniMap />
        </div>

        {/* Xizmat turi */}
        <button className="flex w-full items-center gap-2.5 rounded-2xl bg-surface p-2.5 text-left shadow-card">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
            <SyringeIcon className="h-[17px] w-[17px]" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-semibold text-ink">
              {t.phone.service}
            </span>
            <span className="block truncate text-[9.5px] text-mute">
              {t.phone.serviceSub}
            </span>
          </span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-mute" />
        </button>

        {/* Narx */}
        <div className="flex items-center justify-between px-1.5 pt-0.5">
          <span className="text-[11px] text-mute">{t.phone.payment}</span>
          <span className="font-display text-[13px] font-extrabold text-ink">
            {t.phone.price}
          </span>
        </div>

        {/* Qabul qilish */}
        <div className="btn-solid flex h-[36px] items-center justify-center rounded-pill shadow-[0_8px_18px_-8px_rgba(23,164,104,0.7)]">
          <span className="text-[11px] font-semibold text-white">
            {t.phone.accept}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PhoneMockup() {
  return (
    <div className="relative mx-auto flex h-[307px] w-[240px] -translate-x-1 items-center justify-center sm:h-[635px] sm:w-[535px] sm:-translate-x-20">
      <div
        className="relative origin-center scale-[0.3] sm:scale-[0.55]"
        style={{ width: 800, height: 1024 }}
      >
        {/* Rasm va ekran kontenti bitta burilgan qatlamda birga yuradi */}
        <div className="absolute left-0 top-[40px] rotate-[-10deg]" style={{ width: 800, height: 1024 }}>
          <Image
            src="/phone-transparent.png"
            alt=""
            aria-hidden
            width={800}
            height={1024}
            sizes="(min-width: 640px) 560px, 320px"
            className="pointer-events-none absolute left-0 top-0"
            priority
          />
          <ScreenContent />
        </div>
      </div>
    </div>
  );
}
