"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VideoShell from "./VideoShell";
import { Nav, Notice } from "./ui";
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
        Videongiz tayyor — koʻrib chiqing
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-body">
        Videoni ijro eting va ikkita narsani tekshiring: yuzingiz aniq koʻrinyaptimi va
        ovozingiz eshitilyaptimi. Telefon ovozini balandlatib qoʻying.
      </p>

      <div className="mt-5 overflow-hidden rounded-[24px] bg-[#0B2B1C]">
        <video src={url} controls playsInline className="max-h-[60vh] w-full" />
      </div>

      {/* Ovoz holati ATAYLAB koʻrsatilmaydi: brauzerda uni ishonchli
          aniqlab boʻlmaydi va "aniqlanmadi" degan yozuv foydalanuvchini
          bekorga qoʻrqitadi. Buning oʻrniga oddiy tekshiruv roʻyxati. */}
      <ul className="mt-5 space-y-2.5">
        {[
          "Yuzim videoda aniq koʻrinyapti",
          "Ovozim eshitilyapti va tushunarli",
          "Ismim, mutaxassisligim va tajribam aytilgan",
        ].map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3.5"
          >
            <span aria-hidden className="grid h-[24px] w-[24px] shrink-0 place-items-center rounded-full bg-brand-500">
              <svg viewBox="0 0 20 20" className="h-[12px] w-[12px]" fill="none">
                <path d="M4 10.5l4 4 8-8.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[15px] font-semibold leading-snug text-ink">{item}</span>
          </li>
        ))}
      </ul>

      <dl className="mt-4 space-y-2.5 rounded-2xl border border-line bg-surface-2 p-4">
        <Row label="Davomiylik" value={formatDuration(meta.durationSeconds)} />
        <Row label="Fayl hajmi" value={formatSize(meta.fileSize)} />
      </dl>

      <Notice>
        Video yoqmasa — pastdagi “{meta.source === "camera" ? "Qayta yozish" : "Boshqa video"}”
        tugmasini bosing. Necha marta qayta yozsangiz ham boʻladi.
      </Notice>

      <Nav
        onBack={pickAnother}
        backLabel={meta.source === "camera" ? "Qayta yozish" : "Boshqa video"}
        onNext={() => router.push("/hamkor/video/tasdiqlash")}
        nextLabel="Video yaxshi, davom etish"
      />
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
