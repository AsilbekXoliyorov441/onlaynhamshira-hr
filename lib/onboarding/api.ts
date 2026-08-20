"use client";

import { evaluate, type Evaluation } from "./evaluate";
import * as store from "./session";
import type { Answer, QuestionCode } from "./types";

/*
 * Qualification API qatlami.
 *
 * BACKEND DASTURCHI UCHUN: TZ'dagi toʻrtta endpoint aynan shu yerda,
 * shu nomlar bilan turibdi. Hozir ularning ichi brauzer xotirasiga
 * yozadi. Backend tayyor boʻlganda faqat SHU FAYL oʻzgaradi —
 * `USE_BACKEND` ni `true` qilib, har funksiyaning ichidagi `fetch`
 * blokini yoqish kifoya. Ekranlarga umuman tegilmaydi.
 *
 * Soʻrov/javob formatlari TZ'dagidek:
 *   POST /api/v1/onboarding/qualification/start
 *   PUT  /api/v1/onboarding/qualification/answers   { question_code, answer }
 *   POST /api/v1/onboarding/qualification/complete
 *   POST /api/v1/onboarding/qualification/evaluate
 */

const USE_BACKEND = false;
const BASE = "/api/v1/onboarding/qualification";

async function post<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: path === "/answers" ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return (await res.json()) as T;
}

/** TZ Q-00: sessiyani boshlash */
export async function startQualification(firstQuestion: QuestionCode): Promise<store.Session> {
  if (USE_BACKEND) {
    const data = await post<{ session_id: string; current_step: QuestionCode }>("/start");
    const session = store.startSession(data.current_step);
    return { ...session, sessionId: data.session_id };
  }
  return store.startSession(firstQuestion);
}

/** TZ BR-Q-003: har bir javob "Keyingi" bosilganda saqlanadi */
export async function saveAnswer(session: store.Session, answer: Answer): Promise<store.Session> {
  const next = store.putAnswer(session, answer);
  if (USE_BACKEND) {
    await post("/answers", {
      session_id: session.sessionId,
      question_code: answer.question_code,
      answer: answer.answer,
      answer_text: answer.answer_text,
      sub_answer: answer.sub_answer,
      regions: answer.regions,
    });
  }
  return next;
}

/** TZ Q-08: savollar tugadi, javoblar toʻplami yakunlandi */
export async function completeQualification(session: store.Session): Promise<void> {
  if (USE_BACKEND) await post("/complete", { session_id: session.sessionId });
}

/** TZ Q-09: natijani hisoblash */
export async function evaluateQualification(session: store.Session): Promise<Evaluation> {
  if (USE_BACKEND) {
    return await post<Evaluation>("/evaluate", { session_id: session.sessionId });
  }
  return evaluate(session.answers);
}

export type { Evaluation };
