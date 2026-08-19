/** Saytda qoʻllab-quvvatlanadigan tillar */
export const LOCALES = ["uz", "ru", "cy"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "uz";

/** Til tanlagichda koʻrsatiladigan nomlar */
export const LOCALE_META: Record<
  Locale,
  { short: string; name: string; htmlLang: string }
> = {
  uz: { short: "UZ", name: "Oʻzbekcha", htmlLang: "uz-Latn" },
  ru: { short: "RU", name: "Русский", htmlLang: "ru" },
  cy: { short: "ЎЗ", name: "Ўзбекча", htmlLang: "uz-Cyrl" },
};

/** Tanlangan til localStorage'da shu kalit bilan saqlanadi */
export const STORAGE_KEY = "oh-locale";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}
