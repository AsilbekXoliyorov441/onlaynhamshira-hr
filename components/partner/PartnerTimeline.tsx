"use client";

import { useLayoutEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import styles from "./PartnerTimeline.module.css";
import {
  IntroIcon,
  QualificationIcon,
  EducationIcon,
  MotivationIcon,
  AppLessonsIcon,
  RegisterIcon,
  OrderIcon,
} from "./PartnerIcons";
import { useT } from "@/lib/i18n/LanguageProvider";

/** Bosqichning oʻzgarmas qismi — matnlar lugʻatdan (t.partner.steps) keladi */
export type TimelineStep = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  side: "left" | "right";
};

type StepText = { title: string; bracket?: string; text: string };

const STEPS: TimelineStep[] = [
  {
    icon: IntroIcon,
    side: "left",
  },
  {
    icon: QualificationIcon,
    side: "right",
  },
  {
    icon: EducationIcon,
    side: "left",
  },
  {
    icon: MotivationIcon,
    side: "right",
  },
  {
    icon: AppLessonsIcon,
    side: "left",
  },
  {
    icon: RegisterIcon,
    side: "right",
  },
  {
    icon: OrderIcon,
    side: "left",
  },
];

const cardVariants: Variants = {
  hidden: (side: "left" | "right") => ({
    opacity: 0,
    x: side === "left" ? -56 : 56,
    y: 20,
    scale: 0.96,
    filter: "blur(8px)",
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 90, damping: 18, mass: 0.9 },
  },
};

