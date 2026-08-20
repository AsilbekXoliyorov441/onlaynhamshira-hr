"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { LogoMark } from "@/components/Icons";
import { Progress } from "./ui";

/*
 * Qualification ekranlarining umumiy ramkasi (TZ: "3. Umumiy interfeys").
 * Logotip, bosqich nomi, progress va "Saqlash va chiqish".
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

  return (
    <div className="min-h-screen bg-page">
      <header /* Toʻliq shaffofsiz: sensorli qurilmada backdrop-blur oʻchirilgan,
         yarim shaffof fon ostidagi matnni koʻrsatib yuborardi */
        className="sticky top-0 z-20 border-b border-line bg-page">
        <div className="mx-auto max-w-[560px] px-5 pb-3 pt-3.5 sm:px-8">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-2" aria-label="Bosh sahifa">
              <LogoMark className="h-8 w-8" />
              <span className="font-display text-[13px] font-extrabold leading-[1.1] text-ink">
                ONLAYN
                <br />
                HAMSHIRA
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setConfirmExit(true)}
              className="rounded-pill border border-line bg-surface px-3.5 py-2 text-[12.5px] font-semibold text-body transition-colors duration-200 hover:border-brand-400 hover:text-ink"
            >
              Saqlash va chiqish
            </button>
          </div>

          <div className="mt-3">
            <Progress stage={stage} current={current} total={total} steps={steps} unit={unit} />
          </div>
        </div>
      </header>

      {/* `flex-col` + Nav'dagi `mt-auto` — kontent qisqa boʻlsa ham
          asosiy tugma ekran pastida turadi, oʻrtada osilib qolmaydi */}
      <main className="mx-auto flex min-h-[calc(100dvh-132px)] max-w-[560px] flex-col px-5 pb-4 pt-6 sm:px-8">
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
                className="btn-primary grid h-[50px] place-items-center rounded-pill font-display text-[15.5px] font-bold text-onbrand"
              >
                Bosh sahifaga chiqish
              </Link>
              <button
                type="button"
                onClick={() => setConfirmExit(false)}
                className="h-[50px] rounded-pill border border-line bg-surface font-display text-[15.5px] font-bold text-ink"
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
