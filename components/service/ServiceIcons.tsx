import { icon } from "@/components/perf/IconImage";

/*
 * "Mutaxassislar qanday xizmatlar koʻrsatadi?" boʻlimi ikonkalari.
 *
 * Rasmlarning oʻzi `ServiceIcons.source.tsx` da chizilgan va
 * `npm run icons:svg` orqali `public/icons/` ga .svg fayl sifatida
 * chiqariladi. Bu yerda ular oddiy <img> sifatida ulanadi — chaqiruv
 * joylari oʻzgarmaydi.
 */

export type { IconProps } from "@/components/perf/IconImage";

export const Bandage3D = icon("/icons/service-bandage-3d.svg", "Bandage3D");
export const BloodPressure3D = icon("/icons/service-blood-pressure-3d.svg", "BloodPressure3D");
export const CheckBadge3D = icon("/icons/service-check-badge-3d.svg", "CheckBadge3D");
export const HeartCare3D = icon("/icons/service-heart-care-3d.svg", "HeartCare3D");
export const IvDrip3D = icon("/icons/service-iv-drip-3d.svg", "IvDrip3D");
export const Massage3D = icon("/icons/service-massage-3d.svg", "Massage3D");
export const MedicalBag3D = icon("/icons/service-medical-bag-3d.svg", "MedicalBag3D");
export const Microscope3D = icon("/icons/service-microscope-3d.svg", "Microscope3D");
export const Prescription3D = icon("/icons/service-prescription-3d.svg", "Prescription3D");
export const SyringeVial3D = icon("/icons/service-syringe-vial-3d.svg", "SyringeVial3D");
