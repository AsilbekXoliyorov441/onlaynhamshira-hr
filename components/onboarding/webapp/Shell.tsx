"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { LogoMark } from "@/components/Icons";
import { HEADER_HEIGHT, Progress, StepList } from "./ui";

/*
 * Qualification ekranlarining umumiy ramkasi (TZ: "3. Umumiy interfeys").
 *
 * Ikki xil koʻrinish, bitta kod:
 *   — telefon (asosiy): tepada faqat progress chizigʻi boʻlgan `fixed`
 *     panel. Logotip va "Saqlash va chiqish" u yerda yoʻq — ekran boʻyi
 *     savolning oʻziga berilgan; chiqish tugmasi progress qatorini
 *     bosganda ochiladigan bosqichlar roʻyxati ichida.
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
  const percent = Math.round((current / total) * 100);

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
    <div className="onboarding-bg min-h-screen lg:grid lg:grid-cols-[286px_minmax(0,1fr)]">
      {/* ── Kompyuter: chapdagi doimiy ustun ── */}
      <aside className="hidden border-r border-line bg-surface/70 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:overflow-y-auto lg:px-7 lg:py-8">
        <Link href="/" className="inline-flex" aria-label="Bosh sahifa">
          <LogoMark aria-hidden gradientId="lm-rail" className="h-[36px] w-auto" />
        </Link>

        <p className="mt-8 font-display text-[12.5px] font-bold uppercase tracking-[0.1em] text-brand-700">
          {stage}
        </p>
        <div className="mt-2 flex items-center gap-2.5">
          <div className="h-[6px] flex-1 overflow-hidden rounded-pill bg-[color:var(--c-line)]/60">
            <div
              className="h-full rounded-pill bg-[linear-gradient(90deg,#4FD189,#1BA463)] transition-[width] duration-500 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="shrink-0 text-[12px] font-semibold text-mute">{percent}%</span>
        </div>
        <p className="mt-1.5 text-[13px] text-mute">
          {current} / {total} {unit ?? "savol"}
        </p>

        <div className="mt-6">
          <StepList steps={steps} current={current} />
        </div>

        {/* Roʻyxat ostida — pastga "osilib" qolmasin, tagida izoh bilan */}
        <div className="mt-8 border-t border-line pt-5">
          {exitButton()}
          <p className="mt-2.5 text-[12px] leading-relaxed text-mute">
            Javoblaringiz shu qurilmada saqlanadi — istalgan vaqtda davom ettirasiz.
          </p>
        </div>
      </aside>

      {/* ── Telefon: faqat progress. Logotip va chiqish tugmasi bu yerdan
             olib tashlandi — ekran boʻyi savolga berilsin. Chiqish tugmasi
             progress qatorini bosganda ochiladigan roʻyxat ichida. ── */}
      <header
        style={{ height: HEADER_HEIGHT }}
        className="fixed inset-x-0 top-0 z-40 flex items-center border-b border-line bg-page lg:hidden"
      >
        <div className="mx-auto w-full max-w-[620px] px-5 sm:px-8">
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

      {/* Kompyuterda kontent oq kartochka ichida — kenglik cheklangan, tepadan
         boshlanadi (ekrandan ekranga sakramaydi). Telefonda kartochka yoʻq:
         ramka ichida ramka boʻlib joy yemasin. Tepadagi joy — `fixed` panel
         uchun (HEADER_HEIGHT) va ustiga 18px havo. */}
      <main className="w-full lg:px-8 lg:py-10 xl:px-12">
        <div className={`mx-auto flex w-full max-w-[620px] flex-col px-5 pb-4 sm:px-8 lg:rounded-[26px] lg:border lg:border-line lg:bg-surface lg:px-10 lg:pb-9 lg:pt-9 lg:shadow-[0_34px_80px_-52px_rgba(11,43,28,0.42)] ${wide ? "lg:max-w-[920px]" : "lg:max-w-[740px]"}`}>
          {/* `fixed` panel uchun joy + 18px havo (kompyuterda panel yoʻq) */}
          <div
            aria-hidden
            className="shrink-0 lg:hidden"
            style={{ height: HEADER_HEIGHT + 18 }}
          />
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
