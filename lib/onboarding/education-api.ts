"use client";

import { PASSING_PERCENTAGE } from "./education";
import { evaluateTest, type Answers } from "./education-evaluate";
import * as store from "./education-session";
import type { LessonCode, TestEvaluation, TestQuestion } from "./types";

/*
 * Education / Mini Test API qatlami.
 *
 * BACKEND DASTURCHI UCHUN: TZ "11. API Requirements" dagi barcha
 * endpointlar shu yerda, aynan oʻsha manzillar bilan. Hozir ularning
 * ichi brauzer xotirasiga yozadi. Backend tayyor boʻlganda faqat
 * `USE_BACKEND` ni `true` qilish kifoya — ekranlarga tegilmaydi.
 *
 *   POST /api/v1/onboarding/education/start
 *   GET  /api/v1/onboarding/education/progress
 *   GET  /api/v1/onboarding/education/lessons/{lessonCode}
 *   POST /api/v1/onboarding/education/lessons/{lessonCode}/complete
 *   POST /api/v1/onboarding/mini-test/start
 *   POST /api/v1/onboarding/mini-test/answers
 *   POST /api/v1/onboarding/mini-test/complete
 *   GET  /api/v1/onboarding/mini-test/result
 *   POST /api/v1/onboarding/mini-test/retry
 */

const USE_BACKEND = false;
const BASE = "/api/v1/onboarding";

async function call<T>(path: string, method: "GET" | "POST", body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return (await res.json()) as T;
}

/** E-00 */
export async function startEducation(firstLesson: LessonCode): Promise<store.EducationSession> {
  if (USE_BACKEND) await call("/education/start", "POST");
  return store.startEducation(firstLesson);
}

/** BR-E-009: darsni yakunlash holati saqlanadi */
export async function completeLesson(
  session: store.EducationSession,
  code: LessonCode,
): Promise<store.EducationSession> {
  if (USE_BACKEND) await call(`/education/lessons/${code}/complete`, "POST");
  return store.markLessonComplete(session, code);
}

/**
 * Bitta test javobini saqlash. TZ payload namunasi:
 *   { attempt_id, question_code, selected_option_code }
 * Hozircha javoblar ekranda toʻplanadi va yakunda birga baholanadi.
 */
export async function saveTestAnswer(
  attemptId: string,
  questionCode: string,
  optionCode: string,
): Promise<void> {
  if (USE_BACKEND) {
    await call("/mini-test/answers", "POST", {
      attempt_id: attemptId,
      question_code: questionCode,
      selected_option_code: optionCode,
    });
  }
}

/** Oʻtish chegarasi: backend `mini_tests.passing_percentage` qaytarganda
 *  shu qiymat ishlatiladi, aks holda TZ'dagi 70%. */
export async function passingPercentage(): Promise<number> {
  if (USE_BACKEND) {
    const data = await call<{ passing_percentage: number }>("/mini-test/result", "GET");
    return data.passing_percentage ?? PASSING_PERCENTAGE;
  }
  return PASSING_PERCENTAGE;
}

/** T-05 yakunlash va natijani hisoblash */
export async function completeFinalTest(
  questions: TestQuestion[],
  answers: Answers,
): Promise<TestEvaluation> {
  if (USE_BACKEND) {
    return await call<TestEvaluation>("/mini-test/complete", "POST", { answers });
  }
  return evaluateTest(questions, answers, await passingPercentage());
}

/** BR-E-001/002: qayta topshirish (MVP'da soni cheklanmaydi) */
export async function retryFinalTest(): Promise<void> {
  if (USE_BACKEND) await call("/mini-test/retry", "POST");
}
