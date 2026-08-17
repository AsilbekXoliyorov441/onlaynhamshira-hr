"use client";

import { useState } from "react";
import { LogoMark } from "./Icons";

const NAV = [
  { label: "Platforma haqida", href: "#platforma-haqida" },
  { label: "Afzalliklar", href: "#afzalliklar" },
  { label: "Qanday ishlaydi", href: "#qanday-ishlaydi" },
  { label: "Talablar", href: "#talablar" },
  { label: "Savol-javob", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-40">
      <nav className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
        {/* Logotip */}
        <a href="#" className="flex shrink-0 items-center">
          <LogoMark className="h-[42px] w-auto" />
        </a>

        {/* Markaziy menyu */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 nav:flex">
          {NAV.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-[15px] font-medium text-[#395145] transition-colors hover:text-ink"
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
    </header>
  );
}
