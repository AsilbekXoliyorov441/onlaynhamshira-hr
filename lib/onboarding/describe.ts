import { questionByCode } from "./qualification";
import { districtName, regionByCode } from "./regions";
import type { Answer } from "./types";

/*
 * Javobni Q-09 (Javoblarni tekshirish) ekranida koʻrsatish uchun
 * odam oʻqiy oladigan matnga aylantiradi.
 */
export function describeAnswer(answer: Answer): string[] {
  const question = questionByCode(answer.question_code);
  if (!question) return [];

  const lines: string[] = [];
  const codes = Array.isArray(answer.answer) ? answer.answer : answer.answer ? [answer.answer] : [];

  if (question.kind === "region") {
    for (const sel of answer.regions ?? []) {
      const region = regionByCode(sel.region_code);
      const districts = sel.district_codes.map((d) => districtName(sel.region_code, d)).join(", ");
      lines.push(`${region?.name ?? sel.region_code}: ${districts}`);
    }
    if (lines.length === 0) lines.push("Tanlanmagan");
  } else {
    for (const code of codes) {
      const option = question.options?.find((o) => o.code === code);
      if (!option) continue;
      lines.push(option.freeText && answer.answer_text ? `${option.label} — ${answer.answer_text}` : option.label);
    }
    if (lines.length === 0) lines.push("Tanlanmagan");
  }

  if (answer.sub_answer && question.sub) {
    const option = question.sub.options.find((o) => o.code === answer.sub_answer);
    if (option) lines.push(`${question.sub.title} ${option.label}`);
  }

  return lines;
}

/** Q-09 dagi blok sarlavhalari */
export const ANSWER_LABELS: Record<string, string> = {
  SPECIALITY: "Mutaxassislik",
  EDUCATION: "Tibbiy maʼlumot",
  DIPLOMA: "Diplom holati",
  EXPERIENCE: "Ish tajribasi",
  CATEGORY: "Malaka toifasi",
  REGION: "Faoliyat hududi",
  DEVICE: "Smartfon va internet",
  TERMS: "Hamkorlik shartlariga rozilik",
};

/* Q-10C: "Administrator bilan bogʻlanish" — footer'dagi rasmiy kanal */
export const SUPPORT_CONTACT = {
  label: "Administrator bilan bogʻlanish",
  href: "https://t.me/Onlayn_Hamshira_Admin",
};

/*
 * BR-Q-010: "Qualification qayta topshirilishi administrator ruxsati
 * yoki belgilangan muddatdan keyin mavjud boʻladi." Muddat TZ'da
 * koʻrsatilmagan, shu bois ekranda ham aniq son yozilmaydi.
 */
export const RETRY_NOTE =
  "Qayta topshirish administrator ruxsati yoki belgilangan muddatdan keyin mumkin boʻladi.";
