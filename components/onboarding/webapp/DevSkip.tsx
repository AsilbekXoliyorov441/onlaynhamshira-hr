"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LESSONS } from "@/lib/onboarding/education";
import { saveEducation } from "@/lib/onboarding/education-session";
import { saveSession } from "@/lib/onboarding/session";
import { saveVideo } from "@/lib/onboarding/video-store";

/*
 * ═══════════════════════════════════════════════════════════════
 *  VAQTINCHALIK TEST TUGMASI — PRODUCTION'GA CHIQARISHDAN OLDIN
 *  QUYIDAGI QATORNI `false` QILING (yoki shu faylni oʻchiring).
 * ═══════════════════════════════════════════════════════════════
 *
 * Nima qiladi: Qualification va Education bosqichlarini "oʻtilgan"
 * deb belgilaydi va toʻgʻridan-toʻgʻri video bosqichiga oʻtkazadi.
 * Shunda video qismini sinash uchun har safar 8 savol + 5 dars +
 * 5 ta test yechib oʻtirish shart emas.
 *
 * Tugma `app/[locale]/hamkor/layout.tsx` orqali barcha onboarding
 * ekranlarida koʻrinadi.
 */
const DEV_SKIP = false;

export default function DevSkip() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!DEV_SKIP || !mounted) return null;

  /* Qualification + Education'ni "oʻtilgan" holatga keltiradi */
  const markPassed = () => {
    saveSession({
      sessionId: "dev-skip",
      status: "QUALIFIED",
      currentQuestionCode: null,
      answers: [],
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      rejectionCode: null,
    });

    saveEducation({
      status: "COMPLETED",
      currentLessonCode: null,
      completedLessons: LESSONS.map((l) => l.code),
      miniTests: [],
      finalAttempts: [
        {
          attemptNumber: 1,
          correct: 10,
          total: 10,
          percentage: 100,
          criticalPassed: true,
          result: "PASSED",
          topicsToReview: [],
          completedAt: new Date().toISOString(),
        },
      ],
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    });
  };

  const toVideo = () => {
    markPassed();
    saveVideo({
      status: "NOT_STARTED",
      meta: null,
      consents: {},
      uploadId: null,
      uploadedBytes: 0,
      startedAt: null,
      uploadedAt: null,
      reRecordReason: null,
    });
    router.push("/hamkor/video");
  };

  const resetAll = () => {
    try {
      localStorage.removeItem("oh-qualification-v1");
      localStorage.removeItem("oh-education-v1");
      localStorage.removeItem("oh-video-v1");
      indexedDB.deleteDatabase("oh-onboarding");
    } catch {
      /* eʼtiborsiz */
    }
    router.push("/hamkor");
  };

  return (
    /* Oʻng tepada — pastdagi "Orqaga"/"Keyingi" tugmalarini ham,
       chapdagi "Saqlash va chiqish"ni ham toʻsib qolmasin */
    <div className="fixed right-3 top-1/2 z-[60] -translate-y-1/2 print:hidden">
      {open ? (
        <div className="w-[230px] rounded-2xl border-2 border-dashed border-[#D9A21B] bg-[#FFF8E8] p-3 shadow-[0_16px_36px_-20px_rgba(11,43,28,0.4)]">
          <p className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#8A6410]">
            Test rejimi
          </p>
          <div className="mt-2.5 flex flex-col gap-2">
            <button
              type="button"
              onClick={toVideo}
              className="h-[42px] rounded-pill bg-[#D9A21B] px-3 font-display text-[13.5px] font-bold text-white"
            >
              Video bosqichiga oʻtish
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="h-[38px] rounded-pill border border-[#D9A21B] px-3 text-[13px] font-semibold text-[#8A6410]"
            >
              Hammasini tozalash
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-[30px] text-[12.5px] font-semibold text-[#8A6410]"
            >
              Yopish
            </button>
          </div>
          <p className="mt-2 text-[11px] leading-snug text-[#8A6410]">
            Bu tugma faqat sinov uchun. Chiqarishdan oldin
            <code className="mx-1">DevSkip.tsx</code> dagi
            <code className="mx-1">DEV_SKIP</code> ni <code>false</code> qiling.
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Test rejimi"
          className="grid h-[44px] w-[44px] place-items-center rounded-full border-2 border-dashed border-[#D9A21B] bg-[#FFF8E8] text-[17px] shadow-[0_10px_24px_-14px_rgba(11,43,28,0.4)]"
        >
          <span aria-hidden>🛠️</span>
        </button>
      )}
    </div>
  );
}
