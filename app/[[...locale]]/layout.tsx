import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import PageLoadGate from "@/components/loading/PageLoadGate";
import SkipLink from "@/lib/i18n/SkipLink";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import MotionProvider from "@/components/perf/MotionProvider";
import { getDictionary, localeFromSegments } from "@/lib/i18n/server";
/* Eslatma: uchala provider bitta layout chunk'iga tushadi (~22 KB gz).
   `next/dynamic` bilan ajratishga urinildi — Next baribir client
   komponentlarni layout chunk'iga qoʻshdi va ustiga lazy yuk qoʻshib,
   ball 73 dan 68 ga tushdi. Shu sabab oddiy statik import qoldirildi. */
import UZProvider from "@/lib/i18n/providers/UZProvider";
import RUProvider from "@/lib/i18n/providers/RUProvider";
import CYProvider from "@/lib/i18n/providers/CYProvider";
import { LOCALE_META, LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import "../globals.css";

/* Ogʻirliklar roʻyxati ataylab saqlangan: uni olib tashlab variable
   diapazonga (200-800) oʻtilganda sarlavhalar sal yengilroq chizildi,
   ya'ni koʻrinish oʻzgardi.

   Lotin va kirill subsetlari ataylab ajratilgan: lotin darhol preload
   qilinadi, kirill esa `preload: false` bilan faqat sahifada kirill harflar
   chizilganda (ya'ni ru/cy tili tanlanganda) yuklanadi. @font-face'dagi
   `unicode-range` buni brauzer darajasida hal qiladi, shu bois oʻzbekcha
   koʻrayotgan foydalanuvchi ortiqcha shrift yuklab olmaydi. */
const display = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const displayCyrillic = Manrope({
  subsets: ["cyrillic"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display-cyr",
  display: "swap",
  preload: false,
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const bodyCyrillic = Inter({
  subsets: ["cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-body-cyr",
  display: "swap",
  preload: false,
});

type LocaleParams = { params: { locale?: string[] } };

/* Metadata endi ochilgan sahifaning tiliga qarab hosil boʻladi.
   `alternates.languages` — qidiruv tizimiga qaysi til qaysi manzilda
   turishini bildiradi (hreflang). */
export function generateMetadata({ params }: LocaleParams): Metadata {
  const locale = localeFromSegments(params.locale);
  if (!locale) return {};
  const t = getDictionary(locale);

  /* `canonical` va `hreflang` faqat MUTLAQ manzil boʻlgandagina haqiqiy —
     nisbiy yozilsa qidiruv tizimlari ham, Lighthouse ham rad etadi.
     Domen `NEXT_PUBLIC_SITE_URL` da berilsa (masalan
     https://onlaynhamshira.uz) ular chiqariladi, berilmasa — umuman
     yozilmaydi, chunki notoʻgʻri canonical yoʻqidan yomonroq. */
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  const path = (l: (typeof LOCALES)[number]) => (l === DEFAULT_LOCALE ? "/" : `/${l}`);

  return {
    title: t.meta.title,
    description: t.meta.description,
    ...(site
      ? {
          metadataBase: new URL(site),
          alternates: {
            canonical: path(locale),
            languages: Object.fromEntries(
              LOCALES.map((l) => [LOCALE_META[l].htmlLang, path(l)]),
            ),
          },
        }
      : {}),
  };
}

/* Sahifa chizilishidan oldin ishlaydi — saqlangan tanlov `dark` boʻlsa
   sinf darhol qoʻyiladi va yorugʻ fon "chaqnab" ketmaydi.
   Hech narsa saqlanmagan boʻlsa standart holat — yorugʻ rejim. */
const themeBootstrap = `(function(){try{if(localStorage.getItem("theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})();`;

/* Yuklanish ekrani React'ga bogʻlanib qolmasligi kerak: agar u hydration'ni
   kutsa, sekin tarmoqda tayyor kontent bir necha soniya yopiq turadi va
   LCP shunga qarab jarima oladi. Shu bois scroll qulfi ham, oʻchish vaqti
   ham shu kichik inline skript orqali boshqariladi — u HTML kelishi bilan
   ishlaydi. Loader'ning oʻzi CSS animatsiyasi bilan soʻnadi. */
const GATE_MS = 1100;
/* Kuchsiz qurilmani sahifa chizilishidan oldin aniqlaymiz.
   Oʻrta/past darajali Android'larda sahifadagi ~40 ta cheksiz bezak
   animatsiyasi scroll'ni uzuq-yuluq qiladi (oʻlchov: ular scroll paytidagi
   Style/Layout ishining 94% ini tashkil qiladi). Bunday qurilmalarda faqat
   ambient (bezak) halqalar oʻchadi — matn, tuzilma, kirish animatsiyalari
   va hover effektlari oʻz joyida qoladi. */
const lowPowerBootstrap = `(function(){try{var n=navigator,m=n.deviceMemory||8,c=n.hardwareConcurrency||8;if(m<=4||c<=4){document.documentElement.classList.add("low-power")}}catch(e){}})();`;

const gateBootstrap = `(function(){var d=document.documentElement;d.classList.add("oh-loading");setTimeout(function(){d.classList.remove("oh-loading")},${GATE_MS})})();`;

export default function RootLayout({
  children,
  params,
}: { children: React.ReactNode } & LocaleParams) {
  const locale = localeFromSegments(params.locale);
  if (!locale) notFound();
  /* Faqat shu tilning provider'i chiziladi — qolgan tillarning chunk'i
     brauzerga umuman yuklanmaydi */
  const Language = locale === "ru" ? RUProvider : locale === "cy" ? CYProvider : UZProvider;

  return (
    <html
      lang={LOCALE_META[locale].htmlLang}
      className={`${display.variable} ${displayCyrillic.variable} ${body.variable} ${bodyCyrillic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap + lowPowerBootstrap + gateBootstrap }} />
      </head>
      <body>
        <ThemeProvider>
          <Language>
            <MotionProvider>
              {/* Klaviatura bilan yuruvchilar uchun — kontentga oʻtish havolasi */}
              <SkipLink />
              <PageLoadGate>{children}</PageLoadGate>
            </MotionProvider>
          </Language>
        </ThemeProvider>
      </body>
    </html>
  );
}
