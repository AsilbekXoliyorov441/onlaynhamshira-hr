import type { LessonBlock } from "@/lib/onboarding/types";

/*
 * Dars mazmunini chizadi. Har blok turi TZ'dagi formatga mos:
 * matn, infografika (flow), raqamlangan roʻyxat, qoida kartochkalari,
 * belgilar roʻyxati, daromad taqsimoti, eslatma va ogohlantirish.
 */
export default function LessonBlocks({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <div className="mt-5 space-y-5">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: LessonBlock }) {
  switch (block.kind) {
    case "text":
      return <p className="text-[15.5px] leading-relaxed text-body">{block.text}</p>;

    case "flow":
      return (
        <ol className="space-y-0">
          {block.steps.map((step, i) => (
            <li key={step} className="relative flex gap-4 pb-5 last:pb-0">
              {i < block.steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[15px] top-[34px] h-[calc(100%-34px)] w-[2px] bg-[linear-gradient(180deg,#4FD189,rgba(79,209,137,0.25))]"
                />
              )}
              <span className="relative z-[1] grid h-[32px] w-[32px] shrink-0 place-items-center rounded-full bg-brand-500 font-display text-[14px] font-bold text-white">
                {i + 1}
              </span>
              <span className="pt-[5px] text-[15px] font-semibold leading-snug text-ink">{step}</span>
            </li>
          ))}
        </ol>
      );

    case "numbered":
      return (
        <ol className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-body">
              <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-brand-100 font-display text-[13px] font-bold text-brand-700">
                {i + 1}
              </span>
              <span className="pt-[2px]">{item}</span>
            </li>
          ))}
        </ol>
      );

    case "cards":
      return (
        <div className="space-y-2.5">
          {block.items.map((item, i) => (
            <div key={item.title} className="rounded-2xl border border-line bg-surface p-4">
              <p className="font-display text-[15.5px] font-bold text-ink">
                <span className="mr-1.5 text-brand-600">{i + 1}.</span>
                {item.title}
              </p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-body">{item.text}</p>
            </div>
          ))}
        </div>
      );

    case "bullets":
      return (
        <ul className="space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-body">
              <span aria-hidden className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-brand-500" />
              {item}
            </li>
          ))}
        </ul>
      );

    case "split":
      return (
        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="flex h-[14px] w-full overflow-hidden rounded-pill">
            <div
              className="bg-[linear-gradient(90deg,#4FD189,#1BA463)]"
              style={{ width: `${block.specialist}%` }}
            />
            <div className="bg-[color:var(--c-line)]" style={{ width: `${block.platform}%` }} />
          </div>
          <div className="mt-4 space-y-2.5">
            <p className="flex items-baseline justify-between gap-3">
              <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                <span aria-hidden className="h-[10px] w-[10px] rounded-full bg-brand-500" />
                Mutaxassisga
              </span>
              <span className="font-display text-[22px] font-extrabold text-brand-700">
                {block.specialist}%
              </span>
            </p>
            <p className="flex items-baseline justify-between gap-3">
              <span className="flex items-center gap-2 text-[15px] font-semibold text-body">
                <span aria-hidden className="h-[10px] w-[10px] rounded-full bg-[color:var(--c-line)]" />
                Platformaga
              </span>
              <span className="font-display text-[22px] font-extrabold text-mute">
                {block.platform}%
              </span>
            </p>
          </div>
        </div>
      );

    case "note":
      return (
        <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface-2 p-4">
          <span aria-hidden className="mt-[1px] shrink-0 text-[17px]">💡</span>
          <p className="text-[14.5px] leading-relaxed text-body">
            <span className="font-semibold text-ink">Muhim eslatma. </span>
            {block.text}
          </p>
        </div>
      );

    case "warning":
      return (
        <div className="flex items-start gap-3 rounded-2xl border border-[#F0C36D] bg-[#FFF8E8] p-4">
          <span aria-hidden className="mt-[1px] shrink-0 text-[17px]">⚠️</span>
          <p className="text-[14.5px] leading-relaxed text-[#7A5B14]">{block.text}</p>
        </div>
      );
  }
}
