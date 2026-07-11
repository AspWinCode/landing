import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { getPortalPosts, getPortalPost } from "@/lib/portal";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPortalPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPortalPost(slug);
  if (!post) return {};
  return {
    title: { absolute: `${post.seo_title || post.title} — TirSkix Academy` },
    description: post.seo_description || post.excerpt || undefined,
    alternates: { canonical: post.canonical || `https://tirskix-academy.com/blog/${slug}/` },
    openGraph: post.og_image ? {
      images: [{ url: post.og_image }],
      title: post.og_title || post.title,
      description: post.og_description || post.excerpt || undefined,
    } : undefined,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPortalPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    ...(post.cover_image ? { image: post.cover_image } : {}),
    author: { "@type": "Organization", name: "TirSkix Academy" },
    publisher: { "@type": "Organization", name: "TirSkix Academy" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <article itemScope itemType="https://schema.org/BlogPosting">
          {/* Hero */}
          <header className="py-16 md:py-20 border-b border-[var(--color-border)]">
            <div className="container max-w-2xl">
              <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
                <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-[var(--color-brand)] transition-colors">Блог</Link>
                <span>/</span>
                <span className="text-[var(--color-brand)] font-medium truncate max-w-[200px]">{post.title}</span>
              </nav>

              <div className="flex items-center gap-3 mb-5">
                {post.category && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[color-mix(in_srgb,var(--color-brand)_12%,transparent)] text-[var(--color-brand)]">
                    {post.category.name}
                  </span>
                )}
                {post.published_at && (
                  <time className="text-xs text-[var(--color-text-muted)]" dateTime={post.published_at} itemProp="datePublished">
                    {formatDate(post.published_at)}
                  </time>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-4" itemProp="headline">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed" itemProp="description">
                  {post.excerpt}
                </p>
              )}
            </div>
          </header>

          {/* Cover image */}
          {post.cover_image && (
            <div className="container max-w-2xl mt-8">
              <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden">
                <Image src={post.cover_image} alt={post.title} fill className="object-cover" sizes="672px" />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="py-12 md:py-16">
            <div className="container max-w-2xl">
              {post.content ? (
                <div
                  className="prose-custom space-y-5 text-[var(--color-text-secondary)] leading-relaxed [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-[var(--color-text-primary)] [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-base [&_img]:rounded-xl [&_img]:my-4 [&_a]:text-[var(--color-brand)] [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                  itemProp="articleBody"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-8 text-center">
                  <p className="text-[var(--color-text-muted)] text-sm">Полная версия статьи скоро появится.</p>
                </div>
              )}
            </div>
          </div>
        </article>

        {/* Nav */}
        <section className="py-10 border-t border-[var(--color-border)]">
          <div className="container max-w-2xl flex items-center justify-between gap-4">
            <Link href="/blog" className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors">
              <ArrowLeft size={16} weight="bold" />
              Все статьи
            </Link>
            <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "sm", "group inline-flex")}>
              Пробный урок бесплатно
              <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
