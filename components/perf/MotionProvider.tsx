"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Butun `motion` obyekti oʻrniga uning yengil `m` versiyasi ishlatiladi —
 * kerakli imkoniyatlar (animatsiya, variantlar, gesture, whileInView)
 * shu yerda bir marta ulanadi. Natijada framer-motion bundle'i sezilarli
 * kichrayadi va JS parse/eval vaqti qisqaradi.
 *
 * `strict` — kodda tasodifan `m.*` qolib ketsa, darhol bilinadi.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
