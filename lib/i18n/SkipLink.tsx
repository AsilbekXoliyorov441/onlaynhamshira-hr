"use client";

import { useT } from "./LanguageProvider";

/** Klaviatura bilan yuruvchilar uchun — kontentga oʻtish havolasi */
export default function SkipLink() {
  const t = useT();
  return (
    <a
      href="#asosiy"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-surface focus:px-5 focus:py-3 focus:font-display focus:text-[14px] focus:font-bold focus:text-ink focus:shadow-card"
    >
      {t.common.skipToContent}
    </a>
  );
}
