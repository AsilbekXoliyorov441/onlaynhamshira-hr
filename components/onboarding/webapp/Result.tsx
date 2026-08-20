"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/Icons";
import { evaluateQualification, type Evaluation } from "@/lib/onboarding/api";
import { loadSession, saveSession } from "@/lib/onboarding/session";
import { RETRY_AFTER_DAYS, SUPPORT_CONTACT } from "@/lib/onboarding/describe";
import { QUALIFICATION_QUESTIONS } from "@/lib/onboarding/qualification";
import type { RejectionCode } from "@/lib/onboarding/types";

/* TZ Q-10C: rad etish sababi foydalanuvchi tilida (BR-Q-006).
   Ichki kod koʻrsatilmaydi (BR-Q-007). */
const REJECTION_TEXT: Record<RejectionCode, { title: string; text: string }> = {
  NO_MEDICAL_EDUCATION: {
    title: "Tibbiy maʼlumot mavjud emas",
    text: "Onlayn Hamshira platformasida ishlash uchun tegishli tibbiy maʼlumot talab qilinadi.",
  },
  NO_MEDICAL_DIPLOMA: {
    title: "Diplom mavjud emas",
    text: "Hamkorlik uchun tibbiy maʼlumotni tasdiqlovchi diplom zarur.",
  },
  INSUFFICIENT_WORK_EXPERIENCE: {
    title: "Ish tajribasi yetarli emas",
    text: "Platformada ishlash uchun kamida 3 yillik professional ish tajribasi talab qilinadi.",
  },
  NO_COMPATIBLE_DEVICE: {
    title: "Smartfon yoki internet mavjud emas",
    text: "Buyurtmalarni qabul qilish va boshqarish uchun smartfon hamda mobil internet zarur.",
  },
  TERMS_NOT_ACCEPTED: {
    title: "Hamkorlik shartlari qabul qilinmadi",
    text: "Jarayonni davom ettirish uchun platformaning asosiy shartlariga rozilik bildirish zarur.",
  },
};

export default function Result() {
  const params = useSearchParams();
  /* Darhol rad etilganda sabab manzil orqali keladi */
  const immediate = params.get("sabab") as RejectionCode | null;
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

  useEffect(() => {
    const session = loadSession();

    if (immediate) {
      setEvaluation({ result: "NOT_QUALIFIED", rejectionCode: immediate, requiresManualReview: false });
      saveSession({ ...session, status: "NOT_QUALIFIED", completedAt: new Date().toISOString() });
      return;
    }

    evaluateQualification(session).then((result) => {
      setEvaluation(result);
      saveSession({ ...session, status: result.result, completedAt: new Date().toISOString() });
    });
  }, [immediate]);

  if (!evaluation) {
    return (
      <div className="grid min-h-screen place-items-center bg-page">
        <p className="text-[14px] text-mute">Javoblar tekshirilmoqda…</p>
      </div>
    );
  }

  const rejection = evaluation.rejectionCode ? REJECTION_TEXT[evaluation.rejectionCode] : null;

  return (
    <div className="min-h-screen bg-page">
      <div className="mx-auto max-w-[560px] px-5 pb-12 pt-6 sm:px-8">
        <Link href="/" className="inline-flex items-center gap-2" aria-label="Bosh sahifa">
          <LogoMark className="h-9 w-9" />
          <span className="font-display text-[13px] font-extrabold leading-[1.1] text-ink">
            ONLAYN
            <br />
            HAMSHIRA
          </span>
        </Link>

        {evaluation.result === "QUALIFIED" && (
          <Outcome
            emoji="🎉"
            title="Tabriklaymiz, siz dastlabki talablarga mos kelasiz!"
            text="Siz Onlayn Hamshira platformasining dastlabki saralash bosqichidan muvaffaqiyatli oʻtdingiz. Endi platformaning ishlash tartibi va hamkorlik qoidalari bilan tanishish uchun Education bosqichiga oʻtasiz."
            primary={{ label: "Oʻqishni boshlash", href: "/hamkor/oquv" }}
          />
        )}

        {evaluation.result === "MANUAL_REVIEW_REQUIRED" && (
          <Outcome
            emoji="🔍"
            title="Maʼlumotlaringiz qoʻshimcha tekshiruvdan oʻtkaziladi"
            text="Ayrim javoblaringiz administrator tomonidan qoʻshimcha koʻrib chiqilishi kerak. Siz onboarding jarayonini davom ettirishingiz mumkin. Yakuniy qaror hujjatlaringiz tekshirilgandan keyin qabul qilinadi."
            primary={{ label: "Davom etish", href: "/hamkor/oquv" }}
          />
        )}

        {evaluation.result === "NOT_QUALIFIED" && (
          <>
            <Outcome
              emoji="🙏"
              title="Hozircha hamkorlikni davom ettira olmaysiz"
              text="Javoblaringizga koʻra, hozircha platformaning dastlabki talablaridan biriga mos kelmaysiz."
            />

            {rejection && (
              <div className="mt-5 rounded-2xl border border-line bg-surface p-4">
                <p className="font-display text-[16px] font-bold text-ink">{rejection.title}</p>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-body">{rejection.text}</p>
              </div>
            )}

            <p className="mt-4 text-[13.5px] leading-relaxed text-mute">
              Talablarga mos kelganingizdan soʻng, {RETRY_AFTER_DAYS} kundan keyin qayta
              urinib koʻrishingiz mumkin.
            </p>

            <div className="mt-7 flex flex-col gap-2.5">
              <Link
                href={`/hamkor/saralash/${QUALIFICATION_QUESTIONS[0].slug}`}
                className="grid h-[52px] place-items-center rounded-pill border border-line bg-surface font-display text-[15.5px] font-bold text-ink transition-colors duration-200 hover:border-brand-400"
              >
                Javoblarni qayta koʻrish
              </Link>
              <a
                href={SUPPORT_CONTACT.href}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-[52px] place-items-center rounded-pill border border-line bg-surface font-display text-[15.5px] font-bold text-ink transition-colors duration-200 hover:border-brand-400"
              >
                {SUPPORT_CONTACT.label}
              </a>
              <Link
                href="/"
                className="grid h-[52px] place-items-center rounded-pill font-display text-[15.5px] font-semibold text-mute transition-colors duration-200 hover:text-ink"
              >
                Bosh sahifaga qaytish
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Outcome({
  emoji,
  title,
  text,
  primary,
}: {
  emoji: string;
  title: string;
  text: string;
  primary?: { label: string; href: string };
}) {
  return (
    <div className="mt-8">
      <span aria-hidden className="text-[42px]">
        {emoji}
      </span>
      <h1 className="mt-3 font-display text-[26px] font-extrabold leading-[1.18] tracking-[-0.02em] text-ink sm:text-[30px]">
        {title}
      </h1>
      <p className="mt-4 text-[15.5px] leading-relaxed text-body">{text}</p>
      {primary && (
        <Link
          href={primary.href}
          className="btn-primary mt-7 grid h-[54px] place-items-center rounded-pill font-display text-[16.5px] font-bold text-onbrand transition-transform duration-300 hover:scale-[1.02]"
        >
          {primary.label}
        </Link>
      )}
    </div>
  );
}
