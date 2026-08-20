import type { Metadata } from "next";
import { LOCALES } from "@/lib/i18n/config";
import VideoResult from "@/components/onboarding/webapp/VideoResult";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Natija — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <VideoResult />;
}
