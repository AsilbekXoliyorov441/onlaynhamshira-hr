"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VideoShell from "./VideoShell";
import { Choice, Nav } from "./ui";
import {
  VIDEO_CHECKLIST,
  VIDEO_LIMITS,
  VIDEO_SCRIPT,
  VIDEO_TASK,
  VIDEO_TECH_NOTES,
  VIDEO_TIPS,
} from "@/lib/onboarding/video";
import { loadVideo } from "@/lib/onboarding/video-store";

/* V-01: VIDEO_INSTRUCTIONS */
export default function VideoInstructions() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [scriptOpen, setScriptOpen] = useState(false);

  useEffect(() => {
    const video = loadVideo();
    if (video.status === "NOT_STARTED") {
      router.replace("/hamkor/video");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="onboarding-bg grid min-h-screen place-items-center">
        <p className="text-[14px] text-mute">Yuklanmoqda…</p>
      </div>
    );
  }

  return (
    <VideoShell>
      <h1 className="font-display text-[24px] font-extrabold leading-snug text-ink sm:text-[27px] lg:text-[31px]">
        Videoda nimalar haqida gapirish kerak?
      </h1>

      {/* Topshiriq matni */}
      <div className="mt-5 rounded-2xl border border-line bg-surface-2 p-4">
        <p className="text-[15px] leading-relaxed text-body">{VIDEO_TASK}</p>
      </div>

      {/* Kompyuterda roʻyxatlar ikki ustunda — sahifa uzunligi ikki barobar
          qisqaradi, "Davom etish" tugmasi koʻrinib turadi */}
      <ul className="mt-6 space-y-2.5 lg:grid lg:grid-cols-2 lg:gap-2.5 lg:space-y-0">
        {VIDEO_CHECKLIST.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4"
          >
            <span
              aria-hidden
              className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-brand-500"
            >
              <svg viewBox="0 0 20 20" className="h-[13px] w-[13px]" fill="none">
                <path
                  d="M4 10.5l4 4 8-8.5"
                  stroke="#fff"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-[15px] font-semibold leading-snug text-ink">{item}</span>
          </li>
        ))}
      </ul>

      {/* Namuna skript — yopiq holatda, kerak boʻlsa ochiladi */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-surface">
        <button
          type="button"
          onClick={() => setScriptOpen((v) => !v)}
          aria-expanded={scriptOpen}
          className="flex w-full items-center justify-between gap-3 p-4 text-left"
        >
          <span className="text-[15px] font-semibold text-ink">
            Nima deyishni bilmasangiz — namuna matn
          </span>
          <svg
            viewBox="0 0 24 24"
            className={`h-4 w-4 shrink-0 text-mute transition-transform duration-200 ${
              scriptOpen ? "rotate-180" : ""
            }`}
            fill="none"
            aria-hidden
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {scriptOpen && (
          <div className="border-t border-line p-4">
            {VIDEO_SCRIPT.map((line) => (
              <p key={line} className="mb-2.5 text-[14.5px] leading-relaxed text-body last:mb-0">
                {line}
              </p>
            ))}
            <p className="mt-3 border-t border-line pt-3 text-[13.5px] leading-relaxed text-mute">
              Bu matnni soʻzma-soʻz takrorlash shart emas — u faqat yoʻnalish uchun.
            </p>
          </div>
        )}
      </div>

      {/* Texnik koʻrsatmalar */}
      <h2 className="mt-8 font-display text-[17px] font-bold text-ink">Texnik talablar</h2>
      <ul className="mt-3 space-y-2">
        {VIDEO_TECH_NOTES.map((note) => (
          <li key={note} className="flex gap-3 text-[15px] leading-relaxed text-body">
            <span aria-hidden className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-brand-500" />
            {note}
          </li>
        ))}
        <li className="flex gap-3 text-[15px] leading-relaxed text-body">
          <span aria-hidden className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-brand-500" />
          Fayl {VIDEO_LIMITS.formatLabel} formatida va {VIDEO_LIMITS.maxFileSizeLabel} dan
          kichik boʻlishi kerak.
        </li>
      </ul>

      {/* Tavsiyalar */}
      <h2 className="mt-8 font-display text-[17px] font-bold text-ink">
        Yozishdan oldin eʼtibor bering
      </h2>
      <ul className="mt-3 space-y-2 lg:grid lg:grid-cols-2 lg:gap-x-7 lg:gap-y-2 lg:space-y-0">
        {VIDEO_TIPS.map((tip) => (
          <li key={tip} className="flex gap-3 text-[15px] leading-relaxed text-body">
            <span aria-hidden className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-brand-300" />
            {tip}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Choice
          label="Video topshirigʻi va talablar bilan tanishdim"
          multi
          selected={confirmed}
          onSelect={() => setConfirmed((v) => !v)}
        />
      </div>

      <Nav
        backHref="/hamkor/video"
        onNext={() => router.push("/hamkor/video/rozilik")}
        nextLabel="Davom etish"
        nextDisabled={!confirmed}
        disabledHint="Davom etish uchun tasdiq belgisini qoʻying"
      />
    </VideoShell>
  );
}
