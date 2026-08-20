"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import VideoShell from "./VideoShell";
import VideoScriptCard from "./VideoScriptCard";
import { Nav } from "./ui";
import {
  VIDEO_ERRORS,
  VIDEO_LIMITS,
  VIDEO_RECORD_TIPS,
  formatDuration,
} from "@/lib/onboarding/video";
import { validateVideo } from "@/lib/onboarding/video-validate";
import { loadVideo, storeSelectedVideo, type VideoSession } from "@/lib/onboarding/video-store";

/*
 * V-01: "Video yozish yoki yuklash" — maketdagi bitta ekran.
 *
 * Ilgari bu ikkita alohida sahifa edi (usul tanlash + yozish). Maket
 * boʻyicha ikkalasi bitta ekranda, ikkita yorliq (tab) ostida:
 *   — "Yozish (kamera orqali)": sahifaning oʻzida kamera, taymer va
 *     qizil tugma;
 *   — "Yuklash (galereyadan)": telefon xotirasidan tayyor fayl.
 *
 * Kamera ochilmasa (ruxsat berilmagan yoki qurilma qoʻllab-quvvatlamaydi)
 * ekran avtomatik "Yuklash" yorligʻiga oʻtadi va sababi yozib qoʻyiladi —
 * foydalanuvchi boshi berk koʻchada qolmaydi.
 *
 * Chapdagi yon panel (kompyuterda) — topshiriq va tavsiyalar; telefonda
 * ular kameraning ostida ixcham koʻrinishda.
 */

type Phase = "idle" | "ready" | "recording" | "processing" | "denied";
type Tab = "record" | "upload";

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

