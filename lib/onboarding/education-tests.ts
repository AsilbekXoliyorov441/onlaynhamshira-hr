import type { MiniTest, TestQuestion } from "./types";

/*
 * Mini testlar (T-01…T-04) va yakuniy test (T-05).
 *
 * Variant kodlari TZ'dagi payload namunasiga mos: OPTION_A, OPTION_B …
 *   { "question_code": "FINAL_TEST_QUESTION_01",
 *     "selected_option_code": "OPTION_B" }
 *
 * `topic` — E-06B ekranidagi "qayta oʻrganish tavsiya etilgan mavzular"
 * uchun (BR-E-015). Ular notoʻgʻri javob berilgan savollardan hosil
 * qilinadi, qat'iy roʻyxat emas.
 */

const A = "OPTION_A";
const B = "OPTION_B";
const C = "OPTION_C";
const D = "OPTION_D";
const E = "OPTION_E";

/* Qulaylik uchun: toʻgʻri variant kodini berib, roʻyxat tuziladi */
function opts(items: Array<[string, string]>, correct: string) {
  return items.map(([code, text]) => ({ code, text, isCorrect: code === correct }));
}

/* TZ'da oʻtish qoidasi faqat T-01 uchun yozilgan:
   "Kamida 2 ta javob toʻgʻri va critical savol toʻgʻri boʻlsa".
   T-02…T-04 uchun qoida koʻrsatilmagan — bir xil mantiq qoʻllanildi. */
const MINI_MIN_CORRECT = 2;

