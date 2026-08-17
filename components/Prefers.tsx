import Image, { type StaticImageData } from "next/image";
import Reveal from "./Reveal";
import income from "@/assets/prefers/prefer-1.png";
import freeTime from "@/assets/prefers/prefer-2.png";
import newClients from "@/assets/prefers/prefer-3.png";
import modernFormat from "@/assets/prefers/prefer-4.png";
import rating from "@/assets/prefers/prefer-5.png";
import support from "@/assets/prefers/prefer-6.png";

type Card = {
  title: string;
  desc: string;
  icon: StaticImageData;
  /** "stack" — ikonka sarlavha ustida (1-qator), "inline" — yonma-yon (2-qator) */
  variant: "stack" | "inline";
  /** prefer-1 shaffof PNG — oʻzining plitkasi yoʻq, CSS gradient plitka beriladi */
  tile?: boolean;
};

const CARDS: Card[] = [
  {
    title: "Qoʻshimcha daromad",
    desc: "Boʻsh vaqtingizda buyurtmalarni qabul qilib, bilim va tajribangiz orqali qoʻshimcha daromad oling.",
    icon: income,
    variant: "stack",
    tile: true,
  },
  {
    title: "Erkin ish vaqti",
    desc: "Qaysi vaqtda ishlash va qaysi buyurtmani qabul qilishni oʻzingiz hal qilasiz. Hech qanday majburiyat mavjud emas!",
    icon: freeTime,
    variant: "stack",
  },
  {
    title: "Yangi mijozlar",
    desc: "Platforma orqali xizmatlaringizga ehtiyoji bor mijozlarni topish osonlashadi.",
    icon: newClients,
    variant: "stack",
  },
  {
    title: "Zamonaviy ish formati",
    desc: "Buyurtmalarni mobil ilova orqali koʻring, qabul qiling va xizmat koʻrsatib qoʻshimcha daromad toping.",
    icon: modernFormat,
    variant: "inline",
  },
  {
    title: "Shaxsiy reyting",
    desc: "Sifatli xizmat koʻrsating, mijozlardan ijobiy baholar oling va platformadagi obroʻyingizni oshiring.",
    icon: rating,
    variant: "inline",
  },
  {
    title: "Platforma koʻmagi",
    desc: "Roʻyxatdan oʻtish va ish jarayonida zarur yoʻriqnoma hamda yordamga ega boʻlasiz.",
    icon: support,
    variant: "inline",
  },
];

function PreferCard({ title, desc, icon, variant, tile }: Card) {
  return (
    <article className="glass-card group flex h-full cursor-default flex-col rounded-[24px] p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-float sm:p-6">
      {/*
        Sarlavha bloki:
        - mobil va planshet (1–2 ustun): har doim ikonka + sarlavha yonma-yon,
          shunda bir qatordagi kartochkalar bir xil koʻrinadi
        - lg+ (3 ustun, maket asli): "stack" variantida ikonka sarlavha ustiga chiqadi
      */}
      <div
        className={`flex items-center gap-4 ${
          variant === "stack" ? "lg:block" : ""
        }`}
      >
        <div
          className={`relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-[20px] transition-transform duration-300 group-hover:scale-[1.06] sm:h-[76px] sm:w-[76px] ${
            tile
              ? "bg-[linear-gradient(150deg,#f7fdf9_0%,#e6f8ec_45%,#bfeed2_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_18px_-12px_rgba(15,64,40,0.35)]"
              : ""
          }`}
        >
          <Image
            src={icon}
            alt=""
            fill
            sizes="76px"
            className={tile ? "object-contain p-[7px]" : "object-cover"}
          />
        </div>

        <h3
          className={`font-display text-[17px] font-bold leading-[1.25] text-ink transition-colors duration-300 group-hover:text-brand-600 sm:text-[19px] ${
            variant === "stack" ? "lg:mt-5" : ""
          }`}
        >
          {title}
        </h3>
      </div>

      <p className="mt-3 text-[13.5px] leading-[1.55] text-body sm:mt-3.5 sm:text-[14px]">
        {desc}
      </p>
    </article>
  );
}

