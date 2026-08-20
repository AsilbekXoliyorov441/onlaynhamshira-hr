import type { ReRecordReason } from "./types";

/*
 * Video xabar moduli — TZ "STAGE 4: VIDEO XABAR MODULI".
 *
 * TZ ICHIDAGI ZIDDIYATLAR VA QABUL QILINGAN QIYMATLAR:
 *
 *   Maksimal hajm — TZ'da uch xil son bor edi:
 *     6-boʻlim 300 MB, V-04B va BR-V-013 500 MB, 17-boʻlim 100 MB.
 *     Kelishuv boʻyicha 500 MB olindi (koʻpchilik joyda shunday).
 *
 *   Minimal davomiylik — 6-boʻlimda 60 soniya, qolgan hamma joyda
 *     (V-04A, V-04B, BR-V-011, Acceptance #10) 30 soniya. 30 olindi.
 *
 *   Maksimal davomiylik — hamma joyda 3 daqiqa, faqat V-04B xato
 *     matnida 3.5 daqiqa. 3 daqiqa olindi.
 */

export const VIDEO_LIMITS = {
  minDurationSeconds: 30,
  maxDurationSeconds: 180,
  /** tavsiya etiladigan oraliq (V-01 matni) */
  recommendedMinSeconds: 60,
  recommendedMaxSeconds: 180,
  maxFileSizeBytes: 500 * 1024 * 1024,
  maxFileSizeLabel: "500 MB",
  mimeTypes: ["video/mp4", "video/quicktime", "video/webm"],
  formatLabel: "MP4, MOV yoki WebM",
} as const;

/** V-01: videoda aytilishi kerak boʻlgan maʼlumotlar */
export const VIDEO_CHECKLIST = [
  "Ism va familiyangiz",
  "Mutaxassisligingiz",
  "Ish tajribangiz",
  "Ish joyingiz yoki oldingi faoliyatingiz",
  "Xizmat koʻrsatadigan hududingiz",
  "Bajara oladigan tibbiy xizmatlaringiz",
  "Platformaga qoʻshilish maqsadingiz",
  "Xullas, oʻzingizni bizga batafsil tanishtirishingiz kerak",
];

/** V-01: texnik koʻrsatmalar */
export const VIDEO_TECH_NOTES = [
  "Video 1–3 daqiqa boʻlishi tavsiya etiladi.",
  "Ovoz aniq eshitilishi kerak.",
  "Yuzingiz kamerada aniq koʻrinishi kerak.",
  "Videoni tinch va yorugʻ joyda yozing.",
];

/** TZ 7-boʻlim: video yozish boʻyicha tavsiyalar */
export const VIDEO_TIPS = [
  "yorugʻ joyni tanlang;",
  "kamera qarshisida aniq koʻrining;",
  "telefonni qimirlamaydigan holatda ushlang;",
  "tinch joyda video yozing;",
  "ovozingiz aniq eshitilishiga ishonch hosil qiling;",
  "tibbiy forma yoki ozoda kiyimda boʻlish tavsiya etiladi;",
  "kameraga qarab gapiring;",
  "videoda boshqa shaxslar koʻrinmasligi kerak;",
  "pasport, diplom yoki boshqa maxfiy hujjatlarni videoda koʻrsatmang.",
];

/** TZ 3-boʻlim: topshiriq matni */
export const VIDEO_TASK =
  "Oʻzingiz haqingizda 1–2 daqiqalik qisqa video yozing. Videoda ismingiz, taʼlimingiz, mutaxassisligingiz, ish tajribangiz, qoʻlingizdan mutaxassis sifatida nimalar kelishi, xizmat koʻrsatadigan hududingiz va Onlayn Hamshira platformasida nima uchun ishlamoqchi ekaningizni ayting. Video yozish davomida shoshilmang, bir tempda tushunarli qilib gapiring.";

/** TZ 5-boʻlim: namuna skript */
export const VIDEO_SCRIPT = [
  "Assalomu alaykum. Mening ismim [ism va familiya].",
  "Men [mutaxassislik] boʻyicha mutaxassisman va tibbiyot sohasida [tajriba yili] yillik ish tajribasiga egaman.",
  "Hozirda [tibbiyot muassasasi yoki faoliyat holati]da ishlayman.",
  "Men [hudud nomi] hududida xizmat koʻrsata olaman.",
  "Asosan [xizmatlar roʻyxati] xizmatlarini professional tarzda bajaraman.",
  "Onlayn Hamshira platformasiga qoʻshilishdan maqsadim oʻz tajribam orqali bemorlarga sifatli tibbiy xizmat koʻrsatish, zamonaviy formatda ishlash va qoʻshimcha daromad olishdir.",
];

