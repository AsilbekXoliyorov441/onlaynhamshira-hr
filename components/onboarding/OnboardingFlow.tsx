"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type ComponentType, type SVGProps } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { useT } from "@/lib/i18n/LanguageProvider";
import { useTheme } from "@/components/theme/ThemeProvider";
import {
  IntroIcon,
  QualificationIcon,
  EducationIcon,
  MotivationIcon,
  AppLessonsIcon,
  RegisterIcon,
} from "../partner/PartnerIcons";

/*
 * Onboarding jarayoni — oltita bosqich gorizontal "relsda" joylashadi.
 * Sahifa aylantirilgani sari rels yashil suyuqlik bilan toʻladi va har bir
 * bosqich navbat bilan "ochiladi": qulf belgisi tasdiq belgisiga aylanadi,
 * kartochka esa xiralikdan toʻliq rangga oʻtadi. Bu "barcha bosqichlar
 * ketma-ket amalga oshiriladi" degan qoidani vizual tarzda koʻrsatadi.
 */

/** Matnlar lugʻatdan (t.onboarding.stages) shu tartibda olinadi */
type Stage = {
  n: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type StageText = { title: string; tag: string; text: string };

const STAGES: Stage[] = [
  {
    n: "01",
    icon: IntroIcon,
  },
  {
    n: "02",
    icon: QualificationIcon,
  },
  {
    n: "03",
    icon: EducationIcon,
  },
  {
    n: "04",
    icon: MotivationIcon,
  },
  {
    n: "05",
    icon: AppLessonsIcon,
  },
  {
    n: "06",
    icon: RegisterIcon,
  },
];

const LAST = STAGES.length - 1;

/* ===== Animatsiya sxemalari ===== */

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 110, damping: 18, mass: 0.85 },
  },
};

/* ===== Vertikal relsning ikki tugun orasidagi boʻlagi (lg dan kichik) ===== */

function RailSegment({
  progress,
  index,
}: {
  progress: MotionValue<number>;
  index: number;
}) {
  const height = useTransform(progress, (p) =>
    `${Math.min(1, Math.max(0, p * LAST - index)) * 100}%`
  );

  return (
    <span
      aria-hidden
      className="pointer-events-none absolute bottom-[-20px] left-[25.5px] top-[52px] w-[5px] overflow-hidden rounded-pill bg-line/80 sm:bottom-[-24px] lg:hidden"
    >
      <motion.span
        className="absolute inset-x-0 top-0 rounded-pill bg-[linear-gradient(180deg,#86E0A5,#2CC176_45%,#12855A)]"
        style={{ height }}
      />
    </span>
  );
}

/* ===== Bosqich tuguni (raqam / qulf / tasdiq) ===== */

function StageNode({ stage, open }: { stage: Stage; open: boolean }) {
  const reduce = useReducedMotion();
  /* framer-motion `var()` ni interpolyatsiya qilmaydi — mavzuni JS'da olamiz */
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <span className="relative z-[2] grid h-[56px] w-[56px] shrink-0 place-items-center">
      {/* Ochilgan tugun atrofidagi nafas oluvchi aura */}
      <motion.span
        aria-hidden
        className="absolute inset-[-10px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(79,209,137,0.55),rgba(79,209,137,0)_70%)]"
        animate={
          open && !reduce ? { opacity: [0.45, 1, 0.45], scale: [0.92, 1.1, 0.92] } : { opacity: 0 }
        }
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ochilish momentidagi bir martalik halqa */}
      <AnimatePresence>
        {open && !reduce && (
          <motion.span
            key="ring"
            aria-hidden
            className="absolute inset-0 rounded-full ring-2 ring-brand-400"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.9, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <motion.span
        animate={{
          background: open
            ? "linear-gradient(150deg,#7FE7B4 0%,#2CC176 55%,#12855A 100%)"
            : dark
            ? "linear-gradient(150deg,#1C3529 0%,#132821 100%)"
            : "linear-gradient(150deg,#FFFFFF 0%,#EFF5F1 100%)",
          boxShadow: open
            ? "inset 0 2px 4px rgba(255,255,255,0.55), 0 16px 26px -14px rgba(23,164,104,0.95)"
            : dark
            ? "inset 0 2px 4px rgba(255,255,255,0.05), 0 10px 20px -14px rgba(0,0,0,0.7)"
            : "inset 0 2px 4px rgba(255,255,255,0.9), 0 10px 20px -14px rgba(11,43,28,0.5)",
        }}
        transition={{ duration: 0.5, ease: [0.22, 0.9, 0.3, 1] }}
        className="relative grid h-full w-full place-items-center rounded-full border border-[color:var(--glass-border)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="num"
              initial={{ scale: 0.4, opacity: 0, rotate: -25 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 16 }}
              className="font-display text-[17px] font-extrabold text-white"
            >
              {stage.n}
            </motion.span>
          ) : (
            <motion.span
              key="lock"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid place-items-center"
            >
              <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none">
                <rect x="4.6" y="10.4" width="14.8" height="9.8" rx="3.2" stroke="rgb(var(--c-mute))" strokeWidth="2" />
                <path d="M8.4 10.2V8a3.6 3.6 0 0 1 7.2 0v2.2" stroke="rgb(var(--c-mute))" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </span>
  );
}

