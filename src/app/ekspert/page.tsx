import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrackPage } from "@/components/tracks/TrackPage";
import { TRACKS, type TrackData } from "@/lib/tracks";
import { getCmsPage } from "@/lib/portal";
import { buildPageMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("ekspert") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "Эксперт — Git, ООП и алгоритмы для подростков | TirSkix Academy",
    description:
      "Git, ООП, Arcade, алгоритмы и игровой AI для учеников 7–8 класса и старше. Вход после «Программиста» или по входному тесту. TirSkix Academy. Пробный урок бесплатно.",
    keywords: [
      "Python алгоритмы для подростков",
      "программирование для подростков",
      "программирование для поступления в вуз",
      "ООП Python школьники",
      "курс алгоритмов онлайн",
    ],
    canonical: "https://tirskix-academy.com/ekspert",
  });
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Эксперт",
  url: "https://tirskix-academy.com/ekspert/",
  description: "Git, ООП, Arcade, алгоритмы и игровой AI для учеников 7–8 класса и старше.",
  provider: { "@type": "EducationalOrganization", name: "TirSkix Academy", url: "https://tirskix-academy.com/" },
  educationalLevel: "7–8 класс и старше",
  teaches: "Python, Git, алгоритмы, ООП, дискретная математика, олимпиадное программирование",
  courseMode: "online",
  inLanguage: "ru",
  audience: { "@type": "EducationalAudience", educationalRole: "student" },
  offers: { "@type": "Offer", price: "4950", priceCurrency: "RUB", availability: "https://schema.org/InStock" },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Главная", url: "https://tirskix-academy.com/" },
  { name: "Программирование для детей", url: "https://tirskix-academy.com/programmirovanie-dlya-detej/" },
  { name: "Эксперт", url: "https://tirskix-academy.com/ekspert/" },
]);

export default async function EkspertPage() {
  const cms = await getCmsPage('ekspert');
  const pageTrack = (Object.keys(cms).length > 0 ? cms : TRACKS["ekspert"]) as TrackData;
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
