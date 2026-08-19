"use client";

import { useTheme } from "./ThemeProvider";
import { useT } from "@/lib/i18n/LanguageProvider";

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
      </g>
    </svg>
  );
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M20.2 14.4A8.6 8.6 0 1 1 9.6 3.8a6.9 6.9 0 0 0 10.6 10.6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Mavzu almashtirgichi — headerdan boshqariladi.
 *
 * Erishimlilik (a11y):
 *  - `role="switch"` + `aria-checked` — yordamchi texnologiyalar holatni
 *    ("yoqilgan"/"oʻchirilgan") oʻzi eʼlon qiladi;
 *  - `aria-label` nima almashayotganini aytadi, ikonkalar `aria-hidden`;
 *  - haqiqiy `<button>` — Tab/Enter/Space klaviaturada ishlaydi;
 *  - tegish maydoni 44×44px dan kichik emas;
 *  - fokus halqasi global `:focus-visible` qoidasidan keladi.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const t = useT();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={t.theme.label}
      title={isDark ? t.theme.toLight : t.theme.toDark}
      onClick={toggleTheme}
      className={`group relative inline-flex h-11 w-[70px] shrink-0 items-center rounded-pill border border-line bg-surface/80 px-1 shadow-nav backdrop-blur transition-colors duration-300 hover:border-brand-400 ${className}`}
    >
      {/* Sirpanuvchi tugmacha */}
      <span
        aria-hidden
        className={`pointer-events-none absolute left-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full shadow-[0_4px_10px_-4px_rgba(11,43,28,0.55)] transition-transform duration-300 ease-out ${
          isDark
            ? "translate-x-[28px] bg-[linear-gradient(150deg,#2F5F4A,#13372A)]"
            : "translate-x-0 bg-[linear-gradient(150deg,#FFE9A8,#FFC24F)]"
        }`}
      />

      {/* Ikkala ikonka doim turadi — faol boʻlgani tugmacha ustida yonadi */}
      <span
        aria-hidden
        className={`relative z-[1] grid h-9 w-9 place-items-center transition-colors duration-300 ${
          isDark ? "text-mute" : "text-[#7A5310]"
        }`}
      >
        <SunIcon className="h-[17px] w-[17px]" />
      </span>
      <span
        aria-hidden
        className={`relative z-[1] grid h-9 w-9 place-items-center transition-colors duration-300 ${
          isDark ? "text-brand-300" : "text-mute"
        }`}
      >
        <MoonIcon className="h-[17px] w-[17px]" />
      </span>
    </button>
  );
}
