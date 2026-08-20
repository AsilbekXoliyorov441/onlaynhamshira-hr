"use client";

import { VIDEO_LIMITS } from "./video";
import type { VideoMeta, VideoValidationError } from "./types";

/*
 * Tanlangan yoki yozilgan videoni brauzerda tekshiradi — TZ V-04B
 * "Validation" va 17-boʻlimdagi xato holatlari.
 *
 * Tekshiriladi: format, hajm, oʻqilishi, davomiylik.
 *
 * OVOZ TEKSHIRUVI HOZIRCHA OʻCHIRILGAN (BLOCK_ON_NO_AUDIO = false).
 * Sabab: brauzerda audio yoʻlini metadata bosqichida ishonchli
 * aniqlashning standart usuli yoʻq. `webkitAudioDecodedByteCount`
 * hali hech narsa dekodlanmagani uchun DOIM 0 boʻladi — shu bois
 * ovozi bor videolar ham "ovozsiz" deb rad etilardi.
 * Endi ovoz faqat maʼlumot uchun aniqlanadi (`meta.hasAudio`),
 * lekin hech qachon rad etilmaydi — ovozni server tomonda
 * tekshirish toʻgʻriroq (BR-V-004).
 *
 * Qayta yoqish kerak boʻlsa: BLOCK_ON_NO_AUDIO ni `true` qiling.
 */

/** Ovozsiz video rad etilsinmi? Hozircha yoʻq — yuqoridagi izohga qarang. */
const BLOCK_ON_NO_AUDIO = false;

export type ValidationResult =
  | { ok: true; meta: VideoMeta }
  | { ok: false; error: VideoValidationError };

function mimeAllowed(type: string): boolean {
  if (!type) return false;
  return (VIDEO_LIMITS.mimeTypes as readonly string[]).includes(type.toLowerCase());
}

/** Fayl kengaytmasi — MIME boʻsh boʻlganda zaxira sifatida */
function extensionAllowed(name: string): boolean {
  return /\.(mp4|mov|webm)$/i.test(name);
}

/** Metadata yuklab, davomiylik va ovoz holatini aniqlaydi */
function readMetadata(
  file: File,
): Promise<{ duration: number; hasAudio: boolean } | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;

    const done = (value: { duration: number; hasAudio: boolean } | null) => {
      URL.revokeObjectURL(url);
      video.remove();
      resolve(value);
    };

    /* Ba'zi qurilmalarda metadata hodisasi kelmay qolishi mumkin */
    const timer = window.setTimeout(() => done(null), 15000);

    video.onerror = () => {
      window.clearTimeout(timer);
      done(null);
    };

    video.onloadedmetadata = () => {
      window.clearTimeout(timer);
      const duration = Number.isFinite(video.duration) ? video.duration : 0;

      /* Ovoz belgilari. `webkitAudioDecodedByteCount` ATAYLAB
         ishlatilmaydi: metadata bosqichida hali hech narsa
         dekodlanmagan boʻladi va u doim 0 qaytaradi. */
      const anyVideo = video as HTMLVideoElement & {
        mozHasAudio?: boolean;
        audioTracks?: { length: number };
      };
      const signals = [
        anyVideo.mozHasAudio,
        anyVideo.audioTracks ? anyVideo.audioTracks.length > 0 : undefined,
      ].filter((s) => typeof s === "boolean") as boolean[];

      /* Hech qanday belgi yoʻq boʻlsa — ovozli deb hisoblaymiz */
      const hasAudio = signals.length === 0 ? true : signals.some(Boolean);

      done({ duration, hasAudio });
    };

    video.src = url;
  });
}

export async function validateVideo(
  file: File,
  source: VideoMeta["source"],
  /* Brauzerda yozilgan WebM faylda davomiylik metadatasi boʻlmaydi
     (Chrome uni `Infinity` deb qaytaradi). Shu sabab yozgich oʻzi
     sanagan soniyalarni shu yerga uzatadi. */
  durationHint?: number,
): Promise<ValidationResult> {
  /* 1. Format (BR-V-012) */
  if (!mimeAllowed(file.type) && !extensionAllowed(file.name)) {
    return { ok: false, error: "UNSUPPORTED_FORMAT" };
  }

  /* 2. Hajm (BR-V-013) */
  if (file.size > VIDEO_LIMITS.maxFileSizeBytes) {
    return { ok: false, error: "FILE_TOO_LARGE" };
  }

  /* 3. Oʻqilishi va metadata */
  const metadata = await readMetadata(file);
  if (!metadata) return { ok: false, error: "UNREADABLE" };

  const duration = metadata.duration > 0 ? metadata.duration : durationHint ?? 0;

  /* 4. Davomiylik (BR-V-011) */
  if (duration > 0 && duration < VIDEO_LIMITS.minDurationSeconds) {
    return { ok: false, error: "TOO_SHORT" };
  }
  if (duration > VIDEO_LIMITS.maxDurationSeconds) {
    return { ok: false, error: "TOO_LONG" };
  }

  /* 5. Ovoz (BR-V-014) — hozircha rad etilmaydi, yuqoridagi izohga qarang */
  if (BLOCK_ON_NO_AUDIO && !metadata.hasAudio) {
    return { ok: false, error: "NO_AUDIO" };
  }

  return {
    ok: true,
    meta: {
      fileName: file.name || (source === "camera" ? "video-xabar.webm" : "video.mp4"),
      mimeType: file.type || "video/mp4",
      fileSize: file.size,
      durationSeconds: Math.round(duration),
      hasAudio: metadata.hasAudio,
      source,
    },
  };
}
