"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import VideoShell from "./VideoShell";
import { Choice, Nav } from "./ui";
import { VIDEO_CONSENTS, VIDEO_CONSENT_POINTS } from "@/lib/onboarding/video";
import { saveConsent } from "@/lib/onboarding/video-api";
import { loadVideo, saveVideo, type VideoSession } from "@/lib/onboarding/video-store";

/*
 * V-02: VIDEO_CONSENT
 *
 * BR-V-010: rozilik berilmasdan video yuborib boʻlmaydi — barcha
 * belgilar qoʻyilishi shart.
 */
export default function VideoConsent() {
  const router = useRouter();
  const [session, setSession] = useState<VideoSession | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState(false);

  const hydrated = useRef(false);

  useEffect(() => {
    const video = loadVideo();
    if (video.status === "NOT_STARTED") {
      router.replace("/hamkor/video");
      return;
    }
    setSession(video);
    setChecked(video.consents ?? {});
    hydrated.current = true;
  }, [router]);

  /* Belgilar qoʻyilgan zahoti saqlanadi — foydalanuvchi chiqib ketsa
     ham qaytganda oʻsha holida turadi */
  useEffect(() => {
    if (!hydrated.current || !session) return;
    saveVideo({ ...session, consents: checked });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [checked]);

  const allChecked = VIDEO_CONSENTS.every((c) => checked[c.field]);

  const onNext = async () => {
    if (!session || !allChecked || busy) return;
    setBusy(true);
    await saveConsent(session, checked);
    router.push("/hamkor/video/usul");
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
        Videoni qayta ishlashga rozilik
      </h1>

      <p className="mt-4 text-[15.5px] leading-relaxed text-body">
        Yuklangan video Onlayn Hamshira platformasiga hamkorlik uchun topshirilgan arizani
        koʻrib chiqish maqsadida ishlatiladi.
      </p>

      <p className="mt-5 text-[15px] font-semibold text-ink">Video:</p>
      <ul className="mt-3 space-y-2">
        {VIDEO_CONSENT_POINTS.map((point) => (
          <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-body">
            <span aria-hidden className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-brand-500" />
            {point}
          </li>
        ))}
      </ul>

      <div className="mt-7 space-y-2.5" role="group">
        {VIDEO_CONSENTS.map((consent) => (
          <Choice
            key={consent.field}
            label={consent.label}
            multi
            selected={Boolean(checked[consent.field])}
            onSelect={() =>
              setChecked((prev) => ({ ...prev, [consent.field]: !prev[consent.field] }))
            }
          />
        ))}
      </div>

      <Nav
        backHref="/hamkor/video/korsatmalar"
        onNext={onNext}
        nextLabel="Video yozishga oʻtish"
        nextDisabled={!allChecked || busy}
        disabledHint="Davom etish uchun barcha bandlarga rozilik bildiring"
      />
    </VideoShell>
  );
}
