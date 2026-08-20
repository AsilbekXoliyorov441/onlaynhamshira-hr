"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { resumePoint, type ResumePoint } from "@/lib/onboarding/resume";

/*
 * Kirish ekranida koʻrsatiladi: agar foydalanuvchi jarayonni avval
 * boshlab, yarmida chiqib ketgan boʻlsa, uni oʻsha joyiga qaytaradi.
 *
 * Tekshiruv faqat brauzerda boʻlishi mumkin (localStorage), shu bois
 * `useEffect` ichida — sahifa oʻzi statik boʻlib qolaveradi.
 */
export default function ResumeCard() {
  const [point, setPoint] = useState<ResumePoint | null>(null);

  useEffect(() => {
    setPoint(resumePoint());
  }, []);

  if (!point) return null;

  return (
    <div className="mt-6 rounded-2xl border-2 border-brand-400 bg-brand-50 p-4 sm:p-5">
      <p className="font-display text-[15px] font-bold text-brand-700">
        Jarayoningiz saqlangan
      </p>
      <p className="mt-1.5 text-[14.5px] leading-relaxed text-body">
        Siz “{point.stage}” bosqichida
        {point.detail ? ` (${point.detail})` : ""} toʻxtagansiz. Hech narsa yoʻqolmadi —
        oʻsha joydan davom ettirsangiz boʻladi.
      </p>
      <Link
        href={point.href}
        className="btn-primary mt-4 grid h-[54px] place-items-center rounded-pill font-display text-[16.5px] font-bold text-onbrand"
      >
        Toʻxtagan joyimdan davom etish
      </Link>
    </div>
  );
}
