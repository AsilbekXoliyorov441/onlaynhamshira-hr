"use client";

import { m, useReducedMotion, type Variants } from "framer-motion";
import { LogoMark } from "@/components/Icons";
import { useT } from "@/lib/i18n/LanguageProvider";
import LanguageSwitcher from "@/lib/i18n/LanguageSwitcher";
import { useSectionActive } from "@/components/perf/SectionShell";

/* Sahifaning yakuni — toʻq yashil, vazmin footer.
   Yuqori qirrasi yumaloqlangan: ochiq fonli sahifadan yumshoq oʻtish. */

const TELEGRAM = "https://t.me/Onlayn_Hamshira_Admin";

/* Matnlar lugʻatdan (t.footer.links) shu tartibda olinadi */
const LINK_HREFS: { href: string; external?: boolean }[] = [
  { href: "#platforma-haqida" },
  { href: "#talablar" },
  // TODO: huquqiy sahifalar tayyor boʻlgach, havolalarni qoʻying
  { href: "#" },
  { href: "#" },
  { href: "#savollar" },
  { href: TELEGRAM, external: true },
];

/* Sarlavhalar lugʻatdan (t.footer.contacts) olinadi, qiymatlar oʻzgarmaydi */
const CONTACTS = [
  { key: "phone" as const, value: "+998 91 676 88 66", href: "tel:+998916768866", icon: PhoneIcon },
  { key: "telegram" as const, value: "@Onlayn_Hamshira_Admin", href: TELEGRAM, icon: TelegramIcon, external: true },
  { key: "website" as const, value: "onlaynhamshira.uz", href: "https://onlaynhamshira.uz", icon: GlobeIcon, external: true },
];

/* ===== Ingichka chiziqli ikonkalar ===== */

type IconProps = { className?: string };

function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6.6 3.5h2.1l1.5 3.7-1.8 1.3a11.4 11.4 0 0 0 5.1 5.1l1.3-1.8 3.7 1.5v2.1a2.1 2.1 0 0 1-2.3 2.1C10.4 16.9 7.1 13.6 4.5 5.8A2.1 2.1 0 0 1 6.6 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TelegramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M20.5 4.3 3.9 10.7c-.8.3-.8 1.4 0 1.7l4 1.3 1.6 4.7c.2.7 1.1.9 1.6.3l2.1-2.3 4.1 3c.6.5 1.5.1 1.6-.7l2.3-13c.2-.8-.6-1.5-1.4-1.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="m7.9 13.7 9.3-6.6-6 7.6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function GlobeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 12h17" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5S14.2 18.2 12 20.5c-2.2-2.3-3.3-5.1-3.3-8.5S9.8 5.8 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ===== Animatsiya ===== */

const colVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.9, 0.3, 1] },
  },
};

export default function Footer() {
  /* Boʻlim ekrandan tashqarida boʻlsa — bezak animatsiyalari toʻxtaydi */
  const offscreen = !useSectionActive();
  const t = useT();
  const reduce = useReducedMotion();

  return (
    <footer className="relative bg-page pt-6 sm:pt-10">
      <div className="relative overflow-hidden rounded-t-[36px] bg-[linear-gradient(168deg,#0F4C36_0%,#0A3826_52%,#062419_100%)] sm:rounded-t-[56px]">
        {/* ===== Fon nurlari — juda vazmin ===== */}
        <m.div
          aria-hidden
          className="decor-glow pointer-events-none absolute -left-[8%] -top-[18%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(44,193,118,0.24),rgba(44,193,118,0)_70%)] blur-2xl"
          animate={reduce || offscreen ? undefined : { x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.div
          aria-hidden
          className="decor-glow pointer-events-none absolute -right-[10%] bottom-[-14%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(15,124,170,0.2),rgba(15,124,170,0)_70%)] blur-2xl"
          animate={reduce || offscreen ? undefined : { x: [0, -24, 0], y: [0, -18, 0] }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        />
        {/* Yuqori qirradagi ingichka yorugʻlik */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[10%] top-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(180,240,205,0.5),rgba(255,255,255,0))]"
        />

        <m.div
          variants={colVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-[1] mx-auto max-w-[1240px] px-5 pb-8 pt-14 sm:px-8 sm:pb-10 sm:pt-20"
        >
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr_1fr] lg:gap-10">
            {/* ===== Brend ===== */}
            <m.div variants={itemVariants}>
              <LogoMark gradientId="lm-footer" className="h-[42px] w-auto" wordFill="#EAF6F0" />
              <p className="mt-5 max-w-[320px] text-[14px] leading-[1.65] text-[#A9C9BA]">
                {t.footer.tagline}
              </p>

              <a
                href={TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2.5 rounded-pill border border-white/15 bg-white/[0.07] px-5 py-2.5 text-[14px] font-semibold text-[#EAF6F0] backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.12]"
              >
                <TelegramIcon className="h-[18px] w-[18px] text-brand-300" />
                {t.footer.contactCta}
              </a>
            </m.div>

            {/* ===== Havolalar ===== */}
            <m.nav variants={itemVariants} aria-label={t.footer.navLabel}>
              <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.14em] text-[#7FB79C]">
                {t.footer.linksTitle}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {LINK_HREFS.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group inline-flex items-center gap-1.5 text-[14.5px] text-[#CBE3D7] transition-colors duration-300 hover:text-white"
                    >
                      <span className="relative">
                        {t.footer.links[i]}
                        <span
                          aria-hidden
                          className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-300 transition-all duration-300 group-hover:w-full"
                        />
                      </span>
                      {link.external && (
                        <ArrowIcon className="h-3 w-3 shrink-0 text-[#7FB79C] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </m.nav>

            {/* ===== Aloqa ===== */}
            <m.div variants={itemVariants}>
              <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.14em] text-[#7FB79C]">
                {t.footer.contactsTitle}
              </h3>
              <ul className="mt-5 flex flex-col gap-4">
                {CONTACTS.map((c) => (
                  <li key={c.key}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-start gap-3.5"
                    >
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-[12px] border border-white/12 bg-white/[0.06] text-brand-300 transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/[0.12] group-hover:text-[#C8F5D9]">
                        <c.icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[12.5px] text-[#7FB79C]">{t.footer.contacts[c.key]}</span>
                        <span className="block break-words text-[14.5px] font-semibold text-[#EAF6F0] transition-colors duration-300 group-hover:text-white">
                          {c.value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </m.div>
          </div>

          {/* ===== Ajratuvchi + yakuniy yozuv ===== */}
          <m.div
            variants={itemVariants}
            className="mt-12 border-t border-white/10 pt-6 sm:mt-14 sm:pt-7"
          >
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-center text-[13px] text-[#7FB79C] sm:text-left">
                {t.footer.copyright}
              </p>
              <LanguageSwitcher tone="dark" />
            </div>
          </m.div>
        </m.div>
      </div>
    </footer>
  );
}
