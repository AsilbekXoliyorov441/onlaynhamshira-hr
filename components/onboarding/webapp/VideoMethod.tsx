"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import VideoShell from "./VideoShell";
import VideoScriptCard from "./VideoScriptCard";
import { Nav } from "./ui";
import { VIDEO_ERRORS, VIDEO_LIMITS } from "@/lib/onboarding/video";
import { validateVideo } from "@/lib/onboarding/video-validate";
import { loadVideo, storeSelectedVideo, type VideoSession } from "@/lib/onboarding/video-store";
import type { VideoValidationError } from "@/lib/onboarding/types";

/*
 * V-03 (VIDEO_CAPTURE_METHOD) va V-04B (VIDEO_FILE_UPLOAD) bitta
 * ekranda.
 *
 * "Video yozish" tugmasi qurilmaning OʻZ kamera ilovasini ochadi
 * (`capture="user"`). Sabab: auditoriyaning katta qismi oʻrta darajali
 * Android ishlatadi — u yerda brauzer ichida uzoq video yozish xotirani
 * toʻldiradi va uzilib qolishi mumkin. Qurilma kamerasi esa tanish
 * interfeys beradi, oʻzi siqadi va tayyor fayl qaytaradi.
 *
 * Ekran ataylab "qadam-baqadam" tuzilgan: avval NIMA boʻlishi yozilgan,
 * keyin NIMA DEYISH kerakligi, undan keyingina tugmalar. Auditoriyaning
 * katta qismi telefondan erkin foydalanmaydi — nima boʻlishini oldindan
 * bilmasa, tugmani bosishga qoʻrqadi.
 */

const STEPS = [
  {
    icon: "📱",
    title: "Telefoningizning kamerasi ochiladi",
    text: "Pastdagi yashil tugmani bosasiz — telefoningizdagi odatdagi kamera ilovasi ochiladi.",
  },
  {
    icon: "🗣️",
    title: "Oʻzingiz haqingizda gapirasiz",
    text: "Kameraga qarab, quyidagi namuna matn boʻyicha 1–2 daqiqa gapirasiz va yozishni toʻxtatasiz.",
  },
  {
    icon: "✅",
    title: "Videoni koʻrib, yuborasiz",
    text: "Video shu yerga qaytadi. Uni koʻrib chiqasiz, yoqmasa qayta yozasiz — yoqsa yuborasiz.",
  },
];

