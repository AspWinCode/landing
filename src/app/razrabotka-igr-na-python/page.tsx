import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { getCmsPage } from "@/lib/portal";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Разработка игр на Python для детей — TirSkix Academy" },
  description:
    "Курс разработки игр на Python для детей 10–18 лет онлайн. Учим Arcade, Pygame, создаём игры с нуля. Первый урок бесплатно.",
  alternates: { canonical: "https://tirskix-academy.com/razrabotka-igr-na-python/" },
  keywords: ["разработка игр Python", "Pygame дети", "Arcade Python", "создать игру Python ребёнок"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Разработка игр на Python для детей",
  description: "Онлайн-курс создания игр на Python для детей 10–18 лет",
  provider: { "@type": "EducationalOrganization", name: "TirSkix Academy" },
  educationalLevel: "10–18 лет",
  teaches: "Python, Arcade, Pygame, игровой дизайн, алгоритмы",
};

const STAGES = [
  {
    num: "01",
    title: "Первая игра",
    desc: "Простая платформер-механика. Персонаж, прыжки, монеты, столкновения — базовые паттерны геймдева.",
    tools: ["Python", "Arcade"],
  },
  {
    num: "02",
    title: "Игровые механики",
    desc: "Враги, спрайты, анимации, тайл-карты. Изучаем ООП на примере игровых объектов.",
    tools: ["ООП", "Спрайты", "Тайлмэп"],
  },
  {
    num: "03",
    title: "Физика и уровни",
    desc: "Физический движок, несколько уровней, сохранение прогресса. Первая полноценная игра с меню.",
    tools: ["Физика", "Уровни", "JSON-сохранение"],
  },
  {
    num: "04",
    title: "Собственный проект",
    desc: "Ребёнок придумывает и создаёт игру сам. Ментор помогает с архитектурой, не диктует решения.",
    tools: ["Проект", "Публикация"],
  },
];

const VS = [
  { feature: "Визуальный редактор", tirskix: "Нет — только реальный Python", scratch: "Да — блоки" },
  { feature: "Python-код", tirskix: "С первого урока", scratch: "Не используется" },
  { feature: "Публикация игры", tirskix: "itch.io, GitHub", scratch: "Только Scratch-платформа" },
  { feature: "Переносимые навыки", tirskix: "Python для ОГЭ, ЕГЭ, работы", scratch: "Только для Scratch" },
  { feature: "Возраст", tirskix: "12+", scratch: "6–10 лет" },
];

const FAQ = [
  { q: "С какого возраста можно создавать игры на Python?", a: "С 12 лет. До 12 рекомендуем Игровую студию на GDevelop — там дети делают полноценные игры без текстового синтаксиса. К 12 годам ребёнок готов к Python." },
  { q: "Нужен ли опыт программирования?", a: "Базовый Python будет плюсом, но не обязателен. Если опыта нет — начнём с нескольких месяцев Кодэкса (Python-основы), а потом перейдём к играм." },
  { q: "Какие игры делают ученики?", a: "Платформеры, аркады, лабиринты, кликеры — всё зависит от идеи ребёнка. Главное — собственный проект, не копирование примера." },
  { q: "Arcade или Pygame?", a: "Основная библиотека — Arcade. Она современная, удобная для обучения и хорошо поддерживается. Pygame опциально — по желанию ученика." },
];

export default async function GameDevPythonPage() {
  const cms = await getCmsPage('razrabotka-igr-na-python');
  const stages = Array.isArray(cms.stages) && cms.stages.length > 0 ? cms.stages as typeof STAGES : STAGES;
  const faq = Array.isArray(cms.faq) && cms.faq.length > 0 ? cms.faq as typeof FAQ : FAQ;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-32 -left-40 w-[500px] h-[500px] rounded-full bg-[var(--color-track-studio-light)] opacity-30 blur-3xl" />
          </div>
          <div className="container relative max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-[var(--color-brand)] font-medium">Разработка игр на Python</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-xs font-medium mb-6" style={{ color: "var(--color-track-studio)" }}>
              12–18 лет · Python + Arcade
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-5">
              Создай свою игру<br />
              <span style={{ color: "var(--color-track-studio)" }}>на Python</span>
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
              Пишем настоящие игры на Python — не в блочных конструкторах, а в реальном коде.
              Платформеры, аркады, собственные проекты — и все навыки переносятся в ОГЭ и работу.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "lg", "group inline-flex")}>
                Первый урок бесплатно
                <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/technolab" className={buttonClass("outline", "lg")}>
                Трек ТехноЛаб
              </Link>
            </div>
          </div>
        </section>

        {/* Этапы */}
        <section className="py-16 md:py-24 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-3 text-center">Как строится обучение</h2>
            <p className="text-[var(--color-text-secondary)] text-center mb-10 max-w-xl mx-auto">
              Четыре этапа — от первого персонажа до собственной опубликованной игры.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {stages.map((s) => (
                <div key={s.num} className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                  <div className="text-xs font-mono font-bold mb-2" style={{ color: "var(--color-track-studio)" }}>Этап {s.num}</div>
                  <h3 className="font-extrabold text-[var(--color-text-primary)] mb-2">{s.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tools.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-md font-mono font-medium bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)]">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Чему научится */}
        <section className="py-16">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-8 text-center">Чему научится ребёнок</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Писать игры на Python — не копировать, а создавать",
                "Понимать ООП: классы, объекты, наследование",
                "Работать с библиотекой Arcade / Pygame",
                "Реализовывать физику, анимации, коллизии",
                "Создавать несколько игровых уровней",
                "Публиковать игру и объяснять, как она работает",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-[var(--color-surface)] rounded-xl p-4 border border-[var(--color-border)]">
                  <CheckCircle size={16} weight="fill" className="shrink-0 mt-0.5" style={{ color: "var(--color-track-studio)" }} />
                  <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VS Scratch */}
        <section className="py-16 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-extrabold text-[var(--color-text-primary)] mb-8 text-center">Python vs Scratch/блоки</h2>
            <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
                    <th className="text-left px-5 py-3 font-semibold text-[var(--color-text-muted)]">Параметр</th>
                    <th className="text-left px-5 py-3 font-semibold text-[var(--color-brand)]">TirSkix / Python</th>
                    <th className="text-left px-5 py-3 font-semibold text-[var(--color-text-muted)]">Scratch / блоки</th>
                  </tr>
                </thead>
                <tbody>
                  {VS.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-[var(--color-surface)]" : "bg-[var(--color-bg-subtle)]"}>
                      <td className="px-5 py-3 text-[var(--color-text-secondary)]">{row.feature}</td>
                      <td className="px-5 py-3 font-medium text-[var(--color-text-primary)]">{row.tirskix}</td>
                      <td className="px-5 py-3 text-[var(--color-text-muted)]">{row.scratch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20">
          <div className="container max-w-2xl">
            <h2 className="text-2xl font-extrabold text-[var(--color-text-primary)] mb-8 text-center">Вопросы о разработке игр</h2>
            <div className="space-y-3">
              {faq.map((item) => (
                <details key={item.q} className="group bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] transition-colors text-sm">
                    {item.q}
                    <span className="shrink-0 transition-transform group-open:rotate-45 text-xl font-light leading-none" style={{ color: "var(--color-track-studio)" }}>+</span>
                  </summary>
                  <div className="px-6 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border)] pt-4">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-xl text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-4">
              Создадим первую игру вместе?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Пробный урок — бесплатно. Ребёнок сделает первый шаг к собственной игре на Python.
            </p>
            <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "lg", "group inline-flex")}>
              Записаться бесплатно
              <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
