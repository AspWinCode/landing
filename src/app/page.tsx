import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AdvantagesSection } from "@/components/sections/AdvantagesSection";
import { TracksSection } from "@/components/sections/TracksSection";
import { PathSection } from "@/components/sections/PathSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { PromosSection } from "@/components/sections/PromosSection";
import { LmsSection } from "@/components/sections/LmsSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TirSkix Academy — онлайн-школа программирования для детей",
  description:
    "От хобби — к вершинам IT. Три нарративных трека для детей 10–18 лет: Игровая студия, Кодэкс, ТехноЛаб. Пробный урок бесплатно.",
  alternates: { canonical: "https://tirskix-academy.com/" },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AdvantagesSection />
        <TracksSection />
        <PathSection />
        <ResultsSection />
        <TrustSection />
        <PromosSection />
        <LmsSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}
