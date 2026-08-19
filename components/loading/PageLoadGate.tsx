"use client";

import { useEffect, useState, type ReactNode } from "react";
import OnlaynHamshiraLoader from "./OnlaynHamshiraLaoding";

/*
 * Yuklanish ekrani endi `window.load` ni ham, React hydration'ni ham kutmaydi.
 * Soʻnish `app/globals.css` dagi `.oh-gate` animatsiyasi bilan, scroll qulfi
 * esa `app/layout.tsx` dagi inline skript bilan boshqariladi — ikkalasi ham
 * HTML kelishi bilanoq ishlaydi. Bu komponent faqat soʻngan qatlamni
 * DOM'dan olib tashlaydi.
 */
const GATE_MS = 1100;
const REMOVE_MS = 1300;

export default function PageLoadGate({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);
  /* Hydration kech tugagan boʻlsa qatlam allaqachon soʻngan — progress
     simulyatsiyasini ishga tushirib, asosiy oqimni bandlashning maʼnosi yoʻq */
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(performance.now() < GATE_MS);
    const t = window.setTimeout(() => setVisible(false), REMOVE_MS);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      {visible && (
        <div className="oh-gate">
          <OnlaynHamshiraLoader fullscreen progress={animate ? undefined : 100} />
        </div>
      )}
      {children}
    </>
  );
}
