import type { ReactNode } from "react";

export default function FloatingCard({
  icon,
  children,
  className = "",
  delay = "0s",
  duration = "6s",
}: {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  delay?: string;
  duration?: string;
}) {
  return (
    <div
      className={`absolute z-30 animate-floaty ${className}`}
      style={{ animationDelay: delay, animationDuration: duration }}
    >
      <div className="group flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/95 px-3 py-2.5 shadow-float backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-16px_rgba(11,43,28,0.28)]">
        <span className="btn-solid flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg text-white shadow-[0_4px_10px_-3px_rgba(23,164,104,0.55)] transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
        <p className="text-[11px] font-medium leading-[1.35] text-ink">
          {children}
        </p>
      </div>
    </div>
  );
}
