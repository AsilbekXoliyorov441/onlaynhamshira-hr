"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type SVGProps,
} from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useT } from "@/lib/i18n/LanguageProvider";
import {
  AcceptDecline3D,
  BellNew3D,
  CompleteBadge3D,
  HistoryList3D,
  MapPinCare3D,
  PhoneCall3D,
  ProfileStar3D,
  StartService3D,
} from "./HowItWorksIcons";
import {
  ScreenAccept,
  ScreenAddress,
  ScreenCall,
  ScreenDone,
  ScreenHistory,
  ScreenOrders,
  ScreenProfile,
  ScreenStart,
} from "./PhoneScreens";

/* Bir qadam ekranda necha millisekund turadi */
const AUTOPLAY_MS = 5200;

/** Matnlar lugʻatdan (t.howitworks.steps) shu tartibda olinadi */
type Step = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Faol qadamning asosiy rangi */
  tone: string;
  /** Kartochka ostidagi yumshoq aura */
  glow: string;
  screen: ComponentType;
};

const STEPS: Step[] = [
  {
    icon: BellNew3D,
    tone: "#E9962B",
    glow: "rgba(255,200,92,0.34)",
    screen: ScreenOrders,
  },
  {
    icon: AcceptDecline3D,
    tone: "#159C66",
    glow: "rgba(79,209,137,0.32)",
    screen: ScreenAccept,
  },
  {
    icon: MapPinCare3D,
    tone: "#1478B4",
    glow: "rgba(31,182,232,0.30)",
    screen: ScreenAddress,
  },
  {
    icon: PhoneCall3D,
    tone: "#128A57",
    glow: "rgba(44,193,118,0.32)",
    screen: ScreenCall,
  },
  {
    icon: StartService3D,
    tone: "#0F8F5D",
    glow: "rgba(99,219,161,0.34)",
    screen: ScreenStart,
  },
  {
    icon: CompleteBadge3D,
    tone: "#0E8154",
    glow: "rgba(76,206,141,0.32)",
    screen: ScreenDone,
  },
  {
    icon: HistoryList3D,
    tone: "#5E7A6D",
    glow: "rgba(155,203,178,0.32)",
    screen: ScreenHistory,
  },
  {
    icon: ProfileStar3D,
    tone: "#2A7FB6",
    glow: "rgba(255,201,79,0.32)",
    screen: ScreenProfile,
  },
];

/* ===== Animatsiya sxemalari ===== */

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 26, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 130, damping: 18, mass: 0.8 },
  },
};

/* ===== Qadam kartochkasi ===== */

