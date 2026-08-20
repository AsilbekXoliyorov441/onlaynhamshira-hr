import type { Metadata } from "next";
import { LOCALES } from "@/lib/i18n/config";
import InfoScreen from "@/components/onboarding/webapp/InfoScreen";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Hamkorlik uchun talablar — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

const REQUIREMENTS = [
  "Tibbiy maʼlumot",
  "Diplom",
  "Ish tajribasi",
  "Smartfon",
  "Masʼuliyat",
  "Professional muomala",
];

export default function Page() {
  return (
    <InfoScreen
      stageIndex={4}
      title="Kimlar platformaga qoʻshilishi mumkin?"
      backHref="/hamkor/jarayon"
      nextHref="/hamkor/saralash"
      nextLabel="Saralashni boshlash"
    >
      {/* Kompyuterda bir soʻzli talablar keng qatorda boʻsh koʻrinadi —
          ikki ustunga joylanadi */}
      <ul className="mt-6 space-y-2.5 lg:grid lg:grid-cols-2 lg:gap-2.5 lg:space-y-0">
        {REQUIREMENTS.map((r) => (
          <li key={r} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4">
            <span
              aria-hidden
              className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-brand-500"
            >
              <svg viewBox="0 0 20 20" className="h-[13px] w-[13px]" fill="none">
                <path d="M4 10.5l4 4 8-8.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[15px] font-semibold text-ink">{r}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 rounded-2xl border border-line bg-surface-2 p-4">
        <p className="text-[14.5px] leading-relaxed text-body">
          Agar yuqoridagi talablarga javob bersangiz, keyingi bosqichga oʻtishingiz mumkin.
        </p>
      </div>
    </InfoScreen>
  );
}
