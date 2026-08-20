"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { LogoMark } from "@/components/Icons";
import { Progress, StepList } from "./ui";

/*
 * Qualification ekranlarining umumiy ramkasi (TZ: "3. Umumiy interfeys").
 *
 * Ikki xil koʻrinish, bitta kod:
 *   — telefon (asosiy): tepada ixcham panel — logotip, progress chizigʻi
 *     va "Saqlash va chiqish". Bosqichlar roʻyxati bosilganda ochiladi.
 *   — kompyuter (lg dan yuqori): chapda doimiy yon ustun — barcha
 *     bosqichlar bir vaqtda koʻrinadi, hech narsa bosish shart emas.
 *     Oʻng tomonda savolning oʻzi. Shunda keng ekranda kontent
 *     oʻrtada tor ustun boʻlib osilib qolmaydi.
 */
export default function Shell({
  stage,
  current,
  total,
  steps,
  unit,
  children,
}: {
  stage: string;
  current: number;
  total: number;
  steps: string[];
  unit?: string;
  children: ReactNode;
}) {
  const [confirmExit, setConfirmExit] = useState(false);
  const exitButton = (
    <button
      type="button"
      onClick={() => setConfirmExit(true)}
      className="rounded-pill border border-line bg-surface px-4 py-2.5 text-[13.5px] font-semibold text-body transition-colors duration-200 hover:border-brand-400 hover:text-ink"
    >
      Saqlash va chiqish
    </button>
  );

  return (
    <div className="onboarding-bg min-h-screen lg:grid lg:grid-cols-[320px_1fr]">
      {/* ── Kompyuter: chapdagi doimiy ustun ── */}
      <aside className="hidden border-r border-line bg-surface/60 lg:flex lg:h-screen lg:sticky lg:top-0 lg:flex-col lg:justify-between lg:px-8 lg:py-8">
        <div>
          <Link href="/" className="inline-flex" aria-label="Bosh sahifa">
            <LogoMark aria-hidden className="h-[38px] w-auto" />
          </Link>

          <p className="mt-9 font-display text-[13px] font-bold uppercase tracking-[0.1em] text-brand-700">
            {stage}
          </p>
          <p className="mt-1 text-[13.5px] text-mute">
            {current} / {total} {unit ?? "savol"}
          </p>

          <div className="mt-5">
            <StepList steps={steps} current={current} />
          </div>
        </div>

        <div>{exitButton}</div>
      </aside>

      {/* ── Telefon: tepadagi ixcham panel ── */}
      <header className="sticky top-0 z-20 border-b border-line bg-page lg:hidden">
        <div className="mx-auto max-w-[620px] px-5 pb-3 pt-3.5 sm:px-8">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="inline-flex" aria-label="Bosh sahifa">
              <LogoMark aria-hidden className="h-[38px] w-auto" />
            </Link>
            {exitButton}
          </div>

          <div className="mt-3">
            <Progress stage={stage} current={current} total={total} steps={steps} unit={unit} />
          </div>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100dvh-132px)] w-full max-w-[620px] flex-col px-5 pb-4 pt-6 sm:px-8 lg:min-h-screen lg:justify-center lg:py-14">
        {children}
      </main>

      {confirmExit && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-title"
          className="fixed inset-0 z-50 grid place-items-end bg-[rgba(11,43,28,0.45)] sm:place-items-center"
        >
          <div className="w-full rounded-t-[24px] bg-surface p-6 pb-[max(24px,env(safe-area-inset-bottom))] sm:max-w-[420px] sm:rounded-[24px]">
            <h2 id="exit-title" className="font-display text-[19px] font-extrabold text-ink">
              Javoblaringiz saqlandi
            </h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-body">
              Shu qurilmada brauzerni qayta ochsangiz, toʻxtagan savolingizdan davom
              ettirasiz. Boshqa telefon yoki kompyuterdan kirsangiz, jarayon boshidan
              boshlanadi.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <Link
                href="/"
                className="btn-primary grid h-[52px] place-items-center rounded-pill font-display text-[16px] font-bold text-onbrand"
              >
                Bosh sahifaga chiqish
              </Link>
              <button
                type="button"
                onClick={() => setConfirmExit(false)}
                className="h-[52px] rounded-pill border-2 border-line bg-surface font-display text-[16px] font-bold text-ink"
              >
                Davom ettirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
