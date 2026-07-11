import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { getCmsPage } from "@/lib/portal";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("podgotovka-k-ege-po-informatike") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "Подготовка к ЕГЭ по информатике — TirSkix Academy",
    description:
      "Онлайн-подготовка к ЕГЭ по информатике для 10–11 класса. Python, алгоритмы, теория вероятностей в ИТ. Цель — от 80 до 98 баллов.",
    keywords: ["подготовка к ЕГЭ по информатике", "ЕГЭ информатика онлайн", "ЕГЭ Python 2025", "репетитор ЕГЭ информатика"],
    canonical: "https://tirskix-academy.com/podgotovka-k-ege-po-informatike/",
  });
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Подготовка к ЕГЭ по информатике",
  description: "Онлайн-курс подготовки к ЕГЭ по информатике для учеников 10–11 класса",
  provider: { "@type": "EducationalOrganization", name: "TirSkix Academy" },
  educationalLevel: "10–11 класс",
  teaches: "Python, алгоритмы, теория информации, сети, базы данных, дискретная математика",
};

const BLOCKS = [
  {
    title: "Задания 1–9",
    subtitle: "Теория и системы счисления",
    items: ["Кодирование и декодирование", "Системы счисления — перевод", "Логические выражения и схемы", "Алгоритмы с трассировкой"],
    color: "var(--color-track-technolab)",
  },
  {
    title: "Задания 10–19",
    subtitle: "Работа с данными",
    items: ["Табличные процессоры", "Базы данных и SQL", "Сети и IP-адресация", "Теория вероятностей в ИТ"],
    color: "var(--color-track-kodeks)",
  },
  {
    title: "Задания 20–27",
    subtitle: "Python — 2 часть",
    items: ["Написание программ по условию", "Алгоритмы поиска и сортировки", "Рекурсия и динамика", "Задание 27 — программирование с нуля"],
    color: "var(--color-brand)",
  },
];

const RESULTS = [
  { v: "98 б.", l: "максимальный результат ученика" },
  { v: "80+", l: "средний балл после курса" },
  { v: "1 год", l: "рекомендуемый срок с 10 класса" },
  { v: "БВИ", l: "поступление без вступительных" },
];

const FAQ = [
  {
    q: "С какого класса начинать?",
    a: "Идеально — с 10 класса. За год разберём все темы без спешки и пройдём много практики. Если уже 11 — начнём с диагностики и спрессуем программу по приоритетным темам.",
  },
  {
    q: "ЕГЭ по информатике теперь только на компьютере — это сложнее?",
    a: "Мы готовим именно к компьютерному формату: все задания разбираем в IDE, ученики привыкают к среде и не теряют баллы на технических деталях.",
  },
  {
    q: "Нужен ли Python до начала занятий?",
    a: "Желательно иметь базу. Если её нет — рекомендуем сначала пройти несколько месяцев на треке Кодэкс, затем перейти к подготовке к ЕГЭ.",
  },
  {
    q: "Задание 27 — реально написать за 3,5 часа?",
    a: "Да, при правильной подготовке. Мы специально тренируем скорость: типовые задания 27 разбираем до автоматизма.",
  },
];

export default async function EgePage() {
  const cms = await getCmsPage('podgotovka-k-ege-po-informatike');
  const blocks = Array.isArray(cms.blocks) && cms.blocks.length > 0 ? cms.blocks as typeof BLOCKS : BLOCKS;
  const results = Array.isArray(cms.results) && cms.results.length > 0 ? cms.results as typeof RESULTS : RESULTS;
  const faq = Array.isArray(cms.faq) && cms.faq.length > 0 ? cms.faq as typeof FAQ : FAQ;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[var(--color-track-technolab-light)] opacity-40 blur-3xl" />
          </div>
          <div className="container relative max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-[var(--color-brand)] font-medium">Подготовка к ЕГЭ</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-xs font-medium mb-6" style={{ color: "var(--color-track-technolab)" }}>
              10–11 класс · Информатика
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-5">
              Подготовка к ЕГЭ<br />
              <span style={{ color: "var(--color-track-technolab)" }}>по информатике</span>
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
              Разбираем все 27 заданий КИМ: от теории информации до сложного программирования.
              Наша ученица сдала на 98 баллов и поступила в МФТИ без вступительных.
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

        {/* Stats */}
        <section className="py-10 bg-[var(--color-bg-subtle)] border-y border-[var(--color-border)]">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {results.map((s) => (
                <div key={s.v} className="text-center">
                  <div className="text-2xl md:text-3xl font-extrabold mb-1" style={{ color: "var(--color-track-technolab)" }}>{s.v}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Блоки заданий */}
        <section className="py-16 md:py-24">
          <div className="container max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-3 text-center">
              Программа по блокам
            </h2>
            <p className="text-[var(--color-text-secondary)] text-center mb-10 max-w-xl mx-auto">
              Покрываем все 27 заданий. Особый акцент на 2 части — там самые весомые баллы.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {blocks.map((b) => (
                <div key={b.title} className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                  <div className="text-xs font-mono font-bold mb-1" style={{ color: b.color }}>{b.title}</div>
                  <h3 className="font-extrabold text-[var(--color-text-primary)] mb-4">{b.subtitle}</h3>
                  <ul className="space-y-2">
                    {b.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                        <CheckCircle size={14} weight="fill" className="shrink-0 mt-0.5" style={{ color: b.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-8 text-center">
              Частые вопросы
            </h2>
            <div className="space-y-3">
              {faq.map((item) => (
                <details key={item.q} className="group bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] transition-colors text-sm">
                    {item.q}
                    <span className="shrink-0 transition-transform group-open:rotate-45 text-lg font-light" style={{ color: "var(--color-track-technolab)" }}>+</span>
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
        <section className="py-16">
          <div className="container max-w-xl text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-4">
              Начнём подготовку?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Пробный урок — диагностика уровня и составление плана подготовки. Бесплатно.
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
