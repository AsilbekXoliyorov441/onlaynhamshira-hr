"use client";

import Image from "next/image";
import { useCallback } from "react";
import { useT } from "@/lib/i18n/LanguageProvider";
import {
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { StaticImageData } from "next/image";
import diploma from "@/assets/requirements/req-1-tibbiy-malumot.png";
import experience from "@/assets/requirements/req-2-tajriba.png";
import standards from "@/assets/requirements/req-3-standartlar.png";
import dialog from "@/assets/requirements/req-4-muloqot.png";
import knowledge from "@/assets/requirements/req-5-kasbiy-bilim.png";
import tech from "@/assets/requirements/req-6-texnik-konikma.png";
import accuracy from "@/assets/requirements/req-7-malumotlar-togriligi.png";
import expertise from "@/assets/requirements/req-8-mutaxassislik.png";
import { useSectionActive } from "@/components/perf/SectionShell";

/** Matnlar lugʻatdan (t.requirements.items) shu tartibda olinadi */
type Requirement = { title: string; desc: string; icon: StaticImageData };

const ICONS: StaticImageData[] = [
  diploma,
  experience,
  standards,
  dialog,
  knowledge,
  tech,
  accuracy,
  expertise,
];

/* ===== Animatsiya sxemalari ===== */

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.085, delayChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.94, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 110, damping: 18, mass: 0.85 },
  },
};

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.55, rotate: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 200, damping: 14, delay: 0.1 },
  },
};

const checkVariants: Variants = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 12, delay: 0.26 },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 0.9, 0.3, 1], delay: 0.18 + i * 0.06 },
  }),
};

/* ===== Kartochka ===== */

