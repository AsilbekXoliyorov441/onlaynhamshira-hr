import type { Metadata } from "next";
import { LOCALES } from "@/lib/i18n/config";
import VideoMethod from "@/components/onboarding/webapp/VideoMethod";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Video yuborish — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <VideoMethod />;
}
