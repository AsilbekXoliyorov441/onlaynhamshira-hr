"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/Icons";
import { LESSONS } from "@/lib/onboarding/education";
import { startEducation } from "@/lib/onboarding/education-api";
import { loadEducation } from "@/lib/onboarding/education-session";
import { lessonByCode } from "@/lib/onboarding/education";
import { loadSession } from "@/lib/onboarding/session";

/* TZ E-00: EDUCATION_INTRO */
export default function EducationIntro() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [resumeSlug, setResumeSlug] = useState<string | null>(null);

  useEffect(() => {
    /* BR-Q-005: Qualification yakunlanmagan boʻlsa Education ochilmaydi */
    const { status } = loadSession();
    if (status !== "QUALIFIED" && status !== "MANUAL_REVIEW_REQUIRED") {
      router.replace("/hamkor/saralash");
      return;
    }

    /* BR-E-010: oxirgi yakunlanmagan darsdan davom etish */
    const education = loadEducation();
    if (education.status !== "NOT_STARTED") {
      const pending = LESSONS.find((l) => !education.completedLessons.includes(l.code));
      const current = education.currentLessonCode ? lessonByCode(education.currentLessonCode) : null;
      setResumeSlug((pending ?? current ?? LESSONS[0]).slug);
    }
    setReady(true);
  }, [router]);

  const begin = async () => {
    await startEducation(LESSONS[0].code);
    router.push(`/hamkor/oquv/${LESSONS[0].slug}`);
  };

  return (
    <div className="onboarding-bg min-h-screen lg:grid lg:place-items-center">
      <div className="mx-auto w-full max-w-[620px] px-5 pb-10 pt-6 sm:px-8 lg:py-14">
        <Link href="/" className="inline-flex" aria-label="Bosh sahifa">
          <LogoMark aria-hidden className="h-[38px] w-auto" />
        </Link>

        <span className="badge-pill mt-8 inline-flex items-center gap-2 rounded-pill py-[7px] pl-3 pr-4 text-[13px] font-semibold">
          Bosqich 6 / 8
        </span>

        <h1 className="mt-4 font-display text-[27px] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[32px] lg:text-[36px]">
          Platformaning asosiy qoidalari bilan tanishing
        </h1>

        <p className="mt-4 text-[15.5px] leading-relaxed text-body">
          Keyingi bosqichda Onlayn Hamshira platformasining ishlash tartibi va
          mutaxassislar uchun asosiy qoidalar bilan tanishasiz.
        </p>
        <p className="mt-3 text-[15.5px] leading-relaxed text-body">
          Har bir qisqa darsdan keyin maʼlumotni tushunganingizni tekshirish uchun
          savollar beriladi.
        </p>
        <p className="mt-3 text-[15.5px] leading-relaxed text-body">
          Savollarga toʻgʻri javob berib, keyingi bosqichga oʻtishingiz mumkin.
        </p>

        <div className="glass-card mt-6 flex items-center gap-3 rounded-2xl p-4">
          <span aria-hidden className="text-[20px]">⏱️</span>
          <p className="text-[14.5px] font-semibold text-ink">Taxminiy vaqt: 7–10 daqiqa</p>
        </div>

        <ol className="mt-6 space-y-2">
          {LESSONS.map((lesson) => (
            <li key={lesson.code} className="flex items-center gap-3 text-[14.5px] text-body">
              <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-brand-100 font-display text-[12.5px] font-bold text-brand-700">
                {lesson.index}
              </span>
              {lesson.shortTitle}
            </li>
          ))}
        </ol>

        {ready && (
          <div className="mt-8 flex flex-col gap-2.5">
            {resumeSlug ? (
              <button
                type="button"
                onClick={() => router.push(`/hamkor/oquv/${resumeSlug}`)}
                className="btn-primary h-[56px] rounded-pill font-display text-[17px] font-bold text-onbrand transition-transform duration-300 hover:scale-[1.02]"
              >
                Toʻxtagan joyimdan davom etish
              </button>
            ) : (
              <button
                type="button"
                onClick={begin}
                className="btn-primary h-[56px] rounded-pill font-display text-[17px] font-bold text-onbrand transition-transform duration-300 hover:scale-[1.02]"
              >
                Oʻqishni boshlash
              </button>
            )}
            <Link
              href="/"
              className="grid h-[52px] place-items-center rounded-pill font-display text-[15.5px] font-semibold text-mute transition-colors duration-200 hover:text-ink"
            >
              Saqlash va chiqish
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
