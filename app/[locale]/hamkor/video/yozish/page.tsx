import type { Metadata } from "next";
import { LOCALES } from "@/lib/i18n/config";
import VideoRecorder from "@/components/onboarding/webapp/VideoRecorder";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Video yozish — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <VideoRecorder />;
}