export default function Prefers() {
  return (
    <section
      id="nima-uchun-biz"
      className="relative scroll-mt-24 overflow-hidden pb-28 pt-14 sm:pb-40 sm:pt-20"
      style={{
        backgroundColor: "#fbfdfb",
        backgroundImage:
          "linear-gradient(to bottom, #fbfdfb 0%, rgba(251,253,253,0) 10%, rgba(251,253,253,0) 90%, #fbfdfb 100%)",
      }}
    >
      {/* ===== Fon nurlari (glow) — kartochkalar ortidan oʻtib turadi ===== */}
      {/* Butun sectionni qamrab oluvchi yashil asos — pastga tomon toʻyinadi */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-[12%] -bottom-[14%] top-0 bg-[radial-gradient(70%_58%_at_50%_92%,rgba(79,209,137,0.5),rgba(79,209,137,0)_72%)]"
      />
      {/* Chap chekka nuri */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[14%] top-[22%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(79,209,137,0.58),rgba(79,209,137,0)_70%)] blur-2xl"
      />
      {/* Pastki-chap eng yorqin nuqta */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[10%] left-[10%] h-[520px] w-[700px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(44,193,118,0.62),rgba(44,193,118,0)_72%)] blur-2xl"
      />
      {/* Oʻng chekka nuri — hero-canvas'ning moviy tumanini yashilga buradi */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[12%] top-[34%] h-[560px] w-[540px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(79,209,137,0.6),rgba(79,209,137,0)_70%)] blur-2xl"
      />
      {/* Yuqori-chap yumshoq oreol */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[6%] -top-[8%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(134,224,165,0.42),rgba(134,224,165,0)_70%)] blur-2xl"
      />
      {/* Limon-yashil urgʻu */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[42%] bottom-[6%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(190,230,60,0.24),rgba(190,230,60,0)_70%)] blur-2xl"
      />

      {/* ===== Sochilgan suyuq tomchilar ===== */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[6%] top-[16%] hidden h-5 w-5 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.9)_0%,rgba(190,230,60,0.5)_38%,rgba(79,209,137,0.55)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.16)] blur-[1px] sm:block"
        style={{ animationDuration: "5.5s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[7%] top-[12%] hidden h-3.5 w-3.5 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.9)_0%,rgba(190,230,60,0.55)_38%,rgba(44,193,118,0.55)_78%)] shadow-[0_2px_6px_rgba(11,43,28,0.16)] sm:block"
        style={{ animationDelay: "1.1s", animationDuration: "4.5s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[9%] left-[3%] hidden h-4 w-4 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.9)_0%,rgba(190,230,60,0.5)_38%,rgba(79,209,137,0.6)_78%)] shadow-[0_2px_5px_rgba(11,43,28,0.16)] sm:block"
        style={{ animationDelay: "2.2s", animationDuration: "6s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[14%] right-[4%] hidden h-6 w-6 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.85)_0%,rgba(190,230,60,0.45)_38%,rgba(79,209,137,0.5)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.14)] blur-[1px] sm:block"
        style={{ animationDelay: "3.1s", animationDuration: "6.5s" }}
      />

      {/* Pastki chetni bazaviy rangga tekislaydi — Partners bilan qattiq chiziqsiz
          tutashishi uchun. Barcha glow va tomchi qatlamlaridan keyin turadi,
          shuning uchun ularni ham yopib, keng oq zona hosil qiladi */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[260px] bg-[linear-gradient(to_top,#fbfdfb_0%,#fbfdfb_28%,rgba(251,253,251,0.72)_50%,rgba(251,253,251,0.34)_74%,rgba(251,253,251,0)_100%)] sm:h-[360px]"
      />

      <div className="relative z-[2] mx-auto max-w-[1240px] px-5 sm:px-8">
        {/* ===== Sarlavha ===== */}
        <Reveal className="relative mx-auto max-w-[1120px] text-center">
          <div
            aria-hidden
            className="hero-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[180px] w-[520px] max-w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          />
          <h2 className="font-display text-[26px] font-extrabold leading-[1.2] tracking-[-0.01em] text-ink sm:text-[34px] lg:text-[40px]">
            NIMA UCHUN BIZ?{" "}
            <span className="font-normal">(Siz uchun yangi imkoniyatlar)</span>
          </h2>
        </Reveal>

        {/* ===== Kartochkalar ===== */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {CARDS.map((card, i) => (
            <Reveal
              key={card.title}
              delay={`${(i % 3) * 90 + Math.floor(i / 3) * 60}ms`}
              className="h-full"
            >
              <PreferCard {...card} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Pastki chetni bazaviy rangga tekislaydi — keyingi boʻlim bilan
          qattiq chiziqsiz tutashishi uchun (yuqoridagi glow qatlamlarini yopadi) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[130px] bg-gradient-to-t from-[#fbfdfb] to-transparent"
      />
    </section>
  );
}
