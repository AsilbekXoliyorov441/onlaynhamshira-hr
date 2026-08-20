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

/* ══════════════════════════════════════════════════════════════════
   STAGE 3: Education va Mini Test
   ══════════════════════════════════════════════════════════════════ */

/** TZ: 9. Statuslar */
export type EducationStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "LESSON_COMPLETED"
  | "TEST_IN_PROGRESS"
  | "RETRY_REQUIRED"
  | "PASSED"
  | "COMPLETED";

export type LessonCode =
  | "PLATFORM_MODEL"
  | "SPECIALIST_RESPONSIBILITIES"
  | "CLIENT_COMMUNICATION"
  | "INCOME_COMMISSION"
  | "PLATFORM_RULES";

/** Dars matni bloklari.
 *  BR-E-012: matnlar kodga qattiq biriktirilmasligi kerak — shu bois
 *  dars mazmuni shu shakldagi maʼlumot sifatida saqlanadi va keyinchalik
 *  backend/CMS'dan aynan shu koʻrinishda kelishi mumkin. */
export type LessonBlock =
  | { kind: "text"; text: string }
  /** ketma-ket qadamlar (infografika) */
  | { kind: "flow"; steps: string[] }
  /** raqamlangan roʻyxat */
  | { kind: "numbered"; items: string[] }
  /** sarlavhali kartochkalar (qoidalar) */
  | { kind: "cards"; items: Array<{ title: string; text: string }> }
  | { kind: "bullets"; items: string[] }
  /** daromad taqsimoti diagrammasi */
  | { kind: "split"; specialist: number; platform: number }
  /** "Muhim eslatma" */
  | { kind: "note"; text: string }
  /** "Muhim ogohlantirish" */
  | { kind: "warning"; text: string };

export type Lesson = {
  code: LessonCode;
  /** TZ'dagi Screen ID */
  screenId: string;
  /** manzil boʻlagi: /hamkor/oquv/<slug> */
  slug: string;
  /** progress uchun: 1..5 */
  index: number;
  /** yon ustundagi qisqa nom */
  shortTitle: string;
  title: string;
  blocks: LessonBlock[];
  /** dars oxiridagi tasdiq belgisi */
  confirmLabel: string;
  /** dars oxiridagi tugma matni */
  nextLabel: string;
};

export type TestOption = {
  /** backendga ketadigan `option_code` */
  code: string;
  text: string;
  isCorrect: boolean;
};

export type TestQuestion = {
  /** backendga ketadigan `question_code` */
  code: string;
  text: string;
  options: TestOption[];
  /** TZ: CRITICAL_QUESTION — bu savolga toʻgʻri javob majburiy */
  isCritical?: boolean;
  /** notoʻgʻri javob uchun izoh (BR-E-014: mini testlarda ruxsat etiladi) */
  explanation?: string;
  /** E-06B dagi tavsiyalar uchun mavzu */
  topic?: string;
};

export type MiniTest = {
  /** backendga ketadigan `test_code` */
  code: string;
  screenId: string;
  title: string;
  /** qaysi darsdan keyin turadi */
  lesson: LessonCode;
  questions: TestQuestion[];
  /** oʻtish uchun kamida shuncha toʻgʻri javob */
  minCorrect: number;
};

export type TestResult = "PASSED" | "RETRY_REQUIRED";

export type TestEvaluation = {
  correct: number;
  total: number;
  percentage: number;
  criticalPassed: boolean;
  result: TestResult;
  /** notoʻgʻri javob berilgan mavzular (BR-E-015) */
  topicsToReview: string[];
};
