import Image from "next/image";
import Reveal from "./Reveal";
import nurseCup from "@/assets/about/3d-nurse-cup.png";
import testaminal from "@/assets/about/3d-testaminal.png";
import rocks from "@/assets/about/3d-rocks.png";
import clock from "@/assets/about/3d-clock-crop.png";
import medicalHeart from "@/assets/about/3d-medical-heart.png";
import rating from "@/assets/about/3d-rating.png";
import userToUser from "@/assets/about/3d-user-to-user.png";

const LEFT_CARDS = [
  {
    title: "Hamshiralar",
    desc: "Uyda ukol va tomchilatma xizmatini koʻrsating",
    icon: nurseCup,
  },
  {
    title: "Shifokorlar",
    desc: "Bemorni koʻrib, tibbiy konsultatsiya bering",
    icon: testaminal,
  },
  {
    title: "Massaj mutaxassislari",
    desc: "Uy sharoitida davolovchi massaj qiling",
    icon: rocks,
  },
];

const RIGHT_CARDS = [
  {
    title: "Feldsherlar",
    desc: "Shoshilinch tibbiy yordam koʻrsating",
    icon: nurseCup,
  },
  {
    title: "Massaj mutaxassislari",
    desc: "Qulay vaqtda relaks massaj xizmati bering",
    icon: rocks,
  },
  {
    title: "Parvarish boʻyicha mutaxassislar",
    desc: "Qariyalar va bemorlarga gʻamxoʻrlik qiling",
    icon: clock,
  },
];

function ServiceCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: typeof nurseCup;
}) {
  return (
    <div className="glass-card group flex cursor-default items-center gap-4 rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-float sm:p-6">
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-[16px] font-bold leading-[1.25] text-ink transition-colors duration-300 group-hover:text-brand-600 sm:text-[17px]">
          {title}
        </h3>
        <p className="mt-1.5 text-[13.5px] leading-[1.5] text-body">{desc}</p>
      </div>
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl shadow-float transition-transform duration-300 group-hover:scale-105 sm:h-[76px] sm:w-[76px]">
        <Image
          src={icon}
          alt=""
          sizes="76px"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="platforma-haqida"
      className="relative scroll-mt-24 overflow-hidden py-14 sm:py-20"
>
      {/* Fon nurlari — tarqoq yashil glow'lar */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] -top-[6%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(79,209,137,0.32),rgba(79,209,137,0)_70%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-[38%] h-[220px] w-[220px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(134,224,165,0.3),rgba(134,224,165,0)_70%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[8%] top-[10%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(105,220,140,0.22),rgba(105,220,140,0)_70%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[2%] right-[4%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(79,209,137,0.3),rgba(79,209,137,0)_70%)] blur-2xl"
      />
      {/* Oʻng grid orqasidagi kuchliroq yashil fon — glass-card shaffofligi bilinishi uchun */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[0%] top-[4%] h-[96%] w-[58%] rounded-[60px] bg-[radial-gradient(65%_60%_at_50%_35%,rgba(79,209,137,0.5),rgba(79,209,137,0)_72%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] bottom-[6%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(44,193,118,0.45),rgba(44,193,118,0)_70%)] blur-2xl"
      />
      {/* Sochilgan suyuq tomchilar (liquid droplet effekti) */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[14%] right-[9%] h-6 w-6 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.9)_0%,rgba(190,230,60,0.55)_38%,rgba(79,209,137,0.55)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.18)] blur-[1px]"
        style={{ animationDuration: "5.5s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[22%] right-[3%] h-4 w-4 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.9)_0%,rgba(190,230,60,0.55)_38%,rgba(44,193,118,0.55)_78%)] shadow-[0_2px_6px_rgba(11,43,28,0.16)]"
        style={{ animationDelay: "0.8s", animationDuration: "4.5s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[8%] right-[16%] h-3.5 w-3.5 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.9)_0%,rgba(190,230,60,0.55)_38%,rgba(79,209,137,0.6)_78%)] shadow-[0_2px_5px_rgba(11,43,28,0.16)]"
        style={{ animationDelay: "1.6s", animationDuration: "6s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[8%] right-[22%] h-3.5 w-3.5 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.9)_0%,rgba(190,230,60,0.5)_38%,rgba(79,209,137,0.55)_78%)] shadow-[0_2px_5px_rgba(11,43,28,0.16)]"
        style={{ animationDelay: "2.4s", animationDuration: "5s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[4%] right-[16%] h-5 w-5 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.85)_0%,rgba(190,230,60,0.45)_38%,rgba(79,209,137,0.45)_78%)] shadow-[0_2px_6px_rgba(11,43,28,0.14)] blur-[1px]"
        style={{ animationDelay: "3.2s", animationDuration: "6.5s" }}
      />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid items-start gap-x-8 gap-y-14 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
          {/* ================= CHAP: taʼrif kartasi ================= */}
          <div className="relative">
            <Reveal>
              <div className="glass-card relative overflow-hidden rounded-[32px] p-7 sm:p-9">
                {/* Oʻrta qismdagi yashil-limon rangli glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(190,230,60,0.5),rgba(79,209,137,0.45)_55%,rgba(79,209,137,0)_80%)] blur-3xl sm:h-[300px] sm:w-[300px]"
                />

                <div className="relative z-10">
                  <h2 className="font-display text-[28px] font-extrabold leading-[1.15] sm:text-[32px]">
                    <span className="text-brand-600">Onlayn Hamshira</span>
                    <br />
                    <span className="text-ink">nima?</span>
                  </h2>

                  <p className="mt-4 text-[15px] leading-[1.62] text-body">
                    Onlayn Hamshira — bemorlar va malakali tibbiyot
                    mutaxassislarini yagona platformada birlashtiradigan
                    zamonaviy xizmat.
                  </p>
                  <p className="mt-3 text-[15px] leading-[1.62] text-body">
                    Platforma orqali mijozlar oʻzlariga kerakli tibbiy
                    xizmatni uyiga chaqiradi. Mutaxassis esa oʻz hududi va
                    imkoniyatidan kelib chiqib, mos buyurtmalarni qabul
                    qiladi.
                  </p>
                  <p className="mt-3 text-[15px] leading-[1.62] text-body">
                    Onlayn Hamshira tibbiyot mutaxassislariga zamonaviy
                    formatda ishlash, yangi mijozlar topish va qoʻshimcha
                    daromad olish imkonini beradi.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Suzuvchi mini kartochkalar — card chegarasidan tashqariga chiqib turadi */}
            <Reveal
              delay="150ms"
              className="relative z-10 -mt-6 flex items-start gap-4 px-4 sm:-mt-8 sm:px-7"
            >
              <div className="w-[46%] max-w-[168px]">
                <div className="glass-card relative aspect-[4/3] overflow-hidden rounded-2xl p-0 transition-transform duration-300 hover:scale-[1.03]">
                  <Image
                    src={rating}
                    alt=""
                    fill
                    sizes="168px"
                    className="object-cover"
                  />
                </div>
                {/* 3 mutaxassis avatari */}
                <div className="relative z-10 -mt-4 flex -space-x-2.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="relative flex h-[30px] w-[30px] items-center justify-center overflow-hidden rounded-full ring-2 ring-white transition-transform duration-300 hover:z-10 hover:scale-110"
                    >
                      <Image
                        src="/nurse-icon-avatar.png"
                        alt=""
                        width={30}
                        height={30}
                        className="h-full w-full object-cover"
                      />
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-[46%] max-w-[168px]">
                <div className="glass-card relative aspect-[4/3] overflow-hidden rounded-2xl p-0 transition-transform duration-300 hover:scale-[1.03]">
                  <Image
                    src={userToUser}
                    alt=""
                    fill
                    sizes="168px"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* ================= OʻNG: xizmatlar ================= */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <div className="flex flex-col gap-4 sm:gap-5">
              {LEFT_CARDS.map((card, i) => (
                <Reveal key={card.title} delay={`${i * 90}ms`}>
                  <ServiceCard {...card} />
                </Reveal>
              ))}
            </div>
            <div className="flex flex-col gap-4 sm:gap-5">
              {RIGHT_CARDS.map((card, i) => (
                <Reveal key={card.title} delay={`${i * 90 + 60}ms`}>
                  <ServiceCard {...card} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Katta yurak ikonkasi — faqat 2 ustunli joylashuvda (lg+) ustunlar chegarasida suzadi */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[38%] top-[8%] z-20 hidden w-[100px] animate-floaty lg:block"
        >
          <Image
            src={medicalHeart}
            alt=""
            sizes="100px"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
