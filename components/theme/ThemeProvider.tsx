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

export type Theme = "light" | "dark";

/** localStorage kaliti — `app/layout.tsx` dagi FOUC-oldi skripti bilan bir xil */
export const THEME_STORAGE_KEY = "theme";

/** Talab boʻyicha standart holat — yorugʻ rejim */
export const DEFAULT_THEME: Theme = "light";

type ThemeContextValue = {
  theme: Theme;
  /** `false` — hali localStorage oʻqilmagan (birinchi render) */
  ready: boolean;
  setTheme: (next: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyToDocument(next: Theme) {
  document.documentElement.classList.toggle("dark", next === "dark");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [ready, setReady] = useState(false);

  /* Birinchi renderda server bilan bir xil qiymat ishlatiladi, saqlangan
     tanlov esa hidratsiyadan keyin oʻqiladi — shu bois nomuvofiqlik chiqmaydi.
     Sahifa koʻrinishi bundan jabr koʻrmaydi: `<head>` dagi skript `dark`
     sinfini birinchi chizishdan oldin qoʻyib ulguradi. */
  useEffect(() => {
    let saved: Theme | null = null;
    try {
      const value = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (value === "light" || value === "dark") saved = value;
    } catch {
      /* localStorage yopiq boʻlishi mumkin (private rejim) — eʼtiborsiz qoldiramiz */
    }

    const initial = saved ?? DEFAULT_THEME;
    setThemeState(initial);
    applyToDocument(initial);
    setReady(true);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyToDocument(next);

    /* Ranglar silliq almashsin — lekin faqat shu qisqa lahzada.
       `prefers-reduced-motion` yoqilgan boʻlsa CSS buni bekor qiladi. */
    const root = document.documentElement;
    root.classList.add("theme-switching");
    window.setTimeout(() => root.classList.remove("theme-switching"), 260);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* saqlab boʻlmasa ham rejim joriy sessiyada ishlayveradi */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, ready, setTheme, toggleTheme }),
    [theme, ready, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme faqat <ThemeProvider> ichida ishlatiladi");
  }
  return ctx;
}
