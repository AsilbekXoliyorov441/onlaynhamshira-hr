"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* Telefondagi tepa panelning balandligi. Panel `fixed` boʻlgani uchun
   bu son bir necha joyda kerak: Shell kontentga shuncha joy ajratadi,
   bosqichlar roʻyxati esa aynan shu balandlikdan pastda ochiladi. */
export const HEADER_HEIGHT = 62;

/* Kompyuterdagi tepa boshqaruv paneli: logotip qatori + bosqichlar zanjiri */
export const DESKTOP_HEADER_HEIGHT = 120;

/*
 * Butun onboarding uchun BITTA konteyner. Tepa panel, kontent
 * kartochkasi va pastdagi tugmalar paneli — hammasi shu kenglikda va
 * shu yon boʻshliqda. Shu bois har qanday ekranda chap va oʻng
 * chegaralar bir chiziqda turadi.
 */
export const CONTAINER = "mx-auto w-full max-w-[960px] px-4 sm:px-6 lg:px-8";

/* Matn ustuni: kartochka keng boʻlsa ham oʻqish qulay qolishi uchun */
export const READING_COLUMN = "mx-auto w-full max-w-[720px]";

/* ─────────────────────────── Progress ───────────────────────────
   Mobil ekranga 8 ta yorliq sigʻmaydi, shuning uchun ingichka chiziq +
   "3 / 8 savol" koʻrsatiladi; bosilganda toʻliq roʻyxat ochiladi. */