function RequirementCard({ title, desc, icon }: Requirement) {
  /* Boʻlim ekrandan tashqarida boʻlsa — bezak animatsiyalari toʻxtaydi */
  const offscreen = !useSectionActive();
  const reduce = useReducedMotion();

  // Kursor ortidan yuruvchi "shisha" yorugʻlik nuqtasi
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(220px 220px at ${mx}% ${my}%, rgba(79,209,137,0.28), rgba(79,209,137,0) 68%)`;

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width) * 100);
      my.set(((e.clientY - r.top) / r.height) * 100);
    },
    [mx, my]
  );

  return (
    <m.article
      variants={cardVariants}
      whileHover={reduce ? undefined : { y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onMouseMove={reduce ? undefined : onMove}
      className="glass-card group relative flex h-full cursor-default flex-col overflow-hidden rounded-[26px] p-5 sm:p-[22px]"
    >
      {/* Kursor yorugʻligi */}
      <m.span
        aria-hidden
        style={{ backgroundImage: spotlight }}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Shisha boʻylab oʻtuvchi yaltiroq chiziq (sheen) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-y-8 -left-1/2 z-0 w-1/2 -translate-x-full rotate-[18deg] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.75)_50%,rgba(255,255,255,0)_100%)] opacity-0 transition-all duration-[900ms] ease-out group-hover:translate-x-[320%] group-hover:opacity-100"
      />

      {/* Hover paytida yonuvchi yashil halqa */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[26px] opacity-0 shadow-[inset_0_0_0_1px_rgba(79,209,137,0.55),0_24px_50px_-24px_rgba(27,164,99,0.65)] transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative z-[1] flex items-start justify-between gap-3">
        <m.div
          variants={iconVariants}
          whileHover={reduce ? undefined : { scale: 1.08, rotate: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="relative h-[66px] w-[66px] shrink-0 drop-shadow-[0_10px_18px_rgba(15,64,40,0.16)] sm:h-[72px] sm:w-[72px]"
        >
          <Image
            src={icon}
            alt=""
            fill
            sizes="72px"
            className="object-contain"
            placeholder="blur"
          />
        </m.div>

        {/* Yashil belgi — talab tasdiqlanganini bildiradi */}
        <m.span
          variants={checkVariants}
          aria-hidden
          className="relative mt-1 grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-[linear-gradient(150deg,#DFF8E9,#A9E9C4)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_14px_-8px_rgba(15,64,40,0.5)]"
        >
          <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none">
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              stroke="#12855A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {!reduce && (
            <m.span
              className="absolute inset-0 rounded-full ring-1 ring-brand-400"
              animate={offscreen ? undefined : { scale: [1, 1.45], opacity: [0.55, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </m.span>
      </div>

      <m.h3
        variants={textVariants}
        custom={0}
        className="relative z-[1] mt-5 font-display text-[17px] font-extrabold leading-[1.25] text-ink transition-colors duration-300 group-hover:text-brand-600 sm:text-[18px]"
      >
        {title}:
      </m.h3>

      <m.p
        variants={textVariants}
        custom={1}
        className="relative z-[1] mt-2 text-[13.5px] leading-[1.55] text-body sm:text-[14px]"
      >
        {desc}
      </m.p>
    </m.article>
  );
}

/* ===== Boʻlim ===== */

export default function Requirements() {
  /* Boʻlim ekrandan tashqarida boʻlsa — bezak animatsiyalari toʻxtaydi */
  const offscreen = !useSectionActive();
  const t = useT();
  const reduce = useReducedMotion();

  return (
    <section
      id="talablar"
      className="section-page relative scroll-mt-24 overflow-hidden pb-24 pt-16 sm:pb-32 sm:pt-24"
    >
      {/* ===== Fon nurlari ===== */}
      {/* Umumiy yashil asos — kartochkalar ortidan oʻtadi */}
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute -inset-x-[10%] bottom-[6%] top-[8%] bg-[radial-gradient(60%_55%_at_50%_45%,rgba(79,209,137,0.34),rgba(79,209,137,0)_72%)]"
      />
      <m.div
        aria-hidden
        className="decor-glow pointer-events-none absolute -left-[12%] top-[14%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(79,209,137,0.5),rgba(79,209,137,0)_70%)] blur-2xl"
        animate={reduce || offscreen ? undefined : { x: [0, 40, 0], y: [0, -26, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <m.div
        aria-hidden
        className="decor-glow pointer-events-none absolute -right-[10%] top-[8%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(31,182,232,0.28),rgba(31,182,232,0)_70%)] blur-2xl"
        animate={reduce || offscreen ? undefined : { x: [0, -34, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <m.div
        aria-hidden
        className="decor-glow pointer-events-none absolute bottom-[-6%] left-[26%] h-[460px] w-[620px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(44,193,118,0.42),rgba(44,193,118,0)_72%)] blur-2xl"
        animate={reduce || offscreen ? undefined : { x: [0, 30, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute right-[14%] top-[46%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(190,230,60,0.22),rgba(190,230,60,0)_70%)] blur-2xl"
      />

      {/* ===== Suyuq tomchilar ===== */}
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute left-[4%] top-[38%] hidden h-4 w-4 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.9)_0%,rgba(190,230,60,0.5)_38%,rgba(79,209,137,0.6)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.16)] sm:block"
        style={{ animationDuration: "5.5s" }}
      />
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute left-[3%] top-[46%] hidden h-2.5 w-2.5 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.9)_0%,rgba(190,230,60,0.5)_38%,rgba(44,193,118,0.6)_78%)] shadow-[0_2px_6px_rgba(11,43,28,0.16)] sm:block"
        style={{ animationDelay: "1.4s", animationDuration: "4.6s" }}
      />
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute bottom-[16%] right-[5%] hidden h-6 w-6 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.85)_0%,rgba(190,230,60,0.45)_38%,rgba(79,209,137,0.5)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.14)] blur-[1px] sm:block"
        style={{ animationDelay: "2.6s", animationDuration: "6.4s" }}
      />

      {/* Yuqori va pastki chetlarni bazaviy rangga tekislaydi — qoʻshni
          boʻlimlar bilan qattiq chiziqsiz tutashishi uchun */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[220px] fade-top sm:h-[300px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[200px] fade-bottom sm:h-[280px]"
      />

      <div className="relative z-[2] mx-auto max-w-[1240px] px-5 sm:px-8">
        {/* ===== Sarlavha ===== */}
        <div className="relative mx-auto max-w-[1000px] text-center">
          <m.span
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            className="badge-pill inline-flex items-center gap-2 rounded-pill py-[7px] pl-3 pr-4 text-[13.5px] font-semibold shadow-[0_6px_16px_-8px_rgba(11,43,28,0.25)]"
          >
            <Image src="/cuocces.png" alt="" width={19} height={20} className="h-[19px] w-[18px]" />
            {t.requirements.badge}
          </m.span>

          <div className="relative mt-5">
            <m.div
              aria-hidden
              style={{ x: "-50%", y: "-50%" }}
              className="hero-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[190px] w-[560px] max-w-[112%] rounded-full"
              animate={reduce || offscreen ? undefined : { opacity: [0.65, 1, 0.65], scale: [1, 1.08, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <m.h2
              initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: [0.22, 0.9, 0.3, 1] }}
              className="font-display text-[26px] font-extrabold leading-[1.2] tracking-[-0.01em] text-ink sm:text-[34px] lg:text-[40px]"
            >
              {t.requirements.title}
            </m.h2>
          </div>
        </div>

        {/* ===== Kartochkalar ===== */}
        <m.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6"
        >
          {ICONS.map((icon, i) => (
            <RequirementCard key={i} icon={icon} {...t.requirements.items[i]} />
          ))}
        </m.div>

        {/* ===== Izoh ===== */}
        <m.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-center text-[13px] font-medium text-body sm:mt-10 sm:text-[14px]"
        >
          {t.requirements.footnote}
        </m.p>
      </div>
    </section>
  );
}
