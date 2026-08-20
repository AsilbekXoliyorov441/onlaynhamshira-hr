"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n/LanguageProvider";
import PhoneMockup from "./PhoneMockup";
import FloatingCard from "./FloatingCard";
import {
  PinIcon,
  ChatIcon,
  WalletIcon,
  StarIcon,
  UserGlyph,
} from "./Icons";
import {
  HeartPlus3D,
  MoneyBag3D,
  GrowthChart3D,
  Stethoscope3D,
  DashedLinks,
} from "./Decor";

const AVATARS = [
  "linear-gradient(150deg,#FFD9BC,#F0A57A)",
  "linear-gradient(150deg,#CDEBFF,#8CC4EE)",
  "linear-gradient(150deg,#D6F5DF,#84D9A6)",
  "linear-gradient(150deg,#CBF3E8,#4FD9C4)",
];

export default function Hero() {
  const t = useT();
  return (
    <section className="relative overflow-hidden pb-16 pt-6 sm:pb-24 lg:pb-10 lg:pt-2">
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-6">
        {/* ================= CHAP: matn ================= */}
        <div className="relative">
          <div
            aria-hidden
            className="hero-glow absolute -left-[18%] -top-[14%] h-[440px] w-[560px] rounded-full"
          />

          <div className="relative">
            {/* Yorliq */}
            <span className="badge-pill inline-flex animate-rise items-center gap-2 rounded-pill py-[7px] pl-3 pr-4 text-[13.5px] font-semibold shadow-[0_6px_16px_-8px_rgba(11,43,28,0.25)]">
              <Image
                src="/cuocces.png"
                alt=""
                width={19}
                height={20}
                className="h-[19px] w-[18px]"
              />
              {t.hero.badge}
            </span>

            {/* Sarlavha */}
            <h1
              className="mt-5 animate-rise font-display text-[clamp(2.35rem,4.6vw,4.1rem)] font-extrabold leading-[1.06] tracking-[-0.033em] text-ink lg:text-[clamp(2.1rem,3.4vw,3.3rem)]"
              style={{ animationDelay: "80ms" }}
            >
              {t.hero.title[0]}
              <br className="hidden sm:block" /> {t.hero.title[1]}
              <br className="hidden sm:block" /> {t.hero.title[2]}
            </h1>

            {/* Tavsif */}
            <p
              className="mt-5 max-w-[470px] animate-rise text-[16.5px] leading-[1.62] text-body"
              style={{ animationDelay: "160ms" }}
            >
              {t.hero.desc}
            </p>

            {/* Tugmalar */}
            <div
              className="mt-9 flex animate-rise flex-wrap items-center gap-4"
              style={{ animationDelay: "240ms" }}
            >
              <a
                href="/hamkor"
                className="btn-primary rounded-pill px-8 py-4 font-display text-[16px] font-bold text-onbrand transition-all duration-300 hover:scale-105 active:scale-100"
              >
                {t.hero.ctaPrimary}
              </a>
              <a
                href="#platforma-haqida"
                className="btn-secondary rounded-pill px-8 py-4 font-display text-[16px] font-bold text-ink transition-all duration-300 hover:scale-105 active:scale-100"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            {/* Ijtimoiy dalil */}
            <div
              className="mt-10 flex animate-rise items-center gap-4"
              style={{ animationDelay: "320ms" }}
            >
              <div className="flex -space-x-3">
                {AVATARS.map((_, i) => (
                  <span
                    key={i}
                    className="relative flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full ring-[2.5px] ring-white"
                  >
                    <Image
                      src="/nurse-icon-avatar.png"
                      alt=""
                      width={38}
                      height={38}
                      className="h-full w-full object-cover"
                    />
                  </span>
                ))}
              </div>
              <p className="max-w-[300px] text-[13.5px] leading-[1.5] text-body">
                {t.hero.social}
              </p>
            </div>
          </div>
        </div>

        {/* ================= OʻNG: vizual ================= */}
        <div className="relative mx-auto w-full max-w-[600px]">
          <div className="relative aspect-[600/660] w-full">
            {/* Shisha panel */}
            <div
              aria-hidden
              className="glass-panel absolute inset-x-[13%] inset-y-[3%] rounded-[40px]"
            />

            {/* Punktir bogʻlanishlar */}
            <DashedLinks
              aria-hidden
              className="absolute inset-0 h-full w-full"
            />

            {/* 3D dekor */}
            <div
              aria-hidden
              className="absolute right-[1%] top-[6%] w-[17%] animate-drift"
            >
              {/* Orqadagi shaffof yashil glow */}
              <div className="absolute inset-[-35%] rounded-full bg-[radial-gradient(60%_60%_at_50%_50%,rgba(79,209,137,0.45),rgba(79,209,137,0)_72%)] blur-xl" />
              {/* Shisha panel */}
              <div className="glass-panel relative rounded-[30%] p-[16%] shadow-float">
                <HeartPlus3D className="h-full w-full" />
              </div>
            </div>
            <MoneyBag3D
              aria-hidden
              className="absolute right-[16%] top-[36%] w-[11%] animate-drift"
              style={{ animationDelay: "1.2s" }}
            />
            <GrowthChart3D
              aria-hidden
              className="absolute right-[0%] top-[33%] w-[16%] animate-drift"
              style={{ animationDelay: "2s" }}
            />
            <Stethoscope3D
              aria-hidden
              className="absolute bottom-[16%] left-[3%] w-[16%] animate-drift"
              style={{ animationDelay: "0.6s" }}
            />

            {/* Telefon */}
            <div className="absolute inset-0 flex items-start justify-center pt-[3%]">
              <PhoneMockup />
            </div>

            {/* Shifokor avatari */}
            <div
              aria-hidden
              className="absolute left-[calc(25%_-_10px)] top-[30%] z-30 hidden h-[54px] w-[54px] animate-floaty items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#E9F7EE,#BCE6CD)] shadow-float ring-2 ring-white sm:flex"
              style={{ animationDelay: "0.9s" }}
            >
              <UserGlyph className="absolute -bottom-1 h-[44px] w-[44px] text-white/90" />
            </div>

            {/* Suzuvchi kartochkalar */}
            {/* Mobilda 4tasi ham chap ustunda ustma-ust joylashadi (telefon
                tor ekranda deyarli butun kengligini egallagani uchun),
                sm dan boshlab asl (atrofga yoyilgan) joylashuvga qaytadi. */}
            <FloatingCard
              icon={<PinIcon className="h-[15px] w-[15px]" />}
              className="left-[0%] top-[6%] w-[44%] max-w-[152px] sm:top-[13%] sm:w-[46%] sm:max-w-[188px]"
            >
              {t.hero.cards[0][0]}
              <br />
              {t.hero.cards[0][1]}
            </FloatingCard>

            <FloatingCard
              icon={<ChatIcon className="h-[15px] w-[15px]" />}
              className="left-[0%] top-[27%] w-[44%] max-w-[152px] sm:left-[-3%] sm:top-[46%] sm:w-[46%] sm:max-w-[188px]"
              delay="1.4s"
              duration="7s"
            >
              {t.hero.cards[1][0]}
              <br />
              {t.hero.cards[1][1]}
            </FloatingCard>

            <FloatingCard
              icon={<WalletIcon className="h-[15px] w-[15px]" />}
              className="left-[0%] top-[48%] w-[44%] max-w-[152px] sm:left-auto sm:right-[-2%] sm:top-[56%] sm:w-[44%] sm:max-w-[184px]"
              delay="0.7s"
              duration="6.5s"
            >
              {t.hero.cards[2][0]}
              <br />
              {t.hero.cards[2][1]}
            </FloatingCard>

            <FloatingCard
              icon={<StarIcon className="h-[15px] w-[15px]" />}
              className="left-[0%] top-[69%] w-[44%] max-w-[152px] sm:left-auto sm:bottom-[13%] sm:top-auto sm:right-[1%] sm:w-[44%] sm:max-w-[184px]"
              delay="2.1s"
              duration="7.5s"
            >
              {t.hero.cards[3][0]}
              <br />
              {t.hero.cards[3][1]}
            </FloatingCard>
          </div>
        </div>
      </div>
    </section>
  );
}