export default function VideoCapture() {
  const router = useRouter();
  const [session, setSession] = useState<VideoSession | null>(null);
  const [tab, setTab] = useState<Tab>("record");
  const [phase, setPhase] = useState<Phase>("idle");
  const [seconds, setSeconds] = useState(0);
  const [facing, setFacing] = useState<"user" | "environment">("user");
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [allTips, setAllTips] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<number | null>(null);
  const secondsRef = useRef(0);
  const galleryInput = useRef<HTMLInputElement>(null);
  const deviceCameraInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const video = loadVideo();
    if (video.status === "NOT_STARTED") {
      router.replace("/hamkor/video");
      return;
    }
    /* "?yuklash=1" — preview ekranidan "Yuklashni almashtirish" bilan
       kelinganda darrov yuklash yorligʻi ochiladi. `useSearchParams`
       oʻrniga `location` — sahifa statik boʻlib qolaveradi. */
    if (typeof window !== "undefined" && window.location.search.includes("yuklash=1")) {
      setTab("upload");
    }
    setSession(video);
  }, [router]);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

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
        setPhase("denied");
      }
    },
    [stopStream],
  );

  /* Kamera faqat "Yozish" yorligʻi ochiq boʻlganda ishlaydi — boshqa
     yorliqda kamerani yoqib qoʻyish qurilma quvvatini bekorga yeydi */
  useEffect(() => {
    if (!session) return;
    if (tab !== "record") {
      stopStream();
      return;
    }
    openCamera(facing);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      stopStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, facing, tab]);

  const accept = useCallback(
    async (file: File, source: "camera" | "gallery", durationHint?: number) => {
      if (!session) return false;
      const result = await validateVideo(file, source, durationHint);
      if (!result.ok) {
        setError(VIDEO_ERRORS[result.error].text);
        return false;
      }
      await storeSelectedVideo(session, file, result.meta);
      stopStream();
      router.push("/hamkor/video/tekshirish");
      return true;
    },
    [session, router, stopStream],
  );

  const finishRecording = useCallback(
    async (blob: Blob, recordedSeconds: number) => {
      setPhase("processing");
      const file = new File([blob], `video-xabar.${blob.type.includes("mp4") ? "mp4" : "webm"}`, {
        type: blob.type,
      });
      const ok = await accept(file, "camera", recordedSeconds);
      if (!ok) {
        setPhase("ready");
        setSeconds(0);
      }
    },
    [accept],
  );

  const stopRecording = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  }, []);

  const startRecording = () => {
    const stream = streamRef.current;
    if (!stream) return;
    const mimeType = pickMimeType();
    if (!mimeType) {
      setError("Bu brauzer video yozishni qoʻllab-quvvatlamaydi. Galereyadan yuklang.");
      setTab("upload");
      return;
    }

    chunksRef.current = [];
    const recorder = new MediaRecorder(stream, { mimeType });
    recorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    /* `secondsRef` — `onstop` ichida state eski qiymatda qolib ketmasin */
    recorder.onstop = () =>
      finishRecording(new Blob(chunksRef.current, { type: mimeType }), secondsRef.current);

    recorder.start(1000);
    setPhase("recording");
    setSeconds(0);
    secondsRef.current = 0;
    setError(null);

    timerRef.current = window.setInterval(() => {
      setSeconds((prev) => {
        const next = prev + 1;
        secondsRef.current = next;
        if (next >= VIDEO_LIMITS.maxDurationSeconds) stopRecording();
        return next;
      });
    }, 1000);
  };

  const handleFile = async (file: File | undefined, source: "camera" | "gallery") => {
    if (!file) return;
    setError(null);
    setChecking(true);
    const ok = await accept(file, source);
    if (!ok) setChecking(false);
  };

  if (!session) {
    return (
      <div className="onboarding-bg grid min-h-screen place-items-center">
        <p className="text-[14px] text-mute">Yuklanmoqda…</p>
      </div>
    );
  }

  const tooShort = seconds < VIDEO_LIMITS.minDurationSeconds;
  const shownTips = allTips ? VIDEO_RECORD_TIPS : VIDEO_RECORD_TIPS.slice(0, 4);

  return (
    <VideoShell>
      <h1 className="font-display text-[24px] font-extrabold leading-snug text-ink sm:text-[27px] lg:text-[31px]">
        Video yozish yoki yuklash
      </h1>

      <div className="mt-6 lg:grid lg:grid-cols-[248px_minmax(0,1fr)] lg:items-start lg:gap-6">
        {/* ── Yon panel: topshiriq va tavsiyalar (kompyuterda chapda) ── */}
        <aside className="hidden lg:block">
          <div className="rounded-2xl border border-line bg-surface-2 p-4">
            <p className="font-display text-[15px] font-bold text-ink">Video topshiriq</p>
            <p className="mt-2 text-[14px] leading-relaxed text-body">
              Oʻzingiz haqingizda 1–2 daqiqalik qisqa video yozing.
            </p>
            <Link
              href="/hamkor/video/korsatmalar"
              className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-brand-700 underline underline-offset-4"
            >
              Savollar bilan tanishish
              <svg viewBox="0 0 24 24" aria-hidden className="h-[14px] w-[14px]" fill="none">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="mt-3 rounded-2xl border border-line bg-surface-2 p-4">
            <p className="font-display text-[15px] font-bold text-ink">
              Yozish boʻyicha tavsiyalar
            </p>
            <ul className="mt-3 space-y-2.5">
              {VIDEO_RECORD_TIPS.map((tip) => (
                <li key={tip.text} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-body">
                  <span
                    aria-hidden
                    className="mt-[1px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-brand-500"
                  >
                    <svg viewBox="0 0 20 20" className="h-[10px] w-[10px]" fill="none">
                      <path d="M4 10.5l4 4 8-8.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {tip.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3">
            <VideoScriptCard />
          </div>
        </aside>

        <div>
          {/* ── Yorliqlar ── */}
          <div role="tablist" className="flex gap-1 rounded-pill bg-surface-2 p-1">
            <TabButton active={tab === "record"} onClick={() => setTab("record")}>
              Yozish (kamera orqali)
            </TabButton>
            <TabButton active={tab === "upload"} onClick={() => setTab("upload")}>
              Yuklash (galereyadan)
            </TabButton>
          </div>

          {tab === "record" ? (
            phase === "denied" ? (
              <div className="mt-4 rounded-[22px] border border-line bg-surface-2 p-5 text-center">
                <p className="font-display text-[16px] font-bold text-ink">
                  Kamera ochilmadi
                </p>
                <p className="mx-auto mt-2 max-w-[420px] text-[14.5px] leading-relaxed text-body">
                  Brauzer yoki qurilma sozlamalaridan kamera va mikrofon ruxsatini yoqing.
                  Yoki telefoningizning oʻz kamerasida yozib, faylni yuklang.
                </p>
                <div className="mx-auto mt-5 flex max-w-[420px] flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => openCamera(facing)}
                    className="btn-primary h-[52px] rounded-pill font-display text-[16px] font-bold text-onbrand"
                  >
                    Qayta urinish
                  </button>
                  <button
                    type="button"
                    onClick={() => deviceCameraInput.current?.click()}
                    className="h-[52px] rounded-pill border-2 border-line bg-surface font-display text-[15.5px] font-bold text-ink"
                  >
                    Telefon kamerasida yozish
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("upload")}
                    className="h-[48px] text-[15px] font-semibold text-brand-700 underline underline-offset-4"
                  >
                    Tayyor videoni yuklash
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="relative mt-4 overflow-hidden rounded-[22px] bg-[#0B2B1C]">
                  <video ref={videoRef} playsInline muted className="aspect-[4/3] w-full object-cover" />

                  {/* Taymer */}
                  <span className="absolute left-4 top-4 flex items-center gap-2 rounded-pill bg-[rgba(11,43,28,0.72)] px-3 py-1.5">
                    {phase === "recording" && (
                      <span aria-hidden className="h-[9px] w-[9px] rounded-full bg-[#F05050]" />
                    )}
                    <span className="font-display text-[13.5px] font-bold tabular-nums text-white">
                      {formatDuration(seconds)}
                    </span>
                  </span>

                  <span className="absolute right-4 top-4 rounded-pill bg-[rgba(11,43,28,0.72)] px-3 py-1.5 text-[12.5px] font-semibold text-white">
                    Maks. {VIDEO_LIMITS.maxDurationSeconds / 60} daqiqa
                  </span>

                  {/* Yozish tugmasi */}
                  <button
                    type="button"
                    onClick={phase === "recording" ? stopRecording : startRecording}
                    disabled={phase === "processing" || (phase === "recording" && tooShort)}
                    aria-label={phase === "recording" ? "Yozishni toʻxtatish" : "Yozishni boshlash"}
                    className="absolute bottom-4 left-1/2 grid h-[64px] w-[64px] -translate-x-1/2 place-items-center rounded-full bg-white shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)] disabled:opacity-60"
                  >
                    <span
                      aria-hidden
                      className={`bg-[#E04141] transition-all duration-200 ${
                        phase === "recording" ? "h-[22px] w-[22px] rounded-[6px]" : "h-[46px] w-[46px] rounded-full"
                      }`}
                    />
                  </button>

                  {/* Kamera almashtirish */}
                  {phase !== "recording" && (
                    <button
                      type="button"
                      onClick={() => setFacing((f) => (f === "user" ? "environment" : "user"))}
                      aria-label="Kamerani almashtirish"
                      className="absolute bottom-5 right-4 grid h-[44px] w-[44px] place-items-center rounded-full bg-[rgba(11,43,28,0.72)]"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none">
                        <path
                          d="M4 9h3l1.5-2h7L17 9h3v9H4V9Z"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinejoin="round"
                        />
                        <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.7" />
                      </svg>
                    </button>
                  )}
                </div>

                <p className="mt-3 text-center text-[14px] font-medium text-body">
                  {phase === "processing"
                    ? "Video tayyorlanmoqda…"
                    : phase === "recording"
                    ? tooShort
                      ? `Yana ${VIDEO_LIMITS.minDurationSeconds - seconds} soniya gapiring — video kamida ${VIDEO_LIMITS.minDurationSeconds} soniya boʻlishi kerak`
                      : "Tugaganda oq tugmani qayta bosing"
                    : "Yozishni boshlash uchun qizil tugmani bosing"}
                </p>
              </>
            )
          ) : (
            /* ── Yuklash yorligʻi ── */
            <div className="mt-4 rounded-[22px] border-2 border-dashed border-line bg-surface-2 p-6 text-center">
              <span aria-hidden className="text-[38px]">
                📁
              </span>
              <p className="mt-2 font-display text-[17px] font-bold text-ink">
                Tayyor videoni tanlang
              </p>
              <p className="mx-auto mt-2 max-w-[420px] text-[14.5px] leading-relaxed text-body">
                Telefon xotirangizdagi videoni tanlaysiz. Format: {VIDEO_LIMITS.formatLabel},
                hajmi {VIDEO_LIMITS.maxFileSizeLabel} gacha.
              </p>
              <div className="mx-auto mt-5 flex max-w-[420px] flex-col gap-2.5">
                <button
                  type="button"
                  disabled={checking}
                  onClick={() => galleryInput.current?.click()}
                  className="btn-primary h-[54px] rounded-pill font-display text-[16.5px] font-bold text-onbrand disabled:opacity-60"
                >
                  Fayl tanlash
                </button>
                <button
                  type="button"
                  disabled={checking}
                  onClick={() => deviceCameraInput.current?.click()}
                  className="h-[52px] rounded-pill border-2 border-line bg-surface font-display text-[15.5px] font-bold text-ink disabled:opacity-60"
                >
                  Telefon kamerasida yozish
                </button>
              </div>
            </div>
          )}

          {checking && (
            <p className="mt-4 rounded-2xl bg-surface-2 py-3 text-center text-[15px] font-semibold text-body">
              Video tekshirilmoqda, biroz kuting…
            </p>
          )}

          {error && (
            <div className="mt-4 rounded-2xl border-2 border-[#E8A2A2] bg-[#FDF3F3] p-4">
              <p className="text-[14.5px] leading-relaxed text-[#8C2F2F]">{error}</p>
            </div>
          )}

          {/* ── Telefon: tavsiyalar kameraning ostida ── */}
          <div className="mt-5 rounded-2xl border border-line bg-surface-2 p-4 lg:hidden">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-display text-[15px] font-bold text-ink">Tavsiyalar</p>
              {!allTips && (
                <button
                  type="button"
                  onClick={() => setAllTips(true)}
                  className="text-[13.5px] font-semibold text-brand-700 underline underline-offset-4"
                >
                  Barchasini koʻrish
                </button>
              )}
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {shownTips.map((tip) => (
                <li key={tip.text} className="text-center">
                  <span aria-hidden className="text-[22px]">
                    {tip.icon}
                  </span>
                  <span className="mt-1 block text-[12.5px] font-semibold leading-snug text-body">
                    {tip.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 lg:hidden">
            <VideoScriptCard />
          </div>
        </div>
      </div>

      {/* Yashirin fayl maydonlari */}
      <input
        ref={galleryInput}
        type="file"
        accept="video/mp4,video/quicktime,video/webm,video/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0], "gallery")}
      />
      <input
        ref={deviceCameraInput}
        type="file"
        accept="video/*"
        capture="user"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0], "camera")}
      />

      <Nav backHref="/hamkor/video/rozilik" backLabel="Orqaga" />
    </VideoShell>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`h-[44px] flex-1 rounded-pill px-3 font-display text-[14px] font-bold transition-colors duration-200 ${
        active ? "bg-surface text-brand-700 shadow-[0_2px_8px_-4px_rgba(11,43,28,0.35)]" : "text-mute"
      }`}
    >
      {children}
    </button>
  );
}
