import type { Question } from "./types";

/*
 * Qualification savollari — TZ "STAGE 2: QUALIFICATION MODULE" ning
 * bajariladigan koʻrinishi.
 *
 * Bu yagona manba: ekranlar shu roʻyxatdan chiziladi, natija shu yerdagi
 * `eligibility` qiymatlaridan hisoblanadi, backendga esa shu yerdagi
 * `code` qiymatlari yuboriladi. Savol qoʻshish yoki qoidani oʻzgartirish
 * uchun faqat shu faylni tahrirlash kifoya.
 *
 * TZ'da aniqlanmagan va shu yerda vaqtincha qaror qilingan joylar
 * `TZ-SAVOL` izohi bilan belgilangan — ular tasdiqlangach oʻzgartiriladi.
 */

export const QUALIFICATION_QUESTIONS: Question[] = [
  /* ── Q-01 ─────────────────────────────────────────────────────────── */
  {
    code: "SPECIALITY",
    screenId: "QUALIFICATION_SPECIALITY",
    slug: "mutaxassislik",
    index: 1,
    kind: "single",
    title: "Sizning asosiy mutaxassisligingiz qaysi?",
    options: [
      { code: "NURSE", label: "Hamshira", eligibility: { kind: "eligible" } },
      { code: "PARAMEDIC", label: "Feldsher", eligibility: { kind: "eligible" } },
      { code: "DOCTOR", label: "Shifokor", eligibility: { kind: "eligible" } },
      { code: "MIDWIFE", label: "Akusher", eligibility: { kind: "eligible" } },
      { code: "MASSAGE_THERAPIST", label: "Massaj mutaxassisi", eligibility: { kind: "eligible" } },
      { code: "LAB_SPECIALIST", label: "Laboratoriya mutaxassisi", eligibility: { kind: "eligible" } },
      { code: "CAREGIVER", label: "Bemor parvarishi boʻyicha mutaxassis", eligibility: { kind: "eligible" } },
      {
        code: "OTHER",
        label: "Boshqa tibbiyot mutaxassisi",
        eligibility: { kind: "eligible" },
        freeText: {
          field: "speciality_other",
          placeholder: "Mutaxassisligingizni yozing",
          minLength: 3,
          maxLength: 100,
        },
      },
    ],
  },

  /* ── Q-02 ─────────────────────────────────────────────────────────── */
  {
    code: "EDUCATION",
    screenId: "QUALIFICATION_EDUCATION",
    slug: "malumot",
    index: 2,
    kind: "single",
    title: "Qanday tibbiy maʼlumotga egasiz?",
    note: "Platformada koʻrsatiladigan xizmatlar nomzodning maʼlumoti, malakasi va vakolati asosida belgilanadi.",
    options: [
      /* TZ-SAVOL: "Tibbiyot kolleji yoki texnikumi" va "Oʻrta maxsus
         tibbiy maʼlumot" amalda bir xil daraja. Hozircha TZ'dagidek
         ikkalasi ham qoldirildi. */
      { code: "MEDICAL_COLLEGE", label: "Tibbiyot kolleji yoki texnikumi", eligibility: { kind: "eligible" } },
      { code: "HIGHER_MEDICAL", label: "Oliy tibbiy maʼlumot", eligibility: { kind: "eligible" } },
      { code: "SECONDARY_SPECIAL", label: "Oʻrta maxsus tibbiy maʼlumot", eligibility: { kind: "eligible" } },
      { code: "RETRAINING_COURSE", label: "Tibbiy qayta tayyorlash kursi", eligibility: { kind: "eligible" } },
      {
        code: "NONE",
        label: "Tibbiy maʼlumotim yoʻq",
        eligibility: { kind: "rejected", code: "NO_MEDICAL_EDUCATION" },
      },
      {
        code: "OTHER",
        label: "Boshqa",
        eligibility: { kind: "manual_review" },
        freeText: {
          field: "education_other",
          placeholder: "Maʼlumotingizni yozing",
          minLength: 3,
          maxLength: 100,
        },
      },
    ],
  },

  /* ── Q-03 ─────────────────────────────────────────────────────────── */
  {
    code: "DIPLOMA",
    screenId: "QUALIFICATION_DIPLOMA",
    slug: "diplom",
    index: 3,
    kind: "single",
    title: "Tibbiy maʼlumotingizni tasdiqlovchi diplomingiz bormi?",
    note: "Keyingi bosqichda diplomingiz rasmini mobil ilova orqali yuklashingiz kerak boʻladi.",
    options: [
      {
        code: "AVAILABLE",
        label: "Ha, diplomim mavjud",
        statusCode: "DIPLOMA_AVAILABLE",
        eligibility: { kind: "eligible" },
      },
      {
        code: "NOT_AVAILABLE_NOW",
        label: "Diplomim mavjud, lekin hozir yonimda emas",
        statusCode: "DIPLOMA_NOT_AVAILABLE_NOW",
        hint: "Diplomni keyinroq yuklashingiz kerak boʻladi",
        eligibility: { kind: "eligible" },
      },
      {
        code: "NONE",
        label: "Diplomim yoʻq",
        statusCode: "NO_DIPLOMA",
        eligibility: { kind: "rejected", code: "NO_MEDICAL_DIPLOMA" },
      },
      {
        code: "RESTORATION",
        label: "Diplomim yoʻqolgan yoki tiklanmoqda",
        statusCode: "DIPLOMA_RESTORATION",
        eligibility: { kind: "manual_review" },
      },
    ],
  },

  /* ── Q-04 ─────────────────────────────────────────────────────────── */
  {
    code: "EXPERIENCE",
    screenId: "QUALIFICATION_EXPERIENCE",
    slug: "tajriba",
    index: 4,
    kind: "single",
    title: "Tibbiyot sohasida qancha professional ish tajribangiz bor?",
    options: [
      { code: "NONE", label: "Tajribam yoʻq", eligibility: { kind: "rejected", code: "INSUFFICIENT_WORK_EXPERIENCE" } },
      { code: "LESS_1", label: "1 yildan kam", eligibility: { kind: "rejected", code: "INSUFFICIENT_WORK_EXPERIENCE" } },
      { code: "1_2", label: "1–2 yil", eligibility: { kind: "rejected", code: "INSUFFICIENT_WORK_EXPERIENCE" } },
      { code: "3_5", label: "3–5 yil", eligibility: { kind: "eligible" } },
      { code: "6_10", label: "6–10 yil", eligibility: { kind: "eligible" } },
      { code: "MORE_10", label: "10 yildan ortiq", eligibility: { kind: "eligible" } },
    ],
    /* TZ-SAVOL: bu javobning natijaga taʼsiri yozilmagan — hozircha
       faqat maʼlumot uchun saqlanadi. */
    sub: {
      field: "currently_employed",
      title: "Hozirda tibbiyot muassasasida ishlaysizmi?",
      required: true,
      options: [
        { code: "YES", label: "Ha", eligibility: { kind: "eligible" } },
        { code: "NO", label: "Yoʻq", eligibility: { kind: "eligible" } },
        { code: "TEMPORARILY_NOT", label: "Vaqtincha ishlamayapman", eligibility: { kind: "eligible" } },
      ],
    },
  },

  /* ── Q-05 ─────────────────────────────────────────────────────────── */
  {
    code: "CATEGORY",
    screenId: "QUALIFICATION_CATEGORY",
    slug: "malaka",
    index: 5,
    kind: "single",
    title: "Amaldagi malaka toifangizni tanlang",
    note: "Malaka toifasi haqidagi maʼlumot keyinchalik hujjatlar asosida tekshiriladi.",
    options: [
      { code: "HIGHEST", label: "Oliy toifa", eligibility: { kind: "eligible" } },
      { code: "FIRST", label: "Birinchi toifa", eligibility: { kind: "eligible" } },
      { code: "SECOND", label: "Ikkinchi toifa", eligibility: { kind: "eligible" } },
      /* TZ tavsiyasi: avtomatik rad etilmasin */
      { code: "NONE", label: "Toifam yoʻq", eligibility: { kind: "manual_review" } },
      /* TZ-SAVOL: bu variant uchun Business Rules'da qoida yozilmagan.
         Xavfsiz qaror sifatida qoʻlda tekshiruvga yuborildi. */
      { code: "CERTIFICATES", label: "Malaka oshirganman, sertifikat(lar)im bor", eligibility: { kind: "manual_review" } },
      { code: "IN_PROGRESS", label: "Malaka toifasini olish jarayonidaman", eligibility: { kind: "manual_review" } },
      { code: "NOT_REQUIRED", label: "Mening mutaxassisligim uchun toifa talab qilinmaydi", eligibility: { kind: "manual_review" } },
    ],
  },

  /* ── Q-06 ─────────────────────────────────────────────────────────── */
  {
    code: "REGION",
    screenId: "QUALIFICATION_REGION",
    slug: "hudud",
    index: 6,
    kind: "region",
    title: "Qaysi hududda xizmat koʻrsatishingiz mumkin?",
    note: "Bir nechta tuman yoki shaharni tanlashingiz mumkin.",
    sub: {
      field: "can_travel",
      title: "Xizmat koʻrsatish uchun mijoz manziliga bora olasizmi?",
      required: true,
      options: [
        { code: "OWN_TRANSPORT", label: "Ha, shaxsiy transportim bor", eligibility: { kind: "eligible" } },
        { code: "PUBLIC_TRANSPORT", label: "Ha, jamoat transporti yoki taksi orqali", eligibility: { kind: "eligible" } },
        { code: "NEARBY_ONLY", label: "Faqat yaqin hududlarda", eligibility: { kind: "eligible" } },
        /* TZ'da rad etish kodi berilmagan — faqat ogohlantirish */
        {
          code: "NO",
          label: "Yoʻq",
          eligibility: { kind: "manual_review" },
          warning:
            "Onlayn Hamshira xizmatlari asosan mijoz manzilida koʻrsatiladi. Buyurtmalarni bajarish uchun xizmat hududida harakatlana olish zarur.",
        },
      ],
    },
  },

  /* ── Q-07 ─────────────────────────────────────────────────────────── */
  {
    code: "DEVICE",
    screenId: "QUALIFICATION_DEVICE",
    slug: "qurilma",
    index: 7,
    kind: "multi",
    title: "Quyidagi imkoniyatlarga egamisiz?",
    options: [
      { code: "SMARTPHONE", label: "Android yoki iPhone smartfoni", eligibility: { kind: "eligible" } },
      { code: "MOBILE_INTERNET", label: "Mobil internet", eligibility: { kind: "eligible" } },
      /* TZ-SAVOL: Telegram majburiymi? Hozircha majburiy emas. */
      { code: "TELEGRAM", label: "Telegram", eligibility: { kind: "eligible" } },
      { code: "APP_SKILLS", label: "Mobil ilovalardan foydalanish koʻnikmasi", eligibility: { kind: "eligible" } },
    ],
    requiredOptions: ["SMARTPHONE", "MOBILE_INTERNET"],
    missingRequired: { kind: "rejected", code: "NO_COMPATIBLE_DEVICE" },
    sub: {
      field: "app_ready",
      title: "Onlayn Hamshira Mutaxassis ilovasidan foydalanishga tayyormisiz?",
      required: true,
      options: [
        { code: "YES", label: "Ha", eligibility: { kind: "eligible" } },
        { code: "NO", label: "Yoʻq", eligibility: { kind: "rejected", code: "NO_COMPATIBLE_DEVICE" } },
        {
          code: "NEEDS_TRAINING",
          label: "Menga oʻrgatish kerak",
          hint: "Sizga qoʻshimcha video yoʻriqnomalar koʻrsatiladi",
          eligibility: { kind: "eligible" },
        },
      ],
    },
  },

  /* ── Q-08 ─────────────────────────────────────────────────────────── */
  {
    code: "TERMS",
    screenId: "QUALIFICATION_TERMS",
    slug: "shartlar",
    index: 8,
    kind: "consent",
    title: "Hamkorlikning asosiy shartlari",
    note: "Jarayonni davom ettirishdan oldin quyidagi shartlar bilan tanishing.",
    options: [
      { code: "RULES_READ", label: "Platforma qoidalari bilan tanishdim", eligibility: { kind: "eligible" } },
      { code: "DATA_PROCESSING", label: "Maʼlumotlarni qayta ishlashga roziman", eligibility: { kind: "eligible" } },
      { code: "DATA_TRUE", label: "Taqdim etgan maʼlumotlarim toʻgʻriligini tasdiqlayman", eligibility: { kind: "eligible" } },
      { code: "TERMS_ACCEPTED", label: "Hamkorlik shartlariga roziman", eligibility: { kind: "eligible" } },
    ],
    requiredOptions: ["RULES_READ", "DATA_PROCESSING", "DATA_TRUE", "TERMS_ACCEPTED"],
    missingRequired: { kind: "rejected", code: "TERMS_NOT_ACCEPTED" },
  },
];

