import type { Metadata } from "next";
import { Suspense } from "react";
import { LOCALES } from "@/lib/i18n/config";
import Result from "@/components/onboarding/webapp/Result";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Dastlabki saralash — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense>
      <Result />
    </Suspense>
  );
}
