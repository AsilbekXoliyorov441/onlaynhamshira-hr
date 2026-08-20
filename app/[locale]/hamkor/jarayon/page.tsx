import type { Metadata } from "next";
import { LOCALES } from "@/lib/i18n/config";
import InfoScreen from "@/components/onboarding/webapp/InfoScreen";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Hamkorlik qanday ishlaydi? — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

const FLOW = [
  "Siz roʻyxatdan oʻtasiz",
  "Ariza yuborasiz",
  "Admin tekshiradi",
  "Tasdiqlanasiz",
  "Buyurtmalarni qabul qilasiz",
  "Mijozga xizmat koʻrsatasiz",
  "Daromad topasiz",
];

export default function Page() {
  return (
    <InfoScreen
      stageIndex={3}
      title="Hamkorlik qanday ishlaydi?"
      backHref="/hamkor/platforma"
      nextHref="/hamkor/talablar"
    >
      <ol className="mt-7 space-y-0">
        {FLOW.map((step, i) => (
          <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
            {i < FLOW.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[17px] top-[38px] h-[calc(100%-38px)] w-[2px] bg-[linear-gradient(180deg,#4FD189,rgba(79,209,137,0.25))]"
              />
            )}
            <span className="relative z-[1] grid h-[36px] w-[36px] shrink-0 place-items-center rounded-full bg-brand-500 font-display text-[15px] font-bold text-white">
              {i + 1}
            </span>
            <span className="pt-[7px] text-[15.5px] font-semibold leading-snug text-ink">{step}</span>
          </li>
        ))}
      </ol>
    </InfoScreen>
  );
}
