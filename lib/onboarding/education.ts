import type { Lesson, MiniTest, TestQuestion } from "./types";

/*
 * Education darslari va testlari — TZ "STAGE 3: EDUCATION VA MINI TEST".
 *
 * BR-E-012 / FR-E-012: taʼlim matnlari kodga qattiq biriktirilmasligi va
 * keyinchalik backend yoki CMS orqali boshqarilishi kerak. Shu sabab
 * butun mazmun shu yerda MAʼLUMOT sifatida turibdi — ekranlar uni faqat
 * chizadi. Backend tayyor boʻlganda `education-api.ts` shu tuzilmani
 * `GET /education/lessons/{code}` javobidan oladi, ekranlarga tegilmaydi.
 *
 * Imlo: TZ'da ikki joyda "undan kein" deb yozilgan (E-02 va T-02 dagi C
 * varianti) — foydalanuvchi koʻradigan matn boʻlgani uchun "undan keyin"
 * deb toʻgʻrilandi.
 */

/* TZ 6-boʻlim va FR-E-007: minimal oʻtish natijasi.
   E-06B ekranida "90%" deb yozilgan edi — bu TZ ichidagi ziddiyat,
   uch joyda takrorlangan 70% asos qilib olindi. Backend
   `mini_tests.passing_percentage` qiymatini qaytarganda shu son
   almashadi (education-api.ts). */
export const PASSING_PERCENTAGE = 70;

