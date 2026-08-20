"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Shell from "./Shell";
import { Choice, Nav, Notice } from "./ui";
import { LESSONS, LESSON_TOTAL, lessonByCode, nextLesson } from "@/lib/onboarding/education";
import { evaluateMiniTest, isCorrect, type Answers } from "@/lib/onboarding/education-evaluate";
import { loadEducation, recordMiniTest, type EducationSession } from "@/lib/onboarding/education-session";
import type { MiniTest, TestEvaluation } from "@/lib/onboarding/types";

const STEP_LABELS = LESSONS.map((l) => l.shortTitle);

/*
 * Mini test (T-01…T-04).
 *
 * Yiqilgan holatda foydalanuvchi darsga qaytarilmaydi — notoʻgʻri
 * javoblarga izoh koʻrsatiladi (BR-E-014) va oʻsha yerda qayta urinadi.
 */
export default function MiniTestScreen({ test }: { test: MiniTest }) {
  const router = useRouter();
  const [session, setSession] = useState<EducationSession | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [evaluation, setEvaluation] = useState<TestEvaluation | null>(null);

  const lesson = lessonByCode(test.lesson)!;

  useEffect(() => {
    const loaded = loadEducation();
    if (!loaded.completedLessons.includes(test.lesson)) {
      router.replace(`/hamkor/oquv/${lesson.slug}`);
      return;
    }
    setSession(loaded);
  }, [test.lesson, lesson.slug, router]);

  const allAnswered = test.questions.every((q) => answers[q.code]);

  const check = () => {
    if (!session || !allAnswered) return;
    const result = evaluateMiniTest(test.questions, answers, test.minCorrect);
    setEvaluation(result);
    setSession(recordMiniTest(session, test.code, result.result === "PASSED", result.percentage));
  };

  const retry = () => {
    setAnswers({});
    setEvaluation(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goNext = () => {
    const next = nextLesson(lesson);
    router.push(next ? `/hamkor/oquv/${next.slug}` : "/hamkor/oquv/yakuniy-test");
  };

  if (!session) {
    return (
      <div className="onboarding-bg grid min-h-screen place-items-center">
        <p className="text-[14px] text-mute">Yuklanmoqda…</p>
      </div>
    );
  }

  const passed = evaluation?.result === "PASSED";

  return (
    <Shell
      stage="Education va Mini Test"
      current={lesson.index}
      total={LESSON_TOTAL}
      steps={STEP_LABELS}
      unit="dars"
    >
      <p className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-brand-700">
        {lesson.index}-dars · Mini test
      </p>
      <h1 className="mt-2 font-display text-[22px] font-extrabold leading-snug text-ink sm:text-[25px] lg:text-[28px]">
        {test.title.replace(/^Mini Test \d+: /, "")}
      </h1>
      <p className="mt-2.5 text-[14.5px] leading-relaxed text-body">
        {test.questions.length} ta savol. Oʻtish uchun kamida {test.minCorrect} tasiga
        toʻgʻri javob bering.
      </p>

      <div className="mt-7 space-y-8">
        {test.questions.map((question, qi) => {
          const selected = answers[question.code];
          const correct = isCorrect(question, selected);
          return (
            <div key={question.code}>
              <h2 className="font-display text-[17px] font-bold leading-snug text-ink">
                {qi + 1}. {question.text}
              </h2>

              <div className="mt-3 space-y-2.5" role="radiogroup">
                {question.options.map((option) => {
                  const chosen = selected === option.code;
                  /* Tekshirilgandan keyin toʻgʻri javob ajratiladi */
                  const showAsCorrect = Boolean(evaluation) && option.isCorrect;
                  const showAsWrong = Boolean(evaluation) && chosen && !option.isCorrect;
                  return (
                    <div
                      key={option.code}
                      className={
                        showAsCorrect
                          ? "rounded-2xl ring-2 ring-brand-500"
                          : showAsWrong
                          ? "rounded-2xl ring-2 ring-[#E86A6A]"
                          : undefined
                      }
                    >
                      <Choice
                        label={option.text}
                        selected={chosen}
                        onSelect={() => {
                          if (evaluation) return;
                          setAnswers((prev) => ({ ...prev, [question.code]: option.code }));
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* BR-E-014: mini testda notoʻgʻri javobga izoh koʻrsatiladi */}
              {evaluation && !correct && question.explanation && (
                <Notice>{question.explanation}</Notice>
              )}
              {evaluation && !correct && question.isCritical && (
                <Notice tone="warn">
                  Bu savol majburiy — keyingi bosqichga oʻtish uchun unga toʻgʻri javob
                  berishingiz kerak.
                </Notice>
              )}
            </div>
          );
        })}
      </div>

      {evaluation && (
        <div
          className={`mt-8 rounded-2xl border p-5 ${
            passed ? "border-brand-400 bg-brand-50" : "border-[#F0C36D] bg-[#FFF8E8]"
          }`}
        >
          <p className="font-display text-[18px] font-extrabold text-ink">
            {passed ? "Toʻgʻri javob berdingiz" : "Natija yetarli emas"}
          </p>
          <p className="mt-1.5 text-[14.5px] text-body">
            Toʻgʻri javoblar: {evaluation.correct} / {evaluation.total}
            {!evaluation.criticalPassed && " · majburiy savolga xato javob berildi"}
          </p>
        </div>
      )}

      {evaluation ? (
        <Nav
          onBack={passed ? undefined : retry}
          backLabel="Qayta urinish"
          onNext={passed ? goNext : retry}
          nextLabel={passed ? "Keyingi darsga oʻtish" : "Qayta urinish"}
        />
      ) : (
        <Nav
          backHref={`/hamkor/oquv/${lesson.slug}`}
          onNext={check}
          nextLabel="Javoblarni tekshirish"
          nextDisabled={!allAnswered}
          disabledHint="Barcha savollarga javob bering"
        />
      )}
    </Shell>
  );
}
