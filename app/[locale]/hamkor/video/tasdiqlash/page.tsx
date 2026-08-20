import type { Metadata } from "next";
import { LOCALES } from "@/lib/i18n/config";
import VideoSubmit from "@/components/onboarding/webapp/VideoSubmit";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Videoni yuborish — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <VideoSubmit />;
}
