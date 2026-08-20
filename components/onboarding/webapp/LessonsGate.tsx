"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadVideo } from "@/lib/onboarding/video-store";

/*
 * BR-V-016: "Video muvaffaqiyatli yuklanmasdan keyingi bosqich
 * ochilmaydi." Batafsil video darsliklar bosqichining oʻzi (Stage 5)
 * TZ kelgach quriladi.
 */
export default function LessonsGate() {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const { status } = loadVideo();
    const ok = status === "UPLOADED" || status === "ACCEPTED" || status === "UNDER_REVIEW";
    setAllowed(ok);
    if (!ok) router.replace("/hamkor/video");
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
        <span aria-hidden className="text-[42px]">
          🎬
        </span>
        <h1 className="mt-3 font-display text-[25px] font-extrabold text-ink">
          Video darsliklar tayyorlanmoqda
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-body">
          Video xabaringiz qabul qilindi. Mobil ilova va buyurtmalar bilan ishlash boʻyicha
          batafsil darsliklar yaqin kunlarda ochiladi.
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
