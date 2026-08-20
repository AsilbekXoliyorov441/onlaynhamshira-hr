import type { Metadata } from "next";
import { LOCALES } from "@/lib/i18n/config";
import VideoInstructions from "@/components/onboarding/webapp/VideoInstructions";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Video koʻrsatmalari — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <VideoInstructions />;
}
