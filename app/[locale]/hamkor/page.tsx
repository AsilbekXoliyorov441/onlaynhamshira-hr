import type { Metadata } from "next";
import { LOCALES } from "@/lib/i18n/config";
import InfoScreen from "@/components/onboarding/webapp/InfoScreen";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Hamkor boʻlish — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

const STEPS = [
  "platforma haqida qisqacha maʼlumot olasiz;",
  "hamkorlik shartlari bilan tanishasiz;",
  "dastlabki saralashdan oʻtasiz;",
  "qisqa oʻquv materiallarini koʻrasiz;",
  "oʻzingiz haqingizda video yuborasiz;",
  "soʻng mutaxassis ilovasida roʻyxatdan oʻtasiz.",
];

export default function Page() {
  return (
    <InfoScreen
      stageIndex={1}
      title="Onlayn Hamshiraga xush kelibsiz!"
      lead="Siz hozir Onlayn Hamshira platformasida mutaxassis sifatida hamkorlikni boshlash jarayonidasiz."
      backHref="/"
      nextHref="/hamkor/platforma"
      nextLabel="Boshlash"
    >
      <p className="mt-5 text-[15px] font-semibold text-ink">Keyingi bosqichlarda siz:</p>
      <ul className="mt-3 space-y-2.5">
        {STEPS.map((step) => (
          <li key={step} className="flex gap-3 text-[15px] leading-relaxed text-body">
            <span aria-hidden className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-brand-500" />
            {step}
          </li>
        ))}
      </ul>

      <div className="glass-card mt-6 flex items-center gap-3 rounded-2xl p-4">
        <span aria-hidden className="text-[20px]">⏱️</span>
        <p className="text-[14.5px] font-semibold text-ink">
          Jarayon taxminan 15–20 daqiqa vaqt oladi
        </p>
      </div>
    </InfoScreen>
  );
}