/** V-02: rozilik matnlari */
export const VIDEO_CONSENT_POINTS = [
  "HR va administrator tomonidan koʻrib chiqilishi mumkin;",
  "nomzodni baholash uchun saqlanishi mumkin;",
  "nomzodning roziligisiz reklama yoki ochiq materiallarda ishlatilmaydi;",
  "uchinchi shaxslarga qonunchilikda nazarda tutilmagan hollarda berilmaydi.",
];

/*
 * V-02 dagi rozilik belgilari.
 * TZ ekranida ikkita belgi koʻrsatilgan edi, lekin payload va
 * `video_consents` jadvalida uchta maydon bor. Kelishuv boʻyicha
 * uchinchi belgi qoʻshildi.
 */
export const VIDEO_CONSENTS = [
  { field: "video_processing_consent", label: "Videoni koʻrib chiqish va saqlashga roziman" },
  { field: "information_accuracy_confirmed", label: "Videoda bergan maʼlumotlarim toʻgʻriligini tasdiqlayman" },
  { field: "privacy_rules_accepted", label: "Maxfiylik qoidalari bilan tanishdim" },
] as const;

/** TZ 10-boʻlim: administrator koʻrsatadigan sabablar */
export const RE_RECORD_REASONS: Record<ReRecordReason, string> = {
  POOR_AUDIO_QUALITY: "Videoda ovoz yetarlicha aniq eshitilmaydi. Iltimos, tinch joyda qayta video yozing.",
  FACE_NOT_VISIBLE: "Videoda yuzingiz aniq koʻrinmaydi. Yorugʻ joyda, kameraga qarab qayta yozing.",
  TOO_SHORT: "Video juda qisqa. Topshiriqdagi barcha savollarga javob bering.",
  CONTENT_MISMATCH: "Video mazmuni topshiriqqa toʻliq mos emas.",
  SPECIALITY_NOT_MENTIONED: "Videoda mutaxassisligingiz yoki tajribangiz aytilmagan.",
  MOTIVATION_NOT_EXPLAINED: "Platformaga qoʻshilish sababingiz tushuntirilmagan.",
  OTHER_PEOPLE_VISIBLE: "Videoda boshqa shaxslar koʻrinadi. Yolgʻiz holda qayta yozing.",
  LOW_TECHNICAL_QUALITY: "Video texnik sifati yetarli emas.",
  OTHER: "Administrator yangi video yuborishingizni soʻradi.",
};

/** TZ 17-boʻlim: xato matnlari */
export const VIDEO_ERRORS = {
  UNSUPPORTED_FORMAT: {
    title: "Video formati mos emas",
    text: `Ushbu video formati qoʻllab-quvvatlanmaydi. ${VIDEO_LIMITS.formatLabel} formatidagi videoni tanlang.`,
  },
  FILE_TOO_LARGE: {
    title: "Video hajmi juda katta",
    text: `Video hajmi ${VIDEO_LIMITS.maxFileSizeLabel} dan oshmasligi kerak. Videoni qisqartiring yoki sifatini pasaytirib qayta yuklang.`,
  },
  TOO_SHORT: {
    title: "Video juda qisqa",
    text: `Video kamida ${VIDEO_LIMITS.minDurationSeconds} soniya davom etishi kerak.`,
  },
  TOO_LONG: {
    title: "Video juda uzun",
    text: `Video ${VIDEO_LIMITS.maxDurationSeconds / 60} daqiqadan oshmasligi kerak.`,
  },
  NO_AUDIO: {
    title: "Videoda ovoz aniqlanmadi",
    text: "Videoda ovozingiz aniq eshitilishi kerak. Boshqa video yozing yoki yuklang.",
  },
  UNREADABLE: {
    title: "Videoni oʻqib boʻlmadi",
    text: "Fayl buzilgan yoki qoʻllab-quvvatlanmaydigan koʻrinishda. Boshqa videoni tanlang.",
  },
} as const;

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return mb >= 10 ? `${Math.round(mb)} MB` : `${mb.toFixed(1)} MB`;
}
