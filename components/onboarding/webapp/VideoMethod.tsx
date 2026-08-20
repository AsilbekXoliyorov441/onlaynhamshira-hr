"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import VideoShell from "./VideoShell";
import { Notice } from "./ui";
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
 * WebApp ichidagi kamera (TZ V-04A) zaxira sifatida pastda havola
 * boʻlib turadi — xohlagan yoki `capture` ishlamagan foydalanuvchi
 * uchun.
 */
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
        Videoni qanday yubormoqchisiz?
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-body">
        Video {VIDEO_LIMITS.minDurationSeconds} soniyadan{" "}
        {VIDEO_LIMITS.maxDurationSeconds / 60} daqiqagacha boʻlishi va ovozli boʻlishi kerak.
      </p>

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
          className="flex w-full items-center gap-4 rounded-2xl border-2 border-brand-400 bg-brand-50 p-5 text-left transition-colors duration-200 disabled:opacity-60"
        >
          <span aria-hidden className="text-[28px]">
            🎥
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-[17px] font-bold text-ink">
              Video yozish
            </span>
            <span className="mt-1 block text-[14px] leading-snug text-body">
              Telefoningizning kamerasi ochiladi va shu yerda yozasiz
            </span>
          </span>
        </button>

        <button
          type="button"
          disabled={checking}
          onClick={() => galleryInput.current?.click()}
          className="flex w-full items-center gap-4 rounded-2xl border-2 border-line bg-surface p-5 text-left transition-colors duration-200 hover:border-brand-300 disabled:opacity-60"
        >
          <span aria-hidden className="text-[28px]">
            📁
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-[17px] font-bold text-ink">
              Galereyadan yuklash
            </span>
            <span className="mt-1 block text-[14px] leading-snug text-body">
              Oldindan yozilgan videoni tanlaysiz
            </span>
          </span>
        </button>
      </div>

      {checking && (
        <p className="mt-5 text-center text-[14.5px] font-medium text-body">
          Video tekshirilmoqda…
        </p>
      )}

      {error && (
        <div className="mt-5 rounded-2xl border border-[#E8A2A2] bg-[#FDF3F3] p-4">
          <p className="font-display text-[15.5px] font-bold text-[#8C2F2F]">
            {VIDEO_ERRORS[error].title}
          </p>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#8C2F2F]">
            {VIDEO_ERRORS[error].text}
          </p>
        </div>
      )}

      {/* Zaxira yoʻl: brauzer ichida yozish */}
      <div className="mt-8 border-t border-line pt-5">
        <button
          type="button"
          onClick={() => router.push("/hamkor/video/yozish")}
          className="text-[14.5px] font-semibold text-brand-700 underline underline-offset-4"
        >
          Kamera ochilmadimi? Shu sahifada yozib koʻring
        </button>
        <p className="mt-2 text-[13.5px] leading-relaxed text-mute">
          Bu usulda video brauzer ichida yoziladi. Kuchsiz telefonlarda uzilib qolishi
          mumkin, shu bois avvalgi ikkita usulni tavsiya qilamiz.
        </p>
      </div>

      <Notice>
        Yozishdan oldin: yorugʻ va tinch joyni tanlang, telefonni qimirlatmang, kameraga
        qarab gapiring. Videoda boshqa shaxslar va hujjatlar koʻrinmasin.
      </Notice>

      <div className="mt-8">
        <button
          type="button"
          onClick={() => router.push("/hamkor/video/rozilik")}
          className="h-[52px] w-full rounded-pill border-2 border-line bg-surface font-display text-[16px] font-bold text-ink transition-colors duration-200 hover:border-brand-400"
        >
          Orqaga
        </button>
      </div>
    </VideoShell>
  );
}
