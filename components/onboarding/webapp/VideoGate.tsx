"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadEducation } from "@/lib/onboarding/education-session";

/*
 * BR-E-005: "Testdan oʻtmagan foydalanuvchi Video xabar bosqichiga
 * kira olmaydi." Video bosqichining oʻzi (Stage 4) TZ kelgach quriladi.
 */
export default function VideoGate() {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const { status } = loadEducation();
    const ok = status === "COMPLETED" || status === "PASSED";
    setAllowed(ok);
    if (!ok) router.replace("/hamkor/oquv");
  }, [router]);

  if (allowed !== true) {
    return (
      <div className="onboarding-bg grid min-h-screen place-items-center">
        <p className="text-[14px] text-mute">Yuklanmoqda…</p>
      </div>
    );
  }

  return (
    <div className="onboarding-bg grid min-h-screen place-items-center px-5">
      <div className="max-w-[440px] text-center">
        <span aria-hidden className="text-[42px]">🎥</span>
        <h1 className="mt-3 font-display text-[25px] font-extrabold text-ink">
          Video xabar bosqichi tayyorlanmoqda
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-body">
          Education bosqichidan muvaffaqiyatli oʻtdingiz. Oʻzingiz haqingizda qisqa video
          yuborish bosqichi yaqin kunlarda ochiladi.
        </p>
        <Link
          href="/"
          className="btn-primary mt-7 grid h-[56px] place-items-center rounded-pill font-display text-[17px] font-bold text-onbrand"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}
