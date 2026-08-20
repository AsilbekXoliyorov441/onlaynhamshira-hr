import type { Metadata } from "next";
import { LOCALES } from "@/lib/i18n/config";
import EducationGate from "@/components/onboarding/webapp/EducationGate";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Education — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

/* Vaqtinchalik: Education + Mini Test bosqichi TZ kelgach quriladi.
   Kirish huquqi BR-Q-005 boʻyicha tekshiriladi. */
export default function Page() {
  return <EducationGate />;
}
