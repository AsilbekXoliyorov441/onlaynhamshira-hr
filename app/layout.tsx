import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const display = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Onlayn Hamshira — tibbiy mutaxassislar uchun platforma",
  description:
    "Bemorlarga uy sharoitida professional tibbiy xizmat koʻrsating, qoʻshimcha daromad oling va ish vaqtingizni mustaqil boshqaring.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
