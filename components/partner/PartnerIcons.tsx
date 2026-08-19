import { icon } from "@/components/perf/IconImage";

/*
 * Hamkorlik jarayoni ikonkalari.
 *
 * Rasmlarning oʻzi `PartnerIcons.source.tsx` da chizilgan va
 * `npm run icons:svg` orqali `public/icons/` ga .svg fayl sifatida
 * chiqariladi. Bu yerda ular oddiy <img> sifatida ulanadi — chaqiruv
 * joylari oʻzgarmaydi.
 */

export type { IconProps } from "@/components/perf/IconImage";

export const AppLessonsIcon = icon("/icons/partner-app-lessons-icon.svg", "AppLessonsIcon");
export const EducationIcon = icon("/icons/partner-education-icon.svg", "EducationIcon");
export const IntroIcon = icon("/icons/partner-intro-icon.svg", "IntroIcon");
export const MotivationIcon = icon("/icons/partner-motivation-icon.svg", "MotivationIcon");
export const OrderIcon = icon("/icons/partner-order-icon.svg", "OrderIcon");
export const QualificationIcon = icon("/icons/partner-qualification-icon.svg", "QualificationIcon");
export const RegisterIcon = icon("/icons/partner-register-icon.svg", "RegisterIcon");
