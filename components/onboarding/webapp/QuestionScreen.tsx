"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Shell from "./Shell";
import RegionPicker from "./RegionPicker";
import { Choice, Nav, Notice } from "./ui";
import { QUALIFICATION_QUESTIONS, QUALIFICATION_TOTAL, PARTNERSHIP_TERMS, nextQuestion, previousQuestion } from "@/lib/onboarding/qualification";
import { ANSWER_LABELS } from "@/lib/onboarding/describe";
import { saveAnswer } from "@/lib/onboarding/api";
import { answerFor, loadSession, putAnswer, saveSession, type Session } from "@/lib/onboarding/session";
import type { Answer, Option, Question, RegionSelection } from "@/lib/onboarding/types";

/* Yon ustunda toʻliq savol matni emas, qisqa nom koʻrinadi */
const STEP_LABELS = QUALIFICATION_QUESTIONS.map((q) => ANSWER_LABELS[q.code]);

export default function QuestionScreen({ question }: { question: Question }) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  /* Tanlangan javob(lar) */
  const [selected, setSelected] = useState<string[]>([]);
  const [freeText, setFreeText] = useState("");
  const [subAnswer, setSubAnswer] = useState<string | null>(null);
  const [regions, setRegions] = useState<RegionSelection[]>([]);
  const [saving, setSaving] = useState(false);

  /* Draftni saqlash uchun: sessiyaning eng soʻnggi nusxasi.
     `state` emas, `ref` — chunki saqlash effekti qayta render
     chaqirmasligi kerak, aks holda cheksiz aylanish boʻladi. */
  const sessionRef = useRef<Session | null>(null);
  const hydrated = useRef(false);

  /* Sessiyani tiklash — BR-Q-004 */
  useEffect(() => {
    hydrated.current = false;
    const loaded = loadSession();
    if (loaded.status !== "IN_PROGRESS") {
      router.replace("/hamkor/saralash");
      return;
    }
    setSession(loaded);
    sessionRef.current = loaded;

    const previous = answerFor(loaded, question.code);
    if (previous) {
      setSelected(Array.isArray(previous.answer) ? previous.answer : previous.answer ? [previous.answer] : []);
      setFreeText(previous.answer_text ?? "");
      setSubAnswer(previous.sub_answer ?? null);
      setRegions(previous.regions ?? []);
    }
    /* Joriy savolni belgilab qoʻyamiz — qaytib kelganda shu yerdan davom etadi */
    const marked = { ...loaded, currentQuestionCode: question.code };
    saveSession(marked);
    sessionRef.current = marked;
    hydrated.current = true;
  }, [question.code, router]);

  const multi = question.kind === "multi" || question.kind === "consent";

  /* Tanlangan zahoti saqlaymiz — "Keyingi" bosilmasa ham. Foydalanuvchi
     brauzerni yopib ketsa yoki telefonga qoʻngʻiroq kelsa, javob
     yoʻqolmaydi va qaytganda oʻsha holida turadi. */
  useEffect(() => {
    const current = sessionRef.current;
    if (!hydrated.current || !current) return;

    const filled =
      selected.length > 0 ||
      regions.length > 0 ||
      Boolean(subAnswer) ||
      freeText.trim().length > 0;
    if (!filled) return;

    sessionRef.current = putAnswer(current, {
      question_code: question.code,
      answer: multi ? selected : selected[0] ?? "",
      ...(freeText.trim() ? { answer_text: freeText.trim() } : {}),
      ...(subAnswer ? { sub_answer: subAnswer } : {}),
      ...(question.kind === "region" ? { regions } : {}),
    });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [selected, freeText, subAnswer, regions]);

  const toggle = (code: string) => {
    setSelected((prev) =>
      multi ? (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]) : [code],
    );
  };

  /* "Boshqa" kabi variant tanlanganda ochiladigan matn maydoni */
  const textOption: Option | undefined = useMemo(
    () => question.options?.find((o) => o.freeText && selected.includes(o.code)),
    [question.options, selected],
  );

  /* Tanlangan variantlardan ogohlantirish (masalan Q-06 "Yoʻq") */
  const warning = useMemo(() => {
    const fromSub = question.sub?.options.find((o) => o.code === subAnswer)?.warning;
    const fromMain = question.options?.find((o) => selected.includes(o.code))?.warning;
    return fromSub ?? fromMain;
  }, [question, selected, subAnswer]);

  /* BR-Q-002: majburiy javobsiz "Keyingi" faol boʻlmaydi */
  const valid = useMemo(() => {
    if (question.kind === "region") {
      const hasDistrict = regions.some((r) => r.district_codes.length > 0);
      return hasDistrict && (!question.sub?.required || Boolean(subAnswer));
    }
    if (question.kind === "consent") {
      return (question.requiredOptions ?? []).every((c) => selected.includes(c));
    }
    if (selected.length === 0) return false;
    if (textOption) {
      const len = freeText.trim().length;
      if (len < textOption.freeText!.minLength || len > textOption.freeText!.maxLength) return false;
    }
    if (question.sub?.required && !subAnswer) return false;
    return true;
  }, [question, selected, regions, subAnswer, textOption, freeText]);

  const buildAnswer = (): Answer => ({
    question_code: question.code,
    answer: multi ? selected : selected[0] ?? "",
    ...(textOption ? { answer_text: freeText.trim() } : {}),
    ...(subAnswer ? { sub_answer: subAnswer } : {}),
    ...(question.kind === "region" ? { regions } : {}),
  });

  /* Darhol rad etish (tanlangan qaror: mos kelmagan javobda toʻxtatiladi) */
  const rejection = useMemo(() => {
    const all: Option[] = [
      ...(question.options?.filter((o) => selected.includes(o.code)) ?? []),
      ...(question.sub?.options.filter((o) => o.code === subAnswer) ?? []),
    ];
    const rejected = all.find((o) => o.eligibility.kind === "rejected");
    if (rejected && rejected.eligibility.kind === "rejected") return rejected.eligibility.code;

    if (multi && question.missingRequired?.kind === "rejected") {
      const missing = (question.requiredOptions ?? []).filter((c) => !selected.includes(c));
      if (missing.length > 0) return question.missingRequired.code;
    }
    return null;
  }, [question, selected, subAnswer, multi]);

  const onNext = async () => {
    if (!session || !valid || saving) return;
    setSaving(true);
    const updated = await saveAnswer(session, buildAnswer());
    setSession(updated);

    if (rejection) {
      /* BR-Q-007: kod manzilda emas, sessiyada */
      saveSession({ ...updated, rejectionCode: rejection });
      router.push("/hamkor/saralash/natija");
      return;
    }
    /* Avval rad etilgan boʻlsa va javob toʻgʻrilangan boʻlsa — eski
       sababni tozalaymiz, aks holda natija ekrani eskisini koʻrsatadi */
    if (updated.rejectionCode) saveSession({ ...updated, rejectionCode: null });

    const next = nextQuestion(question);
    router.push(next ? `/hamkor/saralash/${next.slug}` : "/hamkor/saralash/tekshirish");
  };

  const previous = previousQuestion(question);
  const backHref = previous ? `/hamkor/saralash/${previous.slug}` : "/hamkor/saralash";

  if (!session) {
    return (
      <div className="onboarding-bg grid min-h-screen place-items-center">
        <p className="text-[14px] text-mute">Yuklanmoqda…</p>
      </div>
    );
  }

  return (
    <Shell stage="Qualification" current={question.index} total={QUALIFICATION_TOTAL} steps={STEP_LABELS}>
      <h1 className="font-display text-[22px] font-extrabold leading-snug text-ink sm:text-[25px] lg:text-[29px]">
        {question.title}
      </h1>
      {question.note && <p className="mt-2.5 text-[14.5px] leading-relaxed text-body">{question.note}</p>}

      {question.kind === "consent" && (
        <ul className="mt-5 space-y-2 rounded-2xl border border-line bg-surface-2 p-4">
          {PARTNERSHIP_TERMS.map((t) => (
            <li key={t} className="flex gap-2.5 text-[14px] leading-relaxed text-body">
              <span aria-hidden className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-brand-500" />
              {t}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 space-y-2.5" role={multi ? "group" : "radiogroup"}>
        {question.kind === "region" ? (
          <RegionPicker value={regions} onChange={setRegions} />
        ) : (
          question.options?.map((option) => (
            <Choice
              key={option.code}
              label={option.label}
              hint={option.hint}
              multi={multi}
              selected={selected.includes(option.code)}
              onSelect={() => toggle(option.code)}
            >
              {option.freeText && selected.includes(option.code) && (
                <input
                  autoFocus
                  value={freeText}
                  onChange={(e) => setFreeText(e.target.value)}
                  placeholder={option.freeText.placeholder}
                  maxLength={option.freeText.maxLength}
                  className="mt-2 w-full rounded-2xl border border-line bg-surface px-4 py-3 text-[15px] text-ink outline-none transition-colors duration-200 placeholder:text-mute focus:border-brand-400"
                />
              )}
            </Choice>
          ))
        )}
      </div>

      {question.sub && (
        <div className="mt-8">
          <h2 className="font-display text-[17px] font-bold leading-snug text-ink">{question.sub.title}</h2>
          <div className="mt-3 space-y-2.5" role="radiogroup">
            {question.sub.options.map((option) => (
              <Choice
                key={option.code}
                label={option.label}
                hint={option.hint}
                selected={subAnswer === option.code}
                onSelect={() => setSubAnswer(option.code)}
              />
            ))}
          </div>
        </div>
      )}

      {warning && <Notice tone="warn">{warning}</Notice>}

      {/* TZ Q-08: oxirgi savolda tugma matni "Javoblarni tekshirish" */}
      <Nav
        backHref={backHref}
        onNext={onNext}
        nextLabel={question.kind === "consent" ? "Javoblarni tekshirish" : "Keyingi"}
        nextDisabled={!valid || saving}
      />
    </Shell>
  );
}
