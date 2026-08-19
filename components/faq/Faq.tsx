"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import faqHero from "@/assets/faq/faq-hero.png";

type Qa = { q: string; a: string };

const FAQ: Qa[] = [
  {
    q: "Onlayn Hamshirada ishlash uchun asosiy ish joyimdan boʻshashim kerakmi?",
    a: "Yoʻq. Platformada asosiy ishingizdan tashqari, boʻsh vaqtingizda ham faoliyat yuritishingiz mumkin.",
  },
  {
    q: "Buyurtmalarni majburiy qabul qilish kerakmi?",
    a: "Yoʻq. Sizga mos keladigan buyurtmalarni mustaqil ravishda qabul qilasiz.",
  },
  {
    q: "Onboarding pullikmi?",
    a: "Yoʻq. Dastlabki onboarding va ariza topshirish jarayoni bepul.",
  },
  {
    q: "Roʻyxatdan oʻtish uchun qaysi hujjatlar kerak?",
    a: "Odatda shaxsni tasdiqlovchi hujjat, diplom, malaka sertifikatlari va professional tajriba haqidagi maʼlumotlar talab qilinadi.",
  },
  {
    q: "Komissiya qancha?",
    a: "Har bir yakunlangan buyurtmadan tushgan mablagʻning 70 foizi mutaxassisga, 30 foizi platformaga ajratiladi.",
  },
  {
    q: "Hujjatlarim darhol tasdiqlanadimi?",
    a: "Yoʻq. Taqdim etilgan hujjatlar va maʼlumotlar administrator tomonidan tekshiriladi.",
  },
  {
    q: "Arizam rad etilsa nima boʻladi?",
    a: "Rad etish sababi sizga koʻrsatiladi. Zarur hollarda maʼlumotlarni toʻgʻrilab, qayta ariza topshirish imkoniyati berilishi mumkin.",
  },
  {
    q: "Onlayn Hamshira buyurtmalarni kafolatlaydimi?",
    a: "Platforma mijozlar va mutaxassislarni bogʻlaydi, xolos — shuning uchun platforma buyurtmalarni kafolatlamaydi. Buyurtmalar soni hudud, talab, mutaxassislik va reytingga bogʻliq boʻladi.",
  },
  {
    q: "Mijoz xizmat haqini kimga toʻlaydi?",
    a: "Toʻlov tartibi platformaning amaldagi qoidalari asosida amalga oshiriladi va onboarding jarayonida batafsil tushuntiriladi.",
  },
  {
    q: "Savollarim boʻlsa kimga murojaat qilaman?",
    a: "Onlayn Hamshira support xizmati orqali administrator bilan bogʻlanishingiz mumkin.",
  },
];

/* ===== Animatsiya sxemalari ===== */

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 130, damping: 20 },
  },
};

/* ===== Bitta savol ===== */

