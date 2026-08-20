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
        className="flex w-full items-baseline justify-between gap-3 text-left"
      >
        <span className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-brand-700">
          {stage}
        </span>
        <span className="shrink-0 text-[12.5px] font-semibold text-mute">
          {current} / {total} {unit} · {percent}%
        </span>
      </button>

      <div className="mt-2 h-[6px] w-full overflow-hidden rounded-pill bg-[color:var(--c-line)]/60">
        <div
          className="h-full rounded-pill bg-[linear-gradient(90deg,#4FD189,#1BA463)] transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      {open && (
        <ol className="mt-3 space-y-1.5 rounded-2xl border border-line bg-surface p-3">
          {steps.map((label, i) => {
            const n = i + 1;
            const done = n < current;
            const active = n === current;
            return (
              <li
                key={label}
                className={`flex items-center gap-2.5 text-[13.5px] ${
                  active ? "font-semibold text-ink" : done ? "text-body" : "text-mute"
                }`}
              >
                <span
                  className={`grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                    done
                      ? "bg-brand-500 text-white"
                      : active
                      ? "bg-brand-100 text-brand-700 ring-2 ring-brand-400"
                      : "bg-[color:var(--c-line)]/50 text-mute"
                  }`}
                >
                  {done ? "✓" : n}
                </span>
                {label}
              </li>
            );
          })}
        </ol>
      )}
    </div>
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
        className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors duration-200 ${
          selected
            ? "border-brand-400 bg-brand-50"
            : "border-line bg-surface hover:border-brand-300"
        }`}
      >
        <span
          aria-hidden
          className={`mt-[2px] grid h-[22px] w-[22px] shrink-0 place-items-center border-2 transition-colors duration-200 ${
            multi ? "rounded-[7px]" : "rounded-full"
          } ${selected ? "border-brand-500 bg-brand-500" : "border-[color:var(--c-line)] bg-surface"}`}
        >
          {selected && (
            <svg viewBox="0 0 20 20" className="h-[13px] w-[13px]" fill="none">
              <path d="M4 10.5l4 4 8-8.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold leading-snug text-ink">{label}</span>
          {hint && <span className="mt-1 block text-[13px] leading-snug text-mute">{hint}</span>}
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
   Tugma pastda yopishib turadi — mobil'da uzun roʻyxat oxirigacha
   scroll qilish shart emas. `safe-area` iPhone'dagi pastki chiziq uchun. */
export function Nav({
  backHref,
  onBack,
  onNext,
  nextLabel = "Keyingi",
  nextDisabled = false,
  backLabel,
}: {
  backHref?: string;
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  /** berilsa, strelka oʻrniga matnli tugma chiziladi (TZ Q-09) */
  backLabel?: string;
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-5 mt-auto border-t border-line bg-page/95 px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-4 backdrop-blur sm:-mx-8 sm:px-8">
      <div className="mx-auto flex max-w-[560px] flex-col gap-2.5 sm:flex-row-reverse sm:items-center">
        <div className="flex items-center gap-3">
        {(backHref || onBack) && !backLabel &&
          (backHref ? (
            <Link
              href={backHref}
              className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-pill border border-line bg-surface text-ink transition-colors duration-200 hover:border-brand-400"
              aria-label="Orqaga"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ) : (
            <button
              type="button"
              onClick={onBack}
              aria-label="Orqaga"
              className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-pill border border-line bg-surface text-ink transition-colors duration-200 hover:border-brand-400"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}

        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className={`h-[52px] flex-1 rounded-pill font-display text-[16px] font-bold transition-all duration-300 ${
            nextDisabled
              ? "cursor-not-allowed border border-line bg-surface-2 text-mute"
              : "btn-primary text-onbrand hover:scale-[1.02] active:scale-100"
          }`}
        >
          {nextLabel}
        </button>
        </div>

        {backLabel && backHref && (
          <Link
            href={backHref}
            className="grid h-[48px] place-items-center rounded-pill border border-line bg-surface font-display text-[15px] font-semibold text-ink transition-colors duration-200 hover:border-brand-400 sm:h-[52px] sm:flex-1"
          >
            {backLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
