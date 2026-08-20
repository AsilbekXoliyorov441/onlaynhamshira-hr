import type { Metadata } from "next";
import { LOCALES } from "@/lib/i18n/config";
import VideoPreview from "@/components/onboarding/webapp/VideoPreview";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Videoni tekshirish — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <VideoPreview />;
}