export const MINI_TESTS: MiniTest[] = [
  {
    code: "MINI_TEST_PLATFORM_MODEL",
    screenId: "MINI_TEST_PLATFORM_MODEL",
    title: "Mini Test 1: Platformaning ishlash tartibi",
    lesson: "PLATFORM_MODEL",
    minCorrect: MINI_MIN_CORRECT,
    questions: [
      {
        code: "MINI_PLATFORM_MODEL_Q1",
        text: "Onlayn Hamshira platformasining asosiy vazifasi nima?",
        topic: "platformaning ishlash modeli",
        explanation:
          "Onlayn Hamshira bemorlar va malakali tibbiyot mutaxassislarini yagona platformada birlashtiradi.",
        options: opts(
          [
            [A, "Faqat tibbiy mahsulotlarni sotish"],
            [B, "Bemorlar va tibbiyot mutaxassislarini birlashtirish"],
            [C, "Faqat shifoxonalarga reklama berish"],
            [D, "Tibbiyot mutaxassislariga diplom berish"],
          ],
          B,
        ),
      },
      {
        code: "MINI_PLATFORM_MODEL_Q2",
        text: "Mutaxassis buyurtmani qayerdan qabul qiladi?",
        topic: "platformaning ishlash modeli",
        explanation: "Buyurtmalar mutaxassis mobil ilovasi orqali koʻrsatiladi va boshqariladi.",
        options: opts(
          [
            [A, "Onlayn Hamshira Mutaxassis ilovasidan"],
            [B, "Faqat telefon qoʻngʻirogʻi orqali"],
            [C, "Instagram orqali"],
            [D, "Shifoxona kassasidan"],
            [E, "Telegram orqali"],
          ],
          A,
        ),
      },
      {
        code: "MINI_PLATFORM_MODEL_Q3",
        text: "Mutaxassis barcha turdagi tibbiy xizmatlarni koʻrsatishi mumkinmi?",
        topic: "platforma qoidalari",
        isCritical: true,
        options: opts(
          [
            [A, "Ha, istalgan xizmatni koʻrsatishi mumkin"],
            [B, "Faqat mijoz soʻrasa mumkin"],
            [C, "Faqat oʻz malakasi va vakolati doirasidagi xizmatlarni koʻrsatishi mumkin"],
            [D, "Faqat administrator telefon qilsa mumkin"],
          ],
          C,
        ),
      },
    ],
  },

  {
    code: "MINI_TEST_SPECIALIST_RESPONSIBILITIES",
    screenId: "MINI_TEST_SPECIALIST_RESPONSIBILITIES",
    title: "Mini Test 2: Mutaxassisning vazifalari",
    lesson: "SPECIALIST_RESPONSIBILITIES",
    minCorrect: MINI_MIN_CORRECT,
    questions: [
      {
        code: "MINI_RESPONSIBILITIES_Q1",
        text: "Buyurtmani qabul qilishdan oldin mutaxassis nima qilishi kerak?",
        topic: "mutaxassis vazifalari",
        options: opts(
          [
            [A, "Buyurtma tafsilotlarini oʻrganishi kerak"],
            [B, "Buyurtmani darhol qabul qilishi kerak"],
            [C, "Operatorga bogʻlanishi kerak"],
            [D, "Ilovani oʻchirishi kerak"],
          ],
          A,
        ),
      },
      {
        code: "MINI_RESPONSIBILITIES_Q2",
        text: "Buyurtmani qabul qilgandan keyin xizmatni bajara olmasangiz nima qilishingiz kerak?",
        topic: "mutaxassis vazifalari",
        options: opts(
          [
            [A, "Hech kimga xabar bermaslik"],
            [B, "Telefonni oʻchirib qoʻyish"],
            [C, "Buyurtmani ilova orqali bekor qilish, undan keyin mijoz va platforma administratorini xabardor qilish"],
            [D, "Buyurtmani yakunlangan deb belgilash"],
          ],
          C,
        ),
      },
      {
        code: "MINI_RESPONSIBILITIES_Q3",
        text: "Xizmat yakunlangandan keyin nima qilish kerak?",
        topic: "mutaxassis vazifalari",
        options: opts(
          [
            [A, "Buyurtmani mobil ilovada yakunlash"],
            [B, "Buyurtmani qayta qabul qilish"],
            [C, "Ilovani oʻchirish"],
            [D, "Yangi akkaunt yaratish"],
          ],
          A,
        ),
      },
    ],
  },

  {
    code: "MINI_TEST_CLIENT_COMMUNICATION",
    screenId: "MINI_TEST_CLIENT_COMMUNICATION",
    title: "Mini Test 3: Mijoz bilan muloqot",
    lesson: "CLIENT_COMMUNICATION",
    minCorrect: MINI_MIN_CORRECT,
    questions: [
      {
        code: "MINI_CLIENT_Q1",
        text: "Mijoz bilan birinchi marta bogʻlanganda nima qilish kerak?",
        topic: "mijoz bilan muloqot",
        options: opts(
          [
            [A, "Oʻzingizni tanishtirish va buyurtmani aniqlashtirish"],
            [B, "Darhol pul soʻrash"],
            [C, "Shaxsiy xizmatlaringizni reklama qilish"],
            [D, "Buyurtmani bekor qilish"],
          ],
          A,
        ),
      },
      {
        code: "MINI_CLIENT_Q2",
        text: "Mijozning tibbiy maʼlumotlarini boshqa shaxslarga berish mumkinmi?",
        topic: "maxfiylik",
        isCritical: true,
        options: opts(
          [
            [A, "Ha, istalgan vaqtda"],
            [B, "Faqat tanishlarga"],
            [C, "Yoʻq, mijoz maʼlumotlari maxfiy saqlanishi kerak"],
            [D, "Ijtimoiy tarmoqlarda joylashtirish mumkin"],
          ],
          C,
        ),
      },
      {
        code: "MINI_CLIENT_Q3",
        text: "Kechikish ehtimoli boʻlsa nima qilish kerak?",
        topic: "mijoz bilan muloqot",
        options: opts(
          [
            [A, "Hech kimga xabar bermaslik"],
            [B, "Mijozni oldindan xabardor qilish"],
            [C, "Buyurtmani yakunlash"],
            [D, "Telefonni oʻchirish"],
          ],
          B,
        ),
      },
    ],
  },

  {
    code: "MINI_TEST_INCOME_COMMISSION",
    screenId: "MINI_TEST_INCOME_COMMISSION",
    title: "Mini Test 4: Daromad va komissiya",
    lesson: "INCOME_COMMISSION",
    minCorrect: MINI_MIN_CORRECT,
    questions: [
      {
        code: "MINI_INCOME_Q1",
        text: "Yakunlangan buyurtmadan mutaxassisga qancha ulush ajratiladi?",
        topic: "daromad va komissiya",
        isCritical: true,
        options: opts([[A, "30%"], [B, "50%"], [C, "70%"], [D, "100%"]], C),
      },
      {
        code: "MINI_INCOME_Q2",
        text: "Platformaning komissiyasi qancha?",
        topic: "daromad va komissiya",
        options: opts([[A, "10%"], [B, "20%"], [C, "30%"], [D, "70%"]], C),
      },
      {
        code: "MINI_INCOME_Q3",
        text: "Komissiya qachon hisoblanadi?",
        topic: "daromad va komissiya",
        options: opts(
          [
            [A, "Foydalanuvchi roʻyxatdan oʻtganda"],
            [B, "Buyurtma yaratilganda"],
            [C, "Buyurtma muvaffaqiyatli yakunlanganda"],
            [D, "Ilova yuklab olinganda"],
          ],
          C,
        ),
      },
    ],
  },
];

export function miniTestForLesson(lessonCode: string): MiniTest | undefined {
  return MINI_TESTS.find((t) => t.lesson === lessonCode);
}

export function miniTestByCode(code: string): MiniTest | undefined {
  return MINI_TESTS.find((t) => t.code === code);
}

/* ─────────────────── Yakuniy test (T-05): 10 savol ─────────────────── */

export const FINAL_TEST_CODE = "EDUCATION_FINAL_TEST";

