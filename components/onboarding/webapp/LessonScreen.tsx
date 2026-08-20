"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Shell from "./Shell";
import LessonBlocks from "./LessonBlocks";
import { Choice, Nav } from "./ui";
import { LESSONS, LESSON_TOTAL } from "@/lib/onboarding/education";
import { miniTestForLesson } from "@/lib/onboarding/education-tests";
import { completeLesson } from "@/lib/onboarding/education-api";
import {
  isLessonUnlocked,
  loadEducation,
  saveEducation,
  type EducationSession,
} from "@/lib/onboarding/education-session";
import type { Lesson } from "@/lib/onboarding/types";

const STEP_LABELS = LESSONS.map((l) => l.shortTitle);

/*
 * Dars ekrani (E-01…E-05).
 *
 * TZ navigatsiya qoidasi: "Ekran oxirigacha scroll qilingandan keyin
 * 'Keyingi' tugmasi faollashadi". Ekranda bundan tashqari tasdiq
 * belgisi ham bor, shu bois IKKALASI ham talab qilinadi — matn oxiriga
 * yetib borilgan va belgi qoʻyilgan boʻlishi kerak.
 */
export default function LessonScreen({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const [session, setSession] = useState<EducationSession | null>(null);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loaded = loadEducation();
    if (loaded.status === "NOT_STARTED") {
      router.replace("/hamkor/oquv");
      return;
    }
    /* BR-E-008: oldingi dars yakunlanmagan boʻlsa, oʻsha darsga qaytaramiz */
    if (!isLessonUnlocked(loaded, lesson.index, LESSONS)) {
      const previous = LESSONS[lesson.index - 2];
      router.replace(previous ? `/hamkor/oquv/${previous.slug}` : "/hamkor/oquv");
      return;
    }
    setSession(loaded);
    setConfirmed(loaded.completedLessons.includes(lesson.code));
    saveEducation({ ...loaded, currentLessonCode: lesson.code });
  }, [lesson, router]);

  /* Matn oxiriga yetib borilganini kuzatamiz */
  useEffect(() => {
    const el = endRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReachedEnd(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [session]);

  const onNext = async () => {
    if (!session || busy) return;
    setBusy(true);
    const updated = await completeLesson(session, lesson.code);
    setSession(updated);
    /* Oxirgi darsdan keyin mini test yoʻq — toʻgʻridan-toʻgʻri yakuniy
       testga oʻtiladi (TZ oqimi: 5-dars -> Yakuniy Mini Test) */
    const test = miniTestForLesson(lesson.code);
    router.push(test ? `/hamkor/oquv/${lesson.slug}/test` : "/hamkor/oquv/yakuniy-test");
  };

  const previous = LESSONS[lesson.index - 2];
  const backHref = previous ? `/hamkor/oquv/${previous.slug}` : "/hamkor/oquv";

  if (!session) {
    return (
      <div className="onboarding-bg grid min-h-screen place-items-center">
        <p className="text-[14px] text-mute">Yuklanmoqda…</p>
      </div>
    );
  }

  const ready = reachedEnd && confirmed;

  return (
    <Shell
      stage="Education va Mini Test"
      current={lesson.index}
      total={LESSON_TOTAL}
      steps={STEP_LABELS}
      unit="dars"
    >
      <p className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-brand-700">
        {lesson.index}-dars
      </p>
      <h1 className="mt-2 font-display text-[24px] font-extrabold leading-snug text-ink sm:text-[27px] lg:text-[31px]">
        {lesson.title}
      </h1>

      <LessonBlocks blocks={lesson.blocks} />

      {/* Matn oxirini belgilovchi nuqta — shu koʻringach dars oʻqilgan
          deb hisoblanadi */}
      <div ref={endRef} aria-hidden className="h-px w-full" />

      <div className="mt-7">
        <Choice
          label={lesson.confirmLabel}
          multi
          selected={confirmed}
          onSelect={() => setConfirmed((v) => !v)}
        />
      </div>

      <Nav
        backHref={backHref}
        onNext={onNext}
        nextLabel={lesson.nextLabel}
        nextDisabled={!ready || busy}
        disabledHint={
          !reachedEnd
            ? "Davom etish uchun darsni oxirigacha oʻqing"
            : "Davom etish uchun tasdiq belgisini qoʻying"
        }
      />
    </Shell>
  );
}
