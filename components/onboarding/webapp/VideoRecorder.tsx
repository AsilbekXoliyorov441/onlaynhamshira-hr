"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import VideoShell from "./VideoShell";
import { VIDEO_ERRORS, VIDEO_LIMITS, formatDuration } from "@/lib/onboarding/video";
import { validateVideo } from "@/lib/onboarding/video-validate";
import { loadVideo, storeSelectedVideo, type VideoSession } from "@/lib/onboarding/video-store";

/*
 * V-04A: VIDEO_CAMERA_CAPTURE — brauzer ichida video yozish.
 *
 * Bu zaxira yoʻl: asosiy yoʻl qurilmaning oʻz kamerasi (V-03).
 * Shu sabab bu yerda ortiqcha imkoniyat yoʻq — preview, taymer,
 * kamera almashtirish, toʻxtatish va bekor qilish.
 *
 * Business Rules (TZ V-04A):
 *   — 30 soniyadan qisqa video tasdiqlanmaydi;
 *   — 3 daqiqada yozish avtomatik toʻxtaydi;
 *   — ovozsiz video qabul qilinmaydi (audio majburiy soʻraladi);
 *   — kamera yoki mikrofon ruxsati boʻlmasa, galereyaga yoʻnaltiriladi.
 */

type Phase = "idle" | "ready" | "recording" | "processing" | "denied";

const MIME_CANDIDATES = [
  "video/webm;codecs=vp9,opus",
  "video/webm;codecs=vp8,opus",
  "video/webm",
  "video/mp4",
];

function pickMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  return MIME_CANDIDATES.find((type) => MediaRecorder.isTypeSupported(type));
}