export const LESSONS: Lesson[] = [
  {
    code: "PLATFORM_MODEL",
    screenId: "EDUCATION_PLATFORM_MODEL",
    slug: "platforma-modeli",
    index: 1,
    shortTitle: "Platforma qanday ishlaydi",
    title: "Onlayn Hamshira qanday ishlaydi?",
    blocks: [
      { kind: "text", text: "Onlayn Hamshira bemorlar va malakali tibbiyot mutaxassislarini yagona platformada birlashtiradi." },
      { kind: "text", text: "Mijoz oʻziga kerakli tibbiy xizmatni tanlaydi va buyurtma beradi." },
      { kind: "text", text: "Platforma buyurtmani xizmat turi, hudud va boshqa mezonlar asosida mos mutaxassislarga koʻrsatadi." },
      { kind: "text", text: "Mutaxassis oʻziga mos buyurtmani qabul qiladi va mijoz manziliga borib xizmat koʻrsatadi." },
      { kind: "text", text: "Xizmat yakunlangandan keyin buyurtma mobil ilovada tugallangan deb belgilanadi." },
      {
        kind: "flow",
        steps: [
          "Mijoz xizmat tanlaydi",
          "Buyurtma yaratadi",
          "Buyurtma mutaxassisga koʻrsatiladi",
          "Mutaxassis buyurtmani qabul qiladi",
          "Mijoz manzilida xizmat koʻrsatiladi",
          "Buyurtma yakunlanadi",
        ],
      },
      { kind: "note", text: "Mutaxassis faqat oʻz bilim, malaka va vakolati doirasidagi xizmatlarni bajarishi mumkin." },
    ],
    confirmLabel: "Maʼlumot bilan tanishdim",
    nextLabel: "Mini Testga oʻtish",
  },

  {
    code: "SPECIALIST_RESPONSIBILITIES",
    screenId: "EDUCATION_SPECIALIST_RESPONSIBILITIES",
    slug: "vazifalar",
    index: 2,
    shortTitle: "Mutaxassisning vazifalari",
    title: "Mutaxassis sifatida asosiy vazifalaringiz",
    blocks: [
      { kind: "text", text: "Onlayn Hamshira mutaxassisi buyurtmani qabul qilganidan keyin xizmat jarayoniga masʼul hisoblanadi." },
      { kind: "text", text: "Mutaxassis quyidagi vazifalarni bajarishi kerak:" },
      {
        kind: "numbered",
        items: [
          "Buyurtma maʼlumotlarini diqqat bilan oʻrganish.",
          "Xizmat turi oʻz malakasiga mosligini tekshirish.",
          "Buyurtmani qabul qilgach albatta mijoz bilan bogʻlanib, buyurtmani aniqlashtirish.",
          "Belgilangan vaqtda mijoz manziliga yetib borish.",
          "Tibbiy va sanitariya talablariga rioya qilish.",
          "Xizmatni professional tarzda koʻrsatish.",
          "Buyurtma holatini mobil ilovada toʻgʻri yuritish.",
          "Xizmat yakunlangach, buyurtmani yakunlash.",
          "Muammo yuzaga kelganda support bilan bogʻlanish.",
        ],
      },
      {
        kind: "note",
        text: "Mutaxassis buyurtmani qabul qilgandan keyin asossiz ravishda bekor qilmasligi kerak. Agar xizmatni bajarishga toʻsqinlik qiladigan jiddiy sabab yuzaga kelsa, buyurtmani ilova orqali bekor qilishi, undan keyin mijoz va platforma administratori xabardor qilinishi kerak.",
      },
    ],
    confirmLabel: "Vazifalarimni tushundim",
    nextLabel: "Mini Testga oʻtish",
  },

  {
    code: "CLIENT_COMMUNICATION",
    screenId: "EDUCATION_CLIENT_COMMUNICATION",
    slug: "mijoz-bilan-ishlash",
    index: 3,
    shortTitle: "Mijoz bilan ishlash",
    title: "Mijoz bilan professional muloqot",
    blocks: [
      { kind: "text", text: "Mutaxassisning muomalasi platforma va mutaxassisning obroʻsiga bevosita taʼsir qiladi." },
      { kind: "text", text: "Har bir mijoz bilan hurmatli, xotirjam va professional tarzda muloqot qilish kerak." },
      {
        kind: "cards",
        items: [
          { title: "Oʻzingizni tanishtiring", text: "Mijoz bilan bogʻlanganda ismingiz va Onlayn Hamshira platformasi orqali buyurtmani qabul qilganingizni ayting." },
          { title: "Buyurtmani aniqlashtiring", text: "Xizmat turi, mijoz manzili, qulay vaqt va zarur sharoitlarni aniqlashtiring." },
          { title: "Belgilangan vaqtda boring", text: "Kechikish ehtimoli boʻlsa, mijozni oldindan xabardor qiling." },
          { title: "Hurmatli muloqot qiling", text: "Qoʻpol, kamsituvchi yoki nooʻrin munosabatga yoʻl qoʻyilmaydi." },
          { title: "Maxfiylikni saqlang", text: "Mijozning sogʻligʻi, manzili, telefon raqami va boshqa shaxsiy maʼlumotlari sir saqlanishi kerak." },
          { title: "Tibbiy tavsiya chegarasini biling", text: "Mutaxassis oʻz vakolatidan tashqaridagi tashxis yoki davolash tavsiyalarini bermasligi kerak." },
        ],
      },
      { kind: "warning", text: "Mijozning fotosurati, hujjatlari yoki tibbiy maʼlumotlarini uning ruxsatisiz ijtimoiy tarmoqlarda joylashtirish taqiqlanadi." },
    ],
    confirmLabel: "Mijoz bilan ishlash qoidalarini tushundim",
    nextLabel: "Mini Testga oʻtish",
  },

  {
    code: "INCOME_COMMISSION",
    screenId: "EDUCATION_INCOME_COMMISSION",
    slug: "daromad",
    index: 4,
    shortTitle: "Daromad va komissiya",
    title: "Daromad qanday taqsimlanadi?",
    blocks: [
      { kind: "text", text: "Onlayn Hamshira platformasida har bir muvaffaqiyatli yakunlangan buyurtmadan tushgan mablagʻ quyidagi tartibda taqsimlanadi:" },
      { kind: "split", specialist: 70, platform: 30 },
      { kind: "text", text: "Mutaxassis xizmatni bajarishi uchun buyurtma summasining 70 foizini oladi." },
      { kind: "text", text: "Platformaning 30 foizlik ulushi quyidagi yoʻnalishlarga sarflanadi:" },
      {
        kind: "bullets",
        items: [
          "mijozlarni jalb qilish;",
          "reklama va marketing;",
          "mobil ilova va platformani rivojlantirish;",
          "texnik xizmat;",
          "support xizmati;",
          "buyurtmalarni boshqarish;",
          "platforma xavfsizligi.",
        ],
      },
      { kind: "note", text: "Komissiya faqat yakunlangan buyurtmadan hisoblanadi. Mijoz xizmat haqini platformada belgilangan toʻlov tartibiga muvofiq amalga oshiradi." },
    ],
    confirmLabel: "Daromad taqsimotini tushundim",
    nextLabel: "Mini Testga oʻtish",
  },

  {
    code: "PLATFORM_RULES",
    screenId: "EDUCATION_PLATFORM_RULES",
    slug: "qoidalar",
    index: 5,
    shortTitle: "Muhim qoidalar",
    title: "Har bir mutaxassis rioya qilishi kerak boʻlgan qoidalar",
    blocks: [
      {
        kind: "cards",
        items: [
          { title: "Haqqoniy maʼlumot", text: "Profil va arizada koʻrsatilgan maʼlumotlar toʻgʻri boʻlishi kerak." },
          { title: "Faqat oʻz malakangiz doirasida ishlash", text: "Mutaxassis oʻz vakolati va malakasidan tashqaridagi tibbiy xizmatlarni bajarmasligi kerak." },
          { title: "Shifokor tavsiyasiga rioya qilish", text: "Shifokor tavsiyasi talab qilinadigan tibbiy muolajalar tegishli tavsiya yoki koʻrsatma asosida bajarilishi kerak." },
          { title: "Sanitariya va xavfsizlik", text: "Muolaja vaqtida qoʻl gigiyenasi, asboblar xavfsizligi va infeksiya nazorati qoidalariga rioya qilish kerak." },
          { title: "Mijoz maʼlumotlarining maxfiyligi", text: "Mijoz haqidagi maʼlumotlar uchinchi shaxslarga berilmasligi kerak." },
          { title: "Buyurtmani platformadan tashqariga olib chiqmaslik", text: "Platforma orqali kelgan mijoz bilan keyingi xizmatlarni yashirin ravishda platformadan tashqarida davom ettirish taqiqlanadi." },
          { title: "Professional xulq", text: "Mijozga hurmat bilan munosabatda boʻlish va nizoli vaziyatlarda support xizmatiga murojaat qilish kerak." },
          { title: "Buyurtma statuslarini toʻgʻri yuritish", text: "Buyurtmaning boshlanishi, davom etishi va yakunlanishi mobil ilovada toʻgʻri va oʻz vaqtida koʻrsatilishi kerak." },
        ],
      },
      { kind: "warning", text: "Platforma qoidalarini buzish mutaxassis akkauntining vaqtincha cheklanishi yoki butunlay bloklanishiga olib kelishi mumkin." },
    ],
    confirmLabel: "Platformaning asosiy qoidalarini qabul qilaman",
    nextLabel: "Yakuniy Mini Testni boshlash",
  },
];

export const LESSON_TOTAL = LESSONS.length;

export function lessonBySlug(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function lessonByCode(code: string): Lesson | undefined {
  return LESSONS.find((l) => l.code === code);
}

export function nextLesson(current: Lesson): Lesson | undefined {
  return LESSONS[current.index];
}
