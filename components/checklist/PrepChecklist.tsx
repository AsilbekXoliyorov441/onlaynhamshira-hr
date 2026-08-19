"use client";

import Image from "next/image";
import { useCallback, useMemo, useState, type ComponentType, type SVGProps } from "react";
import {
  AnimatePresence,
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useT } from "@/lib/i18n/LanguageProvider";
import { useTheme } from "@/components/theme/ThemeProvider";
import {
  Certificate3D,
  Diploma3D,
  Experience3D,
  IdCard3D,
  PhotoPortrait3D,
  SmartphoneWifi3D,
  VideoRecord3D,
} from "./PrepIcons";
import { useSectionActive } from "@/components/perf/SectionShell";

/*
 * Ariza qoldirishdan oldingi tayyorgarlik roʻyxati.
 *
 * Roʻyxat "tirik": har bir bandni bosib belgilash mumkin — chap tomondagi
 * halqa toʻlib boradi, hisob yangilanadi va yettitasi ham belgilangach
 * panel "hammasi tayyor" holatiga oʻtadi. Bu foydalanuvchiga oddiy roʻyxatni
 * emas, haqiqiy tayyorgarlik vositasini beradi.
 */

/** Matnlar lugʻatdan (t.checklist.items) shu tartibda olinadi */
type Item = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Kartochka ostidagi yumshoq aura */
  glow: string;
};

const ITEMS: Item[] = [
  {
    icon: IdCard3D,
    glow: "rgba(42,127,182,0.28)",
  },
  {
    icon: Diploma3D,
    glow: "rgba(255,196,79,0.30)",
  },
  {
    icon: Certificate3D,
    glow: "rgba(79,209,137,0.30)",
  },
  {
    icon: Experience3D,
    glow: "rgba(31,146,201,0.28)",
  },
  {
    icon: PhotoPortrait3D,
    glow: "rgba(169,146,236,0.30)",
  },
  {
    icon: VideoRecord3D,
    glow: "rgba(249,137,159,0.28)",
  },
  {
    icon: SmartphoneWifi3D,
    glow: "rgba(44,193,118,0.30)",
  },
];

const TOTAL = ITEMS.length;

/* ===== Animatsiya sxemalari ===== */

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: 28, filter: "blur(7px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 18, mass: 0.8 },
  },
};

/* ===== Belgilash katakchasi ===== */

function CheckBox({ on }: { on: boolean }) {
  /* framer-motion `var()` qiymatlarini interpolyatsiya qila olmaydi, shu bois
     belgilanmagan holat rangi mavzuga qarab JS'da tanlanadi */
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <m.span
      animate={{
        background: on
          ? "linear-gradient(150deg,#7FE7B4 0%,#2CC176 55%,#12855A 100%)"
          : dark
          ? "linear-gradient(150deg,#1C3529,#132821)"
          : "linear-gradient(150deg,#FFFFFF,#F1F6F3)",
        borderColor: on
          ? "rgba(79,209,137,0.9)"
          : dark
          ? "rgba(134,224,165,0.22)"
          : "rgba(215,228,220,1)",
        boxShadow: on
          ? "0 12px 22px -12px rgba(23,164,104,0.95), inset 0 1px 0 rgba(255,255,255,0.6)"
          : dark
          ? "inset 0 1px 0 rgba(255,255,255,0.06)"
          : "inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
      transition={{ duration: 0.32, ease: [0.22, 0.9, 0.3, 1] }}
      className="relative grid h-[26px] w-[26px] shrink-0 place-items-center rounded-[9px] border"
    >
      <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none">
        <m.path
          d="M5 12.6l4.6 4.6L19 7.4"
          stroke="#fff"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </svg>

      {/* Belgilangan lahzadagi uchqunlar */}
      <AnimatePresence>
        {on && (
          <m.span key="spark" className="pointer-events-none absolute inset-0" aria-hidden>
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <m.span
                key={deg}
                className="absolute left-1/2 top-1/2 h-[3px] w-[3px] rounded-full bg-brand-400"
                initial={{ x: 0, y: 0, opacity: 0.9, scale: 1 }}
                animate={{
                  x: Math.cos((deg * Math.PI) / 180) * 18,
                  y: Math.sin((deg * Math.PI) / 180) * 18,
                  opacity: 0,
                  scale: 0.4,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
            ))}
          </m.span>
        )}
      </AnimatePresence>
    </m.span>
  );
}

