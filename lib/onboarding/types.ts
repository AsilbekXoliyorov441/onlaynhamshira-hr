/*
 * Qualification moduli — umumiy tiplar.
 *
 * Bu fayl backend bilan "shartnoma" vazifasini bajaradi: `question_code`,
 * `answer_code`, status va rad etish kodlari aynan shu yerdagi qiymatlar.
 * Backend dasturchi shu fayl va `qualification.ts` ni oʻqib, API'ni
 * moslashtiradi — UI'ga tegishi shart emas.
 */

/** TZ: 6. Qualification Statuslari */
export type QualificationStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "QUALIFIED"
  | "MANUAL_REVIEW_REQUIRED"
  | "NOT_QUALIFIED"
  | "REOPENED";

/** TZ: 4. Qualification natijalari */
export type QualificationResult = "QUALIFIED" | "MANUAL_REVIEW_REQUIRED" | "NOT_QUALIFIED";

/** TZ: rad etish kodlari. Foydalanuvchiga koʻrsatilmaydi (BR-Q-007) */
export type RejectionCode =
  | "NO_MEDICAL_EDUCATION"
  | "NO_MEDICAL_DIPLOMA"
  | "INSUFFICIENT_WORK_EXPERIENCE"
  | "NO_COMPATIBLE_DEVICE"
  | "TERMS_NOT_ACCEPTED";

export type QuestionCode =
  | "SPECIALITY"
  | "EDUCATION"
  | "DIPLOMA"
  | "EXPERIENCE"
  | "CATEGORY"
  | "REGION"
  | "DEVICE"
  | "TERMS";

/** Javob tanlanganda nomzod holatiga qanday taʼsir qiladi */
export type Eligibility =
  /** talablarga mos — davom etadi */
  | { kind: "eligible" }
  /** administrator koʻrib chiqishi kerak, lekin jarayon davom etadi */
  | { kind: "manual_review" }
  /** talablarga mos emas — jarayon toʻxtaydi */
  | { kind: "rejected"; code: RejectionCode };

/** Variant tanlanganda ochiladigan qoʻshimcha matn maydoni */
export type FreeTextField = {
  /** backend maydon nomi, masalan `speciality_other` */
  field: string;
  placeholder: string;
  minLength: number;
  maxLength: number;
};

export type Option = {
  /** backendga ketadigan `answer_code` */
  code: string;
  label: string;
  /** TZ'dagi qoʻshimcha status kodi (masalan DIPLOMA_AVAILABLE) */
  statusCode?: string;
  eligibility: Eligibility;
  freeText?: FreeTextField;
  /** variant ostidagi kichik izoh */
  hint?: string;
  /** tanlanganda koʻrsatiladigan ogohlantirish (rad etmaydi) */
  warning?: string;
};

/** Asosiy savoldan keyin shu ekranda beriladigan qoʻshimcha savol */
export type SubQuestion = {
  /** backend maydon nomi, masalan `currently_employed` */
  field: string;
  title: string;
  options: Option[];
  required: boolean;
};

export type QuestionKind = "single" | "multi" | "region" | "consent";

export type Question = {
  code: QuestionCode;
  /** TZ'dagi Screen ID */
  screenId: string;
  /** manzil boʻlagi: /hamkor/saralash/<slug> */
  slug: string;
  /** progress uchun: 1..8 */
  index: number;
  kind: QuestionKind;
  title: string;
  /** savol ostidagi tushuntirish */
  note?: string;
  options?: Option[];
  sub?: SubQuestion;
  /** `multi` uchun: majburiy belgilanishi kerak boʻlgan variantlar */
  requiredOptions?: string[];
  /** `multi`/`consent` uchun: majburiy variant belgilanmasa rad etiladi */
  missingRequired?: Eligibility;
};

/** Bitta savolga berilgan javob (TZ: `qualification_answers`) */
export type Answer = {
  question_code: QuestionCode;
  /** bitta tanlov uchun kod, koʻp tanlov uchun kodlar roʻyxati */
  answer: string | string[];
  /** "Boshqa" tanlanganda kiritilgan matn */
  answer_text?: string;
  /** qoʻshimcha savol javobi */
  sub_answer?: string;
  /** hudud savoli uchun */
  regions?: RegionSelection[];
};

export type RegionSelection = {
  region_code: string;
  district_codes: string[];
};
