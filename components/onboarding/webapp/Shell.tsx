"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { LogoMark } from "@/components/Icons";
import { DESKTOP_HEADER_HEIGHT, HEADER_HEIGHT, Progress } from "./ui";

/*
 * Onboarding ekranlarining umumiy ramkasi.
 *
 * Ikki xil koʻrinish, bitta kod — ikkalasi ham TEPADA va `fixed`:
 *   — telefon: faqat progress chizigʻi. Logotip va "Saqlash va chiqish"
 *     bu yerda yoʻq — ekran boʻyi savolning oʻziga berilgan; chiqish
 *     tugmasi progress qatorini bosganda ochiladigan roʻyxat ichida.
 *   — kompyuter (lg dan yuqori): tepada boshqaruv paneli — logotip,
 *     "Saqlash va chiqish" va gorizontal bosqichlar zanjiri. Chapdagi
 *     yon ustun yoʻq: kontent ekran oʻrtasida turadi.
 */
export default function Shell({
  stage,
  current,
  total,
  steps,
  unit,
  wide = false,
  children,
}: {
  stage: string;
  current: number;
  total: number;
  steps: string[];
  unit?: string;
  /** yon paneli bor ekranlar uchun kengroq kartochka (video bosqichi) */
  wide?: boolean;
  children: ReactNode;
}) {
  const [confirmExit, setConfirmExit] = useState(false);

  /* Chiqish tugmasi ataylab kamtarona: tasodifan bosilib jarayondan
     chiqib ketmasin — asosiy urgʻu doim "Keyingi" tugmasida. */
  const exitButton = (extra = "") => (
    <button
      type="button"
      onClick={() => setConfirmExit(true)}
      className={`rounded-pill border border-line bg-surface px-3.5 py-2 text-[12.5px] font-semibold text-mute transition-colors duration-200 hover:border-brand-400 hover:text-ink ${extra}`}
    >
      Saqlash va chiqish
    </button>
  );

  return (
    <div className="onboarding-bg min-h-screen">
      {/* ── Kompyuter: tepadagi boshqaruv paneli ── */}
      <header
        style={{ height: DESKTOP_HEADER_HEIGHT }}
        className="fixed inset-x-0 top-0 z-40 hidden border-b border-line bg-page lg:block"
      >
        <div className="mx-auto flex h-full w-full max-w-[1180px] flex-col justify-center px-8">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="inline-flex" aria-label="Bosh sahifa">
              <LogoMark aria-hidden gradientId="lm-rail" className="h-[34px] w-auto" />
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-[13px] font-semibold text-mute">
                {current} / {total} {unit ?? "savol"}
              </span>
              {exitButton()}
            </div>
          </div>

          <Stepper steps={steps} current={current} />
        </div>
      </header>

      {/* ── Telefon: faqat progress ── */}
      <header
        style={{ height: HEADER_HEIGHT }}
        className="fixed inset-x-0 top-0 z-40 flex items-center border-b border-line bg-page lg:hidden"
      >
        <div className="mx-auto w-full max-w-[620px] px-4 sm:px-8">
          <Progress
            stage={stage}
            current={current}
            total={total}
            steps={steps}
            unit={unit}
            exitSlot={exitButton("w-full")}
          />
        </div>
      </header>

      {/* Kompyuterda kontent oq kartochka ichida, ekran oʻrtasida.
         Tepadagi joy — `fixed` panellar uchun (+ havo). */}
      <main className="w-full lg:px-8 lg:pb-12">
        {/* `fixed` panellar uchun joy + havo. Kartochkadan TASHQARIDA:
           aks holda kompyuterda kartochka panel ostidan boshlanib,
           yuqori burchaklari koʻrinmay qoladi. */}
        <div aria-hidden className="lg:hidden" style={{ height: HEADER_HEIGHT + 18 }} />
        <div
          aria-hidden
          className="hidden lg:block"
          style={{ height: DESKTOP_HEADER_HEIGHT + 28 }}
        />
        <div
          className={`mx-auto flex w-full max-w-[620px] flex-col px-4 pb-4 sm:px-8 lg:rounded-[26px] lg:border lg:border-line lg:bg-surface lg:px-10 lg:pb-9 lg:pt-9 lg:shadow-[0_34px_80px_-52px_rgba(11,43,28,0.42)] ${
            wide ? "lg:max-w-[980px]" : "lg:max-w-[760px]"
          }`}
        >
          {children}
        </div>
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

/*
 * Gorizontal bosqichlar zanjiri — faqat kompyuterda. Har bir bosqich
 * teng kenglikda, nomi ikki qatorgacha siqiladi; oʻtilganlar yashil
 * belgi, joriysi halqa bilan ajratiladi.
 */
function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="mt-3 flex items-start">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <li key={label} className="flex min-w-0 flex-1 items-start">
            <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5 px-1">
              <span
                className={`grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full text-[12px] font-bold ${
                  done
                    ? "bg-brand-500 text-white"
                    : active
                    ? "bg-brand-100 text-brand-700 ring-2 ring-brand-500"
                    : "border border-line bg-surface text-mute"
                }`}
              >
                {done ? "✓" : n}
              </span>
              <span
                className={`line-clamp-2 text-center text-[11.5px] leading-tight ${
                  active ? "font-bold text-ink" : done ? "text-body" : "text-mute"
                }`}
              >
                {label}
              </span>
            </div>
            {n < steps.length && (
              <span
                aria-hidden
                className={`mt-[13px] h-[2px] w-4 shrink-0 rounded-pill xl:w-8 ${
                  done ? "bg-brand-400" : "bg-[color:var(--c-line)]"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
