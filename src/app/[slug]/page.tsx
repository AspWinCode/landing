import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCmsPage } from "@/lib/portal";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cms = (await getCmsPage(slug)) as Record<string, unknown>;
  if (cms._custom !== true) return {};
  const title =
    typeof cms.heading === "string" && cms.heading
      ? cms.heading
      : typeof cms._label === "string"
      ? cms._label
      : slug;
  return buildPageMetadata(cms, {
    title: `${title} — TirSkix Academy`,
    canonical: `https://tirskix-academy.com/${slug}/`,
  });
}

export default async function CustomPage({ params }: Props) {
  const { slug } = await params;
  const cms = (await getCmsPage(slug)) as Record<string, unknown>;

  if (cms._custom !== true) notFound();

  const heading =
    typeof cms.heading === "string" && cms.heading ? cms.heading : "";
  const subheading =
    typeof cms.subheading === "string" && cms.subheading ? cms.subheading : "";
  const sections: { h2?: string; content?: string }[] = Array.isArray(
    cms.sections
  )
    ? (cms.sections as { h2?: string; content?: string }[])
    : [];

  return (
    <>
      <Header />
      <main>
        <section className="py-16 md:py-20">
          <div className="container max-w-3xl">
            <nav
              className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8"
              aria-label="Хлебные крошки"
            >
              <Link
                href="/"
                className="hover:text-[var(--color-brand)] transition-colors"
              >
                Главная
              </Link>
              <span>/</span>
              <span className="text-[var(--color-brand)] font-medium">
                {heading || slug}
              </span>
            </nav>

            {heading && (
              <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-5">
                {heading}
              </h1>
            )}
            {subheading && (
              <p className="text-lg text-[var(--color-text-secondary)] mb-12">
                {subheading}
              </p>
            )}

            {sections.map((sec, i) => (
              <div key={i} className="mb-10">
                {sec.h2 && (
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                    {sec.h2}
                  </h2>
                )}
                {sec.content && (
                  <p className="text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">
                    {sec.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
