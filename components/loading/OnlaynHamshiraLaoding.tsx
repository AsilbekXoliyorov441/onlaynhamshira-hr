"use client";

import { useEffect, useId, useMemo, useState } from "react";
import styles from "./loading.module.css";
import { useT } from "@/lib/i18n/LanguageProvider";
const RADIUS = 150;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Bosqich chegaralari — matnlar lugʻatdan (t.loading.steps) olinadi */
const STEP_FROM = [0, 35, 70, 100];

function stepLabel(value: number, steps: readonly string[]): string {
  let label = steps[0];
  STEP_FROM.forEach((from, i) => {
    if (value >= from) label = steps[i];
  });
  return label;
}

export type OnlaynHamshiraLoaderProps = {
  /** 0–100. Berilmasa, komponent o'zi taxminiy progressni simulyatsiya qiladi. */
  progress?: number;
  /** Progress bosqichlari o'rniga o'z matningizni ko'rsatish uchun. */
  label?: string;
  /** Butun ekranni egallashi kerakmi (masalan app/loading.tsx uchun). */
  fullscreen?: boolean;
  className?: string;
};

export default function OnlaynHamshiraLoader({
  progress,
  label,
  fullscreen = true,
  className,
}: OnlaynHamshiraLoaderProps) {
  const t = useT();
  const uid = useId().replace(/:/g, "");
  const gradientId = `oh-gradient-${uid}`;
  const shadowId = `oh-shadow-${uid}`;
  const topArcId = `oh-top-${uid}`;
  const bottomArcId = `oh-bottom-${uid}`;

  const isControlled = typeof progress === "number";
  const [simulated, setSimulated] = useState(0);

  useEffect(() => {
    if (isControlled) return;
    let frame = 0;
    let value = 0;
    const tick = () => {
      // 90% gacha tez, keyin sekinlashadi — haqiqiy yuklash hissi uchun
      const step = value < 80 ? Math.random() * 2.2 + 0.4 : Math.random() * 0.6 + 0.15;
      value = Math.min(96, value + step);
      setSimulated(value);
      frame = window.setTimeout(tick, 60);
    };
    tick();
    return () => window.clearTimeout(frame);
  }, [isControlled]);

  /* Progressga bogʻliq boʻlmagan ogʻir SVG qismlari — har 60 ms'da qayta
     chizilmasin (yuklanish paytida CPU tejaladi) */
  const staticHead = useMemo(
    () => (
      <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3FCF6E" />
              <stop offset="55%" stopColor="#25C5C0" />
              <stop offset="100%" stopColor="#1FB6E8" />
            </linearGradient>
            <filter id={shadowId} x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#152546" floodOpacity="0.1" />
            </filter>
            <path id={topArcId} d="M 48 160 A 112 112 0 1 1 272 160" />
            <path id={bottomArcId} d="M 42 160 A 118 118 0 0 0 278 160" />
          </defs>

          <circle cx="160" cy="160" r={RADIUS} fill="var(--oh-disc)" filter={`url(#${shadowId})`} />
          <circle cx="160" cy="160" r={RADIUS} fill="none" stroke="var(--oh-track)" strokeWidth="6" />
      </>
    ),
    [gradientId, shadowId, topArcId, bottomArcId],
  );

  const staticTail = useMemo(
    () => (
      <>
          <g className={styles.ringText}>
            <text>
              <textPath href={`#${topArcId}`} startOffset="50%" textAnchor="middle">
                ONLAYN HAMSHIRA
              </textPath>
            </text>
            <text>
              <textPath href={`#${bottomArcId}`} startOffset="50%" textAnchor="middle">
                ONLAYN HAMSHIRA
              </textPath>
            </text>
            <circle cx="40" cy="160" r="4.5" fill={`url(#${gradientId})`} />
            <circle cx="280" cy="160" r="4.5" fill={`url(#${gradientId})`} />
          </g>

          <g transform="translate(160,160) scale(0.78) translate(-100,-104)">
            <path
              d="M 40 90 A 60 60 0 1 1 160 90 C 160 130 132 156 100 181 C 68 156 40 130 40 90 Z"
              fill={`url(#${gradientId})`}
            />
            <path
              d="M 66 106 C 66 83 80 72 100 89 C 120 72 134 83 134 106 C 134 131 119 146 100 146 C 81 146 66 131 66 106 Z"
              fill="#fff"
            />
            <g fill="none" stroke={`url(#${gradientId})`} strokeWidth="5.5" strokeLinecap="round">
              <path d="M 80 114 Q 87 104 94 114" />
              <path d="M 106 114 Q 113 104 120 114" />
            </g>
            <path
              d="M 60 63 L 67 33 Q 69 26 77 26 L 123 26 Q 131 26 133 33 L 140 63 Z"
              fill="#fff"
              stroke={`url(#${gradientId})`}
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <g fill={`url(#${gradientId})`}>
              <rect x="92" y="42" width="16" height="5" rx="2.5" />
              <rect x="97.5" y="36.5" width="5" height="16" rx="2.5" />
            </g>
          </g>
      </>
    ),
    [gradientId],
  );

  const value = Math.max(0, Math.min(100, isControlled ? (progress as number) : simulated));
  const text = label ?? stepLabel(value, t.loading.steps);

  return (
    <div
      className={[styles.root, fullscreen ? styles.fullscreen : "", className ?? ""]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
      aria-label={`${text} — ${Math.round(value)}%`}
    >
      <span className={`${styles.blob} ${styles.blob1}`} aria-hidden />
      <span className={`${styles.blob} ${styles.blob2}`} aria-hidden />
      <span className={`${styles.blob} ${styles.blob3}`} aria-hidden />
      <span className={`${styles.blob} ${styles.blob4}`} aria-hidden />

      <div className={styles.stage}>
        <svg className={styles.badge} viewBox="0 0 320 320" aria-hidden>
          {staticHead}

          <circle
            cx="160"
            cy="160"
            r={RADIUS}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="6"
            strokeLinecap="round"
            transform="rotate(-90 160 160)"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - value / 100)}
            className={styles.ring}
          />

          {staticTail}
        </svg>

        <div className={styles.meter}>
          <div className={styles.row}>
            <span className={styles.percent}>{Math.round(value)}%</span>
            <span className={styles.label}>{text}</span>
          </div>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${value}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}