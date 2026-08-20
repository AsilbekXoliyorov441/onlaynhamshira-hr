"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/Icons";
import { formatDuration, formatSize } from "@/lib/onboarding/video";
import { replaceVideo } from "@/lib/onboarding/video-api";
import { loadVideo, type VideoSession } from "@/lib/onboarding/video-store";

/* V-08A: VIDEO_UPLOAD_SUCCESS / V-08B: VIDEO_UPLOAD_FAILED */
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
    router.push("/hamkor/video/usul");
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
    <div className="onboarding-bg min-h-screen lg:grid lg:place-items-center">
      <div className="mx-auto w-full max-w-[620px] px-5 pb-12 pt-6 sm:px-8 lg:py-14">
        <Link href="/" className="inline-flex" aria-label="Bosh sahifa">
          <LogoMark aria-hidden className="h-[38px] w-auto" />
        </Link>

        <div className="mt-8">
          <span aria-hidden className="text-[42px]">
            {failed ? "📶" : "✅"}
          </span>
          <h1 className="mt-3 font-display text-[26px] font-extrabold leading-[1.18] tracking-[-0.02em] text-ink sm:text-[30px] lg:text-[34px]">
            {failed ? "Videoni yuklab boʻlmadi" : "Video muvaffaqiyatli yuborildi"}
          </h1>
          <p className="mt-4 text-[15.5px] leading-relaxed text-body">
            {failed
              ? "Internet aloqasi yoki texnik muammo sababli video toʻliq yuklanmadi. Videongiz qurilmangizda saqlangan boʻlsa, qayta yuborishingiz mumkin."
              : "Video xabaringiz saqlandi va arizangizga biriktirildi."}
          </p>
          {!failed && (
            <p className="mt-3 text-[15.5px] leading-relaxed text-body">
              Keyingi bosqichda Onlayn Hamshira platformasi, mobil ilova va buyurtmalar bilan
              ishlash boʻyicha batafsil video darsliklarni koʻrasiz.
            </p>
          )}
        </div>

        {session.meta && (
          <div className="mt-6 rounded-2xl border border-line bg-surface p-4">
            <p className="flex items-baseline justify-between gap-3 text-[14.5px]">
              <span className="text-body">Davomiylik</span>
              <span className="font-semibold text-ink">
                {formatDuration(session.meta.durationSeconds)}
              </span>
            </p>
            <p className="mt-2 flex items-baseline justify-between gap-3 text-[14.5px]">
              <span className="text-body">Fayl hajmi</span>
              <span className="font-semibold text-ink">{formatSize(session.meta.fileSize)}</span>
            </p>
            {!failed && (
              <p className="mt-2 flex items-baseline justify-between gap-3 text-[14.5px]">
                <span className="text-body">Holat</span>
                <span className="font-semibold text-brand-700">Koʻrib chiqilmoqda</span>
              </p>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-2.5">
          {failed ? (
            <>
              <button
                type="button"
                onClick={retry}
                className="btn-primary h-[56px] rounded-pill font-display text-[17px] font-bold text-onbrand transition-transform duration-300 hover:scale-[1.02]"
              >
                Qayta urinish
              </button>
              <button
                type="button"
                onClick={pickAnother}
                className="h-[56px] rounded-pill border-2 border-line bg-surface font-display text-[16px] font-bold text-ink transition-colors duration-200 hover:border-brand-400"
              >
                Boshqa video tanlash
              </button>
            </>
          ) : (
            <Link
              href="/hamkor/darsliklar"
              className="btn-primary grid h-[56px] place-items-center rounded-pill font-display text-[17px] font-bold text-onbrand transition-transform duration-300 hover:scale-[1.02]"
            >
              Video darsliklarga oʻtish
            </Link>
          )}
          <Link
            href="/"
            className="grid h-[52px] place-items-center rounded-pill font-display text-[15.5px] font-semibold text-mute transition-colors duration-200 hover:text-ink"
          >
            Saqlash va chiqish
          </Link>
        </div>
      </div>
    </div>
  );
}
