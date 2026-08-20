import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES } from "@/lib/i18n/config";
import { LESSONS, lessonBySlug } from "@/lib/onboarding/education";
import LessonScreen from "@/components/onboarding/webapp/LessonScreen";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => LESSONS.map((l) => ({ locale, lesson: l.slug })));
}

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Education — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

export default function Page({ params }: { params: { lesson: string } }) {
  const lesson = lessonBySlug(params.lesson);
  if (!lesson) notFound();
  return <LessonScreen lesson={lesson} />;
}
