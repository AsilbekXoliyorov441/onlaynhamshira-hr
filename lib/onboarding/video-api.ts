"use client";

import * as store from "./video-store";
import type { VideoMeta } from "./types";

/*
 * Video xabar API qatlami.
 *
 * BACKEND DASTURCHI UCHUN: TZ "16. API Requirements" dagi endpointlar
 * aynan shu nomlar bilan shu yerda. Hozir ularning ichi brauzerda
 * taqlid qilinadi (backend yoʻq). Tayyor boʻlganda `USE_BACKEND` ni
 * `true` qilish kifoya — ekranlarga tegilmaydi.
 *
 *   POST   /api/v1/onboarding/video-introduction/start
 *   POST   /api/v1/onboarding/video-introduction/consent
 *   POST   /api/v1/onboarding/video-introduction/upload-url
 *   POST   /api/v1/onboarding/video-introduction/complete
 *   GET    /api/v1/onboarding/video-introduction/status
 *   GET    /api/v1/onboarding/video-introduction
 *   POST   /api/v1/onboarding/video-introduction/replace
 *   DELETE /api/v1/onboarding/video-introduction
 *
 * Yuklash uch qadamda boradi (TZ V-06):
 *   1) upload-url olinadi;
 *   2) fayl storage'ga yuboriladi (progress bilan);
 *   3) complete chaqiriladi.
 * Uchala qadam quyida oʻz funksiyasida turibdi.
 */

const USE_BACKEND = false;
const BASE = "/api/v1/onboarding/video-introduction";

async function call<T>(path: string, method: "GET" | "POST" | "DELETE", body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return (await res.json()) as T;
}

/** V-00 */
export async function startVideoStage(): Promise<store.VideoSession> {
  if (USE_BACKEND) await call("/start", "POST");
  return store.startVideoStage();
}

/** V-02 — BR-V-010: rozilik majburiy */
export async function saveConsent(
  session: store.VideoSession,
  consents: Record<string, boolean>,
): Promise<store.VideoSession> {
  if (USE_BACKEND) await call("/consent", "POST", consents);
  const next = { ...session, consents };
  store.saveVideo(next);
  return next;
}

export type UploadTicket = {
  upload_id: string;
  upload_url: string;
  expires_at: string;
};

/** V-06 1-qadam: signed upload URL */
export async function createUploadUrl(meta: VideoMeta): Promise<UploadTicket> {
  const payload = {
    file_name: meta.fileName,
    file_size: meta.fileSize,
    mime_type: meta.mimeType,
    duration_seconds: meta.durationSeconds,
  };
  if (USE_BACKEND) return await call<UploadTicket>("/upload-url", "POST", payload);

  /* Taqlid: backend yoʻq, shu bois soxta chipta qaytariladi */
  return {
    upload_id: `local-${Date.now()}`,
    upload_url: "",
    expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
  };
}

/**
 * V-07 2-qadam: faylni storage'ga yuborish.
 *
 * `fetch` upload progressini bermaydi, shu bois XMLHttpRequest
 * ishlatiladi — TZ "Upload progress foydalanuvchiga real vaqt
 * rejimida koʻrsatiladi" talabi shuni talab qiladi.
 */
export function uploadVideo(
  ticket: UploadTicket,
  blob: Blob,
  onProgress: (percent: number) => void,
  signal?: AbortSignal,
): Promise<void> {
  if (!USE_BACKEND) return simulateUpload(blob, onProgress, signal);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", ticket.upload_url);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve()
        : reject(new Error(`upload: ${xhr.status}`));
    xhr.onerror = () => reject(new Error("upload: network"));
    xhr.onabort = () => reject(new Error("upload: aborted"));
    signal?.addEventListener("abort", () => xhr.abort());
    xhr.send(blob);
  });
}

/* Backend yoʻq paytda progressni haqiqiyga yaqin koʻrsatish uchun:
   fayl hajmiga qarab taxminiy vaqt hisoblanadi. */
function simulateUpload(
  blob: Blob,
  onProgress: (percent: number) => void,
  signal?: AbortSignal,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const megabytes = blob.size / (1024 * 1024);
    /* ~1.5 MB/s — mobil internetga yaqin tezlik, 2–12 soniya oraligʻi */
    const totalMs = Math.min(12000, Math.max(2000, (megabytes / 1.5) * 1000));
    const started = Date.now();

    const tick = window.setInterval(() => {
      if (signal?.aborted) {
        window.clearInterval(tick);
        reject(new Error("upload: aborted"));
        return;
      }
      const percent = Math.min(100, Math.round(((Date.now() - started) / totalMs) * 100));
      onProgress(percent);
      if (percent >= 100) {
        window.clearInterval(tick);
        resolve();
      }
    }, 120);
  });
}

/** V-06 3-qadam: uploadni yakunlash */
export async function completeUpload(
  session: store.VideoSession,
  ticket: UploadTicket,
  meta: VideoMeta,
): Promise<store.VideoSession> {
  if (USE_BACKEND) {
    await call("/complete", "POST", {
      upload_id: ticket.upload_id,
      duration_seconds: meta.durationSeconds,
      file_size: meta.fileSize,
      mime_type: meta.mimeType,
    });
  }
  const next: store.VideoSession = {
    ...session,
    status: "UPLOADED",
    uploadId: ticket.upload_id,
    uploadedBytes: meta.fileSize,
    uploadedAt: new Date().toISOString(),
  };
  store.saveVideo(next);
  return next;
}

/** BR-V-015: yakuniy yuborishdan oldin videoni almashtirish */
export async function replaceVideo(session: store.VideoSession): Promise<store.VideoSession> {
  if (USE_BACKEND) await call("/replace", "POST");
  return store.resetSelectedVideo(session);
}
