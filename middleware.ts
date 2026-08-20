import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n/config";

/*
 * Til marshrutlari.
 *
 * Ichkarida har bir sahifa til prefiksi bilan yashaydi (`/uz/...`,
 * `/ru/...`, `/cy/...`) — faqat shunda Next `app/[locale]/hamkor/[step]`
 * kabi ichki sahifalarga ruxsat beradi. (Avvalgi `[[...locale]]` catch-all
 * edi va ichki sahifa qoʻshilganda build "Catch-all must be the last part
 * of the URL" xatosi bilan toʻxtardi.)
 *
 * Foydalanuvchi koʻradigan manzil oʻzgarmaydi:
 *   /            -> ichkarida /uz          (rewrite, manzil satri oʻsha)
 *   /hamkor      -> ichkarida /uz/hamkor
 *   /ru, /cy     -> oʻz holicha
 *   /uz, /uz/... -> `/` ga qaytariladi (nusxa manzil paydo boʻlmasin)
 */
const PREFIXED = LOCALES.filter((l) => l !== DEFAULT_LOCALE);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* `/uz/...` — nusxa manzil. Doimiy (308) yoʻnaltirish bilan prefiksiz
     variantga qaytaramiz, shunda qidiruv tizimida ikkilanish boʻlmaydi. */
  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  /* Boshqa tillar oʻz prefiksi bilan ishlaydi */
  if (PREFIXED.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }

  /* Qolgani — standart til. Manzilni oʻzgartirmasdan ichkariga yoʻnaltiramiz. */
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  /* Statik fayllar, rasm optimizatsiyasi va API middleware'dan oʻtmaydi */
  matcher: ["/((?!_next/|icons/|api/|.*\\.[\\w]+$).*)"],
};
