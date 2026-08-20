import type { Metadata } from "next";
import { LOCALES } from "@/lib/i18n/config";
import VideoCapture from "@/components/onboarding/webapp/VideoCapture";

/*
 * Eski manzil: ilgari bu yerda "usul tanlash" ekrani turardi. Maket
 * boʻyicha yozish va yuklash bitta ekranda birlashtirildi, shu bois
 * bu manzil ham oʻsha ekranni koʻrsatadi — saqlangan havolalar va
 * "orqaga" tugmasi buzilmasin.
 */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Video yozish yoki yuklash — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <VideoCapture />;
}
