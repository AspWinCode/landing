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
  const cms = await getCmsPage("frontend-razrabotka") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "Frontend-разработка для подростков — TirSkix Academy",
    description:
      "Курс frontend-разработки для подростков от 8 класса. HTML, CSS, JavaScript, React. Без опыта — с нуля до реального сайта.",
    keywords: ["frontend для детей", "frontend разработка подростки", "HTML CSS JavaScript курс", "React для школьников"],
    canonical: "https://tirskix-academy.com/frontend-razrabotka",
  });
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Frontend-разработка",
  url: "https://tirskix-academy.com/frontend-razrabotka/",
  description: "Онлайн-курс frontend-разработки для подростков от 8 класса",
  provider: { "@type": "EducationalOrganization", name: "TirSkix Academy", url: "https://tirskix-academy.com/" },
  educationalLevel: "от 8 класса",
  teaches: "HTML, CSS, JavaScript, React, Git",
  courseMode: "online",
  inLanguage: "ru",
  audience: { "@type": "EducationalAudience", educationalRole: "student" },
  offers: { "@type": "Offer", price: "4200", priceCurrency: "RUB", availability: "https://schema.org/InStock" },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Главная", url: "https://tirskix-academy.com/" },
  { name: "Направления разработки", url: "https://tirskix-academy.com/napravleniya-razrabotki/" },
  { name: "Frontend-разработка", url: "https://tirskix-academy.com/frontend-razrabotka/" },
]);

const TOPICS = [
  { num: "01", title: "HTML и структура", desc: "Разметка страниц, семантика, доступность, формы" },
  { num: "02", title: "CSS и дизайн", desc: "Flexbox, Grid, анимации, адаптивная вёрстка под мобильные" },
  { num: "03", title: "JavaScript", desc: "Основы JS: переменные, функции, DOM, события, асинхронность" },
  { num: "04", title: "React", desc: "Компоненты, props, state, хуки — современный фреймворк" },
  { num: "05", title: "API и данные", desc: "Fetch, REST API, работа с JSON, загрузка данных с сервера" },
  { num: "06", title: "Финальный проект", desc: "Разработка полноценного сайта или веб-приложения с нуля" },
];

const SKILLS = [
  "Вёрстать страницы на HTML и CSS",
  "Писать интерактивные скрипты на JavaScript",
  "Создавать компоненты на React",
  "Подключать сторонние API",
  "Работать с Git и GitHub",
  "Деплоить сайты в интернет",
];

const RESULTS = [
  { v: "от 8 кл.", l: "подходящий возраст" },
  { v: "с нуля", l: "без опыта программирования" },
  { v: "6 мес.", l: "до первого реального сайта" },
  { v: "React", l: "финальный инструмент курса" },
];

const FAQ = [
  {
    q: "Нужен ли опыт программирования?",
    a: "Нет. Начинаем с HTML — самого простого языка разметки. Постепенно добавляем CSS, JavaScript и React. Каждый шаг понятен и виден на экране.",
  },
  {
    q: "Чем frontend отличается от backend?",
    a: "Frontend — это всё, что видит пользователь: кнопки, текст, анимации, форма входа. Backend — серверная логика «за кулисами». Большинство сайтов используют оба направления.",
  },
  {
    q: "Какой результат после курса?",
    a: "Ученик создаст полноценный сайт или веб-приложение на React. Это можно показать в портфолио, разместить в интернете или использовать как базу для следующего проекта.",
  },
  {
    q: "Сколько занятий в неделю?",
    a: "Рекомендуем 2 занятия в неделю по 60 минут. Между занятиями — небольшие домашние задания: сделать кнопку, поправить стиль, добавить блок.",
  },
];

