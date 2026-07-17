import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Clock } from "@phosphor-icons/react/dist/ssr";
import { getPortalPosts, getCmsPage } from "@/lib/portal";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("blog") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "Блог — TirSkix Academy",
    description: "Статьи о программировании для детей: как выбрать язык, с чего начать, как подготовиться к ОГЭ и ЕГЭ, истории учеников и советы родителям.",
    canonical: "https://tirskix-academy.com/blog",
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPage() {
  const [posts, cms] = await Promise.all([getPortalPosts(), getCmsPage("blog")]);
  const heading = typeof cms.heading === "string" && cms.heading ? cms.heading : "Блог";
  const subheading = typeof cms.subheading === "string" && cms.subheading
    ? cms.subheading
    : "О программировании для детей, подготовке к экзаменам и историях учеников.";

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-20">
          <div className="container max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-[var(--color-brand)] font-medium">Блог</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-5">
              {heading}
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              {subheading}
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="pb-16 md:pb-24">
          <div className="container max-w-4xl">
            {posts.length === 0 ? (
              <p className="text-center text-[var(--color-text-muted)] py-12">Статьи скоро появятся.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow overflow-hidden flex flex-col"
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                  >
                    {post.cover_image && (
                      <div className="relative h-44 w-full overflow-hidden">
                        <Image
                          src={post.cover_image}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      {post.category && (
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[color-mix(in_srgb,var(--color-brand)_12%,transparent)] text-[var(--color-brand)]">
                            {post.category.name}
                          </span>
                        </div>
                      )}

                      <h2 className="font-extrabold text-[var(--color-text-primary)] mb-3 leading-snug flex-1" itemProp="headline">
                        <Link href={`/blog/${post.slug}`} className="hover:text-[var(--color-brand)] transition-colors">
                          {post.title}
                        </Link>
                      </h2>

                      {post.excerpt && (
                        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4" itemProp="description">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                        {post.published_at ? (
                          <time className="text-xs text-[var(--color-text-muted)]" dateTime={post.published_at} itemProp="datePublished">
                            {formatDate(post.published_at)}
                          </time>
                        ) : <span />}
                        <Link href={`/blog/${post.slug}`} className="text-xs font-semibold text-[var(--color-brand)] hover:underline">
                          Читать →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
