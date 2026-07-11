import type { Metadata } from "next";
import { Manrope, Open_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tirskix-academy.com"),
  title: {
    default: "TirSkix Academy — онлайн-школа программирования для детей",
    template: "%s | TirSkix Academy",
  },
  description:
    "Обучение программированию для детей 10–18 лет онлайн. Три трека: Игровая студия, Кодэкс, ТехноЛаб. Реальные результаты: БВИ, ОГЭ 19/21, полуфинал ICPC.",
  keywords: [
    "онлайн школа программирования для детей",
    "программирование для детей",
    "Python для подростков",
    "обучение программированию для школьников",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "TirSkix Academy",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${manrope.variable} ${openSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
