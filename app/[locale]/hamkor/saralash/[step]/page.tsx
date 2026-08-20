import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES } from "@/lib/i18n/config";
import { QUALIFICATION_QUESTIONS, questionBySlug } from "@/lib/onboarding/qualification";
import QuestionScreen from "@/components/onboarding/webapp/QuestionScreen";

/* Har til × har savol uchun statik sahifa */
export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    QUALIFICATION_QUESTIONS.map((q) => ({ locale, step: q.slug })),
  );
}

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Dastlabki saralash — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

export default function Page({ params }: { params: { step: string } }) {
  const question = questionBySlug(params.step);
  if (!question) notFound();
  return <QuestionScreen question={question} />;
}
