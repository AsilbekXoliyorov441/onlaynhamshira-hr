"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import mapImg from "@/assets/region/region-map.png";
import iconArea from "@/assets/region/region-1-hudud.png";
import iconNear from "@/assets/region/region-2-yaqin.png";
import iconChoice from "@/assets/region/region-3-qaror.png";

type Point = { title: string; desc: string; icon: StaticImageData };

const POINTS: Point[] = [
  {
    title: "Hududlarni oʻzingiz belgilaysiz",
    desc: "Mutaxassis roʻyxatdan oʻtish vaqtida xizmat koʻrsatishi mumkin boʻlgan hududlarni belgilaydi.",
    icon: iconArea,
  },
  {
    title: "Yaqin buyurtmalar koʻrsatiladi",
    desc: "Platforma imkon qadar mutaxassisga mos va yaqin hududdagi buyurtmalarni koʻrsatadi.",
    icon: iconNear,
  },
  {
    title: "Qaror har doim sizniki",
    desc: "Buyurtmani qabul qilish yoki rad etish mutaxassisning oʻz qaroriga bogʻliq.",
    icon: iconChoice,
  },
];

/* ===== Animatsiya sxemalari ===== */

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 110, damping: 18 },
  },
};

/* ===== Xarita ustidagi marker ===== */

