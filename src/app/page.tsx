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
import { getCmsPage } from "@/lib/portal";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "TirSkix Academy — онлайн-школа программирования для детей",
  description:
    "От хобби — к вершинам IT. Три нарративных трека для детей 10–18 лет: Игровая студия, Кодэкс, ТехноЛаб. Пробный урок бесплатно.",
  alternates: { canonical: "https://tirskix-academy.com/" },
};

export default async function HomePage() {
  const cms = await getCmsPage("home");

  const hero = cms.hero && typeof cms.hero === "object" ? cms.hero as Record<string, unknown> : null;
  const stats = Array.isArray(cms.stats) && cms.stats.length > 0 ? cms.stats as { value: string; label: string; highlight?: boolean }[] : undefined;
  const reviews = Array.isArray(cms.reviews) && cms.reviews.length > 0 ? cms.reviews as { name: string; role: string; text: string; initials: string }[] : undefined;

  return (
    <>
      <Header />
      <main>
        <HeroSection
          badge={typeof hero?.badge === "string" ? hero.badge : undefined}
          h1={typeof hero?.h1 === "string" ? hero.h1 : undefined}
          h1Accent={typeof hero?.h1_accent === "string" ? hero.h1_accent : undefined}
          subtitle={typeof hero?.subtitle === "string" ? hero.subtitle : undefined}
          bullets={Array.isArray(hero?.bullets) ? hero.bullets as string[] : undefined}
          ctaPrimary={typeof hero?.cta_primary === "string" ? hero.cta_primary : undefined}
          ctaSecondary={typeof hero?.cta_secondary === "string" ? hero.cta_secondary : undefined}
        />
        <AdvantagesSection />
        <TracksSection />
        <PathSection />
        <ResultsSection stats={stats} reviews={reviews} />
        <TrustSection />
        <PromosSection />
        <LmsSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}
