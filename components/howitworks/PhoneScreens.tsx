"use client";

import { motion, type Variants } from "framer-motion";

/*
 * Telefon ekranida koʻrsatiladigan sakkizta "ilova oynasi".
 * Har bir oyna oʻng tomondagi qadam bilan sinxron almashadi.
 */

/* ===== Umumiy mayda elementlar ===== */

const pop: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.07, duration: 0.4, ease: [0.22, 0.9, 0.3, 1] },
  }),
};

function ScreenTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <motion.div variants={pop} custom={0} initial="hidden" animate="visible" className="mb-2.5">
      <h4 className="font-display text-[13px] font-extrabold leading-none text-ink">{children}</h4>
      {sub && <p className="mt-1 text-[9.5px] font-medium text-mute">{sub}</p>}
    </motion.div>
  );
}

function Avatar({ initials = "MK", tone = "#4FD189" }: { initials?: string; tone?: string }) {
  return (
    <span
      className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-[11px] font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
      style={{ background: `linear-gradient(150deg, ${tone}, ${tone}CC)` }}
    >
      {initials}
    </span>
  );
}

function OrderCard({
  i = 0,
  name,
  service,
  time,
  badge,
  tone = "#4FD189",
  active,
}: {
  i?: number;
  name: string;
  service: string;
  time: string;
  badge?: string;
  tone?: string;
  active?: boolean;
}) {
  return (
    <motion.div
      variants={pop}
      custom={i + 1}
      initial="hidden"
      animate="visible"
      className={`relative flex items-center gap-2 rounded-[14px] border bg-white p-2 ${
        active
          ? "border-brand-300 shadow-[0_10px_20px_-14px_rgba(27,164,99,0.9)]"
          : "border-line/90"
      }`}
    >
      <Avatar initials={name.slice(0, 2).toUpperCase()} tone={tone} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-[10.5px] font-bold leading-none text-ink">{name}</p>
        <p className="mt-1 truncate text-[9px] font-medium text-mute">{service}</p>
      </div>
      <div className="shrink-0 text-right">
        {badge ? (
          <motion.span
            animate={{ opacity: [1, 0.45, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-pill bg-[#FFEFD6] px-1.5 py-[2px] text-[8px] font-bold text-[#B4740F]"
          >
            {badge}
          </motion.span>
        ) : null}
        <p className="mt-1 text-[8.5px] font-semibold text-mute">{time}</p>
      </div>
    </motion.div>
  );
}

function InfoRow({
  i,
  label,
  value,
  tone = "#EAF7F0",
  icon,
}: {
  i: number;
  label: string;
  value: string;
  tone?: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      variants={pop}
      custom={i}
      initial="hidden"
      animate="visible"
      className="flex items-center gap-2 rounded-[13px] border border-line/90 bg-white p-2"
    >
      <span
        className="grid h-7 w-7 shrink-0 place-items-center rounded-[9px]"
        style={{ background: tone }}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[8.5px] font-semibold uppercase tracking-[0.08em] text-mute">{label}</p>
        <p className="truncate font-display text-[10.5px] font-bold text-ink">{value}</p>
      </div>
    </motion.div>
  );
}

/* Mayda ikonkalar (ekran ichida) */
const ic = {
  syringe: (
    <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="none">
      <path d="M14 4l6 6M17.5 6.5l-9 9M5 19l3-1 8-8-2-2-8 8-1 3Z" stroke="#12855A" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="none">
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" stroke="#12678F" strokeWidth="1.9" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" stroke="#12678F" strokeWidth="1.9" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="none">
      <circle cx="12" cy="12" r="8.4" stroke="#B4740F" strokeWidth="1.9" />
      <path d="M12 7.6V12l3 2" stroke="#B4740F" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  ),
};

/* ===== 1. Yangi buyurtmalar ===== */
export function ScreenOrders() {
  return (
    <div>
      <ScreenTitle sub="3 ta faol soʻrov">Yangi buyurtmalar</ScreenTitle>
      <div className="space-y-1.5">
        <OrderCard i={0} name="Nodira A." service="Ukol qilish · Chilonzor" time="09:40" badge="Yangi" active />
        <OrderCard i={1} name="Sardor T." service="Bogʻlam · Yunusobod" time="10:15" tone="#1FB6E8" />
        <OrderCard i={2} name="Malika R." service="Kapelnitsa · Mirzo Ulugʻbek" time="11:00" tone="#F6A45A" />
      </div>
      <motion.div
        variants={pop}
        custom={4}
        initial="hidden"
        animate="visible"
        className="mt-2 rounded-[13px] border border-dashed border-brand-200 bg-brand-50/70 p-2 text-center text-[9px] font-semibold text-brand-700"
      >
        Yangi soʻrovlar real vaqtda keladi
      </motion.div>
    </div>
  );
}

/* ===== 2. Qabul qilish yoki rad etish ===== */
export function ScreenAccept() {
  return (
    <div>
      <ScreenTitle sub="Javob berish uchun 5 daqiqa">Buyurtma #1284</ScreenTitle>
      <OrderCard i={0} name="Nodira A." service="Ukol qilish · 2 marta" time="09:40" active />
      <div className="mt-3 grid grid-cols-2 gap-2">
        <motion.button
          type="button"
          variants={pop}
          custom={1}
          initial="hidden"
          animate="visible"
          className="btn-solid rounded-[13px] py-2 font-display text-[10.5px] font-bold text-white shadow-[0_10px_18px_-10px_rgba(23,164,104,0.9)]"
        >
          <motion.span
            className="inline-block"
            animate={{ scale: [1, 0.94, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.12, 0.3] }}
          >
            Qabul qilish
          </motion.span>
        </motion.button>
        <motion.button
          type="button"
          variants={pop}
          custom={2}
          initial="hidden"
          animate="visible"
          className="rounded-[13px] border border-[#F3D4D9] bg-[#FFF6F7] py-2 font-display text-[10.5px] font-bold text-[#C6435A]"
        >
          Rad etish
        </motion.button>
      </div>
      <motion.p
        variants={pop}
        custom={3}
        initial="hidden"
        animate="visible"
        className="mt-2.5 text-center text-[9px] font-medium leading-[1.5] text-mute"
      >
        Tanlov faqat sizda — jadvalingizga qarab hal qilasiz
      </motion.p>
    </div>
  );
}

/* ===== 3. Xizmat turi va manzil ===== */
export function ScreenAddress() {
  return (
    <div>
      <ScreenTitle sub="Buyurtma tafsilotlari">Xizmat maʼlumoti</ScreenTitle>
      <div className="space-y-1.5">
        <InfoRow i={1} label="Xizmat turi" value="Mushak ichiga ukol" icon={ic.syringe} />
        <InfoRow i={2} label="Manzil" value="Chilonzor 9-kv, 12-uy" tone="#E7F3FB" icon={ic.pin} />
        <InfoRow i={3} label="Vaqt" value="Bugun, 09:40" tone="#FFF4E2" icon={ic.clock} />
      </div>
      <motion.div
        variants={pop}
        custom={4}
        initial="hidden"
        animate="visible"
        className="relative mt-2 h-[76px] overflow-hidden rounded-[13px] border border-line/90 bg-[#EDF3EF]"
      >
        <svg viewBox="0 0 200 90" className="absolute inset-0 h-full w-full">
          <rect width="200" height="90" fill="#E9F0EB" />
          <path d="M8 58c14-16 30-24 52-22s34 12 54 6 40-16 62-6l16 8v46H8V58Z" fill="#DCE8DF" />
          <path d="M0 34h200M0 62h200M46 0v90M108 0v90M162 0v90" stroke="#D0DED4" strokeWidth="1" />
          <motion.path
            d="M30 74c26-10 44-30 72-30s44 14 70 6"
            stroke="#2CC176"
            strokeWidth="3.4"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.3, ease: [0.22, 0.9, 0.3, 1], delay: 0.35 }}
          />
        </svg>
        <motion.span
          className="absolute left-[70%] top-[36%] grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_4px_10px_-4px_rgba(11,43,28,0.5)]"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          {ic.pin}
        </motion.span>
      </motion.div>
    </div>
  );
}

/* ===== 4. Mijoz bilan bogʻlanish ===== */
export function ScreenCall() {
  return (
    <div className="flex h-full flex-col items-center justify-center pb-2 text-center">
      <div className="relative mb-3">
        {[0, 1].map((r) => (
          <motion.span
            key={r}
            className="absolute inset-0 rounded-full ring-2 ring-brand-300"
            animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: r * 1.2 }}
          />
        ))}
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 190, damping: 15 }}
          className="relative grid h-[62px] w-[62px] place-items-center rounded-full bg-[linear-gradient(150deg,#8FE7B9,#22A96C)] font-display text-[19px] font-extrabold text-white shadow-[0_14px_24px_-14px_rgba(11,43,28,0.8)]"
        >
          NA
        </motion.span>
      </div>
      <motion.p variants={pop} custom={1} initial="hidden" animate="visible" className="font-display text-[13px] font-extrabold text-ink">
        Nodira A.
      </motion.p>
      <motion.p variants={pop} custom={2} initial="hidden" animate="visible" className="mt-1 text-[9.5px] font-medium text-mute">
        Mijoz bilan bogʻlanmoqda…
      </motion.p>
      <motion.div variants={pop} custom={3} initial="hidden" animate="visible" className="mt-3.5 flex items-center gap-2.5">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[linear-gradient(150deg,#5CD79A,#17A468)] shadow-[0_10px_18px_-10px_rgba(23,164,104,0.95)]">
          <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="#fff">
            <path d="M6.6 3.4c.7-.6 1.8-.5 2.3.3l1.6 2.2c.4.6.3 1.4-.3 1.9l-1 .8c-.2.2-.3.5-.2.8a11 11 0 0 0 4.6 4.6c.3.1.6 0 .8-.2l.8-1c.5-.6 1.3-.7 1.9-.3l2.2 1.6c.8.5.9 1.6.3 2.3l-1.1 1.2c-.7.7-1.8 1-2.8.6a20 20 0 0 1-10.6-10.6c-.4-1-.1-2.1.6-2.8l1-1.1Z" />
          </svg>
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white shadow-[0_8px_16px_-10px_rgba(11,43,28,0.5)]">
          <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="none">
            <path d="M4 6.4A2.4 2.4 0 0 1 6.4 4h11.2A2.4 2.4 0 0 1 20 6.4v7.2a2.4 2.4 0 0 1-2.4 2.4H9.6L5 19.6V6.4Z" stroke="#1BA463" strokeWidth="1.9" strokeLinejoin="round" />
          </svg>
        </span>
      </motion.div>
    </div>
  );
}