export default async function FrontendPage() {
  const cms = await getCmsPage('frontend-razrabotka');
  const topics = Array.isArray(cms.topics) && cms.topics.length > 0 ? cms.topics as typeof TOPICS : TOPICS;
  const skills = Array.isArray(cms.skills) && cms.skills.length > 0 ? cms.skills as typeof SKILLS : SKILLS;
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
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
              style={{ background: "var(--color-track-kodeks)" }} />
          </div>
          <div className="container relative max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
              <span>/</span>
              <Link href="/napravleniya-razrabotki" className="hover:text-[var(--color-brand)] transition-colors">Направления</Link>
              <span>/</span>
              <span className="text-[var(--color-track-kodeks)] font-medium">Frontend</span>
            </nav>

            <div className="flex flex-wrap gap-2 mb-6">
              {["от 8 класса", "Мини-группа / Индивидуально", "Можно с нуля"].map((tag) => (
                <span key={tag} className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: "color-mix(in srgb, var(--color-track-kodeks) 12%, transparent)", color: "var(--color-track-kodeks)" }}>
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-5">
              Frontend-разработка:<br />
              <span style={{ color: "var(--color-track-kodeks)" }}>то, что видит весь мир</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-2xl">
              HTML, CSS, JavaScript, React. Создаёшь сайты и приложения, которыми пользуются люди. Результат виден сразу — прямо в браузере.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "lg", "group")}>
                Записаться на пробный урок
                <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/napravleniya-razrabotki" className={buttonClass("secondary", "lg")}>
                Все направления
              </Link>
            </div>
          </div>
        </section>

        {/* Статы */}
        <section className="py-12 bg-[var(--color-bg-subtle)] border-y border-[var(--color-border)]">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {results.map(({ v, l }) => (
                <div key={v} className="text-center">
                  <div className="text-2xl md:text-3xl font-extrabold mb-1" style={{ color: "var(--color-track-kodeks)" }}>{v}</div>
                  <div className="text-xs text-[var(--color-text-muted)] leading-snug">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Программа */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-3 text-center">
              Программа курса
            </h2>
            <p className="text-[var(--color-text-secondary)] text-center mb-12 max-w-xl mx-auto">
              Контент будет обновлён — пока ориентировочный план. Финальный учебный план формируется под уровень ученика.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {topics.map((topic) => (
                <div key={topic.num} className="flex gap-4 p-5 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                  <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-sm font-black"
                    style={{ background: "color-mix(in srgb, var(--color-track-kodeks) 12%, transparent)", color: "var(--color-track-kodeks)" }}>
                    {topic.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--color-text-primary)] mb-1">{topic.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{topic.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Чему научится */}
        <section className="py-16 md:py-24 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-6">
                  Чему научится ученик
                </h2>
                <ul className="space-y-3">
                  {skills.map((skill) => (
                    <li key={skill} className="flex items-start gap-3">
                      <CheckCircle size={20} weight="fill" className="shrink-0 mt-0.5" style={{ color: "var(--color-track-kodeks)" }} />
                      <span className="text-[var(--color-text-secondary)]">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl p-8 md:p-10" style={{ background: "color-mix(in srgb, var(--color-track-kodeks) 8%, transparent)" }}>
                <div className="text-5xl mb-4">🌐</div>
                <div className="text-2xl font-extrabold mb-2" style={{ color: "var(--color-track-kodeks)" }}>Frontend</div>
                <div className="text-sm font-medium text-[var(--color-text-secondary)] mb-6">от 8 класса · {skills.length} навыков</div>
                <div className="flex flex-wrap gap-2">
                  {["HTML", "CSS", "JavaScript", "React", "Git"].map((t) => (
                    <span key={t} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm"
                      style={{ color: "var(--color-track-kodeks)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-10 text-center">Частые вопросы</h2>
            <div className="space-y-3">
              {faq.map((item) => (
                <details key={item.q} className="group bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] transition-colors text-sm">
                    {item.q}
                    <span className="text-[var(--color-brand)] shrink-0 transition-transform group-open:rotate-45 text-xl font-light leading-none">+</span>
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
        <section className="py-16 bg-[var(--color-bg-subtle)] border-t border-[var(--color-border)]">
          <div className="container max-w-xl text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-4">
              Готов создавать сайты?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Запишитесь на пробный урок — разберёмся с уровнем и подберём темп. Бесплатно.
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
