import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrackPage } from "@/components/tracks/TrackPage";
import { TRACKS, type TrackData } from "@/lib/tracks";
import { getCmsPage } from "@/lib/portal";
import { buildPageMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("kodeks") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "Кодэкс — курс Python для детей 12–15 лет | TirSkix Academy",
    description:
      "Python через детективные дела для детей 12–15 лет. Data Science: numpy, pandas. Стань цифровым следователем — онлайн-курс TirSkix Academy. Пробный урок бесплатно.",
    keywords: [
      "Python для детей",
      "курс Python для подростков",
      "обучение Python онлайн школьникам",
      "Data Science для детей",
      "программирование Python 12 лет",
    ],
    canonical: "https://tirskix-academy.com/kodeks",
  });
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Кодэкс",
  url: "https://tirskix-academy.com/kodeks/",
  description: "Python через детективные дела для детей 12–15 лет. Data Science: numpy, pandas.",
  provider: { "@type": "EducationalOrganization", name: "TirSkix Academy", url: "https://tirskix-academy.com/" },
  educationalLevel: "12–15 лет",
  teaches: "Python, Data Science, numpy, pandas, алгоритмы",
  courseMode: "online",
  inLanguage: "ru",
  audience: { "@type": "EducationalAudience", educationalRole: "student" },
  offers: { "@type": "Offer", price: "4200", priceCurrency: "RUB", availability: "https://schema.org/InStock" },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Главная", url: "https://tirskix-academy.com/" },
  { name: "Программирование для детей", url: "https://tirskix-academy.com/programmirovanie-dlya-detej/" },
  { name: "Кодэкс", url: "https://tirskix-academy.com/kodeks/" },
]);

export default async function KodeksPage() {
  const cms = await getCmsPage('kodeks');
  const pageTrack = (Object.keys(cms).length > 0 ? cms : TRACKS["kodeks"]) as TrackData;
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
