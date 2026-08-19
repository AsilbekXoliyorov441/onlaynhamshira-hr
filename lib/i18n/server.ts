/*
 * Lugʻatlarni SERVER tomonda tanlaydi.
 *
 * Bu fayl faqat server komponentlaridan chaqiriladi — shu sabab uchala til
 * matni ham brauzerga yuborilmaydi. Foydalanuvchi faqat oʻzi ochgan tilning
 * matnini oladi (u ham RSC javobi ichida, alohida JS chunk sifatida emas).
 */
import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";
import type { Dictionary } from "./types";
import { uz } from "./dictionaries/uz";
import { ru } from "./dictionaries/ru";
import { cy } from "./dictionaries/cy";

const DICTIONARIES: Record<Locale, Dictionary> = { uz, ru, cy };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

/** `/` -> uz, `/ru` -> ru, `/cy` -> cy. Notoʻgʻri boʻlsa `null`. */
export function localeFromSegments(segments: string[] | undefined): Locale | null {
  if (!segments || segments.length === 0) return DEFAULT_LOCALE;
  if (segments.length > 1) return null;
  const [first] = segments;
  /* Standart til faqat "/" da yashaydi — "/uz" nusxa sahifa yaratmasin */
  if (first === DEFAULT_LOCALE) return null;
  return isLocale(first) ? first : null;
}

/** Til uchun sahifa manzili */
export function localePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
}
