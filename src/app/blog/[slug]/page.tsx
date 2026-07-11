import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, Clock, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { POSTS } from "@/app/blog/page";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: { absolute: `${post.title} — TirSkix Academy` },
    description: post.excerpt,
    alternates: { canonical: `https://tirskix-academy.com/blog/${slug}/` },
  };
}

const CONTENT: Record<string, React.ReactNode> = {
  "kak-vybrat-trek-dlya-rebenka": (
    <>
      <p>
        Когда родители приходят к нам за советом, первый вопрос почти всегда одинаковый: «С чего начать?».
        И это правильный вопрос — потому что правильный старт экономит месяцы.
      </p>
      <h2>Игровая студия: для тех, кто любит играть (10–12 лет)</h2>
      <p>
        Если ребёнку 10–12 лет и он никогда не программировал — это его трек.
        Мы работаем в Snap! и GDevelop: визуальные инструменты, где дети создают настоящие игры
        без необходимости запоминать синтаксис.
      </p>
      <p>
        Главная цель — не научить конкретному языку, а сформировать алгоритмическое мышление
        и любовь к созданию программ. Дети, которые прошли Игровую студию, переходят в Кодэкс
        с правильной базой и большим желанием.
      </p>
      <h2>Кодэкс: Python через детективные расследования (12–15 лет)</h2>
      <p>
        Кодэкс — для тех, кто готов к текстовому коду. Мы используем детективный нарратив:
        ребёнок — цифровой следователь, который раскрывает дела с помощью Python-программ.
      </p>
      <p>
        Такой подход работает, потому что мотивация встроена в историю. Дети не «учат переменные»
        — они «ищут подозреваемого по базе данных». Разница огромная.
      </p>
      <h2>ТехноЛаб: олимпиадный уровень (14–18 лет)</h2>
      <p>
        ТехноЛаб — для тех, кто хочет большего. Алгоритмы, ООП, математика, подготовка к олимпиадам
        и поступлению в топ-вузы. Требует базового Python — иначе начинаем с Кодэкса.
      </p>
      <h2>Главный совет</h2>
      <p>
        Если сомневаетесь — запишитесь на пробный урок. Ментор поговорит с ребёнком,
        оценит уровень и даст рекомендацию. Это лучше любой статьи.
      </p>
    </>
  ),
  "python-ili-scratch-chto-luchshe-dlya-detej": (
    <>
      <p>
        Частый вопрос от родителей: «Ребёнок занимается на Scratch — этого достаточно?».
        Честный ответ: Scratch отличный инструмент для старта. Но у него есть потолок.
      </p>
      <h2>Scratch: правильный старт для 6–10 лет</h2>
      <p>
        Scratch создавался для детей 6–10 лет — и для этого возраста он идеален.
        Блоки вместо синтаксиса, мгновенный визуальный результат, низкий порог входа.
        Ребёнок быстро получает удовольствие от того, что «что-то двигается на экране».
      </p>
      <h2>Когда Scratch становится тесным</h2>
      <p>
        Проблема Scratch — навыки не переносятся. Ребёнок умеет делать что-то в Scratch,
        но это не помогает на ОГЭ, не помогает в реальном проекте, не помогает устроиться на работу.
      </p>
      <p>
        Переходить на Python стоит в районе 11–12 лет. К этому возрасту дети готовы к абстракциям
        текстового синтаксиса и получают больше от реального кода, чем от блоков.
      </p>
      <h2>Python: всё серьёзно</h2>
      <p>
        Python используется в Data Science, машинном обучении, веб-разработке, автоматизации.
        Он нужен на ОГЭ и ЕГЭ по информатике. На нём строятся олимпиадные решения.
      </p>
      <p>
        В TirSkix Academy мы начинаем Python через нарративный подход — так переход с
        «детских» инструментов происходит максимально мягко.
      </p>
    </>
  ),
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = CONTENT[slug];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
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
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: `color-mix(in srgb, ${post.tagColor} 12%, transparent)`, color: post.tagColor }}
                >
                  {post.tag}
                </span>
                <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                  <Clock size={12} weight="fill" />
                  {post.readTime}
                </span>
                <time className="text-xs text-[var(--color-text-muted)]" dateTime={post.date} itemProp="datePublished">
                  {formatDate(post.date)}
                </time>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-4" itemProp="headline">
                {post.title}
              </h1>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed" itemProp="description">
                {post.excerpt}
              </p>
            </div>
          </header>

          {/* Content */}
          <div className="py-12 md:py-16">
            <div className="container max-w-2xl">
              {content ? (
                <div
                  className="prose-custom space-y-5 text-[var(--color-text-secondary)] leading-relaxed [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-[var(--color-text-primary)] [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-base"
                  itemProp="articleBody"
                >
                  {content}
                </div>
              ) : (
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-8 text-center">
                  <p className="text-[var(--color-text-muted)] text-sm">Полная версия статьи скоро появится.</p>
                </div>
              )}
            </div>
          </div>
        </article>

        {/* Nav between posts */}
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
