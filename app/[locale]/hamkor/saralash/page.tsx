import type { Metadata } from "next";
import { LOCALES } from "@/lib/i18n/config";
import QualificationIntro from "@/components/onboarding/webapp/QualificationIntro";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/* Ariza jarayoni qidiruvda indekslanmasin */
export const metadata: Metadata = {
  title: "Dastlabki saralash — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <QualificationIntro />;
}