/** Uchi (0,0) nuqtada boʻlgan marker */
function Pin({
  x,
  y,
  scale = 1,
  fill,
  dim = false,
  delay = 0,
  float = true,
  reduce = false,
}: {
  x: number;
  y: number;
  scale?: number;
  fill: string;
  dim?: boolean;
  delay?: number;
  float?: boolean;
  reduce?: boolean;
}) {
  return (
    /* Joylashuv statik <g>'da — framer y/scale bilan transform atributini
       bekor qilib yubormasligi uchun */
    <g transform={`translate(${x} ${y})`}>
      <motion.g
        initial={{ opacity: 0, y: -26 }}
        whileInView={{ opacity: dim ? 0.45 : 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 260, damping: 14, delay }}
      >
        <motion.g
          animate={reduce || !float ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <g transform={`scale(${scale})`}>
            <ellipse cx="0" cy="1.5" rx="9" ry="3.2" fill="#0B4C30" opacity="0.2" />
            <path
              d="M0 0 C -6 -12 -14 -18 -14 -28 A14 14 0 1 1 14 -28 C14 -18 6 -12 0 0 Z"
              fill={fill}
              stroke="#ffffff"
              strokeWidth="2.4"
            />
            <circle cx="0" cy="-28" r="5.6" fill="#ffffff" />
          </g>
        </motion.g>
      </motion.g>
    </g>
  );
}

/* ===== Boʻlim ===== */

export default function Region() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Xarita kartasi uchun yumshoq parallaks
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [34, -34]);
  const mapY = useSpring(rawY, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <section
      id="ishlash-hududi"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden pb-24 pt-16 sm:pb-32 sm:pt-24"
      style={{ backgroundColor: "#fbfdfb" }}
    >
      {/* ===== Fon nurlari ===== */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-[10%] bottom-[6%] top-[8%] bg-[radial-gradient(58%_54%_at_46%_48%,rgba(79,209,137,0.3),rgba(79,209,137,0)_72%)]"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-[18%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(44,193,118,0.44),rgba(44,193,118,0)_70%)] blur-2xl"
        animate={reduce ? undefined : { x: [0, 36, 0], y: [0, -24, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-[8%] top-[10%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(31,182,232,0.3),rgba(31,182,232,0)_70%)] blur-2xl"
        animate={reduce ? undefined : { x: [0, -30, 0], y: [0, 26, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[8%] left-[38%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(190,230,60,0.22),rgba(190,230,60,0)_70%)] blur-2xl"
      />

      {/* ===== Suyuq tomchilar ===== */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[4%] top-[28%] hidden h-4 w-4 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.9)_0%,rgba(190,230,60,0.5)_38%,rgba(79,209,137,0.6)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.16)] sm:block"
        style={{ animationDuration: "5.2s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[18%] right-[5%] hidden h-5 w-5 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.85)_0%,rgba(190,230,60,0.45)_38%,rgba(79,209,137,0.5)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.14)] blur-[1px] sm:block"
        style={{ animationDelay: "2.4s", animationDuration: "6.2s" }}
      />

      {/* Qoʻshni boʻlimlar bilan chiziqsiz tutashish uchun chekka tekislovchilar */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[200px] bg-[linear-gradient(to_bottom,#fbfdfb_0%,#fbfdfb_26%,rgba(251,253,251,0.7)_52%,rgba(251,253,251,0)_100%)] sm:h-[280px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[190px] bg-[linear-gradient(to_top,#fbfdfb_0%,#fbfdfb_26%,rgba(251,253,251,0.7)_52%,rgba(251,253,251,0)_100%)] sm:h-[260px]"
      />

      <div className="relative z-[2] mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.04fr_1fr] lg:gap-14">
          {/* ===== Chap ustun — matn ===== */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: "spring", stiffness: 140, damping: 16 }}
              className="badge-pill inline-flex items-center gap-2 rounded-pill py-[7px] pl-3 pr-4 text-[13.5px] font-semibold text-[#1F4433] shadow-[0_6px_16px_-8px_rgba(11,43,28,0.25)]"
            >
              <Image src="/cuocces.png" alt="" width={19} height={20} className="h-[19px] w-[18px]" />
              Ishlash hududi
            </motion.span>

            <div className="relative mt-5">
              <motion.div
                aria-hidden
                style={{ y: "-50%" }}
                className="hero-glow pointer-events-none absolute left-0 top-1/2 -z-10 h-[190px] w-[480px] max-w-[110%] rounded-full"
                animate={reduce ? undefined : { opacity: [0.6, 1, 0.6], scale: [1, 1.07, 1] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.h2
                initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.22, 0.9, 0.3, 1] }}
                className="font-display text-[26px] font-extrabold leading-[1.2] tracking-[-0.01em] text-ink sm:text-[32px] lg:text-[38px]"
              >
                Buyurtmalarni oʻzingizga qulay hududda qabul qiling
              </motion.h2>
            </div>

            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="mt-8 flex flex-col gap-3.5 sm:mt-10 sm:gap-4"
            >
              {POINTS.map((p) => (
                <motion.li
                  key={p.title}
                  variants={itemVariants}
                  whileHover={reduce ? undefined : { x: 6 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="glass-card group relative flex items-start gap-4 overflow-hidden rounded-[22px] p-4 sm:gap-5 sm:p-5"
                >
                  {/* Hover'da shisha boʻylab oʻtuvchi yaltiroq */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-y-8 -left-1/3 z-0 w-1/3 -translate-x-full rotate-[18deg] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.7)_50%,rgba(255,255,255,0)_100%)] opacity-0 transition-all duration-[900ms] ease-out group-hover:translate-x-[420%] group-hover:opacity-100"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0 rounded-[22px] opacity-0 shadow-[inset_0_0_0_1px_rgba(79,209,137,0.5),0_22px_46px_-24px_rgba(27,164,99,0.6)] transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <motion.div
                    whileHover={reduce ? undefined : { scale: 1.08, rotate: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="relative z-[1] h-[58px] w-[58px] shrink-0 drop-shadow-[0_10px_18px_rgba(15,64,40,0.16)] sm:h-[64px] sm:w-[64px]"
                  >
                    <Image src={p.icon} alt="" fill sizes="64px" className="object-contain" placeholder="blur" />
                  </motion.div>

                  <div className="relative z-[1]">
                    <h3 className="font-display text-[15.5px] font-extrabold leading-[1.3] text-ink transition-colors duration-300 group-hover:text-brand-600 sm:text-[16.5px]">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] leading-[1.55] text-body sm:text-[14px]">{p.desc}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* ===== Oʻng ustun — xarita ===== */}
          <motion.div
            style={reduce ? undefined : { y: mapY }}
            initial={{ opacity: 0, scale: 0.93, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 90, damping: 20 }}
            className="relative"
          >
            {/* Karta ortidagi nur */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-10 rounded-[48px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(79,209,137,0.42),rgba(79,209,137,0)_70%)] blur-2xl"
            />

            <div className="glass-card relative aspect-[4/3] overflow-hidden rounded-[30px] p-2 sm:rounded-[34px] sm:p-2.5">
              <div className="relative h-full w-full overflow-hidden rounded-[24px] sm:rounded-[26px]">
                <Image
                  src={mapImg}
                  alt="Xizmat koʻrsatish hududi xaritasi"
                  fill
                  sizes="(max-width: 1024px) 92vw, 560px"
                  className="object-cover"
                  placeholder="blur"
                />

                {/* Xarita ustidagi yumshoq yashil tus */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_42%_50%,rgba(79,209,137,0.14),rgba(11,43,28,0.06)_75%)]"
                />

                {/* ===== Markerlar va qamrov radiusi ===== */}
                <svg
                  viewBox="0 0 400 300"
                  className="absolute inset-0 h-full w-full"
                  fill="none"
                  aria-hidden
                >
                  {/* Qamrov doirasi */}
                  <circle cx="170" cy="150" r="96" fill="rgba(44,193,118,0.13)" />
                  <circle
                    cx="170"
                    cy="150"
                    r="96"
                    fill="none"
                    stroke="#2CC176"
                    strokeOpacity="0.5"
                    strokeWidth="1.6"
                    strokeDasharray="5 6"
                  />

                  {/* Tarqaluvchi to‘lqinlar */}
                  {!reduce &&
                    [0, 1, 2].map((i) => (
                      <motion.circle
                        key={i}
                        cx="170"
                        cy="150"
                        fill="none"
                        stroke="#2CC176"
                        strokeWidth="2"
                        initial={{ r: 18, opacity: 0 }}
                        animate={{ r: [18, 96], opacity: [0.55, 0] }}
                        transition={{
                          duration: 3.2,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: i * 1.07,
                        }}
                      />
                    ))}

                  {/* Eng yaqin buyurtmagacha boʻlgan yoʻl */}
                  <motion.path
                    d="M170 150 C 196 132 210 118 238 110"
                    stroke="#12855A"
                    strokeOpacity="0.75"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeDasharray="5 7"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.1, delay: 0.6, ease: "easeInOut" }}
                  />

                  {/* Buyurtma markerlari */}
                  <Pin x={238} y={110} scale={0.72} fill="#1BB3F7" delay={0.5} reduce={!!reduce} />
                  <Pin x={124} y={222} scale={0.72} fill="#1BB3F7" delay={0.68} reduce={!!reduce} />
                  <Pin x={344} y={244} scale={0.6} fill="#8FB3A5" dim delay={0.82} reduce={!!reduce} />

                  {/* Mutaxassis markeri */}
                  <Pin x={170} y={150} scale={1.15} fill="#12855A" delay={0.28} reduce={!!reduce} />
                </svg>

                {/* Suzuvchi yorliq */}
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.95 }}
                  className="glass-panel absolute left-[54%] top-[12%] flex items-center gap-2 rounded-pill py-1.5 pl-2.5 pr-3.5 text-[11.5px] font-semibold text-[#1F4433] shadow-[0_10px_24px_-12px_rgba(11,43,28,0.4)] sm:text-[12.5px]"
                >
                  <span className="relative flex h-2 w-2">
                    {!reduce && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-brand-400"
                        animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                    <span className="relative h-2 w-2 rounded-full bg-brand-500" />
                  </span>
                  Yaqin buyurtma
                </motion.div>

                {/* Pastki yorliq — qamrov */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="glass-panel absolute bottom-[6%] left-[6%] rounded-pill px-3.5 py-1.5 text-[11.5px] font-semibold text-[#1F4433] shadow-[0_10px_24px_-12px_rgba(11,43,28,0.4)] sm:text-[12.5px]"
                >
                  Sizning hududingiz
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
