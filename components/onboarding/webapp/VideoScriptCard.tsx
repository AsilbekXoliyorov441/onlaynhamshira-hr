"use client";

import { useState } from "react";
import { VIDEO_SCRIPT } from "@/lib/onboarding/video";

/*
 * "Nima deyishim kerak?" — namuna matn.
 *
 * Auditoriyaning katta qismi kamera oldida nima deyishni bilmaydi va
 * shu sababli bosqichda toʻxtab qoladi. Shu bois namuna matn video
 * yozish tugmasining yonida turadi: koʻrsatmalar sahifasiga qaytish
 * shart emas. Qavs ichidagi joylar oʻz maʼlumoti bilan almashtiriladi.
 */
export default function VideoScriptCard({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-brand-300 bg-brand-50">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 p-4 text-left"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span aria-hidden className="text-[22px]">
            💬
          </span>
          <span className="min-w-0">
            <span className="block font-display text-[16px] font-bold text-ink">
              Nima deyishim kerak?
            </span>
            <span className="mt-0.5 block text-[13.5px] leading-snug text-body">
              Tayyor namuna matn — oʻqib chiqing va oʻzingizga moslang
            </span>
          </span>
        </span>
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className={`h-5 w-5 shrink-0 text-brand-700 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-brand-300 bg-surface px-4 py-4">
          <ol className="space-y-3">
            {VIDEO_SCRIPT.map((line, i) => (
              <li key={line} className="flex gap-3">
                <span
                  aria-hidden
                  className="grid h-[24px] w-[24px] shrink-0 place-items-center rounded-full bg-brand-100 text-[12px] font-bold text-brand-700"
                >
                  {i + 1}
                </span>
                <span className="min-w-0 text-[15px] leading-relaxed text-body">{line}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 rounded-xl bg-surface-2 p-3 text-[13.5px] leading-relaxed text-mute">
            Qavs ichidagi joylarga oʻz maʼlumotingizni ayting. Yoddan aytish shart emas —
            yozib olib, oʻqib bersangiz ham boʻladi.
          </p>
        </div>
      )}
    </div>
  );
}
