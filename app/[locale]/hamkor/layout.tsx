import type { ReactNode } from "react";
import DevSkip from "@/components/onboarding/webapp/DevSkip";

/*
 * Onboarding ekranlarining umumiy oʻrami.
 *
 * Hozircha faqat vaqtinchalik test tugmasini qoʻshadi — u barcha
 * `/hamkor/...` sahifalarida koʻrinadi. Tugmani butunlay olib tashlash
 * uchun quyidagi `<DevSkip />` qatorini oʻchirish kifoya
 * (yoki `DevSkip.tsx` dagi `DEV_SKIP` ni `false` qilish).
 */
export default function HamkorLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <DevSkip />
    </>
  );
}
