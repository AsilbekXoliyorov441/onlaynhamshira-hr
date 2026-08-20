"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import VideoShell from "./VideoShell";
import { Choice, Nav } from "./ui";
import { formatDuration, formatSize } from "@/lib/onboarding/video";
import { completeUpload, createUploadUrl, uploadVideo } from "@/lib/onboarding/video-api";
import { getVideoBlob, loadVideo, saveVideo, type VideoSession } from "@/lib/onboarding/video-store";

/*
 * V-06 (VIDEO_UPLOAD_CONFIRMATION) va V-07 (VIDEO_UPLOADING).
 *
 * Ikkalasi bitta manzilda: tasdiqlash bosilgach oʻsha ekranning oʻzi
 * yuklash holatiga oʻtadi. Sabab — yuklash paytida boshqa sahifaga
 * oʻtish uploadni uzib qoʻyadi.
 *
 * Yuklash TZ'dagi uch qadam boʻyicha boradi:
 *   upload-url -> storage'ga yuborish (progress) -> complete
 */
export default function VideoSubmit() {
  const router = useRouter();
  const [session, setSession] = useState<VideoSession | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [percent, setPercent] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const video = loadVideo();
    if (!video.meta) {
      router.replace("/hamkor/video/usul");
      return;
    }
    setSession(video);
  }, [router]);

  /* Yuklash paytida sahifani yopishdan ogohlantiramiz */
  useEffect(() => {
    if (!uploading) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [uploading]);

  const submit = async () => {
    if (!session?.meta || uploading) return;

    const blob = await getVideoBlob();
    if (!blob) {
      router.replace("/hamkor/video/usul");
      return;
    }

    setUploading(true);
    setPercent(0);
    saveVideo({ ...session, status: "UPLOADING" });

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const ticket = await createUploadUrl(session.meta);
      await uploadVideo(ticket, blob, setPercent, controller.signal);
      await completeUpload(session, ticket, session.meta);
      router.push("/hamkor/video/natija");
    } catch {
      /* Bekor qilinganda holatni qaytaramiz, xato boʻlsa natija
         ekrani V-08B koʻrinishini koʻrsatadi */
      if (controller.signal.aborted) {
        saveVideo({ ...session, status: "PREVIEW" });
        setUploading(false);
        setPercent(0);
        return;
      }
      saveVideo({ ...session, status: "UPLOAD_FAILED" });
      router.push("/hamkor/video/natija");
    }
  };

  if (!session?.meta) {
    return (
      <div className="onboarding-bg grid min-h-screen place-items-center">
        <p className="text-[14px] text-mute">Yuklanmoqda…</p>
      </div>
    );
  }

  const meta = session.meta;

  /* ── V-07: yuklanmoqda ── */
  if (uploading) {
    return (
      <VideoShell>
        <h1 className="font-display text-[24px] font-extrabold leading-snug text-ink sm:text-[27px] lg:text-[31px]">
          Video yuklanmoqda
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-body">
          Yuklash tugaguncha sahifani yopmaslik tavsiya etiladi.
        </p>

        <div className="mt-8">
          <p className="flex items-baseline justify-between gap-3">
            <span className="text-[15px] font-semibold text-ink">Yuklanmoqda</span>
            <span className="font-display text-[26px] font-extrabold tabular-nums text-brand-700">
              {percent}%
            </span>
          </p>
          <div className="mt-3 h-[10px] w-full overflow-hidden rounded-pill bg-[color:var(--c-line)]/60">
            <div
              className="h-full rounded-pill bg-[linear-gradient(90deg,#4FD189,#1BA463)] transition-[width] duration-200 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-2.5 text-[13.5px] text-mute">
            {formatSize(meta.fileSize)} · {formatDuration(meta.durationSeconds)}
          </p>
        </div>

        <div className="mt-10">
          <button
            type="button"
            onClick={() => abortRef.current?.abort()}
            className="h-[52px] w-full rounded-pill border-2 border-line bg-surface font-display text-[16px] font-bold text-ink transition-colors duration-200 hover:border-brand-400"
          >
            Bekor qilish
          </button>
        </div>
      </VideoShell>
    );
  }

  /* ── V-06: tasdiqlash ── */
  return (
    <VideoShell>
      <h1 className="font-display text-[24px] font-extrabold leading-snug text-ink sm:text-[27px] lg:text-[31px]">
        Videoni yuborishni tasdiqlaysizmi?
      </h1>
      <p className="mt-4 text-[15.5px] leading-relaxed text-body">
        Videoni yuborgandan keyin u administrator tomonidan koʻrib chiqiladi.
      </p>
      <p className="mt-3 text-[15.5px] leading-relaxed text-body">
        Keyingi bosqichga oʻtgandan keyin videoni mustaqil ravishda almashtirish imkoniyati
        cheklanishi mumkin.
      </p>

      <div className="mt-6 rounded-2xl border border-line bg-surface p-4">
        <p className="flex items-baseline justify-between gap-3 text-[14.5px]">
          <span className="text-body">Davomiylik</span>
          <span className="font-semibold text-ink">{formatDuration(meta.durationSeconds)}</span>
        </p>
        <p className="mt-2 flex items-baseline justify-between gap-3 text-[14.5px]">
          <span className="text-body">Fayl hajmi</span>
          <span className="font-semibold text-ink">{formatSize(meta.fileSize)}</span>
        </p>
      </div>

      <div className="mt-7">
        <Choice
          label="Videoni yuborishga tayyorman"
          multi
          selected={confirmed}
          onSelect={() => setConfirmed((v) => !v)}
        />
      </div>

      <Nav
        backHref="/hamkor/video/tekshirish"
        backLabel="Orqaga"
        onNext={submit}
        nextLabel="Yuborish"
        nextDisabled={!confirmed}
        disabledHint="Yuborish uchun yuqoridagi katakchani belgilang"
      />
    </VideoShell>
  );
}
