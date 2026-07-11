import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrackPage } from "@/components/tracks/TrackPage";
import { TRACKS } from "@/lib/tracks";

const track = TRACKS["game-studio"];

export const metadata: Metadata = {
  title: { absolute: track.seo.title },
  description: track.seo.description,
  keywords: track.seo.keywords,
  alternates: { canonical: "https://tirskix-academy.com/game-studio" },
  openGraph: {
    title: track.seo.title,
    description: track.seo.description,
    url: "https://tirskix-academy.com/game-studio",
  },
};

export default function GameStudioPage() {
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
