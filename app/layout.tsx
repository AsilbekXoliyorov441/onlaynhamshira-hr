import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import PageLoadGate from "@/components/loading/PageLoadGate";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import SkipLink from "@/lib/i18n/SkipLink";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { uz } from "@/lib/i18n/dictionaries/uz";
import "./globals.css";

const display = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

/* Metadata server tomonda hosil boʻladi — u yerda tanlangan til hali
   maʼlum emas, shuning uchun standart til (oʻzbekcha) matni ishlatiladi. */
export const metadata: Metadata = {
  title: uz.meta.title,
  description: uz.meta.description,
};

/* Sahifa chizilishidan oldin ishlaydi — saqlangan tanlov `dark` boʻlsa
   sinf darhol qoʻyiladi va yorugʻ fon "chaqnab" ketmaydi.
   Hech narsa saqlanmagan boʻlsa standart holat — yorugʻ rejim. */
const themeBootstrap = `(function(){try{if(localStorage.getItem("theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="uz"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            {/* Klaviatura bilan yuruvchilar uchun — kontentga oʻtish havolasi */}
            <SkipLink />
            <PageLoadGate>{children}</PageLoadGate>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
