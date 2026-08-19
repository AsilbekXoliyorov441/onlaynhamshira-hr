"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "../LanguageProvider";
import { ru } from "../dictionaries/ru";

/*
 * Har til uchun alohida client komponent.
 *
 * Nega shunday: server sahifa faqat kerakli provider'ni chizadi, shu bois
 * brauzerga faqat oʻsha tilning lugʻati boʻlgan chunk yuklanadi — qolgan
 * ikkitasi umuman soʻralmaydi. Ayni paytda lugʻat RSC javobiga
 * serializatsiya qilinmaydi (u HTML'ni ortiqcha shishirardi).
 */
export default function RUProvider({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider locale="ru" dictionary={ru}>
      {children}
    </LanguageProvider>
  );
}
