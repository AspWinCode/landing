import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getCmsPage } from "@/lib/portal";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("napravleniya-razrabotki") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "Направления разработки — TirSkix Academy",
    description:
      "Все направления обучения программированию в TirSkix Academy: игры, Python, Data Science, алгоритмы, подготовка к ОГЭ и ЕГЭ, индивидуальные занятия.",
    canonical: "https://tirskix-academy.com/napravleniya-razrabotki/",
  });
}

const DIRECTIONS = [
  {
    emoji: "🎮",
    title: "Игровая студия",
    subtitle: "10–12 лет · Snap! и GDevelop",
    desc: "Первые шаги в программировании через создание игр. Дети строят собственные платформеры, аркады и квесты. Без синтаксиса — только логика и творчество.",
    href: "/game-studio",
    color: "var(--color-track-studio)",
    tags: ["Snap!", "GDevelop", "Игровой дизайн", "Логика"],
    forWhom: "Дети без опыта, 10–12 лет",
    result: "Первая игра — собственная, опубликованная",
  },
  {
    emoji: "🔍",
    title: "Кодэкс",
    subtitle: "12–15 лет · Python + Data Science",
    desc: "Python через детективные расследования. Ученики пишут реальный код, анализируют данные, строят алгоритмы — и раскрывают дела вместе с персонажами.",
    href: "/kodeks",
    color: "var(--color-track-kodeks)",
    tags: ["Python", "numpy", "pandas", "Data Science"],
    forWhom: "Подростки 12–15 лет, с нуля или с базой",
    result: "Уверенный Python, навыки анализа данных",
  },
  {
    emoji: "⚙️",
    title: "ТехноЛаб",
    subtitle: "14–18 лет · Алгоритмы и ООП",
    desc: "Олимпиадный уровень: алгоритмы, структуры данных, ООП, математика. Подготовка к ВСОШ, поступлению в топ-вузы, ЕГЭ на высокий балл.",
    href: "/technolab",
    color: "var(--color-track-technolab)",
    tags: ["Python", "Алгоритмы", "ООП", "Arcade"],
    forWhom: "Подростки 14–18 лет с базой Python",
    result: "Олимпиады, БВИ, ЕГЭ 90+",
  },
  {
    emoji: "📗",
    title: "Подготовка к ОГЭ",
    subtitle: "8–9 класс · Информатика",
    desc: "Разбираем все 21 задание КИМ: теория, Python-программирование, базы данных, алгоритмы. Цель — от 15/21 и выше.",
    href: "/podgotovka-k-oge-po-informatike",
    color: "var(--color-track-kodeks)",
    tags: ["ОГЭ", "Python", "Алгоритмы", "КИМ"],
    forWhom: "Ученики 8–9 класса",
    result: "15–19 баллов из 21",
  },
  {
    emoji: "📒",
    title: "Подготовка к ЕГЭ",
    subtitle: "10–11 класс · Информатика",
    desc: "Все 27 заданий нового формата ЕГЭ (на компьютере). Особый акцент на 2 часть и задание 27 — программирование на Python.",
    href: "/podgotovka-k-ege-po-informatike",
    color: "var(--color-track-technolab)",
    tags: ["ЕГЭ", "Python", "Алгоритмы", "2 часть"],
    forWhom: "Ученики 10–11 класса",
    result: "80–98 баллов",
  },
  {
    emoji: "🌐",
    title: "Frontend-разработка",
    subtitle: "от 8 класса · HTML, CSS, JS, React",
    desc: "Создаёшь сайты и приложения, которые видит весь мир. HTML, CSS, JavaScript и React — с нуля до готового проекта в браузере.",
    href: "/frontend-razrabotka",
    color: "var(--color-track-kodeks)",
    tags: ["HTML", "CSS", "JavaScript", "React"],
    forWhom: "От 8 класса, можно с нуля",
    result: "Собственный сайт / веб-приложение",
  },
  {
    emoji: "⚙️",
    title: "Backend-разработка",
    subtitle: "от 8 класса · Python, FastAPI, БД",
    desc: "Серверная сторона IT: Python, FastAPI, базы данных, REST API. Создаёшь сервисы, которыми пользуются сотни людей.",
    href: "/backend-razrabotka",
    color: "var(--color-track-technolab)",
    tags: ["Python", "FastAPI", "PostgreSQL", "REST API"],
    forWhom: "От 8 класса, можно с нуля",
    result: "Рабочий API / backend-сервис",
  },
  {
    emoji: "👤",
    title: "Индивидуальные занятия",
    subtitle: "10–18 лет · Любая цель",
    desc: "Один ученик — один ментор. Программа под конкретную задачу: помощь с проектом, олимпиадная подготовка, освоение нового языка или устранение пробелов.",
    href: "/individualnye-zanyatiya",
    color: "var(--color-brand)",
    tags: ["Любой возраст", "Любой уровень", "Гибкий график"],
    forWhom: "Любой возраст, любая цель",
    result: "Результат под конкретную задачу",
  },
];

export default async function DirectionsPage() {
  const cms = await getCmsPage('napravleniya-razrabotki');
  const directions = Array.isArray(cms.directions) && cms.directions.length > 0 ? cms.directions as typeof DIRECTIONS : DIRECTIONS;
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
              <span className="text-[var(--color-brand)] font-medium">Направления</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-5">
              Все направления<br />
              <span className="text-[var(--color-brand)]">обучения</span>
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              Шесть форматов для разного возраста и целей. Если не знаете, с чего начать —
              запишитесь на пробный урок и ментор поможет выбрать.
            </p>
          </div>
        </section>

        {/* Карточки */}
        <section className="pb-16 md:pb-24">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-6">
              {directions.map((d) => (
                <article
                  key={d.title}
                  className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow overflow-hidden flex flex-col"
                >
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                        style={{ background: `color-mix(in srgb, ${d.color} 12%, transparent)` }}
                      >
                        {d.emoji}
                      </div>
                      <div>
                        <h2 className="font-extrabold text-[var(--color-text-primary)] text-lg leading-tight">{d.title}</h2>
                        <p className="text-xs font-medium mt-0.5" style={{ color: d.color }}>{d.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4 flex-1">{d.desc}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {d.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-medium bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-5 p-4 bg-[var(--color-bg-subtle)] rounded-xl">
                      <div>
                        <p className="text-xs text-[var(--color-text-muted)] mb-0.5">Для кого</p>
                        <p className="text-xs font-semibold text-[var(--color-text-primary)]">{d.forWhom}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--color-text-muted)] mb-0.5">Результат</p>
                        <p className="text-xs font-semibold" style={{ color: d.color }}>{d.result}</p>
                      </div>
                    </div>

                    <Link href={d.href} className={buttonClass("outline", "sm", "group w-full")}>
                      Подробнее
                      <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Не знаете что выбрать */}
        <section className="py-16 bg-[var(--color-bg-subtle)] border-t border-[var(--color-border)]">
          <div className="container max-w-xl text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-4">
              Не знаете, что выбрать?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Запишитесь на пробный урок — ментор познакомится с ребёнком
              и порекомендует подходящий трек. Бесплатно.
            </p>
            <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "lg", "group inline-flex")}>
              Записаться на пробный урок
              <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
