import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrackPage } from "@/components/tracks/TrackPage";
import { TRACKS, type TrackData } from "@/lib/tracks";
import { getCmsPage } from "@/lib/portal";
import { buildPageMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("game-studio") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "Игровая студия — создание игр для детей 10–12 лет | TirSkix Academy",
    description:
      "Создание игр на Snap и GDevelop для детей 10–12 лет. Визуальное программирование без синтаксиса. Первый мир TirSkix Academy — старт без опыта. Пробный урок бесплатно.",
    keywords: [
      "создание игр для детей",
      "программирование для детей 10 лет",
      "визуальное программирование для школьников",
      "GDevelop для детей",
      "игровая студия онлайн",
    ],
    canonical: "https://tirskix-academy.com/game-studio",
  });
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Игровая студия",
  url: "https://tirskix-academy.com/game-studio/",
  description: "Создание игр на Snap и GDevelop для детей 10–12 лет. Визуальное программирование без синтаксиса.",
  provider: { "@type": "EducationalOrganization", name: "TirSkix Academy", url: "https://tirskix-academy.com/" },
  educationalLevel: "10–12 лет",
  teaches: "Snap!, GDevelop, игровой дизайн, визуальное программирование",
  courseMode: "online",
  inLanguage: "ru",
  audience: { "@type": "EducationalAudience", educationalRole: "student" },
  offers: { "@type": "Offer", price: "4200", priceCurrency: "RUB", availability: "https://schema.org/InStock" },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Главная", url: "https://tirskix-academy.com/" },
  { name: "Программирование для детей", url: "https://tirskix-academy.com/programmirovanie-dlya-detej/" },
  { name: "Игровая студия", url: "https://tirskix-academy.com/game-studio/" },
]);

export default async function GameStudioPage() {
  const cms = await getCmsPage('game-studio');
  const pageTrack = (Object.keys(cms).length > 0 ? cms : TRACKS["game-studio"]) as TrackData;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main>
        <TrackPage track={pageTrack} />
      </main>
      <Footer />
    </>
  );
}
