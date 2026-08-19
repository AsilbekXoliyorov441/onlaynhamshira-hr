"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "../LanguageProvider";
import { uz } from "../dictionaries/uz";

/*
 * Har til uchun alohida client komponent.
 *
 * Nega shunday: server sahifa faqat kerakli provider'ni chizadi, shu bois
 * brauzerga faqat oʻsha tilning lugʻati boʻlgan chunk yuklanadi — qolgan
 * ikkitasi umuman soʻralmaydi. Ayni paytda lugʻat RSC javobiga
 * serializatsiya qilinmaydi (u HTML'ni ortiqcha shishirardi).
 */
export default function UZProvider({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider locale="uz" dictionary={uz}>
      {children}
    </LanguageProvider>
  );
}