export default function PartnerTimeline({ steps = STEPS }: { steps?: TimelineStep[] }) {
  const t = useT();
  const { title, subtitle, kicker } = t.partner;
  const texts = t.partner.steps;
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const tubeRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [thresholds, setThresholds] = useState<number[]>([]);
  const [filledCount, setFilledCount] = useState(0);

  // Suyuqlik naychaning boshidan oxirigacha oqishi uchun scroll progressi
  // ("end end" — section sahifaning oxirgi qismi boʻlsa ham progress har doim 1 ga yetadi)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end end"],
  });

  const level = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    restDelta: 0.001,
  });

  const fillHeight = useTransform(level, (v) => `${Math.min(1, Math.max(0, v)) * 100}%`);

  // Har bir raqamning naycha bo'yicha aniq nuqtasini o'lchaymiz
  useLayoutEffect(() => {
    const measure = () => {
      const tube = tubeRef.current;
      if (!tube) return;
      const tubeRect = tube.getBoundingClientRect();
      if (tubeRect.height === 0) return;
      setThresholds(
        nodeRefs.current.map((el) => {
          if (!el) return 1;
          const r = el.getBoundingClientRect();
          return (r.top + r.height / 2 - tubeRect.top) / tubeRect.height;
        }),
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (sectionRef.current) ro.observe(sectionRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [steps.length]);

  useMotionValueEvent(level, "change", (v) => {
    if (reduceMotion) return;
    // Oxirgi tugunga koʻproq tolerantlik — turli ekran balandliklarida ham 7-bosqichga yetsin
    const count = thresholds.filter((t, idx) => {
      const buffer = idx === thresholds.length - 1 ? 0.06 : 0.01;
      return v >= t - buffer;
    }).length;
    setFilledCount((prev) => (prev === count ? prev : count));
  });

  const isFilled = (index: number) => (reduceMotion ? true : index < filledCount);
  // Oxirgi (7-) qadam to'lgach — suyuqlik to'liq va bayramona rangga o'tadi
  const allDone = isFilled(steps.length - 1);

  return (
    <section id="hamkorlik-jarayoni" className={styles.section} ref={sectionRef}>
      {/* Oldingi (Prefers) sectiondan davom etuvchi yashil "toʻyinish" — chegara bilinmasligi uchun */}
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute -inset-x-[12%] -top-[2%] h-[45%] bg-[radial-gradient(80%_100%_at_50%_0%,rgba(79,209,137,0.68),rgba(79,209,137,0)_78%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-[6%] top-0 h-[22%] bg-[linear-gradient(to_bottom,rgba(79,209,137,0.35),rgba(79,209,137,0)_100%)]"
      />
      {/* Oldingi sectionlar bilan bogʻlanib ketuvchi yashil-koʻk glow'lar */}
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute -left-[10%] -top-[12%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(79,209,137,0.4),rgba(79,209,137,0)_70%)] blur-2xl"
      />
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute -right-[8%] top-[16%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(31,182,232,0.3),rgba(31,182,232,0)_70%)] blur-2xl"
      />
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute bottom-[-8%] left-[28%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(44,193,118,0.32),rgba(44,193,118,0)_70%)] blur-2xl"
      />
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute bottom-[10%] right-[6%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(190,230,60,0.26),rgba(190,230,60,0)_70%)] blur-2xl"
      />
      {/* Yuqori chetni bazaviy rangga tekislaydi — Prefers bilan qattiq
          chiziqsiz tutashishi uchun (yuqoridagi glow qatlamlarini yopadi).
          Keng oq zona: chegara ustida ~1/3 qismi toʻliq oq, keyin sekin soʻnadi */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[280px] fade-top-long sm:h-[400px]"
      />

      <header className={styles.header}>
        <m.h2
          className={styles.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {title} <span className={styles.titleSoft}>({subtitle})</span>
        </m.h2>
        <m.p
          className={styles.kicker}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {kicker}
        </m.p>
      </header>

      <div className={styles.timeline}>
        {/* naycha + suyuqlik */}
        <div className={styles.tube} ref={tubeRef} aria-hidden>
          <m.div className={styles.liquid} data-complete={allDone} style={{ height: fillHeight }}>
            <span className={styles.surface} />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i} className={styles.bubble} data-i={i} />
            ))}
          </m.div>
        </div>

        {steps.map((step, i) => {
          const filled = isFilled(i);
          const isLast = i === steps.length - 1;
          return (
            <div className={styles.row} key={i} data-side={step.side}>
              <div className={styles.cell} data-active={step.side === "left"}>
                {step.side === "left" && (
                  <Card
                    step={step}
                    text={texts[i]}
                    index={i}
                    filled={filled}
                    celebrate={isLast && filled}
                  />
                )}
              </div>

              <div className={styles.nodeCell}>
                <m.div
                  className={styles.node}
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  data-filled={filled}
                  data-final={isLast}
                  animate={
                    filled
                      ? {
                          scale: isLast ? [1, 1.4, 1] : [1, 1.25, 1],
                          boxShadow: isLast
                            ? "0 10px 30px rgba(255,196,64,0.55)"
                            : "0 6px 20px rgba(31,182,232,0.35)",
                        }
                      : { scale: 1, boxShadow: "0 2px 8px rgba(21,37,70,0.08)" }
                  }
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <span>{i + 1}</span>
                  {filled && <m.span className={styles.pulse} data-final={isLast} aria-hidden />}
                </m.div>
              </div>

              <div className={styles.cell} data-active={step.side === "right"}>
                {step.side === "right" && (
                  <Card
                    step={step}
                    text={texts[i]}
                    index={i}
                    filled={filled}
                    celebrate={isLast && filled}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Card({
  step,
  text,
  index,
  filled,
  celebrate = false,
}: {
  step: TimelineStep;
  text: StepText;
  index: number;
  filled: boolean;
  celebrate?: boolean;
}) {
  return (
    <m.article
      className={styles.card}
      data-celebrate={celebrate}
      custom={step.side}
      variants={cardVariants}
      initial="hidden"
      animate={filled ? "visible" : "hidden"}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <m.div
        className={styles.icon}
        data-celebrate={celebrate}
        initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
        animate={filled ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0.6, opacity: 0, rotate: -8 }}
        transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.12 }}
      >
        <step.icon className={styles.iconImg} />
      </m.div>

      <div className={styles.body}>
        <h3 className={styles.cardTitle}>
          {index + 1}. {text.title}{" "}
          {text.bracket && <span className={styles.bracket}>({text.bracket})</span>}
        </h3>
        <p className={styles.cardText}>{text.text}</p>
      </div>
    </m.article>
  );
}
