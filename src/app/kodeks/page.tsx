import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrackPage } from "@/components/tracks/TrackPage";
import { TRACKS } from "@/lib/tracks";

const track = TRACKS["kodeks"];

export const metadata: Metadata = {
  title: { absolute: track.seo.title },
  description: track.seo.description,
  keywords: track.seo.keywords,
  alternates: { canonical: "https://tirskix-academy.com/kodeks" },
  openGraph: {
    title: track.seo.title,
    description: track.seo.description,
    url: "https://tirskix-academy.com/kodeks",
  },
};

export default function KodeksPage() {
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
