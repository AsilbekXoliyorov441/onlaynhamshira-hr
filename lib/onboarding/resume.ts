"use client";

import { LESSONS, lessonByCode } from "./education";
import { loadEducation } from "./education-session";
import { QUALIFICATION_QUESTIONS, questionByCode } from "./qualification";
import { loadSession } from "./session";
import { loadVideo } from "./video-store";

/*
 * "Toʻxtagan joyingizdan davom eting".
 *
 * Har bir bosqich oʻz holatini brauzer xotirasiga yozib boradi. Bu yerda
 * uchala yozuv birga oʻqiladi va foydalanuvchi qaysi ekrandan davom
 * etishi kerakligi aniqlanadi. Eng oxirgi bosqichdan boshlab qaraladi:
 * video -> oʻquv -> saralash.
 *
 * Foydalanuvchi jarayonni yopib ketsa ham hech narsa yoʻqolmaydi:
 * javoblar tanlangan zahoti saqlanadi, bu funksiya esa uni oʻsha
 * joyiga qaytaradi.
 */
export type ResumePoint = {
  /** qaysi manzilga qaytariladi */
  href: string;
  /** "Video xabar" kabi bosqich nomi — tugma ostida koʻrsatiladi */
  stage: string;
  /** "4-savol" yoki "3-dars" kabi aniq joy; boʻlishi shart emas */
  detail?: string;
};

export function resumePoint(): ResumePoint | null {
  /* ── Video bosqichi ── */
  const video = loadVideo();
  if (video.status !== "NOT_STARTED") {
    if (video.status === "UPLOADED" || video.status === "UPLOAD_FAILED") {
      return { href: "/hamkor/video/natija", stage: "Video xabar", detail: "natija" };
    }
    if (video.status === "PREVIEW" || video.status === "SELECTED") {
      return { href: "/hamkor/video/tekshirish", stage: "Video xabar", detail: "videoni tekshirish" };
    }
    return { href: "/hamkor/video", stage: "Video xabar" };
  }

  /* ── Oʻquv bosqichi ── */
  const education = loadEducation();
  if (education.status === "COMPLETED") {
    return { href: "/hamkor/video", stage: "Video xabar" };
  }
  if (education.status !== "NOT_STARTED") {
    const current = education.currentLessonCode ? lessonByCode(education.currentLessonCode) : undefined;
    const lesson = current ?? LESSONS.find((l) => !education.completedLessons.includes(l.code));
    if (lesson) {
      return {
        href: `/hamkor/oquv/${lesson.slug}`,
        stage: "Oʻquv materiallari",
        detail: `${LESSONS.indexOf(lesson) + 1}-dars`,
      };
    }
    return { href: "/hamkor/oquv/yakuniy-test", stage: "Oʻquv materiallari", detail: "yakuniy test" };
  }

  /* ── Saralash bosqichi ── */
  const qualification = loadSession();
  if (qualification.status === "QUALIFIED") {
    return { href: "/hamkor/oquv", stage: "Oʻquv materiallari" };
  }
  if (qualification.status === "NOT_QUALIFIED") {
    return { href: "/hamkor/saralash/natija", stage: "Saralash", detail: "natija" };
  }
  if (qualification.status === "IN_PROGRESS") {
    const question = qualification.currentQuestionCode
      ? questionByCode(qualification.currentQuestionCode)
      : undefined;
    const target = question ?? QUALIFICATION_QUESTIONS[0];
    return {
      href: `/hamkor/saralash/${target.slug}`,
      stage: "Saralash",
      detail: `${target.index}-savol`,
    };
  }

  return null;
}
