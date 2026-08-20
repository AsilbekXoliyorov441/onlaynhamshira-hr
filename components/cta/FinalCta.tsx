"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import emblem from "@/assets/cta/cta-emblem.png";
import { useT } from "@/lib/i18n/LanguageProvider";
import { useSectionActive } from "@/components/perf/SectionShell";

/* Yakuniy chaqiriq bloki.
   Uslub ataylab vazmin: illyustrativ detallar oʻrniga bitta emblema,
   sekin va yumshoq harakatlar — tibbiy platformaga mos jiddiylik. */

const EASE = [0.22, 0.9, 0.3, 1] as const;

export default function FinalCta() {
  /* Boʻlim ekrandan tashqarida boʻlsa — bezak animatsiyalari toʻxtaydi */
  const offscreen = !useSectionActive();
  const t = useT();
  const reduce = useReducedMotion();

  return (
    <section
      id="hamkor-bolish"
      className="section-page relative scroll-mt-24 overflow-hidden pb-24 pt-16 sm:pb-32 sm:pt-24"
    >
      {/* ===== Fon nurlari — vazmin ===== */}
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute -inset-x-[10%] bottom-[4%] top-[6%] bg-[radial-gradient(56%_52%_at_50%_48%,rgba(27,164,99,0.34),rgba(27,164,99,0)_72%)]"
      />
      <m.div
        aria-hidden
        className="decor-glow pointer-events-none absolute -left-[10%] top-[18%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(22,140,86,0.36),rgba(22,140,86,0)_70%)] blur-2xl"
        animate={reduce || offscreen ? undefined : { x: [0, 26, 0], y: [0, -18, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <m.div
        aria-hidden
        className="decor-glow pointer-events-none absolute -right-[10%] bottom-[12%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(15,124,170,0.24),rgba(15,124,170,0)_70%)] blur-2xl"
        animate={reduce || offscreen ? undefined : { x: [0, -22, 0], y: [0, 18, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Qoʻshni boʻlim bilan chiziqsiz tutashish uchun chekka tekislovchi */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[200px] fade-top sm:h-[280px]"
      />

      <div className="relative z-[2] mx-auto max-w-[1240px] px-5 sm:px-8">
        <m.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="relative mx-auto max-w-[1000px] overflow-hidden rounded-[28px] border border-[color:var(--glass-border)] bg-[image:linear-gradient(165deg,var(--glass-1),var(--glass-2))] px-6 pb-14 pt-14 text-center shadow-[0_40px_84px_-44px_rgba(15,64,40,0.4),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-[12px] sm:rounded-[34px] sm:px-16 sm:pb-[72px] sm:pt-[72px]"
        >
          {/* Panel ichidagi yumshoq nur — sekin "nafas oladi" */}
          <m.div
            aria-hidden
            className="decor-glow pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(58%_62%_at_50%_18%,rgba(17,98,69,0.2),rgba(17,98,69,0)_70%)]"
            animate={reduce || offscreen ? undefined : { opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Yuqori qirradagi ingichka yorugʻlik chizigʻi */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[14%] top-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.9),rgba(255,255,255,0))]"
          />

          {/* ===== Emblema ===== */}
          <m.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative mx-auto h-[112px] w-[112px] sm:h-[136px] sm:w-[136px]"
          >
            <div
              aria-hidden
              className="decor-glow pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(17,98,69,0.3),rgba(17,98,69,0)_70%)] blur-xl"
            />
            <m.div
              className="relative h-full w-full"
              animate={reduce || offscreen ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={emblem}
                alt=""
                fill
                sizes="136px"
                className="object-contain drop-shadow-[0_20px_34px_rgba(5,51,36,0.3)]"
                placeholder="blur"
              />
            </m.div>
          </m.div>

          {/* ===== Matn ===== */}
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mx-auto mt-8 max-w-[820px] font-display text-[26px] font-extrabold leading-[1.2] tracking-[-0.015em] text-ink sm:mt-9 sm:text-[38px] lg:text-[46px]"
          >
            {t.finalCta.title}
          </m.h2>

          <m.div
            aria-hidden
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mx-auto mt-7 h-px w-[150px] origin-center bg-[linear-gradient(90deg,rgba(11,90,60,0),rgba(11,90,60,0.75),rgba(11,90,60,0))] sm:mt-7"
          />

          <m.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, delay: 0.24, ease: EASE }}
            className="mx-auto mt-6 max-w-[740px] text-[15px] leading-[1.65] text-body sm:text-[17px]"
          >
            {t.finalCta.p1}
          </m.p>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, delay: 0.32, ease: EASE }}
            className="mx-auto mt-3 max-w-[740px] text-[15px] leading-[1.65] text-body sm:text-[17px]"
          >
            {t.finalCta.p2}
          </m.p>

          {/* ===== Tugmalar ===== */}
          <m.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, delay: 0.42, ease: EASE }}
            className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
          >
            <a
              href="/hamkor"
              /* Yakuniy CTA'da toʻqroq variant — loyihadagi mavjud .btn-solid */
              className="btn-solid rounded-pill px-9 py-[18px] font-display text-[16.5px] font-bold text-white shadow-cta transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(23,164,104,0.7)] active:translate-y-0"
            >
              {t.finalCta.primary}
            </a>

            {/* Administrator bilan bogʻlanish — footer'dagi rasmiy kanal */}
            <a
              href="https://t.me/Onlayn_Hamshira_Admin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary rounded-pill px-9 py-[18px] font-display text-[16.5px] font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              {t.finalCta.secondary}
            </a>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
