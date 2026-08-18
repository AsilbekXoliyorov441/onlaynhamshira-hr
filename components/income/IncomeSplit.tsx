"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";

/* ===== Ulushlar ===== */

const SPECIALIST = 70;
const PLATFORM = 30;

/** Halqadagi yoylar orasidagi kichik boʻshliq (pathLength birligida) */
const GAP = 0.012;

/** Platforma ulushi nimalarga sarflanadi */
const PLATFORM_COSTS = [
  "Yangi mijozlarni jalb qilish",
  "Tizimni rivojlantirish",
  "Texnik xizmat va support",
  "Buyurtmalarni boshqarish",
];

/* ===== Animatsiya sxemalari ===== */

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.18 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.95, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 110, damping: 18, mass: 0.85 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 0.9, 0.3, 1] },
  },
};

/* ===== Raqamni 0 dan sanab chiqaruvchi hook ===== */

function useCountUp(target: number, active: boolean, duration = 1.5) {
  const reduce = useReducedMotion();
  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) => Math.round(v));

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      value.set(target);
      return;
    }
    const controls = animate(value, target, {
      duration,
      ease: [0.22, 0.9, 0.3, 1],
    });
    return () => controls.stop();
  }, [active, duration, reduce, target, value]);

  return rounded;
}

/* ===== Halqa diagramma ===== */

