"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Butun `motion` obyekti oʻrniga uning yengil `m` versiyasi ishlatiladi —
 * kerakli imkoniyatlar (animatsiya, variantlar, gesture, whileInView)
 * shu yerda bir marta ulanadi. Natijada framer-motion bundle'i sezilarli
 * kichrayadi va JS parse/eval vaqti qisqaradi.
 *
 * `strict` — kodda tasodifan `motion.*` qolib ketsa, darhol bilinadi.
 *
 * Eslatma: bu yerda `<MotionConfig reducedMotion>` bilan sensorli
 * qurilmada kirish animatsiyalarini oʻchirish sinab koʻrildi va
 * qaytarildi. Ikki sabab: (a) oʻlchov boʻyicha foyda bermadi —
 * y=5200 da raster 2 819 -> 2 812 ms; (b) provider ichidagi holat
 * yangilanishi hydration'dan keyin barcha motion komponentlarini qayta
 * render qildirib, Lighthouse ballini 73 dan 68 ga tushirdi.
 * Sensorli qurilmadagi yengillashtirish CSS orqali qilinadi
 * (`globals.css` dagi `@media (hover: none) and (pointer: coarse)`).
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
