"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Standalone from "./Standalone";
import { startQualification } from "@/lib/onboarding/api";
import { clearSession, loadSession } from "@/lib/onboarding/session";
import { QUALIFICATION_QUESTIONS, questionByCode } from "@/lib/onboarding/qualification";

/* TZ Q-00: QUALIFICATION_INTRO */
export default function QualificationIntro() {
  const router = useRouter();
  const [resumeSlug, setResumeSlug] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  /* Yarim qolgan sessiya bormi? (BR-Q-004) */
  useEffect(() => {
    const session = loadSession();
    if (session.status === "IN_PROGRESS" && session.answers.length > 0) {
      const current = session.currentQuestionCode ? questionByCode(session.currentQuestionCode) : null;
      setResumeSlug(current?.slug ?? QUALIFICATION_QUESTIONS[0].slug);
    }
    setReady(true);
  }, []);

  const begin = async (fresh: boolean) => {
    if (fresh) clearSession();
    await startQualification(QUALIFICATION_QUESTIONS[0].code);
    router.push(`/hamkor/saralash/${QUALIFICATION_QUESTIONS[0].slug}`);
  };

  return (
    <Standalone badge="Bosqich 5 / 8">
      <>
        <h1 className="font-display text-[27px] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[32px] lg:text-[36px]">
          Dastlabki saralashni boshlaymiz
        </h1>

        <p className="mt-4 text-[15.5px] leading-relaxed text-body">
          Sizga maʼlumotingiz, mutaxassisligingiz va ish tajribangiz haqida bir nechta savol
          beramiz. Javoblaringiz platformaning dastlabki talablariga mosligingizni aniqlash
          uchun ishlatiladi.
        </p>

        <p className="mt-3 text-[15.5px] leading-relaxed text-body">
          Savollarga aniq va haqqoniy javob bering. Keyingi bosqichlarda taqdim etilgan
          maʼlumotlar hujjatlar asosida tekshiriladi.
        </p>

        <div className="glass-card mt-6 flex items-center gap-3 rounded-2xl p-4">
          <span aria-hidden className="text-[20px]">⏱️</span>
          <p className="text-[14.5px] font-semibold text-ink">Taxminiy vaqt: 3–5 daqiqa</p>
        </div>

        {ready && (
          <div className="mt-8 flex flex-col gap-2.5">
            {resumeSlug ? (
              <>
                <button
                  type="button"
                  onClick={() => router.push(`/hamkor/saralash/${resumeSlug}`)}
                  className="btn-primary h-[54px] rounded-pill font-display text-[16.5px] font-bold text-onbrand transition-transform duration-300 hover:scale-[1.02]"
                >
                  Toʻxtagan joyimdan davom etish
                </button>
                <button
                  type="button"
                  onClick={() => begin(true)}
                  className="h-[54px] rounded-pill border border-line bg-surface font-display text-[16px] font-bold text-ink"
                >
                  Boshidan boshlash
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => begin(false)}
                className="btn-primary h-[54px] rounded-pill font-display text-[16.5px] font-bold text-onbrand transition-transform duration-300 hover:scale-[1.02]"
              >
                Boshlash
              </button>
            )}
            <Link
              href="/"
              className="grid h-[54px] place-items-center rounded-pill font-display text-[15.5px] font-semibold text-mute transition-colors duration-200 hover:text-ink"
            >
              Ortga qaytish
            </Link>
          </div>
        )}
      </>
    </Standalone>
  );
}
