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
    title: "Эксперт — Python и алгоритмы для подростков 14–18 лет | TirSkix Academy",
    description:
      "Git, алгоритмы, ООП, математика для подростков 14–18 лет. Подготовка к олимпиадам и поступлению в МФТИ, ИТМО, ВШЭ. TirSkix Academy. Пробный урок бесплатно.",
    keywords: [
      "Python алгоритмы для подростков",
      "подготовка к олимпиаде по информатике",
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
  description: "Git, алгоритмы, ООП, математика для подростков 14–18 лет. Подготовка к олимпиадам и поступлению.",
  provider: { "@type": "EducationalOrganization", name: "TirSkix Academy", url: "https://tirskix-academy.com/" },
  educationalLevel: "14–18 лет",
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
