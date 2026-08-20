"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VideoShell from "./VideoShell";
import { Nav } from "./ui";
import { formatDuration, formatSize } from "@/lib/onboarding/video";
import { replaceVideo } from "@/lib/onboarding/video-api";
import { getVideoBlob, loadVideo, type VideoSession } from "@/lib/onboarding/video-store";

/*
 * V-02: "Video preview" — maketdagi ekran.
 *
 * Chapda videoning oʻzi, oʻngda fayl maʼlumotlari va uchta amal:
 * qayta yozish, yuklashni almashtirish, videoni tasdiqlash.
 * Telefonda ular bir ustunga tushadi.
 */
export default function VideoPreview() {
  const router = useRouter();
  const [session, setSession] = useState<VideoSession | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;

    (async () => {
      const video = loadVideo();
      if (!video.meta) {
        router.replace("/hamkor/video/yozish");
        return;
      }
      const blob = await getVideoBlob();
      if (!blob) {
        /* Video qurilmadan yoʻqolgan — qaytadan tanlash kerak */
        router.replace("/hamkor/video/yozish");
        return;
      }
      objectUrl = URL.createObjectURL(blob);
      setUrl(objectUrl);
      setSession(video);
    })();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [router]);

  const again = async (tab: "record" | "upload") => {
    if (!session) return;
    await replaceVideo(session);
    router.push(`/hamkor/video/yozish${tab === "upload" ? "?yuklash=1" : ""}`);
  };

  if (!session || !url) {
    return (
      <div className="onboarding-bg grid min-h-screen place-items-center">
        <p className="text-[14px] text-mute">Video yuklanmoqda…</p>
      </div>
    );
  }

  const meta = session.meta!;
  /* "video/webm;codecs=vp9,opus" -> "WEBM" */
  const format = (meta.mimeType || "video/mp4")
    .split(";")[0]
    .replace("video/", "")
    .replace("quicktime", "mov")
    .toUpperCase();

  return (
    <VideoShell>
      <h1 className="font-display text-[24px] font-extrabold leading-snug text-ink sm:text-[27px] lg:text-[31px]">
        Videongizni koʻrib chiqing
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-body">
        Videoni ijro eting va tekshiring: yuzingiz aniq koʻrinyaptimi, ovozingiz
        eshitilyaptimi. Telefon ovozini balandlatib qoʻying.
      </p>

      <div className="mt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-6">
        <div className="overflow-hidden rounded-[22px] bg-[#0B2B1C]">
          <video src={url} controls playsInline className="max-h-[58vh] w-full" />
        </div>

        <div className="mt-5 lg:mt-0">
          <div className="rounded-2xl border border-line bg-surface-2 p-4">
            <p className="font-display text-[15px] font-bold text-ink">Video maʼlumotlari</p>
            <dl className="mt-3 space-y-2.5">
              <Row label="Fayl nomi" value={meta.fileName} />
              <Row label="Davomiyligi" value={formatDuration(meta.durationSeconds)} />
              <Row label="Hajmi" value={formatSize(meta.fileSize)} />
              <Row label="Format" value={format} />
            </dl>
          </div>

          <div className="mt-3 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => again("record")}
              className="grid h-[50px] place-items-center rounded-pill px-3 border-2 border-line bg-surface font-display text-[15px] font-bold text-ink transition-colors duration-200 hover:border-brand-400"
            >
              Qayta yozish
            </button>
            <button
              type="button"
              onClick={() => again("upload")}
              className="grid h-[50px] place-items-center rounded-pill px-3 border-2 border-line bg-surface font-display text-[15px] font-bold text-ink transition-colors duration-200 hover:border-brand-400"
            >
              Yuklashni almashtirish
            </button>
          </div>
        </div>
      </div>

      <Nav
        backHref="/hamkor/video/yozish"
        backLabel="Orqaga"
        onNext={() => router.push("/hamkor/video/tasdiqlash")}
        nextLabel="Videoni tasdiqlash"
      />
    </VideoShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="shrink-0 text-[14px] text-body">{label}</dt>
      <dd className="min-w-0 truncate text-[14px] font-semibold text-ink">{value}</dd>
    </div>
  );
}
