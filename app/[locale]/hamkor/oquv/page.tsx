import type { Metadata } from "next";
import Link from "next/link";
import { LOCALES } from "@/lib/i18n/config";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Education — Onlayn Hamshira",
  robots: { index: false, follow: false },
};

/* Vaqtinchalik: Education + Mini Test bosqichi TZ kelgach quriladi.
   Qualification oqimi shu yerda uzilib qolmasligi uchun turibdi. */
export default function Page() {
  return (
    <div className="grid min-h-screen place-items-center bg-page px-5">
      <div className="max-w-[420px] text-center">
        <span aria-hidden className="text-[40px]">📚</span>
        <h1 className="mt-3 font-display text-[24px] font-extrabold text-ink">
          Education bosqichi tayyorlanmoqda
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-body">
          Dastlabki saralashdan oʻtdingiz. Oʻquv materiallari va mini-test bosqichi
          yaqin kunlarda ochiladi.
        </p>
        <Link
          href="/"
          className="btn-primary mt-7 grid h-[52px] place-items-center rounded-pill font-display text-[16px] font-bold text-onbrand"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}
