"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VideoShell from "./VideoShell";
import { Notice } from "./ui";
import { formatDuration, formatSize } from "@/lib/onboarding/video";
import { replaceVideo } from "@/lib/onboarding/video-api";
import { getVideoBlob, loadVideo, type VideoSession } from "@/lib/onboarding/video-store";

/* V-05: VIDEO_PREVIEW */
export default function VideoPreview() {
  const router = useRouter();
  const [session, setSession] = useState<VideoSession | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;

    (async () => {
      const video = loadVideo();
      if (!video.meta) {
        router.replace("/hamkor/video/usul");
        return;
      }
      const blob = await getVideoBlob();
      if (!blob) {
        /* Video qurilmadan yoʻqolgan — qaytadan tanlash kerak */
        router.replace("/hamkor/video/usul");
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

  const pickAnother = async () => {
    if (!session) return;
    await replaceVideo(session);
    router.push("/hamkor/video/usul");
  };

  if (!session || !url) {
    return (
      <div className="onboarding-bg grid min-h-screen place-items-center">
        <p className="text-[14px] text-mute">Video yuklanmoqda…</p>
      </div>
    );
  }

  const meta = session.meta!;

  return (
    <VideoShell>
      <h1 className="font-display text-[24px] font-extrabold leading-snug text-ink sm:text-[27px] lg:text-[31px]">
        Videoni tekshiring
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-body">
        Videoda yuzingiz aniq koʻrinishi va ovozingiz tushunarli eshitilishiga ishonch hosil
        qiling.
      </p>

      <div className="mt-5 overflow-hidden rounded-[24px] bg-[#0B2B1C]">
        <video src={url} controls playsInline className="max-h-[60vh] w-full" />
      </div>

      <dl className="mt-5 space-y-2.5 rounded-2xl border border-line bg-surface p-4">
        <Row label="Davomiylik" value={formatDuration(meta.durationSeconds)} />
        <Row label="Fayl hajmi" value={formatSize(meta.fileSize)} />
        <Row label="Format" value={meta.mimeType.replace("video/", "").toUpperCase()} />
        <Row label="Ovoz" value={meta.hasAudio ? "mavjud" : "aniqlanmadi"} />
      </dl>

      <Notice>
        Videoni bir marta koʻrib chiqish shart emas, lekin yuborishdan oldin tekshirib
        olishni tavsiya qilamiz.
      </Notice>

      <div className="mt-8 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={() => router.push("/hamkor/video/tasdiqlash")}
          className="btn-primary h-[56px] rounded-pill font-display text-[17px] font-bold text-onbrand transition-transform duration-300 hover:scale-[1.02]"
        >
          Videoni tasdiqlash
        </button>
        <button
          type="button"
          onClick={pickAnother}
          className="h-[56px] rounded-pill border-2 border-line bg-surface font-display text-[16px] font-bold text-ink transition-colors duration-200 hover:border-brand-400"
        >
          {meta.source === "camera" ? "Qayta yozish" : "Boshqa video tanlash"}
        </button>
      </div>
    </VideoShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-[14.5px] text-body">{label}</dt>
      <dd className="text-[14.5px] font-semibold text-ink">{value}</dd>
    </div>
  );
}
