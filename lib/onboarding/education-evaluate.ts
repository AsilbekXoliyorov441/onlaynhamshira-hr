import type { TestEvaluation, TestQuestion, TestResult } from "./types";

/*
 * Test natijasini hisoblash — TZ "6. Testni baholash mezoni".
 *
 * Formula:  toʻgʻri javoblar / jami savollar × 100
 * Oʻtish shartlari (BR-E-004):
 *   1) foiz >= chegara,  VA
 *   2) BARCHA critical savollar toʻgʻri.
 * Ikkinchi shart bajarilmasa, foiz yuqori boʻlsa ham test oʻtmagan
 * hisoblanadi.
 */

export type Answers = Record<string, string>; // question_code -> option_code

export function isCorrect(question: TestQuestion, selected: string | undefined): boolean {
  if (!selected) return false;
  return question.options.some((o) => o.code === selected && o.isCorrect);
}

export function evaluateTest(
  questions: TestQuestion[],
  answers: Answers,
  passingPercentage: number,
): TestEvaluation {
  const correct = questions.filter((q) => isCorrect(q, answers[q.code])).length;
  const total = questions.length;
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);

  const criticalPassed = questions
    .filter((q) => q.isCritical)
    .every((q) => isCorrect(q, answers[q.code]));

  /* BR-E-015: notoʻgʻri javoblarning roʻyxati emas, faqat qayta
     oʻrganish tavsiya etilgan MAVZULAR koʻrsatiladi */
  const topicsToReview = Array.from(
    new Set(
      questions
        .filter((q) => !isCorrect(q, answers[q.code]))
        .map((q) => q.topic)
        .filter((t): t is string => Boolean(t)),
    ),
  );

  const result: TestResult =
    percentage >= passingPercentage && criticalPassed ? "PASSED" : "RETRY_REQUIRED";

  return { correct, total, percentage, criticalPassed, result, topicsToReview };
}

/** Mini testlar uchun: foiz emas, "kamida N ta toʻgʻri" + critical */
export function evaluateMiniTest(
  questions: TestQuestion[],
  answers: Answers,
  minCorrect: number,
): TestEvaluation {
  const base = evaluateTest(questions, answers, 0);
  const passed = base.correct >= minCorrect && base.criticalPassed;
  return { ...base, result: passed ? "PASSED" : "RETRY_REQUIRED" };
}
