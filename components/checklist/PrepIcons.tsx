import { icon } from "@/components/perf/IconImage";

/*
 * Tayyorgarlik roʻyxati ikonkalari.
 *
 * Rasmlarning oʻzi `PrepIcons.source.tsx` da chizilgan va
 * `npm run icons:svg` orqali `public/icons/` ga .svg fayl sifatida
 * chiqariladi. Bu yerda ular oddiy <img> sifatida ulanadi — chaqiruv
 * joylari oʻzgarmaydi.
 */

export type { IconProps } from "@/components/perf/IconImage";

export const Certificate3D = icon("/icons/prep-certificate-3d.svg", "Certificate3D");
export const Diploma3D = icon("/icons/prep-diploma-3d.svg", "Diploma3D");
export const Experience3D = icon("/icons/prep-experience-3d.svg", "Experience3D");
export const IdCard3D = icon("/icons/prep-id-card-3d.svg", "IdCard3D");
export const PhotoPortrait3D = icon("/icons/prep-photo-portrait-3d.svg", "PhotoPortrait3D");
export const SmartphoneWifi3D = icon("/icons/prep-smartphone-wifi-3d.svg", "SmartphoneWifi3D");
export const VideoRecord3D = icon("/icons/prep-video-record-3d.svg", "VideoRecord3D");
