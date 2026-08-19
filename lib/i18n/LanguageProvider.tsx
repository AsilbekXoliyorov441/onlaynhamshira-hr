"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./config";
import type { Dictionary } from "./types";

export type { Dictionary };

/*
 * Tanlangan til endi URL orqali aniqlanadi (`/`, `/ru`, `/cy`), lugʻat esa
 * server tomonda tanlanib, shu provider'ga tayyor holda beriladi.
 *
 * Shu sabab brauzerga:
 *   — uchala tilning matni emas, faqat bittasi keladi;
 *   — tilni aniqlash/localStorage mantiqi umuman yuborilmaydi;
 *   — birinchi render'da til "sakramaydi" (avval uz chizilib, keyin ru'ga
 *     almashish holati yoʻqoldi).
 */
type Ctx = {
  locale: Locale;
  t: Dictionary;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}) {
  /* Qiymat server render'idan keladi va sahifa umri davomida oʻzgarmaydi,
     shuning uchun memo shart emas. */
  return (
    <LanguageContext.Provider value={{ locale, t: dictionary }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage faqat <LanguageProvider> ichida ishlaydi");
  return ctx;
}

/** Qisqa yordamchi: faqat lugʻat kerak boʻlganda */
export function useT() {
  return useLanguage().t;
}
