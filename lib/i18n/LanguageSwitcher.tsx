"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { DEFAULT_LOCALE, LOCALES, LOCALE_META } from "./config";
import { useLanguage } from "./LanguageProvider";

/**
 * Til tanlagich.
 * `tone="dark"` — toʻq fonda (footer) ishlatiladigan variant.
 */
export default function LanguageSwitcher({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const { locale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Tashqariga bosilganda yoki Esc bosilganda yopiladi
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const dark = tone === "dark";

  return (
    <div ref={boxRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.common.language}
        className={`inline-flex h-11 shrink-0 items-center gap-1.5 rounded-pill px-3.5 font-display text-[13.5px] font-bold shadow-nav backdrop-blur transition-all duration-300 ${
          dark
            ? "border border-white/15 bg-white/[0.07] text-[#EAF6F0] hover:border-white/30 hover:bg-white/[0.12]"
            : "border border-line bg-surface/80 text-ink hover:border-brand-400"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-[15px] w-[15px]" aria-hidden>
          <circle cx="12" cy="12" r="8.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3.4 12h17.2" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 3.4c2.2 2.3 3.3 5.2 3.3 8.6S14.2 18.3 12 20.6c-2.2-2.3-3.3-5.2-3.3-8.6S9.8 5.7 12 3.4Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
        {LOCALE_META[locale].short}
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path
            d="m4 6.2 4 3.9 4-3.9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <m.ul
            role="listbox"
            aria-label={t.common.language}
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 0.9, 0.3, 1] }}
            className={`absolute right-0 top-[calc(100%+8px)] z-50 min-w-[168px] overflow-hidden rounded-[16px] p-1.5 shadow-[0_20px_40px_-18px_rgba(11,43,28,0.35)] ${
              dark
                ? "border border-white/15 bg-[#0C4030] backdrop-blur-md"
                : "border border-line bg-surface/95 backdrop-blur-md"
            }`}
          >
            {LOCALES.map((code) => {
              const active = code === locale;
              return (
                <li key={code}>
                  {/* Til endi alohida manzilda yashaydi (`/`, `/ru`, `/cy`) —
                      shu bois oddiy havola. `prefetch` tufayli oʻtish
                      deyarli bir zumda, `scroll={false}` esa sahifani
                      tepaga otib yubormaydi. */}
                  <Link
                    href={code === DEFAULT_LOCALE ? "/" : `/${code}`}
                    role="option"
                    aria-selected={active}
                    hrefLang={LOCALE_META[code].htmlLang}
                    scroll={false}
                    onClick={() => setOpen(false)}
                    className={`flex w-full items-center justify-between gap-3 rounded-[11px] px-3 py-2 text-left text-[14px] font-semibold transition-colors duration-200 ${
                      dark
                        ? active
                          ? "bg-white/[0.14] text-white"
                          : "text-[#CBE3D7] hover:bg-white/[0.08] hover:text-white"
                        : active
                        ? "bg-brand-50 text-brand-700"
                        : "text-[color:var(--nav-fg)] hover:bg-brand-50/70 hover:text-ink"
                    }`}
                  >
                    {LOCALE_META[code].name}
                    <span className={`text-[12px] ${dark ? "text-[#7FB79C]" : "text-mute"}`}>
                      {LOCALE_META[code].short}
                    </span>
                  </Link>
                </li>
              );
            })}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