/* ===== 5. Xizmatni boshlash ===== */
export function ScreenStart() {
  return (
    <div className="flex h-full flex-col justify-center pb-2">
      <ScreenTitle sub="Buyurtma #1284 · Nodira A.">Xizmatni boshlash</ScreenTitle>
      <motion.div
        variants={pop}
        custom={1}
        initial="hidden"
        animate="visible"
        className="relative mx-auto mt-1 grid h-[104px] w-[104px] place-items-center rounded-full"
      >
        <svg viewBox="0 0 104 104" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="52" cy="52" r="46" fill="none" stroke="#E4EDE7" strokeWidth="7" />
          <motion.circle
            cx="52"
            cy="52"
            r="46"
            fill="none"
            stroke="#2CC176"
            strokeWidth="7"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 0.72 }}
            transition={{ duration: 1.5, ease: [0.22, 0.9, 0.3, 1], delay: 0.25 }}
          />
        </svg>
        <div className="text-center">
          <p className="font-display text-[19px] font-extrabold leading-none text-ink">12:40</p>
          <p className="mt-1 text-[8.5px] font-semibold uppercase tracking-[0.1em] text-mute">davom etmoqda</p>
        </div>
      </motion.div>
      <motion.div
        variants={pop}
        custom={3}
        initial="hidden"
        animate="visible"
        className="btn-solid relative mt-4 overflow-hidden rounded-pill py-2.5 text-center font-display text-[11px] font-bold text-white shadow-[0_12px_22px_-12px_rgba(23,164,104,0.95)]"
      >
        <motion.span
          aria-hidden
          className="absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.55),rgba(255,255,255,0))]"
          animate={{ x: ["0%", "460%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.9 }}
        />
        Xizmat boshlandi
      </motion.div>
    </div>
  );
}

/* ===== 6. Xizmatni yakunlash ===== */
export function ScreenDone() {
  return (
    <div className="flex h-full flex-col items-center justify-center pb-2 text-center">
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 13 }}
        className="relative grid h-[68px] w-[68px] place-items-center rounded-full bg-[linear-gradient(150deg,#B9F3CA,#2CC176)] shadow-[0_16px_26px_-14px_rgba(23,164,104,0.95)]"
      >
        <motion.span
          className="absolute inset-0 rounded-full ring-2 ring-brand-300"
          animate={{ scale: [1, 1.45], opacity: [0.6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
        <svg viewBox="0 0 24 24" className="h-[30px] w-[30px]" fill="none">
          <motion.path
            d="M5 12.6l4.6 4.6L19 7.4"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
          />
        </svg>
      </motion.span>

      <motion.p variants={pop} custom={1} initial="hidden" animate="visible" className="mt-3 font-display text-[13px] font-extrabold text-ink">
        Xizmat yakunlandi
      </motion.p>

      <motion.div variants={pop} custom={2} initial="hidden" animate="visible" className="mt-3 w-full space-y-1.5">
        {[
          ["Davomiylik", "42 daqiqa"],
          ["Xizmat", "Ukol qilish"],
          ["Holat", "Tasdiqlandi"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between rounded-[11px] border border-line/90 bg-white px-2.5 py-1.5">
            <span className="text-[9px] font-semibold text-mute">{k}</span>
            <span className="font-display text-[9.5px] font-bold text-ink">{v}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ===== 7. Buyurtmalar tarixi ===== */
export function ScreenHistory() {
  const rows = [
    ["Nodira A.", "18-avg · Ukol qilish", "#4FD189"],
    ["Sardor T.", "17-avg · Bogʻlam", "#1FB6E8"],
    ["Malika R.", "16-avg · Kapelnitsa", "#F6A45A"],
    ["Javohir X.", "15-avg · Parvarish", "#B79BE8"],
  ];
  return (
    <div>
      <ScreenTitle sub="Oxirgi 30 kun">Buyurtmalar tarixi</ScreenTitle>
      <motion.div
        variants={pop}
        custom={1}
        initial="hidden"
        animate="visible"
        className="mb-2 flex items-end gap-1.5 rounded-[13px] border border-line/90 bg-white p-2"
      >
        {[38, 56, 44, 72, 60, 88, 68].map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-t-[3px] bg-[linear-gradient(180deg,#7FE7B4,#2CC176)]"
            initial={{ height: 0 }}
            animate={{ height: `${h * 0.42}px` }}
            transition={{ duration: 0.55, delay: 0.2 + i * 0.06, ease: [0.22, 0.9, 0.3, 1] }}
          />
        ))}
      </motion.div>
      <div className="space-y-1.5">
        {rows.map(([name, meta, tone], i) => (
          <motion.div
            key={name}
            variants={pop}
            custom={i + 2}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2 rounded-[13px] border border-line/90 bg-white p-1.5"
          >
            <Avatar initials={name.slice(0, 2).toUpperCase()} tone={tone} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-[10px] font-bold leading-none text-ink">{name}</p>
              <p className="mt-1 truncate text-[8.5px] font-medium text-mute">{meta}</p>
            </div>
            <span className="rounded-pill bg-brand-50 px-1.5 py-[2px] text-[8px] font-bold text-brand-700">
              Yakunlandi
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ===== 8. Profil va reyting ===== */
export function ScreenProfile() {
  return (
    <div className="flex h-full flex-col justify-center pb-1">
      <motion.div
        variants={pop}
        custom={0}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center"
      >
        <span className="grid h-[54px] w-[54px] place-items-center rounded-full bg-[linear-gradient(150deg,#9AD6F5,#2A7FB6)] font-display text-[17px] font-extrabold text-white shadow-[0_14px_22px_-14px_rgba(11,43,28,0.85)]">
          MK
        </span>
        <p className="mt-2 font-display text-[13px] font-extrabold text-ink">Malika Karimova</p>
        <p className="mt-0.5 text-[9px] font-medium text-mute">Hamshira · 6 yillik tajriba</p>
      </motion.div>

      <motion.div
        variants={pop}
        custom={1}
        initial="hidden"
        animate="visible"
        className="mt-3 flex items-center justify-center gap-1"
      >
        {[0, 1, 2, 3, 4].map((s) => (
          <motion.svg
            key={s}
            viewBox="0 0 24 24"
            className="h-[15px] w-[15px]"
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.35 + s * 0.09 }}
          >
            <path
              d="M12 3.4l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8L12 3.4Z"
              fill={s === 4 ? "#FFE1A2" : "#FFC94F"}
            />
          </motion.svg>
        ))}
        <span className="ml-1 font-display text-[11px] font-extrabold text-ink">4.9</span>
      </motion.div>

      <motion.div
        variants={pop}
        custom={2}
        initial="hidden"
        animate="visible"
        className="mt-3 grid grid-cols-3 gap-1.5"
      >
        {[
          ["128", "buyurtma"],
          ["98%", "qabul"],
          ["6 oy", "tajriba"],
        ].map(([v, k]) => (
          <div key={k} className="rounded-[11px] border border-line/90 bg-white px-1 py-1.5 text-center">
            <p className="font-display text-[11px] font-extrabold leading-none text-ink">{v}</p>
            <p className="mt-1 text-[8px] font-semibold text-mute">{k}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