function FaqItem({
  item,
  index,
  open,
  onToggle,
  reduce,
}: {
  item: Qa;
  index: number;
  open: boolean;
  onToggle: () => void;
  reduce: boolean;
}) {
  const uid = useId();
  const panelId = `faq-panel-${uid}`;
  const buttonId = `faq-button-${uid}`;

  return (
    <motion.li variants={itemVariants} className="list-none">
      <div
        data-open={open}
        className="glass-card group relative overflow-hidden rounded-[22px] transition-shadow duration-500 data-[open=true]:shadow-[0_28px_56px_-28px_rgba(27,164,99,0.55),inset_0_1px_0_rgba(255,255,255,0.7)]"
      >
        {/* Ochilganda yonuvchi yashil halqa */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 rounded-[22px] opacity-0 shadow-[inset_0_0_0_1px_rgba(79,209,137,0.55)] transition-opacity duration-500 group-hover:opacity-100 group-data-[open=true]:opacity-100"
        />
        {/* Hover'da shisha boʻylab oʻtuvchi yaltiroq */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-y-8 -left-1/3 z-0 w-1/3 -translate-x-full rotate-[18deg] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.65)_50%,rgba(255,255,255,0)_100%)] opacity-0 transition-all duration-[1000ms] ease-out group-hover:translate-x-[440%] group-hover:opacity-100"
        />

        <h3>
          <button
            id={buttonId}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={onToggle}
            className="relative z-[1] flex w-full items-center gap-3.5 px-4 py-4 text-left sm:gap-5 sm:px-6 sm:py-5"
          >
            {/* Tartib raqami */}
            <span
              aria-hidden
              className="hidden shrink-0 font-display text-[13px] font-extrabold tabular-nums text-brand-600/45 transition-colors duration-300 group-data-[open=true]:text-brand-600 sm:block"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="flex-1 font-display text-[14.5px] font-bold leading-[1.4] text-ink transition-colors duration-300 group-hover:text-brand-600 group-data-[open=true]:text-brand-600 sm:text-[16px]">
              {item.q}
            </span>

            {/* Plyus → minus */}
            <motion.span
              aria-hidden
              animate={{ rotate: open ? 135 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full bg-[linear-gradient(150deg,#E4F9EC,#B3EBCC)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_14px_-8px_rgba(15,64,40,0.5)] sm:h-[34px] sm:w-[34px]"
            >
              <span className="absolute h-[2.5px] w-[13px] rounded-full bg-[#12855A] sm:w-[15px]" />
              <span className="absolute h-[13px] w-[2.5px] rounded-full bg-[#12855A] sm:h-[15px]" />
            </motion.span>
          </button>
        </h3>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { height: { duration: 0.36, ease: [0.22, 0.9, 0.3, 1] }, opacity: { duration: 0.24 } }
              }
              className="relative z-[1] overflow-hidden"
            >
              <motion.div
                initial={{ y: -8 }}
                animate={{ y: 0 }}
                exit={{ y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 0.9, 0.3, 1] }}
                className="px-4 pb-4 sm:px-6 sm:pb-5 sm:pl-[68px]"
              >
                <div className="h-px w-full bg-[linear-gradient(90deg,rgba(79,209,137,0.45),rgba(79,209,137,0))]" />
                <p className="mt-3.5 text-[13.5px] leading-[1.6] text-body sm:text-[14.5px]">{item.a}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}

/* ===== Boʻlim ===== */

export default function Faq() {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="savollar"
      className="relative scroll-mt-24 overflow-hidden pb-24 pt-16 sm:pb-32 sm:pt-24"
      style={{ backgroundColor: "#fbfdfb" }}
    >
      {/* ===== Fon nurlari ===== */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-[10%] bottom-[6%] top-[8%] bg-[radial-gradient(56%_50%_at_50%_42%,rgba(79,209,137,0.3),rgba(79,209,137,0)_72%)]"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-[12%] top-[20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(44,193,118,0.4),rgba(44,193,118,0)_70%)] blur-2xl"
        animate={reduce ? undefined : { x: [0, 34, 0], y: [0, -26, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-[14%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(31,182,232,0.26),rgba(31,182,232,0)_70%)] blur-2xl"
        animate={reduce ? undefined : { x: [0, -30, 0], y: [0, 24, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[4%] left-[42%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(190,230,60,0.2),rgba(190,230,60,0)_70%)] blur-2xl"
      />

      {/* ===== Suyuq tomchilar ===== */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[5%] top-[30%] hidden h-4 w-4 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.9)_0%,rgba(190,230,60,0.5)_38%,rgba(79,209,137,0.6)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.16)] sm:block"
        style={{ animationDuration: "5.6s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[16%] right-[6%] hidden h-5 w-5 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.85)_0%,rgba(190,230,60,0.45)_38%,rgba(79,209,137,0.5)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.14)] blur-[1px] sm:block"
        style={{ animationDelay: "2.8s", animationDuration: "6.4s" }}
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

      <div className="relative z-[2] mx-auto max-w-[980px] px-5 sm:px-8">
        {/* ===== Sarlavha ===== */}
        <div className="relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: "spring", stiffness: 160, damping: 15 }}
            className="mx-auto mb-4 h-[86px] w-[86px] sm:mb-5 sm:h-[100px] sm:w-[100px]"
          >
            <motion.div
              className="relative h-full w-full"
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={faqHero}
                alt=""
                fill
                sizes="100px"
                className="object-contain drop-shadow-[0_18px_28px_rgba(15,64,40,0.22)]"
                placeholder="blur"
              />
            </motion.div>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.08 }}
            className="badge-pill inline-flex items-center gap-2 rounded-pill py-[7px] pl-3 pr-4 text-[13.5px] font-semibold text-[#1F4433] shadow-[0_6px_16px_-8px_rgba(11,43,28,0.25)]"
          >
            <Image src="/cuocces.png" alt="" width={19} height={20} className="h-[19px] w-[18px]" />
            Savol-javob
          </motion.span>

          <div className="relative mt-5">
            <motion.div
              aria-hidden
              style={{ x: "-50%", y: "-50%" }}
              className="hero-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[170px] w-[520px] max-w-[112%] rounded-full"
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
              KOʻP BERILADIGAN SAVOLLAR
            </motion.h2>
          </div>
        </div>

        {/* ===== Akkordeon ===== */}
        <motion.ul
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-9 flex flex-col gap-3 sm:mt-12 sm:gap-3.5"
        >
          {FAQ.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              reduce={!!reduce}
            />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
