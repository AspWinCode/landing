import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Clock } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: { absolute: "Блог — TirSkix Academy" },
  description:
    "Статьи о программировании для детей: как выбрать язык, с чего начать, как подготовиться к ОГЭ и ЕГЭ, истории учеников и советы родителям.",
  alternates: { canonical: "https://tirskix-academy.com/blog/" },
};

export const POSTS = [
  {
    slug: "kak-vybrat-trek-dlya-rebenka",
    title: "Как выбрать трек для ребёнка: Игровая студия, Кодэкс или ТехноЛаб?",
    excerpt:
      "Разбираем три трека TirSkix Academy по возрасту, уровню и целям. Как понять, что подойдёт именно вашему ребёнку.",
    date: "2025-11-10",
    readTime: "5 мин",
    tag: "Родителям",
    tagColor: "var(--color-brand)",
  },
  {
    slug: "python-ili-scratch-chto-luchshe-dlya-detej",
    title: "Python или Scratch: что лучше для детей?",
    excerpt:
      "Scratch — отличный старт. Но в какой момент стоит переходить на Python? И нужно ли вообще?",
    date: "2025-10-28",
    readTime: "6 мин",
    tag: "Python",
    tagColor: "var(--color-track-kodeks)",
  },
  {
    slug: "podgotovka-k-oge-po-informatike-s-nulja",
    title: "Подготовка к ОГЭ по информатике с нуля: реальный план на 6 месяцев",
    excerpt:
      "Как Арина подготовилась к ОГЭ с нуля и сдала на 19/21. Подробный план, ресурсы, типичные ошибки.",
    date: "2025-10-05",
    readTime: "8 мин",
    tag: "ОГЭ",
    tagColor: "var(--color-track-kodeks)",
  },
  {
    slug: "algoritmicheskoe-myshlenie-chto-eto-i-zachem",
    title: "Алгоритмическое мышление: что это и зачем ребёнку?",
    excerpt:
      "Объясняем просто: что такое алгоритмическое мышление, как оно связано с программированием и почему важно для любой профессии.",
    date: "2025-09-20",
    readTime: "4 мин",
    tag: "Теория",
    tagColor: "var(--color-track-technolab)",
  },
  {
    slug: "pervaya-igra-na-gdevelop-poshagovo",
    title: "Первая игра в GDevelop: пошаговый разбор",
    excerpt:
      "Делаем простой платформер с нуля в GDevelop. Подходит детям 10–12 лет — никакого кода, только логика.",
    date: "2025-09-02",
    readTime: "10 мин",
    tag: "Игры",
    tagColor: "var(--color-track-studio)",
  },
  {
    slug: "ege-po-informatike-2025-chto-izmenilos",
    title: "ЕГЭ по информатике 2025: что изменилось и как готовиться",
    excerpt:
      "Разбираем изменения в формате ЕГЭ, новые типы заданий и стратегию подготовки для получения 90+ баллов.",
    date: "2025-08-15",
    readTime: "7 мин",
    tag: "ЕГЭ",
    tagColor: "var(--color-track-technolab)",
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPage() {
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
              Блог
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              О программировании для детей, подготовке к экзаменам и историях учеников.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="pb-16 md:pb-24">
          <div className="container max-w-4xl">
            <div className="grid md:grid-cols-2 gap-6">
              {POSTS.map((post) => (
                <article
                  key={post.slug}
                  className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow overflow-hidden flex flex-col"
                  itemScope
                  itemType="https://schema.org/BlogPosting"
                >
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
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
                    </div>

                    <h2 className="font-extrabold text-[var(--color-text-primary)] mb-3 leading-snug flex-1" itemProp="headline">
                      <Link href={`/blog/${post.slug}`} className="hover:text-[var(--color-brand)] transition-colors">
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4" itemProp="description">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                      <time
                        className="text-xs text-[var(--color-text-muted)]"
                        dateTime={post.date}
                        itemProp="datePublished"
                      >
                        {formatDate(post.date)}
                      </time>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-semibold text-[var(--color-brand)] hover:underline"
                      >
                        Читать →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