/* ===== Bosqich kartochkasi ===== */

function StageCard({
  stage,
  text,
  open,
}: {
  stage: Stage;
  text: StageText;
  open: boolean;
}) {
  const reduce = useReducedMotion();
  const Icon = stage.icon;

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(200px 200px at ${mx}% ${my}%, rgba(79,209,137,0.28), rgba(255,255,255,0) 70%)`;

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width) * 100);
      my.set(((e.clientY - r.top) / r.height) * 100);
    },
    [mx, my]
  );

  return (
    <motion.article
      onMouseMove={reduce ? undefined : onMove}
      whileHover={reduce ? undefined : { y: -7, scale: 1.02 }}
      animate={{ opacity: open ? 1 : 0.55 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="glass-card group relative flex-1 overflow-hidden rounded-[22px] p-4 text-left lg:h-full lg:p-[18px] lg:text-center"
    >
      {/* Kursor yorugʻligi */}
      <motion.span
        aria-hidden
        style={{ backgroundImage: spotlight }}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Shisha boʻylab oʻtuvchi yaltiroq */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-y-10 -left-1/2 z-0 w-1/2 -translate-x-full rotate-[18deg] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.7)_50%,rgba(255,255,255,0)_100%)] opacity-0 transition-all duration-[900ms] ease-out group-hover:translate-x-[340%] group-hover:opacity-100"
      />

      {/* Ochilgan kartochka halqasi */}
      <motion.span
        aria-hidden
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute inset-0 z-0 rounded-[22px] shadow-[inset_0_0_0_1px_rgba(79,209,137,0.5),0_26px_50px_-30px_rgba(27,164,99,0.9)]"
      />

      {/* Fondagi katta raqam */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-1 -top-3 z-0 font-display text-[58px] font-extrabold leading-none text-ink/[0.045] lg:text-[64px]"
      >
        {stage.n}
      </span>

      <div className="relative z-[1] flex items-start gap-3.5 lg:flex-col lg:items-center lg:gap-0">
        <motion.span
          animate={reduce || !open ? { y: 0 } : { y: [0, -4, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          className="shrink-0 lg:mb-2.5"
        >
          <Icon className="h-[52px] w-[52px] lg:h-[56px] lg:w-[56px]" />
        </motion.span>

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">
            {text.tag}
          </p>
          <h3 className="mt-1 font-display text-[15px] font-extrabold leading-[1.25] text-ink lg:text-[15.5px]">
            {text.title}
          </h3>
          <p className="mt-2 text-[12.5px] leading-[1.6] text-body lg:text-[12.5px]">{text.text}</p>
        </div>
      </div>
    </motion.article>
  );
}

/* ===== Boʻlim ===== */

export default function OnboardingFlow() {
  const t = useT();
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.82", "end 0.55"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });

  const [openCount, setOpenCount] = useState(reduce ? STAGES.length : 0);

  useMotionValueEvent(progress, "change", (p) => {
    if (reduce) return;
    const next = Math.max(0, Math.min(STAGES.length, Math.floor(p * LAST + 1.0001)));
    setOpenCount((c) => (c === next ? c : next));
  });

  /* Rels boʻylab yuguruvchi uchqun */
  const sparkX = useTransform(progress, (p) => `${Math.min(1, Math.max(0, p)) * 100}%`);
  const railOpacity = useTransform(progress, [0, 0.02], [0, 1]);

  const done = reduce ? STAGES.length : openCount;

  return (
    <section
      id="onboarding"
      className="section-page relative scroll-mt-24 overflow-hidden pb-24 pt-16 sm:pb-32 sm:pt-24"
    >
      {/* ===== Fon nurlari ===== */}
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute -inset-x-[10%] bottom-[8%] top-[10%] bg-[radial-gradient(54%_50%_at_50%_46%,rgba(79,209,137,0.26),rgba(79,209,137,0)_72%)]"
      />
      <motion.div
        aria-hidden
        className="decor-glow pointer-events-none absolute -left-[8%] top-[16%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(79,209,137,0.42),rgba(79,209,137,0)_70%)] blur-2xl"
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, 24, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="decor-glow pointer-events-none absolute -right-[10%] top-[6%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(31,182,232,0.26),rgba(31,182,232,0)_70%)] blur-2xl"
        animate={reduce ? undefined : { x: [0, -28, 0], y: [0, 26, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        aria-hidden
        className="decor-glow pointer-events-none absolute bottom-[-8%] left-[34%] h-[400px] w-[560px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(44,193,118,0.30),rgba(44,193,118,0)_72%)] blur-2xl"
        animate={reduce ? undefined : { x: [0, 24, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />

      {/* ===== Suyuq tomchilar ===== */}
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute left-[6%] top-[24%] hidden h-4 w-4 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.9)_0%,rgba(190,230,60,0.5)_38%,rgba(79,209,137,0.6)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.16)] sm:block"
        style={{ animationDuration: "5.4s" }}
      />
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute bottom-[18%] right-[5%] hidden h-[18px] w-[18px] animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.85)_0%,rgba(155,221,244,0.5)_38%,rgba(31,146,201,0.5)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.14)] blur-[1px] sm:block"
        style={{ animationDelay: "2.4s", animationDuration: "6.6s" }}
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
          <motion.span
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            className="badge-pill inline-flex items-center gap-2 rounded-pill py-[7px] pl-3 pr-4 text-[13.5px] font-semibold shadow-[0_6px_16px_-8px_rgba(11,43,28,0.25)]"
          >
            <Image src="/cuocces.png" alt="" width={19} height={20} className="h-[19px] w-[18px]" />
            {t.onboarding.badge}
          </motion.span>

          <div className="relative mt-5">
            <motion.div
              aria-hidden
              className="hero-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[190px] w-[560px] max-w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              animate={reduce ? undefined : { opacity: [0.65, 1, 0.65], scale: [1, 1.08, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.h2
              initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: [0.22, 0.9, 0.3, 1] }}
              className="font-display text-[26px] font-extrabold leading-[1.2] tracking-[-0.01em] text-ink sm:text-[34px] lg:text-[40px]"
            >
              {t.onboarding.title}
            </motion.h2>
          </div>

          {/* Bosqich hisoblagichi */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 inline-flex items-center gap-2.5 rounded-pill border border-[color:var(--glass-border)] bg-surface/70 py-2 pl-2.5 pr-4 shadow-[0_10px_24px_-18px_rgba(11,43,28,0.6)] backdrop-blur"
          >
            <span className="grid h-[26px] w-[26px] place-items-center rounded-full bg-[linear-gradient(150deg,#7FE7B4,#17A468)]">
              <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="none">
                <path d="M5 12.6l4.6 4.6L19 7.4" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="font-display text-[13.5px] font-bold text-ink">
              <motion.span key={done} className="inline-block text-brand-600">
                {done}
              </motion.span>
              <span className="text-mute"> / {STAGES.length}</span> {t.onboarding.opened}
            </span>
          </motion.div>
        </div>

        {/* ===== Rels + bosqichlar ===== */}
        <motion.div
          ref={railRef}
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative mt-10 sm:mt-14"
        >
          {/* Gorizontal rels — lg va undan katta ekranlarda */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[7.8%] right-[7.8%] top-[27px] hidden h-[5px] rounded-pill bg-line/80 lg:block"
          >
            <motion.span
              className="absolute inset-y-0 left-0 origin-left rounded-pill bg-[linear-gradient(90deg,#86E0A5,#2CC176_45%,#12855A)]"
              style={{ width: sparkX, opacity: railOpacity }}
            />
            {/* Toʻlish boshidagi uchqun */}
            <motion.span
              className="absolute top-1/2 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface shadow-[0_0_0_4px_rgba(79,209,137,0.35),0_6px_14px_-4px_rgba(23,164,104,0.9)]"
              style={{ left: sparkX, opacity: railOpacity }}
            >
              <motion.span
                className="absolute inset-[3px] rounded-full bg-[linear-gradient(150deg,#7FE7B4,#17A468)]"
                animate={reduce ? undefined : { scale: [1, 0.78, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.span>
          </div>

          {/* Bosqichlar */}
          <div className="relative grid gap-4 sm:gap-5 lg:grid-cols-6 lg:items-stretch lg:gap-4">
            {STAGES.map((stage, i) => (
              <motion.div
                key={stage.n}
                variants={itemVariants}
                className="relative flex items-start gap-4 lg:h-full lg:flex-col lg:items-center lg:gap-4"
              >
                {i < LAST && <RailSegment progress={progress} index={i} />}
                <StageNode stage={stage} open={i < done} />
                <StageCard stage={stage} text={t.onboarding.stages[i]} open={i < done} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ===== Qoʻshimcha matn ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card mx-auto mt-10 flex max-w-[900px] flex-col items-start gap-4 rounded-[22px] px-5 py-4 sm:mt-14 sm:flex-row sm:items-center sm:px-6 sm:py-5"
        >
          <span
            aria-hidden
            className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-[linear-gradient(150deg,#DFF8E9,#A9E9C4)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_16px_-10px_rgba(15,64,40,0.6)]"
          >
            <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="none">
              <path d="M5 13.4l4 4 10-10.8" stroke="#12855A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>

          <p className="flex-1 text-[13px] leading-[1.65] text-body sm:text-[14px]">
            {t.onboarding.note}
          </p>

          <div className="flex shrink-0 flex-wrap gap-2">
            {[
              ["Ketma-ket tartib", "M5 12h14M13 6l6 6-6 6"],
              ["Maʼlumotlar saqlanadi", "M6 4.6h8.4L19 9.2v10.2H6V4.6Z"],
            ].map(([label, d]) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-pill border border-[color:var(--glass-border)] bg-surface/70 px-3 py-1.5 text-[11.5px] font-semibold text-ink backdrop-blur"
              >
                <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="none">
                  <path d={d} stroke="#1BA463" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
