"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import Shell from "./Shell";
import { Nav } from "./ui";
import { ONBOARDING_STAGES, ONBOARDING_TOTAL } from "@/lib/onboarding/stages";

/*
 * 1–4 bosqichlar uchun umumiy ramka (Welcome, Platforma, Hamkorlik,
 * Talablar). Ular faqat matn koʻrsatadi — javob soʻralmaydi, shu bois
 * "Keyingi" doim faol.
 */
export default function InfoScreen({
  stageIndex,
  title,
  lead,
  backHref,
  nextHref,
  nextLabel = "Davom etish",
  children,
}: {
  stageIndex: number;
  title: string;
  lead?: string;
  backHref: string;
  nextHref: string;
  nextLabel?: string;
  children?: ReactNode;
}) {
  const router = useRouter();

  return (
    <Shell
      stage={ONBOARDING_STAGES[stageIndex - 1]}
      current={stageIndex}
      total={ONBOARDING_TOTAL}
      steps={ONBOARDING_STAGES}
      unit="bosqich"
    >
      <h1 className="font-display text-[26px] font-extrabold leading-[1.18] tracking-[-0.02em] text-ink sm:text-[30px] lg:text-[34px]">
        {title}
      </h1>
      {lead && <p className="mt-4 text-[15.5px] leading-relaxed text-body">{lead}</p>}
      {children}
      <Nav backHref={backHref} onNext={() => router.push(nextHref)} nextLabel={nextLabel} />
    </Shell>
  );
}
