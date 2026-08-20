import type { Metadata } from "next";
import { LOCALES } from "@/lib/i18n/config";
import VideoConsent from "@/components/onboarding/webapp/VideoConsent";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Rozilik — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <VideoConsent />;
}
