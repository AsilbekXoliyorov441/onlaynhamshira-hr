"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VideoShell from "./VideoShell";
import { formatDuration, formatSize } from "@/lib/onboarding/video";
import { replaceVideo } from "@/lib/onboarding/video-api";
import { loadVideo, type VideoSession } from "@/lib/onboarding/video-store";

/* V-04: "Yuklash muvaffaqiyatli" (maket) / xato holati — V-08B */
export default function VideoResult() {
  const router = useRouter();
  const [session, setSession] = useState<VideoSession | null>(null);

  useEffect(() => {
    const video = loadVideo();
    if (video.status !== "UPLOADED" && video.status !== "UPLOAD_FAILED") {
      router.replace("/hamkor/video");
      return;
    }
    setSession(video);
  }, [router]);

  const retry = () => router.push("/hamkor/video/tasdiqlash");

  const pickAnother = async () => {
    if (!session) return;
    await replaceVideo(session);
    router.push("/hamkor/video/yozish");
  };

  if (!session) {
    return (
      <div className="onboarding-bg grid min-h-screen place-items-center">
        <p className="text-[14px] text-mute">Yuklanmoqda…</p>
      </div>
    );
  }

  const failed = session.status === "UPLOAD_FAILED";

  return (
    <VideoShell>
      <div className="mx-auto w-full max-w-[520px] py-4 text-center">
        <span
          aria-hidden
          className={`mx-auto grid h-[82px] w-[82px] place-items-center rounded-full ${
            failed ? "bg-[#FDF3F3]" : "bg-brand-50"
          }`}
        >
          {failed ? (
            <svg viewBox="0 0 24 24" className="h-10 w-10 text-[#C24444]" fill="none">
              <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 7.5v5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="16.2" r="1.1" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-10 w-10 text-brand-600" fill="none">
              <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M8.2 12.3l2.6 2.6 5-5.4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>

        <h1 className="mt-5 font-display text-[24px] font-extrabold leading-snug text-ink sm:text-[28px]">
          {failed ? "Videoni yuklab boʻlmadi" : "Video muvaffaqiyatli yuklandi!"}
        </h1>
        <p className="mt-3 text-[15.5px] leading-relaxed text-body">
          {failed
            ? "Internet aloqasi yoki texnik muammo sababli video toʻliq yuklanmadi. Videongiz qurilmangizda saqlangan — qayta yuborishingiz mumkin."
            : "Rahmat! Video administrator tomonidan koʻrib chiqiladi."}
        </p>

        {session.meta && (
          <dl className="mt-6 space-y-2.5 rounded-2xl border border-line bg-surface-2 p-4 text-left">
            <Row label="Davomiyligi" value={formatDuration(session.meta.durationSeconds)} />
            <Row label="Hajmi" value={formatSize(session.meta.fileSize)} />
            {!failed && <Row label="Holati" value="Koʻrib chiqilmoqda" accent />}
          </dl>
        )}

        <div className="mt-8 flex flex-col gap-2.5">
          {failed ? (
            <>
              <button
                type="button"
                onClick={retry}
                className="btn-primary h-[54px] rounded-pill font-display text-[16.5px] font-bold text-onbrand transition-transform duration-300 hover:scale-[1.02]"
              >
                Qayta urinish
              </button>
              <button
                type="button"
                onClick={pickAnother}
                className="h-[52px] rounded-pill border-2 border-line bg-surface font-display text-[15.5px] font-bold text-ink transition-colors duration-200 hover:border-brand-400"
              >
                Boshqa video tanlash
              </button>
            </>
          ) : (
            <Link
              href="/hamkor/darsliklar"
              className="btn-primary grid h-[54px] place-items-center rounded-pill px-4 font-display text-[16px] font-bold text-onbrand transition-transform duration-300 hover:scale-[1.02] sm:text-[16.5px]"
            >
              Batafsil video darsliklarga oʻtish
            </Link>
          )}
          <Link
            href="/"
            className="grid h-[50px] place-items-center rounded-pill font-display text-[15.5px] font-semibold text-mute transition-colors duration-200 hover:text-ink"
          >
            Saqlash va chiqish
          </Link>
        </div>
      </div>
    </VideoShell>
  );
}

function Row({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-[14.5px] text-body">{label}</dt>
      <dd className={`text-[14.5px] font-semibold ${accent ? "text-brand-700" : "text-ink"}`}>
        {value}
      </dd>
    </div>
  );
}