export default function VideoRecorder() {
  const router = useRouter();
  const [session, setSession] = useState<VideoSession | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [seconds, setSeconds] = useState(0);
  const [facing, setFacing] = useState<"user" | "environment">("user");
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const video = loadVideo();
    if (video.status === "NOT_STARTED") {
      router.replace("/hamkor/video");
      return;
    }
    setSession(video);
  }, [router]);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  /* Kamerani ochish */
  const openCamera = useCallback(
    async (mode: "user" | "environment") => {
      setError(null);
      stopStream();
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: mode, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: true,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => undefined);
        }
        setPhase("ready");
      } catch {
        /* Ruxsat berilmadi yoki kamera mavjud emas */
        setPhase("denied");
      }
    },
    [stopStream],
  );

  useEffect(() => {
    if (!session) return;
    openCamera(facing);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      stopStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, facing]);

  const finishRecording = useCallback(
    async (blob: Blob) => {
      if (!session) return;
      setPhase("processing");
      const file = new File([blob], `video-xabar.${blob.type.includes("mp4") ? "mp4" : "webm"}`, {
        type: blob.type,
      });
      const result = await validateVideo(file, "camera");
      if (!result.ok) {
        setError(VIDEO_ERRORS[result.error].text);
        setPhase("ready");
        setSeconds(0);
        return;
      }
      await storeSelectedVideo(session, file, result.meta);
      stopStream();
      router.push("/hamkor/video/tekshirish");
    },
    [session, router, stopStream],
  );

  const stopRecording = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    recorderRef.current?.state === "recording" && recorderRef.current.stop();
  }, []);

  const startRecording = () => {
    const stream = streamRef.current;
    if (!stream) return;
    const mimeType = pickMimeType();
    if (!mimeType) {
      setError("Bu brauzer video yozishni qoʻllab-quvvatlamaydi. Galereyadan yuklang.");
      return;
    }

    chunksRef.current = [];
    const recorder = new MediaRecorder(stream, { mimeType });
    recorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType });
      finishRecording(blob);
    };

    recorder.start(1000);
    setPhase("recording");
    setSeconds(0);
    setError(null);

    timerRef.current = window.setInterval(() => {
      setSeconds((prev) => {
        const next = prev + 1;
        /* 3 daqiqada avtomatik toʻxtaydi */
        if (next >= VIDEO_LIMITS.maxDurationSeconds) stopRecording();
        return next;
      });
    }, 1000);
  };

  if (!session) {
    return (
      <div className="onboarding-bg grid min-h-screen place-items-center">
        <p className="text-[14px] text-mute">Yuklanmoqda…</p>
      </div>
    );
  }

  /* Ruxsat berilmagan holat */
  if (phase === "denied") {
    return (
      <VideoShell>
        <h1 className="font-display text-[24px] font-extrabold leading-snug text-ink sm:text-[27px]">
          Kameradan foydalanishga ruxsat berilmadi
        </h1>
        <p className="mt-4 text-[15.5px] leading-relaxed text-body">
          Video yozish uchun brauzer yoki qurilma sozlamalaridan kamera va mikrofon
          ruxsatini yoqing. Yoki tayyor videoni galereyadan yuklang.
        </p>
        <div className="mt-8 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => openCamera(facing)}
            className="btn-primary h-[56px] rounded-pill font-display text-[17px] font-bold text-onbrand"
          >
            Qayta tekshirish
          </button>
          <button
            type="button"
            onClick={() => router.push("/hamkor/video/usul")}
            className="h-[56px] rounded-pill border-2 border-line bg-surface font-display text-[16px] font-bold text-ink"
          >
            Galereyadan video yuklash
          </button>
        </div>
      </VideoShell>
    );
  }

  const tooShort = seconds < VIDEO_LIMITS.minDurationSeconds;

  return (
    <VideoShell>
      <h1 className="font-display text-[22px] font-extrabold leading-snug text-ink sm:text-[25px]">
        Video yozish
      </h1>

      <div className="relative mt-5 overflow-hidden rounded-[24px] bg-[#0B2B1C]">
        <video
          ref={videoRef}
          playsInline
          muted
          className="aspect-[3/4] w-full object-cover"
        />

        {/* Taymer */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-pill bg-[rgba(11,43,28,0.7)] px-3 py-1.5">
          {phase === "recording" && (
            <span aria-hidden className="h-[9px] w-[9px] rounded-full bg-[#F05050]" />
          )}
          <span className="font-display text-[13.5px] font-bold tabular-nums text-white">
            {formatDuration(seconds)} / {formatDuration(VIDEO_LIMITS.maxDurationSeconds)}
          </span>
        </div>

        {/* Kamera almashtirish */}
        {phase !== "recording" && (
          <button
            type="button"
            onClick={() => setFacing((f) => (f === "user" ? "environment" : "user"))}
            className="absolute right-4 top-4 rounded-pill bg-[rgba(11,43,28,0.7)] px-3.5 py-2 text-[13px] font-semibold text-white"
          >
            {facing === "user" ? "Orqa kamera" : "Old kamera"}
          </button>
        )}
      </div>

      {/* Davomiylik chizigʻi */}
      <div className="mt-3 h-[6px] w-full overflow-hidden rounded-pill bg-[color:var(--c-line)]/60">
        <div
          className={`h-full rounded-pill transition-[width] duration-500 ${
            tooShort ? "bg-[#F0C36D]" : "bg-[linear-gradient(90deg,#4FD189,#1BA463)]"
          }`}
          style={{ width: `${Math.min(100, (seconds / VIDEO_LIMITS.maxDurationSeconds) * 100)}%` }}
        />
      </div>
      <p className="mt-2 text-[13.5px] text-mute">
        {phase === "recording" && tooShort
          ? `Yana ${VIDEO_LIMITS.minDurationSeconds - seconds} soniya — video kamida ${
              VIDEO_LIMITS.minDurationSeconds
            } soniya boʻlishi kerak`
          : `Video ${VIDEO_LIMITS.minDurationSeconds} soniyadan ${
              VIDEO_LIMITS.maxDurationSeconds / 60
            } daqiqagacha boʻlishi kerak`}
      </p>

      {error && (
        <div className="mt-4 rounded-2xl border border-[#E8A2A2] bg-[#FDF3F3] p-4">
          <p className="text-[14.5px] leading-relaxed text-[#8C2F2F]">{error}</p>
        </div>
      )}

      {phase === "processing" && (
        <p className="mt-5 text-center text-[14.5px] font-medium text-body">
          Video tayyorlanmoqda…
        </p>
      )}

      <div className="mt-7 flex flex-col gap-2.5">
        {phase === "recording" ? (
          <button
            type="button"
            onClick={stopRecording}
            disabled={tooShort}
            className={`h-[56px] rounded-pill font-display text-[17px] font-bold transition-all duration-300 ${
              tooShort
                ? "cursor-not-allowed border-2 border-line bg-surface-2 text-mute"
                : "bg-[#E05050] text-white"
            }`}
          >
            {tooShort ? `Yozilmoqda… ${formatDuration(seconds)}` : "Yozishni toʻxtatish"}
          </button>
        ) : (
          <button
            type="button"
            onClick={startRecording}
            disabled={phase !== "ready"}
            className="btn-primary h-[56px] rounded-pill font-display text-[17px] font-bold text-onbrand disabled:opacity-60"
          >
            Yozishni boshlash
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            stopStream();
            router.push("/hamkor/video/usul");
          }}
          className="h-[52px] rounded-pill border-2 border-line bg-surface font-display text-[16px] font-bold text-ink transition-colors duration-200 hover:border-brand-400"
        >
          Bekor qilish
        </button>
      </div>
    </VideoShell>
  );
}
