import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { getCmsPage } from "@/lib/portal";
import { buildPageMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("podgotovka-k-oge-po-informatike") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "Подготовка к ОГЭ по информатике — TirSkix Academy",
    description:
      "Онлайн-подготовка к ОГЭ по информатике для 9 класса. Разбор всех заданий, Python и алгоритмы, пробные варианты. Результат от 15/21.",
    keywords: ["подготовка к ОГЭ по информатике", "ОГЭ информатика онлайн", "ОГЭ Python", "репетитор ОГЭ информатика"],
    canonical: "https://tirskix-academy.com/podgotovka-k-oge-po-informatike",
  });
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Подготовка к ОГЭ по информатике",
  url: "https://tirskix-academy.com/podgotovka-k-oge-po-informatike/",
  description: "Онлайн-курс подготовки к ОГЭ по информатике для учеников 8–9 класса",
  provider: { "@type": "EducationalOrganization", name: "TirSkix Academy", url: "https://tirskix-academy.com/" },
  educationalLevel: "9 класс",
  teaches: "Алгоритмы, Python, системы счисления, базы данных, теория информации",
  courseMode: "online",
  inLanguage: "ru",
  audience: { "@type": "EducationalAudience", educationalRole: "student" },
  offers: { "@type": "Offer", price: "4200", priceCurrency: "RUB", availability: "https://schema.org/InStock" },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Главная", url: "https://tirskix-academy.com/" },
  { name: "Подготовка к ОГЭ по информатике", url: "https://tirskix-academy.com/podgotovka-k-oge-po-informatike/" },
]);

const TOPICS = [
  { num: "01–03", title: "Теория информации", desc: "Кодирование, системы счисления, перевод чисел" },
  { num: "04–06", title: "Алгоритмы", desc: "Блок-схемы, циклы, ветвления, трассировка" },
  { num: "07–11", title: "Python-задания", desc: "Написание программ на Python — задания КИМ 2 части" },
  { num: "12–15", title: "Базы данных и сети", desc: "SQL-запросы, топология сетей, адресация" },
  { num: "16–18", title: "Спредшиты и офис", desc: "Формулы электронных таблиц, граф-задачи" },
  { num: "19–21", title: "Сложные задачи", desc: "Задания 2 части повышенной сложности с разбором" },
];

const RESULTS = [
  { v: "19/21", l: "максимальный балл ученика" },
  { v: "15+", l: "средний результат после курса" },
  { v: "3 мес.", l: "минимальный срок подготовки" },
  { v: "6 мес.", l: "рекомендуемый срок с нуля" },
];

const FAQ = [
  {
    q: "С какого класса начинать подготовку к ОГЭ?",
    a: "Рекомендуем с 8 класса — тогда есть время спокойно разобрать все темы. Если уже 9 класс, начнём с диагностики и расставим приоритеты по слабым местам.",
  },
  {
    q: "Нужно ли знать Python до начала занятий?",
    a: "Нет. Мы разбираем Python с нуля в контексте заданий ОГЭ. Нашим ученикам этого достаточно для 2 части.",
  },
  {
    q: "Сколько занятий в неделю?",
    a: "2 занятия в неделю по 60 минут — оптимально. При активной подготовке возможно 3 занятия.",
  },
  {
    q: "Какой формат — групповой или индивидуальный?",
    a: "Преимущественно мини-группы до 4 человек. Также доступны индивидуальные занятия — подробнее на странице индивидуальных занятий.",
  },
];

export default async function OgePage() {
  const cms = await getCmsPage('podgotovka-k-oge-po-informatike');
  const topics = Array.isArray(cms.topics) && cms.topics.length > 0 ? cms.topics as typeof TOPICS : TOPICS;
  const results = Array.isArray(cms.results) && cms.results.length > 0 ? cms.results as typeof RESULTS : RESULTS;
  const faq = Array.isArray(cms.faq) && cms.faq.length > 0 ? cms.faq as typeof FAQ : FAQ;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[var(--color-track-kodeks-light)] opacity-40 blur-3xl" />
          </div>
          <div className="container relative max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-[var(--color-brand)] font-medium">Подготовка к ОГЭ</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-track-kodeks)] mb-6">
              9 класс · Информатика
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-5">
              Подготовка к ОГЭ<br />
              <span style={{ color: "var(--color-track-kodeks)" }}>по информатике</span>
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
              Разбираем все 21 задание КИМ: от кодирования информации до Python-программирования.
              Наша ученица Арина сдала на 19/21 с нуля за 6 месяцев.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "lg", "group inline-flex")}>
                Записаться на пробный урок
                <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/individualnye-zanyatiya" className={buttonClass("outline", "lg")}>
                Индивидуально
              </Link>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="py-10 bg-[var(--color-bg-subtle)] border-y border-[var(--color-border)]">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {results.map((s) => (
                <div key={s.v} className="text-center">
                  <div className="text-2xl md:text-3xl font-extrabold mb-1" style={{ color: "var(--color-track-kodeks)" }}>{s.v}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Темы */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-3 text-center">
              Что разбираем
            </h2>
            <p className="text-[var(--color-text-secondary)] text-center mb-10 max-w-xl mx-auto">
              Программа построена по структуре КИМ ОГЭ 2024–2025. Покрываем каждое задание.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topics.map((t) => (
                <div key={t.num} className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                  <div className="text-xs font-mono font-bold mb-2" style={{ color: "var(--color-track-kodeks)" }}>Задания {t.num}</div>
                  <h3 className="font-extrabold text-[var(--color-text-primary)] mb-2">{t.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Что получит */}
        <section className="py-16 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-8 text-center">
              Что даёт подготовка
            </h2>
            <div className="space-y-3">
              {[
                "Знает структуру всех 21 задания и типовые ловушки",
                "Пишет программы на Python для 2 части ОГЭ",
                "Решает задания на скорость — укладывается в регламент",
                "Проходит минимум 5 пробных вариантов перед экзаменом",
                "Умеет проверять и отлаживать решение прямо на экзамене",
                "Не боится компьютерной части — она привычна после курса",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-[var(--color-surface)] rounded-xl p-4 border border-[var(--color-border)]">
                  <CheckCircle size={18} weight="fill" className="shrink-0 mt-0.5" style={{ color: "var(--color-track-kodeks)" }} />
                  <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20">
          <div className="container max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-8 text-center">
              Частые вопросы
            </h2>
            <div className="space-y-3">
              {faq.map((item) => (
                <details key={item.q} className="group bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] transition-colors text-sm">
                    {item.q}
                    <span className="shrink-0 transition-transform group-open:rotate-45 text-lg font-light" style={{ color: "var(--color-track-kodeks)" }}>+</span>
                  </summary>
                  <div className="px-6 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border)] pt-4">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-xl text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-4">
              Готовы начать подготовку?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Запишитесь на пробный урок — определим уровень и составим план подготовки.
            </p>
            <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "lg", "group inline-flex")}>
              Пробный урок бесплатно
              <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
