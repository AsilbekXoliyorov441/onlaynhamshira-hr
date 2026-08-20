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

/**
 * Marshrut segmentidan tilni oladi.
 *
 * Ichkarida barcha sahifalar til prefiksi bilan yashaydi (`/uz`, `/ru`,
 * `/cy`) — shunda `app/[locale]/hamkor/...` kabi ichki sahifalar qoʻshsa
 * boʻladi. Foydalanuvchi koʻradigan manzilda esa oʻzbekcha prefiksiz
 * qoladi: `middleware.ts` `/` ni ichkarida `/uz` ga oʻgiradi.
 */
export function localeFromParam(locale: string | undefined): Locale | null {
  return isLocale(locale) ? locale : null;
}

/** Til uchun sahifa manzili */
export function localePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
}
