import type { Metadata } from "next";
import { LOCALES } from "@/lib/i18n/config";
import EducationResult from "@/components/onboarding/webapp/EducationResult";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Natija — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <EducationResult />;
}
