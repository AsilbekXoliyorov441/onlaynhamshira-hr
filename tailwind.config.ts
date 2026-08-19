import type { Config } from "tailwindcss";

/** Barcha ranglar CSS oʻzgaruvchilariga bogʻlangan — `globals.css` dagi
 *  `:root` (yorugʻ) va `.dark` (toʻq) bloklari ularning qiymatini beradi.
 *  `<alpha-value>` saqlangani uchun `text-ink/70` kabi shaffoflik ishlaydi. */
const token = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        nav: "1120px",
      },
      colors: {
        /* Matn */
        ink: token("--c-ink"),
        body: token("--c-body"),
        mute: token("--c-mute"),
        line: token("--c-line"),

        /* Yuzalar */
        page: token("--c-page"),
        surface: token("--c-surface"),
        "surface-2": token("--c-surface-2"),

        /* Yashil CTA ustidagi matn — ikkala rejimda ham toʻq qoladi */
        onbrand: "#0B2B1C",

        brand: {
          50: token("--c-brand-50"),
          100: token("--c-brand-100"),
          200: token("--c-brand-200"),
          300: token("--c-brand-300"),
          400: token("--c-brand-400"),
          500: token("--c-brand-500"),
          600: token("--c-brand-600"),
          700: token("--c-brand-700"),
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "999px",
        card: "18px",
        phone: "52px",
      },
      boxShadow: {
        nav: "var(--shadow-nav)",
        card: "var(--shadow-card)",
        float: "var(--shadow-float)",
        cta: "var(--shadow-cta)",
        phone: "var(--shadow-phone)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-9px)" },
        },
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "50%": { transform: "translate3d(0,-14px,0) rotate(-3deg)" },
        },
        liquid: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(3px,-5px) scale(1.08)" },
          "66%": { transform: "translate(-3px,4px) scale(0.92)" },
        },
      },
      animation: {
        rise: "rise .8s cubic-bezier(.22,.9,.3,1) both",
        floaty: "floaty 6s ease-in-out infinite",
        drift: "drift 9s ease-in-out infinite",
        liquid: "liquid 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