export function Progress({
  stage,
  current,
  total,
  steps,
  unit = "savol",
  exitSlot,
}: {
  stage: string;
  current: number;
  total: number;
  steps: string[];
  /** "3 / 8 savol" yoki "3 / 8 bosqich" */
  unit?: string;
  /** roʻyxat ichida koʻrsatiladigan "Saqlash va chiqish" tugmasi */
  exitSlot?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="truncate font-display text-[12px] font-bold uppercase tracking-[0.06em] text-brand-700 sm:text-[13px] sm:tracking-[0.08em]">
          {stage}
        </span>
        {/* Strelka — qatorni bosish mumkinligini koʻrsatadi, aks holda
            foydalanuvchi bosqichlar roʻyxati borligini bilmaydi */}
        <span className="flex shrink-0 items-center gap-1 text-[11.5px] font-semibold text-mute sm:gap-1.5 sm:text-[12.5px]">
          {current} / {total} {unit} · {percent}%
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none"
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <div className="mt-2 h-[6px] w-full overflow-hidden rounded-pill bg-[color:var(--c-line)]/60">
        <div
          className="h-full rounded-pill bg-[linear-gradient(90deg,#4FD189,#1BA463)] transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Roʻyxat panelning ostidan tushadi — panel balandligi oʻzgarmaydi,
          shu bois sahifa kontenti joyidan qimirlamaydi */}
      {open && (
        <>
          <button
            type="button"
            aria-label="Yopish"
            onClick={() => setOpen(false)}
            style={{ top: HEADER_HEIGHT }}
            className="fixed inset-x-0 bottom-0 z-[35] bg-[rgba(11,43,28,0.4)]"
          />
          <div
            style={{ top: HEADER_HEIGHT }}
            className="fixed inset-x-0 z-[36] max-h-[70vh] overflow-y-auto border-b border-line bg-surface px-4 pb-4 pt-4 shadow-[0_24px_48px_-24px_rgba(11,43,28,0.45)] sm:px-8"
          >
            <div className="mx-auto max-w-[620px]">
              <StepList steps={steps} current={current} />
              {exitSlot && <div className="mt-4 border-t border-line pt-4">{exitSlot}</div>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* Bosqichlar roʻyxati — telefonda bosilganda ochiladi, kompyuterda
   chapdagi ustunda doim koʻrinib turadi. */
export function StepList({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="space-y-2">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <li
            key={label}
            className={`flex items-center gap-2.5 text-[13.5px] leading-snug ${
              active ? "font-semibold text-ink" : done ? "text-body" : "text-mute"
            }`}
          >
            <span
              className={`grid h-[24px] w-[24px] shrink-0 place-items-center rounded-full text-[11.5px] font-bold ${
                done
                  ? "bg-brand-500 text-white"
                  : active
                  ? "bg-brand-100 text-brand-700 ring-2 ring-brand-400"
                  : "border border-line bg-surface text-mute"
              }`}
            >
              {done ? "✓" : n}
            </span>
            <span className="min-w-0">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

/* ─────────────────────────── Variant ───────────────────────────
   Radio va checkbox uchun bitta koʻrinish. Butun maydon bosiladi —
   mobil'da kichik doirachani nishonga olish shart emas. */
export function Choice({
  label,
  hint,
  selected,
  multi = false,
  onSelect,
  children,
}: {
  label: string;
  hint?: string;
  selected: boolean;
  multi?: boolean;
  onSelect: () => void;
  children?: ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        role={multi ? "checkbox" : "radio"}
        aria-checked={selected}
        onClick={onSelect}
        /* Nishon ataylab katta: butun qator bosiladi, balandligi 60px dan
           kam emas — telefonda erkin foydalanmaydigan foydalanuvchi ham
           aniq tegadi */
        className={`flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left transition-colors duration-200 sm:gap-3.5 sm:p-[18px] ${
          selected
            ? "border-brand-400 bg-brand-50"
            : "border-line bg-surface hover:border-brand-300"
        }`}
      >
        <span
          aria-hidden
          className={`mt-[1px] grid h-[24px] w-[24px] shrink-0 place-items-center border-2 transition-colors duration-200 ${
            multi ? "rounded-[7px]" : "rounded-full"
          } ${selected ? "border-brand-500 bg-brand-500" : "border-[color:var(--c-line)] bg-surface"}`}
        >
          {selected && (
            <svg viewBox="0 0 20 20" className="h-[14px] w-[14px]" fill="none">
              <path d="M4 10.5l4 4 8-8.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15.5px] font-semibold leading-snug text-ink sm:text-[16px]">{label}</span>
          {hint && <span className="mt-1.5 block text-[13.5px] leading-snug text-mute">{hint}</span>}
        </span>
      </button>
      {children}
    </div>
  );
}

/* ─────────────────────────── Ogohlantirish ─────────────────────────── */
export function Notice({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "warn" }) {
  return (
    <div
      className={`mt-4 flex items-start gap-2.5 rounded-2xl border p-3.5 text-[13.5px] leading-relaxed ${
        tone === "warn"
          ? "border-[#F0C36D] bg-[#FFF8E8] text-[#7A5B14]"
          : "border-line bg-surface-2 text-body"
      }`}
    >
      <span aria-hidden className="mt-[1px] shrink-0 text-[15px]">
        {tone === "warn" ? "⚠️" : "💡"}
      </span>
      <span className="min-w-0">{children}</span>
    </div>
  );
}

/* ─────────────────────────── Navigatsiya ───────────────────────────
   Auditoriyaning katta qismi telefondan erkin foydalanmaydi, shuning
   uchun:
     — ikkala tugma ham SOʻZ bilan yozilgan;
     — "Orqaga" ham yaxshi koʻrinadi: qalin chegara, oq fon, strelka
       belgisi va katta nishon — foydalanuvchi qaytish yoʻlini har doim
       topa oladi;
     — nishon balandligi 56px, matn 17px — barmoq bilan aniq tegadi;
     — tugma faol boʻlmasa, NEGA faol emasligi yozib qoʻyiladi.

   Telefonda panel `fixed`: sahifa qanchalik uzun boʻlmasin, tugmalar doim
   koʻrinib turadi. Panel oqim (flow) dan chiqib ketgani uchun uning
   oʻrniga xuddi shu balandlikdagi "boʻshliq" qoʻyiladi va ustiga yana
   20px havo qoʻshiladi — kontent tugmalarga yopishib qolmaydi. */
export function Nav({
  backHref,
  onBack,
  onNext,
  nextLabel = "Keyingi",
  nextDisabled = false,
  backLabel = "Orqaga",
  disabledHint = "Davom etish uchun javobni tanlang",
}: {
  backHref?: string;
  onBack?: () => void;
  /** boʻlmasa — faqat "Orqaga" tugmasi butun kenglikda chiqadi */
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  backLabel?: string;
  /** tugma faol emasligining sababi */
  disabledHint?: string;
}) {
  const hasBack = Boolean(backHref || onBack);
  const hasNext = Boolean(onNext);
  const barRef = useRef<HTMLDivElement>(null);
  const [barHeight, setBarHeight] = useState(96);

  /* Panel balandligi matnga qarab oʻzgaradi (izoh qatori bor-yoʻqligi),
     shu bois oʻlchab turamiz */
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const measure = () => setBarHeight(el.offsetHeight);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const backClass = `flex h-[56px] items-center justify-center rounded-pill border-2 border-[color:var(--c-ink)]/25 bg-surface px-2 font-display text-[15px] font-bold text-ink shadow-[0_2px_0_rgba(11,43,28,0.06)] transition-colors duration-200 hover:border-brand-500 hover:text-brand-700 sm:text-[16px] lg:h-[52px] lg:flex-none lg:px-8 ${
    hasNext ? "flex-[0_0_34%]" : "flex-1"
  }`;

  return (
    <>
      {/* Telefonda `fixed` panel uchun joy: balandligi + 20px havo */}
      <div aria-hidden className="lg:hidden" style={{ height: barHeight + 20 }} />

      <div
        ref={barRef}
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-page px-4 pb-[max(14px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_-16px_rgba(11,43,28,0.35)] sm:px-6 lg:static lg:z-auto lg:mt-10 lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-6 lg:shadow-none"
      >
        <div className={`${READING_COLUMN} lg:max-w-none`}>
          {hasNext && nextDisabled && disabledHint && (
            <p className="mb-2 text-center text-[13.5px] font-medium text-mute lg:mb-3 lg:text-right">
              {disabledHint}
            </p>
          )}

          {/* Kompyuterda tugmalar oʻngga tortiladi va butun kenglikka
              choʻzilmaydi; telefonda "Keyingi" keng va yorqin. */}
          <div className="flex items-stretch gap-3 lg:justify-end lg:gap-3.5">
            {hasBack &&
              (backHref ? (
                <Link href={backHref} className={backClass}>
                  {backLabel}
                </Link>
              ) : (
                <button type="button" onClick={onBack} className={backClass}>
                  {backLabel}
                </button>
              ))}

            {hasNext && (
            <button
              type="button"
              onClick={onNext}
              disabled={nextDisabled}
              className={`flex h-[56px] min-w-0 flex-1 items-center justify-center rounded-pill px-3 font-display text-[15.5px] font-bold transition-all duration-300 sm:text-[17px] lg:h-[52px] lg:min-w-[230px] lg:flex-none lg:px-10 lg:text-[16px] ${
                nextDisabled
                  ? "cursor-not-allowed border-2 border-line bg-surface-2 text-mute"
                  : "btn-primary text-onbrand hover:scale-[1.02] active:scale-100"
              }`}
            >
              <span className="truncate">{nextLabel}</span>
            </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
