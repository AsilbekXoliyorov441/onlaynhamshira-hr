import type { Metadata } from "next";
import { LOCALES } from "@/lib/i18n/config";
import FinalTestScreen from "@/components/onboarding/webapp/FinalTestScreen";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Yakuniy test — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <FinalTestScreen />;
}
