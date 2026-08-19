"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_LOCALE, LOCALE_META, STORAGE_KEY, isLocale, type Locale } from "./config";
import type { Dictionary } from "./types";
import { uz } from "./dictionaries/uz";
import { ru } from "./dictionaries/ru";
import { cy } from "./dictionaries/cy";

export type { Dictionary };

const DICTIONARIES: Record<Locale, Dictionary> = { uz, ru, cy };

type Ctx = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: Dictionary;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Avval tanlangan til (yoki brauzer tili) tiklanadi
  useEffect(() => {
    let next: Locale | null = null;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (isLocale(saved)) next = saved;
    } catch {
      /* localStorage mavjud boʻlmasligi mumkin */
    }
    if (!next) {
      const nav = window.navigator.language.toLowerCase();
      if (nav.startsWith("ru")) next = "ru";
      else if (nav.includes("cyrl")) next = "cy";
    }
    if (next && next !== DEFAULT_LOCALE) setLocaleState(next);
  }, []);

  // <html lang> atributi tanlangan tilga moslanadi
  useEffect(() => {
    document.documentElement.lang = LOCALE_META[locale].htmlLang;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* saqlab boʻlmasa ham til almashaveradi */
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({ locale, setLocale, t: DICTIONARIES[locale] }),
    [locale, setLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
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
