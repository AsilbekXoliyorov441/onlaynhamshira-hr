import type { Metadata } from "next";
import { LOCALES } from "@/lib/i18n/config";
import VideoGate from "@/components/onboarding/webapp/VideoGate";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Video xabar — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <VideoGate />;
}
