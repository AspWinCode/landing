import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrackPage } from "@/components/tracks/TrackPage";
import { TRACKS } from "@/lib/tracks";

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

export default function TechnoLabPage() {
  return (
    <>
      <Header />
      <main>
        <TrackPage track={track} />
      </main>
      <Footer />
    </>
  );
}
