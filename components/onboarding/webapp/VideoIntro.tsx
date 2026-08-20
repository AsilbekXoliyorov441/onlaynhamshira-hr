"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VideoShell from "./VideoShell";
import { Nav } from "./ui";
import { RE_RECORD_REASONS, VIDEO_QUESTIONS } from "@/lib/onboarding/video";
import { startVideoStage } from "@/lib/onboarding/video-api";
import { loadVideo } from "@/lib/onboarding/video-store";
import { loadEducation } from "@/lib/onboarding/education-session";

/*
 * V-00 (VIDEO_INTRODUCTION) va V-09 (VIDEO_RE_RECORD_REQUESTED).
 *
 * Koʻrinish maket boʻyicha: chapda matn va ikkita maʼlumot yorligʻi,
 * oʻngda rasm; pastda "Videoda aytilishi kerak boʻlgan maʼlumotlar"
 * kartochkasi — 8 ta savol. Ranglar saytning oʻz palitrasida.
 *
 * Agar administrator qayta yozishni soʻragan boʻlsa (RE_RECORD_REQUESTED),
 * oddiy kirish matni oʻrniga sabab koʻrsatiladi.
 */
export default function VideoIntro() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [reRecordReason, setReRecordReason] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    /* BR-V-009: Education va Mini Testdan oʻtmasdan bu bosqich ochilmaydi */
    const education = loadEducation();
    if (education.status !== "COMPLETED" && education.status !== "PASSED") {
      router.replace("/hamkor/oquv");
      return;
    }

    const video = loadVideo();
    if (video.status === "RE_RECORD_REQUESTED" && video.reRecordReason) {
      setReRecordReason(RE_RECORD_REASONS[video.reRecordReason]);
    }
    if (video.status === "UPLOADED" || video.status === "ACCEPTED") setUploaded(true);
    setReady(true);
  }, [router]);

  const begin = async () => {
    if (uploaded && !reRecordReason) {
      router.push("/hamkor/video/natija");
      return;
    }
    await startVideoStage();
    router.push("/hamkor/video/rozilik");
  };

  return (
    <VideoShell>
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_270px] lg:items-start lg:gap-8">
        <div>
          <h1 className="font-display text-[26px] font-extrabold leading-[1.16] tracking-[-0.02em] text-ink sm:text-[30px] lg:text-[34px]">
            {reRecordReason ? "Videoni qayta yuborish kerak" : "Oʻzingiz haqingizda qisqa video yuboring"}
          </h1>

          {reRecordReason ? (
            <>
              <p className="mt-4 text-[15.5px] leading-relaxed text-body">
                Administrator videongizni koʻrib chiqdi va quyidagi sababga koʻra yangi video
                yuborishingizni soʻradi:
              </p>
              <div className="mt-4 rounded-2xl border border-[#F0C36D] bg-[#FFF8E8] p-4">
                <p className="text-[15px] leading-relaxed text-[#7A5B14]">{reRecordReason}</p>
              </div>
            </>
          ) : (
            <>
              <p className="mt-4 text-[15.5px] leading-relaxed text-body">
                Keyingi bosqichda oʻzingiz, mutaxassisligingiz va professional tajribangiz
                haqida qisqa video yozishingiz kerak.
              </p>
              <p className="mt-3 text-[15.5px] leading-relaxed text-body">
                Ushbu video Onlayn Hamshira jamoasiga siz bilan yaqindan tanishish va
                hamkorlikka tayyorligingizni baholashga yordam beradi.
              </p>
            </>
          )}

          <div className="mt-6 space-y-2.5">
            <InfoChip icon={<ShieldIcon />}>
              Video administrator yoki HR mutaxassisi tomonidan koʻrib chiqiladi.
            </InfoChip>
            <InfoChip icon={<ClockIcon />}>Taxminiy vaqt: 3–5 daqiqa</InfoChip>
          </div>
        </div>

        {/* Maketdagi rasm oʻrni. Tayyor illyustratsiya kelganda shu blok
            ichidagi tarkib bitta <img> bilan almashtiriladi. */}
        <figure className="relative mt-6 overflow-hidden rounded-[24px] bg-[linear-gradient(150deg,#E9F7EF,#DDF0F7)] p-5 lg:mt-0">
          <div className="relative mx-auto aspect-square w-full max-w-[240px]">
            <img
              src="/nurse-avatar.png"
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="absolute inset-x-[14%] bottom-0 top-[10%] h-auto w-[72%] rounded-[20px] object-cover shadow-[0_18px_36px_-22px_rgba(11,43,28,0.5)]"
            />
            <span
              aria-hidden
              className="absolute left-0 top-[26%] grid h-[54px] w-[54px] place-items-center rounded-2xl bg-surface shadow-[0_12px_26px_-14px_rgba(11,43,28,0.45)]"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-brand-600" fill="currentColor">
                <path d="M8 5.5v13l11-6.5-11-6.5Z" />
              </svg>
            </span>
            <span
              aria-hidden
              className="absolute right-0 top-[14%] flex items-center gap-1 rounded-2xl bg-surface px-3 py-2.5 shadow-[0_12px_26px_-14px_rgba(11,43,28,0.45)]"
            >
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-[6px] w-[6px] rounded-full bg-brand-400" />
              ))}
            </span>
            <img
              src="/icons/prep-video-record-3d.svg"
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="absolute bottom-[6%] right-0 h-[58px] w-[58px] object-contain"
            />
          </div>
        </figure>
      </div>

      {/* Videoda aytilishi kerak boʻlgan maʼlumotlar */}
      <section className="mt-8 rounded-[24px] border border-line bg-surface-2 p-4 sm:p-5">
        <h2 className="text-center font-display text-[17px] font-bold text-ink sm:text-[19px]">
          Videoda aytilishi kerak boʻlgan maʼlumotlar
        </h2>
        <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {VIDEO_QUESTIONS.map((q, i) => (
            <li
              key={q.text}
              className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 sm:flex-col sm:items-center sm:gap-2.5 sm:text-center"
            >
              <span
                aria-hidden
                className="grid h-[28px] w-[28px] shrink-0 place-items-center self-start rounded-full bg-brand-100 font-display text-[13px] font-bold text-brand-700"
              >
                {i + 1}
              </span>
              <img
                src={q.icon}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="hidden h-[34px] w-[34px] object-contain sm:block"
              />
              <span className="min-w-0 text-[14.5px] font-semibold leading-snug text-ink sm:text-[14px]">
                {q.text}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {ready && (
        <Nav
          backHref="/hamkor/oquv/natija"
          onNext={begin}
          nextLabel={
            uploaded && !reRecordReason
              ? "Yuborilgan videoni koʻrish"
              : reRecordReason
              ? "Yangi video yozish"
              : "Davom etish"
          }
        />
      )}
    </VideoShell>
  );
}

function InfoChip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface-2 p-3.5">
      <span aria-hidden className="mt-[1px] shrink-0 text-brand-600">
        {icon}
      </span>
      <p className="min-w-0 text-[14.5px] leading-relaxed text-body">{children}</p>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M12 3l7 3v5.5c0 4.2-2.9 7.9-7 9-4.1-1.1-7-4.8-7-9V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
