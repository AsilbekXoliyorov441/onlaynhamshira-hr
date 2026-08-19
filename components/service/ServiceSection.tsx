"use client";

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type SVGProps,
} from "react";
import Reveal from "../Reveal";
import { useT } from "@/lib/i18n/LanguageProvider";
import { HeartPlus3D, Stethoscope3D, DashedLinks } from "../Decor";
import {
  SyringeVial3D,
  IvDrip3D,
  HeartCare3D,
  Bandage3D,
  BloodPressure3D,
  Prescription3D,
  Massage3D,
  MedicalBag3D,
  CheckBadge3D,
  Microscope3D,
} from "./ServiceIcons";

/** Matnlar lugʻatdan (t.service.items) shu tartibda olinadi */
type Service = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Kartochka ostidagi "aura" rangi — ikonka bilan uygʻun */
  glow: string;
};

const SERVICES: Service[] = [
  {
    icon: SyringeVial3D,
    glow: "rgba(240,80,126,0.30)",
  },
  {
    icon: IvDrip3D,
    glow: "rgba(27,146,201,0.30)",
  },
  {
    icon: Bandage3D,
    glow: "rgba(233,162,119,0.32)",
  },
  {
    icon: HeartCare3D,
    glow: "rgba(246,90,114,0.30)",
  },
  {
    icon: BloodPressure3D,
    glow: "rgba(44,193,118,0.32)",
  },
  {
    icon: Prescription3D,
    glow: "rgba(79,209,137,0.32)",
  },
  {
    icon: Massage3D,
    glow: "rgba(233,162,119,0.30)",
  },
  {
    icon: MedicalBag3D,
    glow: "rgba(23,164,104,0.30)",
  },
];


/** Bitta "toʻplam"dagi xizmatlar soni */
const N = SERVICES.length;

/**
 * Cheksiz aylanish uchun roʻyxat uch marta takrorlanadi: [A][B][C].
 * Foydalanuvchi doim oʻrtadagi nusxada turadi; chetga chiqib qolsa,
 * surish toʻxtagan payt `scrollLeft` bitta toʻplam eniga sezilmas
 * tarzda koʻchiriladi (kontent bir xil boʻlgani uchun koʻzga tashlanmaydi).
 */
const COPIES = [0, 1, 2];

/** Autoplay qadamlari orasidagi tanaffus */
const AUTOPLAY_MS = 4000;

/*
 * Karusel — tashqi kutubxonasiz (Swiper/Embla shart emas).
 *
 * Surish butunlay brauzerning oʻz `scroll-snap` mexanizmida ketadi: bu
 * kompozitor oqimida bajariladi, JS har kadrda transform hisoblamaydi —
 * shuning uchun qotib qolish (jank) boʻlmaydi va bundle ham oʻsmaydi.
 *
 * JS faqat quyidagilarni qiladi:
 *  1) qaysi kartochka markazda ekanini aniqlaydi (rAF bilan bir marta,
 *     oldindan oʻlchab qoʻyilgan koordinatalar asosida — scroll paytida
 *     layout oʻqilmaydi, ya'ni "layout thrashing" yoʻq);
 *  2) surish toʻxtagach, kerak boʻlsa, halqani "oʻrash" (loop);
 *  3) autoplay va strelka/nuqta bosilganda `scrollTo`ni chaqiradi.
 */
