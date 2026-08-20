import type { Metadata } from "next";
import { LOCALES } from "@/lib/i18n/config";
import InfoScreen from "@/components/onboarding/webapp/InfoScreen";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Onlayn Hamshira nima? — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

const BENEFITS = [
  "boʻsh vaqtingizda ishlashingiz;",
  "qoʻshimcha daromad olishingiz;",
  "yangi mijozlarga ega boʻlishingiz;",
  "zamonaviy formatda ishlashingiz mumkin.",
];

const CARDS = [
  { icon: "🏠", label: "Uyga xizmat" },
  { icon: "📱", label: "Mobil ilova" },
  { icon: "💰", label: "Qoʻshimcha daromad" },
  { icon: "⭐", label: "Professional reyting" },
];

export default function Page() {
  return (
    <InfoScreen
      stageIndex={2}
      title="Biz tibbiy xizmatlarni bemorlar uyigacha olib boramiz"
      lead="Onlayn Hamshira platformasi bemorlar va professional tibbiyot mutaxassislarini birlashtiradi."
      backHref="/hamkor"
      nextHref="/hamkor/jarayon"
    >
      <p className="mt-5 text-[15px] font-semibold text-ink">Platforma orqali siz:</p>
      <ul className="mt-3 space-y-2.5">
        {BENEFITS.map((b) => (
          <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-body">
            <span aria-hidden className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-brand-500" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-7 grid grid-cols-2 gap-3">
        {CARDS.map((c) => (
          <div key={c.label} className="glass-card rounded-2xl p-4 text-center">
            <span aria-hidden className="text-[26px]">{c.icon}</span>
            <p className="mt-2 text-[13.5px] font-semibold leading-snug text-ink">{c.label}</p>
          </div>
        ))}
      </div>
    </InfoScreen>
  );
}