function SplitDonut({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const count = useCountUp(SPECIALIST, active);

  const arc = {
    initial: { pathLength: 0 },
    transition: {
      duration: 1.5,
      ease: [0.22, 0.9, 0.3, 1] as const,
      delay: 0.15,
    },
  };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[330px] sm:max-w-[380px]">
      {/* Halqa ortidagi yumshoq nur */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(79,209,137,0.42),rgba(79,209,137,0)_70%)] blur-2xl"
        animate={reduce ? undefined : { opacity: [0.6, 1, 0.6], scale: [0.96, 1.06, 0.96] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg viewBox="0 0 260 260" className="relative h-full w-full">
        <defs>
          <linearGradient id="dsplit-specialist" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#86E0A5" />
            <stop offset="55%" stopColor="#4FD189" />
            <stop offset="100%" stopColor="#1BA463" />
          </linearGradient>
          <linearGradient id="dsplit-platform" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9BDDF4" />
            <stop offset="100%" stopColor="#1B92C9" />
          </linearGradient>
          <filter id="dsplit-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="10"
              floodColor="#0B2B1C"
              floodOpacity="0.16"
            />
          </filter>
        </defs>

        {/* Asos halqa */}
        <circle
          cx="130"
          cy="130"
          r="102"
          fill="none"
          stroke="#E4EDE7"
          strokeWidth="26"
          opacity="0.65"
        />

        <g filter="url(#dsplit-shadow)">
          {/* Mutaxassis ulushi — 70% */}
          <motion.circle
            cx="130"
            cy="130"
            r="102"
            fill="none"
            stroke="url(#dsplit-specialist)"
            strokeWidth="26"
            strokeLinecap="round"
            style={{ rotate: -90, transformOrigin: "130px 130px" }}
            initial={arc.initial}
            whileInView={{ pathLength: SPECIALIST / 100 - GAP }}
            viewport={{ once: true, amount: 0.5 }}
            transition={arc.transition}
          />

          {/* Platforma ulushi — 30% */}
          <motion.circle
            cx="130"
            cy="130"
            r="102"
            fill="none"
            stroke="url(#dsplit-platform)"
            strokeWidth="26"
            strokeLinecap="round"
            style={{
              rotate: -90 + (SPECIALIST / 100 + GAP) * 360,
              transformOrigin: "130px 130px",
            }}
            initial={arc.initial}
            whileInView={{ pathLength: PLATFORM / 100 - GAP }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...arc.transition, delay: 0.75 }}
          />
        </g>
      </svg>

      {/* Markazdagi raqam */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="flex items-baseline justify-center font-display text-[46px] font-extrabold leading-none tracking-[-0.02em] text-ink sm:text-[56px]">
            <motion.span>{count}</motion.span>
            <span className="text-brand-600">%</span>
          </div>
          <p className="mt-1.5 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-mute sm:text-[13px]">
            mutaxassisga
          </p>
        </div>
      </div>

      {/* Halqa boʻylab pulsatsiya */}
      {!reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-[12%] rounded-full ring-1 ring-brand-300"
          animate={{ scale: [1, 1.12], opacity: [0.5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
        />
      )}
    </div>
  );
}

/* ===== Ulush kartochkasi ===== */

type ShareCardProps = {
  value: number;
  label: string;
  desc: string;
  accent: string;
  tone: string;
  ring: string;
  active: boolean;
  children?: React.ReactNode;
};

function ShareCard({
  value,
  label,
  desc,
  accent,
  tone,
  ring,
  active,
  children,
}: ShareCardProps) {
  const reduce = useReducedMotion();
  const count = useCountUp(value, active);

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(240px 240px at ${mx}% ${my}%, ${accent}, rgba(255,255,255,0) 68%)`;

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
      variants={cardVariants}
      whileHover={reduce ? undefined : { y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onMouseMove={reduce ? undefined : onMove}
      className="glass-card group relative overflow-hidden rounded-[26px] p-5 sm:p-6"
    >
      {/* Kursor yorugʻligi */}
      <motion.span
        aria-hidden
        style={{ backgroundImage: spotlight }}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Shisha boʻylab oʻtuvchi yaltiroq chiziq */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-y-8 -left-1/2 z-0 w-1/2 -translate-x-full rotate-[18deg] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.75)_50%,rgba(255,255,255,0)_100%)] opacity-0 transition-all duration-[900ms] ease-out group-hover:translate-x-[320%] group-hover:opacity-100"
      />

      {/* Hover halqasi */}
      <span
        aria-hidden
        style={{ boxShadow: ring }}
        className="pointer-events-none absolute inset-0 z-0 rounded-[26px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative z-[1] flex items-center gap-4">
        <div className="flex items-baseline font-display text-[34px] font-extrabold leading-none tracking-[-0.02em] text-ink sm:text-[40px]">
          <motion.span>{count}</motion.span>
          <span style={{ color: tone }}>%</span>
        </div>
        <div className="h-9 w-px shrink-0 bg-line" aria-hidden />
        <h3 className="font-display text-[16px] font-extrabold leading-[1.25] text-ink sm:text-[17px]">
          {label}
        </h3>
      </div>

      <p className="relative z-[1] mt-3 text-[13.5px] leading-[1.6] text-body sm:text-[14.5px]">
        {desc}
      </p>

      {children}
    </motion.article>
  );
}

/* ===== Boʻlim ===== */

export default function IncomeSplit() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      id="daromad"
      className="relative scroll-mt-24 overflow-hidden pb-24 pt-16 sm:pb-32 sm:pt-24"
      style={{ backgroundColor: "#fbfdfb" }}
    >
      {/* ===== Fon nurlari ===== */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-[10%] bottom-[6%] top-[8%] bg-[radial-gradient(58%_54%_at_42%_46%,rgba(79,209,137,0.30),rgba(79,209,137,0)_72%)]"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-[18%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(79,209,137,0.46),rgba(79,209,137,0)_70%)] blur-2xl"
        animate={reduce ? undefined : { x: [0, 36, 0], y: [0, -24, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-[12%] top-[10%] h-[470px] w-[470px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(31,182,232,0.30),rgba(31,182,232,0)_70%)] blur-2xl"
        animate={reduce ? undefined : { x: [0, -30, 0], y: [0, 28, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[-8%] left-[30%] h-[440px] w-[600px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(44,193,118,0.36),rgba(44,193,118,0)_72%)] blur-2xl"
        animate={reduce ? undefined : { x: [0, 28, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
      />

      {/* ===== Suyuq tomchilar ===== */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[4%] top-[34%] hidden h-4 w-4 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.9)_0%,rgba(190,230,60,0.5)_38%,rgba(79,209,137,0.6)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.16)] sm:block"
        style={{ animationDuration: "5.2s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[20%] right-[6%] hidden h-5 w-5 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.85)_0%,rgba(155,221,244,0.5)_38%,rgba(31,146,201,0.5)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.14)] blur-[1px] sm:block"
        style={{ animationDelay: "2.2s", animationDuration: "6.2s" }}
      />

      {/* Qoʻshni boʻlimlar bilan yumshoq tutashuv */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[linear-gradient(to_bottom,#fbfdfb_0%,#fbfdfb_26%,rgba(251,253,251,0.7)_52%,rgba(251,253,251,0)_100%)] sm:h-[300px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[200px] bg-[linear-gradient(to_top,#fbfdfb_0%,#fbfdfb_26%,rgba(251,253,251,0.7)_52%,rgba(251,253,251,0)_100%)] sm:h-[280px]"
      />

      <div className="relative z-[2] mx-auto max-w-[1240px] px-5 sm:px-8">
        {/* ===== Sarlavha ===== */}
        <div className="relative mx-auto max-w-[900px] text-center">
          <motion.span
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            className="badge-pill inline-flex items-center gap-2 rounded-pill py-[7px] pl-3 pr-4 text-[13.5px] font-semibold text-[#1F4433] shadow-[0_6px_16px_-8px_rgba(11,43,28,0.25)]"
          >
            <Image src="/cuocces.png" alt="" width={19} height={20} className="h-[19px] w-[18px]" />
            Daromad va komissiya
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
              DAROMAD QANDAY TAQSIMLANADI?
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-4 max-w-[640px] text-[14px] leading-[1.65] text-body sm:text-[15.5px]"
          >
            Har bir muvaffaqiyatli yakunlangan buyurtmadan tushgan mablagʻ quyidagi
            tartibda taqsimlanadi:
          </motion.p>
        </div>

        {/* ===== Diagramma + kartochkalar ===== */}
        <div className="mt-10 grid items-center gap-8 sm:mt-14 lg:grid-cols-[minmax(0,44%)_minmax(0,56%)] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
          >
            <SplitDonut active={inView} />
          </motion.div>

          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-4 sm:gap-5"
          >
            <ShareCard
              value={SPECIALIST}
              label="Mutaxassisga"
              desc="Buyurtmadan tushgan mablagʻning asosiy qismi bevosita xizmatni bajargan mutaxassisga tegishli."
              accent="rgba(79,209,137,0.30)"
              tone="#1BA463"
              ring="inset 0 0 0 1px rgba(79,209,137,0.55), 0 24px 50px -24px rgba(27,164,99,0.65)"
              active={inView}
            />

            <ShareCard
              value={PLATFORM}
              label="Platformaga"
              desc="Platforma ulushi quyidagi xarajatlar uchun ishlatiladi:"
              accent="rgba(31,182,232,0.28)"
              tone="#1B92C9"
              ring="inset 0 0 0 1px rgba(31,146,201,0.5), 0 24px 50px -24px rgba(27,146,201,0.6)"
              active={inView}
            >
              <motion.ul
                variants={listVariants}
                className="relative z-[1] mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-4"
              >
                {PLATFORM_COSTS.map((cost) => (
                  <motion.li
                    key={cost}
                    variants={itemVariants}
                    className="flex items-start gap-2 text-[13px] font-medium leading-[1.45] text-body sm:text-[13.5px]"
                  >
                    <span
                      aria-hidden
                      className="mt-[3px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-[linear-gradient(150deg,#E1F4FC,#A7DDF2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_10px_-6px_rgba(15,64,40,0.5)]"
                    >
                      <svg viewBox="0 0 24 24" className="h-[10px] w-[10px]" fill="none">
                        <path
                          d="M5 12.5l4.5 4.5L19 7.5"
                          stroke="#12678F"
                          strokeWidth="3.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {cost}
                  </motion.li>
                ))}
              </motion.ul>
            </ShareCard>
          </motion.div>
        </div>

        {/* ===== Qoʻshimcha izoh ===== */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card mx-auto mt-8 flex max-w-[860px] items-start gap-3 rounded-[22px] px-5 py-4 sm:mt-12 sm:px-6 sm:py-5"
        >
          <span
            aria-hidden
            className="mt-[2px] grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-[linear-gradient(150deg,#DFF8E9,#A9E9C4)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_14px_-8px_rgba(15,64,40,0.5)]"
          >
            <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none">
              <path
                d="M12 8.2v.2M12 11.4v4.6"
                stroke="#12855A"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="8.6" stroke="#12855A" strokeWidth="2" />
            </svg>
          </span>
          <p className="text-[13px] leading-[1.6] text-body sm:text-[14px]">
            Xizmat uchun toʻlov amaldagi platforma tartibi asosida amalga oshiriladi.
            Batafsil shartlar onboarding va roʻyxatdan oʻtish jarayonida koʻrsatiladi.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
