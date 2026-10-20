import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrackPage } from "@/components/tracks/TrackPage";
import { TRACKS, type TrackData } from "@/lib/tracks";
import { getCmsPage } from "@/lib/portal";
import { buildPageMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("programmist") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "Программист — курс Python для детей 12–15 лет | TirSkix Academy",
    description:
      "Базовая программа Python для детей 12–15 лет. Данные, функции, Data Science: numpy, pandas. Онлайн-курс TirSkix Academy. Пробный урок бесплатно.",
    keywords: [
      "Python для детей",
      "курс Python для подростков",
      "обучение Python онлайн школьникам",
      "Data Science для детей",
      "программирование Python 12 лет",
    ],
    canonical: "https://tirskix-academy.com/programmist",
  });
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Программист",
  url: "https://tirskix-academy.com/programmist/",
  description: "Базовая программа Python для детей 12–15 лет. Данные, функции, Data Science: numpy, pandas.",
  provider: { "@type": "EducationalOrganization", name: "TirSkix Academy", url: "https://tirskix-academy.com/" },
  educationalLevel: "12–15 лет",
  teaches: "Python, Data Science, numpy, pandas, алгоритмы",
  courseMode: "online",
  inLanguage: "ru",
  audience: { "@type": "EducationalAudience", educationalRole: "student" },
  offers: { "@type": "Offer", price: "4950", priceCurrency: "RUB", availability: "https://schema.org/InStock" },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Главная", url: "https://tirskix-academy.com/" },
  { name: "Программирование для детей", url: "https://tirskix-academy.com/programmirovanie-dlya-detej/" },
  { name: "Программист", url: "https://tirskix-academy.com/programmist/" },
]);

export default async function ProgrammistPage() {
  const cms = await getCmsPage('programmist');
  const pageTrack = (Object.keys(cms).length > 0 ? cms : TRACKS["programmist"]) as TrackData;
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
