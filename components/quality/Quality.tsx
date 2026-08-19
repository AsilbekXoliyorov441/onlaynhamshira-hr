"use client";

import Image, { type StaticImageData } from "next/image";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import heroShield from "@/assets/quality/quality-hero.png";
import warningIcon from "@/assets/quality/quality-warning.png";
import iconEthics from "@/assets/quality/q-1-etika.png";
import iconPrivacy from "@/assets/quality/q-2-maxfiylik.png";
import iconScope from "@/assets/quality/q-3-malaka.png";
import iconSanitary from "@/assets/quality/q-4-sanitariya.png";
import iconCourtesy from "@/assets/quality/q-5-muomala.png";
import iconApp from "@/assets/quality/q-6-ilova.png";

type Rule = { text: string; icon: StaticImageData };

const RULES: Rule[] = [
  { text: "tibbiy etika qoidalariga rioya qilishi;", icon: iconEthics },
  { text: "mijoz maʼlumotlarini sir saqlashi;", icon: iconPrivacy },
  { text: "faqat oʻz malakasi doirasidagi xizmatlarni bajarishi;", icon: iconScope },
  { text: "xizmat vaqtida sanitariya va xavfsizlik talablariga amal qilishi;", icon: iconSanitary },
  { text: "mijoz bilan hushmuomalada boʻlishi;", icon: iconCourtesy },
  { text: "buyurtma holatini ilovada toʻgʻri yuritishi kerak.", icon: iconApp },
];

/** Qalqon atrofida suzuvchi kichik yorliqlar */
const CHIPS: { icon: StaticImageData; className: string; delay: number }[] = [
  { icon: iconPrivacy, className: "left-[-2%] top-[14%]", delay: 0 },
  { icon: iconEthics, className: "right-[-1%] top-[34%]", delay: 0.7 },
  { icon: iconApp, className: "left-[8%] bottom-[10%]", delay: 1.4 },
];

