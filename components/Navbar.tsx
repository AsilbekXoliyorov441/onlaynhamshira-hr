"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "./Icons";

const NAV = [
  { label: "Platforma haqida", href: "#platforma-haqida" },
  { label: "Afzalliklar", href: "#afzalliklar" },
  { label: "Qanday ishlaydi", href: "#qanday-ishlaydi" },
  { label: "Talablar", href: "#talablar" },
  { label: "Savol-javob", href: "#faq" },
];

function HeaderBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
        {/* Logotip */}
        <a href="#" className="flex shrink-0 items-center transition-transform duration-300 hover:scale-105">
          <LogoMark className="h-[42px] w-auto" />
        </a>

        {/* Markaziy menyu */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 nav:flex">
          {NAV.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="relative text-[15px] font-medium text-[#395145] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-brand-500 after:transition-all after:duration-300 hover:text-ink hover:after:w-full"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Oʻng tomon */}
        <div className="hidden nav:flex">
          <a
            href="#"
            className="btn-primary rounded-pill px-6 py-[11px] font-display text-[15px] font-bold text-ink transition-all duration-300 hover:scale-105"
          >
            Hamkor boʻlish
          </a>
        </div>

        {/* Mobil tugma */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menyuni ochish"
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-xl border border-[#D4E5DA] bg-white/85 nav:hidden"
        >
          <span
            className={`h-[2px] w-4 rounded bg-ink transition-transform ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-4 rounded bg-ink transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[2px] w-4 rounded bg-ink transition-transform ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobil menyu */}
      {open && (
        <div className="mx-5 mb-2 rounded-card border border-line bg-white/95 p-4 shadow-card backdrop-blur nav:hidden">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3 text-[15px] font-medium text-[#395145] last:border-0"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#"
            onClick={() => setOpen(false)}
            className="btn-primary mt-4 block rounded-pill py-2.5 text-center font-display text-[15px] font-bold text-ink"
          >
            Hamkor boʻlish
          </a>
        </div>
      )}
    </>
  );
}

export default function Navbar() {
  const [showFixed, setShowFixed] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setShowFixed(window.scrollY > 80);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* Sahifa qancha scroll qilinganini koʻrsatuvchi chiziq */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
        <div
          className="h-full bg-[linear-gradient(90deg,#4FD189,#1BA463)] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Asosiy header — sahifa boshida oddiy oqimda */}
      <header className="relative z-40">
        <HeaderBar />
      </header>

      {/* Scroll qilinganda sekin animatsiya bilan chiqadigan fixed header */}
      <header
        aria-hidden={!showFixed}
        className={`fixed inset-x-0 top-0 z-50 bg-white/50 shadow-nav backdrop-blur-[8px] transition-all duration-500 ease-out ${
          showFixed
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <HeaderBar />
      </header>
    </>
  );
}
