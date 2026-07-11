import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrackPage } from "@/components/tracks/TrackPage";
import { TRACKS, type TrackData } from "@/lib/tracks";
import { getCmsPage } from "@/lib/portal";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("technolab") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "ТехноЛаб — Python и алгоритмы для подростков 14–18 лет | TirSkix Academy",
    description:
      "Python, алгоритмы, ООП, математика для подростков 14–18 лет. Подготовка к олимпиадам и поступлению в МФТИ, ИТМО, ВШЭ. TirSkix Academy. Пробный урок бесплатно.",
    keywords: [
      "Python алгоритмы для подростков",
      "подготовка к олимпиаде по информатике",
      "программирование для поступления в вуз",
      "ООП Python школьники",
      "курс алгоритмов онлайн",
    ],
    canonical: "https://tirskix-academy.com/technolab",
  });
}

export default async function TechnoLabPage() {
  const cms = await getCmsPage('technolab');
  const pageTrack = (Object.keys(cms).length > 0 ? cms : TRACKS["technolab"]) as TrackData;
  return (
    <>
      <Header />
      <main>
        <TrackPage track={pageTrack} />
      </main>
      <Footer />
    </>
  );
}
