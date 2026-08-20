"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LogoMark } from "./Icons";
import { useT } from "@/lib/i18n/LanguageProvider";
import LanguageSwitcher from "@/lib/i18n/LanguageSwitcher";
import ThemeToggle from "./theme/ThemeToggle";


function HeaderBar({ sticky = false }: { sticky?: boolean }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const menuId = `${useId()}-mobil-menyu`;

  /* Mobil menyu ochiq boʻlsa Escape uni yopadi */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <nav
        aria-label={sticky ? t.nav.stickyMenu : t.nav.mainMenu}
        className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between gap-3 px-5 sm:px-8"
      >
        {/* Logotip */}
        <a
          href="#asosiy"
          aria-label={t.nav.logoLabel}
          className="flex shrink-0 items-center text-[color:var(--logo-word)] transition-transform duration-300 hover:scale-105"
        >
          <LogoMark aria-hidden gradientId="lm-nav" className="h-[42px] w-auto" />
        </a>

        {/* Markaziy menyu */}
        {/* Markaziy menyu — oddiy flex bolasi: absolute boʻlsa oʻng tomondagi
            tugmalar ustiga chiqib ketardi */}
        <ul className="mx-auto hidden items-center gap-5 nav:flex xl:gap-7">
          {t.nav.links.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="relative text-[15px] font-medium text-[color:var(--nav-fg)] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-brand-500 after:transition-all after:duration-300 hover:text-ink hover:after:w-full"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Oʻng tomon — mavzu almashtirgich barcha ekranlarda koʻrinadi */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <ThemeToggle />
          <LanguageSwitcher />

          <a
            href="/hamkor"
            className="btn-primary hidden rounded-pill px-6 py-[11px] font-display text-[15px] font-bold text-onbrand transition-all duration-300 hover:scale-105 nav:block"
          >
            {t.nav.cta}
          </a>

          {/* Mobil tugma */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-xl border border-line bg-surface/85 nav:hidden"
          >
            <span
              aria-hidden
              className={`h-[2px] w-4 rounded bg-ink transition-transform ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden
              className={`h-[2px] w-4 rounded bg-ink transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              aria-hidden
              className={`h-[2px] w-4 rounded bg-ink transition-transform ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobil menyu */}
      {open && (
        <div
          id={menuId}
          className="mx-5 mb-2 rounded-card border border-line bg-surface/95 p-4 shadow-card backdrop-blur nav:hidden"
        >
          <ul className="flex flex-col">
            {t.nav.links.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3 text-[15px] font-medium text-[color:var(--nav-fg)] last:border-0"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/hamkor"
            onClick={() => setOpen(false)}
            className="btn-primary mt-4 block rounded-pill py-2.5 text-center font-display text-[15px] font-bold text-onbrand"
          >
            {t.nav.cta}
          </a>
        </div>
      )}
    </>
  );
}

export default function Navbar() {
  const [showFixed, setShowFixed] = useState(false);
  /* Progress chizigʻi React state'i orqali emas, toʻgʻridan-toʻgʻri DOM'ga
     yoziladi — aks holda har bir scroll kadrida butun Navbar qayta
     render boʻlar edi. */
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* `scrollHeight` oʻqilishi layout'ni majburan qayta hisoblaydi
       ("forced reflow"). Shu bois u faqat oʻlcham oʻzgarganda oʻlchanadi,
       har scroll'da emas. */
    let docHeight = 0;
    const measure = () => {
      docHeight = document.documentElement.scrollHeight - window.innerHeight;
    };

    let ticking = false;
    const apply = () => {
      ticking = false;
      const y = window.scrollY;
      setShowFixed((prev) => (prev === y > 80 ? prev : y > 80));
      const bar = barRef.current;
      if (bar) {
        const pct = docHeight > 0 ? Math.min(100, (y / docHeight) * 100) : 0;
        bar.style.width = `${pct}%`;
      }
    };
    /* Scroll hodisasi kadrga bir marta qayta ishlanadi */
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(apply);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    /* Boʻlimlar kech yuklanganda sahifa balandligi oʻzgaradi — qayta oʻlchaymiz */
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      {/* Sahifa qancha scroll qilinganini koʻrsatuvchi chiziq — sof bezak */}
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
      >
        <div
          ref={barRef}
          className="h-full w-0 bg-[linear-gradient(90deg,#4FD189,#1BA463)] transition-[width] duration-150 ease-out"
        />
      </div>

      {/* Asosiy header — sahifa boshida oddiy oqimda */}
      <header className="relative z-40">
        <HeaderBar />
      </header>

      {/* Scroll qilinganda sekin animatsiya bilan chiqadigan fixed header.
          Yashiringan holatda `invisible` — shunda uning havolalari Tab
          tartibidan ham chiqib ketadi (aria-hidden yolgʻiz kifoya emas). */}
      <header
        aria-hidden={!showFixed}
        className={`fixed inset-x-0 top-0 z-50 bg-[color:var(--header-bg)] shadow-nav backdrop-blur-[8px] transition-all duration-500 ease-out ${
          showFixed
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <HeaderBar sticky />
      </header>
    </>
  );
}
