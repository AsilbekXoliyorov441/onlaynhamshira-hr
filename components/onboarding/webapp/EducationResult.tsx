"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Standalone from "./Standalone";
import { LESSONS, PASSING_PERCENTAGE } from "@/lib/onboarding/education";
import { retryFinalTest } from "@/lib/onboarding/education-api";
import { lastFinalAttempt, loadEducation, type FinalAttempt } from "@/lib/onboarding/education-session";

/* E-06A / E-06B */
export default function EducationResult() {
  const router = useRouter();
  const [attempt, setAttempt] = useState<FinalAttempt | null | undefined>(undefined);

  useEffect(() => {
    const session = loadEducation();
    const last = lastFinalAttempt(session);
    if (!last) {
      router.replace("/hamkor/oquv");
      return;
    }
    setAttempt(last);
  }, [router]);

  const again = async () => {
    await retryFinalTest();
    router.push("/hamkor/oquv/yakuniy-test");
  };

  if (!attempt) {
    return (
      <div className="onboarding-bg grid min-h-screen place-items-center">
        <p className="text-[14px] text-mute">Natija hisoblanmoqda…</p>
      </div>
    );
  }

  const passed = attempt.result === "PASSED";

  return (
    <Standalone badge="Bosqich 6 / 8">
      <>
        <div>
          <span aria-hidden className="text-[42px]">{passed ? "🎉" : "📘"}</span>
          <h1 className="mt-3 font-display text-[26px] font-extrabold leading-[1.18] tracking-[-0.02em] text-ink sm:text-[30px] lg:text-[34px]">
            {passed
              ? "Tabriklaymiz, siz ushbu bosqichdan muvaffaqiyatli oʻtdingiz!"
              : "Ayrim mavzularni qayta koʻrib chiqish kerak"}
          </h1>
          <p className="mt-4 text-[15.5px] leading-relaxed text-body">
            {passed
              ? "Siz platformaning asosiy ishlash tartibi, mutaxassis vazifalari va hamkorlik qoidalari boʻyicha yetarli bilimga ega ekaningizni tasdiqladingiz. Keyingi bosqichda oʻzingiz, tajribangiz va hamkorlik motivatsiyangiz haqida qisqa video yuborasiz."
              : "Mini Test natijangiz keyingi bosqichga oʻtish uchun yetarli boʻlmadi. Notoʻgʻri javob berilgan mavzularni qayta oʻrganib, testni yana bir marta topshirishingiz mumkin."}
          </p>
        </div>

        {/* Natija bloki */}
        <div
          className={`mt-6 rounded-2xl border p-5 ${
            passed ? "border-brand-400 bg-brand-50" : "border-line bg-surface"
          }`}
        >
          <p className="flex items-baseline justify-between gap-3">
            <span className="text-[14.5px] text-body">Natija</span>
            <span className="font-display text-[30px] font-extrabold text-ink">
              {attempt.percentage}%
            </span>
          </p>
          <p className="mt-2 flex items-baseline justify-between gap-3 text-[14.5px]">
            <span className="text-body">Toʻgʻri javoblar</span>
            <span className="font-semibold text-ink">
              {attempt.correct} / {attempt.total}
            </span>
          </p>
          <p className="mt-2 flex items-baseline justify-between gap-3 text-[14.5px]">
            <span className="text-body">{passed ? "Holat" : "Minimal natija"}</span>
            <span className="font-semibold text-ink">
              {passed ? "Muvaffaqiyatli" : `${PASSING_PERCENTAGE}%`}
            </span>
          </p>
          {!passed && !attempt.criticalPassed && (
            <p className="mt-3 border-t border-line pt-3 text-[13.5px] leading-relaxed text-body">
              Majburiy savollardan biriga notoʻgʻri javob berildi — ular boʻyicha toʻgʻri
              javob berish shart.
            </p>
          )}
        </div>

        {/* BR-E-015: notoʻgʻri javoblar roʻyxati emas, faqat mavzular */}
        {!passed && attempt.topicsToReview.length > 0 && (
          <div className="mt-5">
            <p className="font-display text-[16px] font-bold text-ink">
              Quyidagi mavzularni qayta koʻrib chiqing
            </p>
            <ul className="mt-3 space-y-2">
              {attempt.topicsToReview.map((topic) => (
                <li key={topic} className="flex gap-3 text-[15px] leading-relaxed text-body">
                  <span aria-hidden className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-brand-500" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-2.5">
          {passed ? (
            <Link
              href="/hamkor/video"
              className="btn-primary grid h-[56px] place-items-center rounded-pill font-display text-[17px] font-bold text-onbrand transition-transform duration-300 hover:scale-[1.02]"
            >
              Video xabar bosqichiga oʻtish
            </Link>
          ) : (
            <>
              <button
                type="button"
                onClick={again}
                className="btn-primary h-[56px] rounded-pill font-display text-[17px] font-bold text-onbrand transition-transform duration-300 hover:scale-[1.02]"
              >
                Testni qayta topshirish
              </button>
              <Link
                href={`/hamkor/oquv/${LESSONS[0].slug}`}
                className="grid h-[56px] place-items-center rounded-pill border-2 border-line bg-surface font-display text-[16px] font-bold text-ink transition-colors duration-200 hover:border-brand-400"
              >
                Darslarni qayta koʻrish
              </Link>
            </>
          )}
          <Link
            href="/"
            className="grid h-[52px] place-items-center rounded-pill font-display text-[15.5px] font-semibold text-mute transition-colors duration-200 hover:text-ink"
          >
            Saqlash va chiqish
          </Link>
        </div>
      </>
    </Standalone>
  );
}
