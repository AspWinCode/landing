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
    title: "Новичок — программирование для детей с 3 класса | TirSkix Academy",
    description:
      "Первая ступень TirSkix Academy с 3 класса: Snap!, GDevelop, Roblox Studio (два направления), Turtle. Подбираем направление по классу и способностям ребёнка. Пробный урок бесплатно.",
    keywords: [
      "программирование для детей 3 класс",
      "программирование для детей с нуля",
      "визуальное программирование для школьников",
      "GDevelop для детей",
      "Roblox Studio для детей",
    ],
    canonical: "https://tirskix-academy.com/game-studio",
  });
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Новичок",
  url: "https://tirskix-academy.com/game-studio/",
  description: "Первая ступень TirSkix Academy с 3 класса: Snap!, GDevelop, Roblox Studio, Turtle.",
  provider: { "@type": "EducationalOrganization", name: "TirSkix Academy", url: "https://tirskix-academy.com/" },
  educationalLevel: "с 3 класса",
  teaches: "Snap!, GDevelop, Roblox Studio, Luau, Turtle, визуальное программирование",
  courseMode: "online",
  inLanguage: "ru",
  audience: { "@type": "EducationalAudience", educationalRole: "student" },
  offers: { "@type": "Offer", price: "4200", priceCurrency: "RUB", availability: "https://schema.org/InStock" },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Главная", url: "https://tirskix-academy.com/" },
  { name: "Программирование для детей", url: "https://tirskix-academy.com/programmirovanie-dlya-detej/" },
  { name: "Новичок", url: "https://tirskix-academy.com/game-studio/" },
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
