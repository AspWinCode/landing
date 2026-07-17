import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AdvantagesSection } from "@/components/sections/AdvantagesSection";
import { TracksSection } from "@/components/sections/TracksSection";
import { PathSection } from "@/components/sections/PathSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { PromosSection } from "@/components/sections/PromosSection";
import { LmsSection } from "@/components/sections/LmsSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { getCmsPage } from "@/lib/portal";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { CmsBootstrap } from "@/components/edit/CmsBootstrap";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("home") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "TirSkix Academy — онлайн-школа программирования для детей",
    description:
      "От хобби — к вершинам IT. Три нарративных трека для детей 10–18 лет: Игровая студия, Кодэкс, ТехноЛаб. Пробный урок бесплатно.",
    canonical: "https://tirskix-academy.com/",
  });
}

function arr<T>(v: unknown): T[] | undefined {
  return Array.isArray(v) && v.length > 0 ? (v as T[]) : undefined;
}

function obj(v: unknown): Record<string, unknown> {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
}

function str(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v : undefined;
}

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": "https://tirskix-academy.com/#organization",
      name: "TirSkix Academy",
      url: "https://tirskix-academy.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://tirskix-academy.com/logo.png",
        width: 512,
        height: 512,
      },
      description:
        "Онлайн-школа программирования для детей 10–18 лет. Три нарративных трека: Игровая студия, Кодэкс, ТехноЛаб. Лицензия Министерства образования. Налоговый вычет, оплата маткапиталом.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "RU",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: "Russian",
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://tirskix-academy.com/#website",
      url: "https://tirskix-academy.com/",
      name: "TirSkix Academy",
      publisher: { "@id": "https://tirskix-academy.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://tirskix-academy.com/blog/?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default async function HomePage() {
  const cms = await getCmsPage("home");

  const hero = obj(cms.hero);
  const adv = obj(cms.advantages);
  const tracks = obj(cms.tracks);
  const path = obj(cms.path);
  const promos = obj(cms.promos);
  const lms = obj(cms.lms);
  const ctaFinal = obj(cms.cta_final);

  const stats = arr<{ value: string; label: string; highlight?: boolean }>(cms.stats);
  const reviews = arr<{ name: string; role: string; text: string; initials: string }>(cms.reviews);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Header />
      <main>
        <CmsBootstrap content={cms as Record<string, unknown>} />
        <HeroSection
          badge={str(hero.badge)}
          h1={str(hero.h1)}
          h1Accent={str(hero.h1_accent)}
          subtitle={str(hero.subtitle)}
          bullets={arr<string>(hero.bullets)}
          ctaPrimary={str(hero.cta_primary)}
          ctaSecondary={str(hero.cta_secondary)}
          rightImageUrl={str(hero.right_image_url)}
        />
        <AdvantagesSection
          heading={str(adv.heading)}
          subheading={str(adv.subheading)}
          items={arr(adv.items)}
        />
        <TracksSection
          heading={str(tracks.heading)}
          subheading={str(tracks.subheading)}
          tracks={arr(tracks.items)}
        />
        <PathSection
          heading={str(path.heading)}
          subheading={str(path.subheading)}
          steps={arr(path.steps)}
        />
        <ResultsSection stats={stats} reviews={reviews} />
        <TrustSection />
        <PromosSection
          heading={str(promos.heading)}
          subheading={str(promos.subheading)}
          items={arr(promos.items)}
        />
        <LmsSection
          heading={str(lms.heading)}
          description={str(lms.description)}
          features={arr<string>(lms.features)}
          cta_text={str(lms.cta_text)}
          cta_href={str(lms.cta_href)}
        />
        <FinalCtaSection
          heading={str(ctaFinal.heading)}
          subtext={str(ctaFinal.subtext)}
          btn_primary={str(ctaFinal.btn_primary)}
          btn_primary_href={str(ctaFinal.btn_primary_href)}
          btn_secondary={str(ctaFinal.btn_secondary)}
          btn_secondary_href={str(ctaFinal.btn_secondary_href)}
          note={str(ctaFinal.note)}
        />
      </main>
      <Footer />
    </>
  );
}