export default function VideoMethod() {
  const router = useRouter();
  const [session, setSession] = useState<VideoSession | null>(null);
  const [error, setError] = useState<VideoValidationError | null>(null);
  const [checking, setChecking] = useState(false);

  const cameraInput = useRef<HTMLInputElement>(null);
  const galleryInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const video = loadVideo();
    if (video.status === "NOT_STARTED") {
      router.replace("/hamkor/video");
      return;
    }
    setSession(video);
  }, [router]);

  const handleFile = async (file: File | undefined, source: "camera" | "gallery") => {
    if (!file || !session) return;
    setError(null);
    setChecking(true);

    const result = await validateVideo(file, source);
    if (!result.ok) {
      setError(result.error);
      setChecking(false);
      return;
    }

    await storeSelectedVideo(session, file, result.meta);
    router.push("/hamkor/video/tekshirish");
  };

  if (!session) {
    return (
      <div className="onboarding-bg grid min-h-screen place-items-center">
        <p className="text-[14px] text-mute">Yuklanmoqda…</p>
      </div>
    );
  }

  return (
    <VideoShell>
      <h1 className="font-display text-[24px] font-extrabold leading-snug text-ink sm:text-[27px] lg:text-[31px]">
        Endi videoni yozamiz
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-body">
        Hammasi uch qadamda boʻladi. Shoshilmang — xato qilsangiz, videoni qayta yozish
        mumkin.
      </p>

      {/* Nima boʻlishini oldindan aytamiz */}
      <ol className="mt-6 space-y-3 lg:grid lg:grid-cols-3 lg:gap-3 lg:space-y-0">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="flex gap-3.5 rounded-2xl border border-line bg-surface p-4 lg:flex-col lg:gap-2"
          >
            <span
              aria-hidden
              className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-brand-50 text-[20px]"
            >
              {step.icon}
            </span>
            <span className="min-w-0">
              <span className="block font-display text-[15.5px] font-bold leading-snug text-ink">
                {i + 1}. {step.title}
              </span>
              <span className="mt-1 block text-[14px] leading-relaxed text-body">{step.text}</span>
            </span>
          </li>
        ))}
      </ol>

      {/* Namuna matn — kamera ochilishidan oldin koʻz oldida turishi kerak */}
      <div className="mt-5">
        <VideoScriptCard defaultOpen />
      </div>

      {/* Yashirin fayl maydonlari */}
      <input
        ref={cameraInput}
        type="file"
        accept="video/*"
        capture="user"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0], "camera")}
      />
      <input
        ref={galleryInput}
        type="file"
        accept="video/mp4,video/quicktime,video/webm,video/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0], "gallery")}
      />

      <div className="mt-7 space-y-3">
        <button
          type="button"
          disabled={checking}
          onClick={() => cameraInput.current?.click()}
          className="btn-primary flex w-full items-center gap-4 rounded-[22px] p-5 text-left text-onbrand transition-transform duration-300 hover:scale-[1.01] disabled:opacity-60"
        >
          <span aria-hidden className="text-[30px]">
            🎥
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-[18px] font-extrabold">
              Hoziroq video yozish
            </span>
            <span className="mt-1 block text-[14px] leading-snug opacity-80">
              Telefoningizning kamerasi ochiladi
            </span>
          </span>
        </button>

        <button
          type="button"
          disabled={checking}
          onClick={() => galleryInput.current?.click()}
          className="flex w-full items-center gap-4 rounded-[22px] border-2 border-line bg-surface p-5 text-left transition-colors duration-200 hover:border-brand-400 disabled:opacity-60"
        >
          <span aria-hidden className="text-[30px]">
            📁
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-[17px] font-bold text-ink">
              Avval yozib qoʻygan videom bor
            </span>
            <span className="mt-1 block text-[14px] leading-snug text-body">
              Telefon xotirasidan tanlaysiz
            </span>
          </span>
        </button>
      </div>

      {checking && (
        <p className="mt-5 rounded-2xl bg-surface-2 py-3 text-center text-[15px] font-semibold text-body">
          Video tekshirilmoqda, biroz kuting…
        </p>
      )}

      {error && (
        <div className="mt-5 rounded-2xl border-2 border-[#E8A2A2] bg-[#FDF3F3] p-4">
          <p className="font-display text-[15.5px] font-bold text-[#8C2F2F]">
            {VIDEO_ERRORS[error].title}
          </p>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#8C2F2F]">
            {VIDEO_ERRORS[error].text}
          </p>
          <p className="mt-2.5 text-[14px] font-semibold text-[#8C2F2F]">
            Yuqoridagi tugmani qayta bosib, boshqa video yozing.
          </p>
        </div>
      )}

      {/* Zaxira yoʻl: brauzer ichida yozish */}
      <div className="mt-8 rounded-2xl border border-line bg-surface-2 p-4">
        <p className="text-[14.5px] leading-relaxed text-body">
          Yashil tugmani bosganingizda kamera ochilmadimi?
        </p>
        <button
          type="button"
          onClick={() => router.push("/hamkor/video/yozish")}
          className="mt-2 text-[14.5px] font-bold text-brand-700 underline underline-offset-4"
        >
          Shu sahifaning oʻzida yozib koʻring
        </button>
      </div>

      <p className="mt-5 text-[13.5px] leading-relaxed text-mute">
        Video {VIDEO_LIMITS.minDurationSeconds} soniyadan{" "}
        {VIDEO_LIMITS.maxDurationSeconds / 60} daqiqagacha boʻlishi kerak. Yorugʻ va tinch
        joyni tanlang, telefonni qimirlatmang, kameraga qarab gapiring.
      </p>

      <Nav backHref="/hamkor/video/rozilik" backLabel="Orqaga" />
    </VideoShell>
  );
}
