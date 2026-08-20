"use client";

import type { ReRecordReason, VideoMeta, VideoStatus } from "./types";

/*
 * Video bosqichi holati.
 *
 * Ikki joyda saqlanadi:
 *   — metadata va status: `localStorage` (kichik, tez oʻqiladi);
 *   — videoning oʻzi: `IndexedDB` (yuzlab MB boʻlishi mumkin,
 *     localStorage bunga yaramaydi).
 *
 * Nega IndexedDB: foydalanuvchi preview ekranida sahifani yangilasa
 * yoki tasodifan chiqib ketsa, video yoʻqolmasligi kerak — TZ V-08B
 * "Videongiz qurilmangizda saqlangan boʻlsa, qayta yuborishingiz
 * mumkin" degan holat aynan shu.
 */

const KEY = "oh-video-v1";
const DB_NAME = "oh-onboarding";
const DB_VERSION = 1;
const STORE = "videos";
const BLOB_ID = "video-introduction";

export type VideoSession = {
  status: VideoStatus;
  meta: VideoMeta | null;
  consents: Record<string, boolean>;
  /** TZ: upload-url javobidagi identifikator */
  uploadId: string | null;
  uploadedBytes: number;
  startedAt: string | null;
  uploadedAt: string | null;
  /** administrator qayta yozishni soʻraganda */
  reRecordReason: ReRecordReason | null;
};

const EMPTY: VideoSession = {
  status: "NOT_STARTED",
  meta: null,
  consents: {},
  uploadId: null,
  uploadedBytes: 0,
  startedAt: null,
  uploadedAt: null,
  reRecordReason: null,
};

export function loadVideo(): VideoSession {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as VideoSession;
    if (!parsed || typeof parsed !== "object") return EMPTY;
    return { ...EMPTY, ...parsed };
  } catch {
    return EMPTY;
  }
}

export function saveVideo(session: VideoSession): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(session));
  } catch {
    /* eʼtiborsiz */
  }
}

export function startVideoStage(): VideoSession {
  const existing = loadVideo();
  if (existing.status !== "NOT_STARTED") return existing;
  const session: VideoSession = {
    ...EMPTY,
    status: "IN_PROGRESS",
    startedAt: new Date().toISOString(),
  };
  saveVideo(session);
  return session;
}

/* ───────────────────────── IndexedDB ───────────────────────── */

function openDb(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof indexedDB === "undefined") return resolve(null);
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
}

/** Videoni qurilmada saqlaydi */
export async function putVideoBlob(blob: Blob): Promise<boolean> {
  const db = await openDb();
  if (!db) return false;
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(blob, BLOB_ID);
    tx.oncomplete = () => {
      db.close();
      resolve(true);
    };
    tx.onerror = () => {
      db.close();
      resolve(false);
    };
  });
}

export async function getVideoBlob(): Promise<Blob | null> {
  const db = await openDb();
  if (!db) return null;
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, "readonly");
    const request = tx.objectStore(STORE).get(BLOB_ID);
    request.onsuccess = () => {
      db.close();
      resolve((request.result as Blob) ?? null);
    };
    request.onerror = () => {
      db.close();
      resolve(null);
    };
  });
}

export async function clearVideoBlob(): Promise<void> {
  const db = await openDb();
  if (!db) return;
  await new Promise<void>((resolve) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(BLOB_ID);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      resolve();
    };
  });
}

/** Video va u haqidagi maʼlumotni birga saqlaydi */
export async function storeSelectedVideo(
  session: VideoSession,
  blob: Blob,
  meta: VideoMeta,
): Promise<VideoSession> {
  await putVideoBlob(blob);
  const next: VideoSession = { ...session, status: "PREVIEW", meta, uploadedBytes: 0 };
  saveVideo(next);
  return next;
}

/** Videoni almashtirishdan oldin tozalash (BR-V-015) */
export async function resetSelectedVideo(session: VideoSession): Promise<VideoSession> {
  await clearVideoBlob();
  const next: VideoSession = {
    ...session,
    status: "IN_PROGRESS",
    meta: null,
    uploadId: null,
    uploadedBytes: 0,
  };
  saveVideo(next);
  return next;
}
