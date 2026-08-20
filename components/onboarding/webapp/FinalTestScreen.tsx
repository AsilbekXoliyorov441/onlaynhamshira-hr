"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Shell from "./Shell";
import { Choice, Nav } from "./ui";
import { LESSONS, LESSON_TOTAL } from "@/lib/onboarding/education";
import { FINAL_TEST_QUESTIONS } from "@/lib/onboarding/education-tests";
import { completeFinalTest } from "@/lib/onboarding/education-api";
import type { Answers } from "@/lib/onboarding/education-evaluate";
import { loadEducation, recordFinalAttempt, saveEducation, type EducationSession } from "@/lib/onboarding/education-session";

const STEP_LABELS = LESSONS.map((l) => l.shortTitle);

/*
 * Yakuniy Mini Test (T-05) — 10 savol.
 *
 * BR-E-015: bu yerda javob toʻgʻri yoki notoʻgʻriligi koʻrsatilmaydi.
 * Natija va qayta oʻrganish tavsiyalari alohida ekranda chiqadi.
 */
export default function FinalTestScreen() {
  const router = useRouter();
  const [session, setSession] = useState<EducationSession | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const loaded = loadEducation();
    /* BR-E-008: barcha darslar yakunlanmagan boʻlsa test ochilmaydi */
    const allDone = LESSONS.every((l) => loaded.completedLessons.includes(l.code));
    if (!allDone) {
      const pending = LESSONS.find((l) => !loaded.completedLessons.includes(l.code));
      router.replace(pending ? `/hamkor/oquv/${pending.slug}` : "/hamkor/oquv");
      return;
    }
    setSession(loaded);
    saveEducation({ ...loaded, status: "TEST_IN_PROGRESS" });
  }, [router]);

  const answered = FINAL_TEST_QUESTIONS.filter((q) => answers[q.code]).length;
  const allAnswered = answered === FINAL_TEST_QUESTIONS.length;

  const finish = async () => {
    if (!session || !allAnswered || busy) return;
    setBusy(true);
    const evaluation = await completeFinalTest(FINAL_TEST_QUESTIONS, answers);
    recordFinalAttempt(session, {
      correct: evaluation.correct,
      total: evaluation.total,
      percentage: evaluation.percentage,
      criticalPassed: evaluation.criticalPassed,
      result: evaluation.result,
      topicsToReview: evaluation.topicsToReview,
    });
    router.push("/hamkor/oquv/natija");
  };

  if (!session) {
    return (
      <div className="onboarding-bg grid min-h-screen place-items-center">
        <p className="text-[14px] text-mute">Yuklanmoqda…</p>
      </div>
    );
  }

  return (
    <Shell
      stage="Oʻquv va mini test"
      current={LESSON_TOTAL}
      total={LESSON_TOTAL}
      steps={STEP_LABELS}
      unit="dars"
    >
      <p className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-brand-700">
        Yakuniy test
      </p>
      <h1 className="mt-2 font-display text-[24px] font-extrabold leading-snug text-ink sm:text-[27px] lg:text-[31px]">
        Bilimingizni tekshiramiz
      </h1>
      <p className="mt-2.5 text-[14.5px] leading-relaxed text-body">
        {FINAL_TEST_QUESTIONS.length} ta savol. Har savolda bitta toʻgʻri javob bor.
        Javob berilgan: <span className="font-semibold text-ink">{answered} / {FINAL_TEST_QUESTIONS.length}</span>
      </p>

      <div className="mt-7 space-y-8">
        {FINAL_TEST_QUESTIONS.map((question, qi) => (
          <div key={question.code}>
            <h2 className="font-display text-[17px] font-bold leading-snug text-ink">
              {qi + 1}. {question.text}
            </h2>
            <div className="mt-3 space-y-2.5" role="radiogroup">
              {question.options.map((option) => (
                <Choice
                  key={option.code}
                  label={option.text}
                  selected={answers[question.code] === option.code}
                  onSelect={() => setAnswers((prev) => ({ ...prev, [question.code]: option.code }))}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Nav
        backHref={`/hamkor/oquv/${LESSONS[LESSON_TOTAL - 1].slug}`}
        onNext={finish}
        nextLabel="Testni yakunlash"
        nextDisabled={!allAnswered || busy}
        disabledHint={`Yana ${FINAL_TEST_QUESTIONS.length - answered} ta savolga javob bering`}
      />
    </Shell>
  );
}