/* ===== Roʻyxat bandi ===== */

function PrepRow({
  item,
  text,
  index,
  on,
  onToggle,
}: {
  item: Item;
  text: { title: string; hint: string };
  index: number;
  on: boolean;
  onToggle: () => void;
}) {
  /* Boʻlim ekrandan tashqarida boʻlsa — bezak animatsiyalari toʻxtaydi */
  const offscreen = !useSectionActive();
  const reduce = useReducedMotion();
  const Icon = item.icon;

  /* Sarlavha rangi framer-motion orqali animatsiyalanadi — `var()` bu yerda
     ishlamaydi, shu bois qiymatlar mavzuga qarab tanlanadi */
  const { theme } = useTheme();
  const headingOn = theme === "dark" ? "#EAF6EF" : "#0B2B1C";
  const headingOff = theme === "dark" ? "#9FB8AB" : "#2A4438";

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(220px 220px at ${mx}% ${my}%, ${item.glow}, rgba(255,255,255,0) 70%)`;

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width) * 100);
      my.set(((e.clientY - r.top) / r.height) * 100);
    },
    [mx, my]
  );

  return (
    <m.button
      type="button"
      role="checkbox"
      aria-checked={on}
      variants={rowVariants}
      onClick={onToggle}
      onMouseMove={reduce ? undefined : onMove}
      whileHover={reduce ? undefined : { x: 5, scale: 1.008 }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="glass-card group relative w-full overflow-hidden rounded-[20px] p-3.5 text-left sm:p-4"
    >
      {/* Kursor yorugʻligi */}
      <m.span
        aria-hidden
        style={{ backgroundImage: spotlight }}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Shisha boʻylab oʻtuvchi yaltiroq */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-y-10 -left-1/2 z-0 w-1/2 -translate-x-full rotate-[18deg] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.7)_50%,rgba(255,255,255,0)_100%)] opacity-0 transition-all duration-[900ms] ease-out group-hover:translate-x-[340%] group-hover:opacity-100"
      />

      {/* Belgilangan bandning halqasi */}
      <m.span
        aria-hidden
        animate={{ opacity: on ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="pointer-events-none absolute inset-0 z-0 rounded-[20px] shadow-[inset_0_0_0_1px_rgba(79,209,137,0.55),0_24px_46px_-28px_rgba(27,164,99,0.9)]"
      />

      {/* Chap chekkadagi holat chizigʻi */}
      <m.span
        aria-hidden
        animate={{ scaleY: on ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 0.9, 0.3, 1] }}
        className="pointer-events-none absolute inset-y-2 left-0 z-[1] w-[4px] origin-center rounded-pill bg-[linear-gradient(180deg,#86E0A5,#12855A)]"
      />

      <div className="relative z-[1] flex items-center gap-3.5">
        <span className="relative shrink-0">
          <m.span
            aria-hidden
            className="absolute inset-[-6px] rounded-full"
            style={{
              background: `radial-gradient(50% 50% at 50% 50%, ${item.glow}, rgba(255,255,255,0) 70%)`,
            }}
            animate={on && !reduce && !offscreen ? { opacity: [0.5, 1, 0.5], scale: [0.94, 1.08, 0.94] } : { opacity: 0 }}
            transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <m.span
            animate={on && !reduce && !offscreen ? { y: [0, -3, 0] } : { y: 0 }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            className="relative block"
          >
            <Icon className="h-[44px] w-[44px] sm:h-[48px] sm:w-[48px]" />
          </m.span>
          <span className="absolute -left-1 -top-1 grid h-[17px] w-[17px] place-items-center rounded-full bg-surface/90 font-display text-[9.5px] font-extrabold text-mute shadow-[0_3px_8px_-4px_rgba(11,43,28,0.6)]">
            {index + 1}
          </span>
        </span>

        <div className="min-w-0 flex-1">
          <m.h3
            animate={{ color: on ? headingOn : headingOff }}
            className="font-display text-[14px] font-extrabold leading-[1.3] sm:text-[15px]"
          >
            {text.title}
          </m.h3>
          <p className="mt-1 text-[12px] leading-[1.5] text-mute sm:text-[12.5px]">{text.hint}</p>
        </div>

        <CheckBox on={on} />
      </div>
    </m.button>
  );
}

/* ===== Chapdagi progress paneli ===== */

type PanelLabels = {
  ready: string;
  panelTitle: string;
  panelDesc: string;
  doneTitle: string;
  doneDesc: string;
  checkAll: string;
  reset: string;
};

function ProgressPanel({
  count,
  onAll,
  onReset,
  labels,
}: {
  count: number;
  onAll: () => void;
  onReset: () => void;
  labels: PanelLabels;
}) {
  /* Boʻlim ekrandan tashqarida boʻlsa — bezak animatsiyalari toʻxtaydi */
  const offscreen = !useSectionActive();
  const { ready } = labels;
  const reduce = useReducedMotion();
  const ratio = count / TOTAL;
  const full = count === TOTAL;
  const percent = Math.round(ratio * 100);

  return (
    <div className="glass-card relative overflow-hidden rounded-[26px] p-5 sm:p-6 lg:sticky lg:top-24">
      {/* Toʻliq tayyor boʻlgandagi yashil nur */}
      <m.span
        aria-hidden
        animate={{ opacity: full ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="decor-glow pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(79,209,137,0.35),rgba(79,209,137,0)_70%)]"
      />

      {/* Halqa */}
      <div className="relative mx-auto aspect-square w-full max-w-[220px]">
        <m.div
          aria-hidden
          className="decor-glow pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(79,209,137,0.4),rgba(79,209,137,0)_70%)] blur-2xl"
          animate={reduce || offscreen ? undefined : { opacity: [0.6, 1, 0.6], scale: [0.95, 1.06, 0.95] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <svg viewBox="0 0 200 200" className="relative h-full w-full">
          <defs>
            <linearGradient id="prep-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#86E0A5" />
              <stop offset="55%" stopColor="#2CC176" />
              <stop offset="100%" stopColor="#12855A" />
            </linearGradient>
          </defs>

          <circle cx="100" cy="100" r="78" fill="none" stroke="var(--track)" strokeWidth="16" />

          {/* Bandlar orasidagi ajratuvchi tirqishlar */}
          {Array.from({ length: TOTAL }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + 96 * Math.cos(((i / TOTAL) * 360 - 90) * (Math.PI / 180))}
              y2={100 + 96 * Math.sin(((i / TOTAL) * 360 - 90) * (Math.PI / 180))}
              stroke="rgb(var(--c-page))"
              strokeWidth="4"
            />
          ))}

          <m.circle
            cx="100"
            cy="100"
            r="78"
            fill="none"
            stroke="url(#prep-ring)"
            strokeWidth="16"
            strokeLinecap="round"
            style={{ rotate: -90, transformOrigin: "100px 100px" }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: ratio }}
            transition={{ type: "spring", stiffness: 90, damping: 20 }}
          />
        </svg>

        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="flex items-baseline justify-center font-display text-[40px] font-extrabold leading-none tracking-[-0.02em] text-ink sm:text-[46px]">
              <AnimatePresence mode="popLayout" initial={false}>
                <m.span
                  key={count}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 0.9, 0.3, 1] }}
                >
                  {count}
                </m.span>
              </AnimatePresence>
              <span className="text-mute">/{TOTAL}</span>
            </div>
            <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-mute">
              {ready} · {percent}%
            </p>
          </div>
        </div>
      </div>

      {/* Holat matni */}
      <div className="relative mt-4 min-h-[70px] text-center">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={full ? "done" : "progress"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {full ? (
              <>
                <p className="font-display text-[16px] font-extrabold text-ink">
                  {labels.doneTitle}
                </p>
                <p className="mt-1.5 text-[13px] leading-[1.55] text-body">
                  {labels.doneDesc}
                </p>
              </>
            ) : (
              <>
                <p className="font-display text-[16px] font-extrabold text-ink">
                  {labels.panelTitle}
                </p>
                <p className="mt-1.5 text-[13px] leading-[1.55] text-body">
                  {labels.panelDesc}
                </p>
              </>
            )}
          </m.div>
        </AnimatePresence>
      </div>

      {/* Boshqaruv tugmalari */}
      <div className="relative mt-4 flex items-center justify-center gap-2">
        <m.button
          type="button"
          onClick={onAll}
          whileHover={reduce ? undefined : { scale: 1.04 }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
          className="btn-secondary rounded-pill px-4 py-2 font-display text-[12.5px] font-bold text-ink"
        >
          {labels.checkAll}
        </m.button>
        <m.button
          type="button"
          onClick={onReset}
          whileHover={reduce ? undefined : { scale: 1.04 }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
          className="rounded-pill border border-line bg-surface/60 px-4 py-2 font-display text-[12.5px] font-bold text-mute transition-colors hover:text-ink"
        >
          {labels.reset}
        </m.button>
      </div>

      {/* Toʻliq tayyor boʻlgandagi konfetti */}
      <AnimatePresence>
        {full && !reduce && (
          <m.span key="confetti" aria-hidden className="pointer-events-none absolute inset-0">
            {Array.from({ length: 14 }).map((_, i) => (
              <m.span
                key={i}
                className="absolute top-[18%] h-[6px] w-[6px] rounded-[2px]"
                style={{
                  left: `${8 + i * 6.4}%`,
                  background: ["#86E0A5", "#2CC176", "#FFC94F", "#7FC9EE"][i % 4],
                }}
                initial={{ y: -20, opacity: 0, rotate: 0 }}
                animate={{ y: 190, opacity: [0, 1, 1, 0], rotate: 220 }}
                transition={{ duration: 1.8, delay: i * 0.05, ease: "easeIn" }}
              />
            ))}
          </m.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ===== Boʻlim ===== */

export default function PrepChecklist() {
  /* Boʻlim ekrandan tashqarida boʻlsa — bezak animatsiyalari toʻxtaydi */
  const offscreen = !useSectionActive();
  const t = useT();
  const reduce = useReducedMotion();
  const [checked, setChecked] = useState<boolean[]>(() => ITEMS.map(() => false));

  const count = useMemo(() => checked.filter(Boolean).length, [checked]);

  const toggle = useCallback((i: number) => {
    setChecked((prev) => prev.map((v, k) => (k === i ? !v : v)));
  }, []);

  const checkAll = useCallback(() => setChecked(ITEMS.map(() => true)), []);
  const reset = useCallback(() => setChecked(ITEMS.map(() => false)), []);

  return (
    <section
      id="tayyorgarlik"
      className="section-page relative scroll-mt-24 overflow-hidden pb-24 pt-16 sm:pb-32 sm:pt-24"
    >
      {/* ===== Fon nurlari ===== */}
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute -inset-x-[10%] bottom-[8%] top-[8%] bg-[radial-gradient(56%_52%_at_38%_44%,rgba(79,209,137,0.26),rgba(79,209,137,0)_72%)]"
      />
      <m.div
        aria-hidden
        className="decor-glow pointer-events-none absolute -left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(79,209,137,0.44),rgba(79,209,137,0)_70%)] blur-2xl"
        animate={reduce || offscreen ? undefined : { x: [0, 32, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <m.div
        aria-hidden
        className="decor-glow pointer-events-none absolute -right-[12%] top-[18%] h-[470px] w-[470px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(169,146,236,0.24),rgba(169,146,236,0)_70%)] blur-2xl"
        animate={reduce || offscreen ? undefined : { x: [0, -26, 0], y: [0, 26, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
      />
      <m.div
        aria-hidden
        className="decor-glow pointer-events-none absolute bottom-[-8%] left-[28%] h-[420px] w-[580px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(44,193,118,0.30),rgba(44,193,118,0)_72%)] blur-2xl"
        animate={reduce || offscreen ? undefined : { x: [0, 26, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 23, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* ===== Suyuq tomchilar ===== */}
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute left-[4%] top-[30%] hidden h-[17px] w-[17px] animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.9)_0%,rgba(190,230,60,0.5)_38%,rgba(79,209,137,0.6)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.16)] sm:block"
        style={{ animationDuration: "5.8s" }}
      />
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute bottom-[22%] right-[6%] hidden h-4 w-4 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.85)_0%,rgba(196,180,245,0.5)_38%,rgba(98,68,184,0.4)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.14)] blur-[1px] sm:block"
        style={{ animationDelay: "2s", animationDuration: "6.4s" }}
      />

      {/* Qoʻshni boʻlimlar bilan yumshoq tutashuv */}
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
        <div className="relative mx-auto max-w-[900px] text-center">
          <m.span
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            className="badge-pill inline-flex items-center gap-2 rounded-pill py-[7px] pl-3 pr-4 text-[13.5px] font-semibold shadow-[0_6px_16px_-8px_rgba(11,43,28,0.25)]"
          >
            <Image src="/cuocces.png" alt="" width={19} height={20} className="h-[19px] w-[18px]" />
            {t.checklist.badge}
          </m.span>

          <div className="relative mt-5">
            <m.div
              aria-hidden
              className="hero-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[190px] w-[560px] max-w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-full"
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
              {t.checklist.title}
            </m.h2>
          </div>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-4 max-w-[640px] text-[14px] leading-[1.65] text-body sm:text-[15.5px]"
          >
            {t.checklist.desc}
          </m.p>
        </div>

        {/* ===== Panel + roʻyxat ===== */}
        <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[minmax(0,36%)_minmax(0,64%)] lg:gap-10">
          <m.div
            initial={{ opacity: 0, y: 34, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
          >
            <ProgressPanel count={count} onAll={checkAll} onReset={reset} labels={t.checklist} />
          </m.div>

          <m.div
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="flex flex-col gap-2.5 sm:gap-3"
          >
            {ITEMS.map((item, i) => (
              <PrepRow
                key={i}
                item={item}
                text={t.checklist.items[i]}
                index={i}
                on={checked[i]}
                onToggle={() => toggle(i)}
              />
            ))}
          </m.div>
        </div>

        {/* ===== Izoh ===== */}
        <m.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card mx-auto mt-10 flex max-w-[860px] items-start gap-3 rounded-[22px] px-5 py-4 sm:mt-14 sm:px-6 sm:py-5"
        >
          <span
            aria-hidden
            className="mt-[2px] grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-[linear-gradient(150deg,#DFF8E9,#A9E9C4)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_14px_-8px_rgba(15,64,40,0.5)]"
          >
            <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none">
              <path d="M12 8.2v.2M12 11.4v4.6" stroke="#12855A" strokeWidth="2.6" strokeLinecap="round" />
              <circle cx="12" cy="12" r="8.6" stroke="#12855A" strokeWidth="2" />
            </svg>
          </span>
          <p className="text-[13px] leading-[1.6] text-body sm:text-[14px]">
            {t.checklist.note}
          </p>
        </m.div>

        {/* ===== Chaqiriq tugmasi ===== */}
        <m.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 0.9, 0.3, 1] }}
          className="mt-8 flex justify-center sm:mt-10"
        >
          <a
            href="#onboarding"
            className="btn-primary rounded-pill px-8 py-4 font-display text-[16px] font-bold text-onbrand transition-all duration-300 hover:scale-105 active:scale-100"
          >
            {t.checklist.cta}
          </a>
        </m.div>
      </div>
    </section>
  );
}
