"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Standalone from "./Standalone";
import { RE_RECORD_REASONS } from "@/lib/onboarding/video";
import { startVideoStage } from "@/lib/onboarding/video-api";
import { loadVideo } from "@/lib/onboarding/video-store";
import { loadEducation } from "@/lib/onboarding/education-session";

/*
 * V-00 (VIDEO_INTRODUCTION) va V-09 (VIDEO_RE_RECORD_REQUESTED).
 *
 * Ikkalasi bitta manzilda: agar administrator qayta yozishni soʻragan
 * boʻlsa (status RE_RECORD_REQUESTED), oddiy kirish matni oʻrniga
 * sabab va qayta yozish tugmalari koʻrsatiladi.
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
    await startVideoStage();
    router.push("/hamkor/video/korsatmalar");
  };

  return (
    <Standalone badge="Bosqich 7 / 8">
      <>
        {reRecordReason ? (
          <>
            <h1 className="mt-4 font-display text-[27px] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[32px] lg:text-[36px]">
              Videoni qayta yuborish kerak
            </h1>
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
            <h1 className="mt-4 font-display text-[27px] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[32px] lg:text-[36px]">
              Oʻzingiz haqingizda qisqa video yuboring
            </h1>
            <p className="mt-4 text-[15.5px] leading-relaxed text-body">
              Keyingi bosqichda oʻzingiz, mutaxassisligingiz va professional tajribangiz
              haqida qisqa video yozishingiz kerak.
            </p>
            <p className="mt-3 text-[15.5px] leading-relaxed text-body">
              Ushbu video Onlayn Hamshira jamoasiga siz bilan yaqindan tanishish va
              hamkorlikka tayyorligingizni baholashga yordam beradi.
            </p>
            <p className="mt-3 text-[15.5px] leading-relaxed text-body">
              Video administrator yoki HR mutaxassisi tomonidan koʻrib chiqiladi.
            </p>

            <div className="border border-line bg-surface-2 mt-6 flex items-center gap-3 rounded-2xl p-4">
              <span aria-hidden className="text-[20px]">
                ⏱️
              </span>
              <p className="text-[14.5px] font-semibold text-ink">Taxminiy vaqt: 3–5 daqiqa</p>
            </div>
          </>
        )}

        {ready && (
          <div className="mt-8 flex flex-col gap-2.5 lg:mx-auto lg:w-full lg:max-w-[440px]">
            {uploaded && !reRecordReason ? (
              <Link
                href="/hamkor/video/natija"
                className="btn-primary grid h-[56px] place-items-center rounded-pill font-display text-[17px] font-bold text-onbrand transition-transform duration-300 hover:scale-[1.02]"
              >
                Yuborilgan videoni koʻrish
              </Link>
            ) : (
              <button
                type="button"
                onClick={begin}
                className="btn-primary h-[56px] rounded-pill font-display text-[17px] font-bold text-onbrand transition-transform duration-300 hover:scale-[1.02]"
              >
                {reRecordReason ? "Yangi video yozish" : "Davom etish"}
              </button>
            )}
            <Link
              href="/"
              className="grid h-[52px] place-items-center rounded-pill font-display text-[15.5px] font-semibold text-mute transition-colors duration-200 hover:text-ink"
            >
              Saqlash va chiqish
            </Link>
          </div>
        )}
      </>
    </Standalone>
  );
}
