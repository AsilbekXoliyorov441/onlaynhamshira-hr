import type { CSSProperties } from "react";

export type IconProps = {
  className?: string;
  style?: CSSProperties;
};

/**
 * 3D ikonkalar HTML ichida inline SVG emas, alohida fayl sifatida keladi —
 * shunda sahifa DOM'i ~1400 elementga kichrayadi va React ularni hydrate
 * qilmaydi. Fayllar `scripts/gen-icon-svgs.mjs` orqali `*.source.tsx` dan
 * hosil qilinadi.
 *
 * `object-contain` — inline `<svg>` ning standart `preserveAspectRatio`
 * xatti-harakatini takrorlaydi, ya'ni nisbati boʻlmagan konteynerda ham
 * rasm choʻzilmaydi.
 */
export function icon(src: string, name: string) {
  function Icon({ className, style }: IconProps) {
    return (
      <img
        src={src}
        alt=""
        aria-hidden
        decoding="async"
        loading="lazy"
        draggable={false}
        className={className ? `object-contain ${className}` : "object-contain"}
        style={style}
      />
    );
  }
  Icon.displayName = name;
  return Icon;
}