function StepCard({
  step,
  text,
  index,
  active,
  playing,
  onSelect,
}: {
  step: Step;
  text: { title: string; text: string };
  index: number;
  active: boolean;
  playing: boolean;
  onSelect: () => void;
}) {
  const reduce = useReducedMotion();
  const Icon = step.icon;

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(180px 180px at ${mx}% ${my}%, ${step.glow}, rgba(255,255,255,0) 70%)`;

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width) * 100);
      my.set(((e.clientY - r.top) / r.height) * 100);
    },
    [mx, my]
  );

  return (
    <motion.button
      type="button"
      variants={itemVariants}
      onClick={onSelect}
      onMouseMove={reduce ? undefined : onMove}
      whileHover={reduce ? undefined : { x: 6 }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      aria-current={active}
      className={`group relative w-full overflow-hidden rounded-[20px] p-3 text-left transition-colors duration-500 sm:p-3.5 ${
        active ? "glass-card" : "border border-transparent hover:border-[color:var(--glass-border)]"
      }`}
    >
      {/* Kursor yorugʻligi */}
      <motion.span
        aria-hidden
        style={{ backgroundImage: spotlight }}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Faol kartochka halqasi */}
      <span
        aria-hidden
        style={{
          boxShadow: active
            ? `inset 0 0 0 1px ${step.tone}55, 0 22px 44px -26px ${step.tone}`
            : "none",
        }}
        className="pointer-events-none absolute inset-0 z-0 rounded-[20px] transition-shadow duration-500"
      />

      <div className="relative z-[1] flex items-start gap-3">
        {/* Tartib raqami + ikonka */}
        <span className="relative shrink-0">
          <motion.span
            aria-hidden
            className="absolute inset-[-6px] rounded-full"
            style={{
              background: `radial-gradient(50% 50% at 50% 50%, ${step.glow}, rgba(255,255,255,0) 70%)`,
            }}
            animate={
              active && !reduce ? { opacity: [0.5, 1, 0.5], scale: [0.94, 1.08, 0.94] } : { opacity: 0 }
            }
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            animate={active && !reduce ? { y: [0, -3, 0] } : { y: 0 }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative block"
          >
            <Icon className="h-[42px] w-[42px] sm:h-[46px] sm:w-[46px]" />
          </motion.span>
          <span
            className="absolute -right-1 -top-1 grid h-[18px] w-[18px] place-items-center rounded-full font-display text-[10px] font-extrabold text-white shadow-[0_4px_10px_-4px_rgba(11,43,28,0.7)] transition-colors duration-500"
            style={{ background: active ? step.tone : "var(--dot-idle)" }}
          >
            {index + 1}
          </span>
        </span>

        <div className="min-w-0 flex-1 pt-0.5">
          <h3
            className="font-display text-[14px] font-extrabold leading-[1.3] transition-colors duration-500 sm:text-[15px]"
            style={{ color: active ? "rgb(var(--c-ink))" : "rgb(var(--c-body))" }}
          >
            {text.title}
          </h3>

          {/* Tavsif faqat faol qadamda ochiladi */}
          <AnimatePresence initial={false}>
            {active && (
              <motion.p
                key="desc"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 0.9, 0.3, 1] }}
                className="overflow-hidden text-[12.5px] leading-[1.6] text-body sm:text-[13.5px]"
              >
                <span className="mt-1.5 block">{text.text}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Avtomatik almashish progressi */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-3 bottom-[6px] z-[1] h-[3px] overflow-hidden rounded-pill bg-line/70"
        style={{ opacity: active ? 1 : 0 }}
      >
        <motion.span
          key={`${index}-${active}-${playing}`}
          className="block h-full w-full origin-left rounded-pill"
          style={{ background: `linear-gradient(90deg, ${step.tone}66, ${step.tone})` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: active && playing && !reduce ? 1 : active ? 1 : 0 }}
          transition={
            active && playing && !reduce
              ? { duration: AUTOPLAY_MS / 1000, ease: "linear" }
              : { duration: 0.25 }
          }
        />
      </span>
    </motion.button>
  );
}

/* ===== Telefon mockupi ===== */

function PhoneFrame({ index }: { index: number }) {
  const reduce = useReducedMotion();
  const Screen = STEPS[index].screen;

  /* Sichqoncha ortidan yengil 3D qiyalik */
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry.set(px * 14);
      rx.set(-py * 12);
    },
    [rx, ry]
  );

  const onLeave = useCallback(() => {
    rx.set(0);
    ry.set(0);
  }, [rx, ry]);

  const glare = useTransform(ry, [-14, 14], [0.05, 0.4]);

  return (
    <div
      className="relative mx-auto w-full max-w-[320px]"
      style={{ perspective: 1200 }}
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={reduce ? undefined : onLeave}
    >
      {/* Telefon ortidagi nur */}
      <motion.div
        aria-hidden
        className="decor-glow pointer-events-none absolute inset-[6%] rounded-[60px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(79,209,137,0.55),rgba(79,209,137,0)_70%)] blur-2xl"
        animate={reduce ? undefined : { opacity: [0.6, 1, 0.6], scale: [0.96, 1.06, 0.96] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Korpus */}
        <div className="relative rounded-[42px] bg-[image:var(--phone-frame)] p-[9px] shadow-[0_46px_70px_-34px_rgba(11,43,28,0.55),0_18px_34px_-20px_rgba(11,43,28,0.35)]">
          <div className="rounded-[34px] bg-[#0B2B1C] p-[3px]">
            <div className="relative aspect-[9/18.6] overflow-hidden rounded-[32px] bg-surface">
              {/* Status bar */}
              <div className="relative z-[2] flex items-center justify-between px-4 pt-2.5 text-[9px] font-bold text-ink">
                <span>09:41</span>
                <span className="flex items-center gap-1">
                  <svg viewBox="0 0 18 12" className="h-[8px] w-[12px]" fill="#0B2B1C">
                    <rect x="0" y="7" width="3" height="5" rx="1" />
                    <rect x="5" y="4.5" width="3" height="7.5" rx="1" />
                    <rect x="10" y="2" width="3" height="10" rx="1" />
                    <rect x="15" y="0" width="3" height="12" rx="1" opacity="0.35" />
                  </svg>
                  <svg viewBox="0 0 24 12" className="h-[8px] w-[16px]" fill="none">
                    <rect x="0.8" y="1.6" width="18" height="8.8" rx="2.6" stroke="#0B2B1C" strokeWidth="1.3" />
                    <rect x="2.6" y="3.4" width="12" height="5.2" rx="1.4" fill="#2CC176" />
                    <path d="M21 4.6v3.2" stroke="#0B2B1C" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </div>

              {/* Notch */}
              <span
                aria-hidden
                className="absolute left-1/2 top-0 z-[3] h-[20px] w-[92px] -translate-x-1/2 rounded-b-[13px] bg-[#0B2B1C]"
              />

              {/* Ilova sarlavhasi */}
              <div className="relative z-[2] mt-2 flex items-center gap-2 border-b border-line/80 px-3.5 pb-2">
                <span className="grid h-6 w-6 place-items-center rounded-[8px] bg-[linear-gradient(150deg,#7FE7B4,#17A468)]">
                  <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="none">
                    <path d="M12 5.5v13M5.5 12h13" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="font-display text-[10px] font-extrabold text-ink">
                  Onlayn Hamshira <span className="text-brand-600">Mutaxassis</span>
                </span>
              </div>

              {/* Almashuvchi ekran */}
              <div className="relative z-[1] h-[calc(100%-92px)] px-3.5 pt-2.5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 26, filter: "blur(6px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -22, filter: "blur(6px)" }}
                    transition={{ duration: 0.42, ease: [0.22, 0.9, 0.3, 1] }}
                    className="h-full"
                  >
                    <Screen />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Pastki navigatsiya */}
              <div className="absolute inset-x-0 bottom-0 z-[2] border-t border-line/80 bg-surface/90 px-5 pb-2.5 pt-2 backdrop-blur">
                <div className="flex items-center justify-between">
                  {[0, 1, 2].map((t) => {
                    const on =
                      (t === 0 && index < 3) || (t === 1 && index >= 3 && index < 6) || (t === 2 && index >= 6);
                    return (
                      <span
                        key={t}
                        className="h-[5px] rounded-pill transition-all duration-500"
                        style={{
                          width: on ? 22 : 12,
                          background: on ? "#2CC176" : "var(--dot-idle)",
                        }}
                      />
                    );
                  })}
                </div>
                <span
                  aria-hidden
                  className="mx-auto mt-2 block h-[3px] w-[74px] rounded-pill bg-[color:var(--dot-idle)]"
                />
              </div>

              {/* Shishadagi yaltiroq */}
              <motion.span
                aria-hidden
                style={{ opacity: glare }}
                className="pointer-events-none absolute -inset-y-10 left-[-30%] z-[4] w-[52%] rotate-[18deg] bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.85),rgba(255,255,255,0))]"
              />
            </div>
          </div>
        </div>

        {/* Yon tugmalar */}
        <span aria-hidden className="absolute -left-[3px] top-[22%] h-9 w-[3px] rounded-pill bg-[color:var(--phone-side)]" />
        <span aria-hidden className="absolute -left-[3px] top-[33%] h-14 w-[3px] rounded-pill bg-[color:var(--phone-side)]" />
        <span aria-hidden className="absolute -right-[3px] top-[26%] h-16 w-[3px] rounded-pill bg-[color:var(--phone-side)]" />
      </motion.div>
    </div>
  );
}

/* ===== Boʻlim ===== */

export default function HowItWorks() {
  const t = useT();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3 });

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const playing = inView && !paused && !reduce;

  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % STEPS.length), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, playing]);

  const select = useCallback((i: number) => {
    setActive(i);
  }, []);

  return (
    <section
      ref={ref}
      id="qanday-ishlaydi"
      className="section-page relative scroll-mt-24 overflow-hidden pb-24 pt-16 sm:pb-32 sm:pt-24"
    >
      {/* ===== Fon nurlari ===== */}
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute -inset-x-[10%] bottom-[6%] top-[8%] bg-[radial-gradient(56%_52%_at_56%_44%,rgba(79,209,137,0.28),rgba(79,209,137,0)_72%)]"
      />
      <motion.div
        aria-hidden
        className="decor-glow pointer-events-none absolute -right-[10%] top-[14%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(79,209,137,0.44),rgba(79,209,137,0)_70%)] blur-2xl"
        animate={reduce ? undefined : { x: [0, -34, 0], y: [0, 26, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="decor-glow pointer-events-none absolute -left-[12%] top-[8%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(31,182,232,0.28),rgba(31,182,232,0)_70%)] blur-2xl"
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, -22, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />
      <motion.div
        aria-hidden
        className="decor-glow pointer-events-none absolute bottom-[-10%] left-[22%] h-[420px] w-[620px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(44,193,118,0.32),rgba(44,193,118,0)_72%)] blur-2xl"
        animate={reduce ? undefined : { x: [0, -26, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 23, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />

      {/* ===== Suyuq tomchilar ===== */}
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute left-[5%] top-[28%] hidden h-[18px] w-[18px] animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.9)_0%,rgba(190,230,60,0.5)_38%,rgba(79,209,137,0.6)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.16)] sm:block"
        style={{ animationDuration: "5.6s" }}
      />
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute bottom-[24%] right-[7%] hidden h-4 w-4 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.85)_0%,rgba(155,221,244,0.5)_38%,rgba(31,146,201,0.5)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.14)] blur-[1px] sm:block"
        style={{ animationDelay: "1.8s", animationDuration: "6.4s" }}
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
            {t.howitworks.badge}
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
              {t.howitworks.title}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-4 max-w-[640px] text-[14px] leading-[1.65] text-body sm:text-[15.5px]"
          >
            {t.howitworks.leadStart}
            <span className="font-semibold text-ink">{t.howitworks.leadBold}</span>
            {t.howitworks.leadEnd}
          </motion.p>
        </div>

        {/* ===== Telefon + qadamlar ===== */}
        <div
          className="mt-10 grid items-center gap-10 sm:mt-14 lg:grid-cols-[minmax(0,42%)_minmax(0,58%)] lg:gap-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            className="order-1 lg:order-none"
          >
            <PhoneFrame index={active} />

            {/* Ekran ostidagi qadam nuqtalari */}
            <div className="mt-6 flex items-center justify-center gap-1.5">
              {STEPS.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => select(i)}
                  aria-label={`${t.howitworks.stepLabel} ${i + 1}: ${t.howitworks.steps[i].title}`}
                  className="h-[7px] rounded-pill transition-all duration-500 hover:opacity-80"
                  style={{
                    width: i === active ? 26 : 8,
                    background: i === active ? s.tone : "var(--dot-idle)",
                  }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="order-2 flex flex-col gap-1 lg:order-none"
          >
            {STEPS.map((step, i) => (
              <StepCard
                key={i}
                step={step}
                text={t.howitworks.steps[i]}
                index={i}
                active={i === active}
                playing={playing}
                onSelect={() => select(i)}
              />
            ))}
          </motion.div>
        </div>

        {/* ===== CTA ===== */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 flex flex-col items-center gap-3 sm:mt-16"
        >
          <motion.a
            href="#"
            whileHover={reduce ? undefined : { scale: 1.05, y: -3 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="btn-primary group relative inline-flex items-center gap-2.5 overflow-hidden rounded-pill px-8 py-[14px] font-display text-[15px] font-bold text-onbrand sm:text-[16px]"
          >
            {/* Tugma boʻylab oʻtuvchi yaltiroq */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-y-6 -left-1/2 w-1/3 -translate-x-full rotate-[18deg] bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.8),rgba(255,255,255,0))] transition-transform duration-[900ms] ease-out group-hover:translate-x-[520%]"
            />
            <span className="relative">{t.howitworks.cta}</span>
            <motion.span
              aria-hidden
              className="relative grid h-[26px] w-[26px] place-items-center rounded-full bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
              animate={reduce ? undefined : { x: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none">
                <path
                  d="M5 12h13M12.5 6l6 6-6 6"
                  stroke="#0B2B1C"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          </motion.a>

          <p className="text-[12.5px] font-medium text-mute sm:text-[13.5px]">
            {t.howitworks.ctaNote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
