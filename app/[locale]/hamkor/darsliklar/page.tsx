import type { Metadata } from "next";
import { LOCALES } from "@/lib/i18n/config";
import LessonsGate from "@/components/onboarding/webapp/LessonsGate";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Video darsliklar — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LessonsGate />;
}
