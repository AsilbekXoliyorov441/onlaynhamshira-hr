import { QUALIFICATION_QUESTIONS, questionByCode } from "./qualification";
import type { Answer, Eligibility, QualificationResult, RejectionCode } from "./types";

/*
 * Javoblardan natija hisoblash — TZ "4. Qualification natijalari".
 *
 * Mantiq ataylab UI'da ham saqlanadi: nomzod javob berishi bilan darhol
 * javob qaytarish uchun kerak. Backend `POST /evaluate` da xuddi shu
 * qoidalarni takrorlaydi — u yakuniy hakam, UI esa oldindan koʻrsatuvchi.
 */

export type Evaluation = {
  result: QualificationResult;
  /** foydalanuvchiga koʻrsatilmaydi (BR-Q-007), backendga yuboriladi */
  rejectionCode?: RejectionCode;
  requiresManualReview: boolean;
};

/** Bitta javobning holatga taʼsiri */
export function eligibilityOfAnswer(answer: Answer): Eligibility[] {
  const question = questionByCode(answer.question_code);
  if (!question) return [];
  const out: Eligibility[] = [];

  const selected = Array.isArray(answer.answer) ? answer.answer : [answer.answer];

  if (question.kind === "multi" || question.kind === "consent") {
    const missing = (question.requiredOptions ?? []).filter((c) => !selected.includes(c));
    if (missing.length > 0 && question.missingRequired) out.push(question.missingRequired);
  } else {
    for (const code of selected) {
      const option = question.options?.find((o) => o.code === code);
      if (option) out.push(option.eligibility);
    }
  }

  if (answer.sub_answer && question.sub) {
    const option = question.sub.options.find((o) => o.code === answer.sub_answer);
    if (option) out.push(option.eligibility);
  }

  return out;
}

export function evaluate(answers: Answer[]): Evaluation {
  const all = answers.flatMap(eligibilityOfAnswer);

  const rejected = all.find((e) => e.kind === "rejected");
  if (rejected && rejected.kind === "rejected") {
    return { result: "NOT_QUALIFIED", rejectionCode: rejected.code, requiresManualReview: false };
  }

  if (all.some((e) => e.kind === "manual_review")) {
    return { result: "MANUAL_REVIEW_REQUIRED", requiresManualReview: true };
  }

  return { result: "QUALIFIED", requiresManualReview: false };
}

/** Barcha savollarga javob berilganmi (BR-Q-002) */
export function isComplete(answers: Answer[]): boolean {
  return QUALIFICATION_QUESTIONS.every((q) => answers.some((a) => a.question_code === q.code));
}
