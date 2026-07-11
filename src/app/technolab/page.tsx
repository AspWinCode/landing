import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrackPage } from "@/components/tracks/TrackPage";
import { TRACKS, type TrackData } from "@/lib/tracks";
import { getCmsPage } from "@/lib/portal";

export const revalidate = 3600;

const track = TRACKS["technolab"];

export const metadata: Metadata = {
  title: { absolute: track.seo.title },
  description: track.seo.description,
  keywords: track.seo.keywords,
  alternates: { canonical: "https://tirskix-academy.com/technolab" },
  openGraph: {
    title: track.seo.title,
    description: track.seo.description,
    url: "https://tirskix-academy.com/technolab",
  },
};

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
