import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES } from "@/lib/i18n/config";
import { LESSONS, lessonBySlug } from "@/lib/onboarding/education";
import { miniTestForLesson } from "@/lib/onboarding/education-tests";
import MiniTestScreen from "@/components/onboarding/webapp/MiniTestScreen";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    LESSONS.filter((l) => miniTestForLesson(l.code)).map((l) => ({ locale, lesson: l.slug })),
  );
}

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Mini test — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

export default function Page({ params }: { params: { lesson: string } }) {
  const lesson = lessonBySlug(params.lesson);
  const test = lesson ? miniTestForLesson(lesson.code) : undefined;
  if (!test) notFound();
  return <MiniTestScreen test={test} />;
}