export default function ServiceSection() {
  const t = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  /** Kartochkalarning oldindan oʻlchangan joylashuvi — scroll paytida qayta oʻlchanmaydi */
  const metricsRef = useRef<{
    items: Array<{ center: number }>;
    viewport: number;
    setWidth: number;
  }>({ items: [], viewport: 0, setWidth: 0 });
  /** Uch karra roʻyxatdagi joriy indeks (render'ga taʼsir qilmaydi — shuning uchun ref) */
  const trackIndexRef = useRef(N);
  const settleRef = useRef(0);
  const initedRef = useRef(false);

  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(false);
  /** Boʻlim ekrandan chiqqanda bezak animatsiyalari va autoplay toʻxtaydi */
  const [inView, setInView] = useState(false);
  /** Sichqoncha ustida yoki barmoq bilan surilayotganda autoplay pauzada */
  const [paused, setPaused] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  /* ── Oʻlchash: faqat mount va oʻlcham oʻzgarganda ── */
  const measure = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const items = Array.from(scroller.children).map((node) => {
      const el = node as HTMLElement;
      return { center: el.offsetLeft + el.offsetWidth / 2 };
    });

    metricsRef.current = {
      items,
      viewport: scroller.clientWidth,
      setWidth: items.length > N ? items[N].center - items[0].center : 0,
    };
  }, []);

  /** Markazga eng yaqin kartochkani tanlaydi — faqat keshlangan raqamlar bilan */
  const pickActive = useCallback(() => {
    const scroller = scrollerRef.current;
    const { items, viewport } = metricsRef.current;
    if (!scroller || !items.length) return;

    const center = scroller.scrollLeft + viewport / 2;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < items.length; i++) {
      const dist = Math.abs(items[i].center - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }

    trackIndexRef.current = best;
    const real = ((best % N) + N) % N;
    setActive((prev) => (prev === real ? prev : real));
  }, []);

  const goToTrack = useCallback((index: number, smooth: boolean) => {
    const scroller = scrollerRef.current;
    const { items, viewport } = metricsRef.current;
    if (!scroller || !items.length) return;

    const clamped = Math.max(0, Math.min(items.length - 1, index));
    const left = Math.max(
      0,
      Math.min(scroller.scrollWidth - viewport, items[clamped].center - viewport / 2)
    );
    scroller.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
  }, []);

  /** Halqani "oʻrash" — faqat surish toʻxtagach, shuning uchun sakrash koʻrinmaydi */
  const normalize = useCallback(() => {
    const scroller = scrollerRef.current;
    const { setWidth } = metricsRef.current;
    if (!scroller || !setWidth) return;

    const index = trackIndexRef.current;
    if (index < N) scroller.scrollLeft += setWidth;
    else if (index >= 2 * N) scroller.scrollLeft -= setWidth;
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const sync = () => {
      measure();
      // Boshida oʻrtadagi nusxaning birinchi kartochkasiga turamiz
      goToTrack(initedRef.current ? trackIndexRef.current : N, false);
      initedRef.current = true;
      pickActive();
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(scroller);
    return () => observer.disconnect();
  }, [measure, pickActive, goToTrack]);

  /* ── Scroll: rAF bilan cheklangan, passiv ── */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        pickActive();
        window.clearTimeout(settleRef.current);
        settleRef.current = window.setTimeout(normalize, 160);
      });
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(settleRef.current);
      scroller.removeEventListener("scroll", onScroll);
    };
  }, [pickActive, normalize]);

  /* ── Koʻrinish kuzatuvchisi: kirish animatsiyasi, autoplay va bezaklar ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setShown(true);
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── Autoplay ── */
  useEffect(() => {
    if (reduceMotion || paused || !inView) return;

    const id = window.setInterval(() => {
      if (document.hidden) return;
      goToTrack(trackIndexRef.current + 1, true);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [reduceMotion, paused, inView, goToTrack]);

  const step = useCallback(
    (dir: -1 | 1) => goToTrack(trackIndexRef.current + dir, !reduceMotion),
    [goToTrack, reduceMotion]
  );

  /** Nuqtalar: joriy nusxa ichidagi mos kartochkaga oʻtadi */
  const goToService = useCallback(
    (index: number) => {
      const base = Math.floor(trackIndexRef.current / N) * N;
      goToTrack(base + index, !reduceMotion);
    },
    [goToTrack, reduceMotion]
  );

  const decorStyle = useCallback(
    (delay?: string, duration?: string): CSSProperties => ({
      animationPlayState: inView ? "running" : "paused",
      animationDelay: delay,
      animationDuration: duration,
    }),
    [inView]
  );

  return (
    <section
      ref={sectionRef}
      id="xizmatlar"
      className="scroll-mt-24 relative isolate overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* ===== Fon: oldingi boʻlimdan davom etuvchi yashil-moviy nur =====
          Barchasi statik qatlam — bir marta rasterlanadi, scroll paytida
          qayta hisoblanmaydi */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-page" />
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute -left-[12%] top-[6%] -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(79,209,137,0.52),rgba(79,209,137,0)_70%)]"
      />
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute -right-[10%] top-[2%] -z-10 h-[480px] w-[480px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(31,182,232,0.34),rgba(31,182,232,0)_70%)]"
      />
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute bottom-[-12%] left-[24%] -z-10 h-[520px] w-[620px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(44,193,118,0.42),rgba(44,193,118,0)_72%)]"
      />
      <div
        aria-hidden
        className="decor-glow pointer-events-none absolute bottom-[8%] right-[8%] -z-10 h-[320px] w-[320px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(190,230,60,0.24),rgba(190,230,60,0)_70%)]"
      />

      {/* ===== Dekor: 3D elementlar ===== */}
      <Stethoscope3D
        aria-hidden
        style={decorStyle()}
        className="pointer-events-none absolute left-[3%] top-[8%] -z-10 hidden w-[104px] animate-drift opacity-90 lg:block xl:w-[124px]"
      />
      <HeartPlus3D
        aria-hidden
        style={decorStyle()}
        className="pointer-events-none absolute right-[6%] top-[6%] -z-10 hidden w-[92px] animate-floaty lg:block xl:w-[110px]"
      />
      <Microscope3D
        aria-hidden
        style={decorStyle("1.4s")}
        className="pointer-events-none absolute bottom-[6%] right-[3%] -z-10 hidden w-[96px] animate-floaty opacity-95 xl:block"
      />
      <DashedLinks
        aria-hidden
        className="pointer-events-none absolute left-[10%] top-[10%] -z-10 hidden w-[280px] opacity-70 xl:block"
      />

      {/* Shisha "plitkalar" — chuqurlik uchun */}
      <div
        aria-hidden
        style={decorStyle("0.8s")}
        className="glass-panel pointer-events-none absolute right-[13%] top-[26%] -z-10 hidden h-14 w-14 rotate-12 animate-floaty rounded-[18px] lg:block"
      />
      <div
        aria-hidden
        style={decorStyle("2.1s")}
        className="glass-panel pointer-events-none absolute bottom-[22%] left-[8%] -z-10 hidden h-10 w-10 -rotate-12 animate-floaty rounded-[14px] lg:block"
      />

      {/* Suyuq tomchilar */}
      <div
        aria-hidden
        style={decorStyle(undefined, "5.5s")}
        className="decor-glow pointer-events-none absolute left-[18%] top-[18%] -z-10 hidden h-4 w-4 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.9)_0%,rgba(190,230,60,0.5)_38%,rgba(79,209,137,0.6)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.16)] sm:block"
      />
      <div
        aria-hidden
        style={decorStyle("1.9s", "6.5s")}
        className="decor-glow pointer-events-none absolute bottom-[16%] right-[20%] -z-10 hidden h-5 w-5 animate-liquid rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.88)_0%,rgba(143,233,247,0.5)_38%,rgba(27,146,201,0.5)_78%)] shadow-[0_3px_8px_rgba(11,43,28,0.14)] sm:block"
      />

      {/* Yuqori/pastki chetlarni bazaviy rangga tekislaydi — qoʻshni boʻlimlar bilan
          qattiq chiziqsiz tutashishi uchun */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[220px] fade-top sm:h-[320px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[200px] fade-bottom sm:h-[300px]"
      />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        {/* ===== Sarlavha ===== */}
        <Reveal className="relative mx-auto max-w-[820px] text-center">
          <div
            aria-hidden
            className="hero-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[190px] w-[560px] max-w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          />
          <h2 className="font-display text-[27px] font-extrabold leading-[1.18] tracking-[-0.015em] text-ink sm:text-[36px] lg:text-[44px]">
            {t.service.title}{" "}
            <span className="whitespace-nowrap">{t.service.titleTail}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[620px] text-[14px] leading-[1.6] text-body sm:mt-4 sm:text-[15.5px]">
            {t.service.desc}
          </p>
        </Reveal>

        {/* ===== Karusel ===== */}
        <div
          className="relative mt-6 sm:mt-8"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onPointerDown={() => setPaused(true)}
          onPointerUp={(e) => {
            if (e.pointerType !== "mouse") setPaused(false);
          }}
          onPointerCancel={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <NavButton
            side="left"
            onClick={() => step(-1)}
            prevLabel={t.service.prev}
            nextLabel={t.service.next}
          />
          <NavButton
            side="right"
            onClick={() => step(1)}
            prevLabel={t.service.prev}
            nextLabel={t.service.next}
          />

          {/*
            Vertikal `padding` ataylab kengaytirilgan: `overflow-x` qoʻyilganda
            brauzer vertikal oʻqni ham qirqadi, shuning uchun kartochkaning
            soyasi, aurasi va hover'dagi koʻtarilishi shu boʻshliqqa sigʻishi kerak.
          */}
          <div
            ref={scrollerRef}
            role="group"
            aria-roledescription="karusel"
            aria-label={t.service.carouselLabel}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                step(-1);
              } else if (e.key === "ArrowRight") {
                e.preventDefault();
                step(1);
              }
            }}
            className="no-scrollbar -mb-8 -mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-3 pb-20 pt-14 outline-none"
          >
            {COPIES.map((copy) =>
              SERVICES.map((service, i) => (
                /* Tashqi oʻram — faqat kirish animatsiyasi (transform'lar
                   aralashib ketmasligi uchun hover/active alohida qatlamda) */
                <div
                  key={`${copy}-${i}`}
                  /* Nusxalar ekran oʻqigichlar uchun takrorlanmasin */
                  aria-hidden={copy === 1 ? undefined : true}
                  data-in={shown ? "true" : "false"}
                  style={{ animationDelay: `${i * 70}ms` }}
                  className="w-[80%] shrink-0 snap-center opacity-0 data-[in=true]:animate-rise sm:w-[46%] lg:w-[calc((100%-4rem)/5)]"
                >
                  <ServiceCard service={service} text={t.service.items[i]} isActive={i === active} />
                </div>
              ))
            )}
          </div>

          {/* ===== Nuqtalar ===== */}
          <div className="relative mt-0 flex items-center justify-center gap-2">
            {SERVICES.map((service, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${t.service.dotLabel} ${i + 1}: ${t.service.items[i].title}`}
                aria-current={i === active}
                onClick={() => goToService(i)}
                className={`h-2 rounded-pill transition-all duration-300 ${
                  i === active
                    ? "w-7 bg-[linear-gradient(100deg,#7FE7B4,#17A468)] shadow-[0_4px_10px_-3px_rgba(23,164,104,0.7)]"
                    : "w-2 bg-[color:var(--dot-idle)] hover:bg-brand-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ===== Eslatma ===== */}
        <Reveal delay="120ms" className="mt-8 sm:mt-10">
          <div className="mx-auto flex max-w-[720px] items-start justify-center gap-3 rounded-[18px] border border-[color:var(--glass-border)] bg-[image:linear-gradient(120deg,var(--glass-1),var(--glass-2))] px-5 py-3.5 shadow-[0_16px_38px_-22px_rgba(15,64,40,0.4),inset_0_1px_0_rgba(255,255,255,0.9)] sm:items-center">
            <span aria-hidden className="text-[18px] leading-none">
              💡
            </span>
            <p className="text-[13.5px] leading-[1.55] text-body sm:text-center sm:text-[14.5px]">
              <span className="font-semibold text-ink">{t.service.noteLabel}</span>{" "}
              {t.service.note}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────── Kartochka ───────────────────────────
   `memo` — faol kartochka almashganda faqat holati oʻzgarganlari
   qayta render boʻladi. Hover/faol effektlari sof CSS'da: JS har
   kadrda hech narsa hisoblamaydi. */

const ServiceCard = memo(function ServiceCard({
  service,
  text,
  isActive,
}: {
  service: Service;
  text: { title: string; desc: string };
  isActive: boolean;
}) {
  const Icon = service.icon;

  return (
    <article
      data-active={isActive ? "true" : "false"}
      className="group relative flex h-full flex-col rounded-[24px] border border-[color:var(--glass-border)] bg-[image:linear-gradient(160deg,var(--glass-1),var(--glass-2))] px-5 pb-6 pt-6 text-left shadow-[0_22px_48px_-24px_rgba(15,64,40,0.28),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-[8px] transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(.22,.9,.3,1)] will-change-transform hover:-translate-y-2.5 sm:px-[22px]
        data-[active=true]:-translate-y-2 data-[active=true]:border-[color:var(--glass-border)]
        data-[active=true]:shadow-[0_34px_66px_-26px_rgba(15,64,40,0.42),0_0_0_1px_rgba(255,255,255,0.7),inset_0_1px_0_rgba(255,255,255,0.9)]
        lg:data-[active=true]:scale-[1.05]"
    >
      {/* Kartochka ortidagi rangli aura — ikonka rangi bilan uygʻun.
          Faqat `opacity` oʻzgaradi (kompozitor darajasida arzon) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[34px] opacity-0 blur-[26px] transition-opacity duration-500 group-hover:opacity-100 group-data-[active=true]:opacity-100"
        style={{
          background: `radial-gradient(60% 55% at 50% 40%, ${service.glow} 0%, rgba(255,255,255,0) 72%)`,
        }}
      />
      {/* Yuqori qirradagi shisha yaltirogʻi */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.95),transparent)]"
      />

      {/* Tasdiq nishoni */}
      <CheckBadge3D
        aria-hidden
        className="absolute right-4 top-4 h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-data-[active=true]:scale-110"
      />

      {/* 3D ikonka — chapga tekislangan, sarlavha bilan bitta oʻqda */}
      <div className="relative mb-4 h-[74px] w-[74px] sm:h-[80px] sm:w-[80px]">
        <span
          aria-hidden
          className="absolute inset-1 rounded-full opacity-70 blur-xl transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(50% 50% at 50% 50%, ${service.glow}, rgba(255,255,255,0))`,
          }}
        />
        <Icon className="relative h-full w-full transition-transform duration-500 ease-[cubic-bezier(.22,.9,.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.06] group-data-[active=true]:-translate-y-1" />
      </div>

      {/*
        Sarlavha uchun ikki qatorlik joy band qilinadi — shunda bir qatordagi
        barcha kartochkalarda tavsif matni bir xil balandlikdan boshlanadi.
      */}
      <h3 className="font-display text-[16px] font-extrabold leading-[1.32] tracking-[-0.005em] text-ink sm:min-h-[2.64em] sm:text-[16.5px]">
        {text.title}
      </h3>

      {/* Ingichka ajratkich — sarlavha va tavsif orasidagi vizual nafas */}
      <span
        aria-hidden
        className="mt-3 block h-px w-9 rounded-pill bg-[linear-gradient(90deg,#7FE7B4,rgba(127,231,180,0))] transition-[width] duration-300 group-hover:w-14 group-data-[active=true]:w-14"
      />

      <p className="mt-3 text-[13.5px] leading-[1.68] text-body">{text.desc}</p>
    </article>
  );
});

/* ───────────────────── Yon tomondagi strelkalar ─────────────────────
   Halqa cheksiz — shuning uchun ular hech qachon "oʻchgan" holatda boʻlmaydi */

function NavButton({
  side,
  onClick,
  prevLabel,
  nextLabel,
}: {
  side: "left" | "right";
  onClick: () => void;
  prevLabel: string;
  nextLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? prevLabel : nextLabel}
      className={`glass-card absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-ink transition-all duration-300 hover:scale-110 hover:shadow-float sm:flex ${
        side === "left" ? "-left-3 lg:-left-7" : "-right-3 lg:-right-7"
      }`}
    >
      <Chevron className={`h-4 w-4 ${side === "left" ? "rotate-180" : ""}`} />
    </button>
  );
}

function Chevron(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** `prefers-reduced-motion` — autoplay va silliq surishni oʻchiradi */
function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduce;
}
