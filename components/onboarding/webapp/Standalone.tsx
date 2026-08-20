"use client";

import type { ReactNode } from "react";

/*
 * Kirish va natija ekranlarining oʻrami (Qualification/Education/Video
 * intro va natijalar).
 *
 * Bu ekranlarda bosqichlar roʻyxati yoʻq, shuning uchun ular Shell'dagi
 * ikki ustunli koʻrinishni ishlatmaydi. Telefonda oddiy sahifa boʻlib
 * qolaveradi; kompyuterda esa kontent kartochka ichiga olinadi — aks
 * holda matn keng ekranda boʻsh maydonda osilib turgandek koʻrinadi.
 */
export default function Standalone({
  badge,
  children,
}: {
  /** masalan "Bosqich 7 / 8" */
  badge?: string;
  children: ReactNode;
}) {
  return (
    <div className="onboarding-bg min-h-screen">
      {/* Kartochka oʻlchamlari Shell'dagi bilan bir xil — kirish ekranidan
          savol ekraniga oʻtganda koʻrinish sakramaydi */}
      <div className="mx-auto flex min-h-screen w-full max-w-[740px] flex-col px-5 py-6 sm:px-8 lg:justify-center lg:py-16">
        <div className="lg:rounded-[26px] lg:border lg:border-line lg:bg-surface lg:px-10 lg:py-9 lg:shadow-[0_34px_80px_-52px_rgba(11,43,28,0.42)]">
          {/* Logotip olib tashlandi — barcha bosqichlarda tepada faqat
              qaysi bosqichda ekani yozilib turadi */}
          {badge && (
            <span className="badge-pill inline-flex items-center rounded-pill px-3.5 py-[6px] text-[12.5px] font-semibold">
              {badge}
            </span>
          )}

          <div className={badge ? "mt-6" : ""}>{children}</div>
        </div>
      </div>
    </div>
  );
}
