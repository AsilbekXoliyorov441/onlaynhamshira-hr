"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

/* ─────────────────────────── Progress ───────────────────────────
   Mobil ekranga 8 ta yorliq sigʻmaydi, shuning uchun ingichka chiziq +
   "3 / 8 savol" koʻrsatiladi; bosilganda toʻliq roʻyxat ochiladi. */
export function Progress({
  stage,
  current,
  total,
  steps,
  unit = "savol",
}: {
  stage: string;
  current: number;
  total: number;
  steps: string[];
  /** "3 / 8 savol" yoki "3 / 8 bosqich" */
  unit?: string;
}) {
  const [open, setOpen] = useState(false);
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 py-1 text-left"
      >
        <span className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-brand-700">
          {stage}
        </span>
        {/* Strelka — qatorni bosish mumkinligini koʻrsatadi, aks holda
            foydalanuvchi bosqichlar roʻyxati borligini bilmaydi */}
        <span className="flex shrink-0 items-center gap-1.5 text-[12.5px] font-semibold text-mute">
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

      {open && <div className="mt-3">{<StepList steps={steps} current={current} />}</div>}
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
        className={`flex w-full items-start gap-3.5 rounded-2xl border-2 p-[18px] text-left transition-colors duration-200 ${
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
          <span className="block text-[16px] font-semibold leading-snug text-ink">{label}</span>
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
     — ikkala tugma ham SOʻZ bilan yozilgan (strelka ikonkasi yoʻq);
     — nishon balandligi 56px, matn 17px — barmoq bilan aniq tegadi;
     — asosiy tugma kengroq va yorqin, "Orqaga" esa qoʻshimcha koʻrinishda,
       shunda qaysi biri "oldinga" ekani birinchi qarashda tushunarli;
     — tugma faol boʻlmasa, NEGA faol emasligi yozib qoʻyiladi — aks holda
       foydalanuvchi bosaveradi va nima boʻlayotganini tushunmaydi.
   `safe-area` — iPhone'dagi pastki chiziq uchun. */
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
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  backLabel?: string;
  /** tugma faol emasligining sababi */
  disabledHint?: string;
}) {
  const hasBack = Boolean(backHref || onBack);

  return (
    <div className="sticky bottom-0 z-10 -mx-5 mt-auto border-t border-line bg-page px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_-16px_rgba(11,43,28,0.35)] sm:-mx-8 sm:px-8 lg:static lg:-mx-10 lg:mt-9 lg:bg-transparent lg:px-10 lg:pb-0 lg:pt-6 lg:shadow-none">
      <div className="mx-auto max-w-[620px] lg:max-w-none">
        {nextDisabled && disabledHint && (
          <p className="mb-2 text-center text-[13.5px] font-medium text-mute lg:mb-3 lg:text-right">
            {disabledHint}
          </p>
        )}

        {/* Kompyuterda tugmalar oʻngga tortiladi va butun kenglikka choʻzilmaydi;
            telefonda esa "Keyingi" keng va yorqin — barmoq bilan aniq tegadi. */}
        <div className="flex items-stretch gap-3 lg:justify-end lg:gap-3.5">
          {hasBack &&
            (backHref ? (
              <Link
                href={backHref}
                className="grid h-[56px] flex-[0_0_34%] place-items-center rounded-pill border-2 border-line bg-surface font-display text-[16px] font-bold text-ink transition-colors duration-200 hover:border-brand-400 lg:h-[52px] lg:flex-none lg:px-9"
              >
                {backLabel}
              </Link>
            ) : (
              <button
                type="button"
                onClick={onBack}
                className="h-[56px] flex-[0_0_34%] rounded-pill border-2 border-line bg-surface font-display text-[16px] font-bold text-ink transition-colors duration-200 hover:border-brand-400 lg:h-[52px] lg:flex-none lg:px-9"
              >
                {backLabel}
              </button>
            ))}

          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled}
            className={`h-[56px] flex-1 rounded-pill font-display text-[17px] font-bold transition-all duration-300 lg:h-[52px] lg:min-w-[230px] lg:flex-none lg:px-10 lg:text-[16px] ${
              nextDisabled
                ? "cursor-not-allowed border-2 border-line bg-surface-2 text-mute"
                : "btn-primary text-onbrand hover:scale-[1.02] active:scale-100"
            }`}
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
