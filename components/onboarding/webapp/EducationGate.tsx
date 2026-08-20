"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadSession } from "@/lib/onboarding/session";

/*
 * BR-Q-005: "Foydalanuvchi Qualification yakunlanmaguncha Education
 * bosqichiga kira olmaydi." Shu bois sahifa ochilishida sessiya
 * holati tekshiriladi.
 */
export default function EducationGate() {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const { status } = loadSession();
    const ok = status === "QUALIFIED" || status === "MANUAL_REVIEW_REQUIRED";
    setAllowed(ok);
    if (!ok) router.replace("/hamkor/saralash");
  }, [router]);

  if (allowed !== true) {
    return (
      <div className="grid min-h-screen place-items-center bg-page">
        <p className="text-[14px] text-mute">Yuklanmoqda…</p>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen place-items-center bg-page px-5">
      <div className="max-w-[420px] text-center">
        <span aria-hidden className="text-[40px]">📚</span>
        <h1 className="mt-3 font-display text-[24px] font-extrabold text-ink">
          Education bosqichi tayyorlanmoqda
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-body">
          Dastlabki saralashdan oʻtdingiz. Oʻquv materiallari va mini-test bosqichi
          yaqin kunlarda ochiladi.
        </p>
        <Link
          href="/"
          className="btn-primary mt-7 grid h-[52px] place-items-center rounded-pill font-display text-[16px] font-bold text-onbrand"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}
