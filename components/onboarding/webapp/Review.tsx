"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Shell from "./Shell";
import { Nav } from "./ui";
import { QUALIFICATION_QUESTIONS, QUALIFICATION_TOTAL } from "@/lib/onboarding/qualification";
import { ANSWER_LABELS, describeAnswer } from "@/lib/onboarding/describe";
import { completeQualification } from "@/lib/onboarding/api";
import { answerFor, loadSession, type Session } from "@/lib/onboarding/session";

/* Yon ustunda toʻliq savol matni emas, qisqa nom koʻrinadi */
const STEP_LABELS = QUALIFICATION_QUESTIONS.map((q) => ANSWER_LABELS[q.code]);

/* TZ Q-09: QUALIFICATION_REVIEW */
export default function Review() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const loaded = loadSession();
    if (loaded.status !== "IN_PROGRESS" || loaded.answers.length === 0) {
      router.replace("/hamkor/saralash");
      return;
    }
    setSession(loaded);
  }, [router]);

  const confirm = async () => {
    if (!session || busy) return;
    setBusy(true);
    await completeQualification(session);
    router.push("/hamkor/saralash/natija");
  };

  if (!session) {
    return (
      <div className="onboarding-bg grid min-h-screen place-items-center">
        <p className="text-[14px] text-mute">Yuklanmoqda…</p>
      </div>
    );
  }

  return (
    <Shell stage="Saralash" current={QUALIFICATION_TOTAL} total={QUALIFICATION_TOTAL} steps={STEP_LABELS}>
      <h1 className="font-display text-[24px] font-extrabold leading-snug text-ink sm:text-[27px] lg:text-[31px]">
        Javoblaringizni tekshiring
      </h1>
      <p className="mt-2.5 text-[14.5px] leading-relaxed text-body">
        Tasdiqlashdan oldin javoblaringizni koʻrib chiqing. Har qaysi bandni tahrirlashingiz mumkin.
      </p>

      <div className="mt-6 space-y-2.5">
        {QUALIFICATION_QUESTIONS.map((question) => {
          const answer = answerFor(session, question.code);
          const lines = answer ? describeAnswer(answer) : ["Javob berilmagan"];
          return (
            <div key={question.code} className="rounded-2xl border border-line bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold uppercase tracking-[0.06em] text-mute">
                    {ANSWER_LABELS[question.code]}
                  </p>
                  <div className="mt-1.5 space-y-1">
                    {lines.map((line) => (
                      <p key={line} className="text-[15px] font-semibold leading-snug text-ink">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => router.push(`/hamkor/saralash/${question.slug}`)}
                  className="shrink-0 rounded-pill border border-line px-3 py-1.5 text-[12.5px] font-semibold text-brand-700 transition-colors duration-200 hover:border-brand-400"
                >
                  Tahrirlash
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Nav
        backHref={`/hamkor/saralash/${QUALIFICATION_QUESTIONS[QUALIFICATION_TOTAL - 1].slug}`}
        onNext={confirm}
        nextLabel="Tasdiqlash va natijani koʻrish"
        nextDisabled={busy}
        backLabel="Ortga qaytish"
        disabledHint=""
      />
    </Shell>
  );
}
