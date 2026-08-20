"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import VideoShell from "./VideoShell";
import { formatDuration, formatSize } from "@/lib/onboarding/video";
import { completeUpload, createUploadUrl, uploadVideo } from "@/lib/onboarding/video-api";
import { getVideoBlob, loadVideo, saveVideo, type VideoSession } from "@/lib/onboarding/video-store";

/*
 * V-03: "Yuklanmoqda…" — maketdagi ekran.
 *
 * Preview ekranida "Videoni tasdiqlash" bosilgach shu manzilga
 * kelinadi va yuklash DARROV boshlanadi: maketda alohida yana bir
 * tasdiqlash ekrani yoʻq, rozilik esa oldinroq (V-02 rozilik ekrani,
 * BR-V-010) olingan.
 *
 * Yuklash TZ'dagi uch qadam boʻyicha boradi:
 *   upload-url -> storage'ga yuborish (progress) -> complete
 *
 * Yuklash paytida boshqa sahifaga oʻtish uploadni uzadi, shu bois
 * bu ekranda faqat bitta amal bor — "Bekor qilish".
 */
export default function VideoSubmit() {
  const router = useRouter();
  const [session, setSession] = useState<VideoSession | null>(null);
  const [percent, setPercent] = useState(0);
  const abortRef = useRef<AbortController | null>(null);
  const startedRef = useRef(false);

  const run = useCallback(
    async (video: VideoSession) => {
      if (!video.meta) return;
      const blob = await getVideoBlob();
      if (!blob) {
        router.replace("/hamkor/video/yozish");
        return;
      }

      setPercent(0);
      saveVideo({ ...video, status: "UPLOADING" });

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const ticket = await createUploadUrl(video.meta);
        await uploadVideo(ticket, blob, setPercent, controller.signal);
        await completeUpload(video, ticket, video.meta);
        router.push("/hamkor/video/natija");
      } catch {
        /* Bekor qilinganda videoga qaytamiz, xato boʻlsa natija ekrani
           V-08B koʻrinishini koʻrsatadi */
        if (controller.signal.aborted) {
          saveVideo({ ...video, status: "PREVIEW" });
          router.push("/hamkor/video/tekshirish");
          return;
        }
        saveVideo({ ...video, status: "UPLOAD_FAILED" });
        router.push("/hamkor/video/natija");
      }
    },
    [router],
  );

  useEffect(() => {
    if (startedRef.current) return;
    const video = loadVideo();
    if (!video.meta) {
      router.replace("/hamkor/video/yozish");
      return;
    }
    startedRef.current = true;
    setSession(video);
    run(video);
  }, [router, run]);

  /* Yuklash paytida sahifani yopishdan ogohlantiramiz */
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  if (!session?.meta) {
    return (
      <div className="onboarding-bg grid min-h-screen place-items-center">
        <p className="text-[14px] text-mute">Yuklanmoqda…</p>
      </div>
    );
  }

  const meta = session.meta;

  return (
    <VideoShell>
      <div className="mx-auto w-full max-w-[440px] py-4 text-center">
        <span
          aria-hidden
          className="mx-auto grid h-[82px] w-[82px] place-items-center rounded-full bg-brand-50"
        >
          <svg viewBox="0 0 24 24" className="h-10 w-10 text-brand-600" fill="none">
            <path
              d="M6.5 18.5A4 4 0 0 1 6 10.6a5.5 5.5 0 0 1 10.6-1.6A3.75 3.75 0 0 1 18 18.5H6.5Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M12 16.5V9.8m0 0L9.6 12.2M12 9.8l2.4 2.4"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <h1 className="mt-5 font-display text-[24px] font-extrabold leading-snug text-ink sm:text-[27px]">
          Video yuklanmoqda…
        </h1>

        <div className="mt-6">
          <div className="h-[12px] w-full overflow-hidden rounded-pill bg-[color:var(--c-line)]/60">
            <div
              className="h-full rounded-pill bg-[linear-gradient(90deg,#4FD189,#1BA463)] transition-[width] duration-200 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-3 font-display text-[28px] font-extrabold tabular-nums text-brand-700">
            {percent}%
          </p>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-body">
          Iltimos, sahifani yopmang va kuting.
        </p>
        <p className="mt-2 text-[13.5px] text-mute">
          {formatSize(meta.fileSize)} · {formatDuration(meta.durationSeconds)}
        </p>

        <button
          type="button"
          onClick={() => abortRef.current?.abort()}
          className="mt-8 h-[52px] w-full rounded-pill border-2 border-line bg-surface font-display text-[16px] font-bold text-ink transition-colors duration-200 hover:border-brand-400"
        >
          Bekor qilish
        </button>
      </div>
    </VideoShell>
  );
}
