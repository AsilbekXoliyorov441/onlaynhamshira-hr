import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        nav: "1120px",
      },
      colors: {
        ink: "#0B2B1C",
        body: "#54675E",
        mute: "#7C8D85",
        line: "#E4EDE7",
        brand: {
          50: "#F0FBF3",
          100: "#DCF6E3",
          200: "#B6ECC6",
          300: "#86E0A5",
          400: "#4FD189",
          500: "#2CC176",
          600: "#1BA463",
          700: "#167F4E",
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
        nav: "0 2px 14px rgba(11,43,28,0.05)",
        card: "0 12px 34px -12px rgba(11,43,28,0.18), 0 2px 6px rgba(11,43,28,0.04)",
        float: "0 18px 40px -16px rgba(11,43,28,0.22), 0 2px 8px rgba(11,43,28,0.05)",
        cta: "0 14px 30px -10px rgba(44,193,118,0.55)",
        phone:
          "0 60px 90px -40px rgba(11,43,28,0.45), 0 30px 60px -30px rgba(11,43,28,0.28)",
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
        dash: {
          to: { strokeDashoffset: "-40" },
        },
      },
      animation: {
        rise: "rise .8s cubic-bezier(.22,.9,.3,1) both",
        floaty: "floaty 6s ease-in-out infinite",
        drift: "drift 9s ease-in-out infinite",
        dash: "dash 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