export const FINAL_TEST_QUESTIONS: TestQuestion[] = [
  {
    code: "FINAL_TEST_QUESTION_01",
    text: "Onlayn Hamshira platformasi kimlarni birlashtiradi?",
    topic: "platformaning ishlash modeli",
    options: opts(
      [
        [A, "Faqat shifoxonalarni"],
        [B, "Bemorlar va tibbiyot mutaxassislarini"],
        [C, "Faqat dorixonalarni"],
        [D, "Faqat sugʻurta kompaniyalarini"],
      ],
      B,
    ),
  },
  {
    code: "FINAL_TEST_QUESTION_02",
    text: "Mutaxassis buyurtmani qachon qabul qilishi kerak?",
    topic: "mutaxassis vazifalari",
    options: opts(
      [
        [A, "Buyurtma tafsilotlarini oʻrganib, xizmatni bajarish imkoniyatiga ega boʻlsa"],
        [B, "Har qanday holatda"],
        [C, "Faqat mijoz oldindan pul toʻlasa"],
        [D, "Buyurtma tafsilotlarini oʻqimasdan"],
      ],
      A,
    ),
  },
  {
    code: "FINAL_TEST_QUESTION_03",
    text: "Mutaxassisning asosiy daromad ulushi qancha?",
    topic: "daromad va komissiya",
    isCritical: true,
    options: opts([[A, "30%"], [B, "40%"], [C, "70%"], [D, "100%"]], C),
  },
  {
    code: "FINAL_TEST_QUESTION_04",
    text: "Mijozning shaxsiy va tibbiy maʼlumotlariga qanday munosabatda boʻlish kerak?",
    topic: "maxfiylik",
    isCritical: true,
    options: opts(
      [
        [A, "Ijtimoiy tarmoqlarda ulashish mumkin"],
        [B, "Maxfiy saqlash kerak"],
        [C, "Boshqa mijozlarga koʻrsatish mumkin"],
        [D, "Reklama uchun ishlatish mumkin"],
      ],
      B,
    ),
  },
  {
    code: "FINAL_TEST_QUESTION_05",
    text: "Mutaxassis qanday xizmatlarni koʻrsatishi mumkin?",
    topic: "platforma qoidalari",
    options: opts(
      [
        [A, "Istalgan xizmatni"],
        [B, "Faqat oʻz malakasi va vakolati doirasidagi xizmatlarni"],
        [C, "Mijoz soʻragan barcha xizmatlarni"],
        [D, "Hujjatsiz xizmatlarni"],
      ],
      B,
    ),
  },
  {
    code: "FINAL_TEST_QUESTION_06",
    text: "Xizmat vaqtida sanitariya talablariga rioya qilish kerakmi?",
    topic: "xizmat xavfsizligi",
    options: opts(
      [
        [A, "Faqat mijoz talab qilsa"],
        [B, "Faqat shifoxonada"],
        [C, "Ha, har bir xizmatda"],
        [D, "Shart emas"],
      ],
      C,
    ),
  },
  {
    code: "FINAL_TEST_QUESTION_07",
    text: "Kechikish ehtimoli yuzaga kelganda mutaxassis nima qilishi kerak?",
    topic: "mijoz bilan muloqot",
    options: opts(
      [
        [A, "Mijozni oldindan xabardor qilishi kerak"],
        [B, "Telefonni oʻchirishi kerak"],
        [C, "Buyurtmani yakunlangan deb belgilashi kerak"],
        [D, "Hech narsa qilmasligi kerak"],
      ],
      A,
    ),
  },
  {
    code: "FINAL_TEST_QUESTION_08",
    text: "Platforma orqali kelgan mijozni yashirin ravishda platformadan tashqariga olib chiqish mumkinmi?",
    topic: "platforma qoidalari",
    options: opts(
      [
        [A, "Ha"],
        [B, "Faqat birinchi buyurtmadan keyin"],
        [C, "Yoʻq"],
        [D, "Mijoz taklif qilsa mumkin"],
      ],
      C,
    ),
  },
  {
    code: "FINAL_TEST_QUESTION_09",
    text: "Buyurtma yakunlangandan keyin mutaxassis nima qilishi kerak?",
    topic: "mutaxassis vazifalari",
    options: opts(
      [
        [A, "Buyurtmani mobil ilovada yakunlashi kerak"],
        [B, "Buyurtmani oʻchirishi kerak"],
        [C, "Yangi akkaunt ochishi kerak"],
        [D, "Mijozning maʼlumotlarini tarqatishi kerak"],
      ],
      A,
    ),
  },
  {
    code: "FINAL_TEST_QUESTION_10",
    text: "Muammoli yoki nizoli vaziyat yuzaga kelsa nima qilish kerak?",
    topic: "platforma qoidalari",
    options: opts(
      [
        [A, "Mijoz bilan tortishish"],
        [B, "Buyurtmani tashlab ketish"],
        [C, "Platforma support xizmatiga murojaat qilish"],
        [D, "Ijtimoiy tarmoqqa joylashtirish"],
      ],
      C,
    ),
  },
];