/** Q-08 ekranida oʻqiladigan shartlar roʻyxati */
export const PARTNERSHIP_TERMS: string[] = [
  "platformaga taqdim etilgan maʼlumotlar haqqoniy boʻlishi kerak;",
  "faqat oʻz malakangiz doirasidagi xizmatlarni bajarishingiz kerak;",
  "mijozlar bilan professional va hurmatli muloqot qilishingiz kerak;",
  "sanitariya, tibbiy etika va maxfiylik talablariga rioya qilishingiz kerak;",
  "buyurtmalar Onlayn Hamshira Mutaxassis ilovasi orqali boshqariladi;",
  "har bir yakunlangan buyurtmadan tushgan mablagʻning 70 foizi mutaxassisga, 30 foizi platformaga ajratiladi;",
  "taqdim etilgan maʼlumotlar va hujjatlar administrator tomonidan tekshiriladi.",
];

export const QUALIFICATION_TOTAL = QUALIFICATION_QUESTIONS.length;

export function questionBySlug(slug: string): Question | undefined {
  return QUALIFICATION_QUESTIONS.find((q) => q.slug === slug);
}

export function questionByCode(code: string): Question | undefined {
  return QUALIFICATION_QUESTIONS.find((q) => q.code === code);
}

/** Navbatdagi savol (oxirgisidan keyin `undefined`) */
export function nextQuestion(current: Question): Question | undefined {
  return QUALIFICATION_QUESTIONS[current.index] /* index 1-dan boshlanadi */;
}

export function previousQuestion(current: Question): Question | undefined {
  return QUALIFICATION_QUESTIONS[current.index - 2];
}
