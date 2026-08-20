"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
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

/**
 * Sensorli qurilmami (telefon/planshet)? CSS'dagi
 * `@media (hover: none) and (pointer: coarse)` bilan bir xil shart —
 * shu bois CSS va JS bir xil qurilmalarni "yengil rejim"ga oʻtkazadi.
 *
 * SSR paytida `false`: server qurilmani bilmaydi, birinchi render esa
 * client bilan mos kelishi shart. Effekt hydration'dan keyin darhol
 * toʻgʻrilaydi.
 */
function useTouchDevice(): boolean {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    setTouch(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setTouch(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return touch;
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
  const touch = useTouchDevice();
  /* 320px zaxira — animatsiya foydalanuvchi boʻlimga yetib kelgunicha
     allaqachon ishlab turadi, "sakrash" sezilmaydi. */
  const inView = useInView(ref, { margin: "320px 0px 320px 0px" });
  /* Sensorli qurilmada framer'ning cheksiz bezak animatsiyalari umuman
     ishga tushmaydi — CSS ularga yeta olmaydi, chunki framer inline
     `style` yozadi. CSS animatsiyalarini `globals.css` dagi media
     soʻrovi oʻchiradi. */
  const active = inView && !touch;

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