/* ===== Animatsiya sxemalari ===== */

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const ruleVariants: Variants = {
  hidden: { opacity: 0, x: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export default function Quality() {
  const reduce = useReducedMotion();

  return (
    <section
      id="xizmat-sifati"
      className="relative scroll-mt-24 overflow-hidden pb-24 pt-16 sm:pb-32 sm:pt-24"
      style={{ backgroundColor: "#fbfdfb" }}
    >
      {/* ===== Fon nurlari ===== */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-[10%] bottom-[6%] top-[8%] bg-[radial-gradient(56%_52%_at_32%_52%,rgba(79,209,137,0.32),rgba(79,209,137,0)_72%)]"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[2%] top-[26%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(44,193,118,0.42),rgba(44,193,118,0)_70%)] blur-2xl"
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, -28, 0], scale: [1, 1.09, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-[12%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(31,182,232,0.26),rgba(31,182,232,0)_70%)] blur-2xl"
        animate={reduce ? undefined : { x: [0, -28, 0], y: [0, 26, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[6%] right-[22%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(190,230,60,0.2),rgba(190,230,60,0)_70%)] blur-2xl"
      />

      {/* ===== Suyuq tomchilar ===== */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[4%] top-[24%] hidden h-4 w-4 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.9)_0%,rgba(190,230,60,0.5)_38%,rgba(79,209,137,0.6)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.16)] sm:block"
        style={{ animationDuration: "5.4s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[22%] left-[3%] hidden h-5 w-5 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.85)_0%,rgba(190,230,60,0.45)_38%,rgba(79,209,137,0.5)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.14)] blur-[1px] sm:block"
        style={{ animationDelay: "2.1s", animationDuration: "6.3s" }}
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
        {/* ===== Sarlavha ===== */}
        <div className="relative mx-auto max-w-[820px] text-center">
          <motion.span
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            className="badge-pill inline-flex items-center gap-2 rounded-pill py-[7px] pl-3 pr-4 text-[13.5px] font-semibold text-[#1F4433] shadow-[0_6px_16px_-8px_rgba(11,43,28,0.25)]"
          >
            <Image src="/cuocces.png" alt="" width={19} height={20} className="h-[19px] w-[18px]" />
            Xizmat sifati va xavfsizlik
          </motion.span>

          <div className="relative mt-5">
            <motion.div
              aria-hidden
              style={{ x: "-50%", y: "-50%" }}
              className="hero-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[180px] w-[540px] max-w-[112%] rounded-full"
              animate={reduce ? undefined : { opacity: [0.6, 1, 0.6], scale: [1, 1.07, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.h2
              initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: [0.22, 0.9, 0.3, 1] }}
              className="font-display text-[26px] font-extrabold leading-[1.2] tracking-[-0.01em] text-ink sm:text-[34px] lg:text-[40px]"
            >
              Professional xizmat — asosiy talab!
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mx-auto mt-4 max-w-[680px] text-[14px] leading-[1.6] text-body sm:text-[15.5px]"
          >
            Onlayn Hamshira platformasida mijozlarning xavfsizligi va xizmat sifati birinchi
            oʻrinda turadi.
          </motion.p>
        </div>

        <div className="mt-12 grid items-center gap-10 sm:mt-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
          {/* ===== Chap ustun — qalqon ===== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
            className="relative mx-auto w-full max-w-[420px]"
          >
            <div className="relative aspect-square w-full">
              {/* Tarqaluvchi halqalar */}
              {!reduce &&
                [0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    aria-hidden
                    /* Tailwind'ning -translate-* klasslari framer'ning inline
                       transform'i bilan toʻqnashadi — markazlash style.x/y orqali */
                    style={{ x: "-50%", y: "-50%" }}
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[62%] w-[62%] rounded-full border-2 border-brand-400"
                    animate={{ scale: [0.72, 1.42], opacity: [0.5, 0] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: "easeOut", delay: i * 1.2 }}
                  />
                ))}
              {/* Orqa nur */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(44,193,118,0.5),rgba(44,193,118,0)_70%)] blur-2xl"
              />

              {/* Qalqon */}
              <motion.div
                className="relative h-full w-full"
                animate={reduce ? undefined : { y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={heroShield}
                  alt="Xavfsizlik va sifat kafolati"
                  fill
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="object-contain drop-shadow-[0_28px_44px_rgba(15,64,40,0.22)]"
                  placeholder="blur"
                  priority={false}
                />
              </motion.div>

              {/* Suzuvchi yorliqlar */}
              {CHIPS.map((chip, i) => (
                <motion.div
                  key={i}
                  aria-hidden
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ type: "spring", stiffness: 240, damping: 15, delay: 0.35 + i * 0.14 }}
                  className={`absolute ${chip.className}`}
                >
                  <motion.div
                    animate={reduce ? undefined : { y: [0, -10, 0] }}
                    transition={{
                      duration: 4.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: chip.delay,
                    }}
                    className="glass-panel grid h-[62px] w-[62px] place-items-center rounded-[20px] shadow-[0_16px_30px_-16px_rgba(11,43,28,0.5)] sm:h-[70px] sm:w-[70px]"
                  >
                    <Image
                      src={chip.icon}
                      alt=""
                      width={92}
                      height={92}
                      className="h-[46px] w-[46px] object-contain sm:h-[52px] sm:w-[52px]"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ===== Oʻng ustun — qoidalar ===== */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5 }}
              className="font-display text-[16px] font-extrabold text-ink sm:text-[18px]"
            >
              Har bir mutaxassis:
            </motion.p>

            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-4 flex flex-col gap-3 sm:mt-5 sm:gap-3.5"
            >
              {RULES.map((rule, i) => (
                <motion.li
                  key={rule.text}
                  variants={ruleVariants}
                  whileHover={reduce ? undefined : { x: -6 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="glass-card group relative flex items-center gap-4 overflow-hidden rounded-[20px] p-3.5 sm:gap-5 sm:p-4"
                >
                  {/* Hover'da shisha boʻylab oʻtuvchi yaltiroq */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-y-8 -left-1/3 z-0 w-1/3 -translate-x-full rotate-[18deg] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.7)_50%,rgba(255,255,255,0)_100%)] opacity-0 transition-all duration-[900ms] ease-out group-hover:translate-x-[430%] group-hover:opacity-100"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0 rounded-[20px] opacity-0 shadow-[inset_0_0_0_1px_rgba(79,209,137,0.5),0_22px_46px_-24px_rgba(27,164,99,0.6)] transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <motion.div
                    whileHover={reduce ? undefined : { scale: 1.08, rotate: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="relative z-[1] h-[52px] w-[52px] shrink-0 drop-shadow-[0_8px_16px_rgba(15,64,40,0.16)] sm:h-[58px] sm:w-[58px]"
                  >
                    <Image src={rule.icon} alt="" fill sizes="58px" className="object-contain" placeholder="blur" />
                  </motion.div>

                  <p className="relative z-[1] text-[13.5px] font-medium leading-[1.5] text-ink/85 sm:text-[14.5px]">
                    {rule.text}
                  </p>

                  {/* Tartib raqami — fonda yumshoq urgʻu */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-4 top-1/2 z-0 -translate-y-1/2 font-display text-[38px] font-extrabold leading-none text-brand-500/[0.09] sm:text-[46px]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* ===== Ogohlantirish ===== */}
        <motion.div
          initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 0.9, 0.3, 1] }}
          className="relative mt-10 flex items-center gap-4 overflow-hidden rounded-[24px] border border-white/70 bg-[linear-gradient(150deg,rgba(255,250,238,0.92),rgba(255,244,222,0.62))] p-4 shadow-[0_20px_44px_-24px_rgba(120,80,10,0.35),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-[8px] sm:mt-12 sm:gap-5 sm:p-5"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-[6%] -top-[60%] h-[220px] w-[220px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,198,92,0.35),rgba(255,198,92,0)_70%)] blur-2xl"
          />
          <motion.div
            animate={reduce ? undefined : { rotate: [0, -7, 7, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
            className="relative h-[50px] w-[50px] shrink-0 drop-shadow-[0_8px_16px_rgba(120,80,10,0.22)] sm:h-[58px] sm:w-[58px]"
          >
            <Image src={warningIcon} alt="" fill sizes="58px" className="object-contain" placeholder="blur" />
          </motion.div>
          <p className="relative text-[13.5px] font-medium leading-[1.55] text-[#6B4E12] sm:text-[14.5px]">
            Qoidalarga rioya qilmaslik mutaxassis faoliyatining vaqtincha yoki butunlay
            cheklanishiga olib kelishi mumkin.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
