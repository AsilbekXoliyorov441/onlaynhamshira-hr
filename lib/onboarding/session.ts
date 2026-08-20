"use client";

import type { Answer, QualificationStatus, QuestionCode, RejectionCode } from "./types";

/*
 * Qualification sessiyasi — brauzer xotirasida.
 *
 * Hozircha nomzod anonim (telefon soʻralmaydi), shuning uchun sessiya
 * faqat shu qurilmada/brauzerda saqlanadi. `BR-Q-004` ("yopib ketsa,
 * oxirgi savoldan davom etadi") shu doirada bajariladi.
 *
 * Telefon tasdiqlash qoʻshilganda: `sessionId` backend qaytargan
 * identifikator bilan almashadi, qolgan kod oʻzgarmaydi.
 */

const KEY = "oh-qualification-v1";

export type Session = {
  sessionId: string;
  status: QualificationStatus;
  currentQuestionCode: QuestionCode | null;
  answers: Answer[];
  startedAt: string | null;
  completedAt: string | null;
  /* BR-Q-007: ichki rad etish kodi foydalanuvchiga koʻrsatilmaydi —
     shu bois manzil satrida emas, sessiyada saqlanadi */
  rejectionCode: RejectionCode | null;
};

const EMPTY: Session = {
  sessionId: "",
  status: "NOT_STARTED",
  currentQuestionCode: null,
  answers: [],
  startedAt: null,
  completedAt: null,
  rejectionCode: null,
};

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `local-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

export function loadSession(): Session {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Session;
    /* Eski/buzilgan yozuvni jim qabul qilmaymiz */
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.answers)) return EMPTY;
    return { ...EMPTY, ...parsed };
  } catch {
    return EMPTY;
  }
}

export function saveSession(session: Session): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(session));
  } catch {
    /* xotira toʻlgan yoki taqiqlangan — jarayon baribir davom etadi */
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* eʼtiborsiz */
  }
}

export function startSession(firstQuestion: QuestionCode): Session {
  const existing = loadSession();
  if (existing.status === "IN_PROGRESS" && existing.sessionId) return existing;

  const session: Session = {
    sessionId: newId(),
    status: "IN_PROGRESS",
    currentQuestionCode: firstQuestion,
    answers: [],
    startedAt: new Date().toISOString(),
    completedAt: null,
    rejectionCode: null,
  };
  saveSession(session);
  return session;
}

/** Javobni qoʻshadi yoki almashtiradi (BR-Q-009: tahrirlash mumkin) */
export function putAnswer(session: Session, answer: Answer): Session {
  const answers = session.answers.filter((a) => a.question_code !== answer.question_code);
  answers.push(answer);
  answers.sort((a, b) => a.question_code.localeCompare(b.question_code));
  const next: Session = { ...session, answers };
  saveSession(next);
  return next;
}

export function answerFor(session: Session, code: QuestionCode): Answer | undefined {
  return session.answers.find((a) => a.question_code === code);
}
