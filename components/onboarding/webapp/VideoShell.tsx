"use client";

import type { ReactNode } from "react";
import Shell from "./Shell";
import { ONBOARDING_STAGES, ONBOARDING_TOTAL } from "@/lib/onboarding/stages";

/*
 * Video bosqichi ekranlarining umumiy ramkasi.
 *
 * Qualification va Education'da progress ichki qadamlarni sanaydi
 * (savol / dars). Video bosqichida esa ichki qadamlar foydalanuvchi
 * uchun "bosqich" emas — shu bois umumiy onboarding progressi
 * koʻrsatiladi: 7 / 8 bosqich.
 */
export default function VideoShell({ children }: { children: ReactNode }) {
  return (
    <Shell
      stage="Video xabar"
      current={7}
      total={ONBOARDING_TOTAL}
      steps={ONBOARDING_STAGES}
      unit="bosqich"
    >
      {children}
    </Shell>
  );
}
