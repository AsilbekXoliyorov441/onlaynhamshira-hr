"use client";

import type { ReactNode } from "react";
import { CONTAINER, READING_COLUMN } from "./ui";

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
    <div className="onboarding-bg grid min-h-screen place-items-center">
      {/* Konteyner va kartochka Shell'dagi bilan bir xil — kirish
          ekranidan savol ekraniga oʻtganda chegaralar sakramaydi */}
      <div className={`${CONTAINER} py-8 lg:py-14`}>
        <div className="lg:rounded-[24px] lg:border lg:border-line lg:bg-surface lg:px-10 lg:py-11 lg:shadow-[0_28px_64px_-44px_rgba(11,43,28,0.3)]">
          <div className={READING_COLUMN}>
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
    </div>
  );
}
