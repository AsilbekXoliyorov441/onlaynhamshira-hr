"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";

/* Boʻlim hozir ekranga yaqinmi? Standart qiymat `true` — shell'siz
   ishlatilgan komponentlar (masalan Hero) avvalgidek animatsiyalanadi. */
const ActiveContext = createContext(true);

/**
 * Bezak (dekorativ) cheksiz animatsiyalar uchun: boʻlim ekrandan uzoqda
 * boʻlsa `false` qaytaradi. Shunda `repeat: Infinity` li framer
 * animatsiyalari toʻxtaydi (CSS animatsiyalarini esa `.section-shell`
 * ustidagi `data-active` qoidasi pauzaga qoʻyadi) va asosiy oqim bekorga
 * band boʻlmaydi. Koʻrinish oʻzgarmaydi — foydalanuvchi koʻrayotgan
 * paytda animatsiya ishlaydi.
 */
export function useSectionActive(): boolean {
  return useContext(ActiveContext);
}


type Props = {
  children: ReactNode;
  /** Ekrandan tashqaridagi boʻlim rasterlanmasin (paint/layout tejaladi) */
  defer?: boolean;
  /** `content-visibility` uchun taxminiy balandlik */
  minHeight?: number;
};

export default function SectionShell({ children, defer = true, minHeight = 900 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  /* 320px zaxira — animatsiya foydalanuvchi boʻlimga yetib kelgunicha
     allaqachon ishlab turadi, "sakrash" sezilmaydi. */
  const active = useInView(ref, { margin: "320px 0px 320px 0px" });

  return (
    <div
      ref={ref}
      /* `data-active="false"` — boʻlim ekrandan uzoqda. CSS shunga qarab
         ichkaridagi cheksiz animatsiyalarni pauzaga qoʻyadi. */
      data-active={active ? "true" : "false"}
      className={defer ? "section-shell section-defer" : "section-shell"}
      style={defer ? { containIntrinsicSize: `auto ${minHeight}px` } : undefined}
    >
      <ActiveContext.Provider value={active}>{children}</ActiveContext.Provider>
    </div>
  );
}
