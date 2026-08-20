"use client";

import type { EducationStatus, LessonCode } from "./types";

/*
 * Education sessiyasi — brauzer xotirasida (Qualification'dagi kabi).
 * Nomzod anonim boʻlgani uchun BR-E-010 ("chiqsa, oxirgi yakunlanmagan
 * darsdan davom etadi") shu qurilma doirasida bajariladi.
 */

const KEY = "oh-education-v1";

export type MiniTestRecord = {
  testCode: string;
  attempts: number;
  passed: boolean;
  lastPercentage: number;
};

export type FinalAttempt = {
  attemptNumber: number;
  correct: number;
  total: number;
  percentage: number;
  criticalPassed: boolean;
  result: "PASSED" | "RETRY_REQUIRED";
  topicsToReview: string[];
  completedAt: string;
};

export type EducationSession = {
  status: EducationStatus;
  currentLessonCode: LessonCode | null;
  completedLessons: LessonCode[];
  miniTests: MiniTestRecord[];
  /** BR-E-006: avvalgi natijalar tarixda saqlanadi */
  finalAttempts: FinalAttempt[];
  startedAt: string | null;
  completedAt: string | null;
};

const EMPTY: EducationSession = {
  status: "NOT_STARTED",
  currentLessonCode: null,
  completedLessons: [],
  miniTests: [],
  finalAttempts: [],
  startedAt: null,
  completedAt: null,
};

export function loadEducation(): EducationSession {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as EducationSession;
    if (!parsed || !Array.isArray(parsed.completedLessons)) return EMPTY;
    return { ...EMPTY, ...parsed };
  } catch {
    return EMPTY;
  }
}

export function saveEducation(session: EducationSession): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(session));
  } catch {
    /* eʼtiborsiz */
  }
}

export function startEducation(firstLesson: LessonCode): EducationSession {
  const existing = loadEducation();
  if (existing.status !== "NOT_STARTED") return existing;
  const session: EducationSession = {
    ...EMPTY,
    status: "IN_PROGRESS",
    currentLessonCode: firstLesson,
    startedAt: new Date().toISOString(),
  };
  saveEducation(session);
  return session;
}

/** BR-E-008: oldingi dars yakunlanmasdan keyingisiga oʻtib boʻlmaydi */
export function isLessonUnlocked(
  session: EducationSession,
  lessonIndex: number,
  lessons: Array<{ code: LessonCode; index: number }>,
): boolean {
  if (lessonIndex === 1) return true;
  const previous = lessons.find((l) => l.index === lessonIndex - 1);
  if (!previous) return false;
  return session.completedLessons.includes(previous.code);
}

export function markLessonComplete(
  session: EducationSession,
  code: LessonCode,
): EducationSession {
  const completedLessons = session.completedLessons.includes(code)
    ? session.completedLessons
    : [...session.completedLessons, code];
  const next: EducationSession = { ...session, completedLessons, status: "LESSON_COMPLETED" };
  saveEducation(next);
  return next;
}

export function recordMiniTest(
  session: EducationSession,
  testCode: string,
  passed: boolean,
  percentage: number,
): EducationSession {
  const existing = session.miniTests.find((t) => t.testCode === testCode);
  const record: MiniTestRecord = {
    testCode,
    attempts: (existing?.attempts ?? 0) + 1,
    passed: passed || Boolean(existing?.passed),
    lastPercentage: percentage,
  };
  const miniTests = [...session.miniTests.filter((t) => t.testCode !== testCode), record];
  const next: EducationSession = { ...session, miniTests };
  saveEducation(next);
  return next;
}

export function recordFinalAttempt(
  session: EducationSession,
  attempt: Omit<FinalAttempt, "attemptNumber" | "completedAt">,
): EducationSession {
  const full: FinalAttempt = {
    ...attempt,
    attemptNumber: session.finalAttempts.length + 1,
    completedAt: new Date().toISOString(),
  };
  const next: EducationSession = {
    ...session,
    finalAttempts: [...session.finalAttempts, full],
    status: attempt.result === "PASSED" ? "COMPLETED" : "RETRY_REQUIRED",
    completedAt: attempt.result === "PASSED" ? full.completedAt : null,
  };
  saveEducation(next);
  return next;
}

export function lastFinalAttempt(session: EducationSession): FinalAttempt | undefined {
  return session.finalAttempts[session.finalAttempts.length - 1];
}
